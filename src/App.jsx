import React, { useState, useEffect } from "react";
import { auth, provider } from "./Components/Firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import ChatRoom from "./Components/ChatRoom";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Handle auth state persistence
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert("Login error: " + error.message);
    }
  };

  const logout = () => signOut(auth);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
        padding: "1rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          width: "100%",
          maxWidth: "600px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
          padding: "1.5rem",
          boxSizing: "border-box",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
          💬 React Firebase Chat
        </h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading...</p>
        ) : !user ? (
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
                flexWrap: "wrap",
                gap: "8px",
              }}
            >
              <p style={{ margin: 0 }}>
                👋 Hello, <strong>{user.displayName}</strong>
              </p>
              <button
                onClick={logout}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#e91e63",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
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
