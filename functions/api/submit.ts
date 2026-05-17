interface Env {
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHAT_ID: string;
}

interface FormData {
  hospitalName: string;
  email: string;
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  };

  try {
    const body = await ctx.request.json<FormData>();
    const { hospitalName, email } = body;

    if (!hospitalName?.trim() || !email?.trim()) {
      return Response.json({ success: false, message: "필수 항목 누락" }, { status: 400, headers: corsHeaders });
    }

    const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

    const message = [
      "🏥 *AI 가시성 리포트 신청*",
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

    return Response.json({ success: true }, { headers: corsHeaders });
  } catch (e) {
    return Response.json({ success: false, message: "서버 오류" }, { status: 500, headers: corsHeaders });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
