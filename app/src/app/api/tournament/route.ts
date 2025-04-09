import { NextResponse, NextRequest } from "next/server"
import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient

// POST create new tournament
export async function POST(request: Request) {

    const body = await request.json()

    const { name, rounds, status, sections } = body

    try {

        const newTournament = prisma.tournament.create({
            data: {
                name: name,
                rounds: rounds,
                sections: sections,
            }
        })

        return new Response(JSON.stringify(newTournament), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        })

    }

    catch (error) {
        return new Response(error)
    }

}

