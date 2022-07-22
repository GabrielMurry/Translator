const PORT = 8000
const axios = require("axios")
const express = require("express")
const cors = require("cors")
require('dotenv').config()

const app = express()
app.use(cors())

app.get('/translate', (req, res) => {
    const sentence = req.query.sentence
    const fromLanguage = req.query.from
    const toLanguage = req.query.to


    const options = {
        method: 'GET',
        url: 'https://nlp-translation.p.rapidapi.com/v1/translate',
        params: {text: sentence, to: toLanguage, from: fromLanguage},
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': 'nlp-translation.p.rapidapi.com'
        }
    }

    axios.request(options).then((response) => {
        const obj = response.data.translated_text
        const translated = Object.values(obj)[0]
        res.json(translated)
    }).catch((error) => {
	    console.error(error)
    })
})

app.listen(PORT, () => console.log('Server running on port ' + PORT))