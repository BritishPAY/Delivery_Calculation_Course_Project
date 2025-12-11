import { PackageForm } from "@/components/package-form"
import { Calculator, PackageIcon, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <h1 className="text-4xl font-bold text-center mb-4">Package Tracking System</h1>
        <p className="text-center text-gray-600 mb-8">Kazakhstan-wide delivery management</p>

        <div className="flex justify-center gap-4 mb-12">
          <Button asChild>
            <Link href="/">Register Package</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/calculator">Cost Calculator</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/packages">View History</Link>
          </Button>
        </div>

        <PackageForm />
      </div>
    </div>
  )
}