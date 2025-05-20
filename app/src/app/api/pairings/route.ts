import { NextResponse, NextRequest } from "next/server";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function getRoundValues(roundId) {
    const round = await prisma.round.findUnique({
        where: {id: roundId}
    })
    return round?.number
}

// GET - get all pairings

// POST - generate pairings for next round
export async function POST(request: NextRequest) {
    const body = await request.json()
    const {roundId} = body 

}