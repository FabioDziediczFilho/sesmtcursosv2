import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ownedCourses, setOwnedCourses] = useState([]);

    const defaultCourses = [
        {
            id: '1',
            title: 'DIREÇÃO DEFENSIVA',
            category: 'Trânsito',
            duration: '8h',
            price: '250,00',
            image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800',
            description: 'Treinamento completo sobre prevenção de acidentes e condução segura.',
            status: 'Ativo',
            lessons: []
        }
    ];

    // 1. Carregar Cursos do Banco
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data, error } = await supabase.from('courses').select('*').order('created_at', { ascending: false });
                if (error) throw error;
                setCourses(data || defaultCourses);
            } catch (err) {
                console.error('Erro ao buscar cursos:', err.message);
                setCourses(defaultCourses);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    // 2. Sincronizar Cursos Adquiridos (Enrollments)
    useEffect(() => {
        const fetchEnrollments = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data, error } = await supabase
                .from('enrollments')
                .select('course_id')
                .eq('user_id', session.user.id);

            if (!error && data) {
                setOwnedCourses(data.map(e => e.course_id));
            }
        };

        fetchEnrollments();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
            fetchEnrollments();
        });

        return () => subscription.unsubscribe();
    }, []);

    const checkOwnership = (userId, courseId) => {
        if (!userId) return false;
        return ownedCourses.includes(courseId);
    };

    const purchaseCourse = async (userId, courseId) => {
        if (!userId) return false;
        try {
            const { error } = await supabase
                .from('enrollments')
                .insert([{ user_id: userId, course_id: courseId }]);

            if (error) throw error;
            setOwnedCourses(prev => [...prev, courseId]);
            return true;
        } catch (err) {
            console.error('Erro na compra:', err.message);
            return false;
        }
    };

    const addCourse = async (newCourse) => {
        const { data, error } = await supabase.from('courses').insert([{ ...newCourse, status: 'Ativo' }]).select();
        if (!error && data) setCourses(prev => [data[0], ...prev]);
    };

    const updateCourse = async (id, updatedData) => {
        const { error } = await supabase.from('courses').update(updatedData).eq('id', id);
        if (!error) setCourses(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
    };

    const deleteCourse = async (id) => {
        const { error } = await supabase.from('courses').delete().eq('id', id);
        if (!error) setCourses(prev => prev.filter(c => c.id !== id));
    };

    return (
        <CourseContext.Provider value={{
            courses,
            addCourse,
            updateCourse,
            deleteCourse,
            loading,
            checkOwnership,
            purchaseCourse,
            ownedCourses
        }}>
            {children}
        </CourseContext.Provider>
    );
};

export const useCourses = () => useContext(CourseContext);
