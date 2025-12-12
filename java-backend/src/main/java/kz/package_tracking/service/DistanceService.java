package kz.package_tracking.service;

import org.springframework.stereotype.Service;
import kz.package_tracking.service.CityCoordinates.Coordinates;

@Service
public class DistanceService {

    private static final double EARTH_RADIUS_KM = 6371.0;

    public double calculateDistance(String originCity, String destinationCity) {
        if (originCity.equals(destinationCity)) {
            return 50.0;
        }

        Coordinates origin = CityCoordinates.getCoordinates(originCity);
        Coordinates destination = CityCoordinates.getCoordinates(destinationCity);

        if (origin == null || destination == null) {
            return 500.0;
        }

        // Возвращаем формулу Хаверсина
        return haversineDistance(origin, destination);
    }

    /**
     * Формула Хаверсина для расчета расстояния между двумя точками на сфере
     *
     * Формула:
     * a = sin²(Δx/2) + cos x1 ⋅ cos x2 ⋅ sin²(Δy/2)
     * c = 2 ⋅ atan2(√a, √(1−a))
     * d = R ⋅ c
     *
     * где x - широта, y - долгота, R - радиус Земли
     */
    private double haversineDistance(Coordinates coord1, Coordinates coord2) {
        double lat1Rad = Math.toRadians(coord1.getLatitude());
        double lat2Rad = Math.toRadians(coord2.getLatitude());
        double lon1Rad = Math.toRadians(coord1.getLongitude());
        double lon2Rad = Math.toRadians(coord2.getLongitude());

        double deltaLat = lat2Rad - lat1Rad;
        double deltaLon = lon2Rad - lon1Rad;

        // Формула Хаверсина
        double a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Расстояние = радиус Земли × центральный угол
        double distance = EARTH_RADIUS_KM * c;

        // Округляем до целого числа
        return Math.round(distance);
    }
}