import ContactForm from "./components/ContactForm";
import PricingModal from "./components/PricingModal";

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: "var(--bg)" }}>
      <Hero />
      <DataSection />
      <SampleReport />
      <Pricing />
      <Footer />
    </main>
  );
}

/* ── 1. Hero ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-20 text-center">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        <span
          className="mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
          style={{
            background: "rgba(99,102,241,0.15)",
            border: "1px solid rgba(99,102,241,0.3)",
            color: "var(--accent-light)",
          }}
        >
          2026년 5월 기준 최신 데이터
        </span>

        <h1
          className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-6xl"
          style={{ color: "var(--text)" }}
        >
          강남 피부과·성형외과{" "}
          <span className="whitespace-nowrap">
            <span className="gradient-text">867개</span> 중
          </span>
          <br />
          ChatGPT가 추천하는 곳은{" "}
          <span className="gradient-text">61개</span>
        </h1>

        <p className="mb-3 text-2xl font-bold" style={{ color: "#f1f5f9" }}>
          귀원은 지금 어느 쪽인가요?
        </p>
        <p className="mb-10 text-base leading-relaxed" style={{ color: "var(--muted)" }}>
          ChatGPT · Perplexity에서 강남 피부과 관련 질문 30개를 분석했습니다.
          <br />
          병원마다 노출 패턴이 크게 다릅니다. 귀원의 현황을 무료로 확인해 드립니다.
        </p>

        <ContactForm />
      </div>
    </section>
  );
}

/* ── 2. Data Section ─────────────────────────────────────── */
function DataSection() {
  const stats = [
    { value: "867개", label: "강남·서초 피부과·성형외과", sub: "건강보험심사평가원 2025-12-31" },
    { value: "7%", label: "AI에 노출되는 비율", sub: "ChatGPT + Perplexity 기준" },
    { value: "93%", label: "AI에 노출 안 되는 병원", sub: "귀원이 여기일 가능성" },
  ];

  const topClinics = [
    { rank: 1, name: "압구정 서울피부과", count: 9, pct: 3.6 },
    { rank: 2, name: "뷰성형외과", count: 7, pct: 2.8 },
    { rank: 3, name: "압구정 서울클리닉", count: 6, pct: 2.4 },
    { rank: 4, name: "BIO성형외과", count: 6, pct: 2.4 },
    { rank: 5, name: "고운세상피부과", count: 5, pct: 2.0 },
  ];

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2
            className="mb-3 text-3xl font-extrabold md:text-4xl"
            style={{ color: "var(--text)" }}
          >
            AI 추천, 특정 병원에 집중됩니다
          </h2>
          <p style={{ color: "var(--muted)" }}>
            30개 질문에서 나온 248회 언급 중, 상위 10개 병원이 전체의 20%를 독식합니다.
          </p>
        </div>

        <div className="mb-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl p-8 text-center"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="mb-2 text-5xl font-extrabold gradient-text">{s.value}</div>
              <div className="mb-1 font-semibold" style={{ color: "var(--text)" }}>{s.label}</div>
              <div className="text-xs" style={{ color: "var(--muted)" }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div
          className="rounded-2xl p-8"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <h3 className="mb-6 text-lg font-bold" style={{ color: "var(--text)" }}>
            ChatGPT 상위 노출 병원 (2026년 5월 기준)
          </h3>
          <div className="space-y-3">
            {topClinics.map((c) => (
              <div key={c.rank} className="flex items-center gap-4">
                <span
                  className="w-7 text-center text-sm font-bold"
                  style={{ color: c.rank <= 3 ? "var(--accent-light)" : "var(--muted)" }}
                >
                  {c.rank}
                </span>
                <span className="flex-1 text-sm font-medium" style={{ color: "var(--text)" }}>
                  {c.name}
                </span>
                <div className="flex items-center gap-3">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${c.pct * 20}px`,
                      background:
                        c.rank <= 3
                          ? "linear-gradient(90deg, #6366f1, #a78bfa)"
                          : "var(--border)",
                      minWidth: "8px",
                    }}
                  />
                  <span className="w-10 text-right text-xs" style={{ color: "var(--muted)" }}>
                    {c.count}회
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs" style={{ color: "var(--muted)" }}>
            * 질문 30개 / 총 언급 248회 / 고유 병원 180개 분석 결과
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── 3. Sample Report ────────────────────────────────────── */
function SampleReport() {
  const items = [
    { icon: "📊", title: "AI 노출 현황 요약", desc: "ChatGPT·Perplexity 질문 30개에서 귀원 언급 횟수 및 순위" },
    { icon: "🔍", title: "질문 유형별 분석", desc: "추천형·가격형·후기형·지역형 등 6개 유형에서의 노출 패턴" },
    { icon: "⚡", title: "경쟁 병원 비교", desc: "동일 지역·과목 상위 노출 병원과의 포지션 비교" },
    { icon: "💡", title: "AI 노출 영향 요인 분석", desc: "상위 노출 병원과 비교한 온라인 존재감 차이 분석" },
  ];

  return (
    <section className="px-6 py-20" style={{ background: "rgba(255,255,255,0.01)" }}>
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2
            className="mb-3 text-3xl font-extrabold md:text-4xl"
            style={{ color: "var(--text)" }}
          >
            진단 리포트에 담기는 내용
          </h2>
          <p style={{ color: "var(--muted)" }}>
            귀원 맞춤으로 분석된 10페이지 AI 가시성 진단서입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 rounded-2xl p-6"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <span className="text-3xl">{item.icon}</span>
              <div>
                <div className="mb-1 font-bold" style={{ color: "var(--text)" }}>{item.title}</div>
                <div className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="mt-8 rounded-2xl p-8"
          style={{
            background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(124,58,237,0.05))",
            border: "1px solid rgba(99,102,241,0.2)",
          }}
        >
          <div className="mb-4 text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent-light)" }}>
            샘플 리포트 발췌
          </div>
          <div className="font-mono text-sm leading-loose" style={{ color: "#94a3b8" }}>
            <div><span style={{ color: "var(--accent-light)" }}>병원명</span>{"  "}강남고운세상피부과</div>
            <div><span style={{ color: "var(--accent-light)" }}>AI 노출 횟수</span>{"  "}ChatGPT 0회 / Perplexity 0회</div>
            <div><span style={{ color: "var(--accent-light)" }}>지역 내 순위</span>{"  "}806개 중 노출 없음 (하위 93%)</div>
            <div><span style={{ color: "var(--accent-light)" }}>핵심 발견</span>{"  "}&apos;강남 피부과 추천&apos; 질문에서 경쟁 5개 병원이 반복 등장</div>
            <div><span style={{ color: "var(--accent-light)" }}>영향 요인</span>{"  "}상위 노출 병원 대비 네이버 플레이스·리뷰 언급 수 차이 큼</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 4. Pricing ──────────────────────────────────────────── */
function Pricing() {
  const plans = [
    {
      name: "스냅샷",
      price: "290,000",
      unit: "1회",
      tag: null,
      desc: "지금 당장 AI 노출 현황이 궁금할 때",
      features: [
        "ChatGPT + Perplexity 30개 질문 전수 분석",
        "질문 유형별 노출 패턴 리포트",
        "경쟁 병원 대비 현재 포지션",
        "AI 노출 영향 요인 분석",
        "PDF 리포트 (10페이지)",
      ],
    },
    {
      name: "모니터",
      price: "150,000",
      unit: "월",
      tag: "인기",
      desc: "매월 변화를 추적하고 싶을 때",
      features: [
        "매월 스냅샷 업데이트",
        "전월 대비 변화 추이 그래프",
        "신규 AI 플랫폼 추가 (분기 업데이트)",
        "전월 대비 순위 변화 추적",
        "이메일 월간 리포트",
      ],
    },
    {
      name: "번들",
      price: "390,000",
      unit: "3개월",
      tag: "최저가",
      desc: "스냅샷 + 3개월 모니터링 세트",
      features: [
        "스냅샷 전체 포함",
        "3개월 모니터링 포함",
        "₩160,000 절약",
        "개선 실험 설계 1회 지원",
        "전화 상담 30분 포함",
      ],
    },
  ];

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2
            className="mb-3 text-3xl font-extrabold md:text-4xl"
            style={{ color: "var(--text)" }}
          >
            요금제
          </h2>
          <p style={{ color: "var(--muted)" }}>
            먼저 무료 상담으로 현황을 확인하신 후 결정하셔도 됩니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => {
            const isPopular = plan.tag === "인기";
            return (
              <div
                key={plan.name}
                className="relative flex flex-col rounded-2xl p-7"
                style={{
                  background: isPopular
                    ? "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(124,58,237,0.1))"
                    : "var(--surface)",
                  border: isPopular ? "1px solid rgba(99,102,241,0.5)" : "1px solid var(--border)",
                }}
              >
                {plan.tag && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold"
                    style={{
                      background: isPopular
                        ? "linear-gradient(135deg, #6366f1, #7c3aed)"
                        : "rgba(99,102,241,0.2)",
                      color: "#fff",
                    }}
                  >
                    {plan.tag}
                  </span>
                )}

                <div className="mb-2 text-lg font-bold" style={{ color: "var(--text)" }}>{plan.name}</div>
                <div className="mb-1 flex items-end gap-1">
                  <span
                    className="text-3xl font-extrabold"
                    style={{ color: isPopular ? "var(--accent-light)" : "var(--text)" }}
                  >
                    ₩{plan.price}
                  </span>
                  <span className="mb-1 text-sm" style={{ color: "var(--muted)" }}>/{plan.unit}</span>
                </div>
                <p className="mb-6 text-sm" style={{ color: "var(--muted)" }}>{plan.desc}</p>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span style={{ color: "var(--accent-light)" }}>✓</span>
                      <span style={{ color: "#cbd5e1" }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <PricingModal planName={plan.name} isPopular={isPopular} />
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm" style={{ color: "var(--muted)" }}>
          결제 전 위 상단 무료 상담으로 먼저 현황을 확인하실 수 있습니다.
        </p>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────────────────── */
function Footer() {
  return (
    <footer
      className="px-6 py-10 text-center text-xs"
      style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
    >
      <p className="mb-1 font-semibold" style={{ color: "var(--text)" }}>AI 가시성 감사</p>
      <p>
        문의:{" "}
        <a href="mailto:factorygo.dev@gmail.com" style={{ color: "var(--accent-light)" }}>
          factorygo.dev@gmail.com
        </a>
      </p>
      <p className="mt-3">© 2026 AI Visibility Audit · 데이터 출처: 건강보험심사평가원, ChatGPT, Perplexity</p>
    </footer>
  );
}
