# React Components Demo

This project is a modern React + TypeScript codebase built with Vite and Tailwind CSS.  
It demonstrates reusable, flexible UI components with dark/light theme support, 3D effects, and interactive features.

## Features

- **InputField Component**
  - Text, email, and password input types
  - Label, placeholder, helper text, error message
  - Validation for email and password
  - States: disabled, invalid, loading
  - Variants: filled, outlined, ghost
  - Sizes: small, medium, large
  - Optional: clear button, password toggle
  - Light & dark theme support
  - 3D effect and animated background in dark mode

- **DataTable Component**
  - Displays tabular data with sample entries
  - Column sorting
  - Row selection (single/multiple)
  - Loading and empty states
  - Responsive, visually impactful, 3D look in dark mode
  - Animated backgrounds

- **Navbar**
  - Responsive app bar
  - Switch between InputField and DataTable views
  - Dark/light theme toggle

## Getting Started

1. **Install dependencies**
   ```
   npm install
   ```

2. **Start the development server**
   ```
   npm run dev
   ```

3. **Open your browser**
   Live link: https://react-components-ecru.vercel.app/

## Project Structure

```
src/
  components/
    InputField/
      InputField.tsx
      types.ts
    DataTable/
      DataTable.tsx
      types.ts
    Navbar/
      Navbar.tsx
  App.tsx
  main.tsx
  index.css
```

## Customization

- **Tailwind CSS** is used for all styling.  
  You can adjust colors, shadows, and animations in `index.css` or Tailwind config.
- **Dark mode** is toggled via the Navbar and applies to all components.

## License

MIT
