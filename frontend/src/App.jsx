import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "@/pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/SignupPage";
import DashboardPage from "@/pages/DashboardPage";
import ProtectedRoute from "@/components/ProtectedRoute.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<RegisterPage />} />
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
