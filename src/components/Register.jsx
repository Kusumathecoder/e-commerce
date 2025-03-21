import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterUserMutation } from '../redux/auth/authApi';

const Register = () => {
    const [message, setMessage] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // ✅ Hooks should be at the top level of the component
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const data = { username, email, password };
        console.log("Registration Data:", data);

        try {
            await registerUser(data).unwrap();
            alert("Registration successful");
            navigate('/login');
        } catch (error) {
            setMessage("Registration failed");
        }
    };

    return (
        <section style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ maxWidth: "400px", border: "1px solid #ccc", boxShadow: "2px 2px 10px rgba(0,0,0,0.1)", backgroundColor: "white", padding: "20px", textAlign: "center" }}>
                <h2 style={{ fontSize: "24px", fontWeight: "600", paddingTop: "10px" }}>Create an Account</h2>
                <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
                    
                    <input 
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        type="text" 
                        name="username" 
                        id="username"
                        placeholder="Username" 
                        required
                        style={{ width: "100%", backgroundColor: "#f3f3f3", padding: "12px", border: "none", outline: "none" }}
                    />
                    
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

                    {message && <p style={{ color: "red" }}>{message}</p>}
                    
                    <button 
                        type="submit" 
                        style={{ width: "100%", marginTop: "10px", backgroundColor: "#4F46E5", color: "white", fontWeight: "500", padding: "12px", borderRadius: "5px", cursor: "pointer" }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>

                    <p>Already have an account? <Link to="/login" style={{ color: "blue", textDecoration: "underline" }}>Login</Link> here.</p>
                </form>
            </div>
        </section>
    );
};

export default Register;
