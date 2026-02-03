import React from "react";

const Statistics = () => {
  const totalExpenses = 0;
  const totalIncome = 0;
  const savings = totalIncome - totalExpenses;

  return (
    <div className="stats-container">
      <h2>Statistics</h2>

      <div className="stats-grid">
        <div className="stats-card">
          <p>Total Income</p>
          <h3 className="stats-value income">₹{totalIncome}</h3>
        </div>

        <div className="stats-card">
          <p>Total Expenses</p>
          <h3 className="stats-value expense">₹{totalExpenses}</h3>
        </div>

        <div className="stats-card">
          <p>Savings</p>
          <h3 className="stats-value savings">₹{savings}</h3>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
