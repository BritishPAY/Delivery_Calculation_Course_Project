package kz.package_tracking.service;

import kz.package_tracking.model.Package;

/**
 * Strategy interface for calculating package delivery costs.
 * Implementations provide different calculation algorithms based on package type.
 */
public interface CostCalculationStrategy {
    
    /**
     * Calculate the delivery cost for a package.
     * 
     * @param pkg The package to calculate cost for
     * @param distance The distance in kilometers between origin and destination
     * @return The calculated cost in KZT (Tenge)
     */
    double calculateCost(Package pkg, double distance);
}
