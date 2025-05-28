# 腦力火花 (BrainSpark) - 神經科學遊戲與洞見

[](https://opensource.org/licenses/MIT)

一個互動式網路應用程式，包含神經科學關於注意力和學習研究的遊戲與資訊，並透過 Google Gemini 的人工智慧洞見增強體驗。

**專案網址：** [https://github.com/jeffery8910/BrainSparkPlatform](https://github.com/jeffery8910/BrainSparkPlatform)

## ✨ 專案特色

  * **互動式認知遊戲**:
      * **找出目標挑戰 (Spot The Target)**: 一款測試視覺注意力和反應時間的遊戲，玩家需要在越來越複雜的網格中快速找出目標色塊。
      * **序列記憶挑戰 (Sequence Memory)**: 一款旨在訓練和提高短期工作記憶的遊戲，玩家需要記住並重現顏色序列。
  * **AI 驅動的神經科學洞見**:
      * 探索如「選擇性注意力」、「工作記憶」和「神經可塑性」等關鍵概念。
      * 點擊按鈕即可透過 Google Gemini API 獲取簡潔易懂的解釋。
  * **現代化的前端體驗**:
      * 使用 React 和 TypeScript 建構，確保程式碼的類型安全與可維護性。
      * 採用 Tailwind CSS 打造美觀、響應式的介面。
      * 使用 React Router 實現流暢的單頁應用程式導航。
  * **響應式與可訪問性設計**:
      * 元件和頁面皆考慮到不同裝置尺寸的顯示效果。
      * 在遊戲和 UI 元件中加入了 `aria-label` 等無障礙屬性，提升使用者體驗。

## 🚀 技術棧

  * **前端框架**: React 19
  * **程式語言**: TypeScript
  * **樣式**: Tailwind CSS
  * **路由**: React Router DOM
  * **建構工具**: Vite
  * **AI 模型**: Google Gemini (`gemini-2.5-flash-preview-04-17`)

## 🎮 遊戲玩法說明

### 專注力遊戲：找出目標挑戰

  * **目標**: 盡快在網格中找到並點擊唯一的**紅色目標方塊**。
  * **規則**:
      * 每次成功點擊目標，您將獲得分數並進入下一級。
      * 隨著等級提升，網格會變大，時間限制會縮短。
      * 點擊錯誤的方塊會扣分。

### 學習遊戲：序列記憶挑戰

  * **目標**: 記住並按正確順序重現螢幕上閃現的顏色序列。
  * **規則**:
      * 遊戲開始時會顯示一個顏色序列。
      * 序列消失後，玩家需要點擊下方按鈕來重現該序列。
      * 每成功完成一個序列，將進入更長的下一級。
      * 玩家有三次失敗機會。

## 🔧 本地端運行與設定

### **先決條件**

  * [Node.js](https://nodejs.org/) (建議版本 \>= 18.0.0)

### **安裝與設定**

1.  **複製專案庫**

    ```bash
    git clone https://github.com/jeffery8910/BrainSparkPlatform.git
    cd BrainSparkPlatform
    ```

2.  **安裝依賴套件**

    ```bash
    npm install
    ```

3.  **設定 Gemini API 金鑰**

    您需要一個 Google Gemini API 金鑰才能使用「神經科學洞見」功能。

      * 複製 `.env.local.example` 檔案並重新命名為 `.env.local`。
      * 在 `.env.local` 檔案中，將 `YOUR_GEMINI_API_KEY` 替換為您的金鑰：
        ```
        GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
        ```
      * 如果您沒有金鑰，可以從 [Google AI Studio](https://aistudio.google.com/app/apikey) 獲取。

4.  **啟動開發伺服器**

    ```bash
    npm run dev
    ```

    應用程式現在應該會在 `http://localhost:5173` （或 Vite 指定的另一個端口）上運行。

### **其他可用指令**

  * **建構專案** (用於生產環境)
    ```bash
    npm run build
    ```
  * **預覽建構後的專案**
    ```bash
    npm run preview
    ```

## 📂 專案結構概覽

```
/
├── public/                # 靜態資源
├── src/
│   ├── components/        # 可重用 UI 元件 (如按鈕、卡片、遊戲)
│   │   ├── games/         # 遊戲主要邏輯元件
│   │   ├── icons/         # SVG 圖示元件
│   │   ├── layout/        # 佈局元件 (如 Navbar)
│   │   └── ui/            # 通用 UI 元件 (如 Button, Card)
│   ├── pages/             # 頁面級元件
│   ├── services/          # 外部服務 (如 Gemini API 請求)
│   ├── App.tsx            # 應用的根元件和路由設定
│   ├── constants.ts       # 應用程式的常數
│   ├── index.css          # 全域樣式
│   ├── index.tsx          # 應用程式進入點
│   └── types.ts           # TypeScript 類型定義
├── .env.local             # 環境變數 (!! 不應提交到 Git !!)
├── index.html             # HTML 進入點
├── package.json           # 專案依賴與腳本
├── tsconfig.json          # TypeScript 設定檔
└── vite.config.ts         # Vite 設定檔
```

## 📄 授權條款

本專案採用 MIT 授權。詳情請見 [LICENSE](https://www.google.com/search?q=LICENSE) 檔案。
