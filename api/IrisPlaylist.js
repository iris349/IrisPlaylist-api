import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
//git test
const genAI = new GoogleGenerativeAI(process.env.ASSIGN2_API_KEY);

export default async function handler(req, res) {
    // CORS 헤더를 항상 추가
    res.setHeader("Access-Control-Allow-Origin", "https://iris349.github.io");
    res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        // preflight 요청에도 CORS 헤더가 반드시 포함되어야 함
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const mood = req.body?.mood || "";
    const weather = req.body?.weather || "";
    if (!mood || !weather) {
        return res.status(400).json({ error: "기분(mood)과 날씨(weather)를 모두 입력해 주세요." });
    }

    try {
        const prompt = 
`내 기분은 "${mood}"이고, 오늘 날씨는 "${weather}"야.
이 상황에 어울리는 노래 한 곡을 추천해줘.
노래 제목과 가수, 그리고 추천 이유를 2~3줄로 설명해줘.
그리고 노래제목과 가수를 맨 위에 표시하고 한줄 띄우고 그 이유를 설명해줘.`;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }]
        });
        const aiResponse = result.response.text() || "AI 응답 없음";
        return res.status(200).json({ mood, weather, aiResponse });
    } catch (error) {
        // 에러 응답에도 CORS 헤더가 반드시 포함되어야 함
        return res.status(500).json({ error: "서버 오류", detail: error.message });
    }
}