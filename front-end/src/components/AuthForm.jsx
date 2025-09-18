import InputField from "./InputField";

const AuthForm = ({ type, formData, setFormData, handleSubmit }) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {type === "login" ? "Welcome Back" : "Create Account"}
        </h2>
        <p className="text-gray-600">
          {type === "login"
            ? "Sign in to your account"
            : "Join Meethai Wala today"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {type === "register" && (
          <InputField
            label="Full Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
          />
        )}

        <InputField
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Enter your email"
        />

        <InputField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          placeholder="Enter your password"
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Account Type
          </label>
          <select
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            required
          >
            <option value="">Select your role</option>
            <option value="user">Customer</option>
            <option value="owner">Shop Owner</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 font-medium text-lg"
        >
          {type === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {type === "login"
            ? "Don't have an account? "
            : "Already have an account? "}
          <a
            href={type === "login" ? "/register" : "/login"}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            {type === "login" ? "Sign up" : "Sign in"}
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
