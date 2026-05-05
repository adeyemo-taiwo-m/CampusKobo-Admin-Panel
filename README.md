# CampusKobo Admin Panel 🌿

[![Tech Stack](https://img.shields.io/badge/Stack-React%20|%20TypeScript%20|%20Vite%20|%20Supabase-1A9E3F)](https://campuskobo.com)
[![Design](https://img.shields.io/badge/Design-Fintech%20Minimalist-22C55E)](https://campuskobo.com)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen)](https://github.com/adeyemo-taiwo-m/CampusKobo-Admin-Panel)

The **CampusKobo Admin Panel** is a professional content management system designed for the **Bureau of Finance (BOF), Obafemi Awolowo University (OAU)**. It empowers editors to manage all learning resources (Articles, Videos, Podcasts, and Glossary) that appear in the CampusKobo student mobile application.

---

## ✨ Key Features

- **📊 Dynamic Dashboard**: Real-time overview of content statistics and recent editorial activity.
- **📝 Content Management**: Full CRUD operations for all media types with rich metadata support (Takeaways, Duration, Featured status).
- **📂 Categorization**: Manage learning categories with automated slug generation and mobile-friendly icon mapping.
- **📖 Financial Glossary**: A central repository for financial terms including a "Term of the Day" starring feature.
- **🛡️ Secure Authentication**: Role-based access controlled via Supabase Auth and Protected Routes.
- **📱 Fully Responsive**: A premium "Notion-meets-Linear" interface that works seamlessly on desktop and mobile.

---

## 🚀 Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: [TanStack Query v5](https://tanstack.com/query/latest) (React Query)
- **Backend/DB**: [Supabase](https://supabase.com/) (Auth, PostgreSQL, RLS)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: Radix UI Primitives + Custom Design System

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm / pnpm / yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adeyemo-taiwo-m/CampusKobo-Admin-Panel.git
   cd CampusKobo-Web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure

```text
src/
├── components/     # Reusable UI primitives & Layout components
├── context/        # Auth & Global state providers
├── hooks/          # Custom TanStack Query hooks (API layer)
├── lib/            # Utilities & Supabase client config
├── pages/          # Primary view components (Dashboard, Content, etc.)
├── types/          # Global TypeScript interfaces
└── App.tsx         # Routing & Provider configuration
```

---

## 🎨 Design System

The app follows the **Fintech-Minimalist** style guide:
- **Primary Color**: `#1A9E3F` (CampusKobo Green)
- **Typography**: `Poppins` (UI/Body) & `DM Serif Display` (Headings)
- **Aesthetic**: Confident whitespace, sharp borders (max `8px` radius), and subtle glassmorphism effects.

---

## ⚖️ Security & RLS

Data security is enforced via **Supabase Row Level Security (RLS)**. Ensure that policies are enabled for the `authenticated` role to allow editors to perform CRUD operations.

```sql
-- Example Policy for Glossary
CREATE POLICY "Enable all for authenticated users" ON "public"."glossary_terms"
AS PERMISSIVE FOR ALL TO authenticated USING (true) WITH CHECK (true);
```

---

## 📄 License

Internal tool for **BOF OAU**. All rights reserved.

---

*Built with ❤️ by the CampusKobo Engineering Team.*
