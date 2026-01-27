# Song Learning Tracker 🎸🎼

A modern web application to track and manage your song learning progress, built with Nuxt 4, Quasar, and Supabase.

## 📋 Prerequisites

- **Node.js**: 20.19.0 LTS or higher
- **npm**: 10.8.2 or higher (comes with Node.js)

## 🚀 Tech Stack

- **Framework**: Nuxt 4.2.1
- **UI Library**: Quasar 2.18.6
- **Backend**: Supabase (@nuxtjs/supabase 2.0.2)
- **State Management**: Pinia 3.0.4
- **Build Tool**: Vite 7.2.6
- **Package Manager**: npm (standardized)

## 📦 Setup

Install dependencies:

```bash
npm install
```

> **Note**: This project uses **npm** as the package manager. Please do not use pnpm or yarn to avoid lock file conflicts.

## 🔧 Environment Configuration

Create your environment file `.env` (use `.env.example` as reference):

```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

Get your Supabase credentials from your [Supabase project dashboard](https://supabase.com/dashboard).

For more details, check the [Supabase API documentation](https://supabase.com/docs/guides/api).

## 💻 Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🏗️ Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

For deployment options, check the [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## 🧪 Testing

This project uses [Vitest](https://vitest.dev/) for unit testing.

### Run all tests

```bash
npm run test
```

### Run tests with UI

```bash
npm run test:ui
```

### Test file structure

- Test files should be named with `.test.ts` or `.test.js` and placed next to the code or inside `src/__tests__/`.
- Example: `src/utils/quasar.test.ts`

### Mocking

- Use [Vitest mocking utilities](https://vitest.dev/guide/mocking.html) to mock modules or dependencies as needed.

## 📚 Documentation

- [Validation Reports](/docs/validations/) - Historical validation and update reports
- [Nuxt Documentation](https://nuxt.com/docs)
- [Quasar Documentation](https://quasar.dev)
- [Supabase Documentation](https://supabase.com/docs)

## 🔄 Recent Updates

**Latest Update: December 6, 2025** ([Full Report](/docs/validations/VALIDACION_RESUMEN_2025-12-06.txt))
- Updated @nuxtjs/supabase to 2.0.3
- Standardized to npm as package manager
- Verified compatibility with Node 20 LTS
- All dependencies tested and working (0 vulnerabilities)

## 🛠️ Compatibility

| Component | Version | Status |
|-----------|---------|--------|
| Node.js | 20.19.0 LTS | ✅ Verified |
| npm | 10.8.2+ | ✅ Required |
| OS | Windows 11 | ✅ Tested |

## 📝 License

[Your License Here]

## 👥 Contributing

[Your Contributing Guidelines Here]
