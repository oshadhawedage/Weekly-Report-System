import axios from "./axios";

export const askAI = async (message) => {

    const response = await axios.post("/ai/chat", {

        message

    });

    return response.data;

};