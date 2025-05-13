import { NextResponse, NextRequest } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

// GET - get pairing by id

// POST - create new pairing
export async function POST(request: NextRequest) {
    const body = await request.json()
    const {result, roundId, whitePlayerId, blackPlayerId} = body

    const newPairing = await prisma.player.create({
        data: {
            result: result,
            round: {
                connect: {id: roundId}
            },
            whitePlayer: {
                connect: {id: whitePlayerId}
            },
            blackPlayer: {
                connect: {id: blackPlayerId}
            }
        }
    })

    return NextResponse.json(newPairing.id, {status: 201})
}

