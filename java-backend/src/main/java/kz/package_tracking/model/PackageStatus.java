package kz.package_tracking.model;

//На данный момент я реализовал только статус создан, в планах добавить еще три статуса: DELIVERED, ARRIVED, CANCELED
public enum PackageStatus {
    CREATED;

    public boolean isEmpty() {
        return false; }
}