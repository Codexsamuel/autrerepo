import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Mock PDF generation - return JSON with PDF data structure
    const pdfData = {
      title: data.title,
      duration: data.duration,
      level: data.level,
      participants: data.participants,
      price: data.price,
      nextSession: data.nextSession,
      location: data.location,
      objectives: data.objectives,
      prerequisites: data.prerequisites,
      modules: data.modules,
      instructor: data.instructor,
      generatedAt: new Date().toISOString(),
      status: "PDF generation temporarily unavailable - data structure provided"
    }

    // Return JSON response instead of PDF
    return NextResponse.json({
      success: true,
      message: "PDF generation temporarily unavailable",
      data: pdfData,
      downloadUrl: null
    }, {
      headers: {
        "Content-Type": "application/json",
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