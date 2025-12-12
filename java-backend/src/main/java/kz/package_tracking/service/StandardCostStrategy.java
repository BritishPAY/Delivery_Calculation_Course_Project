package kz.package_tracking.service;

import kz.package_tracking.model.Package;

/**
 * Базовая стоимость формула: 500 + 100 за кило + 2 KZT за км
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
