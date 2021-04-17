import React from 'react';
import styled from 'styled-components';
import { StyledThemeToggle } from './themeToggle.styled';

type ThemeToggleProps = {
  theme: any;
  toggleTheme: any;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  toggleTheme,
}: ThemeToggleProps) => {
  return (
    <StyledThemeToggle>
      {theme === 'dark' ? (
        <input
          type="checkbox"
          id="toggle"
          className="toggle--checkbox"
          onClick={toggleTheme}
          checked
        />
      ) : (
        <input
          type="checkbox"
          id="toggle"
          className="toggle--checkbox"
          onClick={toggleTheme}
        />
      )}
      <label htmlFor="toggle" className="toggle--label">
        <span className="toggle--label-background"></span>
      </label>
    </StyledThemeToggle>
  );
};

export default ThemeToggle;
