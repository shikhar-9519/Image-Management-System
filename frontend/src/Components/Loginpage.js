import React, { useState } from "react";
import "../Styling/Loginpage.css"; // Import your CSS file
import {useNavigate} from "react-router-dom";  

export default function Loginpage() {
  const [form, setForm] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const history = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setErrorMsg('');
    setIsLogin(!isLogin); 
    setForm({ username: '', password: '', 're-password': '' });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Validation for login form
      if (!form.username || !form.password) {
        setErrorMsg("Username and password are required");
        return;
      }
    } else {
      // Validation for registration form
      if (!form.username || !form.password || !form["re-password"]) {
        setErrorMsg("All fields are required");
        return;
      }

      if (form.password !== form["re-password"]) {
        setErrorMsg("Passwords do not match");
        return;
      }
    }
    setErrorMsg('');
    const endpoint = isLogin ? "login" : "register";
    const response = await fetch(`http://localhost:8000/${endpoint}`, {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    const data = await response.json();
    if(data.error) {
      setErrorMsg(data.error);
    }
    else {
      handleLoginSuccess();
    }
    console.log(data);
  };

  const handleLoginSuccess = () => {
    // Redirect to another page on successful login
    history("/home");
  };

  return (
    <div className="login-page-container">
      <form className="login-page-form">
        {isLogin ? <h2>Login Page</h2> : <h2>Registration Page</h2>}
        {errorMsg ? <div className="error-msg-banner">{errorMsg}</div> : null}
        {isLogin ? (
          <>
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="username">Enter your Email</label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Enter your Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Re-enter your Password</label>
              <input
                type="password"
                id="re-password"
                name="re-password"
                value={form["re-password"]}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
        <button type="submit" onClick={handleSubmit}>
          {isLogin ? "Login" : "Register"}
        </button>
        {isLogin ? (
          <p>
            Don't have an account?{" "}
            <u onClick={resetForm}>Sign up</u>.
          </p>
        ) : (
          <p>
            Already a user?{" "}
            <u onClick={resetForm}>Back to Login Page</u>.
          </p>
        )}
      </form>
    </div>
  );
}
