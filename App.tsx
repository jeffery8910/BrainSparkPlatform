import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './pages/HomePage';
import AttentionGamePage from './pages/AttentionGamePage';
import LearningGamePage from './pages/LearningGamePage';
import ResearchInfoPage from './pages/ResearchInfoPage';
import { APP_ROUTES } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-100 via-sky-50 to-indigo-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Navigate replace to={APP_ROUTES.HOME} />} />
          <Route path={APP_ROUTES.HOME} element={<HomePage />} />
          <Route path={APP_ROUTES.ATTENTION_GAME} element={<AttentionGamePage />} />
          <Route path={APP_ROUTES.LEARNING_GAME} element={<LearningGamePage />} />
          <Route path={APP_ROUTES.RESEARCH_INFO} element={<ResearchInfoPage />} />
        </Routes>
      </main>
      <footer className="bg-slate-800 text-slate-300 text-center p-4 text-sm">
        © 2024 腦力火花。探索思維的奇蹟。
      </footer>
    </div>
  );
};

export default App;