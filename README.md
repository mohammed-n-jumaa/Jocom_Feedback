# JoCom Feedback System

A comprehensive feedback management system built with React, Vite, and modern web technologies.

## Features

- 🎯 **Multi-Department Feedback**: Separate feedback forms for Maintenance, Marketing, and Delivery departments
- 😊 **10-Level Rating System**: Unified rating system with emoji-based feedback (English 1-5, Arabic 6-10)
- 📊 **Advanced Analytics**: Real-time dashboard with charts and statistics
- 🌐 **Bilingual Support**: Full support for English and Arabic languages
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 🔐 **Role-Based Access**: Admin and User roles with different permissions
- 📈 **NPS Tracking**: Net Promoter Score calculation and tracking
- 💾 **Excel Export**: Export feedback data to Excel files
- 🌙 **Dark Mode**: Built-in dark mode support
- ⏱️ **Idle Timer**: Auto-reset after 1 minute of inactivity

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Routing**: React Router v6
- **Styling**: CSS Modules + Styled Components
- **Forms**: React Hook Form + Yup
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **Excel Export**: SheetJS (xlsx)

## Project Structure
jocom-feedback/
├── public/
jocom-feedback/
├── public/
│   └── logo.png
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   │       └── GlobalStyles.jsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   │   ├── Button.jsx
│   │   │   │   └── Button.module.css
│   │   │   ├── Input/
│   │   │   │   ├── Input.jsx
│   │   │   │   └── Input.module.css
│   │   │   ├── Modal/
│   │   │   │   ├── Modal.jsx
│   │   │   │   └── Modal.module.css
│   │   │   ├── Loader/
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── Loader.module.css
│   │   │   ├── Toast/
│   │   │   │   ├── ToastContainer.jsx
│   │   │   │   └── Toast.module.css
│   │   │   └── ProgressBar/
│   │   │       ├── ProgressBar.jsx
│   │   │       └── ProgressBar.module.css
│   │   ├── layout/
│   │   │   ├── AdminLayout/
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   ├── AdminLayout.module.css
│   │   │   │   ├── Sidebar/
│   │   │   │   │   ├── Sidebar.jsx
│   │   │   │   │   └── Sidebar.module.css
│   │   │   │   └── Header/
│   │   │   │       ├── Header.jsx
│   │   │   │       └── Header.module.css
│   │   │   └── UserLayout/
│   │   │       ├── UserLayout.jsx
│   │   │       └── UserLayout.module.css
│   │   ├── feedback/
│   │   │   ├── EmojiSelector/
│   │   │   │   ├── EmojiSelector.jsx
│   │   │   │   └── EmojiSelector.module.css
│   │   │   ├── QuestionForm/
│   │   │   │   ├── QuestionForm.jsx
│   │   │   │   └── QuestionForm.module.css
│   │   │   └── QuestionTypes/
│   │   │       ├── SingleChoice.jsx
│   │   │       ├── MultipleChoice.jsx
│   │   │       ├── ShortText.jsx
│   │   │       ├── LongText.jsx
│   │   │       ├── RangeSlider.jsx
│   │   │       ├── EmailInput.jsx
│   │   │       ├── PhoneInput.jsx
│   │   │       └── QuestionTypes.module.css
│   │   ├── dashboard/
│   │   │   ├── StatsCard/
│   │   │   │   ├── StatsCard.jsx
│   │   │   │   └── StatsCard.module.css
│   │   │   ├── Charts/
│   │   │   │   ├── RatingDistribution.jsx
│   │   │   │   ├── DailyResponses.jsx
│   │   │   │   ├── SatisfactionTrend.jsx
│   │   │   │   └── Charts.module.css
│   │   │   └── Filters/
│   │   │       ├── DepartmentFilter.jsx
│   │   │       ├── DateRangeFilter.jsx
│   │   │       └── Filters.module.css
│   │   ├── questions/
│   │   │   ├── QuestionManager/
│   │   │   │   ├── QuestionManager.jsx
│   │   │   │   └── QuestionManager.module.css
│   │   │   ├── AddQuestionModal/
│   │   │   │   ├── AddQuestionModal.jsx
│   │   │   │   └── AddQuestionModal.module.css
│   │   │   └── QuestionCard/
│   │   │       ├── QuestionCard.jsx
│   │   │       └── QuestionCard.module.css
│   │   ├── feedbacks/
│   │   │   ├── FeedbackTable/
│   │   │   │   ├── FeedbackTable.jsx
│   │   │   │   └── FeedbackTable.module.css
│   │   │   ├── FeedbackFilters/
│   │   │   │   ├── FeedbackFilters.jsx
│   │   │   │   └── FeedbackFilters.module.css
│   │   │   └── FeedbackDetails/
│   │   │       ├── FeedbackDetails.jsx
│   │   │       └── FeedbackDetails.module.css
│   │   └── users/
│   │       ├── UserTable/
│   │       │   ├── UserTable.jsx
│   │       │   └── UserTable.module.css
│   │       └── AddUserModal/
│   │           ├── AddUserModal.jsx
│   │           └── AddUserModal.module.css
│   ├── pages/
│   │   ├── user/
│   │   │   ├── Maintenance/
│   │   │   │   └── MaintenanceFeedback.jsx
│   │   │   ├── Marketing/
│   │   │   │   └── MarketingFeedback.jsx
│   │   │   ├── Delivery/
│   │   │   │   └── DeliveryFeedback.jsx
│   │   │   └── Login/
│   │   │       ├── Login.jsx
│   │   │       └── Login.module.css
│   │   └── admin/
│   │       ├── Dashboard/
│   │       │   ├── Dashboard.jsx
│   │       │   └── Dashboard.module.css
│   │       ├── DashboardDetails/
│   │       │   ├── DashboardDetails.jsx
│   │       │   └── DashboardDetails.module.css
│   │       ├── Questions/
│   │       │   ├── Questions.jsx
│   │       │   └── Questions.module.css
│   │       ├── Feedbacks/
│   │       │   ├── Feedbacks.jsx
│   │       │   └── Feedbacks.module.css
│   │       └── Users/
│   │           ├── Users.jsx
│   │           └── Users.module.css
│   ├── store/
│   │   ├── authStore.js
│   │   ├── themeStore.js
│   │   ├── feedbackStore.js
│   │   └── questionStore.js
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── feedbackService.js
│   │   ├── questionService.js
│   │   └── userService.js
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useFeedback.js
│   │   ├── useQuestions.js
│   │   └── useIdleTimer.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   └── exportToExcel.js
│   ├── routes/
│   │   ├── AppRoutes.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── PublicRoute.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── .gitignore
├── package.json
├── vite.config.js
└── README.md

# 1. إنشاء المشروع
npm create vite@latest jocom-feedback -- --template react
cd jocom-feedback

# 2. تثبيت المكتبات
npm install react-router-dom@6.26.1 @tanstack/react-query@5.56.2 zustand@4.5.5 axios@1.7.7 styled-components@6.1.13 framer-motion@11.5.4 react-icons@5.3.0 react-hook-form@7.53.0 yup@1.4.0 @hookform/resolvers@3.9.0 recharts@2.12.7 date-fns@3.6.0 react-hot-toast@2.4.1 xlsx@0.18.5 clsx@2.1.1

# 3. نسخ الملفات المذكورة أعلاه

# 4. تشغيل المشروع
npm run dev

# Core Dependencies
npm install react-router-dom@6.26.1
npm install @tanstack/react-query@5.56.2
npm install zustand@4.5.5
npm install axios@1.7.7

# UI & Styling
npm install styled-components@6.1.13
npm install framer-motion@11.5.4
npm install react-icons@5.3.0

# Forms & Validation
npm install react-hook-form@7.53.0
npm install yup@1.4.0
npm install @hookform/resolvers@3.9.0

# Charts & Analytics
npm install recharts@2.12.7
npm install date-fns@3.6.0

# Utilities
npm install react-hot-toast@2.4.1
npm install xlsx@0.18.5
npm install clsx@2.1.1# Jocom_Feedback
