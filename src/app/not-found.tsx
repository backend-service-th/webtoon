
import Link from "next/link";
import type { Metadata } from "next";

export const metadata : Metadata = {
    title: "404 ⥌ Not Found"
}

export default function NextPageNotFound() {
    return (
        <section className="flex w-screen h-screen items-center select-none justify-center text-white bg-black">
            <figure className="flex items-center">
                <h1 className="font-semibold text-2xl sm:text-3xl">404</h1>
                <span className="block mx-2 sm:mx-3 w-0.5 h-7 sm:h-9 bg-white"></span>
                <p className="text-sm sm:text-base">This page cloud not be found.</p>
            </figure>
            <Link className="fixed left-4 top-3 text-sky-400" href="/">{"« Home"}</Link>
        </section>
    )
}
