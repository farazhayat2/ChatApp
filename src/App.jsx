import React, { useState, useEffect } from "react";
import { auth, provider } from "./Components/Firebase";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import ChatRoom from "./Components/ChatRoom";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        alert("Login failed: " + error.message);
      }
    }
  };

  const logout = () => signOut(auth);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
        padding: "1rem",
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "600px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          padding: "2rem",
          boxSizing: 'border-box'
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
          💬 React Firebase Chat
        </h2>

        {!user ? (
          <button
            onClick={login}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              backgroundColor: "#4285F4",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Sign in with Google
          </button>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <p style={{ margin: 0 }}>👋 Hello, <strong>{user.displayName}</strong></p>
              <button
                onClick={logout}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#e91e63",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Logout
              </button>
            </div>
            <ChatRoom user={user} />
          </>
        )}
      </div>
    </div>
  );
}
