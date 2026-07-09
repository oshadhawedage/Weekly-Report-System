import { useState } from "react";

import Button from "../common/Button";

import ChatWindow from "./ChatWindow";

function ChatWidget() {

    const [open, setOpen] = useState(false);

    return (

        <>

            {open && <ChatWindow />}

            <Button

                type="button"
                onClick={() => setOpen(!open)}
                variant="primary"
                className="ai-float-button fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-full p-0 text-[1.5rem] leading-none shadow-[0_12px_30px_rgba(37,99,235,0.35)] ring-4 ring-white/70"
                aria-label={open ? "Close AI assistant" : "Open AI assistant"}

            >

                {open ? "×" : "🤖"}

            </Button>

        </>

    );

}

export default ChatWidget;