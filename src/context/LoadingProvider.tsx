import React, { createContext, useContext, useState } from "react";

interface LoadingContextType {
  loading: number;
  setLoading: (value: number) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  loading: 0,
  setLoading: () => {},
});

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(0);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
