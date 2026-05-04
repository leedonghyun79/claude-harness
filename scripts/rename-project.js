#!/usr/bin/env node
/**
 * rename-project.js
 *
 * 사용법:
 *   node scripts/rename-project.js <프로젝트명> [대상경로]
 *
 * 예시:
 *   node scripts/rename-project.js my-awesome-app
 *   node scripts/rename-project.js my-awesome-app ../projects/my-awesome-app
 *
 * 동작:
 *   1. harness-todo/ 폴더를 <프로젝트명>/ (또는 지정한 대상경로)으로 복사
 *   2. 복사된 폴더 내 모든 텍스트 파일에서 'harness-todo' → 프로젝트명 치환
 *   3. 복사된 폴더 내 모든 텍스트 파일에서 '{PROJECT_NAME}' → 프로젝트명 치환
 *   4. package.json의 "name" 필드를 프로젝트명으로 갱신
 */

const fs = require('fs');
const path = require('path');

// ─── 설정 ─────────────────────────────────────────────────────────────────────
const TEMPLATE_DIR_NAME = 'harness-todo';
const PLACEHOLDER_NAME  = '{PROJECT_NAME}';

// 텍스트 치환을 적용할 확장자 목록
const TEXT_EXTENSIONS = new Set([
  '.md', '.mdx', '.txt',
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
  '.json', '.jsonc',
  '.env', '.env.example', '.env.local',
  '.sh', '.bash',
  '.yaml', '.yml',
  '.css', '.scss',
  '.html',
  '.prisma',
  '.toml',
]);

// 복사에서 제외할 디렉터리
const SKIP_DIRS = new Set([
  'node_modules', '.next', '.git', 'dist', 'out', '.turbo',
  'coverage', '.nyc_output',
]);

// ─── 유틸 함수 ────────────────────────────────────────────────────────────────

/** 디렉터리를 재귀적으로 복사 (SKIP_DIRS 제외) */
function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const srcPath  = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/** 텍스트 파일 내 문자열을 치환 */
function replaceInFile(filePath, replacements) {
  const ext = path.extname(filePath).toLowerCase();
  const base = path.basename(filePath);

  // 확장자가 없는 파일은 이름으로 판단 (예: .gitignore, .prettierignore)
  const isText = TEXT_EXTENSIONS.has(ext) || base.startsWith('.');
  if (!isText) return;

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch {
    return; // 읽기 실패(바이너리 등) 시 스킵
  }

  let changed = false;
  for (const [from, to] of replacements) {
    const regex = new RegExp(escapeRegex(from), 'g');
    if (regex.test(content)) {
      content = content.replace(new RegExp(escapeRegex(from), 'g'), to);
      changed = true;
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

/** 디렉터리 내 모든 파일에 치환 적용 */
function replaceInDirRecursive(dir, replacements) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      replaceInDirRecursive(fullPath, replacements);
    } else {
      replaceInFile(fullPath, replacements);
    }
  }
}

/** 정규식 특수문자 이스케이프 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** 간단한 kebab-case 변환 (공백·언더스코어 → 하이픈) */
function toKebabCase(str) {
  return str
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-zA-Z0-9가-힣\-]/g, '')
    .toLowerCase();
}

// ─── 메인 ─────────────────────────────────────────────────────────────────────

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.log(`
사용법:  node scripts/rename-project.js <프로젝트명> [대상경로]

  <프로젝트명>   새 프로젝트의 이름 (필수)
  [대상경로]     복사될 목적지 경로 (기본값: ../<프로젝트명>)

예시:
  node scripts/rename-project.js my-shop
  node scripts/rename-project.js my-shop ../projects/my-shop
`);
    process.exit(0);
  }

  const rawName   = args[0];
  const kebabName = toKebabCase(rawName);

  // 스크립트는 claude-harness/ 루트에서 실행된다고 가정
  const scriptDir   = path.resolve(__dirname, '..');
  const templateSrc = path.join(scriptDir, TEMPLATE_DIR_NAME);

  if (!fs.existsSync(templateSrc)) {
    console.error(`❌ 템플릿 폴더를 찾을 수 없습니다: ${templateSrc}`);
    console.error(`   이 스크립트는 claude-harness/ 폴더 루트에서 실행해야 합니다.`);
    process.exit(1);
  }

  // 대상 경로 결정
  const destDir = args[1]
    ? path.resolve(args[1])
    : path.resolve(scriptDir, '..', kebabName);

  if (fs.existsSync(destDir)) {
    console.error(`❌ 대상 폴더가 이미 존재합니다: ${destDir}`);
    console.error(`   다른 이름을 사용하거나 기존 폴더를 삭제 후 재시도하세요.`);
    process.exit(1);
  }

  console.log(`\n🚀 프로젝트 초기화 시작`);
  console.log(`   템플릿  : ${templateSrc}`);
  console.log(`   대상    : ${destDir}`);
  console.log(`   이름    : ${kebabName}\n`);

  // 1. 복사
  console.log(`📁 [1/4] 템플릿 복사 중...`);
  copyDirRecursive(templateSrc, destDir);
  console.log(`   ✓ 완료`);

  // 2. 텍스트 치환 (harness-todo → 프로젝트명, {PROJECT_NAME} → 프로젝트명)
  const replacements = [
    [TEMPLATE_DIR_NAME, kebabName],
    [PLACEHOLDER_NAME,  rawName],         // {PROJECT_NAME}은 원본 이름으로
    ['my-app',          kebabName],       // package.json 기본 name 필드
  ];

  console.log(`✏️  [2/4] 파일 내용 치환 중...`);
  replaceInDirRecursive(destDir, replacements);
  console.log(`   ✓ 완료`);

  // 3. package.json name 필드 검증 & 갱신
  const pkgPath = path.join(destDir, 'package.json');
  if (fs.existsSync(pkgPath)) {
    console.log(`📦 [3/4] package.json 이름 갱신 중...`);
    try {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      pkg.name  = kebabName;
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
      console.log(`   ✓ name: "${kebabName}"`);
    } catch (e) {
      console.warn(`   ⚠️  package.json 파싱 실패 (수동 확인 필요): ${e.message}`);
    }
  } else {
    console.log(`📦 [3/4] package.json 없음 — 스킵`);
  }

  // 4. 안내
  console.log(`\n✅ [4/4] 완료!\n`);
  console.log(`다음 단계:`);
  console.log(`  cd ${path.relative(process.cwd(), destDir)}`);
  console.log(`  npm install`);
  console.log(`  cp .env.example .env.local   # 환경변수 설정`);
  console.log(`  npm run dev\n`);
  console.log(`그 다음 Claude Code에서:`);
  console.log(`  이 보일러플레이트로 ${rawName} 만들고 싶어. {간단한 설명}\n`);
}

main();
