# DevOps Guide

배포 · CI/CD · 인프라 작업 시 따르는 가이드.

---

## 환경 구분 원칙

```
local → development → staging → production
```

- `staging`은 `production`과 동일한 구성으로 유지
- 프로덕션 배포 전 반드시 staging 검증
- 각 환경별 환경변수는 독립적으로 관리

## 환경변수 관리

- `.env` 파일은 절대 git에 커밋하지 않는다
- `.env.example`에 키 목록만 (값 없이) 커밋
- 프로덕션 시크릿은 Vercel / AWS Secrets Manager / GitHub Secrets에 저장
- 코드에 API 키, 비밀번호 하드코딩 절대 금지

```bash
# .env.example
DATABASE_URL=
NEXTAUTH_SECRET=
STRIPE_SECRET_KEY=
```

## CI/CD 파이프라인 (GitHub Actions 기준)

```yaml
# 기본 파이프라인 순서
on: [push, pull_request]
jobs:
  1. lint        ← 코드 스타일 검사
  2. type-check  ← TypeScript 타입 오류 검사
  3. test        ← 유닛/통합 테스트
  4. build       ← 빌드 가능 여부 확인
  5. deploy      ← main 브랜치만 자동 배포
```

- PR 머지 전 모든 체크 통과 필수
- `main` 브랜치 직접 push 금지 — PR을 통해서만 머지

## Vercel 배포 규칙

- `main` → production 자동 배포
- PR 생성 → preview 배포 자동 생성
- 환경변수는 Vercel 대시보드에서 관리 (코드에 없음)
- `vercel.json`으로 리다이렉트/헤더/함수 설정

## Docker 사용 규칙

```dockerfile
# 멀티 스테이지 빌드 사용
FROM node:20-alpine AS builder
# ...빌드

FROM node:20-alpine AS runner
# 빌드 결과물만 복사
```

- `latest` 태그 사용 금지 — 항상 버전 고정
- 이미지에 비밀 정보 포함 금지 (빌드 arg로도 금지)
- `.dockerignore`로 불필요한 파일 제외

## 배포 체크리스트

- [ ] 환경변수 모두 설정 확인
- [ ] DB 마이그레이션 적용 확인
- [ ] 빌드 성공 확인
- [ ] staging 환경 동작 확인
- [ ] 롤백 방법 준비 (이전 버전 태그 또는 Vercel instant rollback)

## 금지 사항

- 프로덕션 서버에 직접 ssh 접속 후 코드 수정
- 테스트 실패 상태로 프로덕션 배포
- 환경변수 없이 배포 시도
- `--force` push로 CI 우회
