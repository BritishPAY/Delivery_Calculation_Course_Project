package kz.package_tracking.service;

import kz.package_tracking.model.Package;

/**
 * Standard delivery cost calculation strategy.
 * Base rate: 500 KZT + 100 KZT per kg + 2 KZT per km
 */
public class StandardCostStrategy implements CostCalculationStrategy {
    
    private static final double BASE_RATE = 500.0;
    private static final double RATE_PER_KG = 100.0;
    private static final double RATE_PER_KM = 2.0;
    
    @Override
    public double calculateCost(Package pkg, double distance) {
        return BASE_RATE + (pkg.getWeight() * RATE_PER_KG) + (distance * RATE_PER_KM);
    }
}
