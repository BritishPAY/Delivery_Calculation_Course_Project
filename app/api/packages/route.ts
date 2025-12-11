import { type NextRequest, NextResponse } from "next/server"
import type { Package } from "@/lib/types"

// In-memory storage (simulates Java backend)
const packages: Package[] = []

// Simulated distance calculations
const calculateDistance = (origin: string, destination: string): number => {
  if (origin === destination) return 50

  const distances: Record<string, Record<string, number>> = {
    Almaty: { Astana: 1200, Shymkent: 690, Karaganda: 980 },
    Astana: { Almaty: 1200, Shymkent: 1400, Karaganda: 220 },
    Shymkent: { Almaty: 690, Astana: 1400, Taraz: 180 },
  }

  return distances[origin]?.[destination] || 500
}

const calculateCost = (weight: number, distance: number, type: string): number => {
  if (type === "EXPRESS") {
    return 1500 + weight * 200 + distance * 5
  }
  return 500 + weight * 100 + distance * 2
}

const generateTrackingNumber = (): string => {
  return "KZ" + Math.random().toString(36).substring(2, 12).toUpperCase()
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const distance = calculateDistance(body.originCity, body.destinationCity)
    const cost = calculateCost(body.weight, distance, body.type)
    const trackingNumber = generateTrackingNumber()

    const newPackage: Package = {
      trackingNumber,
      senderFirstName: body.senderFirstName,
      senderLastName: body.senderLastName,
      receiverFirstName: body.receiverFirstName,
      receiverLastName: body.receiverLastName,
      originCity: body.originCity,
      destinationCity: body.destinationCity,
      weight: body.weight,
      cost,
      type: body.type,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    }

    packages.push(newPackage)

    return NextResponse.json(newPackage, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(packages)
}
