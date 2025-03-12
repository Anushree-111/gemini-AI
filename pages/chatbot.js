import { useState, useRef, useEffect } from "react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello there! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Function to send a message to FastAPI backend
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();

      // Add bot response to chat
      setMessages([...newMessages, { text: data.reply, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { text: "Error getting response.", sender: "bot" }]);
    }
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-4">
        {/* Chat header */}
        <h2 className="text-center text-xl font-bold">Hi, I'm AI Chatbot.</h2>
        <p className="text-center text-gray-600 mb-4">How can I help you today?</p>

        {/* Chat messages */}
        <div className="h-96 overflow-y-auto border rounded-lg p-3 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 my-2 max-w-xs rounded-lg ${msg.sender === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-black self-start mr-auto"}`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input box */}
        <div className="flex mt-4">
          <input
            type="text"
            className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            placeholder="Message Chatbot"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-r-lg"
            onClick={sendMessage}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}
