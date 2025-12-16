# Development Rules

This document describes the rules and development standards for the Whispr Frontend project.

## 📋 Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [TypeScript](#typescript)
- [ESLint & Code Style](#eslint--code-style)
- [Internationalization (i18n)](#internationalization-i18n)
- [Package Management](#package-management)
- [Git Workflow](#git-workflow)
- [Component Development](#component-development)
- [Styling](#styling)

---

## Technology Stack

### Core Technologies

- **Next.js**: `^15.2.4` - React framework with App Router
- **React**: `19.0.0` - UI Library
- **TypeScript**: `^5.8.2` - Type safety
- **Tailwind CSS**: `^4.0.17` - Utility-first CSS framework

### Key Libraries

- **next-intl**: `^4.0.2` - Internationalization
- **@t3-oss/env-nextjs**: `^0.11.1` - Type-safe environment variables
- **zod**: `^3.24.2` - Schema validation
- **clsx**: `^2.1.1` - Conditional class names
- **tailwind-merge**: `^3.1.0` - Merge Tailwind classes
- **class-variance-authority**: `^0.7.1` - Component variants

### Development Tools

- **ESLint**: `^9.17.0` with `@antfu/eslint-config`
- **Storybook**: `^8.4.7` - Component development & testing
- **Husky**: `^9.1.7` - Git hooks
- **lint-staged**: `^15.2.11` - Lint staged files

---

## Project Structure

### Organization Rules

```
/
├── src/
│   ├── app/
│   │   └── [locale]/          # App Router with i18n routing
│   │       ├── layout.tsx      # Root layout
│   │       ├── page.tsx        # Home page
│   │       └── loading.tsx     # Loading UI
│   ├── components/             # Reusable components
│   │   └── ComponentName/
│   │       ├── index.ts        # Export file
│   │       ├── ComponentName.tsx
│   │       └── ComponentName.stories.ts
│   ├── i18n/                   # i18n configuration
│   │   ├── i18n.ts
│   │   └── i18nNavigation.ts
│   ├── lib/                    # Utilities & helpers
│   │   ├── env.mjs            # Environment variables
│   │   └── utils.ts           # Utility functions
│   ├── styles/                 # Global styles
│   │   └── globals.css
│   └── middleware.ts           # Next.js middleware
├── messages/                   # Translation files
│   ├── en.json
│   └── ja.json
├── public/                     # Static assets
└── workflows/                  # GitHub Actions
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Files**:
  - Components: PascalCase
  - Utilities: camelCase (e.g., `utils.ts`)
  - Config: camelCase or kebab-case (e.g., `env.mjs`, `next.config.mjs`)
- **Folders**:
  - Components: PascalCase (e.g., `UserProfile/`)
  - Others: camelCase or kebab-case

### Path Aliases

Use path aliases for imports:

```typescript
// ✅ Good
import { cn } from '@/lib/utils';
import { env } from '@/lib/env.mjs';
import Loading from '@/app/[locale]/loading';

// ❌ Bad
import { cn } from '../../lib/utils';
```

Aliases are defined in `tsconfig.json`:
- `@/*` → `./src/*`
- `@/public/*` → `./public/*`

---

## TypeScript

### Configuration

- **Strict Mode**: All strict checks enabled
- **Target**: ES6
- **Module**: ESNext with Bundler resolution

### Type Rules

1. **Use `type` instead of `interface`** (according to ESLint rule)

```typescript
// ✅ Good
type User = {
  id: string;
  name: string;
};

// ❌ Bad
interface User {
  id: string;
  name: string;
}
```

2. **Strict null checks**: Always handle `undefined` and `null`

```typescript
// ✅ Good
const value = array[0];
if (value) {
  // Use value
}

// ❌ Bad
const value = array[0]; // Type: T | undefined
value.someMethod(); // Error: Object is possibly 'undefined'
```

3. **No unused variables**: Remove or prefix with `_` if needed to keep

```typescript
// ✅ Good
const [_unused, used] = array;

// ❌ Bad
const unused = array[0]; // Error: unused variable
```

### Type Safety Rules

- `noUncheckedIndexedAccess`: Enabled - array access returns `T | undefined`
- `noImplicitReturns`: Enabled - functions must have explicit return statements
- `noUnusedLocals`: Enabled - no unused local variables allowed
- `noUnusedParameters`: Enabled - no unused parameters allowed

---

## ESLint & Code Style

### Configuration

The project uses `@antfu/eslint-config` with customizations:

- React support
- TypeScript support
- Stylistic formatting (semicolons: true)
- CSS formatting

### Important Rules

1. **Brace Style**: 1tbs (One True Brace Style)

```typescript
// ✅ Good
if (condition) {
  // code
}

// ❌ Bad
if (condition)
{
  // code
}
```

2. **Semicolons**: Required

```typescript
// ✅ Good
const value = 'test';

// ❌ Bad
const value = 'test'
```

3. **Type Definitions**: Use `type` instead of `interface`

4. **Top-level await**: Allowed (rule: `antfu/no-top-level-await: off`)

### Running Linter

```bash
# Check errors
npm run lint

# Auto fix
npm run lint:fix

# Check types
npm run check-types
```

### Pre-commit Hooks

Husky + lint-staged automatically run:
- ESLint fix on staged files
- TypeScript type checking

---

## Internationalization (i18n)

### Configuration

- **Library**: next-intl
- **Locales**: `en` (default), `ja`
- **Routing**: Locale-based routing with `[locale]` segment

### Structure

1. **Routing config**: `src/i18n/i18nNavigation.ts`

```typescript
export const routing = defineRouting({
  locales: ['en', 'ja'],
  defaultLocale: 'en',
});
```

2. **Messages**: Stored in `messages/` folder
   - `messages/en.json`
   - `messages/ja.json`

3. **Middleware**: `src/middleware.ts` - handles locale routing

### Usage

```typescript
// Server Component
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('Namespace');
  return <h1>{t('key')}</h1>;
}

// Client Component
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('Namespace');
  return <h1>{t('key')}</h1>;
}

// Navigation
import { Link, useRouter } from '@/i18n/i18nNavigation';

export default function Nav() {
  const router = useRouter();
  return <Link href="/about">About</Link>;
}
```

### Adding New Locale

1. Add locale to `src/i18n/i18nNavigation.ts`:

```typescript
export const routing = defineRouting({
  locales: ['en', 'ja', 'vi'], // Add 'vi'
  defaultLocale: 'en',
});
```

2. Create translation file: `messages/vi.json`

3. Restart dev server

---

## Package Management

### Version Management

- **Node.js**: Use version recommended by Next.js 15
- **Package versions**:
  - Use `^` (caret) for minor updates
  - Don't use `~` or exact versions unless necessary
  - Check breaking changes before updating major version

### Installing Packages

```bash
# Production dependency
npm install package-name

# Development dependency
npm install -D package-name
```

### Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run check-types` - TypeScript type checking
- `npm run storybook` - Start Storybook
- `npm run build-storybook` - Build Storybook

---

## Git Workflow

### Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Example:
```
feat(auth): add login functionality

Implement user authentication with JWT tokens
```

### Pre-commit

Automatically runs:
- ESLint fix
- TypeScript type checking

Do not commit if there are errors.

### Branch Naming

- `feature/feature-name` - New features
- `fix/bug-description` - Bug fixes
- `refactor/component-name` - Refactoring
- `docs/topic` - Documentation

---

## Component Development

### Component Structure

Each component should have:

```
ComponentName/
├── index.ts                    # Export
├── ComponentName.tsx           # Component
└── ComponentName.stories.ts    # Storybook stories
```

### Component Rules

1. **Default export** for main component
2. **Named export** for types and utilities
3. **TypeScript**: Always define props type

```typescript
// ✅ Good
type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
};

export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

4. **Server vs Client Components**:
   - Default is Server Component
   - Add `'use client'` directive if client-side features needed

### Storybook

Each component should have Storybook stories to:
- Document component API
- Test different states
- Visual regression testing

---

## Styling

### Tailwind CSS

- **Version**: 4.0.17
- **Config**: Use PostCSS with `@tailwindcss/postcss`
- **Utility classes**: Prefer utility classes

### Class Merging

Use `cn` utility from `@/lib/utils`:

```typescript
import { cn } from '@/lib/utils';

// ✅ Good
<div className={cn('px-2 py-1', isActive && 'bg-blue-500')} />

// ❌ Bad
<div className={`px-2 py-1 ${isActive ? 'bg-blue-500' : ''}`} />
```

### CVA (Class Variance Authority)

Use CVA for component variants:

```typescript
import { cva } from 'class-variance-authority';

const buttonVariants = cva('base-classes', {
  variants: {
    variant: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
    },
  },
});
```

### Global Styles

- Define in `src/styles/globals.css`
- Import in root layout

---

## Environment Variables

### T3 Env

Use `@t3-oss/env-nextjs` for type-safe environment variables.

### Configuration

File: `src/lib/env.mjs`

```typescript
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    SECRET_KEY: z.string(),
  },
  client: {
    NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: {
    SECRET_KEY: process.env.SECRET_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
```

### Usage

```typescript
import { env } from '@/lib/env.mjs';

// Type-safe access
const apiUrl = env.NEXT_PUBLIC_API_URL;
```

### Rules

- Server variables: No prefix
- Client variables: Prefix with `NEXT_PUBLIC_`
- Validation: All variables must be validated with Zod

---

## Best Practices

### General

1. **Code Quality**: Always run linter and type checker before commit
2. **Performance**: Use Next.js optimizations (Image, Link, etc.)
3. **Accessibility**: Follow a11y rules (ESLint jsx-a11y plugin)
4. **Error Handling**: Handle errors gracefully
5. **Loading States**: Always have loading states for async operations

### Next.js Specific

1. **App Router**: Use App Router patterns
2. **Server Components**: Prefer Server Components when possible
3. **Metadata**: Use `generateMetadata` for SEO
4. **Static Generation**: Use `generateStaticParams` when possible

### TypeScript

1. **Type Inference**: Let TypeScript infer types when possible
2. **Explicit Types**: Only define types when necessary
3. **Type Guards**: Use type guards for runtime checks
4. **Avoid `any`**: Don't use `any`, use `unknown` if needed

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [next-intl Documentation](https://next-intl-docs.vercel.app/)
- [ESLint Rules](https://eslint.org/docs/rules/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Note**: This document will be updated as the project evolves. Please refer to it regularly to ensure compliance with the latest rules.

