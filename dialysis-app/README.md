# 투석 환자 조회 앱

투석 병원 아침 회진에서 사용하는 모바일 웹앱.  
오늘 요일에 해당하는 환자 목록을 보여주고, 클릭하면 기본 정보와 시술 이력을 확인합니다.

## 실행 방법

### 1. 환경변수 설정

`.env.local.example`을 복사해서 `.env.local`을 만들고 값을 입력합니다.

```bash
cp .env.local.example .env.local
```

`.env.local` 내용:

```
VITE_GOOGLE_SHEETS_API_KEY=발급받은_Google_API_키
VITE_SPREADSHEET_ID=스프레드시트_ID
```

### 2. Google Sheets API 설정

1. [Google Cloud Console](https://console.cloud.google.com)에서 프로젝트 생성
2. **Google Sheets API** 활성화
3. **사용자 인증 정보 > API 키** 생성
4. API 키 제한: HTTP 리퍼러 → 배포 도메인 등록 (예: `https://your-app.vercel.app/*`)
5. 스프레드시트를 **링크가 있는 모든 사용자 - 뷰어**로 공유

### 3. 스프레드시트 구조

**시트 1: 환자목록** (A~E열, 3행부터)

| A: 이름 | B: 생년월일 | C: 나이 | D: 요일그룹 | E: 부가정보 |
|--------|------------|--------|------------|------------|
| 홍길동 | 1950-03-15 | (수식) | 월수금 | |

요일그룹 값: `월수금` 또는 `화목토`

**시트 2: 시술이력** (A~G열, 3행부터)

| A: 이름 | B: 날짜 | C: Sono | D: Fistulogram | E: Thrombectomy | F: PTA | G: Stent |
|--------|--------|--------|---------------|----------------|--------|---------|
| 홍길동 | 2024-01-15 | O | | O | | |

시술 여부: `O` 입력 또는 빈 칸

### 4. 로컬 개발

```bash
npm install
npm run dev
```

---

## Vercel 배포

### 1. GitHub에 push

```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/your-name/dialysis-app.git
git push -u origin main
```

### 2. Vercel 연결

1. [vercel.com](https://vercel.com)에서 GitHub 저장소 import
2. **Settings > Environment Variables**에서 두 값 추가:
   - `VITE_GOOGLE_SHEETS_API_KEY`
   - `VITE_SPREADSHEET_ID`
3. **Redeploy** 실행

### 3. API 키 도메인 제한 업데이트

Google Cloud Console에서 API 키의 HTTP 리퍼러에 Vercel 도메인 추가:
```
https://your-app.vercel.app/*
```
