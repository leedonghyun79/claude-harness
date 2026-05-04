# 아키텍처

> 프로젝트에 맞게 이 파일을 업데이트하세요.

## 개요
{프로젝트 설명을 여기에 작성}

## 디렉터리 구조
```
{PROJECT_NAME}/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 루트 레이아웃
│   ├── page.tsx            # 홈 페이지
│   └── globals.css         # 전역 스타일 + 디자인 토큰
├── components/
│   ├── ui/                 # shadcn/ui 기본 컴포넌트
│   └── {feature}/          # 기능별 컴포넌트
├── store/                  # Zustand 스토어 (필요 시)
├── types/                  # TypeScript 타입
├── lib/
│   └── utils.ts            # cn() 및 공통 유틸리티
├── skills/
│   └── lessons-learned.md  # Compound Engineering 교훈 레지스트리
├── docs/                   # 기록 시스템
├── scripts/                # verify, preflight, agent-task
└── .github/
    ├── workflows/ci.yml
    └── pull_request_template.md
```

## 데이터 흐름
```
{데이터 흐름을 여기에 다이어그램으로 작성}
```

## 주요 제약 사항
- TypeScript strict 모드 활성화
- 서버 컴포넌트 우선, `"use client"`는 필요할 때만
- {프로젝트별 제약 사항 추가}

## 향후 확장 포인트
- {v2 계획 등 확장 포인트 작성}
