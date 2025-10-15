import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "@/pages/authentication/LoginPage";
import RegisterPage from "./pages/authentication/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
