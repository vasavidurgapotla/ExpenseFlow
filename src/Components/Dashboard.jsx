import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Dashboard Component - Main dashboard after login
const Dashboard = () => {
  const navigate = useNavigate();

  // Get user data from localStorage
  const [user, setUser] = useState(null);

  // State for summary
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    monthlyBudget: 0,
    expensesThisMonth: 0,
    remainingBudget: 0,
    monthlyIncome: 0,
  });

  // Get expenses from localStorage
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Check authentication
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/login");
      return;
    }

    // Get user data
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);

    // Get expenses
    const storedExpenses = JSON.parse(localStorage.getItem("expenses") || "[]");
    setExpenses(storedExpenses);

    // Calculate summary
    const total = storedExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );
    setSummary({
      totalExpenses: total,
      monthlyBudget: userData?.monthlyBudget || 5000,
      expensesThisMonth: total,
      remainingBudget: (userData?.monthlyBudget || 5000) - total,
      monthlyIncome: userData?.monthlyIncome || 0,
    });
  }, [navigate]);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user || !user.name) return "U";
    const names = user.name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/");
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      {/* Dashboard Header with User Profile */}
      <div className="dashboard-top">
        <div className="dashboard-welcome">
          <h1>Welcome back, {user.name.split(" ")[0]}! 👋</h1>
          <p>Here's your financial overview</p>
        </div>
        <div className="user-profile">
          <div className="user-avatar">{getUserInitials()}</div>
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Setup Alert if no budget set */}
      {summary.monthlyBudget === 0 && (
        <div className="setup-alert">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <h3>Complete Your Profile</h3>
            <p>
              Set your monthly income and budget to get personalized insights
            </p>
            <Link to="/setup-profile" className="btn-setup">
              Setup Now
            </Link>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card card-primary">
          <div className="card-icon">💵</div>
          <div className="card-content">
            <h3>Total Expenses</h3>
            <p className="card-amount">₹{summary.totalExpenses}</p>
            <span className="card-label">All time</span>
          </div>
        </div>

        <div className="summary-card card-success">
          <div className="card-icon">💰</div>
          <div className="card-content">
            <h3>Monthly Budget</h3>
            <p className="card-amount">₹{summary.monthlyBudget}</p>
            <span className="card-label">Current month</span>
          </div>
        </div>

        <div className="summary-card card-warning">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <h3>This Month</h3>
            <p className="card-amount">₹{summary.expensesThisMonth}</p>
            <span className="card-label">
              {summary.monthlyBudget > 0
                ? `${((summary.expensesThisMonth / summary.monthlyBudget) * 100).toFixed(1)}% of budget`
                : "Set budget first"}
            </span>
          </div>
        </div>

        <div className="summary-card card-info">
          <div className="card-icon">🎯</div>
          <div className="card-content">
            <h3>Remaining Budget</h3>
            <p
              className={`card-amount ${summary.remainingBudget < 0 ? "negative" : ""}`}
            >
              ₹{summary.remainingBudget}
            </p>
            <span className="card-label">
              {summary.remainingBudget < 0
                ? "Over budget!"
                : "Available to spend"}
            </span>
          </div>
        </div>
      </div>

      {/* Budget Progress Bar */}
      {summary.monthlyBudget > 0 && (
        <div className="budget-progress-section">
          <h3>Budget Usage</h3>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${Math.min((summary.expensesThisMonth / summary.monthlyBudget) * 100, 100)}%`,
                backgroundColor:
                  summary.expensesThisMonth > summary.monthlyBudget
                    ? "#ef4444"
                    : "#10b981",
              }}
            ></div>
          </div>
          <div className="progress-labels">
            <span>₹{summary.expensesThisMonth} spent</span>
            <span>₹{summary.monthlyBudget} budget</span>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/add-expense" className="action-btn btn-add">
            ➕ Add New Expense
          </Link>
          <Link to="/expenses" className="action-btn btn-view">
            📋 View All Expenses
          </Link>
          <Link to="/statistics" className="action-btn btn-stats">
            📈 View Statistics
          </Link>
          <Link to="/setup-profile" className="action-btn btn-settings">
            ⚙️ Update Budget
          </Link>
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="recent-expenses">
        <h2>Recent Transactions</h2>

        {expenses.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No expenses yet</h3>
            <p>Start tracking your expenses by adding your first transaction</p>
            <Link to="/add-expense" className="btn-add-first">
              Add Your First Expense
            </Link>
          </div>
        ) : (
          <div className="expense-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.slice(0, 5).map((expense) => (
                  <tr key={expense.id}>
                    <td>{new Date(expense.date).toLocaleDateString()}</td>
                    <td>{expense.title}</td>
                    <td>
                      <span
                        className={`category-badge ${expense.category.toLowerCase()}`}
                      >
                        {expense.category}
                      </span>
                    </td>
                    <td className="amount">₹{expense.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {expenses.length > 5 && (
              <div className="table-footer">
                <Link to="/expenses">
                  View all {expenses.length} expenses →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
