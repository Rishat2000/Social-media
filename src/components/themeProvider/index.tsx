import React from 'react';

type ThemeContextType = {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => null,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme = localStorage.getItem('theme');
  const currentTheme = storedTheme ? (storedTheme as 'dark' | 'light') : 'dark';

  const [theme, setTheme] = React.useState(currentTheme);

  document.body.classList.add(theme);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      document.body.classList.remove(theme);
      document.body.classList.add(newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <>{children}</>
    </ThemeContext.Provider>
  );
};
