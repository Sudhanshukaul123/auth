import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";
import UserProfile from "./Components/UserProfile";
import { UserProvider, useUser } from "./contexts/useContext";
// App.jsx
function AppContent() {
  const { user, loading } = useUser();

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Redirect root path to user’s profile if logged in */}
      <Route
        path="/"
        element={user ? <Navigate to={`/${user.username}`} /> : <Home />}
      />

      {/* Profile Route */}
      <Route path="/:username" element={<UserProfile />} />

      {/* Fallback */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default function App() {
  return <AppContent />;
}
