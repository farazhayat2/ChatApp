import React, { useEffect, useState, useRef } from "react";
import { db } from "./Firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

export default function ChatRoom({ user }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const messagesRef = collection(db, "messages");

  useEffect(() => {
    const q = query(messagesRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") return;

    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp(),
      displayName: user.displayName,
      uid: user.uid,
    });

    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <div
        style={{
          height: "300px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
          marginBottom: "1rem",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.map((msg) => {
          const isOwn = msg.uid === user.uid;
          return (
            <div
              key={msg.id}
              style={{
                alignSelf: isOwn ? "flex-end" : "flex-start",
                backgroundColor: isOwn ? "#dcf8c6" : "#e5e5ea",
                padding: "10px 14px",
                borderRadius: "20px",
                maxWidth: "80%",
                wordWrap: "break-word",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <div
                style={{
                  fontSize: "0.85rem",
                  color: "#555",
                  marginBottom: "4px",
                }}
              >
                {msg.displayName}
              </div>
              <div style={{ fontSize: "1rem", color: "#333" }}>{msg.text}</div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <form
  onSubmit={sendMessage}
  style={{
    display: "flex",
    flexDirection: window.innerWidth < 480 ? "column" : "row", // 📱 Stack on mobile
    gap: "10px",
    alignItems: "stretch"
  }}
>
  <input
    type="text"
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    placeholder="Type a message..."
    style={{
      flex: 1,
      padding: "10px",
      borderRadius: "20px",
      border: "1px solid #ccc",
      fontSize: "16px",
      width: "100%", // ✅ Let input stretch full width on column
      boxSizing: "border-box"
    }}
  />
  <button
    type="submit"
    style={{
      padding: "10px 16px",
      backgroundColor: "#4caf50",
      color: "#fff",
      border: "none",
      borderRadius: "20px",
      fontSize: "16px",
      cursor: "pointer",
      width: window.innerWidth < 480 ? "100%" : "auto" // 📱 Full width on small screens
    }}
  >
    Send
  </button>
</form>
    </div>
  );
}
