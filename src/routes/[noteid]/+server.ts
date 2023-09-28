import { prisma } from '$lib/prisma.server';
import type { RequestHandler } from './$types';

export const PUT: RequestHandler = async (event) => {
    const text=await event.request.text();
    const noteid=event.params.noteid
    const res=await prisma.note.update({
        where: {
            id: noteid,
        },
        data: {
            text:text
        },
    })
    return new Response();
};