package kz.package_tracking.controller;

import kz.package_tracking.model.Package;
import kz.package_tracking.service.PackageService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/packages")
public class PackageController {

    private final PackageService service;

    public PackageController(PackageService service) {
        this.service = service;
    }

    @GetMapping
    public List<Package> getAll() {
        return service.findAll();
    }

    @GetMapping("/{trackingNumber}")
    public Package getById(@PathVariable String trackingNumber) {
        return service.find(trackingNumber);
    }

    @PostMapping
    public Package create(@RequestBody Package pkg) {
        return service.save(pkg);
    }

    @DeleteMapping("/{trackingNumber}")
    public void delete(@PathVariable String trackingNumber) {
        service.delete(trackingNumber);
    }

    @GetMapping("/search")
    public List<Package> search(@RequestParam String q) {
        return service.search(q);
    }
}
