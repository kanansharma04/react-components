import React from 'react';

interface NavbarProps {
  active: 'input' | 'table';
  setActive: (v: 'input' | 'table') => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ active, setActive, theme, onThemeToggle }) => {
  return (
    <nav className={`fixed top-0 left-0 w-full z-10 shadow flex items-center justify-between px-4 py-3
      bg-white dark:bg-gray-900 transition-colors duration-300`}>
      <div className="flex items-center gap-4">
        <span className="font-bold text-xl text-blue-700 dark:text-blue-300">Demo App</span>
        <button
          className={`px-3 py-2 rounded transition font-medium ${
            active === 'input'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800'
          }`}
          onClick={() => setActive('input')}
        >
          Input Field
        </button>
        <button
          className={`px-3 py-2 rounded transition font-medium ${
            active === 'table'
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
              : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800'
          }`}
          onClick={() => setActive('table')}
        >
          Data Table
        </button>
      </div>
      <button
        className="flex items-center gap-2 px-3 py-2 rounded transition bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        onClick={onThemeToggle}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
            <span>Light</span>
          </>
        ) : (
          <>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 6.95l-1.41-1.41M6.46 6.46L5.05 5.05m12.02 0l-1.41 1.41M6.46 17.54l-1.41 1.41" />
            </svg>
            <span>Dark</span>
          </>
        )}
      </button>
    </nav>
  );
};

export default Navbar;
