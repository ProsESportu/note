import { prisma } from '$lib/prisma.server';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';


export const POST: RequestHandler = async (event) => {
    const uid = (await event.locals.getSession())?.user?.id
    if (!uid) {
        throw error(401)
    }
    const title = await event.request.text()
    const note = await prisma.note.create({ data: { text: "", title: title, userId: uid },select:{id:true} })
    return json({id:note.id,title:title});
};