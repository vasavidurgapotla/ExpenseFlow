import React from "react";
import { Link } from "react-router-dom";

// Landing Page Component - First page users see before login
const Landing = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div className="landing-hero">
        <div className="hero-content">
          <div className="logo-section">
            <div className="landing-logo">💰</div>
            <h1 className="brand-name">ExpenseFlow</h1>
          </div>
          <p className="hero-tagline">Take Control of Your Financial Future</p>
          <p className="hero-description">
            Track expenses, manage budgets, and achieve your financial goals
            with our intelligent expense tracking platform.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn-primary-large">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-secondary-large">
              Login
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="landing-features">
        <h2 className="section-title">Why Choose ExpenseFlow?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Smart Analytics</h3>
            <p>
              Get detailed insights into your spending patterns with interactive
              charts and reports.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Easy Tracking</h3>
            <p>
              Add expenses in seconds with our intuitive interface and
              categorization system.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Budget Goals</h3>
            <p>
              Set monthly budgets and track your progress towards financial
              freedom.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Always Available</h3>
            <p>
              Access your finances anywhere, anytime on any device with our
              responsive design.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>
              Your financial data is encrypted and protected with
              industry-standard security.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Updates</h3>
            <p>
              See your financial status update instantly as you add new
              transactions.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="landing-about">
        <h2 className="section-title">About ExpenseFlow</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              ExpenseFlow is a modern expense tracking application designed to
              help individuals and families take control of their finances. Our
              mission is to make financial management simple, intuitive, and
              accessible to everyone.
            </p>
            <p>
              With ExpenseFlow, you can easily track your daily expenses,
              categorize your spending, set budget goals, and gain valuable
              insights into your financial habits. Whether you're saving for a
              big purchase, paying off debt, or simply want to understand where
              your money goes, ExpenseFlow is your perfect financial companion.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <h3>10,000+</h3>
                <p>Active Users</p>
              </div>
              <div className="stat-item">
                <h3>₹50Cr+</h3>
                <p>Tracked Expenses</p>
              </div>
              <div className="stat-item">
                <h3>4.8/5</h3>
                <p>User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="landing-how">
        <h2 className="section-title">How It Works</h2>
        <div className="how-steps">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your free account in less than a minute</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Set Budget</h3>
            <p>Define your monthly income and budget goals</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Track Expenses</h3>
            <p>Add your daily expenses and categorize them</p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Achieve Goals</h3>
            <p>Monitor progress and reach your financial goals</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="landing-cta">
        <h2>Ready to Start Your Financial Journey?</h2>
        <p>
          Join thousands of users who are already managing their finances
          smarter
        </p>
        <Link to="/register" className="btn-cta">
          Create Free Account
        </Link>
      </div>

      {/* Footer */}
      <div className="landing-footer">
        <p>&copy; 2026 ExpenseFlow. All rights reserved.</p>
        <div className="footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#contact">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
