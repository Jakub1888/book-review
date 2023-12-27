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
	create: publicProcedure
		.input(
			z.object({
				title: z.string(),
				content: z.string(),
				synopsis: z.string(),
				author: z.string(),
				imageUrl: z.string(),
			})
		)
		.mutation(({ input }) =>
			prisma.post.create({
				data: {
					title: input.title,
					content: input.content,
					synopsis: input.synopsis,
					author: input.author,
					imageUrl: input.imageUrl,
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
	update: publicProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string(),
				content: z.string(),
				synopsis: z.string(),
				imageUrl: z.string(),
				author: z.string(),
			})
		)
		.mutation(({ input }) =>
			prisma.post.update({
				data: {
					title: input.title,
					content: input.content,
					synopsis: input.synopsis,
					imageUrl: input.imageUrl,
					author: input.author,
				},
				where: { id: input.id },
			})
		),
	remove: publicProcedure
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
