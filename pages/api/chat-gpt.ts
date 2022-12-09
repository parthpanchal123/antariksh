import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const URL = "https://api.openai.com/v1/completions";

    const bearerToken = process.env.CHAT_GPT_API_KEY;

    const promptMessage = req.body.prompt;

    console.log(promptMessage);

    if(!promptMessage) return res.json({ message : "No prompt message provided"});

    const config = {
        headers: {
            "Authorization": `Bearer ${bearerToken}`,
            "Content-Type": "application/json"
        }
    }

    try {
        const responseData = await axios.post(URL, {
            "model": "text-davinci-003",
            "prompt": promptMessage,
            "temperature": 0,
            "max_tokens": 100,
            "top_p": 1,
            "frequency_penalty": 0,
            "presence_penalty": 0,
        }, config)
        return res.status(200).json(responseData.data);
    } catch (error: any) {
        console.log(error);
        return res.status(error.status).json(error.data)
    }

}

