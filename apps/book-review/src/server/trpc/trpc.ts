import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './context';

const t = initTRPC.context<Context>().create({});
export const middleware = t.middleware;

const isAuthenticated = middleware((opts) => {
  const { ctx } = opts;
  if (!ctx.user?.isAdmin) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return opts.next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);
export const router = t.router;
