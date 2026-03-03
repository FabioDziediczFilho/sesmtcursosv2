import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

const Certificate = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const { courses } = useCourses();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [date, setDate] = useState('');

    useEffect(() => {
        const found = courses.find(c => c.id === id);
        if (found) setCourse(found);

        const today = new Date();
        setDate(today.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }));
    }, [id, courses]);

    if (!course || !user) return <div style={{ color: 'white', textAlign: 'center', padding: '100px' }}>GERANDO DOCUMENTO...</div>;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div style={{ minHeight: '100vh', background: '#1a1a1a', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 20px' }}>
            {/* Barra de Ações - Oculta na Impressão */}
            <div className="no-print" style={{ width: '100%', maxWidth: '1000px', display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                <button onClick={() => navigate('/dashboard')} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 700 }}>← VOLTAR AO PAINEL</button>
                <button onClick={handlePrint} style={{ background: 'var(--primary-red)', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '4px', cursor: 'pointer', fontWeight: 900, boxShadow: '0 4px 15px rgba(255,0,0,0.3)' }}>IMPRIMIR CERTIFICADO (PDF)</button>
            </div>

            {/* O CERTIFICADO */}
            <div className="certificate-container" style={{
                width: '1000px',
                height: '700px',
                background: '#0a0a0b',
                border: '15px solid #1e1e1e',
                position: 'relative',
                padding: '60px',
                color: 'white',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                fontFamily: "'Inter', sans-serif"
            }}>
                {/* Bordas Decorativas Douradas */}
                <div style={{ position: 'absolute', top: '10px', left: '10px', right: '10px', bottom: '10px', border: '2px solid rgba(251, 191, 36, 0.3)', pointerEvents: 'none' }}></div>

                {/* Background Texturizado (Mockup) */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w4.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6zM36 4V0h-2v4h-4v2h4v4h2V6h4V4h-2z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")', pointerEvents: 'none' }}></div>

                {/* Header do Certificado */}
                <div style={{ textAlign: 'center', marginBottom: '50px', position: 'relative' }}>
                    <h4 style={{ color: 'var(--accent-yellow)', letterSpacing: '8px', fontSize: '0.9rem', marginBottom: '20px', fontWeight: 900 }}>CERTIFICADO DE CONCLUSÃO</h4>
                    <div style={{ width: '120px', height: '120px', background: 'var(--primary-red)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '5px solid #1a1a1b', boxShadow: '0 0 30px rgba(255,0,0,0.3)' }}>
                        <span style={{ fontSize: '3rem', fontWeight: 900 }}>CSE</span>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '2px' }}>CENTRO DE SEGURANÇA E EMERGÊNCIAS</div>
                </div>

                {/* Corpo do Certificado */}
                <div style={{ textAlign: 'center', position: 'relative' }}>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.2rem', marginBottom: '30px' }}>Certificamos que para os devidos fins de direito,</p>

                    <h1 style={{ fontSize: '3.5rem', color: 'white', textTransform: 'uppercase', marginBottom: '30px', textDecoration: 'underline', textDecorationColor: 'var(--primary-red)', textUnderlineOffset: '15px' }}>
                        {user.name}
                    </h1>

                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto 40px', color: 'rgba(255,255,255,0.8)' }}>
                        Concluiu com êxito o treinamento profissional de <br />
                        <strong style={{ color: 'var(--accent-yellow)', fontSize: '1.8rem' }}>{course.title}</strong><br />
                        com carga horária total de <strong>{course.duration}</strong>.
                    </p>
                </div>

                {/* Footer do Certificado */}
                <div style={{ position: 'absolute', bottom: '60px', left: '60px', right: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '200px', borderTop: '1px solid white', paddingTop: '10px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>DIRETORIA DE ENSINO CSE</div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', marginBottom: '10px' }}>Emitido em {date}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--accent-yellow)', letterSpacing: '1px' }}>Cod. Autenticidade: CSE-{Math.random().toString(36).substr(2, 9).toUpperCase()}</div>
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '80px', height: '80px', background: 'white', padding: '5px' }}>
                            {/* QR Code Simulado */}
                            <div style={{ width: '100%', height: '100%', background: 'black', padding: '10px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px' }}>
                                {[...Array(9)].map((_, i) => <div key={i} style={{ background: 'white' }}></div>)}
                            </div>
                        </div>
                        <div style={{ fontSize: '0.6rem', marginTop: '10px', color: 'rgba(255,255,255,0.4)' }}>VERIFICAR QR CODE</div>
                    </div>
                </div>
            </div>

            {/* Estilos CSS para Impressão */}
            <style>{`
                @media print {
                    .no-print { display: none !important; }
                    body { background: white !important; padding: 0 !important; margin: 0 !important; }
                    .certificate-container { 
                        box-shadow: none !important; 
                        border: 10px solid #000 !important; 
                        margin: 0 !important;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    * { color: black !important; }
                    .certificate-container { background: white !important; }
                    h1 { color: black !important; }
                }
            `}</style>
        </div>
    );
};

export default Certificate;
