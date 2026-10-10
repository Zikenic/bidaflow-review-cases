import { assertSameOrigin, audit, clearAuthCookie, currentUser, deleteSession, responseError } from "@/lib/server";

export async function POST(request: Request) {
  try {
    assertSameOrigin(request);
    const user = await currentUser(request);
    await deleteSession(request);
    if (user) await audit(request, user.id, "LOGOUT", "USER", user.id, "Đăng xuất hệ thống");
    return Response.json({ ok: true }, { headers: { "Set-Cookie": clearAuthCookie() } });
  } catch (error) { return responseError(error); }
}
