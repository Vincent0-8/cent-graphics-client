import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from '../../api/index.js'
import './Auth.css'

function Auth() {
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

const handleSubmit = async () => {
    const data = isLogin ? await loginUser(formData) : await registerUser(formData)
    if (data.token) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.result))
        
        // fetch saved palettes dari backend
        const savedRes = await fetch(`https://cent-graphics-production.up.railway.app/api/auth/saved`, {
            headers: { Authorization: `Bearer ${data.token}` }
        })
        const savedData = await savedRes.json()
        localStorage.setItem('saved-palettes', JSON.stringify(savedData.savedPalettes || []))
        
        window.location.href = '/'
    } else {
        alert(data.msg || 'Something went wrong')
    }
}

    return (
        <main className="auth-container">
            <div className="auth-card">
                <h1>{isLogin ? 'Welcome back' : 'Join Cent Graphics'}</h1>
                <p className="auth-subtitle">
                    {isLogin ? 'Login to access your collection' : 'Create an account to save palettes'}
                </p>
                <div className="auth-form">
                    {!isLogin && (
                        <input
                            name="username"
                            placeholder="Username"
                            onChange={handleChange}
                        />
                    )}
                    <input
                        name="email"
                        type="email"
                        placeholder="Email address"
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    {!isLogin && (
                        <input
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm password"
                            onChange={handleChange}
                        />
                    )}
                    <button className="auth-submit-btn" onClick={handleSubmit}>
                        {isLogin ? 'Login' : 'Create account'}
                    </button>
                </div>
                <p className="auth-switch" onClick={() => setIsLogin(prev => !prev)}>
                    {isLogin
                        ? <span>Don't have an account? <strong>Register</strong></span>
                        : <span>Already have an account? <strong>Login</strong></span>
                    }
                </p>
            </div>
        </main>
    )
}

export default Auth