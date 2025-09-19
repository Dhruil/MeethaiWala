import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";


// Register User/Owner
export const registerUser = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, data);
    return { success: true, token: res.data.token, message: res.data.message, user:res.data.user  };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error" };
  }
};

// Login User/Owner
export const loginUser = async (data) => {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { ...data, type: data.role });
    return { success: true, token: res.data.token, message: res.data.message, user: res.data.user  };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error" };
  }
};
