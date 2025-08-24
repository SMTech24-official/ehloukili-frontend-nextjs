"use client";

import React, { createContext, useContext, useState } from 'react';

interface DashboardContextType {
    pageTitle: string;
    setPageTitle: (title: string) => void;
    pageSubtitle: string;
    setPageSubtitle: (subtitle: string) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
    const [pageTitle, setPageTitle] = useState('Dashboard');
    const [pageSubtitle, setPageSubtitle] = useState('Welcome to your dashboard');

    return (
        <DashboardContext.Provider value={{ pageTitle, setPageTitle, pageSubtitle, setPageSubtitle }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};
