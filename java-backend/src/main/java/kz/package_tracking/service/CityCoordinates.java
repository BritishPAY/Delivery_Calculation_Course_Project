package kz.package_tracking.service;

import java.util.HashMap;
import java.util.Map;

public class CityCoordinates {

    private static final Map<String, Coordinates> CITY_COORDS = new HashMap<>();

    static {
        CITY_COORDS.put("Almaty", new Coordinates(43.2220, 76.8512));
        CITY_COORDS.put("Astana", new Coordinates(51.1694, 71.4491));
        CITY_COORDS.put("Shymkent", new Coordinates(42.3417, 69.5901));
        CITY_COORDS.put("Karaganda", new Coordinates(49.8047, 73.1094));
        CITY_COORDS.put("Aktobe", new Coordinates(50.2839, 57.1670));
        CITY_COORDS.put("Pavlodar", new Coordinates(52.2873, 76.9674));
        CITY_COORDS.put("Ust-Kamenogorsk", new Coordinates(49.9481, 82.6283));
        CITY_COORDS.put("Semey", new Coordinates(50.4111, 80.2275));
        CITY_COORDS.put("Atyrau", new Coordinates(47.1164, 51.8831));
        CITY_COORDS.put("Kostanay", new Coordinates(53.2144, 63.6246));
        CITY_COORDS.put("Kyzylorda", new Coordinates(44.8479, 65.5093));
        CITY_COORDS.put("Petropavl", new Coordinates(54.8667, 69.1500));
        CITY_COORDS.put("Taraz", new Coordinates(42.9000, 71.3667));
        CITY_COORDS.put("Uralsk", new Coordinates(51.2333, 51.3667));
        CITY_COORDS.put("Temirtau", new Coordinates(50.0547, 72.9636));
        CITY_COORDS.put("Aktau", new Coordinates(43.6500, 51.2000));
        CITY_COORDS.put("Ekibastuz", new Coordinates(51.7236, 75.3228));
        CITY_COORDS.put("Zhezkazgan", new Coordinates(47.7833, 67.7667));
        CITY_COORDS.put("Stepnogorsk", new Coordinates(52.3500, 71.8833));
        CITY_COORDS.put("Turkistan", new Coordinates(43.3000, 68.2500));
    }

    public static Coordinates getCoordinates(String city) {
        return CITY_COORDS.get(city);
    }

    public static boolean hasCity(String city) {
        return CITY_COORDS.containsKey(city);
    }

    public static class Coordinates {
        private final double latitude;
        private final double longitude;

        public Coordinates(double latitude, double longitude) {
            this.latitude = latitude;
            this.longitude = longitude;
        }

        public double getLatitude() {
            return latitude;
        }

        public double getLongitude() {
            return longitude;
        }
    }
}