# Package Tracking System - Java Backend

## Overview
This is a Spring Boot-based REST API backend for the Package Tracking and Delivery Cost Management System.

## Architecture

### Key Components

1. **Model Layer** (`model/`)
   - `Package.java` - Main entity representing a package
   - `PackageType.java` - Enum for package types (STANDARD, EXPRESS, INTERNATIONAL)
   - `PackageStatus.java` - Enum for package statuses

2. **Service Layer** (`service/`)
   - `PackageService.java` - Business logic for package management
   - `DistanceService.java` - Calculates distances between cities
   - `CostCalculationStrategy.java` - Interface for cost calculation (Strategy Pattern)
   - `StandardCostStrategy.java` - Standard delivery cost calculation
   - `ExpressCostStrategy.java` - Express delivery cost calculation

3. **Repository Layer** (`repository/`)
   - `PackageRepository.java` - In-memory data storage using ConcurrentHashMap

4. **Controller Layer** (`controller/`)
   - `PackageController.java` - REST API endpoints

## OOP Principles Demonstrated

- **Encapsulation**: All fields are private with public getters/setters
- **Inheritance**: PackageType enum extends functionality
- **Polymorphism**: CostCalculationStrategy interface with multiple implementations
- **Abstraction**: Strategy pattern for cost calculation
- **Composition**: Services composed together (PackageService uses DistanceService)

## API Endpoints

### Create Package
\`\`\`
POST /api/packages
Content-Type: application/json

{
  "senderFirstName": "Алексей",
  "senderLastName": "Иванов",
  "receiverFirstName": "Мария",
  "receiverLastName": "Петрова",
  "originCity": "Almaty",
  "destinationCity": "Astana",
  "weight": 5.5,
  "type": "STANDARD"
}
\`\`\`

### Calculate Cost
\`\`\`
POST /api/packages/calculate-cost
Content-Type: application/json

{
  "originCity": "Almaty",
  "destinationCity": "Astana",
  "weight": 5.5,
  "type": "STANDARD"
}
\`\`\`

### Get All Packages
\`\`\`
GET /api/packages
\`\`\`

### Get Package by Tracking Number
\`\`\`
GET /api/packages/{trackingNumber}
\`\`\`

## Running the Application

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Build and Run
\`\`\`bash
cd java-backend
mvn clean install
mvn spring-boot:run
\`\`\`

The server will start on `http://localhost:8080`

## Cost Calculation Formula

### Standard Delivery
- Base Rate: 500 KZT
- Per Kilogram: 100 KZT
- Per Kilometer: 2 KZT

**Total = 500 + (weight × 100) + (distance × 2)**

### Express Delivery
- Base Rate: 1500 KZT
- Per Kilogram: 200 KZT
- Per Kilometer: 5 KZT

**Total = 1500 + (weight × 200) + (distance × 5)**

## Testing
JUnit tests can be added in `src/test/java/kz/package_tracking/`

Example test structure:
- `PackageServiceTest.java` - Test business logic
- `CostCalculationTest.java` - Test cost strategies
- `DistanceServiceTest.java` - Test distance calculations

## Design Patterns Used
- **Strategy Pattern**: Cost calculation strategies
- **Repository Pattern**: Data access abstraction
- **Dependency Injection**: Spring's built-in DI container
- **MVC Pattern**: Model-View-Controller architecture
