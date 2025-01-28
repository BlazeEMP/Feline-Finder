// TODO get login working and modify as needed.
// 1.) once logged in userBreed associations should be made to through table on button clicks on homepage
// 2.) when not logged in the messages for not being logged in should be displayed across each page and where API calls that need authentication are made (/userBreed calls on saved cats page, and save button on homepage)
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; //added for routing
//import { auth } from '../need client side auth.ts

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [loginData, setLoginData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    //implemented JWT storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            navigate('/');
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setIsLoggedIn(true);
                navigate('/');
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Failed to login. Please check your credentials.');
        }
    };

    if (isLoggedIn) {
        return <div>Already logged in. Redirecting...</div>;
    }

    return (
        <div className='container'>
            <form className='form' onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label >Email</label>
                <input
                    type='email'
                    name='email'
                    value={loginData.email}
                    onChange={handleChange}
                    required //made fields required
                />
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    value={loginData.password}
                    onChange={handleChange}
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    );
};

export default Login;