# Man Quran Mikhanam (من قرآن میخوانم)

A comprehensive Quran reading and study platform built with modern web technologies. This monorepo contains multiple applications for managing Quran verses, schedules, and user interactions.

✨ **This workspace is powered by [Yarn Workspaces](https://yarnpkg.com/features/workspaces)** ✨

## 📋 Project Overview

This platform provides:
- **Quran verse management** with Arabic text and Persian translations
- **Audio playback** for each verse
- **Reading schedules** and progress tracking
- **User authentication** and profile management
- **Administrative dashboard** for content management
- **Geographic organization** by provinces, counties, and units

## 🏗️ Architecture

### Applications

- **`apps/api`** - NestJS backend API server
  - Authentication & authorization
  - Verse and schedule management
  - User profile handling
  - Database operations with TypeORM

- **`apps/front-end`** - Next.js frontend application
  - User interface for reading Quran
  - Schedule tracking and progress
  - Audio playback functionality
  - Responsive design with Material-UI

- **`apps/admin`** - React admin dashboard
  - User management
  - Analytics and reporting
  - Content administration
  - Built with React Admin

- **`apps/static-api`** - Express.js static file server
  - Serves audio files
  - CORS configuration
  - Asset management

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Yarn package manager
- PostgreSQL database
- Environment variables configured

### Installation

```bash
# Install dependencies
yarn install

# Set up environment variables for each application
cp apps/api/.env.example apps/api/.env
cp apps/front-end/.env.example apps/front-end/.env
cp apps/static-api/.env.example apps/static-api/.env
cp apps/admin/.env.example apps/admin/.env

# Edit each .env file with your actual configuration values
```

### Running the Applications

#### Development Mode

```bash
# Start individual applications:
# Start the API server
yarn workspace api dev

# Start the frontend
yarn workspace frontend dev

# Start the static file server
yarn workspace static-api dev

# Start the admin dashboard (in a new terminal, as it doesn't have a dev script)
cd apps/admin && yarn dev
```

#### Production Mode

```bash
# Build applications that support build
yarn workspace frontend build
yarn workspace api build

# Start frontend in production
./start-frontend.sh

# Start individual services
yarn workspace api start
yarn workspace static-api start
```

## 🗄️ Database Setup

### Seeding the Database

```bash
# Navigate to API directory
cd apps/api

# Seed provinces and administrative divisions
yarn seed:province
yarn seed:units

# Seed Quran verses and translations
yarn seed:verses

# Upload audio files (if using cloud storage)
yarn seed:audio:liara
```

## 📁 Project Structure

```
apps/
├── api/              # NestJS backend
│   ├── src/
│   │   ├── auth/     # Authentication module
│   │   ├── verses/   # Quran verses management
│   │   ├── schedules/ # Reading schedules
│   │   ├── user/     # User management
│   │   └── assets/   # Quran text files and audio
├── front-end/        # Next.js frontend
│   ├── src/
│   │   ├── app/      # Next.js app router
│   │   ├── components/ # Reusable components
│   │   └── state/    # State management
├── admin/            # React admin dashboard
└── static-api/       # Static file server
    └── assets/audio/ # Audio files
```

## 🔧 Key Features

### Authentication & User Management
- JWT-based authentication
- Role-based access control
- User profiles with geographic information

### Quran Content Management
- Complete Quran text in Arabic (Uthmani script)
- Persian translations
- Audio recitation files
- Verse-by-verse navigation

### Reading Schedules
- Personalized reading schedules
- Progress tracking
- Daily reading cards
- Schedule completion status

### Audio Integration
- High-quality recitation audio
- Verse-by-verse playback
- Audio file management and serving

## 🛠️ Technologies Used

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeORM** - Database ORM
- **PostgreSQL** - Primary database
- **JWT** - Authentication tokens
- **AWS SDK** - Cloud storage integration

### Frontend
- **Next.js 14** - React framework with App Router
- **Material-UI** - Component library
- **Emotion** - CSS-in-JS styling
- **Axios** - HTTP client
- **React Hook Form** - Form management

### Admin Dashboard
- **React Admin** - Admin interface framework
- **Vite** - Build tool
- **TailwindCSS** - Utility-first CSS

### Infrastructure
- **Express.js** - Static file server
- **CORS** - Cross-origin resource sharing
- **PM2** - Process management

## 🌍 Environment Configuration

### Required Environment Variables

#### API (`apps/api/.env`)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/quran_db
JWT_SECRET=your-jwt-secret
ALLOWED_ORIGINS=http://localhost:4200,http://localhost:3000
STATIC_FILES_BASE_URL=http://localhost:3001/audio/
```

#### Frontend (`apps/front-end/.env.local`)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
NEXT_PUBLIC_IS_INTRANET_MODE=false
```

## 📱 PWA Support

The frontend application includes Progressive Web App (PWA) capabilities:
- Offline functionality
- App-like experience
- Service worker for caching
- Installable on mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Mahdi Hoseini**

---

*Built with ❤️*
