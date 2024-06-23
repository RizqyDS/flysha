"use server"

import { cookies } from "next/headers";
import { getUser, lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ActionResult } from "../(auth)/signin/form/actions";

export async function logout(): Promise<ActionResult> {
    const { session } = await getUser()

    if (!session) {
        return {
            errorTitle: 'Error',
            errorDesc: ['Unauthorized']
        }
    }

    await lucia.invalidateSession(session.id)

    const sessionCookie = lucia.createBlankSessionCookie()

    cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    )

    return redirect('/dashboard/signin')
}