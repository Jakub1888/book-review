import { z } from 'zod';
import { publicProcedure, router } from '../../trpc';
import { Prisma } from '@prisma/client';
import { prisma } from '../../prisma';

const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
	id: true,
	title: true,
	content: true,
	synopsis: true,
	imageUrl: true,
	author: true,
	createdAt: true,
	updatedAt: true,
});

export const postRouter = router({
	list: publicProcedure.query(() =>
		prisma.post.findMany({
			select: defaultPostSelect,
			orderBy: {
				createdAt: 'desc',
			},
		})
	),
	single: publicProcedure
		.input(z.object({ title: z.string() }))
		.query(({ input }) => prisma.post.findFirst({ where: { title: input.title } })),
});
