export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="font-mono text-sm tracking-widest text-primary uppercase">
          Harness Boilerplate
        </span>
        <h1 className="font-display text-5xl font-bold tracking-tight">
          {'{PROJECT_NAME}'}
        </h1>
        <p className="max-w-md text-muted-foreground">
          하네스 엔지니어링 보일러플레이트. <br />
          <code className="font-mono text-sm text-primary">CLAUDE.md</code>와{' '}
          <code className="font-mono text-sm text-primary">AGENTS.md</code>를 수정해 시작하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: '스펙 정의', href: 'docs/product-specs/index.md', desc: '기능 요구사항 작성' },
          { label: 'exec-plan', href: 'docs/exec-plans/', desc: '실행 계획 → 슬라이스 분해' },
          { label: '교훈 기록', href: 'skills/lessons-learned.md', desc: 'Compound Engineering' },
        ].map(({ label, href, desc }) => (
          <div
            key={href}
            className="rounded border border-border bg-card p-4 text-left"
          >
            <p className="font-mono text-xs text-primary">{label}</p>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
            <p className="mt-2 font-mono text-xs text-foreground/40">{href}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
