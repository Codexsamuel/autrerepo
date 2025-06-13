import { NextResponse } from "next/server"
import PDFDocument from "pdfkit"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Créer un nouveau document PDF
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    })

    // Convertir le document en buffer
    const chunks: Buffer[] = []
    doc.on("data", (chunk) => chunks.push(chunk))
    
    // En-tête
    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .text("Programme de Formation", { align: "center" })
      .moveDown()

    // Titre de la formation
    doc
      .fontSize(20)
      .font("Helvetica-Bold")
      .text(data.title)
      .moveDown()

    // Informations générales
    doc
      .fontSize(12)
      .font("Helvetica")
      .text(`Durée: ${data.duration}`)
      .text(`Niveau: ${data.level}`)
      .text(`Participants: ${data.participants}`)
      .text(`Prix: ${data.price}`)
      .text(`Prochaine session: ${data.nextSession}`)
      .text(`Lieu: ${data.location}`)
      .moveDown()

    // Objectifs
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Objectifs")
      .moveDown()
      .fontSize(12)
      .font("Helvetica")
    
    data.objectives.forEach((objective: string) => {
      doc.text(`• ${objective}`)
    })
    doc.moveDown()

    // Prérequis
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Prérequis")
      .moveDown()
      .fontSize(12)
      .font("Helvetica")
    
    data.prerequisites.forEach((prerequisite: string) => {
      doc.text(`• ${prerequisite}`)
    })
    doc.moveDown()

    // Programme
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Programme")
      .moveDown()
      .fontSize(12)
      .font("Helvetica")
    
    data.modules.forEach((module: string) => {
      doc.text(`• ${module}`)
    })
    doc.moveDown()

    // Formateur
    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .text("Votre formateur")
      .moveDown()
      .fontSize(12)
      .font("Helvetica")
      .text(`Nom: ${data.instructor.name}`)
      .text(`Rôle: ${data.instructor.role}`)
      .text(`Expérience: ${data.instructor.experience}`)
      .moveDown()

    // Pied de page
    doc
      .fontSize(10)
      .font("Helvetica")
      .text(
        "NovaWorld Formation - Tous droits réservés",
        { align: "center" }
      )

    // Finaliser le document
    doc.end()

    // Attendre que le document soit complètement généré
    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(chunks))
      })
    })

    // Retourner le PDF
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="programme-${data.title.toLowerCase().replace(/\s+/g, "-")}.pdf"`,
      },
    })
  } catch (error) {
    console.error("Erreur lors de la génération du PDF:", error)
    return NextResponse.json(
      { error: "Erreur lors de la génération du PDF" },
      { status: 500 }
    )
  }
} 