"use client";

import Link from "next/link";
import React, { useState } from "react";
import type { Payload } from "@/lib/useToken";
import { Rubik_Glitch } from "next/font/google";

const font = Rubik_Glitch({ subsets:["latin"], weight:["400"] });

interface MemberInterface { _id:string, username:string }

interface NextPageProps {
    loginState?: Payload,
    getMembers: MemberInterface[]
}

const HomePage : React.FC<NextPageProps> = ({ loginState, getMembers }) : React.JSX.Element => {

    const textLogin = loginState ? loginState.username : "Login";
    const textRegister = loginState ? "Dashboard" : "Join Now";

    function searchMemberHandler( newSearch:string ) {
        if ( newSearch === "" ) return setMembers([]);
        setMembers( getMembers.filter( i => i.username.toLowerCase().includes( newSearch.toLowerCase() || "all" ) ) )
    }

    const [ showDetail, setShowDetail ] = useState<boolean>(false);
    const [ showNavbar, setShowNavbar ] = useState<boolean>(false);
    const [ members, setMembers ] = useState<MemberInterface[]>([]);

    return (
        <section className="w-screen select-none text-white bg-black">
            <header className="relative w-full h-[calc(100vh-4rem)] min-h-96 bg-[url('/background.png')] bg-no-repeat bg-[top_0_right_-360px] sm:bg-center bg-cover">
                <figure className="block w-full h-full bg-[#22222245]">
                    <nav className="flex items-center justify-between h-28 w-5/6 max-w-5xl mx-auto">
                        <h1 className={ font.className + " text-3xl sm:text-5xl" }>Webtoon</h1>
                        <div className="flex relative items-center">
                            <svg onClick={ () => setShowNavbar( !showNavbar ) } className="w-7 h-7 sm:hidden" role="button" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#fff" fillRule="evenodd" clipRule="evenodd" d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM7 12C7 11.4477 7.44772 11 8 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H8C7.44772 13 7 12.5523 7 12ZM13 18C13 17.4477 13.4477 17 14 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H14C13.4477 19 13 18.5523 13 18Z"></path>
                            </svg>
                            <div className={ ( showNavbar ? "block shadow-lg " : "hidden" ) + " absolute right-0 top-[180%] w-52 bg-[#fafafa] p-3 rounded-md text-black sm:flex sm:relative sm:w-auto sm:bg-transparent sm:text-white before:border-l-[10px] before:border-l-transparent before:border-b-[15px] before:border-b-white before:border-r-[10px] before:border-r-transparent before:absolute before:right-2 before:-top-3 before:sm:border-none" }>
                                <button onClick={ () => setShowDetail( true ) } className="flex justify-center w-full text-nowrap px-2 py-1 sm:border-b sm:mr-3" type="button">Search Member</button>
                                <Link className="flex justify-center w-full px-2 py-1 bg-slate-900 rounded-md text-white sm:bg-white sm:text-black sm:px-4 sm:rounded-full sm:border-2 sm:border-white hover:sm:bg-transparent hover:sm:text-white transition-all" href={ loginState ? '/'.concat( textLogin ) : "/auth/login" }>{ textLogin }</Link>
                            </div>
                        </div>
                    </nav>
                    <main className="w-5/6 h-[calc(100%-7rem)] max-w-5xl mx-auto place-content-center py-8">
                        <figcaption>
                            <article className="block text-3xl sm:text-5xl font-semibold">Hello, Webtoon!</article>
                            <span className="block w-full sm:w-3/5 py-3 text-sm sm:text-base">Your ultimate destination for Manga and Manhwa translations. Join our community of passionate members and enjoy free, unlimited uploads. Dive into a world of creativity and storytelling with Wetoon.</span>
                            <Link className="block transition-all bg-red-500 w-[8.5rem] px-4 py-2 text-md sm:text-lg font-semibold text-center border-2 border-transparent rounded-full hover:bg-transparent hover:border-red-500" href={ loginState ? '/'.concat( loginState.username ) : "/auth/register" }>{ textRegister }</Link>
                        </figcaption>
                    </main>
                </figure>
            </header>
            <footer className="h-16 w-5/6 max-w-5xl mx-auto text-sm sm:text-base place-content-center">{"Copyright ©2022"}<span className="text-sky-600 ps-1">Webtoon</span></footer>
            <section onClick={ () => setShowDetail( false ) } className={ ( showDetail ? "flex" : "hidden" ) + " fixed items-center justify-center w-screen h-screen bg-[#000000aa] left-0 top-0 text-black" }>
                <main onClick={ event => event.stopPropagation() } className="rounded-lg bg-white mx-auto w-96 min-h-72 max-w-[90%] pb-3">
                    <header className="flex items-center justify-start h-10 px-4">
                        <button onClick={ () => setShowDetail( false ) } className="w-4 h-4 rounded-full bg-red-600 text-[10px] text-white" type="button"></button>
                    </header>
                    <main className="flex items-center justify-center pt-1">
                        <input onChange={ event => searchMemberHandler( event.currentTarget.value ) } className="text-center capitalize pb-1 text-lg w-5/6 border-b outline-none bg-transparent text-black" type="search" placeholder="Search Members"></input>
                    </main>
                    <section className="grid gap-2 grid-cols-1 sm:grid-cols-2 w-5/6 mx-auto pt-5 pb-3 px-1 text-base overflow-y-auto h-80">
                        { members.length === 0 ? <h1>No result</h1> : members.map( ms => <Link key={ ms._id } href={ '/'.concat( ms.username ) } className="shadow-[rgba(60,64,67,0.3)_0px_1px_2px_0px,rgba(60,64,67,0.15)_0px_2px_6px_2px] px-2 py-1 h-8 rounded first-letter:uppercase">{ ms.username }</Link> ) }
                    </section>
                </main>
            </section>
        </section>
    )
}

export default HomePage;
