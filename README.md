# Whispr - Modern Real-time Messaging Platform

🚀 **Whispr** is a modern, real-time messaging platform built with cutting-edge web technologies. Experience seamless communication with features like instant messaging, group chats, file sharing, and voice messages. Built with Next.js 15, TypeScript, and Tailwind CSS for optimal performance and developer experience.

Connect with friends, family, and colleagues through a beautiful, intuitive interface that works across all devices. Whispr brings people together with fast, secure, and reliable messaging capabilities.

## ✨ Features

Whispr comes packed with powerful messaging features and modern development tools:

### 💬 Core Messaging Features
- **Real-time Messaging** - Instant message delivery with WebSocket connections
- **Group Chats** - Create and manage group conversations with multiple participants
- **Direct Messages** - Private one-on-one conversations
- **File Sharing** - Share images, documents, and media files seamlessly
- **Voice Messages** - Record and send voice messages
- **Message Reactions** - Express yourself with emoji reactions
- **Message Search** - Find conversations and messages quickly
- **Online Status** - See when contacts are online and available

### 🛠️ Development & Technical Features
- 🏎️ **[Next.js 15](https://nextjs.org)** - Latest App Router for optimal performance
- 💎 **[TypeScript](https://www.typescriptlang.org)** - Enhanced with `ts-reset` for unparalleled type safety
- 💅 **[Tailwind CSS](https://tailwindcss.com)** - Utility-first CSS framework for rapid UI development
- 🪡 **[Tailwind Merge](https://github.com/dcastil/tailwind-merge)** - Efficient class merging utilities
- 🧶 **[clsx](https://github.com/lukeed/clsx)** - Conditional class name utilities
- 💥 **[CVA](http://cva.style/)** - Component variants for consistent design systems
- 🌍 **Internationalization** - Multi-language support with next-intl
- 🔐 **Type-safe Environment Variables** - T3 Env for secure configuration
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Component Library** - Reusable UI components with Storybook

## 🚀 Getting Started

Get Whispr up and running in your local environment with these simple steps:

### Prerequisites

- **Node.js** 18+ (recommended version in `.node-version`)
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/hoangngxn/whispr-frontend.git
cd whispr-frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up environment variables:**

Copy the example environment file and configure your variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

4. **Start the development server:**

```bash
npm run dev
```

5. **Open your browser:**

Navigate to [http://localhost:3000](http://localhost:3000) to see Whispr in action!

### 🏗️ Backend Setup

Whispr requires a backend API. Make sure to set up the companion backend service:

- [Whispr Backend](https://github.com/your-username/whispr-backend) - REST API and WebSocket server

## 🎨 Design System & UI Components

Whispr features a modern, accessible design system built with Tailwind CSS and CVA (Class Variance Authority) for consistent, scalable UI components.

### Component Architecture

Whispr uses a component-based architecture with reusable UI elements:

- **Message Bubbles** - Clean, readable message display
- **Chat Lists** - Organized conversation navigation
- **User Avatars** - Profile picture management
- **Status Indicators** - Online/offline status display
- **Input Components** - Message composition with emoji support
- **Media Previews** - Image, video, and file previews

### Design Principles

- **Minimalist Interface** - Clean, distraction-free messaging experience
- **Dark/Light Mode** - Automatic theme switching based on user preferences
- **Responsive Layout** - Optimized for desktop, tablet, and mobile devices
- **Accessibility First** - WCAG compliant with keyboard navigation and screen reader support
- **Performance Optimized** - Fast rendering with lazy loading and virtualization

### Utility Functions

Whispr includes powerful utility functions for class management:

#### Class Merging with `cn()`

```ts
import { cn } from '@/lib/utils';

// Conditional styling made easy
<div className={cn(
  'message-bubble',
  isOwnMessage && 'message-own',
  isTyping && 'message-typing'
)} />
```

#### Tailwind Class Merging

```ts
import { twMerge } from 'tailwind-merge';

twMerge('px-2 py-1 bg-blue-500', 'p-3 bg-red-500');
// → 'p-3 bg-red-500'
```

#### Conditional Classes with clsx

```ts
import clsx from 'clsx';

clsx('message', isActive && 'message-active', isRead && 'message-read');
// → 'message message-active message-read'
```

## 🔧 Configuration & Environment

### Environment Variables

Whispr uses [T3 Env](https://env.t3.gg/) for type-safe environment variable management. This ensures all configuration is validated at build time, preventing runtime errors.

#### Required Variables

Create a `.env.local` file in the project root:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_WS_URL=ws://localhost:3001

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# File Upload
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Database (if using direct connection)
DATABASE_URL=postgresql://username:password@localhost:5432/whispr

# Redis (for caching and sessions)
REDIS_URL=redis://localhost:6379

# Optional: Analytics
NEXT_PUBLIC_GA_ID=GA_MEASUREMENT_ID
```

#### Type-Safe Configuration

The configuration is defined in `src/lib/env.mjs`:

```ts
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NEXTAUTH_SECRET: z.string().min(32),
    CLOUDINARY_API_SECRET: z.string(),
    REDIS_URL: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_WS_URL: z.string().url(),
    NEXT_PUBLIC_GA_ID: z.string().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  },
});
```

Missing or invalid variables will show clear error messages during build.

## 🌍 Internationalization & Localization

Whispr supports multiple languages to provide a native experience for users worldwide. Using [next-intl](https://next-intl-docs.vercel.app/), all user-facing text is fully translatable.

### Supported Languages

Currently supported languages:
- **English (en)** - Default language
- **Japanese (ja)** - 日本語

### Message Translations

Common UI elements and messaging features are localized:

```json
// messages/en.json
{
  "Chat": {
    "newMessage": "New message",
    "sendMessage": "Send message",
    "typing": "is typing...",
    "online": "Online",
    "offline": "Offline"
  },
  "Settings": {
    "notifications": "Notifications",
    "privacy": "Privacy & Security",
    "language": "Language"
  }
}
```

### Adding New Languages

To add support for a new language:

1. **Create translation file:**
   ```
   messages/
   ├── en.json
   ├── ja.json
   └── es.json  # Spanish
   ```

2. **Update routing configuration:**
   ```ts
   // src/i18n/i18nNavigation.ts
   export const routing = defineRouting({
     locales: ['en', 'ja', 'es'], // Add new locale
     defaultLocale: 'en',
   });
   ```

3. **Configure pathnames** (if needed):
   ```ts
   export const pathnames = {
     '/': '/',
     '/settings': {
       en: '/settings',
       ja: '/設定',
       es: '/configuracion',
     },
   };
   ```

### Usage in Components

```tsx
// Server Components
import { getTranslations } from 'next-intl/server';

export default async function Chat() {
  const t = await getTranslations('Chat');
  return <h1>{t('newMessage')}</h1>;
}

// Client Components
import { useTranslations } from 'next-intl';

export function MessageInput() {
  const t = useTranslations('Chat');
  return <button type="button">{t('sendMessage')}</button>;
}
```

### Language Switching

Users can change their language preference in settings, with the choice persisted across sessions.

## 📁 Project Structure

```
whispr-frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   └── [locale]/
│   │       ├── (auth)/         # Authentication pages
│   │       ├── (chat)/         # Chat interface
│   │       └── (settings)/     # User settings
│   ├── components/             # Reusable UI components
│   │   ├── Chat/              # Chat-related components
│   │   ├── Message/           # Message components
│   │   ├── User/              # User profile components
│   │   └── ui/                # Base UI components
│   ├── lib/                   # Utilities and configurations
│   │   ├── hooks/             # Custom React hooks
│   │   ├── utils/             # Helper functions
│   │   └── validations/       # Form validations
│   ├── hooks/                 # React hooks for messaging
│   ├── stores/                # State management (Zustand)
│   └── types/                 # TypeScript type definitions
├── messages/                  # Internationalization files
├── public/                    # Static assets
└── styles/                    # Global styles and themes
```

## 🚀 Development Workflow

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run check-types      # TypeScript type checking

# Testing & Documentation
npm run storybook        # Start Storybook
npm run build-storybook  # Build Storybook
```

### Code Quality Standards

Whispr maintains high code quality with:
- **ESLint** for code linting
- **TypeScript** for type safety
- **Prettier** for code formatting
- **Husky** for Git hooks
- **lint-staged** for pre-commit checks

## 🤝 Contributing

We welcome contributions to Whispr! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated.

### How to Contribute

1. **Fork the repository** and create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Follow our coding standards:**
   - Use TypeScript for type safety
   - Follow the established component patterns
   - Write meaningful commit messages
   - Add tests for new features

3. **Test your changes:**
   ```bash
   npm run check-types
   npm run lint
   npm run build
   ```

4. **Submit a pull request** with a clear description of your changes.

### Development Guidelines

- 📖 Read our [Development Rules](./RULES.md) for detailed guidelines
- 🎨 Follow the established design system
- 🔧 Keep the codebase clean and well-documented
- 🧪 Test your changes thoroughly
- 📱 Ensure mobile responsiveness

### Areas for Contribution

- **UI/UX Improvements** - Enhance the user interface
- **Performance Optimization** - Improve loading times and responsiveness
- **New Features** - Add messaging capabilities
- **Internationalization** - Add support for new languages
- **Accessibility** - Improve WCAG compliance
- **Testing** - Add unit and integration tests

## 📄 License

Whispr is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) - The React framework for production
- Styled with [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- Internationalized with [next-intl](https://next-intl-docs.vercel.app/) - Internationalization for Next.js
- Icons from [Lucide React](https://lucide.dev/) - Beautiful & consistent icon toolkit

---

**Whispr** - Connecting people through seamless, real-time communication. 🌟
