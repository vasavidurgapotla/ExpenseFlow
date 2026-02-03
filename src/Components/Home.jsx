import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Home Component - Dashboard with budget setup and comprehensive expense tracking
// Topics: useState, useEffect, Array methods, Conditional rendering, Date calculations
const Home = () => {
  // State for user data (budget and income setup)
  const [userData, setUserData] = useState(() => {
    // Load from localStorage if available
    const saved = localStorage.getItem("userData");
    return saved ? JSON.parse(saved) : null;
  });

  // State for showing budget setup modal
  const [showBudgetSetup, setShowBudgetSetup] = useState(false);

  // State for budget setup form
  const [budgetForm, setBudgetForm] = useState({
    monthlyIncome: "",
    monthlyBudget: "",
  });

  // State for dashboard summary
  const [summary, setSummary] = useState({
    totalExpenses: 0,
    monthlyBudget: null,
    expensesThisMonth: 0,
    expensesToday: 0,
    remainingBudget: null,
    monthlyIncome: null,
    savingsThisMonth: null,
  });

  // Sample recent expenses data (will come from backend later)
  const [recentExpenses] = useState([
    {
      id: 1,
      title: "Grocery Shopping",
      amount: 1200,
      category: "Food",
      date: "2026-01-30",
    },
    {
      id: 2,
      title: "Electricity Bill",
      amount: 800,
      category: "Utilities",
      date: "2026-01-29",
    },
    {
      id: 3,
      title: "Movie Tickets",
      amount: 600,
      category: "Entertainment",
      date: "2026-01-30",
    },
    {
      id: 4,
      title: "Petrol",
      amount: 1500,
      category: "Transportation",
      date: "2026-01-28",
    },
    {
      id: 5,
      title: "Restaurant Dinner",
      amount: 2500,
      category: "Food",
      date: "2026-01-25",
    },
    {
      id: 6,
      title: "Medicine",
      amount: 350,
      category: "Healthcare",
      date: "2026-01-30",
    },
  ]);

  // Calculate expenses on component mount and when expenses change
  useEffect(() => {
    // Get current date
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const todayDate = today.toISOString().split("T")[0];

    // Calculate total expenses
    const total = recentExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    // Calculate this month's expenses
    const monthlyExpenses = recentExpenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear
        );
      })
      .reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate today's expenses
    const todayExpenses = recentExpenses
      .filter((expense) => expense.date === todayDate)
      .reduce((sum, expense) => sum + expense.amount, 0);

    // Calculate remaining budget and savings (only if user set budget)
    let remaining = null;
    let savings = null;

    if (userData?.monthlyBudget) {
      remaining = userData.monthlyBudget - monthlyExpenses;
    }

    if (userData?.monthlyIncome) {
      savings = userData.monthlyIncome - monthlyExpenses;
    }

    setSummary({
      totalExpenses: total,
      monthlyBudget: userData?.monthlyBudget || null,
      expensesThisMonth: monthlyExpenses,
      expensesToday: todayExpenses,
      remainingBudget: remaining,
      monthlyIncome: userData?.monthlyIncome || null,
      savingsThisMonth: savings,
    });
  }, [recentExpenses, userData]);

  // Handle budget setup form changes
  const handleBudgetFormChange = (e) => {
    const { name, value } = e.target;
    setBudgetForm({
      ...budgetForm,
      [name]: value,
    });
  };

  // Save budget setup
  const handleBudgetSetup = (e) => {
    e.preventDefault();

    const newUserData = {
      monthlyIncome: budgetForm.monthlyIncome
        ? parseFloat(budgetForm.monthlyIncome)
        : null,
      monthlyBudget: budgetForm.monthlyBudget
        ? parseFloat(budgetForm.monthlyBudget)
        : null,
      setupDate: new Date().toISOString(),
    };

    setUserData(newUserData);
    localStorage.setItem("userData", JSON.stringify(newUserData));
    setShowBudgetSetup(false);
    setBudgetForm({ monthlyIncome: "", monthlyBudget: "" });
  };

  // Skip budget setup (user can set it later)
  const handleSkipBudgetSetup = () => {
    setShowBudgetSetup(false);
    setBudgetForm({ monthlyIncome: "", monthlyBudget: "" });
  };

  // Edit budget settings
  const handleEditBudget = () => {
    if (userData) {
      setBudgetForm({
        monthlyIncome: userData.monthlyIncome || "",
        monthlyBudget: userData.monthlyBudget || "",
      });
    }
    setShowBudgetSetup(true);
  };

  // Calculate budget health percentage
  const getBudgetHealthPercentage = () => {
    if (!summary.monthlyBudget) return null;
    return ((summary.expensesThisMonth / summary.monthlyBudget) * 100).toFixed(
      1,
    );
  };

  // Get budget status color
  const getBudgetStatusColor = () => {
    const percentage = getBudgetHealthPercentage();
    if (!percentage) return "";
    if (percentage < 50) return "status-good";
    if (percentage < 80) return "status-warning";
    return "status-danger";
  };

  return (
    <div className="home-container">
      <div className="dashboard-header">
        <h1>Welcome to Expense Tracker</h1>
        <p>Manage your finances smartly and efficiently</p>
        {!userData && (
          <button
            className="btn-setup-budget"
            onClick={() => setShowBudgetSetup(true)}
          >
            🎯 Setup Monthly Budget & Income
          </button>
        )}
        {userData && (
          <button className="btn-edit-budget" onClick={handleEditBudget}>
            ⚙️ Edit Budget Settings
          </button>
        )}
      </div>

      {/* Budget Setup Modal */}
      {showBudgetSetup && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Setup Your Budget</h2>
              <p>
                Set your monthly income and budget to track your finances better
              </p>
            </div>
            <form onSubmit={handleBudgetSetup} className="budget-setup-form">
              <div className="form-group">
                <label htmlFor="monthlyIncome">Monthly Income (Optional)</label>
                <input
                  type="number"
                  id="monthlyIncome"
                  name="monthlyIncome"
                  value={budgetForm.monthlyIncome}
                  onChange={handleBudgetFormChange}
                  placeholder="Enter your monthly income"
                  min="0"
                  step="0.01"
                />
                <small>Your total monthly income from all sources</small>
              </div>

              <div className="form-group">
                <label htmlFor="monthlyBudget">Monthly Budget (Optional)</label>
                <input
                  type="number"
                  id="monthlyBudget"
                  name="monthlyBudget"
                  value={budgetForm.monthlyBudget}
                  onChange={handleBudgetFormChange}
                  placeholder="Enter your monthly budget"
                  min="0"
                  step="0.01"
                />
                <small>Maximum amount you want to spend per month</small>
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn-submit">
                  💾 Save Settings
                </button>
                <button
                  type="button"
                  className="btn-skip"
                  onClick={handleSkipBudgetSetup}
                >
                  ⏭️ Skip for Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Summary Cards Section */}
      <div className="summary-cards">
        {/* Total Expenses Card */}
        <div className="summary-card card-primary">
          <div className="card-icon">💵</div>
          <div className="card-content">
            <h3>Total Expenses</h3>
            <p className="card-amount">₹{summary.totalExpenses.toFixed(2)}</p>
            <small>All time total</small>
          </div>
        </div>

        {/* Monthly Expenses Card */}
        <div className="summary-card card-warning">
          <div className="card-icon">📊</div>
          <div className="card-content">
            <h3>This Month</h3>
            <p className="card-amount">
              ₹{summary.expensesThisMonth.toFixed(2)}
            </p>
            <small>
              {new Date().toLocaleDateString("en-IN", {
                month: "long",
                year: "numeric",
              })}
            </small>
          </div>
        </div>

        {/* Today's Expenses Card */}
        <div className="summary-card card-info">
          <div className="card-icon">📅</div>
          <div className="card-content">
            <h3>Today's Expenses</h3>
            <p className="card-amount">₹{summary.expensesToday.toFixed(2)}</p>
            <small>
              {new Date().toLocaleDateString("en-IN", { weekday: "long" })}
            </small>
          </div>
        </div>

        {/* Monthly Budget Card - Only show if user set budget */}
        {summary.monthlyBudget !== null && (
          <div className="summary-card card-success">
            <div className="card-icon">💰</div>
            <div className="card-content">
              <h3>Monthly Budget</h3>
              <p className="card-amount">₹{summary.monthlyBudget.toFixed(2)}</p>
              <small>Your spending limit</small>
            </div>
          </div>
        )}

        {/* Remaining Budget Card - Only show if user set budget */}
        {summary.remainingBudget !== null && (
          <div
            className={`summary-card ${summary.remainingBudget >= 0 ? "card-success" : "card-danger"}`}
          >
            <div className="card-icon">
              {summary.remainingBudget >= 0 ? "🎯" : "⚠️"}
            </div>
            <div className="card-content">
              <h3>Remaining Budget</h3>
              <p className="card-amount">
                ₹{summary.remainingBudget.toFixed(2)}
              </p>
              <small>
                {summary.remainingBudget >= 0
                  ? "Available to spend"
                  : "Over budget!"}
              </small>
            </div>
          </div>
        )}

        {/* Monthly Income Card - Only show if user set income */}
        {summary.monthlyIncome !== null && (
          <div className="summary-card card-income">
            <div className="card-icon">💸</div>
            <div className="card-content">
              <h3>Monthly Income</h3>
              <p className="card-amount">₹{summary.monthlyIncome.toFixed(2)}</p>
              <small>Your total income</small>
            </div>
          </div>
        )}

        {/* Savings Card - Only show if user set income */}
        {summary.savingsThisMonth !== null && (
          <div
            className={`summary-card ${summary.savingsThisMonth >= 0 ? "card-savings" : "card-danger"}`}
          >
            <div className="card-icon">
              {summary.savingsThisMonth >= 0 ? "🏆" : "📉"}
            </div>
            <div className="card-content">
              <h3>Savings This Month</h3>
              <p className="card-amount">
                ₹{summary.savingsThisMonth.toFixed(2)}
              </p>
              <small>
                {summary.savingsThisMonth >= 0
                  ? "Great job!"
                  : "Spending more than income"}
              </small>
            </div>
          </div>
        )}
      </div>

      {/* Budget Health Indicator - Only show if user set budget */}
      {summary.monthlyBudget !== null && (
        <div className="budget-health">
          <h3>Budget Health This Month</h3>
          <div className="budget-progress">
            <div className="progress-bar-container">
              <div
                className={`progress-bar ${getBudgetStatusColor()}`}
                style={{
                  width: `${Math.min(getBudgetHealthPercentage(), 100)}%`,
                }}
              >
                <span className="progress-text">
                  {getBudgetHealthPercentage()}%
                </span>
              </div>
            </div>
            <div className="budget-info">
              <span>
                ₹{summary.expensesThisMonth.toFixed(2)} / ₹
                {summary.monthlyBudget.toFixed(2)}
              </span>
              {summary.remainingBudget >= 0 ? (
                <span className="budget-message good">
                  ✅ You're within budget!
                </span>
              ) : (
                <span className="budget-message danger">
                  ⚠️ You've exceeded your budget!
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions Section */}
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
        </div>
      </div>

      {/* Recent Expenses Section */}
      <div className="recent-expenses">
        <div className="section-header">
          <h2>Recent Transactions</h2>
          <Link to="/expenses" className="view-all-link">
            View All →
          </Link>
        </div>
        <div className="expense-table">
          {recentExpenses.length === 0 ? (
            <div className="no-data">
              <p>No expenses recorded yet. Start tracking your expenses!</p>
              <Link to="/add-expense" className="btn-add-first">
                Add Your First Expense
              </Link>
            </div>
          ) : (
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
                {recentExpenses.slice(0, 5).map((expense) => (
                  <tr key={expense.id}>
                    <td>
                      {new Date(expense.date).toLocaleDateString("en-IN")}
                    </td>
                    <td>{expense.title}</td>
                    <td>
                      <span
                        className={`category-badge ${expense.category.toLowerCase()}`}
                      >
                        {expense.category}
                      </span>
                    </td>
                    <td className="amount">₹{expense.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Financial Insights - Only show if user has budget or income */}
      {(summary.monthlyBudget !== null || summary.monthlyIncome !== null) && (
        <div className="financial-insights">
          <h2>💡 Financial Insights</h2>
          <div className="insights-grid">
            {summary.monthlyBudget !== null && (
              <div className="insight-card">
                <h4>Daily Budget</h4>
                <p>
                  Based on your monthly budget, you can spend approximately
                  <strong>
                    {" "}
                    ₹{(summary.monthlyBudget / 30).toFixed(2)}
                  </strong>{" "}
                  per day.
                </p>
              </div>
            )}

            <div className="insight-card">
              <h4>Average Daily Spending</h4>
              <p>
                Your average daily spending this month is
                <strong>
                  {" "}
                  ₹
                  {(summary.expensesThisMonth / new Date().getDate()).toFixed(
                    2,
                  )}
                </strong>
              </p>
            </div>

            {summary.monthlyIncome !== null &&
              summary.monthlyBudget !== null && (
                <div className="insight-card">
                  <h4>Savings Goal</h4>
                  <p>
                    Planned savings:{" "}
                    <strong>
                      ₹
                      {(summary.monthlyIncome - summary.monthlyBudget).toFixed(
                        2,
                      )}
                    </strong>
                    {summary.savingsThisMonth !== null && (
                      <>
                        {" "}
                        | Actual:{" "}
                        <strong>₹{summary.savingsThisMonth.toFixed(2)}</strong>
                      </>
                    )}
                  </p>
                </div>
              )}

            {!userData && (
              <div className="insight-card setup-reminder">
                <h4>📊 Get Better Insights</h4>
                <p>
                  Setup your monthly budget and income to get personalized
                  financial insights!
                </p>
                <button
                  className="btn-setup-small"
                  onClick={() => setShowBudgetSetup(true)}
                >
                  Setup Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
