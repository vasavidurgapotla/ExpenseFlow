import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// ExpenseList Component - Display and manage all expenses
// Topics: useState, useEffect, Array methods (filter, map), Search functionality
const ExpenseList = () => {
  // Sample expenses data (will come from backend/API later)
  const [allExpenses] = useState([
    {
      id: 1,
      title: "Grocery Shopping",
      amount: 1200,
      category: "Food",
      date: "2026-01-25",
      description: "Weekly groceries",
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
    {
      id: 5,
      title: "Restaurant Dinner",
      amount: 2500,
      category: "Food",
      date: "2026-01-21",
      description: "Birthday celebration",
    },
    {
      id: 6,
      title: "Phone Bill",
      amount: 599,
      category: "Utilities",
      date: "2026-01-20",
      description: "Monthly prepaid recharge",
    },
    {
      id: 7,
      title: "Gym Membership",
      amount: 1000,
      category: "Healthcare",
      date: "2026-01-19",
      description: "Monthly gym subscription",
    },
    {
      id: 8,
      title: "Books",
      amount: 450,
      category: "Education",
      date: "2026-01-18",
      description: "Programming books",
    },
  ]);

  // State for filtered expenses
  const [expenses, setExpenses] = useState(allExpenses);

  // State for search and filter
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Categories
  const categories = [
    "All",
    "Food",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Utilities",
    "Healthcare",
    "Education",
    "Other",
  ];

  // Calculate total
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  // Filter expenses based on search and category
  useEffect(() => {
    let filtered = allExpenses;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (expense) => expense.category === selectedCategory,
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (expense) =>
          expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          expense.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setExpenses(filtered);
  }, [searchTerm, selectedCategory, allExpenses]);

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle category filter
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Delete expense (placeholder function)
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      alert(`Expense ${id} deleted! (This will connect to backend later)`);
    }
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h2>All Expenses</h2>
        <Link to="/add-expense" className="btn-add-new">
          ➕ Add New Expense
        </Link>
      </div>

      {/* Filter and Search Section */}
      <div className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search expenses..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="filter-box">
          <label htmlFor="category-filter">Filter by Category:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="filter-select"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Section */}
      <div className="list-summary">
        <div className="summary-item">
          <span>Total Expenses:</span>
          <strong>{expenses.length}</strong>
        </div>
        <div className="summary-item">
          <span>Total Amount:</span>
          <strong className="total-amount">₹{totalAmount}</strong>
        </div>
      </div>

      {/* Expenses Table */}
      <div className="expenses-table">
        {expenses.length === 0 ? (
          <div className="no-expenses">
            <p>No expenses found. Start by adding your first expense!</p>
            <Link to="/add-expense" className="btn-add-first">
              Add Expense
            </Link>
          </div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td className="expense-title">{expense.title}</td>
                  <td>
                    <span
                      className={`category-badge ${expense.category.toLowerCase()}`}
                    >
                      {expense.category}
                    </span>
                  </td>
                  <td className="expense-description">{expense.description}</td>
                  <td className="amount">₹{expense.amount}</td>
                  <td className="actions">
                    <Link to={`/expense/${expense.id}`} className="btn-view">
                      👁️ View
                    </Link>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="btn-delete"
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
