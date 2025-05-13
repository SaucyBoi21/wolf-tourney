import { NextResponse, NextRequest } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient()

// POST create new player
export async function POST(request: NextRequest) {
    const body = await request.json()
    const {name, uscfId, rating, sectionId} = body

    const newPlayer = await prisma.player.create({
        data: {
            name: name,
            rating: rating,
            uscfId: uscfId,
            section: {
                connect: {id: sectionId}
            }
        }
    })

    return NextResponse.json(newPlayer.id, {status: 201})


}