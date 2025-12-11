import { PackageForm } from "@/components/package-form"
import { Calculator, Package, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Package Tracking System</h1>
          <p className="text-gray-600 text-lg">Manage your deliveries across Kazakhstan with ease</p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button asChild variant="default">
            <Link href="/" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Register Package
            </Link>
          </Button>
          <Button asChild variant="outline">
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

        {/* Main Content */}
        <PackageForm />
      </div>
    </div>
  )
}
