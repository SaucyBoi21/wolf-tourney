import { NextResponse, NextRequest } from "next/server"
import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

// POST create new tournament
export async function POST(request: NextRequest) {

    const body = await request.json()
    const { name } = body
    
    const newTournament = await prisma.tournament.create({
        data: {
            name: name,
        }
    })


    return NextResponse.json(newTournament.id, { status: 201 })


}

// GET find tournament by ID
export async function GET(request: NextRequest) {
    const body = await request.json()
    const {id} = body

    const tournament = await prisma.tournament.findUnique({
        where: {
            id: id, 
        },


    })

    return NextResponse.json(tournament)

}

