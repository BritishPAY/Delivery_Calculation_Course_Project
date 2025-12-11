"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Package as PackageType } from "@/lib/types"
import { Search, Package, Loader2, RefreshCw, MapPin, Weight } from "lucide-react"

export function PackageList() {
  const [packages, setPackages] = useState<PackageType[]>([])
  const [filteredPackages, setFilteredPackages] = useState<PackageType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  const fetchPackages = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/packages")
      if (response.ok) {
        const data = await response.json()
        setPackages(data)
        setFilteredPackages(data)
      }
    } catch (error) {
      console.error("Failed to fetch packages:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPackages()
  }, [])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPackages(packages)
    } else {
      const term = searchTerm.toLowerCase()
      const filtered = packages.filter(
        (pkg) =>
          pkg.trackingNumber.toLowerCase().includes(term) ||
          pkg.senderFirstName.toLowerCase().includes(term) ||
          pkg.senderLastName.toLowerCase().includes(term) ||
          pkg.receiverFirstName.toLowerCase().includes(term) ||
          pkg.receiverLastName.toLowerCase().includes(term) ||
          pkg.originCity.toLowerCase().includes(term) ||
          pkg.destinationCity.toLowerCase().includes(term),
      )
      setFilteredPackages(filtered)
    }
  }, [searchTerm, packages])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "IN_TRANSIT":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "DELIVERED":
        return "bg-green-100 text-green-800 border-green-200"
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-6">
      {/* Search and Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              All Packages
            </div>
            <Button onClick={fetchPackages} variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by tracking number, name, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Package Count */}
      {!loading && (
        <div className="text-sm text-gray-600">
          Showing {filteredPackages.length} of {packages.length} packages
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      )}

      {/* Empty State */}
      {!loading && packages.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Package className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-1">No packages yet</p>
            <p className="text-sm text-gray-500">Create your first package to get started</p>
          </CardContent>
        </Card>
      )}

      {/* No Results State */}
      {!loading && packages.length > 0 && filteredPackages.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Search className="h-16 w-16 text-gray-300 mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-1">No packages found</p>
            <p className="text-sm text-gray-500">Try adjusting your search term</p>
          </CardContent>
        </Card>
      )}

      {/* Package List */}
      {!loading && filteredPackages.length > 0 && (
        <div className="grid gap-4">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.trackingNumber} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left Section: Tracking and Status */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-mono font-bold text-lg">{pkg.trackingNumber}</p>
                        <Badge className={getStatusColor(pkg.status)} variant="outline">
                          {pkg.status.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>

                    {/* Route Information */}
                    <div className="flex items-center gap-2 text-sm mb-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">
                        <span className="font-medium text-gray-900">{pkg.originCity}</span>
                        {" → "}
                        <span className="font-medium text-gray-900">{pkg.destinationCity}</span>
                      </span>
                    </div>

                    {/* Weight */}
                    <div className="flex items-center gap-2 text-sm">
                      <Weight className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{pkg.weight} kg</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-600">{pkg.type}</span>
                    </div>
                  </div>

                  {/* Middle Section: People */}
                  <div className="flex-1 space-y-3 border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Sender</p>
                      <p className="font-medium text-gray-900">
                        {pkg.senderFirstName} {pkg.senderLastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Receiver</p>
                      <p className="font-medium text-gray-900">
                        {pkg.receiverFirstName} {pkg.receiverLastName}
                      </p>
                    </div>
                  </div>

                  {/* Right Section: Cost and Date */}
                  <div className="flex-1 text-right border-t lg:border-t-0 lg:border-l pt-4 lg:pt-0 lg:pl-6">
                    <div className="mb-3">
                      <p className="text-xs text-gray-500 mb-1">Total Cost</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {pkg.cost.toFixed(2)} <span className="text-sm font-normal">KZT</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Created</p>
                      <p className="text-sm text-gray-600">{formatDate(pkg.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
