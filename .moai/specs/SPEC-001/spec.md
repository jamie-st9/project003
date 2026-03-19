# SPEC-001: PandaTV KPI Dashboard — 데스크톱 웹 프로토타입

**상태:** 계획됨
**우선순위:** 높음
**생성일:** 2026-03-19
**목표:** 단일 React JSX 파일 구현

---

## 1. 개요

PandaTV KPI Dashboard 데스크톱 웹 프로토타입을 단일 `.jsx` 파일로 구현한다.
더블미디어 사업기획팀장 면접에서 노트북으로 시연할 비기능 프로토타입이다.

### 범위

- 단일 `PandaTVWebDashboard.jsx` 파일 (default export)
- Dashboard 탭 (8개 KPI + 6개 차트 섹션) + Opportunities 탭 (3개 이슈 + 2개 성장 베팅)
- 다크 모드 전용, 1440px 데스크톱 우선 (1024px 반응형)
- 정적 샘플 데이터, 백엔드/API 없음

### 디자인 참조

- Pencil MCP 디자인: `pencil-new.pen` (Web Dashboard `Ltqay`, Web Opportunities `Gd3Fj`)

---

## 2. 요구사항 (EARS 형식)

### R-001: 프로젝트 구조
**프로젝트가 초기화되면** 시스템은 `export default function PandaTVWebDashboard()`를 포함하는 단일 `.jsx` 파일을 생성해야 한다.

### R-002: 탭 내비게이션
**사용자가 탭을 클릭하면** 시스템은 `useState`를 사용하여 "Dashboard"와 "Opportunities" 뷰를 전환해야 한다.

### R-003: KPI 요약 행
시스템은 단일 수평 행(`grid-cols-8`)에 8개 KPI 카드를 표시해야 한다: MAU, DAU, 신규가입, 30D 리텐션, 후원매출, 결제유저, ARPPU, 활성 BJ.

### R-004: 경영 개요
시스템은 2컬럼 레이아웃을 표시해야 한다:
- 왼쪽: ComposedChart (MAU 라인 + 매출 바, 이중 Y축) — Recharts 사용
- 오른쪽: 비즈니스 헬스 요약 (4행, 컬러 코딩된 상태 점)

### R-005: 유저 퍼널
시스템은 5단계 수평 바 퍼널을 표시해야 한다 (월간 방문 → 가입 → 10분+ 시청 → 첫 결제 → 재구매). 각 단계는 비례 너비와 전환율 배지를 포함한다.

### R-006: 리텐션 패널
시스템은 2x2 그리드에 4개 리텐션 스탯 카드(7D, 30D, 재방문 유저, 재활성 유저)를 표시하고, 하단에 AreaChart 추이를 포함해야 한다.

### R-007: BJ 공급 건강도
시스템은 다음을 표시해야 한다:
- 왼쪽: PieChart 도넛 (Top 10: 44%, Mid-tier: 38%, Long-tail: 18%) + 중앙 라벨
- 오른쪽: 4개 BJ 스탯 카드 + BarChart 티어 분포

### R-008: 매출 구조
시스템은 3컬럼 레이아웃을 표시해야 한다: 후원매출 추이(LineChart), 결제유저 추이(LineChart), 매출 믹스 도넛(PieChart, 가설 항목 표기 포함).

### R-009: 리스크 & 운영
시스템은 앰버 액센트의 4개 지표 카드(신고 건수, 위반율, CS 응답시간, 정산 리드타임)를 표시하고, 목표 지표 및 ComposedChart 추이를 포함해야 한다.

### R-010: 핵심 인사이트 + 추천 액션
시스템은 번호가 매겨진 3개 인사이트와 영향 태그가 포함된 3개 액션 카드를 표시해야 한다.

### R-011: Opportunities 탭 — 이슈 카드
시스템은 `grid-cols-3`에 고유 액센트 색상(앰버, 블루, 틸)의 3개 이슈 카드를 표시해야 한다. 각 카드는 다음을 포함한다: 왜 중요한가, 제안 이니셔티브, 기대 영향, 태그.

### R-012: Opportunities 탭 — 성장 베팅
시스템은 2개 성장 베팅 카드를 표시해야 한다. 각 카드는 가설, 왜 지금인가, 잠재적 영향, "planning hypothesis" 상태 라벨을 포함한다.

### R-013: First-Screen 제약
**1440px 뷰포트에서 렌더링될 때** 시스템은 스크롤 없이 헤더 + 8개 KPI 행 전체 + 트렌드 차트 상단을 표시해야 한다.

### R-014: 데이터 앵커
시스템은 모든 목업 데이터를 공식 doublemedia.co.kr/service 앵커에서 파생해야 한다 (MAU 100만, 누적회원 2,000만, 주간재방문율 65%, 누적시청수 1억뷰).

### R-015: 용어 통일
시스템은 "BJ"만 사용해야 한다 (Creator/Streamer 금지). 금액 단위는 "억 KRW"만 사용한다 (₩ 기호 미사용).

### R-016: 하단 면책조항
시스템은 양쪽 탭 모두에 "Sample Data Only · Not for Distribution" 면책조항을 표시해야 한다.

---

## 3. 기술 접근법

### 의존성
```
react (18.x)
recharts (2.x)
lucide-react (최신 안정 버전)
tailwindcss (3.x)
```

### 파일 구조
```
src/PandaTVWebDashboard.jsx   ← 단일 파일, 전체 앱
```

### 코드 구성 (단일 파일 내부)
```
1. 데이터 상수 (파일 상단)
   - growthData, retentionTrend, payingUsersTrend, riskTrend
   - KPI 카드 데이터, 퍼널 데이터, BJ 티어 데이터, 매출 믹스 데이터
   - 이슈 카드 & 성장 베팅 텍스트 콘텐츠
   - 툴팁 스타일 상수

2. 서브 컴포넌트 (파일 중간)
   - KPICard, SectionCard, StatusDot
   - 커스텀 차트 툴팁

3. 메인 컴포넌트 (파일 하단)
   - PandaTVWebDashboard (default export)
   - useState로 탭 전환
   - Dashboard 탭 섹션
   - Opportunities 탭 섹션
```

### 디자인 시스템 (PRD 기반)
```
배경:           #0A0C10
카드 표면:      #13161F
카드 보더:      #1E2330
Primary:        #3B9EFF (블루)
Secondary:      #5EEAD4 (틸)
Warning:        #F59E0B (앰버)
Success:        #34D399
Danger:         #F87171
본문 텍스트:    #CBD5E1
헤딩 텍스트:    #F1F5F9
비활성 텍스트:  #6B7280
```

### Recharts 컴포넌트 사용 목록
| 섹션 | 차트 유형 | 높이 |
|------|----------|------|
| 성장 추이 | ComposedChart (Line + Bar) | 280px |
| 리텐션 추이 | AreaChart | 120px |
| BJ 티어 분포 | BarChart | 120px |
| 후원매출 | LineChart | 180px |
| 결제유저 | LineChart | 180px |
| 매출 믹스 | PieChart (도넛) | 180px |
| 리스크 추이 | ComposedChart (Bar + Line) | 140px |

### Lucide 아이콘 (import 목록)
```
TrendingUp, TrendingDown, AlertTriangle, Clock, Users,
DollarSign, Activity, Zap, ShieldAlert, CreditCard, BarChart2, Target
```

### 반응형 전략
- 데스크톱: 멀티 컬럼 그리드 레이아웃
- 브레이크포인트 `lg` (1024px): `grid-cols-2` 또는 단일 컬럼으로 축소
- KPI 행: `grid-cols-8` → 좁은 화면에서 `grid-cols-4`

---

## 4. 구현 계획

### Phase 1: 스캐폴드 + 데이터 상수
- [ ] `PandaTVWebDashboard.jsx` 생성 (default export)
- [ ] 파일 상단에 모든 정적 데이터 상수 정의
- [ ] Google Fonts 스타일 태그 설정 (Noto Sans KR)
- [ ] 툴팁 스타일 상수 생성

### Phase 2: 헤더 + 탭 + KPI 행
- [ ] 헤더 행 (로고, 타이틀, Prototype 배지, 기간)
- [ ] useState 기반 탭 바 전환
- [ ] 수평 그리드에 8개 KPI 카드

### Phase 3: Dashboard 상단 섹션
- [ ] 경영 개요: ComposedChart + 비즈니스 헬스 요약
- [ ] 유저 퍼널: 5단계 수평 바
- [ ] 리텐션 패널: 4개 스탯 카드 + AreaChart

### Phase 4: Dashboard 하단 섹션
- [ ] BJ 공급 건강도: PieChart 도넛 + 스탯 카드 + BarChart
- [ ] 매출 구조: 3컬럼 LineChart + PieChart
- [ ] 리스크 & 운영: 4개 앰버 카드 + ComposedChart

### Phase 5: 인사이트 + 액션 + 하단
- [ ] 핵심 인사이트: 번호 매겨진 3개 항목
- [ ] 추천 액션: 태그 포함 3개 카드
- [ ] 하단 면책조항

### Phase 6: Opportunities 탭
- [ ] 3개 이슈 카드 (앰버/블루/틸 액센트)
- [ ] 2개 성장 베팅 카드
- [ ] 하단 면책조항

### Phase 7: 검증
- [ ] 1440px 뷰포트 first-screen 확인
- [ ] 탭 전환 동작 확인
- [ ] 모든 차트 렌더링 및 툴팁 동작
- [ ] 콘솔 에러 0건
- [ ] BJ 용어 통일 확인
- [ ] 1024px 반응형 확인

---

## 5. 인수 기준

### Dashboard 탭
- [ ] 1440px에서 가로 스크롤 없음
- [ ] First-screen: 헤더 + 8개 KPI + 트렌드 차트 상단
- [ ] ComposedChart: MAU 라인 + 매출 바, 이중 Y축
- [ ] 비즈니스 헬스: 4행 컬러 코딩 (초록/앰버/빨강)
- [ ] 퍼널: 5단계 수평 바 + 전환율
- [ ] 리텐션: 4개 스탯 + AreaChart
- [ ] BJ 건강도: 도넛 + 스탯 + 티어 바
- [ ] 매출: 3컬럼 (후원 추이, 결제유저 추이, 매출 믹스)
- [ ] 리스크 & 운영: 4개 앰버 카드 + 트렌드 차트
- [ ] 인사이트 3개 + 액션 3개
- [ ] 하단 면책조항

### Opportunities 탭
- [ ] 3개 이슈 카드 (앰버/블루/틸 각각)
- [ ] 2개 성장 베팅 ("planning hypothesis" 라벨)
- [ ] 하단 면책조항

### 코드 품질
- [ ] 모든 데이터 상수 파일 상단 정의
- [ ] 섹션 주석 전체 적용
- [ ] 콘솔 에러 0건
- [ ] "BJ" 용어 통일 (Creator/Streamer 미사용)
- [ ] Prototype 배지 헤더 노출
- [ ] 양쪽 탭 면책조항 노출

---

## 6. 리스크 & 제약사항

| 리스크 | 대응 방안 |
|--------|----------|
| 단일 파일 크기가 커질 수 있음 | 섹션 주석으로 가독성 확보, 데이터 상수 분리 |
| Recharts 번들 크기 | 프로토타입이므로 무시 가능 |
| 1440px first-screen 제약 | KPI 카드 padding/font 크기 조정으로 대응 |
| 면접 당일 네트워크 불안정 | Google Fonts 로드 실패 시 시스템 폰트 폴백 |
