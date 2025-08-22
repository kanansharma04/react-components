import React, { useState } from 'react';
import type { InputFieldProps } from './types';

// Variants: filled, outlined, ghost
const variantClasses = {
  filled: 'bg-white border border-blue-200 focus:bg-white dark:bg-white dark:border-blue-800 dark:focus:bg-white',
  outlined: 'bg-white border border-gray-300 dark:bg-white dark:border-gray-700',
  ghost: 'bg-white border border-gray-300 dark:bg-white dark:border-gray-500',
};

// Sizes: small, medium, large
const sizeClasses = {
  sm: 'py-1 px-2 text-sm',
  md: 'py-2 px-3 text-base',
  lg: 'py-3 px-4 text-lg',
};

type InputType = 'text' | 'email' | 'password';

const InputField: React.FC<InputFieldProps & {
  clearable?: boolean;
  passwordToggle?: boolean;
  loading?: boolean;
  type?: InputType;
}> = ({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  clearable = false,
  passwordToggle = false,
  type = 'text',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  // Validation logic
  const validate = (val: string) => {
    if (type === 'email') {
      // Simple email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (val && !emailRegex.test(val)) {
        return 'Invalid email address';
      }
    }
    if (type === 'password') {
      // Password: min 6 chars, at least one number
      if (val && (val.length < 6 || !/\d/.test(val))) {
        return 'Password must be at least 6 characters and contain a number';
      }
    }
    return null;
  };

  // Text input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLocalError(validate(val));
    if (onChange) onChange(e);
  };

  // Clear button handler
  const handleClear = () => {
    setLocalError(null);
    if (onChange) {
      const event = {
        ...({} as React.ChangeEvent<HTMLInputElement>),
        target: { value: '' } as HTMLInputElement,
      };
      onChange(event);
    }
  };

  // Password toggle logic
  const inputType =
    type === 'password'
      ? showPassword
        ? 'text'
        : 'password'
      : type;

  return (
    <div className="mb-6 w-full max-w-md mx-auto relative">
      {/* Dark theme animated background */}
      <div className="hidden dark:block absolute inset-0 z-0 rounded-xl pointer-events-none">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80 rounded-xl animate-dark-bg"></div>
      </div>
      <div className="relative z-10 shadow-lg dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.9)]">
        {/* Label */}
        {label && (
          <label className="block mb-1 font-semibold text-blue-700 dark:text-blue-300">{label}</label>
        )}
        <div className="relative w-full">
          {/* Text/Email/Password input */}
          <input
            type={inputType}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            className={`w-full rounded-lg shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 ${sizeClasses[size]} ${variantClasses[variant]} ${invalid || localError ? 'border-red-500 focus:ring-red-500 dark:border-red-500' : ''} ${disabled ? 'bg-gray-200 cursor-not-allowed opacity-70 dark:bg-gray-800' : ''} pr-12`}
          />
          {/* Loading spinner */}
          {loading && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 animate-spin text-blue-400 dark:text-blue-300">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            </span>
          )}
          {/* Password toggle button */}
          {passwordToggle && type === 'password' && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={disabled}
              className="absolute right-10 top-1/2 -translate-y-1/2 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded transition hover:bg-blue-200 focus:outline-none dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
              tabIndex={-1}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          )}
          {/* Clear button */}
          {clearable && value && !disabled && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 bg-transparent px-2 py-1 transition-all duration-200 dark:text-gray-500 dark:hover:text-blue-300"
              tabIndex={-1}
            >
              ×
            </button>
          )}
        </div>
        {/* Helper text */}
        {helperText && (
          <small className="block mt-1 text-gray-500 dark:text-gray-400 animate-fade-in">{helperText}</small>
        )}
        {/* Error message */}
        {(invalid && errorMessage) || localError ? (
          <span className="block mt-1 text-red-600 text-sm animate-shake dark:text-red-400">
            {localError || errorMessage}
          </span>
        ) : null}
      </div>
      <style>
        {`
          .animate-fade-in {
            animation: fadeInInput 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }
          @keyframes fadeInInput {
            from { opacity: 0; transform: translateY(10px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-dark-bg {
            animation: darkBgMove 4s linear infinite alternate;
          }
          @keyframes darkBgMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default InputField;

