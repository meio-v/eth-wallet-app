# Streak Tracker App

This is a **Streak Tracker** application built using [Next.js](https://nextjs.org) and [NestJS](https://nestjs.com). The app helps users visualize their activity streaks with a clean and responsive UI. It includes a backend service to calculate streaks based on user activity data, which is integrated with a front-end dashboard for a seamless user experience.

## Features

- **Dynamic Streak Visualization**: A hero section with interactive icons representing user streaks across the week.
- **Case Switching**: Dynamically switch between different cases (`Success`, `Ongoing`, `Fail`) to analyze streak states.
- **Backend Integration**: A powerful backend built with **NestJS** to process streak logic and return user activity data.
- **State Indicators**: Tracks `COMPLETED`, `INCOMPLETE`, `AT_RISK`, and `SAVED` states for each day in the streak.
- **Responsive Design**: Optimized for both desktop and mobile viewing, built with **TailwindCSS**.
- **Smooth Animations**: Beautiful animations when switching streak cases or re-rendering components.

## Getting Started

Follow these steps to run the development environment:

### Prerequisites
- [Node.js](https://nodejs.org) (v18 or later recommended)
- [npm](https://npmjs.com) or any package manager of your choice (e.g., Yarn, PNPM, Bun)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd streak-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start both the back and frontend services via Turbo:
   ```bash
   npm run dev
   ```

### Access the App

- Frontend: Open [http://localhost:3000](http://localhost:3000)
- Backend: API available at [http://localhost:4000](http://localhost:4000)

### Folder Structure

The monorepo is powered by TurboRepo. The structure is as follows:
```
.
├── apps/
│   ├── backend/     # NestJS backend service
│   ├── frontend/    # Next.js frontend application
├── packages/        # Shared utilities, types, and configurations
├── public/          # Static assets and icons
└── turbo.json       # TurboRepo configuration
```

## Backend Overview

The backend provides a `GET /streaks/:case` endpoint, where `:case` can be `1` (Success), `2` (Ongoing), or `3` (Fail). It returns the streak data based on pre-defined user activity:

- Example Response:
```json
{
  "total": 3,
  "days": [
    { "date": "2024-02-26", "activities": 3, "state": "COMPLETED" },
    { "date": "2024-02-25", "activities": 0, "state": "AT_RISK" },
    { "date": "2024-02-24", "activities": 1, "state": "SAVED" }
  ]
}
```

## Frontend Overview

The frontend consists of:
- **Hero Component**: Displays total streak count and icons for each day.
- **Case Selector**: Lets users switch between cases (`Success`, `Ongoing`, `Fail`).
- **Dynamic Animations**: Smooth fade-in/out and wipe animations for seamless UX.

### Key Pages
- `/`: Redirects to the default streak case (`/streaks/1`).
- `/streaks/[case]`: Displays the streak data for a given case.

### Technologies Used
- [React](https://reactjs.org)
- [Next.js](https://nextjs.org)
- [TailwindCSS](https://tailwindcss.com)

## How It Works

- **Backend**: The NestJS backend evaluates streak data based on user activities and streak rules:
    - `COMPLETED`: At least 1 activity exists for the day.
    - `INCOMPLETE`: No activity exists or insufficient activities on the current day.
    - `AT_RISK`: A streak is at risk if there’s inactivity after a `COMPLETED` day.
    - `SAVED`: A streak is saved if sufficient activities occur after an `AT_RISK` day.
- **Frontend**: Visualizes the streak data using responsive components and animations.

## Deployment

To deploy the application, use the [Vercel Platform](https://vercel.com) for the frontend and any Node.js-compatible hosting (e.g., AWS, Render) for the backend.

### Frontend Deployment

1. Push the repository to a GitHub/GitLab repository.
2. Link the repository on Vercel.
3. Configure environment variables (if any).
4. Deploy with the build command:
   ```bash
   npm run build
   ```

### Backend Deployment

1. Deploy the NestJS app to a Node.js hosting provider.
2. Ensure the `CORS` settings allow requests from the frontend domain.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)