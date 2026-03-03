import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const { courses, checkOwnership } = useCourses();
    const navigate = useNavigate();
    const [courseProgress, setCourseProgress] = useState({});

    useEffect(() => {
        if (!user || !user.id) return;

        const fetchAllProgress = async () => {
            const { data, error } = await supabase
                .from('user_progress')
                .select('course_id, lesson_id, is_completed')
                .eq('user_id', user.id)
                .eq('is_completed', true);

            if (!error && data) {
                const progressMap = {};
                data.forEach(item => {
                    if (!progressMap[item.course_id]) progressMap[item.course_id] = 0;
                    progressMap[item.course_id]++;
                });
                setCourseProgress(progressMap);
            }
        };

        fetchAllProgress();
    }, [user]);

    const displayCourses = user?.role === 'admin'
        ? courses
        : courses.filter(c => checkOwnership(user?.id, c.id));

    const calculateProgress = (courseId, totalLessons) => {
        if (!totalLessons || !courseProgress[courseId]) return 0;
        return Math.round((courseProgress[courseId] / totalLessons) * 100);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-dark)', paddingTop: '120px' }}>
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                            <h1 style={{ fontSize: '2.5rem' }}>BEM-VINDO, <span style={{ color: 'var(--primary-red)' }}>{user?.name?.toUpperCase()}</span></h1>
                            {user?.role === 'admin' && (
                                <span style={{ background: 'var(--primary-red)', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 900 }}>ACESSO ADM</span>
                            )}
                        </div>
                        <p style={{ color: 'var(--text-muted)' }}>
                            {user?.role === 'admin' ? 'Painel de Gestão Estratégica CSE' : 'Área restrita do aluno CSE Treina'}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        style={{ padding: '0.8rem 1.5rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--industrial-border)', borderRadius: '4px', fontWeight: 700 }}
                    >
                        SAIR DO PORTAL
                    </button>
                </div>

                <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                    {user?.role === 'admin' ? (
                        /* DASHBOARD ADM - WIDGETS */
                        <>
                            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid #ef4444', background: 'rgba(239, 68, 68, 0.05)' }}>
                                <h3 style={{ marginBottom: '1rem', color: '#ef4444' }}>GESTÃO DE LEADS</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Você tem 12 novos interessados nos cursos de NR35 e Bombeiro Civil hoje.</p>
                                <Link to="/leads" style={{ marginTop: '1.5rem', padding: '0.8rem', width: '100%', background: '#ef4444', color: 'white', borderRadius: '4px', fontWeight: 900, display: 'block', textAlign: 'center' }}>VER LISTA DE CONTATOS</Link>
                            </div>

                            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-yellow)' }}>
                                <h3 style={{ marginBottom: '1rem', color: 'var(--accent-yellow)' }}>RELATÓRIOS VENDAS</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>O faturamento bruto deste mês atingiu R$ 15.400,00.</p>
                                <button style={{ marginTop: '1.5rem', color: 'var(--accent-yellow)', fontWeight: 700, background: 'transparent', borderBottom: '1px solid' }}>BAIXAR RELATÓRIO PDF</button>
                            </div>

                            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid #3b82f6' }}>
                                <h3 style={{ marginBottom: '1rem', color: '#3b82f6' }}>CRIAR NOVO CURSO</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Adicione novos treinamentos ao catálogo oficial da CSE instantaneamente.</p>
                                <Link to="/create-course" style={{ marginTop: '1.5rem', padding: '0.8rem', width: '100%', background: '#3b82f6', color: 'white', borderRadius: '4px', fontWeight: 900, display: 'block', textAlign: 'center' }}>NOVO CURSO</Link>
                            </div>
                        </>
                    ) : (
                        /* DASHBOARD ALUNO - WIDGETS */
                        <>
                            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--accent-yellow)' }}>
                                <h3 style={{ marginBottom: '1rem' }}>SUPORTE TÉCNICO</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Fale diretamente com os instrutores da CSE via WhatsApp.</p>
                                <button style={{ marginTop: '1.5rem', padding: '0.8rem', width: '100%', background: '#22c55e', color: 'white', borderRadius: '4px', fontWeight: 900 }}>CHAMAR NO ZAP</button>
                            </div>
                            <div className="glass-card" style={{ padding: '2rem', borderLeft: '4px solid var(--primary-red)' }}>
                                <h3 style={{ marginBottom: '1rem' }}>CERTIFICADOS</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Seus documentos estarão disponíveis aqui após a conclusão.</p>
                            </div>
                        </>
                    )}
                </div>

                {/* Listagem de Treinamentos */}
                <h2 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '40px', height: '4px', background: 'var(--primary-red)' }}></div>
                    {user?.role === 'admin' ? 'GESTÃO DE CURSOS ATIVOS' : 'MEUS TREINAMENTOS'}
                </h2>

                <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {displayCourses.length > 0 ? (
                        displayCourses.map(course => {
                            const progress = calculateProgress(course.id, course.lessons?.length);
                            return (
                                <div key={course.id} className="glass-card" style={{ padding: '0', overflow: 'hidden', borderLeft: '4px solid var(--primary-red)' }}>
                                    <div style={{ height: '140px', background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${course.image})`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '1.5rem', display: 'flex', alignItems: 'flex-end' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 900 }}>{course.title}</h3>
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.8rem', fontWeight: 700 }}>
                                            <span>{course.lessons?.length || 0} AULAS</span>
                                            <span style={{ color: progress === 100 ? '#22c55e' : 'inherit' }}>PROGRESSO: {progress}%</span>
                                        </div>

                                        {/* Barra de Progresso Visual */}
                                        <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                                            <div style={{ width: `${progress}%`, height: '100%', background: progress === 100 ? '#22c55e' : 'var(--primary-red)', transition: 'width 0.5s ease' }}></div>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                            <Link
                                                to={`/player/${course.id}`}
                                                style={{ background: 'var(--primary-red)', color: 'white', padding: '0.8rem', borderRadius: '4px', fontWeight: 900, fontSize: '0.75rem', display: 'block', textAlign: 'center' }}
                                            >
                                                {user?.role === 'admin' ? 'PREVIEW DO ALUNO' : 'ACESSAR TREINAMENTO'}
                                            </Link>

                                            {/* Botão de Certificado 100% */}
                                            {progress === 100 && user?.role !== 'admin' && (
                                                <Link
                                                    to={`/certificate/${course.id}`}
                                                    style={{ background: 'var(--accent-yellow)', color: 'black', padding: '0.8rem', borderRadius: '4px', fontWeight: 900, fontSize: '0.75rem', display: 'block', textAlign: 'center', boxShadow: '0 0 15px rgba(251, 191, 36, 0.4)' }}
                                                >
                                                    🏆 BAIXAR MEU CERTIFICADO
                                                </Link>
                                            )}

                                            {user?.role === 'admin' && (
                                                <Link
                                                    to={`/edit-course/${course.id}`}
                                                    style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid var(--industrial-border)', padding: '0.8rem', borderRadius: '4px', fontWeight: 900, fontSize: '0.75rem', display: 'block', textAlign: 'center' }}
                                                >
                                                    GERENCIAR CONTEÚDO
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '2px dashed var(--industrial-border)' }}>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Você ainda não possui nenhum curso adquirido.</p>
                            <Link to="/cursos" style={{ padding: '0.8rem 2rem', background: 'var(--primary-red)', color: 'white', borderRadius: '4px', fontWeight: 900 }}>CONHECER CURSOS</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
