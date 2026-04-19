# Backend Guide

백엔드 API · 서버 작업 시 따르는 가이드.

---

## API 설계 원칙

- RESTful 컨벤션 준수: 리소스는 명사, 행위는 HTTP 메서드로
- URL은 소문자 + 하이픈: `/user-profiles` (카멜케이스 금지)
- 버전 prefix 사용: `/api/v1/...`
- 응답은 항상 일관된 구조 유지:

```ts
// 성공
{ data: T, message?: string }

// 실패
{ error: { code: string, message: string } }
```

## 에러 처리 규칙

- 모든 async 핸들러는 try-catch 또는 에러 미들웨어로 처리
- HTTP 상태코드를 의미에 맞게 사용:
  - `400` 잘못된 요청, `401` 미인증, `403` 권한 없음
  - `404` 리소스 없음, `409` 충돌, `422` 유효성 실패
  - `500` 서버 내부 오류
- 클라이언트에 스택 트레이스 노출 금지

## 인증 / 보안

- JWT는 `httpOnly` 쿠키에 저장 (localStorage 금지)
- 민감 정보는 반드시 환경변수 — 코드에 하드코딩 절대 금지
- 입력값은 서버에서 반드시 재검증 (클라이언트 검증만 믿지 않음)
- SQL/NoSQL 인젝션 방지: ORM/쿼리 빌더 사용, raw query 지양

## 코드 구조

```
src/
├── routes/      ← 라우터 정의만
├── controllers/ ← 요청/응답 처리
├── services/    ← 비즈니스 로직
├── models/      ← DB 스키마/모델
└── middlewares/ ← 공통 미들웨어
```

- 컨트롤러에 비즈니스 로직 작성 금지 — 반드시 서비스로 분리
- 서비스는 프레임워크에 의존하지 않도록 작성

## 금지 사항

- `console.log` 디버깅 코드 커밋 금지 (logger 사용)
- 동기 파일/네트워크 I/O 사용 금지
- 에러를 무시하는 빈 catch 블록 금지
