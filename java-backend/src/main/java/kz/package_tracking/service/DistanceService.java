package kz.package_tracking.service;

import org.springframework.stereotype.Service;
import kz.package_tracking.service.CityCoordinates.Coordinates;

@Service
public class DistanceService {

    // Радиус Земли в километрах
    private static final double EARTH_RADIUS_KM = 6371.0;

    /**
     * Рассчитывает расстояние между двумя городами используя формулу Гаверсина
     *
     * @param originCity город отправления
     * @param destinationCity город назначения
     * @return расстояние в километрах
     */
    public double calculateDistance(String originCity, String destinationCity) {
        // Если города одинаковые
        if (originCity.equals(destinationCity)) {
            return 50.0; // Базовое расстояние для одного города
        }

        // Получаем координаты городов
        Coordinates origin = CityCoordinates.getCoordinates(originCity);
        Coordinates destination = CityCoordinates.getCoordinates(destinationCity);

        // Если координаты не найдены, возвращаем дефолтное значение
        if (origin == null || destination == null) {
            return 500.0;
        }

        // Применяем формулу Гаверсина
        return haversineDistance(origin, destination);
    }

    /**
     * Формула Гаверсина для расчета расстояния между двумя точками на сфере
     *
     * Формула:
     * a = sin²(Δφ/2) + cos φ1 ⋅ cos φ2 ⋅ sin²(Δλ/2)
     * c = 2 ⋅ atan2(√a, √(1−a))
     * d = R ⋅ c
     *
     * где φ - широта, λ - долгота, R - радиус Земли
     *
     * @param coord1 координаты первой точки
     * @param coord2 координаты второй точки
     * @return расстояние в километрах
     */
    private double haversineDistance(Coordinates coord1, Coordinates coord2) {
        // Конвертируем градусы в радианы
        double lat1Rad = Math.toRadians(coord1.getLatitude());
        double lat2Rad = Math.toRadians(coord2.getLatitude());
        double lon1Rad = Math.toRadians(coord1.getLongitude());
        double lon2Rad = Math.toRadians(coord2.getLongitude());

        // Разница широт и долгот
        double deltaLat = lat2Rad - lat1Rad;
        double deltaLon = lon2Rad - lon1Rad;

        // Формула Гаверсина
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