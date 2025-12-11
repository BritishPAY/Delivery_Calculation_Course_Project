package kz.package_tracking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "packages")
public class Package {

    @Id
    @Column(nullable = false, unique = true)
    private String trackingNumber;

    private String senderFirstName;
    private String senderLastName;

    private String receiverFirstName;
    private String receiverLastName;

    private String originCity;
    private String destinationCity;

    private double weight;
    private double cost;

    @Enumerated(EnumType.STRING)
    private PackageType type;

    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private PackageStatus status;

    public Package() {
        this.createdAt = LocalDateTime.now();
        this.status = PackageStatus.CREATED;
    }

    public String getTrackingNumber() {
        return trackingNumber;
    }

    public void setTrackingNumber(String trackingNumber) {
        this.trackingNumber = trackingNumber;
    }

    public String getSenderFirstName() {
        return senderFirstName;
    }

    public void setSenderFirstName(String senderFirstName) {
        this.senderFirstName = senderFirstName;
    }

    public String getSenderLastName() {
        return senderLastName;
    }

    public void setSenderLastName(String senderLastName) {
        this.senderLastName = senderLastName;
    }

    public String getReceiverFirstName() {
        return receiverFirstName;
    }

    public void setReceiverFirstName(String receiverFirstName) {
        this.receiverFirstName = receiverFirstName;
    }

    public String getReceiverLastName() {
        return receiverLastName;
    }

    public void setReceiverLastName(String receiverLastName) {
        this.receiverLastName = receiverLastName;
    }

    public String getOriginCity() {
        return originCity;
    }

    public void setOriginCity(String originCity) {
        this.originCity = originCity;
    }

    public String getDestinationCity() {
        return destinationCity;
    }

    public void setDestinationCity(String destinationCity) {
        this.destinationCity = destinationCity;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public PackageType getType() {
        return type;
    }

    public void setType(PackageType type) {
        this.type = type;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public PackageStatus getStatus() {
        return status;
    }

    public void setStatus(PackageStatus status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Package{" +
                "trackingNumber='" + trackingNumber + '\'' +
                ", sender=" + senderFirstName + " " + senderLastName +
                ", receiver=" + receiverFirstName + " " + receiverLastName +
                ", origin='" + originCity + '\'' +
                ", destination='" + destinationCity + '\'' +
                ", weight=" + weight +
                ", cost=" + cost +
                '}';
    }
}