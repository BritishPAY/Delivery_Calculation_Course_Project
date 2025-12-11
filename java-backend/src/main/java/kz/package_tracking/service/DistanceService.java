package kz.package_tracking.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

/**
 * Service for calculating distances between Kazakhstan cities.
 * Uses a predefined distance matrix for major cities.
 */
@Service
public class DistanceService {
    
    private Map<String, Map<String, Double>> distanceMatrix;
    
    public DistanceService() {
        initializeDistanceMatrix();
    }
    
    /**
     * Calculate distance between two cities.
     * 
     * @param originCity Origin city name
     * @param destinationCity Destination city name
     * @return Distance in kilometers
     */
    public double calculateDistance(String originCity, String destinationCity) {
        if (originCity.equals(destinationCity)) {
            return 50.0; // Base distance for same city
        }
        
        Map<String, Double> fromOrigin = distanceMatrix.get(originCity);
        if (fromOrigin != null && fromOrigin.containsKey(destinationCity)) {
            return fromOrigin.get(destinationCity);
        }
        
        // Default distance if not in matrix
        return 500.0;
    }
    
    /**
     * Initialize distance matrix with approximate distances between major Kazakhstan cities.
     */
    private void initializeDistanceMatrix() {
        distanceMatrix = new HashMap<>();
        
        // Almaty distances
        Map<String, Double> almatyDistances = new HashMap<>();
        almatyDistances.put("Astana", 1200.0);
        almatyDistances.put("Shymkent", 690.0);
        almatyDistances.put("Karaganda", 980.0);
        almatyDistances.put("Aktobe", 2050.0);
        almatyDistances.put("Pavlodar", 1250.0);
        almatyDistances.put("Ust-Kamenogorsk", 520.0);
        almatyDistances.put("Semey", 620.0);
        distanceMatrix.put("Almaty", almatyDistances);
        
        // Astana distances
        Map<String, Double> astanaDistances = new HashMap<>();
        astanaDistances.put("Almaty", 1200.0);
        astanaDistances.put("Shymkent", 1400.0);
        astanaDistances.put("Karaganda", 220.0);
        astanaDistances.put("Aktobe", 1100.0);
        astanaDistances.put("Pavlodar", 450.0);
        distanceMatrix.put("Astana", astanaDistances);
        
        // Shymkent distances
        Map<String, Double> shymkentDistances = new HashMap<>();
        shymkentDistances.put("Almaty", 690.0);
        shymkentDistances.put("Astana", 1400.0);
        shymkentDistances.put("Taraz", 180.0);
        shymkentDistances.put("Turkistan", 120.0);
        distanceMatrix.put("Shymkent", shymkentDistances);
        
        // Add more city pairs as needed
    }
}
