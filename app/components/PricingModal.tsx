"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface Props {
  planName: string;
  label?: string;
  isPopular?: boolean;
}

export default function PricingModal({ planName, label = "문의하기", isPopular = false }: Props) {
  const [open, setOpen] = useState(false);
  const [hospitalName, setHospitalName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  function openModal() {
    setOpen(true);
    setStatus("idle");
    setHospitalName("");
    setEmail("");
  }

  function closeModal() {
    if (status === "loading") return;
    setOpen(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hospitalName, email, plan: planName }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setTimeout(() => setOpen(false), 2000);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      {/* 트리거 버튼 */}
      <button
        onClick={openModal}
        className="block w-full rounded-xl py-3 text-center text-sm font-bold transition-opacity hover:opacity-90"
        style={{
          background: isPopular ? "linear-gradient(135deg, #6366f1, #7c3aed)" : "transparent",
          border: isPopular ? "none" : "1px solid var(--border)",
          color: isPopular ? "#fff" : "var(--text)",
        }}
      >
        {label}
      </button>

      {/* 모달 오버레이 */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-8"
            style={{ background: "#16162a", border: "1px solid var(--border)" }}
          >
            {status === "success" ? (
              <div className="py-4 text-center">
                <div className="mb-3 text-4xl">✅</div>
                <div className="mb-2 text-lg font-bold" style={{ color: "#f1f5f9" }}>
                  문의가 접수됐습니다!
                </div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>
                  48시간 내로 연락드리겠습니다.
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--accent-light)" }}>
                      {planName} 패키지
                    </div>
                    <div className="mt-1 text-lg font-bold" style={{ color: "var(--text)" }}>
                      문의하기
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-2xl leading-none"
                    style={{ color: "var(--muted)" }}
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="병원명"
                      required
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                      className="w-full rounded-xl px-5 py-3.5 text-sm outline-none"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.6)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                  <div className="mb-5">
                    <input
                      type="email"
                      placeholder="이메일"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl px-5 py-3.5 text-sm outline-none"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(99,102,241,0.6)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)" }}
                  >
                    {status === "loading" ? "전송 중..." : "보내기"}
                  </button>
                  {status === "error" && (
                    <p className="mt-3 text-center text-xs" style={{ color: "#f87171" }}>
                      전송 실패. 잠시 후 다시 시도해 주세요.
                    </p>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
