import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { action, projectId, videoUrl, sequences } = await request.json();

    switch (action) {
      case 'generate_subtitles':
        return await generateSubtitles(videoUrl);
      case 'suggest_cuts':
        return await suggestCuts(videoUrl);
      case 'auto_transitions':
        return await generateTransitions(sequences);
      default:
        return NextResponse.json({ error: 'Action non reconnue' }, { status: 400 });
    }
  } catch (error) {
    console.error('Erreur IA vidéo:', error);
    return NextResponse.json({ error: 'Erreur lors du traitement IA' }, { status: 500 });
  }
}

async function generateSubtitles(videoUrl: string) {
  try {
    const transcription = await openai.audio.transcriptions.create({
      file: videoUrl as any,
      model: "whisper-1",
      response_format: "srt",
      language: "fr"
    });

    const subtitles = parseSRT(transcription);
    return NextResponse.json({ success: true, subtitles });
  } catch (error) {
    throw new Error('Erreur lors de la génération des sous-titres');
  }
}

async function suggestCuts(videoUrl: string) {
  try {
    const analysis = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyse cette vidéo et suggère des points de découpe optimaux. Retourne un JSON avec les timestamps suggérés."
            },
            {
              type: "image_url",
              image_url: { url: videoUrl }
            }
          ]
        }
      ]
    });

    const suggestions = JSON.parse(analysis.choices[0].message.content || '{}');
    return NextResponse.json({ success: true, suggestions: suggestions.cuts || [] });
  } catch (error) {
    throw new Error('Erreur lors de l\'analyse des suggestions de découpe');
  }
}

async function generateTransitions(sequences: any[]) {
  try {
    const transitions = [];
    
    for (let i = 0; i < sequences.length - 1; i++) {
      const currentSeq = sequences[i];
      const nextSeq = sequences[i + 1];
      
      const transitionSuggestion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "Tu es un expert en montage vidéo. Suggère le type de transition le plus approprié."
          },
          {
            role: "user",
            content: `Séquence 1: ${currentSeq.label || 'Séquence sans label'}
                     Séquence 2: ${nextSeq.label || 'Séquence sans label'}
                     
                     Suggère une transition parmi: fade, crossfade, slide, zoom, cut, dissolve`
          }
        ]
      });

      transitions.push({
        from: currentSeq.id,
        to: nextSeq.id,
        type: transitionSuggestion.choices[0].message.content?.toLowerCase().replace(/[^a-z]/g, '') || 'fade',
        duration: 0.5
      });
    }

    return NextResponse.json({ success: true, transitions });
  } catch (error) {
    throw new Error('Erreur lors de la génération des transitions');
  }
}

function parseSRT(srtContent: string) {
  const subtitles = [];
  const blocks = srtContent.trim().split('\n\n');
  
  for (const block of blocks) {
    const lines = block.split('\n');
    if (lines.length >= 3) {
      const timeCode = lines[1];
      const text = lines.slice(2).join('\n');
      
      const [start, end] = timeCode.split(' --> ').map(timeToSeconds);
      
      subtitles.push({ start, end, text });
    }
  }
  
  return subtitles;
}

function timeToSeconds(timeString: string): number {
  const [hours, minutes, seconds] = timeString.split(':');
  const [secs, ms] = seconds.split(',');
  
  return parseInt(hours) * 3600 + 
         parseInt(minutes) * 60 + 
         parseInt(secs) + 
         parseInt(ms) / 1000;
} 