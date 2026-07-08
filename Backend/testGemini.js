import "dotenv/config";
import { askGemini } from "./services/aiService.js";



const test = async()=>{

    const answer = await askGemini(
        "Explain what a REST API is in one sentence"
    );


    console.log(answer);

};


test();