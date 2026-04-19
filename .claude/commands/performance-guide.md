# Performance Guide

성능 측정 · 최적화 작업 시 따르는 가이드.

---

## 원칙: 측정 먼저, 최적화 나중

- 추측으로 최적화하지 않는다 — 먼저 **병목 지점을 측정**한다
- Lighthouse / DevTools Performance 탭으로 수치 확인 후 작업
- 최적화 전/후 수치를 반드시 비교한다

## 핵심 지표 (Core Web Vitals)

| 지표 | 의미 | 목표 |
|------|------|------|
| LCP | 최대 콘텐츠 렌더링 시간 | < 2.5s |
| FID / INP | 첫 입력 지연 | < 100ms |
| CLS | 누적 레이아웃 이동 | < 0.1 |
| TTFB | 첫 바이트 수신 시간 | < 800ms |

## 프론트엔드 최적화

### 이미지
- `next/image` 또는 `<img loading="lazy">` 사용
- WebP/AVIF 포맷 우선
- 명시적 width/height 지정 (CLS 방지)

### 번들 최적화
- 동적 import로 코드 스플리팅: `const X = dynamic(() => import('./X'))`
- 사용하지 않는 라이브러리 제거 (bundle-analyzer 확인)
- 트리 쉐이킹 가능한 named export 사용

### 렌더링
- 리스트는 가상화(virtualization) 적용 (100개 이상)
- `useMemo` / `useCallback`은 실제 비용이 있을 때만 사용
- 불필요한 리렌더링: React DevTools Profiler로 확인

## 백엔드 최적화

- DB 쿼리 N+1 문제: `include` / `join` 으로 해결
- 응답 캐싱: 자주 바뀌지 않는 데이터는 Redis / in-memory cache
- 페이지네이션: cursor 방식 (offset은 대용량 테이블에서 느림)
- 무거운 작업(이메일, 파일 처리)은 백그라운드 큐로 분리

## 캐싱 전략

```
브라우저 캐시 → CDN 캐시 → 서버 캐시 → DB 캐시
```

- 정적 자산: `Cache-Control: max-age=31536000, immutable`
- API 응답: 데이터 특성에 맞게 `stale-while-revalidate` 활용
- 캐시 무효화 전략을 캐싱 도입 전에 먼저 설계

## 금지 사항

- 수치 확인 없이 "느릴 것 같아서" 최적화
- 가독성을 크게 해치는 마이크로 최적화
- 모든 함수에 `useMemo` / `useCallback` 남발
