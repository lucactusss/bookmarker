import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.css';
import ThemeToggle from './components/themeToggle/themeToggle';
import { GlobalStyles } from './globalStyle';
import { useDarkMode } from './hooks/useDarkMode';
import { darkTheme, lightTheme } from './theme';

const App: React.FC = () => {
  const [theme, themeToggler] = useDarkMode();

  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <ThemeToggle theme={theme} toggleTheme={themeToggler} />
      <div className="App">Hello world!</div>
    </ThemeProvider>
  );
};

export default App;
