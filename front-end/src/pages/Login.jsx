import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { loginUser } from "../api/auth";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleInitialSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(formData);
    if (res.success) {
      console.log(res.user);
      login(res.token, formData.role, res.user.name);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-pink-50 px-4">
      <div className="max-w-md w-full">
        <AuthForm
          type="login"
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleInitialSubmit}
        />
      </div>
    </div>
  );
};

export default Login;
