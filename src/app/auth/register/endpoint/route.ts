
import { dbMembers, typeCollectionMembers } from "@/lib/useCollection";
import { NextRequest, NextResponse } from "next/server";
import { hash } from "@/lib/useCrypto";
import { cookies } from "next/headers";
import { encodeToken } from "@/lib/useToken";
import { redirect } from "next/navigation";

export async function GET() {
    redirect('/')
}

export async function POST( request:NextRequest ) {
    const body : { email:string, username:string, password:string } = await request.json();
    const payload = await dbMembers.findAll() as typeCollectionMembers[];
    if ( payload.find( item => item.username === body.username ) || payload.find( item => item.email === body.email ) ) {
        return NextResponse.json({ message:"No! No! No! Hacker." },{ status:401 })
    }
    const metadata : typeCollectionMembers = {
        email: body.email, username: body.username, password: hash( body.password ), timestamp: Date.now()
    }
    const { id } = await dbMembers.create( metadata );
    const token = encodeToken({ id, username:body.username });
    cookies().set('token',token,{
        httpOnly: request.headers.get('x-forwarded-proto')?.endsWith('s') ? true : false,
        secure: true,
        expires: new Date( Date.now() + 2592000000 ),
        sameSite: "strict",
        path: "/"
    })
    return NextResponse.json({ message:"Register success." },{ status:201 })
}
