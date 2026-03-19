# PandaTV KPI Dashboard — 아키텍처 & 구조

## 전체 아키텍처

**패턴:** 단일 파일 React SPA (Single Page Application)
**접근방식:** 비기능 프로토타입 — 백엔드 없음, API 없음, 로그인 없음

```
project003/
├── .moai/                    # MoAI 프로젝트 설정
│   ├── config.json
│   └── project/
│       ├── product.md
│       ├── structure.md
│       └── tech.md
├── .claude/                  # Claude Code 설정
├── src/
│   └── PandaTVWebDashboard.jsx   # 단일 파일 React 컴포넌트 (전체 앱)
└── package.json
```

## 모듈 구조 (단일 파일 내부)

PandaTVWebDashboard.jsx 파일 내부 구성:

### 1. 데이터 상수 (파일 상단)
- `growthData` — 6개월 MAU + 매출 추이
- `retentionTrend` — 6개월 리텐션 추이
- `payingUsersTrend` — 결제유저 추이
- `riskTrend` — 리스크/운영 추이
- KPI 카드 데이터, 퍼널 데이터, BJ 티어 데이터, 매출 믹스 데이터
- 이슈 카드 & 성장 베팅 텍스트 콘텐츠

### 2. 서브 컴포넌트 (파일 중간)
- `KPICard` — 개별 KPI 표시 카드
- `SectionCard` — 섹션 래퍼 컴포넌트
- 차트 관련 커스텀 툴팁

### 3. 메인 컴포넌트 (파일 하단)
- `PandaTVWebDashboard` — default export, 탭 전환 관리

## 네비게이션 구조

```
[Dashboard 탭] (기본)           [Opportunities 탭]
├── Header Row                  ├── Header Card
├── 8-KPI Summary Row           ├── 3 Issue Cards (grid-cols-3)
├── Executive Overview (2-col)  ├── Next Growth Bets (2-col)
├── Funnel + Retention (2-col)  └── Footer
├── BJ Health (2-col)
├── Revenue Structure (3-col)
├── Risk & Ops (4-col)
├── Key Insights
├── Recommended Actions (3-col)
└── Footer
```

## 레이아웃 시스템

| 요소 | CSS 클래스 |
|------|-----------|
| 페이지 | `max-w-[1440px] mx-auto px-8 py-6` |
| KPI 행 | `grid grid-cols-8 gap-3` |
| 2컬럼 섹션 | `grid grid-cols-2 gap-4` |
| 3컬럼 섹션 | `grid grid-cols-3 gap-4` |
| 4컬럼 섹션 | `grid grid-cols-4 gap-3` |
| 반응형 폴백 | `lg:grid-cols-2` (1024px~) |

## 데이터 플로우

```
정적 상수 데이터 (파일 상단)
    ↓
React useState (탭 전환: 'dashboard' | 'opportunities')
    ↓
조건부 렌더링 (탭별 섹션)
    ↓
Recharts 차트 렌더링 (인터랙티브 툴팁만)
```

- 외부 API 호출 없음
- 서버사이드 렌더링 없음
- 모든 데이터는 공식 doublemedia.co.kr/service 앵커에서 파생

## 외부 연동

| 연동 | 유형 | 용도 |
|------|------|------|
| Google Fonts CDN | HTTP | Noto Sans KR 폰트 로드 |
| Google Play CDN | HTTP | PandaTV 로고 이미지 (onError 폴백: 🐼) |

## First-Screen 제약조건

1440px 뷰포트에서 스크롤 없이 보여야 할 요소:
1. 전체 헤더 행
2. 완전한 8개 KPI 요약 행
3. Executive Overview 섹션 상단 (트렌드 차트 일부 노출)

## 아키텍처 결정 배경

| 결정 | 이유 |
|------|------|
| 단일 JSX 파일 | 면접 시연 편의성 — 파일 하나로 전체 프로토타입 구동 |
| 정적 데이터 | 비기능 프로토타입 — 실제 데이터 연동 불필요 |
| 다크 모드 전용 | 라이브 스트리밍 플랫폼 대시보드 맥락에 적합 |
| Recharts | React 생태계에서 가장 성숙한 차트 라이브러리, 반응형 지원 |
| Tailwind CSS | 단일 파일에서 인라인 스타일링 가능, 빠른 프로토타이핑 |
