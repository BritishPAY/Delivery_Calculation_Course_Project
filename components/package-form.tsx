"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KAZAKHSTAN_CITIES } from "@/lib/cities"
import type { PackageFormData, Package } from "@/lib/types"
import { Loader2, PackageIcon, CheckCircle2 } from "lucide-react"

export function PackageForm() {
  const [formData, setFormData] = useState<PackageFormData>({
    senderFirstName: "",
    senderLastName: "",
    receiverFirstName: "",
    receiverLastName: "",
    originCity: "",
    destinationCity: "",
    weight: 0,
    type: "STANDARD",
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<Package | null>(null)
  const [error, setError] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("http://localhost:8080/api/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          cost: 0,
        }),
      })

      const text = await response.text()

      if (!response.ok) {
        try {
          const errorData = JSON.parse(text)
          throw new Error(errorData.error || "Failed to create package")
        } catch {
          throw new Error("Server error — check backend logs")
        }
      }

      const data = JSON.parse(text)
      setResult(data)

      // Сброс формы
      setFormData({
        senderFirstName: "",
        senderLastName: "",
        receiverFirstName: "",
        receiverLastName: "",
        originCity: "",
        destinationCity: "",
        weight: 0,
        type: "STANDARD",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error")
      console.error("Package creation failed:", err)
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: keyof PackageFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PackageIcon className="h-5 w-5" />
            Register New Package
          </CardTitle>
          <CardDescription>
            Enter sender and receiver information to create a new package shipment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Sender Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Sender Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="senderFirstName">First Name</Label>
                  <Input
                    id="senderFirstName"
                    value={formData.senderFirstName}
                    onChange={(e) => updateFormData("senderFirstName", e.target.value)}
                    required
                    placeholder="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderLastName">Last Name</Label>
                  <Input
                    id="senderLastName"
                    value={formData.senderLastName}
                    onChange={(e) => updateFormData("senderLastName", e.target.value)}
                    required
                    placeholder="surname"
                  />
                </div>
              </div>
            </div>

            {/* Receiver Information */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Receiver Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="receiverFirstName">First Name</Label>
                  <Input
                    id="receiverFirstName"
                    value={formData.receiverFirstName}
                    onChange={(e) => updateFormData("receiverFirstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiverLastName">Last Name</Label>
                  <Input
                    id="receiverLastName"
                    value={formData.receiverLastName}
                    onChange={(e) => updateFormData("receiverLastName", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Package Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="originCity">Origin City</Label>
                  <Select
                    value={formData.originCity}
                    onValueChange={(value) => updateFormData("originCity", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choice origin city" />
                    </SelectTrigger>
                    <SelectContent>
                      {KAZAKHSTAN_CITIES.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="destinationCity">Destination City</Label>
                  <Select
                    value={formData.destinationCity}
                    onValueChange={(value) => updateFormData("destinationCity", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choice destination city" />
                    </SelectTrigger>
                    <SelectContent>
                      {KAZAKHSTAN_CITIES.map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    min="0.1"
                    value={formData.weight || ""}
                    onChange={(e) => updateFormData("weight", Number(e.target.value) || 0)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Delivery Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => updateFormData("type", value as any)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STANDARD">Standard</SelectItem>
                      <SelectItem value="EXPRESS">Express</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-300 rounded-lg text-red-700">
                {error}
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full text-lg py-6">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Package creating...
                </>
              ) : (
                "Create Package"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-green-300 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-green-800">
              <CheckCircle2 className="h-6 w-6" />
              Package successfully created!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-mono text-center text-green-700 mb-4">
              Tracking-number: <strong>{result.trackingNumber}</strong>
            </p>
            <p className="text-center text-lg">
              Cost: <strong>{result.cost.toLocaleString()} ₸</strong>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}