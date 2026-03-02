import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    return (
        <header className="header" style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--industrial-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(10, 10, 11, 0.95)', backdropFilter: 'blur(10px)', position: 'fixed', width: '100%', top: 0, zIndex: 100 }}>
            <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--primary-red)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '30px', height: '30px', background: 'var(--primary-red)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem' }}>+</div>
                CSE<span style={{ color: 'white' }}>TREINA</span>
            </div>
            <nav style={{ display: 'flex', gap: '2rem', fontWeight: 700, fontSize: '0.85rem' }}>
                <Link to="/" style={{ color: isActive('/') ? 'white' : 'var(--text-muted)' }}>INÍCIO</Link>
                <Link to="/cursos" style={{ color: isActive('/cursos') ? 'white' : 'var(--text-muted)' }}>TREINAMENTOS</Link>
                <Link to="/sesmt" style={{ color: isActive('/sesmt') ? 'white' : 'var(--text-muted)' }}>SESMT</Link>
                <Link to="/contato" style={{ color: isActive('/contato') ? 'white' : 'var(--text-muted)' }}>CONTATO</Link>
            </nav>
            <div className="auth" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button style={{ background: 'transparent', color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>LOGIN</button>
                <button style={{ background: '#22c55e', color: 'white', padding: '0.6rem 1.5rem', borderRadius: '4px', fontWeight: 900, fontSize: '0.85rem' }}>CADASTRE-SE</button>
            </div>
        </header>
    )
}

export default Navbar
