# Context Routing Guide

프롬프트 키워드를 감지해서 도메인별 가이드 스킬을 자동으로 Claude에게 주입하는 시스템.

## Usage

### 기본 사용법

그냥 평소처럼 Claude에게 말하면 된다. 키워드가 감지되면 `system-reminder`에 아래처럼 자동 표시된다:

```
[가이드] 프론트엔드 작업 감지 → /frontend-design 스킬 참고 권장
```

Claude가 해당 스킬을 참고해서 작업한다. 별도로 스킬을 호출할 필요 없음.

### 수동으로 스킬 호출하기

자동 감지 없이 직접 스킬을 쓰고 싶을 때:

```
/frontend-design   ← 프론트엔드 디자인 가이드
/backend-guide     ← 백엔드 개발 가이드 (추가 시)
/db-guide          ← DB 작업 가이드 (추가 시)
```

### 새 프로젝트에 적용하기

1. `.claude/` 폴더 전체를 새 프로젝트에 복사
2. Node.js 설치 확인 (`node --version`)
3. 필요한 스킬 파일을 `~/.claude/plugins/` 또는 프로젝트에 추가
4. Claude Code 재시작 또는 `/hooks` 메뉴에서 리로드

## Structure

```
.claude/
├── settings.json              ← UserPromptSubmit 훅 설정 (커밋 가능)
├── settings.local.json        ← 퍼미션 (gitignore)
└── scripts/
    └── detect-context.js      ← 키워드 감지 스크립트
```

## How It Works

사용자가 프롬프트를 제출하면 `detect-context.js`가 실행되어 키워드를 분석하고,
관련 스킬 참고 메시지를 Claude 컨텍스트에 자동 주입한다.

```
사용자 입력
    ↓
UserPromptSubmit 훅 실행
    ↓
detect-context.js → 키워드 분석
    ↓
additionalContext 주입 (Claude가 프롬프트 읽기 전)
    ↓
Claude가 관련 스킬 참고하여 작업 수행
```

## Keyword Rules

| 포지션 | 감지 키워드 (예시) | 스킬 |
|--------|------------------|------|
| 프론트엔드 | 컴포넌트, UI, 프론트, tailwind, react, next, shadcn, 반응형 | `/frontend-design` |
| 백엔드 | API, 서버, 백엔드, endpoint, route, middleware, 인증, auth | `/backend-guide` |
| 데이터베이스 | DB, 쿼리, 마이그레이션, prisma, sql, supabase, schema | `/db-guide` |
| 버그/테스팅/QA | 버그, bug, 에러, error, 디버그, 테스트, test, QA, fix, 이슈 | `/qa-guide` |
| 기획/PRD/설계 | 기획, PRD, 설계, 요구사항, 스펙, 와이어, 플로우, 아키텍처 | `/planning-guide` |
| 배포/DevOps | 배포, deploy, 빌드, CI, CD, docker, vercel, AWS, 환경변수 | `/devops-guide` |
| 성능 최적화 | 성능, 최적화, 느리, lighthouse, 번들, 캐시, 렌더링 | `/performance-guide` |

## Adding New Domains

`.claude/scripts/detect-context.js`에서 조건 블록 추가:

```js
if (/키워드1|키워드2|keyword/i.test(prompt)) {
  messages.push('[가이드] 작업 유형 감지 → /skill-name 스킬 참고 권장');
}
```

## Portability

- `settings.json`의 훅 커맨드는 상대경로 (`node .claude/scripts/detect-context.js`)
- 프로젝트 폴더를 clone하면 어느 컴퓨터든 바로 동작
- `settings.local.json`은 `.gitignore`에 추가 (개인 퍼미션은 각자 관리)

## Scope

- 전역(`~/.claude/settings.json`) 아님 — 이 프로젝트에서만 동작
- 다른 프로젝트에 적용하려면 `.claude/` 폴더 복사 후 스킬명만 수정
