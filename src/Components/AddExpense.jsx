import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// AddExpense Component - Form to create new expense with localStorage
const AddExpense = () => {
  const navigate = useNavigate();

  // Categories for expenses
  const categories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Utilities",
    "Healthcare",
    "Education",
    "Other",
  ];

  // State for form data
  const [expenseData, setExpenseData] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });

  // State for errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
    // Clear error
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

    if (!expenseData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!expenseData.amount) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(expenseData.amount) || Number(expenseData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (!expenseData.date) {
      newErrors.date = "Date is required";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Get existing expenses from localStorage
      const existingExpenses = JSON.parse(
        localStorage.getItem("expenses") || "[]",
      );

      // Create new expense with unique ID
      const newExpense = {
        id: Date.now(), // Simple ID generation
        ...expenseData,
        amount: Number(expenseData.amount),
      };

      // Add to expenses array
      const updatedExpenses = [newExpense, ...existingExpenses];

      // Save to localStorage
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      alert("Expense added successfully!");
      navigate("/expenses");
    } else {
      setErrors(newErrors);
    }
  };

  // Reset form
  const handleReset = () => {
    setExpenseData({
      title: "",
      amount: "",
      category: "Food",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
    setErrors({});
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <div className="form-header">
          <h2>Add New Expense</h2>
          <p>Track your spending by adding expense details</p>
        </div>

        <form onSubmit={handleSubmit} className="expense-form">
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="title">Expense Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={expenseData.title}
              onChange={handleChange}
              placeholder="e.g., Grocery Shopping"
              className={errors.title ? "error" : ""}
            />
            {errors.title && (
              <span className="error-message">{errors.title}</span>
            )}
          </div>

          {/* Amount and Date Row */}
          <div className="form-row">
            {/* Amount Field */}
            <div className="form-group">
              <label htmlFor="amount">Amount (₹) *</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={expenseData.amount}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                className={errors.amount ? "error" : ""}
              />
              {errors.amount && (
                <span className="error-message">{errors.amount}</span>
              )}
            </div>

            {/* Date Field */}
            <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={expenseData.date}
                onChange={handleChange}
                className={errors.date ? "error" : ""}
              />
              {errors.date && (
                <span className="error-message">{errors.date}</span>
              )}
            </div>
          </div>

          {/* Category Field */}
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={expenseData.category}
              onChange={handleChange}
              className="form-select"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              value={expenseData.description}
              onChange={handleChange}
              placeholder="Add any additional details..."
              rows="4"
            ></textarea>
          </div>

          {/* Form Buttons */}
          <div className="form-buttons">
            <button type="submit" className="btn-submit">
              ✅ Add Expense
            </button>
            <button type="button" onClick={handleReset} className="btn-reset">
              🔄 Reset Form
            </button>
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="btn-cancel"
            >
              ❌ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
