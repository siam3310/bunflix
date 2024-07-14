'use client'
import React, { createContext, useContext, useState, SetStateAction } from "react";

const SearchBarFocusContext = createContext<{
    isSearchBarFocused: boolean;
    setIsSearchBarFocused: (value: boolean) => void;
}>({
    isSearchBarFocused: false,
    setIsSearchBarFocused: () => {},
});

export const SearchBarFocusProvider = ({ children }: { children: React.ReactNode }) => {
    const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

    return (
        <SearchBarFocusContext.Provider value={{ isSearchBarFocused, setIsSearchBarFocused }}>
            {children}
        </SearchBarFocusContext.Provider>
    );
};

export const useSearchBarFocus = () => useContext(SearchBarFocusContext);