import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { APP_ROUTES } from '../constants';
import AttentionIcon from '../components/icons/AttentionIcon';
import LearningIcon from '../components/icons/LearningIcon';
import ResearchIcon from '../components/icons/ResearchIcon';

const HomePage: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="text-center py-12 bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-5xl font-extrabold text-indigo-600 mb-4">
          歡迎來到腦力火花！
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
          探索神經科學的迷人世界，透過我們的互動遊戲測試您的認知技能，並發現您的大腦是如何學習和集中注意力的。
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" onClick={() => window.location.hash = APP_ROUTES.ATTENTION_GAME}>
            玩專注力遊戲
          </Button>
          <Button size="lg" variant="secondary" onClick={() => window.location.hash = APP_ROUTES.RESEARCH_INFO}>
            探索科研成果
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <Link to={APP_ROUTES.ATTENTION_GAME} className="block group">
          <Card className="h-full group-hover:border-indigo-500 border-2 border-transparent">
            <div className="flex flex-col items-center text-center">
              <AttentionIcon className="w-16 h-16 text-indigo-500 mb-4" />
              <h2 className="text-2xl font-semibold text-slate-700 mb-2">專注力遊戲</h2>
              <p className="text-slate-500">
                透過旨在測試您注意力技能的引人入勝的挑戰，來提高您的焦點和注意力。
              </p>
            </div>
          </Card>
        </Link>

        <Link to={APP_ROUTES.LEARNING_GAME} className="block group">
          <Card className="h-full group-hover:border-emerald-500 border-2 border-transparent">
            <div className="flex flex-col items-center text-center">
              <LearningIcon className="w-16 h-16 text-emerald-500 mb-4" />
              <h2 className="text-2xl font-semibold text-slate-700 mb-2">學習挑戰</h2>
              <p className="text-slate-500">
                透過有趣的互動練習，提升您的記憶和學習能力。
              </p>
            </div>
          </Card>
        </Link>

        <Link to={APP_ROUTES.RESEARCH_INFO} className="block group">
         <Card className="h-full group-hover:border-sky-500 border-2 border-transparent">
            <div className="flex flex-col items-center text-center">
              <ResearchIcon className="w-16 h-16 text-sky-500 mb-4" />
              <h2 className="text-2xl font-semibold text-slate-700 mb-2">神經科學洞見</h2>
              <p className="text-slate-500">
                藉助人工智慧對關鍵概念的解釋，深入探究注意力和學習背後的科學。
              </p>
            </div>
          </Card>
        </Link>
      </section>
      
      <section className="text-center py-12">
        <h2 className="text-3xl font-bold text-slate-700 mb-6">準備好點燃您的思維火花了嗎？</h2>
        <p className="text-lg text-slate-600 max-w-xl mx-auto mb-8">
          今天就開始您的認知科學之旅吧。選擇一個遊戲或探索研究主題。
        </p>
      </section>
    </div>
  );
};

export default HomePage;