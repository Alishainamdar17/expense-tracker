import { useState, useEffect, useRef } from "react";
// User icon SVG
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle', marginRight: 8}}>
    <circle cx="12" cy="8" r="4" fill="#1976d2"/>
    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="#1976d2"/>
  </svg>
);
import "../AppBasic.css";

// Sidebar icon SVGs
const HomeIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M3 9.5L12 3l9 6.5V21a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9.5z"/><path d="M9 22V12h6v10"/></svg>
);
const ChartIcon = () => (
  <svg width="24" height="24" fill="none" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="12" width="6" height="8"/><rect x="9" y="8" width="6" height="12"/><rect x="15" y="4" width="6" height="16"/></svg>
);

// Card icons (FontAwesome SVGs)
const IncomeIcon = () => (
  <svg width="48" height="48" fill="#388e3c" viewBox="0 0 512 512"><path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-48 96h96c8.8 0 16 7.2 16 16s-7.2 16-16 16h-32v96c0 8.8-7.2 16-16 16s-16-7.2-16-16v-96h-32c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>
);
const ExpenseIcon = () => (
  <svg width="48" height="48" fill="#d32f2f" viewBox="0 0 512 512"><path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm48 96h-96c-8.8 0-16 7.2-16 16s7.2 16 16 16h32v96c0 8.8 7.2 16 16 16s16-7.2 16-16v-96h32c8.8 0 16-7.2 16-16s-7.2-16-16-16z"/></svg>
);
const BalanceIcon = () => (
  <svg width="48" height="48" fill="#fbc02d" viewBox="0 0 512 512"><path d="M256 32C132.3 32 32 132.3 32 256s100.3 224 224 224 224-100.3 224-224S379.7 32 256 32zm0 96c44.2 0 80 35.8 80 80s-35.8 80-80 80-80-35.8-80-80 35.8-80 80-80zm0 32a48 48 0 1 0 0 96 48 48 0 1 0 0-96z"/></svg>
);

// No counter animation, just static values

const ExpenseTracker = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [isSignup, setIsSignup] = useState(false);
  const [authForm, setAuthForm] = useState({ name: "", email: "", password: "" });
  const [transactionForm, setTransactionForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    description: "",
  });
  const [filters, setFilters] = useState({ dateRange: "all", category: "all" });

  // On mount, check for token and user in localStorage
  useEffect(() => {
    // Always load original mock transactions
    const mockTransactions = [
      { _id: "1", type: "income", amount: 2500, category: "Salary", date: "2023-10-15", description: "Monthly salary" },
      { _id: "2", type: "expense", amount: 150, category: "Food", date: "2023-10-16", description: "Groceries" },
      { _id: "3", type: "expense", amount: 75, category: "Travel", date: "2023-10-17", description: "Bus fare" },
      { _id: "4", type: "income", amount: 500, category: "Freelance", date: "2023-10-18", description: "Project payment" },
    ];
    setTransactions(mockTransactions);
    // Restore login state if needed
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Auth form submit
  const handleAuthSubmit = (e) => {
    e.preventDefault();
  const endpoint = isSignup ? "/api/auth/signup" : "/api/auth/login";
  fetch(`http://localhost:5000${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm)
      }
    )
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setUser(data.user);
          setIsLoggedIn(true);
          alert(data.message || (isSignup ? "Signup successful!" : "Login successful!"));
        } else {
          alert(data.message || "Authentication failed");
        }
      })
      .catch(() => {
        alert("Server error. Please try again later.");
      });
  };

  // Add transaction
  const handleTransactionSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      type: transactionForm.type,
      amount: parseFloat(transactionForm.amount),
      category: transactionForm.category,
      date: transactionForm.date,
      description: transactionForm.description,
    };
    setTransactions([...transactions, { ...newTransaction, _id: Date.now().toString() }]);
    setTransactionForm({
      type: "expense",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    });
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t._id !== id));
  };

  // Filtered transactions
  const filteredTransactions = transactions.filter((transaction) => {
    const now = new Date();
    const transactionDate = new Date(transaction.date);

    if (filters.dateRange === "week") {
      const weekStart = new Date(now);
      weekStart.setDate(now.getDate() - now.getDay());
      weekStart.setHours(0, 0, 0, 0);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
      if (transactionDate < weekStart || transactionDate > weekEnd) return false;
    } else if (filters.dateRange === "month") {
      const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      if (transactionDate < monthStart || transactionDate > monthEnd) return false;
    }

    if (filters.category !== "all" && transaction.category !== filters.category) return false;
    return true;
  });

  // Summary calculations
  const totalIncome = filteredTransactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = filteredTransactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  // Counter animation for cards
  const animatedIncome = totalIncome;
  const animatedExpenses = totalExpenses;
  const animatedBalance = balance;

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff' }}>
        <div style={{ width: '100%', maxWidth: 400, background: '#f8f9fa', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', padding: 32 }}>
          <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: 28, color: '#1976d2', marginBottom: 12, textAlign: 'center' }}>{isSignup ? "Create Account" : "Login"}</h2>
          <p style={{ color: '#555', marginBottom: 16, textAlign: 'center' }}>
            {isSignup
              ? "Sign up to start tracking your expenses"
              : "Enter your credentials to access your expense tracker"}
          </p>
          <form onSubmit={handleAuthSubmit} className="expense-form" style={{ margin: 0 }}>
            {isSignup && (
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  value={authForm.name}
                  onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })}
                  required
                />
              </div>
            )}
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                required
              />
            </div>
            <button type="submit" style={{ width: '100%', marginTop: 8, fontSize: 16 }}>{isSignup ? "Sign Up" : "Login"}</button>
          </form>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <button
              onClick={() => setIsSignup(!isSignup)}
              style={{ background: "none", color: "#1976d2", border: "none", textDecoration: "underline", cursor: "pointer" }}
            >
              {isSignup ? "Already have an account? Login" : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="expense-container" style={{ background: '#fff' }}>
      <div className="expense-header" style={{ background: 'transparent', marginBottom: 32, paddingBottom: 0 }}>
        <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: 40, color: '#1976d2', letterSpacing: 2, marginBottom: 0 }}>
          Expense Tracker
        </h1>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <UserIcon />
          <span style={{ marginRight: 16, fontSize: 18 }}>Welcome, {user?.name}</span>
          <button
            style={{
              background: '#1976d2',
              color: '#fff',
              border: 'none',
              borderRadius: 20,
              padding: '8px 20px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(25, 118, 210, 0.15)'
            }}
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      {/* Cards Section */}
  <div className="expense-summary" style={{ marginTop: '8rem', marginBottom: 40, gap: 32 }}>
        <div style={{ background: '#e3fcec', boxShadow: '0 2px 8px rgba(56,142,60,0.08)', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 8px' }}>
          <IncomeIcon />
          <h3 style={{ fontSize: 24, color: '#388e3c', margin: '16px 0 8px 0' }}>Total Income</h3>
          <p style={{ color: '#388e3c', fontWeight: 'bold', fontSize: 40, margin: 0 }}>
            ${animatedIncome.toFixed(2)}
          </p>
        </div>
        <div style={{ background: '#ffebee', boxShadow: '0 2px 8px rgba(211,47,47,0.08)', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 8px' }}>
          <ExpenseIcon />
          <h3 style={{ fontSize: 24, color: '#d32f2f', margin: '16px 0 8px 0' }}>Total Expenses</h3>
          <p style={{ color: '#d32f2f', fontWeight: 'bold', fontSize: 40, margin: 0 }}>
            ${animatedExpenses.toFixed(2)}
          </p>
        </div>
        <div style={{ background: '#fffde7', boxShadow: '0 2px 8px rgba(251,192,45,0.08)', padding: 32, borderRadius: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 8px' }}>
          <BalanceIcon />
          <h3 style={{ fontSize: 24, color: '#fbc02d', margin: '16px 0 8px 0' }}>Balance</h3>
          <p style={{ color: balance >= 0 ? '#388e3c' : '#d32f2f', fontWeight: 'bold', fontSize: 40, margin: 0 }}>
            ${animatedBalance.toFixed(2)}
          </p>
        </div>
      </div>
      {/* Form Section */}
  <div style={{ width: '70vw', margin: '5rem auto 5rem auto', padding: '40px 0', background: '#f0f4fa', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleTransactionSubmit} style={{ width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 18, padding: '32px 24px', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
          <h3 style={{ marginBottom: 10, fontSize: 22, color: '#1976d2', textAlign: 'center' }}>Add Transaction</h3>
          <label style={{ fontSize: 16, marginBottom: 4 }}>Type</label>
          <select
            value={transactionForm.type}
            onChange={(e) => setTransactionForm({ ...transactionForm, type: e.target.value })}
            style={{ fontSize: 15, padding: '10px 12px', marginBottom: 8, borderRadius: 6, border: '1px solid #ccc', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', outline: 'none' }}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <label style={{ fontSize: 16, marginBottom: 4 }}>Amount</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={transactionForm.amount}
            onChange={(e) => setTransactionForm({ ...transactionForm, amount: e.target.value })}
            required
            style={{ fontSize: 15, padding: '10px 12px', marginBottom: 8, borderRadius: 6, border: '1px solid #ccc', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', outline: 'none' }}
          />
          <label style={{ fontSize: 16, marginBottom: 4 }}>Category</label>
          <select
            value={transactionForm.category}
            onChange={(e) => setTransactionForm({ ...transactionForm, category: e.target.value })}
            style={{ fontSize: 15, padding: '10px 12px', marginBottom: 8, borderRadius: 6, border: '1px solid #ccc', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', outline: 'none' }}
          >
            {transactionForm.type === "income" ? (
              <>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Investment">Investment</option>
                <option value="Other">Other</option>
              </>
            ) : (
              <>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Bills">Bills</option>
                <option value="Other">Other</option>
              </>
            )}
          </select>
          <label style={{ fontSize: 16, marginBottom: 4 }}>Date</label>
          <input
            type="date"
            value={transactionForm.date}
            onChange={(e) => setTransactionForm({ ...transactionForm, date: e.target.value })}
            required
            style={{ fontSize: 15, padding: '10px 12px', marginBottom: 8, borderRadius: 6, border: '1px solid #ccc', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', outline: 'none' }}
          />
          <label style={{ fontSize: 16, marginBottom: 4 }}>Description</label>
          <textarea
            value={transactionForm.description}
            onChange={(e) => setTransactionForm({ ...transactionForm, description: e.target.value })}
            style={{ fontSize: 15, padding: '10px 12px', marginBottom: 8, borderRadius: 6, border: '1px solid #ccc', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', outline: 'none', resize: 'vertical', minHeight: 40 }}
          />
          <button
            type="submit"
            style={{ width: '100%', marginTop: 12, fontSize: 17, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)', transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.background = '#145ea8'}
            onMouseOut={e => e.currentTarget.style.background = '#1976d2'}
          >
            Add Transaction
          </button>
        </form>
      </div>
      {/* Table Section */}
      <div style={{ margin: '5rem 40px 40px 40px', padding: '24px', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 'bold', fontSize: 26, color: '#1976d2', marginBottom: 24, textAlign: 'center' }}>Transactions Table</h2>
        <div style={{ display: "flex", gap: 12, marginBottom: 18 }}>
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
            style={{ boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)', borderRadius: 6, border: '1px solid #ccc', padding: '8px 12px', fontSize: 15, outline: 'none' }}
          >
            <option value="all">All Time</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            style={{ boxShadow: '0 2px 8px rgba(25, 118, 210, 0.10)', borderRadius: 6, border: '1px solid #ccc', padding: '8px 12px', fontSize: 15, outline: 'none' }}
          >
            <option value="all">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Other">Other</option>
            <option value="Salary">Salary</option>
            <option value="Freelance">Freelance</option>
            <option value="Investment">Investment</option>
          </select>
        </div>
        {filteredTransactions.length === 0 ? (
          <p style={{ textAlign: "center", color: "#888", padding: 24 }}>No transactions found</p>
        ) : (
          <table className="expense-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{new Date(transaction.date).toLocaleDateString()}</td>
                  <td>{transaction.type}</td>
                  <td>{transaction.category}</td>
                  <td>{transaction.description}</td>
                  <td style={{ color: transaction.type === "income" ? "#388e3c" : "#d32f2f", fontWeight: "bold" }}>
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteTransaction(transaction._id)}>
                      Delete
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

export default ExpenseTracker;
