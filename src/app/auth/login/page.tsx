
import LoginPage from "@/components/Login";
import { getToken } from "@/lib/useCookie";
import { decodeToken } from "@/lib/useToken";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Login - Webtoon"
}

export default async function routeLoginPage() {
    const token = decodeToken( getToken() as string );
    if ( token ) return redirect( '/'.concat( token.username ) )
    return <LoginPage />
}