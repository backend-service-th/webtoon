"use server";

import HomePage from "@/components/Home";
import { getToken } from "@/lib/useCookie";
import { decodeToken } from "@/lib/useToken";
import { dbMembers, typeCollectionMembers } from "@/lib/useCollection";

export default async function routeHomePage() {
    const payload = decodeToken( getToken() as string );
    const member = await dbMembers.findAll() as typeCollectionMembers[];
    return <HomePage loginState={ payload } getMembers={ member.map( item => ({ _id:item._id as string, username:item.username }) ) } />
}
