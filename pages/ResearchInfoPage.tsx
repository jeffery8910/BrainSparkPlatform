import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { RESEARCH_TOPICS } from '../constants';
import { ResearchTopic } from '../types';
import { fetchGeminiExplanation } from '../services/geminiService';

interface ExplanationState {
  [topicId: string]: {
    isLoading: boolean;
    content: string | null;
    error: string | null;
  };
}

const ResearchInfoPage: React.FC = () => {
  const [explanations, setExplanations] = useState<ExplanationState>({});
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const toggleExplanation = async (topic: ResearchTopic) => {
    if (expandedTopic === topic.id) {
      setExpandedTopic(null); // Collapse if already expanded
      return;
    }

    setExpandedTopic(topic.id); // Expand

    if (explanations[topic.id]?.content || explanations[topic.id]?.isLoading || explanations[topic.id]?.error) {
      // Already loaded, loading, or has an error, just ensure it's expanded
      return;
    }

    setExplanations(prev => ({
      ...prev,
      [topic.id]: { isLoading: true, content: null, error: null }
    }));

    try {
      const content = await fetchGeminiExplanation(topic.geminiPrompt);
      setExplanations(prev => ({
        ...prev,
        [topic.id]: { isLoading: false, content, error: null }
      }));
    } catch (err) {
      console.error("Failed to fetch explanation:", err);
      const errorMessage = err instanceof Error ? err.message : '發生未知錯誤。';
      setExplanations(prev => ({
        ...prev,
        [topic.id]: { isLoading: false, content: null, error: `載入失敗：${errorMessage}。請確保您的 API 金鑰已設定。` }
      }));
    }
  };

  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-sky-600 mb-2">神經科學洞見</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          探索大腦科學中有關注意力和學習的關鍵概念，由 AI 輔助解釋。
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESEARCH_TOPICS.map((topic) => {
          const topicState = explanations[topic.id];
          const isExpanded = expandedTopic === topic.id;
          
          let buttonText = '了解更多';
          if (topicState?.isLoading) {
            buttonText = '載入中...';
          } else if (isExpanded) {
            if(topicState?.content || topicState?.error) {
              buttonText = '隱藏';
            }
          } else if (topicState?.content || topicState?.error) {
            buttonText = '顯示解釋';
          }

          return (
            <Card key={topic.id} className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-sky-700 mb-2">{topic.title}</h2>
                {topic.brief && <p className="text-slate-500 mb-3 text-sm">{topic.brief}</p>}
                
                {isExpanded && (
                  <div className="mt-4 p-3 bg-sky-50 rounded-md border border-sky-200 min-h-[100px]">
                    {topicState?.isLoading && <p className="text-slate-500 animate-pulse">正在載入解釋...</p>}
                    {topicState?.error && <p className="text-red-500 text-sm">{topicState.error}</p>}
                    {topicState?.content && (
                      <p className="text-slate-600 whitespace-pre-wrap text-sm leading-relaxed">{topicState.content}</p>
                    )}
                  </div>
                )}
              </div>
              <Button 
                onClick={() => toggleExplanation(topic)} 
                variant="ghost" 
                className="mt-4 self-start text-sky-600 hover:bg-sky-100"
                disabled={topicState?.isLoading}
                aria-expanded={isExpanded}
                aria-controls={`explanation-${topic.id}`}
              >
                {buttonText}
              </Button>
            </Card>
          );
        })}
      </div>
       <Card className="bg-sky-50 p-6 mt-10">
        <h3 className="text-lg font-semibold text-sky-700 mb-2">關於這些解釋</h3>
        <p className="text-sm text-slate-600">
          此處提供的解釋由 Google 的 Gemini 模型生成。雖然 AI 可以提供有用的摘要，但如需深入且經過驗證的資訊，請務必查閱學術資源。如果您遇到錯誤，可能是 API 金鑰問題或網路問題所致。
        </p>
      </Card>
    </div>
  );
};

export default ResearchInfoPage;