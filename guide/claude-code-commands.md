# Claude Code 명령어 완전 가이드

## 슬래시 커맨드 (`/`)

> 세션 중 `/` 만 입력하면 현재 사용 가능한 커맨드 목록이 전부 표시됨

### 세션 관리
| 커맨드 | 설명 |
|--------|------|
| `/clear` | 새 대화 시작 |
| `/continue` | 이전 대화 복구 |
| `/resume [ID]` | 특정 세션 복구 |
| `/branch [name]` | 현재 지점에서 새 대화 분기 |
| `/compact [instructions]` | 대화 압축 (context 절약) |
| `/rewind` | 이전 상태로 되감기 (`/checkpoint`, `/undo` 동일) |
| `/rename [name]` | 세션 이름 변경 |
| `/fork` | 현재 세션 분기 (`/branch` 동일) |

### 코드 & 작업
| 커맨드 | 설명 |
|--------|------|
| `/init` | 프로젝트 CLAUDE.md 초기화 |
| `/plan [description]` | 계획 모드 진입 |
| `/review [PR]` | PR 로컬 리뷰 |
| `/ultrareview [PR]` | 클라우드 기반 심층 다중 에이전트 리뷰 |
| `/ultraplan` | 클라우드에서 계획 수립 후 실행 |
| `/security-review` | 보안 취약점 분석 (현재 브랜치 diff 기준) |
| `/simplify [focus]` | 코드 품질, 재사용성, 효율성 검토 후 개선 |
| `/batch <instruction>` | 대규모 변경을 병렬로 처리 |
| `/autofix-pr` | PR 자동 수정 (CI 실패 / 리뷰 코멘트 감시) |

### Superpowers 스킬 (설치 필요: `superpowers@claude-plugins-official`)
| 커맨드 | 설명 |
|--------|------|
| `/brainstorm` | 아이디어 정제 + 설계 문서 생성 |
| `/write-plan` | 2~5분 단위 작업 계획 작성 |

### 디버깅 & 진단
| 커맨드 | 설명 |
|--------|------|
| `/debug [description]` | 디버그 로깅 활성화 |
| `/doctor` | 설치 및 설정 진단 |
| `/diff` | 미커밋 변경사항 확인 |
| `/context` | 현재 context 사용량 시각화 |

### 설정 & 권한
| 커맨드 | 설명 |
|--------|------|
| `/config` | 설정 인터페이스 열기 |
| `/model [model]` | AI 모델 선택/변경 |
| `/effort [level]` | effort level 조정 (low, medium, high, xhigh, max) |
| `/fast [on\|off]` | 빠른 모드 토글 |
| `/permissions` | 도구 권한 규칙 관리 |
| `/theme` | 색상 테마 변경 |

### 메모리 & 정보
| 커맨드 | 설명 |
|--------|------|
| `/memory` | CLAUDE.md 메모리 파일 편집 |
| `/cost` | 토큰 사용량 통계 |
| `/usage` | 요금제 한도 및 rate limit 상태 |
| `/stats` | 일일 사용량, 세션 기록 시각화 |
| `/export [filename]` | 대화를 텍스트로 export |
| `/recap` | 현재 세션 한 줄 요약 |
| `/insights` | 세션 분석 리포트 |

### IDE & 환경
| 커맨드 | 설명 |
|--------|------|
| `/ide` | IDE 통합 관리 |
| `/terminal-setup` | 터미널 단축키 설정 |
| `/keybindings` | 단축키 설정 파일 열기 |
| `/voice` | 음성 받아쓰기 토글 |

### MCP & 플러그인
| 커맨드 | 설명 |
|--------|------|
| `/mcp` | MCP 서버 연결 및 OAuth 관리 |
| `/plugin` | 플러그인 관리 |
| `/reload-plugins` | 플러그인 다시 로드 (재시작 없이) |
| `/agents` | 서브에이전트 설정 관리 |

### 원격 & 웹
| 커맨드 | 설명 |
|--------|------|
| `/remote-control` | 이 세션을 claude.ai에서 제어 가능하게 설정 (`/rc` 동일) |
| `/teleport` | claude.ai 웹 세션을 터미널로 가져오기 (`/tp` 동일) |

### 기타
| 커맨드 | 설명 |
|--------|------|
| `/help` | 도움말 |
| `/exit` | CLI 종료 (`/quit` 동일) |
| `/version` | 버전 확인 |
| `/status` | 버전, 모델, 계정 정보 확인 |
| `/feedback` | 피드백 제출 (`/bug` 동일) |
| `/release-notes` | 변경 사항 보기 |
| `/loop [interval] [prompt]` | 프롬프트 반복 실행 |
| `/schedule` | 정기적인 작업 생성/관리 |
| `/tasks` | 백그라운드 작업 관리 |
| `/btw <question>` | 사이드 질문 (대화 context 추가 없이) |
| `/focus` | 마지막 프롬프트와 최종 응답만 보기 |
| `/copy [N]` | 마지막 응답을 클립보드에 복사 |

---

## CLI 플래그 (터미널에서 `claude` 실행 시)

### 기본 실행
```bash
claude                          # 대화형 세션 시작
claude "질문"                   # 초기 프롬프트와 함께 시작
claude -p "질문"                # 출력만 하고 종료 (SDK 모드)
cat file | claude -p "질문"    # 파이프 입력 처리
claude -c                       # 가장 최근 대화 복구
claude -r "<session>" "질문"   # 특정 세션 재개
```

### 주요 플래그
| 플래그 | 설명 |
|--------|------|
| `--model` | AI 모델 지정 (예: `sonnet`, `opus`, `claude-sonnet-4-6`) |
| `--effort` | effort level (low, medium, high, xhigh, max) |
| `--continue, -c` | 가장 최근 대화 복구 |
| `--resume, -r` | 특정 세션 ID/이름으로 복구 |
| `--print, -p` | 대화형 모드 없이 응답 출력 |
| `--debug` | 디버그 모드 |
| `--verbose` | 상세 로깅 |
| `--add-dir` | 추가 작업 디렉토리 접근 권한 |
| `--worktree, -w` | git worktree에서 격리된 환경 실행 |
| `--permission-mode` | 권한 모드 (default, acceptEdits, plan, auto, bypassPermissions) |
| `--allowedTools` | 권한 확인 없이 실행할 도구 지정 |
| `--disallowedTools` | 사용 불가 도구 지정 |
| `--mcp-config` | MCP 서버 JSON 파일 로드 |
| `--system-prompt` | 기본 시스템 프롬프트 교체 |
| `--append-system-prompt` | 기본 프롬프트에 텍스트 추가 |
| `--max-turns` | 최대 agentic turns 수 제한 |
| `--max-budget-usd` | API 호출 최대 비용 설정 |
| `--output-format` | 출력 형식 (text, json, stream-json) |
| `--version, -v` | 버전 번호 출력 |
| `--help, -h` | 도움말 |

### 인증
```bash
claude auth login      # 로그인
claude auth logout     # 로그아웃
claude auth status     # 인증 상태 확인
claude update          # 최신 버전으로 업데이트
```
