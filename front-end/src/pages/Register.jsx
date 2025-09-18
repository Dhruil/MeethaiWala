import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { registerUser } from "../api/auth";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleInitialSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);

      if (res.success) {
        login(res.token, formData.role, formData.name);
        navigate("/dashboard");
      } else {
        alert(res.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-blue-50 px-4">
      <div className="max-w-md w-full">
        <AuthForm
          type="register"
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleInitialSubmit}
        />
      </div>
    </div>
  );
};

export default Register;
