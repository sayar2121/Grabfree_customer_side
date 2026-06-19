# GrabFree Customer App

GrabFree Customer App is a modern, responsive, and highly interactive e-commerce and promotional deals platform built with React and TypeScript. It features a rich, dynamic UI designed to deliver a premium user experience, complete with animations, dark mode support, and seamless multi-platform integrations.

## Tech Stack

This project is built using the following core technologies:

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS (v4) + Class Variance Authority + clsx + tailwind-merge
- **State Management**: Zustand (Global State) + React Query (Data Fetching/Caching)
- **UI Components**: Radix UI (Accessible headless primitives)
- **Animations**: Framer Motion
- **Icons**: Lucide React & React Icons
- **HTTP Client**: Axios
- **Utilities**: date-fns (Date formatting), Swiper (Carousels)

## Prerequisites

Make sure you have Node.js installed (version 18+ recommended).

## Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   cd Grabfree_customer_side
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Available Scripts

In the project directory, you can run:

### `npm run dev`
Runs the app in development mode using Vite. Open [http://localhost:5173](http://localhost:5173) to view it in the browser. The page will reload if you make edits.

### `npm run build`
Compiles TypeScript and builds the app for production to the `dist` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run preview`
Locally preview the production build after running `npm run build`.

### `npm run lint`
Runs ESLint to analyze the code and catch potential issues.

## Project Structure

```
src/
├── components/   # Reusable UI components (Buttons, Layouts, Radix primitives, etc.)
├── pages/        # Route components (Home, Sales, Deals of the Day, Contact, etc.)
├── services/     # API services and external integrations (e.g., newsletterService)
├── App.tsx       # Main Application entry point
├── App.css       # Global styles and Tailwind imports
└── main.tsx      # Vite entry point
```

## Key Features

- **Dynamic Promotional Pages**: Dedicated, visually stunning pages for "Deals of the Day", "June Sales", "Father's Day Offers", etc.
- **Premium Aesthetics**: Features smooth gradients, micro-animations, and responsive layouts tailored for both light and dark themes.
- **Advanced State Management**: Utilizes Zustand for lightweight client state and React Query for server state and caching.
- **Swipeable Carousels**: Integrated touch-friendly swipeable banners using Swiper.

## Development Guidelines

- **Components**: Follow the atomic design principle where applicable. Ensure components are reusable and utilize the predefined design system via Tailwind.
- **Styling**: Stick to the configured Tailwind theme and Radix UI primitives. Avoid adding excessive custom CSS files when utility classes suffice.
- **Routing**: Define all routes within the `AppRouter` configuration.

## License

This project is proprietary and confidential.
