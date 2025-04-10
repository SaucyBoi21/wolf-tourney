import { NextResponse, NextRequest } from "next/server"
import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

// POST create new tournament
export async function POST(request: NextRequest) {

    const body = await request.body


    const newTournament = await prisma.tournament.create({
        data: body
    })

    return new Response(JSON.stringify(newTournament), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
    })

}

