"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { KAZAKHSTAN_CITIES } from "@/lib/cities"
import type { CostCalculationRequest, PackageType } from "@/lib/types"
import { Calculator, TrendingUp, Truck, Zap } from "lucide-react"

export function CostCalculator() {
  const [formData, setFormData] = useState<CostCalculationRequest>({
    originCity: "",
    destinationCity: "",
    weight: 0,
    type: "STANDARD",
  })

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ cost: number; type: PackageType } | null>(null)
  const [error, setError] = useState<string>("")

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("/api/packages/calculate-cost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to calculate cost")
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const updateFormData = (field: keyof CostCalculationRequest, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setResult(null) // Clear result when form changes
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Shipping Cost Calculator
          </CardTitle>
          <CardDescription>Estimate delivery costs without creating a package</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCalculate} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="calc-origin">Origin City</Label>
                <Select
                  value={formData.originCity}
                  onValueChange={(value) => updateFormData("originCity", value)}
                  required
                >
                  <SelectTrigger id="calc-origin">
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
                <Label htmlFor="calc-destination">Destination City</Label>
                <Select
                  value={formData.destinationCity}
                  onValueChange={(value) => updateFormData("destinationCity", value)}
                  required
                >
                  <SelectTrigger id="calc-destination">
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
                <Label htmlFor="calc-weight">Weight (kg)</Label>
                <Input
                  id="calc-weight"
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
                <Label htmlFor="calc-type">Delivery Type</Label>
                <Select value={formData.type} onValueChange={(value) => updateFormData("type", value as PackageType)}>
                  <SelectTrigger id="calc-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="STANDARD">
                      <div className="flex items-center gap-2">
                        <Truck className="h-4 w-4" />
                        <span>Standard (3-5 days)</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="EXPRESS">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <span>Express (1-2 days)</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
            )}

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Calculating..." : "Calculate Cost"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <TrendingUp className="h-5 w-5" />
              Estimated Cost
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Shipping Cost</p>
                <p className="text-4xl font-bold text-blue-800">
                  {result.cost.toFixed(2)} <span className="text-2xl">KZT</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600 mb-1">Delivery Type</p>
                <div className="flex items-center gap-2">
                  {result.type === "EXPRESS" ? (
                    <>
                      <Zap className="h-5 w-5 text-orange-500" />
                      <span className="font-semibold text-orange-600">Express</span>
                    </>
                  ) : (
                    <>
                      <Truck className="h-5 w-5 text-blue-500" />
                      <span className="font-semibold text-blue-600">Standard</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100">
              <p className="text-xs text-gray-500 mb-2">Cost Breakdown:</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Rate:</span>
                  <span className="font-medium">{result.type === "EXPRESS" ? "1,500" : "500"} KZT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight Charge:</span>
                  <span className="font-medium">
                    {formData.weight} kg × {result.type === "EXPRESS" ? "200" : "100"} KZT
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance Charge:</span>
                  <span className="font-medium">Distance × {result.type === "EXPRESS" ? "5" : "2"} KZT/km</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Pricing Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Standard Delivery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Rate:</span>
              <span className="font-medium">500 KZT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Per Kilogram:</span>
              <span className="font-medium">100 KZT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Per Kilometer:</span>
              <span className="font-medium">2 KZT</span>
            </div>
            <div className="pt-2 border-t">
              <span className="text-xs text-gray-500">Delivery time: 3-5 business days</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-500" />
              Express Delivery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Rate:</span>
              <span className="font-medium">1,500 KZT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Per Kilogram:</span>
              <span className="font-medium">200 KZT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Per Kilometer:</span>
              <span className="font-medium">5 KZT</span>
            </div>
            <div className="pt-2 border-t">
              <span className="text-xs text-gray-500">Delivery time: 1-2 business days</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
