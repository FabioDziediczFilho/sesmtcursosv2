import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [mpConfig, setMpConfig] = useState({
        accessToken: localStorage.getItem('mp_access_token') || '',
        publicKey: localStorage.getItem('mp_public_key') || '',
        sandboxMode: localStorage.getItem('mp_sandbox_mode') === 'true' || true,
    });
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Persistir no localStorage para conveniência local
        localStorage.setItem('mp_access_token', mpConfig.accessToken);
        localStorage.setItem('mp_public_key', mpConfig.publicKey);
        localStorage.setItem('mp_sandbox_mode', mpConfig.sandboxMode);
    }, [mpConfig]);

    const updateMpConfig = (newConfig) => {
        setMpConfig(prev => ({ ...prev, ...newConfig }));
    };

    // Simulação de busca de eventos de webhook
    const fetchPaymentEvents = async () => {
        // No futuro, isso buscará de uma tabela 'payment_logs' no Supabase
        const mockEvents = [
            { id: 1, type: 'payment.approved', detail: 'Pagamento #82731 Aprovado', date: '5 min atrás', status: 'success' },
            { id: 2, type: 'payment.pending', detail: 'Aguardando Pix #82730', date: '12 min atrás', status: 'pending' },
        ];
        setTransactions(mockEvents);
    };

    useEffect(() => {
        fetchPaymentEvents();
    }, []);

    return (
        <PaymentContext.Provider value={{
            mpConfig,
            updateMpConfig,
            transactions,
            fetchPaymentEvents
        }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePayment = () => useContext(PaymentContext);
