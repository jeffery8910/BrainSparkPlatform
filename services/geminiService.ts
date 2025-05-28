import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_TEXT_MODEL } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn(
    "環境變數中找不到 Gemini 的 API_KEY。AI 功能將無法運作。"
  );
}

const ai = new GoogleGenAI({ apiKey: API_KEY || "FALLBACK_KEY_IF_YOU_MUST_BUT_WARN" }); // Fallback to prevent crash if API_KEY is undefined, but functionality will fail.

export const fetchGeminiExplanation = async (promptText: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API 金鑰未設定。請設定 API_KEY 環境變數。");
  }
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_TEXT_MODEL,
      contents: promptText,
      // No thinkingConfig for general explanations, let it default for higher quality.
    });
    
    // Direct access to text as per guidance
    const text = response.text;

    if (typeof text !== 'string') {
        console.error("從 AI 收到未預期的回應格式:", response);
        throw new Error("從 AI 收到未預期的回應格式。");
    }
    return text.trim();

  } catch (error) {
    console.error("從 Gemini 獲取解釋時發生錯誤:", error);
    if (error instanceof Error) {
        // Check for specific error messages that might indicate API key issues
        if (error.message.includes("API key not valid")) {
            throw new Error("無效的 Gemini API 金鑰。請檢查您的設定。");
        }
        if (error.message.includes("Quota exceeded")) {
            throw new Error("已超過 Gemini API 配額。請檢查您的用量或帳單。");
        }
    }
    throw new Error(`無法從 AI 獲取解釋。 ${error instanceof Error ? error.message : '未知錯誤'}`);
  }
};