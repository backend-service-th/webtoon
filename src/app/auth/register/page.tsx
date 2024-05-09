
import RegisterPage from "@/components/Register"
import { dbMembers, typeCollectionMembers } from "@/lib/useCollection";
import { getToken } from "@/lib/useCookie";
import { decodeToken } from "@/lib/useToken";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Register - Webtoon"
}

export default async function routeRegisterPage() {
    const token = decodeToken( getToken() as string );
    if ( token ) return redirect( '/'.concat( token.username ) );
    const payload = await dbMembers.findAll() as typeCollectionMembers[];
    return <RegisterPage listUsername={ payload.map( item => item.username ) } listEmail={ payload.map( item => item.email ) } />
}
