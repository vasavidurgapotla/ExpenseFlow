import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// SetupProfile Component - Initial setup for new users
const SetupProfile = () => {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    monthlyIncome: "",
    monthlyBudget: "",
    currency: "INR",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!profileData.monthlyIncome) {
      newErrors.monthlyIncome = "Monthly income is required";
    } else if (
      isNaN(profileData.monthlyIncome) ||
      Number(profileData.monthlyIncome) <= 0
    ) {
      newErrors.monthlyIncome = "Please enter a valid amount";
    }

    if (!profileData.monthlyBudget) {
      newErrors.monthlyBudget = "Monthly budget is required";
    } else if (
      isNaN(profileData.monthlyBudget) ||
      Number(profileData.monthlyBudget) <= 0
    ) {
      newErrors.monthlyBudget = "Please enter a valid amount";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Update user data in localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      const updatedUser = {
        ...user,
        monthlyIncome: Number(profileData.monthlyIncome),
        monthlyBudget: Number(profileData.monthlyBudget),
        currency: profileData.currency,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile setup complete! Welcome to ExpenseFlow!");
      navigate("/dashboard");
    } else {
      setErrors(newErrors);
    }
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="setup-container">
      <div className="setup-card">
        <div className="setup-header">
          <div className="setup-icon">🎯</div>
          <h2>Complete Your Profile</h2>
          <p>Set up your financial goals to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="setup-form">
          {/* Monthly Income */}
          <div className="form-group">
            <label htmlFor="monthlyIncome">Monthly Income (₹)</label>
            <input
              type="number"
              id="monthlyIncome"
              name="monthlyIncome"
              value={profileData.monthlyIncome}
              onChange={handleChange}
              placeholder="Enter your monthly income"
              className={errors.monthlyIncome ? "error" : ""}
            />
            {errors.monthlyIncome && (
              <span className="error-message">{errors.monthlyIncome}</span>
            )}
          </div>

          {/* Monthly Budget */}
          <div className="form-group">
            <label htmlFor="monthlyBudget">Monthly Budget (₹)</label>
            <input
              type="number"
              id="monthlyBudget"
              name="monthlyBudget"
              value={profileData.monthlyBudget}
              onChange={handleChange}
              placeholder="Enter your monthly budget"
              className={errors.monthlyBudget ? "error" : ""}
            />
            {errors.monthlyBudget && (
              <span className="error-message">{errors.monthlyBudget}</span>
            )}
            <small className="form-hint">
              Recommended: 70-80% of your income
            </small>
          </div>

          {/* Submit Buttons */}
          <div className="setup-buttons">
            <button type="submit" className="btn-submit">
              Complete Setup
            </button>
            <button type="button" onClick={handleSkip} className="btn-skip">
              Skip for Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetupProfile;
