import { auth } from "@/auth";
import { headers } from "next/headers";

type SessionPops = {
    user: {
        payload: {
            token: string;
        };
    };
}

export default async function AuthApiToken() {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const headersList = headers()
    const  session =  await auth();
    const sessionData = session as SessionPops | null;
    console.log("Session data server:", sessionData);
    return sessionData;
}