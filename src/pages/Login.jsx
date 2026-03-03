import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoggingIn(true);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            console.error("Erro no login:", err.message);
            alert("Erro ao entrar: Verifique seu e-mail e senha. " + (err.message.includes("Invalid login") ? "Dados inválidos." : ""));
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-dark)', paddingTop: '80px' }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '3rem', position: 'relative', overflow: 'hidden' }}>
                {/* Detalhe estético industrial */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--primary-red)' }}></div>
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px', backgroundImage: 'var(--hazard-pattern)', opacity: 0.2 }}></div>

                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                    <div className="logo" style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--primary-red)', justifyContent: 'center', marginBottom: '1rem' }}>
                        CSE<span style={{ color: 'white' }}>TREINA</span>
                    </div>
                    <h2 style={{ fontSize: '1.5rem', letterSpacing: '1px' }}>ACESSO AO PORTAL</h2>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Bem-vindo ao Centro de Segurança e Emergências</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem', textTransform: 'uppercase' }}>E-mail ou CPF</label>
                        <input
                            required
                            type="text"
                            placeholder="Digite seu acesso"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--industrial-border)', borderRadius: '4px', color: 'white', outline: 'none' }}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                            <label style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>Senha</label>
                            <a href="#" style={{ color: 'var(--accent-yellow)', fontSize: '0.75rem', fontWeight: 700 }}>ESQUECEU A SENHA?</a>
                        </div>
                        <input
                            required
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--industrial-border)', borderRadius: '4px', color: 'white', outline: 'none' }}
                        />
                    </div>

                    <button type="submit" style={{ width: '100%', padding: '1.2rem', background: 'var(--primary-red)', color: 'white', fontWeight: 900, borderRadius: '4px', border: 'none', cursor: 'pointer', transition: 'all 0.3s', boxShadow: '0 4px 20px rgba(255,0,0,0.3)', marginBottom: '1.5rem' }}>
                        ENTRAR NO PORTAL
                    </button>

                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                        Ainda não tem conta? <Link to="/signup" style={{ color: 'white', fontWeight: 700 }}>Cadastre-se aqui</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
