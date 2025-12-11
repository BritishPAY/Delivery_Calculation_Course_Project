export type PackageType = "STANDARD" | "EXPRESS"

export type PackageStatus = "CREATED" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED"

export interface Package {
  trackingNumber: string
  senderFirstName: string
  senderLastName: string
  receiverFirstName: string
  receiverLastName: string
  originCity: string
  destinationCity: string
  weight: number
  cost: number
  type: PackageType
  status: PackageStatus
  createdAt: string
}

export interface PackageFormData {
  senderFirstName: string
  senderLastName: string
  receiverFirstName: string
  receiverLastName: string
  originCity: string
  destinationCity: string
  weight: number
  type: PackageType
}

export interface CostCalculationRequest {
  originCity: string
  destinationCity: string
  weight: number
  type: PackageType
}
