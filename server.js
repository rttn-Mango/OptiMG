import cors from 'cors';
import tinify from 'tinify';
import bodyParser from 'body-parser';
import {Buffer} from 'buffer'
import dotenv from 'dotenv'
import axios from 'axios';
import express from 'express'

const PORT = 3000;
const app = express();
dotenv.config();
tinify.key = `${process.env.VITE_API_KEY}`

app.use(cors())
app.use(bodyParser.json({limit: '5mb', express: true}));
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/compressed', async (req, res) => {
    //Store the base64 data to data  variable using bodyparser
    const data = req.body.base64Data

    try{

        //Convert the base64 to Buffer
        const imageBuffer = Buffer.from(data, 'base64');

        const source = tinify.fromBuffer(imageBuffer)
        const result = await source.toBuffer();

        //Convert the Buffer response to base64
        const compressedImage = {base64: result.toString('base64')}
        res.status(200).end(JSON.stringify(compressedImage));

    }catch (e) {
        return res.send(e);
    }
})

app.post('/convert', async (req, res) => {

    //Convert the passed base64 to Buffer
    const base64 = req.body.base64Data;
    const imageBuffer = Buffer.from(base64, 'base64')
    
    try{
        const response = await axios({
            url: `https://api.cloudmersive.com/convert/${req.body.originalFormat}/to/${req.body.formatToConvert}`,
            method: 'POST',
            timeout: 0,
            headers: {
                'Content-Type': 'multipart/form-data',  
                'Apikey': `${process.env.VITE_CONVERT_API_KEY}`
            },
            processData: false,
            mimeType: 'multipart/form-data',
            contentType: false,
            responseType: 'arraybuffer',
            data: imageBuffer
        })

        //Convert the Buffer response to base64 and send it as the reponse along with the formatToConvert
        const convertedImage = {
            base64: response.data.toString('base64'),
            format: req.body.formatToConvert
        }
        
        res.status(200).end(JSON.stringify(convertedImage))
    }catch(e){
        return res.send(e)
    }
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})