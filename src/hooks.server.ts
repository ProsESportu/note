import { SvelteKitAuth } from "@auth/sveltekit"
import GitHub from "@auth/core/providers/github"
import { CLIENT_SECRET, GITHUB_ID, GITHUB_SECRET } from "$env/static/private"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "$lib/prisma.server";

export const handle = SvelteKitAuth({
    providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET, })],
    secret: CLIENT_SECRET,
    adapter: PrismaAdapter(prisma),
    callbacks: {
        session: async ({ session,user,}) => {
            if (session?.user) {
                session.user.id = user.id
            }
            return session;
        },
    }
})