import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "@/pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/SignupPage";
import DashboardPage from "@/pages/DashboardPage";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";
import UserAuthControl from "@/components/UserAuthControl.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route
          path="/auth/signup"
          element={
            <UserAuthControl>
              <RegisterPage />
            </UserAuthControl>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
