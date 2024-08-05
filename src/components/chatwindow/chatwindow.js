import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

function AnotherChatwindow() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const inputRef = useRef(null);
    const sendRef = useRef(null);
    const messagesEndRef = useRef(null);

    async function generateAnswer() {
        const question = input;
        if (!question.trim()) return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'question', text: question }
        ]);
        setInput('');

        const response = await axios({
            url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDd7mrCX_tardoZG9UUG1YVd1aeMaYp_vA",
            method: "post",
            data: { contents: [{ parts: [{ text: question }] }] },
        });

        const answer = response.data.candidates[0].content.parts[0].text;

        setMessages((prevMessages) => [
            ...prevMessages,
            { type: 'answer', text: answer }
        ]);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            generateAnswer();
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="h-screen relative">
            <div className="lg:h-9/12 md:h-10/12 h-9/12 my-auto overflow-y-auto scrollbar-thin-transparent p-2 w-full">
                <div className="flex flex-col gap-4 ">
                    {messages.map((message, index) => (
                        <div key={index} className={`flex ${message.type === 'question' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex ${message.type === 'question' ? 'justify-end' : 'justify-start'} gap-2 w-10/12`}>
                                {message.type === 'answer' && <img className="h-5 w-auto" src="./ai.png" alt="" />}
                                <span className={`bg-${message.type === 'question' ? 'gray-600' : 'gray-600'} rounded-lg h-auto p-3`}>
                                    {message.text}
                                </span>
                                {message.type === 'question' && <img className="h-5 w-auto" src="./user.png" alt="" />}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className="flex justify-center p-2">
                <div className="sm:w-11/12 w-full absolute bottom-24 border-[1px] border-gray-300 rounded-full flex justify-between items-center p-2">
                    <input
                        placeholder="Type here"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="text-lg bg-transparent border-transparent outline-none mx-3 w-full"
                        type="text"
                        onKeyDown={handleKeyDown}
                    />
                    <button ref={sendRef} onClick={generateAnswer}>
                        <img className="h-6 w-auto" src="./send.png" alt="" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AnotherChatwindow;
