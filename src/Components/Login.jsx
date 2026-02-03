import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Login Component - User authentication form
const Login = () => {
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for error messages
  const [errors, setErrors] = useState({});

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Check if user exists in localStorage
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const userData = JSON.parse(storedUser);
        localStorage.setItem("isAuthenticated", "true");
        alert("Login successful! Welcome back!");
        navigate("/dashboard");
      } else {
        // For demo purposes, create a default user
        const defaultUser = {
          name: "Demo User",
          email: formData.email,
          isAuthenticated: true,
          monthlyIncome: 0,
          monthlyBudget: 0,
        };
        localStorage.setItem("user", JSON.stringify(defaultUser));
        localStorage.setItem("isAuthenticated", "true");
        alert("Login successful! Welcome to ExpenseFlow!");
        navigate("/dashboard");
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="auth-logo">💰</div>
          <h1>ExpenseFlow</h1>
        </div>

        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to manage your expenses</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={errors.email ? "error" : ""}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>

          {/* Password Field with Toggle */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={errors.password ? "error" : ""}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>

          {/* Remember Me Checkbox */}
          <div className="form-checkbox">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-submit">
            Login
          </button>

          {/* Register Link */}
          <div className="auth-footer">
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
