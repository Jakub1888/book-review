import { z } from 'zod';
import { protectedProcedure, publicProcedure, router } from '../../trpc';
import { Prisma } from '@prisma/client';
import { prisma } from '../../prisma';

const defaultPostSelect = Prisma.validator<Prisma.PostSelect>()({
	id: true,
	title: true,
	content: true,
	synopsis: true,
	author: true,
	createdAt: true,
	updatedAt: true,
});

export const postRouter = router({
	create: protectedProcedure
		.input(
			z.object({
				title: z.string(),
				content: z.string(),
				synopsis: z.string(),
				author: z.string(),
			})
		)
		.mutation(({ input }) =>
			prisma.post.create({
				data: {
					title: input.title,
					content: input.content,
					synopsis: input.synopsis,
					author: input.author,
				},
				select: defaultPostSelect,
			})
		),
	list: publicProcedure.query(() =>
		prisma.post.findMany({
			select: defaultPostSelect,
		})
	),
	single: publicProcedure
		.input(z.object({ title: z.string() }))
		.query(({ input }) => prisma.post.findFirst({ where: { title: input.title } })),
	update: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string(),
				content: z.string(),
				synopsis: z.string(),
				author: z.string(),
			})
		)
		.mutation(({ input }) =>
			prisma.post.update({
				data: {
					title: input.title,
					content: input.content,
					synopsis: input.synopsis,
					author: input.author,
				},
				where: { id: input.id },
			})
		),
	remove: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			})
		)
		.mutation(({ input }) =>
			prisma.post.delete({
				where: {
					id: input.id,
				},
			})
		),
});
