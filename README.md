# Meghla Weather

A responsive weather app for searching cities or checking the weather at your current location. It shows live conditions and practical suggestions based on the weather.

## Features

- Search for a city and resolve it to coordinates with Open-Meteo geocoding.
- Use browser location detection to load local weather.
- View current temperature, humidity, wind speed, feels-like temperature, and WMO weather conditions.
- Get simple recommendations based on rain, temperature, humidity, and wind.
- Responsive layouts for mobile and desktop.

Weather and geocoding data are provided by [Open-Meteo](https://open-meteo.com/); no API key is required. Current-location lookup requires browser permission and a secure context (HTTPS or localhost).

## Development

```sh
npm install
npm run dev
```

## Validation

```sh
npm run lint
npm run build
```
