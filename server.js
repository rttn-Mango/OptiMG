import express from 'express';
import cors from 'cors'
import tinify from 'tinify';
import bodyParser from 'body-parser';
import {Buffer} from 'buffer'
import dotenv from 'dotenv'

const PORT = 3000;
const app = express();
dotenv.config();
tinify.key = `${process.env.VITE_API_KEY}`

app.use(cors())
app.use(bodyParser.json({limit: '5mb', extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/compressed', async (req, res) => {
    //Store the base64 data to data  variable using bodyparser
    const data = req.body.base64Data

    try{
        const imageBuffer = Buffer.from(data, 'base64');

        const source = tinify.fromBuffer(imageBuffer)
        const result = await source.toBuffer();

        //Store the compressed base64 data as an object
        const compressedImage = {base64: result.toString('base64')}
        res.status(201).end(JSON.stringify(compressedImage));

    }catch (e) {console.error(e);}
})

app.listen(PORT, () => console.log(`listening on ${PORT}`))