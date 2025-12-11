package kz.package_tracking.model;

/**
 * Enumeration of possible package statuses during delivery lifecycle.
 */
public enum PackageStatus {
    CREATED,
    IN_TRANSIT,
    DELIVERED,
    CANCELLED;

    public boolean isEmpty() {
        return false;
    }
}
