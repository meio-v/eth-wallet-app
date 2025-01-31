# Eth Wallet - Technical Test

This is a **Eth Wallet - Technical Test** application built using [Next.js](https://nextjs.org) and [NestJS](https://nestjs.com). 


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

The backend provides a `GET /eth-info/:address` endpoint, where `:address` is an ethereum address


## Frontend Overview

The frontend consists of:
- **Balance Component**
- **TransactionHistoryComponent**

### Technologies Used
- [React](https://reactjs.org)
- [Next.js](https://nextjs.org)
- [TailwindCSS](https://tailwindcss.com)

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