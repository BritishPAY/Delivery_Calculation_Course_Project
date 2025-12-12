package kz.package_tracking.service;

import kz.package_tracking.model.Package;

public interface CostCalculationStrategy {
    double calculateCost(Package pkg, double distance);
}
