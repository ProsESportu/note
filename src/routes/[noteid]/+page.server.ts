import { prisma } from '$lib/prisma.server';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async (event) => {
    const noteid = event.params.noteid
    const note = await prisma.note.findFirst({ where: { id: noteid }, select: { text: true, title: true, } })
    if(!note) throw error(404, 'Not found');
    
    return {note:note};
}) satisfies PageServerLoad;