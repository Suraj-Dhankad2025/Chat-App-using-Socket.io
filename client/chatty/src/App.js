import "./App.css";
import { nanoid } from "nanoid";
import io from "socket.io-client";
import { useState, useEffect } from "react";
const socket = io.connect("http://localhost:5500");
const userName = nanoid(4);
function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", {message, userName});
    setMessage("");
  };
  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  })
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chat App Using Socket.io</h1>
        {chat.map((payload, index) => {
          return (
            <p key={index}>{payload.message}:<span>id:{payload.userName}</span></p>
            );
        })}
        <form onSubmit={sendChat}>
          <input
            type="text"
            name="chat"
            value={message}
            placeholder="Type here..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div> 
  );
}

export default App;
