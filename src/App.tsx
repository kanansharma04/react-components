import { useState, useEffect } from 'react';
import InputField from './components/InputField/InputField';
import DataTable from './components/DataTable/DataTable';
import Navbar from './components/Navbar/Navbar';
import './App.css';

function App() {
  const [active, setActive] = useState<'input' | 'table'>('input');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [inputValue, setInputValue] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Theme toggle logic
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={theme === 'dark' ? 'dark bg-gray-900 min-h-screen' : 'bg-white min-h-screen'}>
      <Navbar
        active={active}
        setActive={setActive}
        theme={theme}
        onThemeToggle={handleThemeToggle}
      />
      <div className="pt-20 px-4">
        {active === 'input' ? (
          <div className="bg-white dark:bg-gray-900 max-w-lg mx-auto rounded-xl shadow-lg dark:shadow-sm p-8 space-y-6 border border-gray-200 dark:border-gray-700">
            <InputField
              label="Name"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              placeholder="Enter your name"
              clearable
              helperText="This is a demo input"
              size="md"
            />
            <InputField
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              type="email"
              clearable
              helperText="Please enter a valid email address"
              size="md"
            />
            <InputField
              label="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              type="password"
              passwordToggle
              clearable
              helperText="Password must be at least 6 characters and contain a number"
              size="md"
            />
          </div>
        ) : (
          <DataTable data={[]} columns={[]} />
        )}
      </div>
    </div>
  );
}

export default App;
