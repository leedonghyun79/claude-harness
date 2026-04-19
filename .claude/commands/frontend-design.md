# frontend-design 스킬

> Claude 전용 스킬 — 프론트엔드 UI 생성 가이드
> 저장일: 2026년 3월
> 출처: /mnt/skills/user/frontend-design/SKILL.md

---

## 한 줄 요약

웹 컴포넌트, 페이지, 앱, 포스터 등 UI를 만들 때 "AI 스럽고 평범한" 디자인을 피하고,
**프로덕션 수준의 개성 있는 인터페이스**를 생성하기 위한 가이드.

---

## 언제 이 스킬이 트리거되나?

- 웹 컴포넌트, 랜딩 페이지, 대시보드, React 컴포넌트 요청
- HTML/CSS 레이아웃 스타일링/개선 요청
- 포스터, UI 아트팩트, 웹앱 제작 요청

---

## 코딩 전 반드시 생각할 것 (Design Thinking)

코드 짜기 전에 4가지를 먼저 결정한다:

| 항목 | 내용 |
|---|---|
| Purpose | 이 UI가 해결하는 문제는? 누가 쓰는가? |
| Tone | 미학적 방향 확정 (아래 목록 참고) |
| Constraints | 기술 요구사항 (프레임워크, 성능, 접근성) |
| Differentiation | 사람들이 기억할 단 한 가지는? |

### 미학 방향 옵션 (하나를 골라 끝까지 밀어붙일 것)

- brutally minimal (극단적 미니멀)
- maximalist chaos (맥시멀리즘)
- retro-futuristic (레트로 미래풍)
- organic/natural (유기적/자연)
- luxury/refined (럭셔리/정제)
- playful/toy-like (장난감 같은)
- editorial/magazine (에디토리얼)
- brutalist/raw (브루탈리스트)
- art deco/geometric (아르데코/기하학)
- soft/pastel (소프트/파스텔)
- industrial/utilitarian (산업적/실용)

> **핵심**: 방향을 정하고 정밀하게 실행. 강도가 아니라 **의도성**이 중요.

---

## 디자인 가이드라인

### 타이포그래피
- **금지**: Arial, Inter, Roboto, system fonts (너무 평범함)
- **권장**: 개성 있고 기억에 남는 폰트. 디스플레이 폰트 + 본문 폰트 페어링
- 매 생성마다 다른 폰트 조합을 쓸 것 (Space Grotesk 반복 금지)

### 컬러 & 테마
- CSS 변수로 일관성 유지
- 주조색 + 샤프한 포인트 컬러 조합이 무난한 분산 팔레트보다 강력
- 라이트/다크 테마 번갈아 사용 (매번 같은 방향 금지)

### 모션 & 인터랙션
- HTML: CSS-only 솔루션 우선
- React: Motion 라이브러리 활용
- 페이지 로드 시 staggered reveals (animation-delay) 하나를 잘 만드는 게 여러 마이크로인터랙션보다 임팩트 큼
- 스크롤 트리거, 호버 상태로 서프라이즈 요소 추가

### 공간 구성
- 예상 밖의 레이아웃, 비대칭, 겹침, 대각선 흐름
- 그리드를 깨는 요소 사용
- 여백을 넉넉하게 OR 밀도 있게 — 중간은 없음

### 배경 & 비주얼 디테일
- 단색 배경 디폴트 금지
- 분위기와 깊이감 만들기: gradient mesh, noise texture, geometric pattern, layered transparency, dramatic shadow, decorative border, custom cursor, grain overlay

---

## 절대 하지 말 것 (금지 목록)

| 금지 항목 | 이유 |
|---|---|
| Inter, Roboto, Arial, system font | 너무 흔하고 개성 없음 |
| 보라색 그라디언트 + 흰 배경 | AI 스럽고 진부함 |
| 뻔한 레이아웃 패턴 | 기억에 안 남음 |
| 맥락 없는 쿠키커터 디자인 | 개성 없음 |
| 매번 같은 폰트/컬러 반복 | 창의성 없음 |

---

## 구현 복잡도 원칙

- 맥시멀리스트 → 풍부한 코드 + 애니메이션 + 이펙트 다 넣기
- 미니멀리스트 → 절제, 정밀한 스페이싱, 타이포, 섬세한 디테일

> "Claude는 진짜 특별한 걸 만들 수 있다. 틀 밖으로 나가서 독창적인 비전을 끝까지 밀어붙여라."

---

## 실전 활용 예시 (동현이 케이스)

| 요청 | 적용 방향 |
|---|---|
| CMS 어드민 대시보드 | industrial/utilitarian + 다크 테마 |
| 픽셀커넥트 랜딩페이지 | luxury/refined + 타이포 중심 |
| TVZone 히어로 섹션 | retro-futuristic + GSAP 연동 |
| 견적서 PDF 템플릿 | editorial/magazine + 브랜드 컬러 |
