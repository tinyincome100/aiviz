"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error" | "duplicate";

export default function ContactForm() {
  const [hospitalName, setHospitalName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hospitalName, email }),
      });

      const data = await res.json();
      if (data.success) setStatus("success");
      else if (data.duplicate) setStatus("duplicate");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className="mx-auto w-full max-w-md rounded-2xl p-8 text-center"
        style={{
          background: "rgba(99,102,241,0.1)",
          border: "1px solid rgba(99,102,241,0.3)",
        }}
      >
        <div className="mb-3 text-4xl">✅</div>
        <div className="mb-2 text-lg font-bold" style={{ color: "#f1f5f9" }}>
          상담 신청이 완료됐습니다!
        </div>
        <div className="text-sm" style={{ color: "var(--muted)" }}>
          48시간 내로{" "}
          <span style={{ color: "var(--accent-light)" }}>{email}</span>로
          연락 드리겠습니다.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md">
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

      <div className="mb-4">
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
        className="glow-pulse w-full rounded-xl py-4 text-base font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)" }}
      >
        {status === "loading" ? "전송 중..." : "무료 상담 신청 →"}
      </button>

      {status === "duplicate" && (
        <p className="mt-3 text-center text-sm" style={{ color: "#facc15" }}>
          이미 신청하신 이메일입니다. 리포트를 확인해 주세요.
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-center text-sm" style={{ color: "#f87171" }}>
          전송 실패. 잠시 후 다시 시도해 주세요.
        </p>
      )}

      <p className="mt-3 text-center text-xs" style={{ color: "var(--muted)" }}>
        비용 없음 · 영업 전화 없음
      </p>
    </form>
  );
}
