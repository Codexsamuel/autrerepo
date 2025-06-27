import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const execAsync = promisify(exec);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { projectId, sequences } = await request.json();

    // Récupérer les informations du projet
    const { data: project } = await supabase
      .from('video_projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (!project) {
      return NextResponse.json({ error: 'Projet non trouvé' }, { status: 404 });
    }

    // Créer un dossier temporaire pour le traitement
    const tempDir = `/tmp/video-export-${projectId}`;
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const inputPath = path.join(tempDir, 'input.mp4');
    const outputPath = path.join(tempDir, 'output.mp4');

    // Télécharger la vidéo source depuis Supabase Storage
    const { data: videoData, error: downloadError } = await supabase.storage
      .from('video-files')
      .download(project.video_path);

    if (downloadError) {
      throw new Error('Erreur lors du téléchargement de la vidéo');
    }

    // Sauvegarder la vidéo temporairement
    const buffer = await videoData.arrayBuffer();
    fs.writeFileSync(inputPath, Buffer.from(buffer));

    // Construire la commande FFmpeg pour traiter les séquences
    let ffmpegCommand = `ffmpeg -i "${inputPath}" -filter_complex "`;

    // Créer les filtres pour chaque séquence
    const filters = sequences.map((seq: any, index: number) => {
      const start = seq.start;
      const duration = seq.end - seq.start;
      return `[0:v]trim=start=${start}:duration=${duration},setpts=PTS-STARTPTS[v${index}];[0:a]atrim=start=${start}:duration=${duration},asetpts=PTS-STARTPTS[a${index}]`;
    });

    ffmpegCommand += filters.join(';') + '" ';

    // Concaténer les séquences
    const videoStreams = sequences.map((_: any, index: number) => `[v${index}]`).join('');
    const audioStreams = sequences.map((_: any, index: number) => `[a${index}]`).join('');

    ffmpegCommand += `-map "${videoStreams}" -map "${audioStreams}" -c:v libx264 -c:a aac -preset fast "${outputPath}"`;

    // Exécuter FFmpeg
    await execAsync(ffmpegCommand);

    // Uploader le fichier final vers Supabase Storage
    const outputBuffer = fs.readFileSync(outputPath);
    const fileName = `export-${projectId}-${Date.now()}.mp4`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('video-exports')
      .upload(fileName, outputBuffer, {
        contentType: 'video/mp4',
        cacheControl: '3600'
      });

    if (uploadError) {
      throw new Error('Erreur lors de l\'upload du fichier exporté');
    }

    // Générer l'URL de téléchargement
    const { data: { publicUrl } } = supabase.storage
      .from('video-exports')
      .getPublicUrl(fileName);

    // Nettoyer les fichiers temporaires
    fs.rmSync(tempDir, { recursive: true, force: true });

    // Mettre à jour le projet avec l'export
    await supabase
      .from('video_projects')
      .update({ 
        last_export_url: publicUrl,
        last_export_date: new Date().toISOString()
      })
      .eq('id', projectId);

    return NextResponse.json({ 
      success: true, 
      downloadUrl: publicUrl,
      fileName: fileName
    });

  } catch (error) {
    console.error('Erreur export vidéo:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'export vidéo' }, 
      { status: 500 }
    );
  }
} 