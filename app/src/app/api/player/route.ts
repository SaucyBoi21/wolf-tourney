import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

// POST create new player
export async function POST(request: NextRequest) {
    const body = await request.json()
    const {name, tournament, tournamentId, uscfId, rating, section} = body

    const newPlayer = await prisma.player.create({
        data: {
            name: name,
            tournament: tournament,
            tournamentId: tournamentId,
            uscfId: uscfId,
            rating: rating,
            section: section
        }
    })

    return NextResponse.json(newPlayer.id, {status: 201})


}