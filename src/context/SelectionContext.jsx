import React, { createContext, useState, useEffect } from "react";

export const SelectionContext = createContext();

export const SelectionProvider = ({ children }) => {
    const [selectedOption, setSelectedOption] = useState(() => {
        return localStorage.getItem("selectedOption") || null;
      });
    
      useEffect(() => {
        if (selectedOption) {
          localStorage.setItem("selectedOption", selectedOption);
        }
      }, [selectedOption]);

  return (
    <SelectionContext.Provider value={{ selectedOption, setSelectedOption }}>
        {children}
    </SelectionContext.Provider>
  );
};
