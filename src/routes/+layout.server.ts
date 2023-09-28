import { prisma } from '$lib/prisma.server';
import type { LayoutServerLoad } from './$types';
 
export const load: LayoutServerLoad = async (event) => {
  const session=await event.locals.getSession()
  const notes=await prisma.note.findMany({
    where:{userId:session?.user?.id},
    select:{title:true,id:true}
  })
  return {
    session:session,notes:notes,
  };
};