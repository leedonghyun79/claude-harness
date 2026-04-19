const chunks = [];
process.stdin.on('data', d => chunks.push(d));
process.stdin.on('end', () => {
  let prompt = '';
  try {
    const data = JSON.parse(Buffer.concat(chunks).toString());
    prompt = data.prompt || '';
  } catch {
    process.exit(0);
  }

  const messages = [];

  // 기획 / PRD / 설계
  if (/기획|PRD|설계|요구사항|스펙|spec|플로우|flow|와이어|wireframe|유저스토리|user story|기능정의|시나리오|아키텍처|architecture/i.test(prompt)) {
    messages.push('[가이드] 기획/설계 작업 감지 → /planning-guide 스킬 참고 권장');
  }

  // 프론트엔드
  if (/컴포넌트|스타일|UI|프론트|페이지|레이아웃|디자인|css|html|tailwind|react|next|shadcn|애니메이션|반응형|인터페이스|화면|뷰/i.test(prompt)) {
    messages.push('[가이드] 프론트엔드 작업 감지 → /frontend-design 스킬 참고 권장');
  }

  // 백엔드
  if (/API|서버|라우트|백엔드|엔드포인트|endpoint|route|server|express|fastapi|미들웨어|middleware|인증|auth|토큰|token/i.test(prompt)) {
    messages.push('[가이드] 백엔드 작업 감지 → /backend-guide 스킬 참고 권장');
  }

  // 데이터베이스
  if (/쿼리|테이블|마이그레이션|DB|데이터베이스|database|migration|schema|prisma|sql|supabase|인덱스|index/i.test(prompt)) {
    messages.push('[가이드] DB 작업 감지 → /db-guide 스킬 참고 권장');
  }

  // 버그 / 테스팅 / QA
  if (/버그|bug|오류|에러|error|디버그|debug|테스트|test|QA|검증|수정|fix|문제|이슈|issue|실패|fail|깨지|broken/i.test(prompt)) {
    messages.push('[가이드] 버그/테스팅 작업 감지 → /qa-guide 스킬 참고 권장');
  }

  // 성능 / 최적화
  if (/성능|최적화|optimize|느리|속도|loading|lighthouse|번들|bundle|캐시|cache|메모리|memory|렌더링/i.test(prompt)) {
    messages.push('[가이드] 성능 최적화 작업 감지 → /performance-guide 스킬 참고 권장');
  }

  // 배포 / DevOps / CI·CD
  if (/배포|deploy|빌드|build|CI|CD|docker|컨테이너|container|인프라|infra|vercel|AWS|클라우드|cloud|환경변수|env/i.test(prompt)) {
    messages.push('[가이드] 배포/DevOps 작업 감지 → /devops-guide 스킬 참고 권장');
  }

  if (messages.length > 0) {
    process.stdout.write(JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'UserPromptSubmit',
        additionalContext: messages.join('\n')
      }
    }));
  }
});
