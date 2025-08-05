# Strava Image Recognizer API
Strava Image Recognizer

## Installation
```bash
npm install
```

## Usage
```bash
npm run start
```

## API
```bash
POST /upload
```

## Example
```bash
POST /upload
Content-Type: multipart/form-data

file: <image>
```

## Response
```json
{
    "success": true,
    "stats": {
        "distance": "10 km",
        "pace": "5:30/km",
        "movingTime": "01:23:45",
        "elevationGain": "100 m",
        "calories": "500 Cal",
        "heartRate": "120 bpm"
    }
}
```