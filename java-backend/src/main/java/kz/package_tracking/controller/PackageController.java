package kz.package_tracking.controller;

import kz.package_tracking.model.Package;
import kz.package_tracking.model.PackageStatus;
import kz.package_tracking.service.PackageService;
import kz.package_tracking.service.DistanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/packages")
@CrossOrigin(origins = "*")
public class PackageController {

    private final PackageService service;
    private final DistanceService distanceService;

    public PackageController(PackageService service, DistanceService distanceService) {
        this.service = service;
        this.distanceService = distanceService;
    }

    @GetMapping
    public ResponseEntity<List<Package>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @PostMapping
    public ResponseEntity<Package> create(@RequestBody Package pkg) {
        pkg.setCreatedAt(LocalDateTime.now());
        if (pkg.getStatus() == null) {
            pkg.setStatus(PackageStatus.CREATED);
        }
        if (pkg.getTrackingNumber() == null || pkg.getTrackingNumber().trim().isEmpty()) {
            pkg.setTrackingNumber("KZ" + System.currentTimeMillis());
        }

        if (pkg.getCost() <= 0) {
            double cost = calculateCost(pkg.getOriginCity(), pkg.getDestinationCity(), pkg.getWeight(), pkg.getType().toString());
            pkg.setCost(cost);
        }

        Package saved = service.save(pkg);
        return ResponseEntity.status(201).body(saved);
    }

    @PostMapping("/calculate-cost")
    public ResponseEntity<Map<String, Double>> calculateCost(@RequestBody Map<String, Object> req) {
        try {
            String origin = (String) req.get("originCity");
            String dest = (String) req.get("destinationCity");
            double weight = Double.parseDouble(req.get("weight").toString());
            String type = (String) req.get("type");

            // Используем DistanceService с формулой Гаверсина
            double distance = distanceService.calculateDistance(origin, dest);

            double cost = switch (type) {
                case "EXPRESS" -> 1500 + weight * 200 + distance * 5;
                case "INTERNATIONAL" -> 3000 + weight * 300 + distance * 10;
                default -> 500 + weight * 100 + distance * 2;
            };

            return ResponseEntity.ok(Map.of("cost", cost, "distance", distance));
        } catch (Exception e) {
            return ResponseEntity.ok(Map.of("cost", 0.0, "distance", 0.0));
        }
    }

    private double calculateCost(String origin, String dest, double weight, String type) {
        // Используем DistanceService с формулой Гаверсина
        double distance = distanceService.calculateDistance(origin, dest);

        return switch (type) {
            case "EXPRESS" -> 1500 + weight * 200 + distance * 5;
            case "INTERNATIONAL" -> 3000 + weight * 300 + distance * 10;
            default -> 500 + weight * 100 + distance * 2;
        };
    }
}