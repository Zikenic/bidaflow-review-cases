import {
  AppError, assertSameOrigin, audit, authCookie, createSession, normalizeEmail,
  queryOne, responseError, verifyPassword,
} from "@/lib/server";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const body = await request.json() as Record<string, string>;
    const identity = normalizeEmail(String(body.identity ?? ""));
    const row = await queryOne<{ id: string; email: string; password_hash: string; password_salt: string; status: string }>(
      "SELECT id, email, password_hash, password_salt, status FROM users WHERE lower(email) = ? OR lower(username) = ?", identity, identity,
    );
    if (!row || !(await verifyPassword(String(body.password ?? ""), row.password_salt, row.password_hash))) {
      throw new AppError("Email/tên đăng nhập hoặc mật khẩu không đúng.", 401);
    }
    if (row.status !== "ACTIVE") throw new AppError("Tài khoản đang bị khóa. Vui lòng liên hệ quản lý.", 403);
    const token = await createSession(row.id);
    await queryOne("UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ? RETURNING id", row.id);
    await audit(request, row.id, "LOGIN", "USER", row.id, "Đăng nhập hệ thống");
    return Response.json({ ok: true }, { headers: { "Set-Cookie": authCookie(token) } });
  } catch (error) { return responseError(error); }
}
