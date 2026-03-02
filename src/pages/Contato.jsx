import React from 'react'

function Contato() {
    return (
        <div style={{ paddingTop: '100px' }}>
            <section className="section-padding">
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>FALE CONOSCO</h1>
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Solicite um orçamento para sua equipe ou tire suas dúvidas sobre nossos cursos.</p>
                    </div>

                    <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                        <div className="glass-card" style={{ padding: '3rem' }}>
                            <form>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>NOME COMPLETO</label>
                                    <input type="text" style={{ width: '100%', background: '#0a0a0b', border: '1px solid var(--industrial-border)', padding: '1rem', color: 'white', outline: 'none' }} placeholder="Ex: João Silva" />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>E-MAIL CORPORATIVO</label>
                                    <input type="email" style={{ width: '100%', background: '#0a0a0b', border: '1px solid var(--industrial-border)', padding: '1rem', color: 'white', outline: 'none' }} placeholder="joao@empresa.com.br" />
                                </div>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>MENSAGEM</label>
                                    <textarea rows="4" style={{ width: '100%', background: '#0a0a0b', border: '1px solid var(--industrial-border)', padding: '1rem', color: 'white', outline: 'none', resize: 'none' }} placeholder="Como podemos ajudar?"></textarea>
                                </div>
                                <button style={{ width: '100%', background: 'var(--primary-red)', color: 'white', padding: '1.2rem', fontWeight: 900, fontSize: '1rem', transform: 'skewX(-10deg)', boxShadow: '0 0 20px rgba(255,0,0,0.2)' }}>
                                    <span style={{ display: 'inline-block', transform: 'skewX(10deg)' }}>ENVIAR SOLICITAÇÃO</span>
                                </button>
                            </form>
                        </div>

                        <div>
                            <div style={{ marginBottom: '3rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>ATENDIMENTO DIRETO</h3>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>WhatsApp: (11) 9999-9999</p>
                                <p style={{ color: 'var(--text-muted)' }}>Email: cursos@treinamentos.com.br</p>
                            </div>
                            <div style={{ marginBottom: '3rem' }}>
                                <h3 style={{ marginBottom: '1rem' }}>NOSSA UNIDADE</h3>
                                <p style={{ color: 'var(--text-muted)' }}>Av. Industrial, 1500 - Sala 402</p>
                                <p style={{ color: 'var(--text-muted)' }}>São Paulo - SP</p>
                            </div>
                            <div style={{ height: '200px', background: 'var(--bg-card)', border: '1px solid var(--industrial-border)', borderRadius: '8px', backgroundImage: 'var(--hazard-pattern)', opacity: 0.1 }}></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Contato
