import React, { createContext, useState } from 'react';

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);

    const addToHistory = (searchValue) => {
        setHistory((prevHistory) => [...prevHistory, searchValue]);
    };

    const clearHistory = () => {
        setHistory([]);
    };

    return (
        <HistoryContext.Provider
            value={{
                history,
                addToHistory,
                clearHistory,
                setHistory, // Add setHistory to the context value
            }}
        >
            {children}
        </HistoryContext.Provider>
    );
};
