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
      const response = await fetch("/api/packages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to create package")
      }

      const data = await response.json()
      setResult(data)

      // Reset form
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
      setError(err instanceof Error ? err.message : "An error occurred")
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
          <CardDescription>Enter sender and receiver information to create a new package shipment</CardDescription>
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
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="senderLastName">Last Name</Label>
                  <Input
                    id="senderLastName"
                    value={formData.senderLastName}
                    onChange={(e) => updateFormData("senderLastName", e.target.value)}
                    required
                    placeholder="Enter last name"
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
                    placeholder="Enter first name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receiverLastName">Last Name</Label>
                  <Input
                    id="receiverLastName"
                    value={formData.receiverLastName}
                    onChange={(e) => updateFormData("receiverLastName", e.target.value)}
                    required
                    placeholder="Enter last name"
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
                    <SelectTrigger id="originCity">
                      <SelectValue placeholder="Select origin city" />
                    </SelectTrigger>
                    <SelectContent>
                      {KAZAKHSTAN_CITIES.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
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
                    <SelectTrigger id="destinationCity">
                      <SelectValue placeholder="Select destination city" />
                    </SelectTrigger>
                    <SelectContent>
                      {KAZAKHSTAN_CITIES.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
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
                    onChange={(e) => updateFormData("weight", Number.parseFloat(e.target.value) || 0)}
                    required
                    placeholder="Enter weight"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Delivery Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => updateFormData("type", value as "STANDARD" | "EXPRESS")}
                  >
                    <SelectTrigger id="type">
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
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Package...
                </>
              ) : (
                "Create Package"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              <CheckCircle2 className="h-5 w-5" />
              Package Created Successfully
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Tracking Number</p>
                <p className="font-mono font-bold text-lg text-green-800">{result.trackingNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Cost</p>
                <p className="font-bold text-lg text-green-800">{result.cost.toFixed(2)} KZT</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Route</p>
                <p className="font-medium">
                  {result.originCity} → {result.destinationCity}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Weight</p>
                <p className="font-medium">{result.weight} kg</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
