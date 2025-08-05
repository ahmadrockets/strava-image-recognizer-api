const express = require('express');
const multer = require('multer');
const Tesseract = require('tesseract.js');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

const upload = multer({ dest: 'uploads/' });

function extractStats(text) {
    const distance = text.match(/([\d.]+)\s*km/i)?.[0];
    const pace = text.match(/(\d+:\d+)\s*\/km/i)?.[0];
    const movingTime = text.match(/(\d{1,2}:\d{2}:\d{2})/i)?.[0];
    const elevationGain = text.match(/(\d+)\s*m/i)?.[0];
    const calories = text.match(/([\d,]+)\s*Cal/i)?.[0];
    const heartRate = text.match(/(\d+)\s*bpm/i)?.[0];

    return { distance, pace, movingTime, elevationGain, calories, heartRate };
}

app.post('/upload', upload.single('image'), async (req, res) => {
    const filePath = req.file.path;

    try {
        const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
        const stats = extractStats(text);
        
        fs.unlinkSync(filePath);

        res.json({ success: true, stats });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/', (req, res) => {
    res.send('Strava Image Recognizer API is running. POST an image to /upload');
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
