import { useState } from "react";

import Button from "../common/Button";

import Card from "../common/Card";

import Input from "../common/Input";

import ChatMessage from "./ChatMessage";

import { askAI } from "../../services/aiService";

function ChatWindow() {

    const [messages, setMessages] = useState([

        {

            sender: "ai",

            text: "Hi! I can help summarize reports, suggest updates, or answer questions about your team’s work."

        }

    ]);

    const [input, setInput] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSend = async (event) => {

        event?.preventDefault();

        if (!input.trim()) return;

        const userMessage = {

            sender: "user",

            text: input

        };

        setMessages(prev => [...prev, userMessage]);

        setInput("");
        setLoading(true);

        try {

            const data = await askAI(input);

            setMessages(prev => [

                ...prev,

                {

                    sender: "ai",

                    text: data.answer

                }

            ]);

        } catch {

            setMessages(prev => [

                ...prev,

                {

                    sender: "ai",

                    text: "Something went wrong. Please try again."

                }

            ]);

        } finally {

            setLoading(false);

        }

    };

    return (

        <Card className="fixed bottom-24 right-6 flex h-[34rem] max-h-[80vh] w-[24rem] max-w-[calc(100vw-2rem)] flex-col overflow-hidden border border-slate-200 p-0 shadow-2xl">

            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3">

                <div>

                    <h3 className="text-sm font-semibold text-slate-800">AI Assistant</h3>

                    <p className="text-xs text-slate-500">Helpful support for reports and projects</p>

                </div>

                <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[11px] font-semibold text-blue-700">

                    Online

                </span>

            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4">

                {messages.map((message, index) => (

                    <ChatMessage

                        key={`${message.sender}-${index}`}

                        sender={message.sender}

                        text={message.text}

                    />

                ))}

                {loading && <ChatMessage sender="ai" text="Thinking..." />}

            </div>

            <form onSubmit={handleSend} className="border-t border-slate-200 bg-white p-3">

                <div className="flex gap-2">

                    <Input

                        value={input}

                        onChange={(event) => setInput(event.target.value)}

                        className="flex-1"

                        placeholder="Ask anything..."

                    />

                    <Button type="submit" size="md" className="shrink-0">

                        Send

                    </Button>

                </div>

            </form>

        </Card>

    );

}

export default ChatWindow;