interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_KEY: string;
}

interface Body {
  hospitalName: string;
  email: string;
  plan?: string;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
};

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  try {
    const { hospitalName, email, plan } = await ctx.request.json<Body>();

    if (!hospitalName?.trim() || !email?.trim()) {
      return Response.json({ success: false, message: "필수 항목 누락" }, { status: 400, headers: CORS });
    }

    const type = plan ? "inquiry" : "free_report";

    // 무료 리포트는 이메일 중복 체크
    if (type === "free_report") {
      const checkRes = await fetch(
        `${ctx.env.SUPABASE_URL}/rest/v1/report_requests?email=eq.${encodeURIComponent(email)}&type=eq.free_report&select=id`,
        {
          headers: {
            apikey: ctx.env.SUPABASE_SERVICE_KEY,
            Authorization: `Bearer ${ctx.env.SUPABASE_SERVICE_KEY}`,
          },
        }
      );
      const existing = await checkRes.json<{ id: string }[]>();
      if (existing.length > 0) {
        return Response.json(
          { success: false, duplicate: true, message: "이미 신청하신 이메일입니다." },
          { status: 409, headers: CORS }
        );
      }
    }

    // Supabase에 저장
    await fetch(`${ctx.env.SUPABASE_URL}/rest/v1/report_requests`, {
      method: "POST",
      headers: {
        apikey: ctx.env.SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${ctx.env.SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ hospital_name: hospitalName, email, plan: plan ?? null, type }),
    });

    // 텔레그램 알림
    const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
    const message = [
      type === "inquiry" ? `💰 *[${plan} 패키지] 문의*` : "🏥 *무료 리포트 신청*",
      "",
      `병원명: ${hospitalName}`,
      `이메일: ${email}`,
      `시간: ${now}`,
    ].join("\n");

    await fetch(`https://api.telegram.org/bot${ctx.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: ctx.env.TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    return Response.json({ success: true }, { headers: CORS });
  } catch {
    return Response.json({ success: false, message: "서버 오류" }, { status: 500, headers: CORS });
  }
};

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
