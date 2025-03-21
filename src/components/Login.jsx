import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from '../redux/auth/authApi';
import { setUser } from '../redux/auth/authSlice';

const Login = () => {
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch(); // Fixed typo
    const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
    const navigate=useNavigate()

    // ✅ Ensure async function is properly structured
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevents page refresh
        const data = { email, password };

        try {
            const response = await loginUser(data).unwrap(); // ✅ Works inside async function
            console.log(response)
            const {token,user}=response;
            dispatch(setUser({user}))
            alert("Login successfull")
            navigate("/")
           
        } catch (error) {
            setMessage("Please provide a valid email and password");
        }
    };

    return (
        <section style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ maxWidth: "400px", border: "1px solid #ccc", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)", backgroundColor: "white", padding: "20px", textAlign: "center" }}>
                <h2 style={{ fontSize: "24px", fontWeight: "600", paddingTop: "10px" }}>Please Login</h2>
                <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
                    <input 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="email" 
                        name="email" 
                        id="email"
                        placeholder="Email Address" 
                        required
                        style={{ width: "100%", backgroundColor: "#f3f3f3", padding: "12px", border: "none", outline: "none" }}
                    />
                    <input 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        type="password" 
                        name="password" 
                        id="password"
                        placeholder="Password" 
                        required 
                        style={{ width: "100%", backgroundColor: "#f3f3f3", padding: "12px", border: "none", outline: "none" }}
                    />
                    {
                        message && <p style={{ color: "red" }}>{message}</p>
                    }
                    <button 
                        type="submit" 
                        style={{ width: "100%", marginTop: "10px", backgroundColor: "#4F46E5", color: "white", fontWeight: "500", padding: "12px", borderRadius: "5px", cursor: "pointer" }}
                        disabled={loginLoading}
                    >
                        {loginLoading ? "Logging in..." : "Login"}
                    </button>
                    <p>Don't have an account? <Link to="/register" style={{ color: "blue", textDecoration: "underline" }}>Register</Link> here.</p>
                </form>
            </div>
        </section>
    );
};

export default Login;
