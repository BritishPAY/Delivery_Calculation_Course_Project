package kz.package_tracking.service;

import kz.package_tracking.model.Package;

/**
 * Экспресс стоимость формула: 1500 + 200 за кило + 5 за км
 */
public class ExpressCostStrategy implements CostCalculationStrategy {
    
    private static final double BASE_RATE = 1500.0;
    private static final double RATE_PER_KG = 200.0;
    private static final double RATE_PER_KM = 5.0;
    
    @Override
    public double calculateCost(Package pkg, double distance) {
        return BASE_RATE + (pkg.getWeight() * RATE_PER_KG) + (distance * RATE_PER_KM);
    }
}
