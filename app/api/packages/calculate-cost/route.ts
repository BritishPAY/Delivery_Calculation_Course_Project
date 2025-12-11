import { type NextRequest, NextResponse } from "next/server"

const calculateDistance = (origin: string, destination: string): number => {
  if (origin === destination) return 50

  const distances: Record<string, Record<string, number>> = {
    Almaty: { Astana: 1200, Shymkent: 690, Karaganda: 980, Aktobe: 2050, Pavlodar: 1250 },
    Astana: { Almaty: 1200, Shymkent: 1400, Karaganda: 220, Aktobe: 1100, Pavlodar: 450 },
    Shymkent: { Almaty: 690, Astana: 1400, Taraz: 180, Turkistan: 120 },
    Karaganda: { Almaty: 980, Astana: 220, Pavlodar: 400 },
    Aktobe: { Almaty: 2050, Astana: 1100, Uralsk: 470 },
  }

  return distances[origin]?.[destination] || distances[destination]?.[origin] || 500
}

const calculateCost = (weight: number, distance: number, type: string): number => {
  if (type === "EXPRESS") {
    return 1500 + weight * 200 + distance * 5
  }
  return 500 + weight * 100 + distance * 2
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const distance = calculateDistance(body.originCity, body.destinationCity)
    const cost = calculateCost(body.weight, distance, body.type)

    return NextResponse.json({
      cost,
      originCity: body.originCity,
      destinationCity: body.destinationCity,
      weight: body.weight,
      type: body.type,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to calculate cost" }, { status: 500 })
  }
}
