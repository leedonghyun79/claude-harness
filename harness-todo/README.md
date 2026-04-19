# {PROJECT_NAME}

> **하네스 엔지니어링 보일러플레이트** — Next.js 14 + TypeScript + Tailwind + Vitest

---

## 스택

| 영역 | 도구 |
|------|------|
| 프레임워크 | Next.js 14 (App Router) |
| 언어 | TypeScript |
| 스타일 | Tailwind CSS v4 |
| 상태 관리 | Zustand (필요 시) |
| 테스트 | Vitest + Testing Library + happy-dom |
| 품질 | ESLint · Prettier · Husky · lint-staged |
| 배포 | Vercel |

## 하네스 시스템

| 계층 | 도구 | 역할 |
|------|------|------|
| 스킬 | Superpowers (Claude Code) | `/brainstorm`, `/write-plan`, TDD, `/review` |
| 메모리 | Compound Engineering | `skills/lessons-learned.md` |
| 시스템 | docs/ + AGENTS.md | 지식 베이스 + 실행 규칙 |

## 시작하기

```bash
# 1. 패키지 설치
npm install

# 2. 환경 변수 설정
cp .env.example .env.local

# 3. 개발 서버 실행
npm run dev
```

## 스크립트

```bash
npm run dev          # 개발 서버 (localhost:3000)
npm run build        # 프로덕션 빌드
npm run typecheck    # TypeScript 검사
npm run lint         # ESLint
npm run test         # Vitest (1회)
npm run test:watch   # Vitest (감시 모드)
npm run verify       # 전체 품질 게이트 (typecheck → lint → test → build)
```

## 프로젝트 구조

```
.
├── app/                  # Next.js App Router
├── components/           # UI 컴포넌트
├── store/                # Zustand 스토어
├── types/                # TypeScript 타입
├── __tests__/            # 테스트 파일
├── docs/
│   ├── design-docs/      # ADR (아키텍처 결정 기록)
│   ├── exec-plans/       # 실행 계획 (active / completed)
│   ├── product-specs/    # 기능 스펙
│   ├── PLANS.md          # 로드맵 & 기술 부채
│   ├── QUALITY_SCORE.md  # 품질 게이트 현황
│   ├── RELIABILITY.md    # SLO & 장애 대응
│   └── SECURITY.md       # 위협 모델 & 보안 규칙
├── skills/
│   └── lessons-learned.md  # Compound Engineering 레지스트리
├── scripts/
│   └── verify.sh         # 전체 품질 게이트 스크립트
├── CLAUDE.md             # 에이전트 시스템 프롬프트
├── AGENTS.md             # 에이전트 진입점 맵
└── ARCHITECTURE.md       # 기술 아키텍처 문서
```

## 새 프로젝트 세팅

1. `harness-todo/` 폴더 복사 → 원하는 이름으로 변경
2. Claude Code 열고 아래처럼 말하기:

```
이 보일러플레이트로 {프로젝트명} 만들고 싶어. {간단한 설명}
```

3. Claude가 플레이스홀더 교체 + 스펙 작성까지 자동으로 처리해줌
   - 직접 파일을 수정할 필요 없음

## 작업 흐름

```
1. /brainstorm     → 요구사항 정제
2. /write-plan     → exec-plan 작성 (docs/exec-plans/active/)
3. TDD             → RED → GREEN → REFACTOR
4. /review         → 계획 준수 검증
5. verify          → npm run verify 통과 확인
6. Compound        → skills/lessons-learned.md 업데이트
```

자세한 문서 → [docs/index.md](docs/index.md)  
아키텍처 → [ARCHITECTURE.md](ARCHITECTURE.md)
