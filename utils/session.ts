import { auth } from "@/auth";
import { SessionResponse } from "@/types/session";

export const getSession = async () => {
    const session = await auth();

    return session?.user as SessionResponse;
};

export const getVisitorId = async () => {
    const session = (await getSession()) as SessionResponse;
    const visitorId = session?.payload?.user?.visitorId || null;

    return visitorId;
};

export const getMuseumId = async () => {
    const session = (await getSession()) as SessionResponse;
    const museumId = session?.payload?.user?.museumId || null;

    return museumId;
};
