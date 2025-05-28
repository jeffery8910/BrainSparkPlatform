import React from 'react';
import SpotTheTargetGame from '../components/games/SpotTheTargetGame';
import Card from '../components/ui/Card';

const AttentionGamePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">找出目標挑戰</h1>
        <p className="text-lg text-slate-600">測試您的視覺注意力和反應時間！</p>
      </header>
      
      <Card className="max-w-2xl mx-auto">
        <SpotTheTargetGame />
      </Card>

      <Card className="max-w-2xl mx-auto bg-indigo-50 p-6">
        <h2 className="text-xl font-semibold text-indigo-700 mb-3">遊戲玩法</h2>
        <ul className="list-disc list-inside text-slate-600 space-y-1">
          <li>螢幕上會顯示一個彩色方塊網格。</li>
          <li>您的目標是盡快找到並點擊<strong className="text-red-600">目標紅色方塊</strong>。</li>
          <li>每次正確點擊都會為您贏得積分並進入下一級別。</li>
          <li>隨著網格變大和時間減少，遊戲會變得更難。</li>
          <li>爭取獲得最高分！</li>
        </ul>
      </Card>
    </div>
  );
};

export default AttentionGamePage;