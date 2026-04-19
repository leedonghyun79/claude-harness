# DB Guide

데이터베이스 스키마 · 쿼리 · 마이그레이션 작업 시 따르는 가이드.

---

## 스키마 설계 원칙

- 테이블명은 복수형 스네이크케이스: `user_profiles`, `order_items`
- PK는 항상 `id` (auto increment 또는 UUID)
- 생성/수정 시각 컬럼 기본 포함: `created_at`, `updated_at`
- 소프트 삭제가 필요하면 `deleted_at` 추가 (물리 삭제 지양)
- 외래키는 반드시 인덱스 생성

## Prisma 사용 규칙

```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- `@default(cuid())` 또는 `@default(uuid())` 사용 (auto increment는 분산 환경에서 지양)
- 관계 정의 시 양방향 명시
- `prisma migrate dev` — 개발 마이그레이션
- `prisma migrate deploy` — 프로덕션 적용 (절대 dev 명령 사용 금지)

## 쿼리 작성 규칙

- N+1 문제 방지: 관계 데이터는 `include` / `join`으로 한 번에 조회
- 페이지네이션은 cursor 방식 우선 (offset은 대용량에서 성능 저하)
- 집계 쿼리는 애플리케이션이 아닌 DB에서 처리
- 읽기 전용 쿼리가 많은 경우 Read Replica 분리 고려

## 마이그레이션 규칙

- 마이그레이션은 항상 **되돌릴 수 있게** 작성 (down migration 고려)
- 컬럼 삭제 전 단계: ① 코드에서 참조 제거 → ② 배포 → ③ 컬럼 삭제
- `NOT NULL` 컬럼 추가 시 기본값 또는 데이터 백필 먼저
- 프로덕션 마이그레이션 전 스테이징에서 반드시 검증

## 금지 사항

- ORM 없이 raw SQL에 사용자 입력 직접 삽입 (SQL injection)
- 프로덕션 DB에 직접 스키마 변경 (마이그레이션 파일 없이)
- 인덱스 없는 컬럼으로 대용량 테이블 full scan 쿼리
- `SELECT *` 남발 — 필요한 컬럼만 명시
