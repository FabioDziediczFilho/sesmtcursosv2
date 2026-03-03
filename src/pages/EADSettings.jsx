import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourses } from '../context/CourseContext';

const EADSettings = () => {
    const { courses } = useCourses();
    const [globalSettings, setGlobalSettings] = useState({
        supportNumber: '5541999548422',
        promoText: 'TREINAMENTOS ONLINE E PRESENCIAIS - INSCRIÇÕES ABERTAS',
        primaryColor: '#ff0000'
    });

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px', paddingBottom: '50px' }}>
            <div className="container">
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                    <Link to="/dashboard" style={{ color: 'var(--text-muted)' }}>← VOLTAR</Link>
                    <h1 style={{ fontSize: '2.5rem' }}>PAINEL DE <span style={{ color: 'var(--accent-yellow)' }}>CONFIGURAÇÃO</span></h1>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* Configurações Gerais */}
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--industrial-border)', paddingBottom: '1rem' }}>CONFIGURAÇÕES GERAIS</h3>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>WHATSAPP DE SUPORTE</label>
                            <input
                                type="text"
                                value={globalSettings.supportNumber}
                                onChange={(e) => setGlobalSettings({ ...globalSettings, supportNumber: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--industrial-border)', borderRadius: '4px', color: 'white' }}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>AVISO DO TOPO (BANNER)</label>
                            <input
                                type="text"
                                value={globalSettings.promoText}
                                onChange={(e) => setGlobalSettings({ ...globalSettings, promoText: e.target.value })}
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--industrial-border)', borderRadius: '4px', color: 'white' }}
                            />
                        </div>

                        <button style={{ width: '100%', padding: '1rem', background: 'var(--accent-yellow)', color: 'black', fontWeight: 900, borderRadius: '4px', border: 'none', cursor: 'pointer' }}>
                            SALVAR ALTERAÇÕES GLOBAIS
                        </button>
                    </div>

                    {/* Gestão de Cupons */}
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '2rem', borderBottom: '1px solid var(--industrial-border)', paddingBottom: '1rem' }}>CUPONS DE DESCONTO</h3>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ flex: 1 }}>
                                <input placeholder="CÓDIGO" style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--industrial-border)', borderRadius: '4px', color: 'white' }} />
                            </div>
                            <div style={{ width: '80px' }}>
                                <input placeholder="%" style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--industrial-border)', borderRadius: '4px', color: 'white' }} />
                            </div>
                            <button style={{ padding: '0.8rem 1.5rem', background: 'white', color: 'black', fontWeight: 900, borderRadius: '4px', border: 'none' }}>ADD</button>
                        </div>

                        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '4px', padding: '1rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                                <span>CSE10 (10% OFF)</span>
                                <span style={{ color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer' }}>EXCLUIR</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0' }}>
                                <span>PROMO2024 (15% OFF)</span>
                                <span style={{ color: '#ef4444', fontSize: '0.8rem', cursor: 'pointer' }}>EXCLUIR</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabela de Preços de Cursos */}
                <div className="glass-card" style={{ marginTop: '2rem', padding: '0' }}>
                    <div style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>GESTÃO DE PREÇOS & CATÁLOGO</h3>
                    </div>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--industrial-border)' }}>
                                <th style={{ padding: '1.2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>TREINAMENTO</th>
                                <th style={{ padding: '1.2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>PREÇO (R$)</th>
                                <th style={{ padding: '1.2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>STATUS</th>
                                <th style={{ padding: '1.2rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>AÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.id} style={{ borderBottom: '1px solid var(--industrial-border)' }}>
                                    <td style={{ padding: '1.2rem', fontWeight: 700 }}>{course.title}</td>
                                    <td style={{ padding: '1.2rem' }}>
                                        <input
                                            defaultValue={course.price}
                                            style={{ background: 'transparent', border: '1px solid var(--industrial-border)', color: 'white', padding: '0.3rem', borderRadius: '4px', width: '100px' }}
                                        />
                                    </td>
                                    <td style={{ padding: '1.2rem' }}>
                                        <span style={{ color: course.status === 'Pausado' ? '#ef4444' : '#22c55e', fontSize: '0.8rem', fontWeight: 900 }}>{(course.status || 'Ativo').toUpperCase()}</span>
                                    </td>
                                    <td style={{ padding: '1.2rem' }}>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button style={{ background: 'transparent', border: '1px solid var(--industrial-border)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.7rem' }}>PREÇO</button>
                                            <Link to={`/edit-course/${course.id}`} style={{ background: 'var(--primary-red)', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 900, textDecoration: 'none' }}>AULAS</Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default EADSettings;
