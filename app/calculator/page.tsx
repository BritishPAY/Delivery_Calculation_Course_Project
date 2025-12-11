"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KAZAKHSTAN_CITIES } from "@/lib/cities"
import { Calculator, Package, Search } from "lucide-react"
import Link from "next/link"

export default function CalculatorPage() {
  const [form, setForm] = useState({
    originCity: "",
    destinationCity: "",
    weight: "",
    type: "STANDARD",
  })
  const [result, setResult] = useState<{ cost: number; distance: number } | null>(null)
  const [loading, setLoading] = useState(false)

  const calculate = async () => {
    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("http://localhost:8080/api/packages/calculate-cost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          originCity: form.originCity,
          destinationCity: form.destinationCity,
          weight: Number(form.weight),
          type: form.type,
        }),
      })

      const data = await res.json()
      setResult(data)
    } catch (e) {
      alert("Error calculating cost. Check if backend is running.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-2">Shipping Cost Calculator</h1>
        <p className="text-center text-gray-600 mb-8">Get instant shipping estimates for your deliveries</p>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mb-12">
          <Button asChild variant="outline">
            <Link href="/" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Register Package
            </Link>
          </Button>
          <Button asChild>
            <Link href="/calculator" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              Cost Calculator
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/packages" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              View Packages
            </Link>
          </Button>
        </div>

        {/* Calculator Form */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Calculate Shipping Cost</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label>Origin City</Label>
                <Select value={form.originCity} onValueChange={(v) => setForm({ ...form, originCity: v })}>
                  <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                  <SelectContent>
                    {KAZAKHSTAN_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Destination City</Label>
                <Select value={form.destinationCity} onValueChange={(v) => setForm({ ...form, destinationCity: v })}>
                  <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                  <SelectContent>
                    {KAZAKHSTAN_CITIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Weight (kg)</Label>
              <Input
                type="number"
                step="0.1"
                min="0.1"
                value={form.weight}
                onChange={(e) => setForm({ ...form, weight: e.target.value })}
              />
            </div>

            <div>
              <Label>Delivery Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="STANDARD">Standard</SelectItem>
                  <SelectItem value="EXPRESS">Express</SelectItem>
                  <SelectItem value="INTERNATIONAL">International</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={calculate} disabled={loading} className="w-full py-6 text-lg">
              {loading ? "Calculating..." : "Calculate Cost"}
            </Button>

            {result && (
              <div className="text-center p-8 bg-green-50 rounded-lg border border-green-200">
                <p className="text-4xl font-bold text-green-700">
                  {result.cost.toLocaleString()} ₸
                </p>
                <p className="text-lg text-gray-600 mt-3">
                  Distance: {result.distance} km
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}