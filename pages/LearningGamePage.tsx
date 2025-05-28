import React from 'react';
import SequenceMemoryGame from '../components/games/SequenceMemoryGame';
import Card from '../components/ui/Card';

const LearningGamePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-emerald-600 mb-2">序列記憶挑戰</h1>
        <p className="text-lg text-slate-600">測試並提高您的短期記憶力！</p>
      </header>
      
      <Card className="max-w-2xl mx-auto">
        <SequenceMemoryGame />
      </Card>

      <Card className="max-w-2xl mx-auto bg-emerald-50 p-6">
        <h2 className="text-xl font-semibold text-emerald-700 mb-3">遊戲玩法</h2>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>螢幕上會短暫閃現一個彩色方塊序列。</li>
          <li>請按正確順序記住該序列。</li>
          <li>序列消失後，請按相同順序點擊方塊。</li>
          <li>正確完成序列將帶您進入更長、更具挑戰性的序列。</li>
          <li>您的生命次數有限。祝您好運！</li>
        </ul>
      </Card>
    </div>
  );
};

export default LearningGamePage;