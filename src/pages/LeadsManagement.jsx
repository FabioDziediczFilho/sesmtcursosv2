import React from 'react';
import { Link } from 'react-router-dom';

const LeadsManagement = () => {
    // Dados fictícios para demonstração
    const leads = [
        { id: 1, name: 'Carlos Oliveira', email: 'carlos.o@gmail.com', interest: 'NR35 Trabalho em Altura', date: '03/03/2026', status: 'Novo' },
        { id: 2, name: 'Mariana Souza', email: 'mariana.sou@uol.com.br', interest: 'Bombeiro Civil', date: '02/03/2026', status: 'Em Contato' },
        { id: 3, name: 'Roberto Lima', email: 'roberto.eng@empresa.com', interest: 'NR10 Elétrica', date: '02/03/2026', status: 'Novo' },
        { id: 4, name: 'Amanda Costa', email: 'amanda.c@hotm.com', interest: 'Direção Defensiva', date: '01/03/2026', status: 'Fechado' },
        { id: 5, name: 'Jorge Silva', email: 'jorge.silva@outlook.com', interest: 'NR33 Espaço Confinado', date: '01/03/2026', status: 'Novo' },
        { id: 6, name: 'Fernanda Rocha', email: 'nandarocha@gmail.com', interest: 'Primeiros Socorros', date: '28/02/2026', status: 'Novo' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '100px' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <Link to="/dashboard" style={{ color: 'var(--text-muted)' }}>← VOLTAR</Link>
                        <h1 style={{ fontSize: '2.5rem' }}>GESTÃO DE <span style={{ color: 'var(--primary-red)' }}>LEADS</span></h1>
                    </div>
                    <button style={{ padding: '0.8rem 1.5rem', background: 'var(--accent-yellow)', color: 'black', border: 'none', borderRadius: '4px', fontWeight: 900 }}>EXPORTAR EXCEL</button>
                </div>

                <div className="glass-card" style={{ padding: '0', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--industrial-border)', background: 'rgba(255,255,255,0.02)' }}>
                                <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>NOME</th>
                                <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>CONTATO</th>
                                <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>INTERESSE (CURSO)</th>
                                <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>DATA</th>
                                <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>STATUS</th>
                                <th style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>AÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead) => (
                                <tr key={lead.id} style={{ borderBottom: '1px solid var(--industrial-border)', transition: 'background 0.3s' }}>
                                    <td style={{ padding: '1.5rem', fontWeight: 700 }}>{lead.name}</td>
                                    <td style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>{lead.email}</td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.3rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                                            {lead.interest}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.5rem', color: 'var(--text-muted)' }}>{lead.date}</td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <span style={{
                                            padding: '0.3rem 0.8rem',
                                            borderRadius: '50px',
                                            fontSize: '0.7rem',
                                            fontWeight: 900,
                                            background: lead.status === 'Novo' ? 'rgba(239, 68, 68, 0.1)' : lead.status === 'Fechado' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                                            color: lead.status === 'Novo' ? '#ef4444' : lead.status === 'Fechado' ? '#22c55e' : '#fbbf24',
                                            border: lead.status === 'Novo' ? '1px solid #ef4444' : lead.status === 'Fechado' ? '1px solid #22c55e' : '1px solid #fbbf24'
                                        }}>
                                            {lead.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td style={{ padding: '1.5rem' }}>
                                        <button style={{ background: 'transparent', color: 'white', border: '1px solid var(--industrial-border)', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.7rem', cursor: 'pointer' }}>DETALHES</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Exibindo {leads.length} registros simulados de interesse comercial.
                </div>
            </div>
        </div>
    );
};

export default LeadsManagement;
