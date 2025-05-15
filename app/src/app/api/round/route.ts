import { NextResponse, NextRequest } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// GET - get round by id

// POST - create new round
export async function POST(request: NextRequest) {
    const body = await request.json()
    const {number, sectionId} = body

    const newRound = await prisma.round.create({
        data: {
            number: number,
            section: {
                connect: {id: sectionId}
            }
        }
    })

    return NextResponse.json(newRound.id, {status: 201})
}