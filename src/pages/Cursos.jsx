import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCourses } from '../context/CourseContext'

function Cursos() {
    const { user } = useAuth();
    const { courses, checkOwnership } = useCourses();

    return (
        <div style={{ paddingTop: '100px' }}>
            <section className="section-padding reveal">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>TREINAMENTOS</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
                            Catálogo completo de normas regulamentadoras e formações profissionais reconhecidas nacionalmente.
                        </p>
                    </div>

                    <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2.5rem' }}>
                        {courses.map((item, i) => (
                            <div key={item.id || i} className="glass-card" style={{ padding: '0', overflow: 'hidden', position: 'relative' }}>
                                <div style={{ height: '220px', background: `linear-gradient(transparent, rgba(10,10,11,0.9)), url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.8)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 900, border: '1px solid var(--accent-yellow)' }}>
                                        {item.duration}
                                    </div>
                                </div>
                                <div style={{ padding: '2rem' }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'white' }}>{item.title}</h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem', lineHeight: '1.5' }}>
                                        {item.description}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                        <span style={{ color: 'var(--accent-yellow)', fontWeight: 900, fontSize: '1.1rem' }}>R$ {item.price}</span>
                                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>{item.category?.toUpperCase()}</span>
                                    </div>

                                    {!user ? (
                                        <Link to="/signup" style={{ width: '100%', padding: '0.9rem', background: 'var(--primary-red)', color: 'white', fontWeight: 900, borderRadius: '4px', fontSize: '0.75rem', display: 'block', textAlign: 'center', transition: 'all 0.3s', border: 'none', boxShadow: '0 4px 15px rgba(255,0,0,0.2)' }}>
                                            MATRICULE-SE AGORA
                                        </Link>
                                    ) : (
                                        checkOwnership(user.id, item.id) ? (
                                            <Link to="/dashboard" style={{ width: '100%', padding: '0.9rem', background: '#22c55e', color: 'white', fontWeight: 900, borderRadius: '4px', fontSize: '0.75rem', display: 'block', textAlign: 'center', transition: 'all 0.3s', border: 'none' }}>
                                                JÁ ADQUIRIDO - ACESSAR
                                            </Link>
                                        ) : (
                                            <Link to={`/checkout/${item.id}`} style={{ width: '100%', padding: '0.9rem', background: 'var(--primary-red)', color: 'white', fontWeight: 900, borderRadius: '4px', fontSize: '0.75rem', display: 'block', textAlign: 'center', transition: 'all 0.3s', border: 'none', boxShadow: '0 4px 15px rgba(255,0,0,0.2)' }}>
                                                COMPRAR TREINAMENTO
                                            </Link>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Cursos
