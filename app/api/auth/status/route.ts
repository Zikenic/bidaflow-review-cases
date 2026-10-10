import { currentUser, queryOne, responseError } from "@/lib/server";

export async function GET(request: Request) {
  try {
    const count = await queryOne<{ count: number }>("SELECT COUNT(*) AS count FROM users");
    return Response.json({ initialized: Number(count?.count ?? 0) > 0, user: await currentUser(request) });
  } catch (error) { return responseError(error); }
}
