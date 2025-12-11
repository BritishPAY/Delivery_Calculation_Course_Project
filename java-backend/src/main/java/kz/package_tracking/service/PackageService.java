package kz.package_tracking.service;

import kz.package_tracking.model.Package;
import kz.package_tracking.repository.PackageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PackageService {

    private final PackageRepository repo;

    public PackageService(PackageRepository repo) {
        this.repo = repo;
    }

    public Package save(Package pkg) {
        return repo.save(pkg);
    }

    public Package find(String trackingNumber) {
        return repo.findByTrackingNumber(trackingNumber);
    }

    public List<Package> findAll() {
        return repo.findAll();
    }

    public void delete(String trackingNumber) {
        repo.deleteByTrackingNumber(trackingNumber);
    }

    public List<Package> search(String term) {
        return repo
                .findBySenderFirstNameContainingIgnoreCaseOrSenderLastNameContainingIgnoreCaseOrReceiverFirstNameContainingIgnoreCaseOrReceiverLastNameContainingIgnoreCase(
                        term, term, term, term
                );
    }
}
