import * as trpcNext from '@trpc/server/adapters/next';
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  async function getUserFromHeader() {
    console.log(req.headers);
    const user = { isAdmin: false };
    if (req.headers.authorization) {
      //   await decodeAndVerifyJwtToken(req.headers.authorization.split(' ')[1]);
    }
    return user;
    // return null;
  }
  const user = await getUserFromHeader();
  return {
    user,
  };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
