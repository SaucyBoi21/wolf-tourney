// POST create new tournament
export async function POST(request:Request) {

    const body = await request.json()
    const {name, rounds, status} = body

    const newTournament = {
        "name": name,
        "rounds": rounds,
        "status": status
    }

    return new Response(JSON.stringify(newTournament), {
        status: 201,
        headers: {'Content-Type': 'application/json'}
    })
    
}

