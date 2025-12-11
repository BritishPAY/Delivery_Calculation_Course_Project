package kz.package_tracking.repository;

import kz.package_tracking.model.Package;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PackageRepository extends JpaRepository<Package, String> {

    Package findByTrackingNumber(String trackingNumber);

    void deleteByTrackingNumber(String trackingNumber);

    List<Package> findBySenderFirstNameContainingIgnoreCaseOrSenderLastNameContainingIgnoreCaseOrReceiverFirstNameContainingIgnoreCaseOrReceiverLastNameContainingIgnoreCase(
            String s1, String s2, String s3, String s4
    );
}
