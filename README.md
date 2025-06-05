# 감정 & 날씨 기반 AI 노래 추천 서비스 (백엔드/프론트엔드 연동)

이 프로젝트는 사용자의 기분과 날씨를 입력받아,  
Google Gemini AI를 활용해 어울리는 노래를 추천해주는 서비스입니다.

프론트엔드와 백엔드는 별도 저장소로 관리하며,  
fetch와 CORS로 안전하게 연동합니다.
---

## 연동 구조

- **프론트엔드:**  
  GitHub Pages(`https://iris349.github.io/IrisPlaylist-front/`)에 배포된 HTML/JS에서  
  사용자가 입력한 기분과 날씨를 백엔드 API로 전송합니다.

- **백엔드:**  
  Vercel(`https://assign2-omega.vercel.app/api/IrisPlaylist`)에 배포된 Node.js API가  
  Google Gemini AI로부터 추천 결과를 받아 프론트엔드에 응답합니다.

- **연동 방식:**  
  프론트엔드 JS에서 fetch로 백엔드 API를 호출하며,  
  백엔드에서는 CORS 설정을 통해 프론트엔드 도메인을 허용합니다.

---

## 환경 변수

- `.env` 파일에 Google Gemini API 키(`ASSIGN2_API_KEY`)를 등록해 사용합니다.

---
