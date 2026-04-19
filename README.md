# claude-harness

> **Claude Code 하네스 시스템** — 도메인별 자동 가이드 라우팅 + 웹 개발 스킬 가이드 + Next.js 보일러플레이트

---

## 개요

`claude-harness`는 Claude Code를 프로젝트에 효과적으로 연결하기 위한 **하네스(Harness) 시스템**입니다.  
컨텍스트 자동 감지, 도메인별 스킬 가이드, 그리고 실전 검증된 Next.js 보일러플레이트를 포함합니다.

---

## 구성

```
claude-harness/
├── .claude/                  # Claude Code 훅 & 스킬 (이 폴더가 핵심)
│   ├── settings.json         # UserPromptSubmit 훅 설정
│   ├── scripts/
│   │   └── detect-context.js # 키워드 → 스킬 자동 주입 스크립트
│   └── commands/             # 프로젝트 레벨 스킬 파일 (7개)
│       ├── frontend-design.md
│       ├── backend-guide.md
│       ├── db-guide.md
│       ├── devops-guide.md
│       ├── performance-guide.md
│       ├── planning-guide.md
│       └── qa-guide.md
├── guide/                    # 사용 가이드 문서
│   ├── context-routing-guide.md  # 컨텍스트 라우팅 상세 가이드
│   └── claude-code-commands.md  # 슬래시 커맨드 레퍼런스
└── harness-todo/             # 실전 보일러플레이트 (Next.js 14)
    ├── app/                  # Next.js App Router
    ├── components/           # UI 컴포넌트
    ├── docs/                 # ADR, 실행 계획, 스펙 문서
    ├── skills/               # Compound Engineering 레지스트리
    ├── scripts/              # 품질 게이트 스크립트
    ├── CLAUDE.md             # 에이전트 시스템 프롬프트
    ├── AGENTS.md             # 에이전트 진입점 맵
    └── ARCHITECTURE.md       # 기술 아키텍처 문서
```

---

## 핵심 기능

### 1. 컨텍스트 자동 라우팅

`UserPromptSubmit` 훅이 매 프롬프트마다 `detect-context.js`를 실행,  
키워드를 감지해 알맞은 스킬 가이드를 Claude에 자동 주입합니다.

| 키워드 예시 | 주입 스킬 |
|---|---|
| `UI`, `컴포넌트`, `디자인` | `frontend-design.md` |
| `API`, `서버`, `Next.js` | `backend-guide.md` |
| `DB`, `쿼리`, `스키마` | `db-guide.md` |
| `CI`, `배포`, `Docker` | `devops-guide.md` |
| `테스트`, `QA`, `버그` | `qa-guide.md` |
| `계획`, `설계`, `아키텍처` | `planning-guide.md` |
| `성능`, `최적화`, `캐시` | `performance-guide.md` |

### 2. 스킬 가이드 (`.claude/commands/`)

각 도메인별로 Claude Code가 참조하는 고품질 가이드 파일.  
프로젝트에 맞게 수정하여 팀 컨벤션을 자동 적용할 수 있습니다.

### 3. Next.js 보일러플레이트 (`harness-todo/`)

하네스 시스템이 내장된 Next.js 14 스타터.  
새 프로젝트를 시작할 때 이 폴더를 복사해서 사용하세요.

---

## 빠른 시작

### 기존 프로젝트에 하네스 적용

```bash
# 1. 이 레포 클론
git clone https://github.com/leedonghyun79/claude-harness.git

# 2. .claude 폴더를 내 프로젝트에 복사
cp -r claude-harness/.claude my-project/.claude

# 3. Claude Code 열고 사용
# → 이제 Claude가 컨텍스트를 자동 감지합니다
```

### 새 프로젝트를 보일러플레이트로 시작

```bash
# harness-todo 폴더를 원하는 이름으로 복사
cp -r claude-harness/harness-todo my-new-project

cd my-new-project
npm install
cp .env.example .env.local
npm run dev
```

그 다음 Claude Code에서:

```
이 보일러플레이트로 {프로젝트명} 만들고 싶어. {간단한 설명}
```

Claude가 플레이스홀더 교체 + 스펙 작성까지 자동으로 처리합니다.

---

## 작업 흐름

```
1. /brainstorm     → 요구사항 정제
2. /write-plan     → exec-plan 작성 (docs/exec-plans/active/)
3. TDD             → RED → GREEN → REFACTOR
4. /review         → 계획 준수 검증
5. verify          → npm run verify 통과 확인
6. Compound        → skills/lessons-learned.md 업데이트
```

---

## 가이드 문서

- [컨텍스트 라우팅 가이드](guide/context-routing-guide.md)
- [Claude Code 커맨드 레퍼런스](guide/claude-code-commands.md)
- [보일러플레이트 README](harness-todo/README.md)
