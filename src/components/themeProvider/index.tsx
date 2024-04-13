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
      <div
        style={{
          transition: 'background-color 0.2s',
          minHeight: '100vh',
          backgroundColor: `${theme === 'dark' ? '#0F0F0F' : '#fff'}`,
          color: `${theme === 'dark' ? '#fff' : '#0F0F0F'}`,
        }}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
