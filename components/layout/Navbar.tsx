import React from 'react';
import { NavLink } from 'react-router-dom';
import { NavItem } from '../../types';
import { APP_ROUTES, APP_NAME } from '../../constants';
import HomeIcon from '../icons/HomeIcon';
import AttentionIcon from '../icons/AttentionIcon';
import LearningIcon from '../icons/LearningIcon';
import ResearchIcon from '../icons/ResearchIcon';

const Navbar: React.FC = () => {
  const navItems: NavItem[] = [
    { path: APP_ROUTES.HOME, name: '首頁', icon: <HomeIcon className="w-5 h-5" /> },
    { path: APP_ROUTES.ATTENTION_GAME, name: '專注力遊戲', icon: <AttentionIcon className="w-5 h-5" /> },
    { path: APP_ROUTES.LEARNING_GAME, name: '學習遊戲', icon: <LearningIcon className="w-5 h-5" /> },
    { path: APP_ROUTES.RESEARCH_INFO, name: '科研洞察', icon: <ResearchIcon className="w-5 h-5" /> },
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to={APP_ROUTES.HOME} className="flex items-center space-x-2 text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
             {/* Placeholder for a logo if available, e.g., a brain icon */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-indigo-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M15.75 3v1.5m0 16.5v-1.5" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6c0-1.504-.563-2.871-1.514-3.964M12 18.75c-3.212 0-5.774-2.37-5.991-5.414A6.01 6.01 0 0112 7.5c1.605 0 3.072.646 4.11 1.706" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75c-.052 0-.105-.001-.158-.002A5.984 5.984 0 016.15 13.5H6a6 6 0 015.842-5.998C11.895 7.501 11.948 7.5 12 7.5c.052 0 .105.001.158.002A5.984 5.984 0 0117.85 12h.009a6 6 0 01-5.842 5.998C12.105 18.749 12.052 18.75 12 18.75zM12 7.5V6M10.05 5.55L9 4.5m4.95.95l1.05-1.05M12 16.5a.75.75 0 01-.75-.75V12a.75.75 0 011.5 0v3.75a.75.75 0 01-.75-.75z" />
            </svg>
            <span>{APP_NAME}</span>
          </NavLink>
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                  }`
                }
              >
                {item.icon}
                <span className="ml-2">{item.name}</span>
              </NavLink>
            ))}
          </div>
          {/* Mobile menu button can be added here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;