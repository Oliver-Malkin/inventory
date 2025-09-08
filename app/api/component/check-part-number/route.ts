import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const { ptNumber } = await req.json()

    if (!ptNumber || typeof ptNumber !== "string") {
      return NextResponse.json(
        { error: "Invalid ptNumber" },
        { status: 400 }
      )
    }

    const existing = await prisma.component.findUnique({
      where: { name: ptNumber },
    })

    return NextResponse.json({ exists: !!existing })
  } catch (error) {
    console.error("check-part-number error:", error)
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    )
  }
}
