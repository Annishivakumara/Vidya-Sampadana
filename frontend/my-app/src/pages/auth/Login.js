import { useState } from 'react';

function Login() {

    // these store what user types
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();  // prevents page refresh

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                alert('Login successful!');
            } else {
                setError('Wrong email or password');
            }

        } catch (err) {
            setError('Cannot connect to server');
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f0f2f5'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '40px',
                borderRadius: '10px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                width: '350px'
            }}>

                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                    Login
                </h2>

                {/* show error if any */}
                {error && (
                    <p style={{ color: 'red', textAlign: 'center' }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit}>

                    {/* Email field */}
                    <div style={{ marginBottom: '15px' }}>
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginTop: '5px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Password field */}
                    <div style={{ marginBottom: '20px' }}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                marginTop: '5px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#4f46e5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Login;