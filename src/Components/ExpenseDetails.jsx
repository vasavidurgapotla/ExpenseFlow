import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

// ExpenseDetails Component - View and edit individual expense
// Topics: useParams (Dynamic routing), Conditional rendering, Edit functionality
const ExpenseDetails = () => {
  const { id } = useParams(); // Get expense ID from URL
  const navigate = useNavigate();

  // State for expense data
  const [expense, setExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // State for edit form
  const [editData, setEditData] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
    description: "",
  });

  // Categories
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

  // Load expense data on component mount
  useEffect(() => {
    // Sample data - In real app, fetch from backend using ID
    const allExpenses = [
      {
        id: 1,
        title: "Grocery Shopping",
        amount: 1200,
        category: "Food",
        date: "2026-01-25",
        description: "Weekly groceries from supermarket",
      },
      {
        id: 2,
        title: "Electricity Bill",
        amount: 800,
        category: "Utilities",
        date: "2026-01-24",
        description: "Monthly electricity payment",
      },
      {
        id: 3,
        title: "Movie Tickets",
        amount: 600,
        category: "Entertainment",
        date: "2026-01-23",
        description: "Weekend movie with friends",
      },
      {
        id: 4,
        title: "Petrol",
        amount: 1500,
        category: "Transportation",
        date: "2026-01-22",
        description: "Fuel for car",
      },
    ];

    const foundExpense = allExpenses.find((exp) => exp.id === parseInt(id));
    if (foundExpense) {
      setExpense(foundExpense);
      setEditData(foundExpense);
    } else {
      // Handle case when expense is not found
      setExpense(null);
    }
  }, [id]); // Only id as dependency

  // Handle input changes in edit mode
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  // Toggle edit mode
  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Save changes
  const handleSave = () => {
    setExpense(editData);
    setIsEditing(false);
    alert("Expense updated successfully!");
  };

  // Cancel editing
  const handleCancel = () => {
    setEditData(expense);
    setIsEditing(false);
  };

  // Delete expense
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      alert("Expense deleted!");
      navigate("/expenses");
    }
  };

  // Loading state
  if (!expense) {
    return (
      <div className="details-container">
        <div className="loading">Loading expense details...</div>
      </div>
    );
  }

  return (
    <div className="details-container">
      <div className="details-card">
        <div className="details-header">
          <h2>{isEditing ? "Edit Expense" : "Expense Details"}</h2>
          <Link to="/expenses" className="btn-back">
            ← Back to List
          </Link>
        </div>

        {/* View Mode */}
        {!isEditing ? (
          <div className="expense-details">
            <div className="detail-row">
              <span className="detail-label">Title:</span>
              <span className="detail-value">{expense.title}</span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Amount:</span>
              <span className="detail-value amount-large">
                ₹{expense.amount}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Category:</span>
              <span
                className={`category-badge ${expense.category.toLowerCase()}`}
              >
                {expense.category}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Date:</span>
              <span className="detail-value">
                {new Date(expense.date).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="detail-row">
              <span className="detail-label">Description:</span>
              <span className="detail-value">{expense.description}</span>
            </div>

            {/* Action Buttons */}
            <div className="detail-actions">
              <button onClick={handleEdit} className="btn-edit">
                ✏️ Edit
              </button>
              <button onClick={handleDelete} className="btn-delete">
                🗑️ Delete
              </button>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <div className="expense-edit-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={editData.title}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">Amount (₹)</label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={editData.amount}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={editData.category}
                onChange={handleChange}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={editData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={editData.description}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>

            {/* Edit Action Buttons */}
            <div className="detail-actions">
              <button onClick={handleSave} className="btn-save">
                ✅ Save Changes
              </button>
              <button onClick={handleCancel} className="btn-cancel">
                ❌ Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseDetails;
