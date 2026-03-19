# PandaTV KPI Dashboard — 기술 스택

## 기술 스택

| 구분 | 기술 | 버전 |
|------|------|------|
| Language | JavaScript (JSX) | ES2022+ |
| Framework | React | 18.x |
| Charting | Recharts | 2.x |
| Icons | lucide-react | latest stable |
| Styling | Tailwind CSS | 3.x |
| Font | Noto Sans KR (Google Fonts) | — |
| Monospace Font | SF Mono / Fira Code | — |

## 프레임워크 & 라이브러리

### React 18
- 단일 컴포넌트 `PandaTVWebDashboard`를 default export
- `useState`로 탭 전환 관리 (`'dashboard'` | `'opportunities'`)
- No Router, No Context, No Redux — 최소 상태 관리

### Recharts
- `ResponsiveContainer` — 모든 차트를 반응형으로 래핑
- `ComposedChart` — MAU 라인 + 매출 바 이중 축 차트
- `PieChart` — 도넛 차트 (`innerRadius` 사용)
- `LineChart`, `BarChart`, `AreaChart` — 트렌드 시각화
- 커스텀 툴팁 스타일: 다크 테마 (#1A1E2A 배경, #3B9EFF 보더)

### lucide-react
- 사용 아이콘: `TrendingUp`, `TrendingDown`, `AlertTriangle`, `Clock`, `Users`, `DollarSign`, `Activity`, `Zap`, `ShieldAlert`, `CreditCard`, `BarChart2`, `Target`
- 추가 아이콘 임포트 금지

## 디자인 시스템

### 컬러 팔레트

| 용도 | 컬러 코드 |
|------|----------|
| 배경 (페이지) | `#0A0C10` |
| 카드 표면 | `#13161F` |
| 카드 보더 | `#1E2330` |
| Primary 액센트 | `#3B9EFF` (블루) |
| Secondary 액센트 | `#5EEAD4` (틸) |
| Warning 액센트 | `#F59E0B` (앰버) |
| Success | `#34D399` (에메랄드) |
| Danger | `#F87171` (레드) |
| Muted 텍스트 | `#6B7280` |
| Body 텍스트 | `#CBD5E1` |
| Heading 텍스트 | `#F1F5F9` |

### 타이포그래피

| 요소 | 스타일 |
|------|--------|
| 페이지 타이틀 | `text-xl font-bold text-slate-100` |
| 섹션 헤딩 | `text-base font-semibold text-slate-200 mb-3` |
| 카드 레이블 | `text-xs text-slate-500 uppercase tracking-wide` |
| KPI 값 | `text-2xl font-bold text-slate-100 font-mono` |
| 트렌드 | `text-xs font-medium` (green/red) |

### 카드 스타일

| 유형 | 클래스 |
|------|--------|
| 기본 | `rounded-xl bg-[#13161F] border border-[#1E2330] p-5` |
| KPI 요약 | `rounded-xl bg-[#13161F] border border-[#1E2330] p-4` |
| 섹션 (대형) | `rounded-xl bg-[#13161F] border border-[#1E2330] p-6` |
| 리스크 | `rounded-xl bg-[#13161F] border border-[#F59E0B]/20 p-4` |

## 개발 환경

### 빌드 도구
- npm (패키지 관리)
- Vite 또는 CRA 기반 React 프로젝트

### 코드 컨벤션
- 단일 `.jsx` 파일 구조
- 섹션 주석으로 코드 영역 구분
- 데이터 상수 → 서브 컴포넌트 → 메인 컴포넌트 순서
- **BJ** 용어 통일 (Creator, Streamer 사용 금지)
- 금액 단위: `억 KRW` (₩ 기호 미사용)
- No form 태그 — `div` + `onClick` 사용

## 테스트 전략

> 비기능 프로토타입이므로 자동화 테스트는 적용하지 않음.

수동 검증 항목:
- 1440px 뷰포트에서 가로 스크롤 없이 렌더링
- First-screen에 헤더 + 8 KPI + 트렌드 차트 상단 표시
- 모든 차트 인터랙티브 툴팁 동작
- 탭 전환 (Dashboard ↔ Opportunities) 정상 동작
- 콘솔 에러 0건

## 배포 환경

> 로컬 개발 서버에서 노트북으로 직접 시연.

- `npm run dev` 로컬 실행
- 프로덕션 배포 불필요
- 면접 현장에서 브라우저 (Chrome 1440px) 시연

## 성능 요구사항

| 항목 | 기준 |
|------|------|
| 초기 로드 | < 2초 (로컬) |
| 탭 전환 | 즉시 (< 100ms) |
| 차트 렌더링 | < 500ms |
| 번들 크기 | 제한 없음 (프로토타입) |

## 보안 요구사항

> 비기능 프로토타입 — 보안 요구사항 해당 없음.

- 로그인/인증 없음
- 실제 데이터 미사용 (모든 데이터는 정적 샘플)
- 배포 환경 없음

## 기술적 제약 & 고려사항

| 제약 | 설명 |
|------|------|
| 단일 파일 | 모든 코드가 하나의 `.jsx` 파일에 포함되어야 함 |
| 로컬 임포트 금지 | 외부 npm 패키지만 허용, 프로젝트 내 파일 참조 금지 |
| form 태그 금지 | `div` + `onClick`만 사용 |
| 다크 모드 전용 | 라이트 모드 미지원 |
| 데스크톱 우선 | 1440px 기준, 1024px까지 반응형 |
