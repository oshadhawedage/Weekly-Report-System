function ChatMessage({ sender, text }) {

    const isUser = sender === "user";

    return (

        <div
            className={`flex ${
                isUser
                    ? "justify-end"
                    : "justify-start"
            }`}
        >

            <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                    isUser
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 bg-white text-slate-700"
                }`}
            >

                <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide opacity-80">

                    {isUser ? "You" : "AI Assistant"}

                </div>

                <div className="whitespace-pre-wrap text-sm leading-relaxed">

                    {text}

                </div>

            </div>

        </div>

    );

}

export default ChatMessage;