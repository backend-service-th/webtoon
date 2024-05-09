"use client";

import React,{ useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Match = {
    email: /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|outlook\.co\.th|hotmail\.com)$/,
    username: /^[a-zA-Z][a-zA-Z0-9_]{5,19}$/,
    password: /^[^\s]{8,20}$/
}

interface NextPageProps {
    listUsername: string[];
    listEmail: string[]
}

const RegisterPage : React.FC<NextPageProps> = ({ listEmail, listUsername }) : React.JSX.Element => {

    const [ email, setEmail ] = useState<string>('');
    const [ username, setUsername ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');
    const [ conPassword, setConPassword ] = useState<string>('');

    const [ xEmail, setXEmail ] = useState<boolean>(false);
    const [ xUsername, setXUsername ] = useState<boolean>(false);
    const [ xPassword, setXPassword ] = useState<boolean>(false);
    const [ xConPassword, setXConPassword ] = useState<boolean>(false);

    const router = useRouter();

    function onFormSubmit( event: React.FormEvent ) {
        event.preventDefault();
        if ( xEmail || xUsername || xPassword || xConPassword ) {
            return toast.error("Error from data invalid.")
        }
        toast.loading("Submitting...",{
            id: "submit"
        });
        fetch("./register/endpoint", {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=utf8"
            },
            body: JSON.stringify({ email, username, password })
        }).then( response => {
            toast.dismiss("submit");
            if ( response.status === 201 ) {
                toast.success("Register successfull.");
                return router.push(`/${ username }`);
            }
            toast.error("Register failed.");
        })
    }

    function handleEmail( value:string ) {
        setEmail( value );
        if ( value === '' ) return setXEmail( false );
        ( Match.email.test( value ) && !listEmail.includes( value ) ) ? setXEmail( false ) : setXEmail( true );
    }

    function handleUsername( value:string ) {
        setUsername( value );
        if ( value === '' ) return setXUsername( false );
        ( Match.username.test( value ) && !listUsername.includes( value ) ) ? setXUsername( false ) : setXUsername( true );
    }

    function handlePassword( value:string ) {
        setPassword( value );
        if ( value === '' ) setXConPassword( false );
        if ( value === '' ) return setXPassword( false );
        Match.password.test( value ) ? setXPassword( false ) : setXPassword( true );
        ( conPassword == value ) ? setXConPassword( false ) : setXConPassword( true );
    }

    function handleConfirmPassword( value:string ) {
        setConPassword( value );
        if ( value === '' ) return setXConPassword( false );
        Match.password.test( value ) ? setXConPassword( false ) : setXConPassword( true );
        ( password == value ) ? setXConPassword( false ) : setXConPassword( true );
    }

    return (
        <section className="select-none w-screen min-h-screen bg-[url('/background.png')] bg-no-repeat bg-[top_0_right_-360px] sm:bg-center bg-cover">
            <main className="w-screen min-h-screen bg-[#00000045] flex items-center justify-center">
                <form onSubmit={ onFormSubmit } autoComplete="off" className="bg-white rounded-md shadow-lg px-2 pb-2 w-80 max-w-[90%]">
                    <header className="flex items-center justify-start h-10 px-2">
                        <Link href="/" className="w-4 h-4 rounded-full bg-red-600 text-[10px] text-white" type="button"></Link>
                    </header>
                    <h1 className="text-2xl font-medium py-1 text-center">Signup</h1>
                    <article className="relative max-w-[80%] my-2 mx-auto">
                        <input
                            required
                            id="email"
                            type="email"
                            placeholder="..."
                            autoComplete="new-password"
                            title="Google or Microsoft only"
                            onChange={ event => handleEmail( event.currentTarget.value ) }
                            className={ ( xEmail ? "border-red-500 " : "" ) + "peer w-full h-10 border px-2 outline-none placeholder:opacity-0" }>
                        </input>
                        <label className="absolute transition-all -top-2 left-2 text-xs text-gray-500 bg-white px-1 peer-focus:cursor-default peer-placeholder-shown:cursor-text peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs" htmlFor="email">Email Address</label>
                    </article>
                    <article className="relative max-w-[80%] my-2 mx-auto">
                        <input
                            required
                            id="username"
                            type="username"
                            placeholder="..."
                            autoComplete="new-password"
                            title="Username 6-20 character and start with a-z or A-Z and can use underscore( _ )"
                            onChange={ event => handleUsername( event.currentTarget.value ) }
                            className={ ( xUsername ? "border-red-500 " : "" ) + "peer w-full h-10 border px-2 outline-none placeholder:opacity-0" }>
                        </input>
                        <label className="absolute transition-all -top-2 left-2 text-xs text-gray-500 bg-white px-1 peer-focus:cursor-default peer-placeholder-shown:cursor-text peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs" htmlFor="username">Username</label>
                    </article>
                    <article className="relative max-w-[80%] my-2 mx-auto">
                        <input
                            required
                            id="password"
                            type="password"
                            placeholder="..."
                            autoComplete="new-password"
                            title="Password 8-20 character"
                            onChange={ event => handlePassword( event.currentTarget.value ) }
                            className={ ( xPassword ? "border-red-500 " : "" ) + "peer w-full h-10 border px-2 outline-none placeholder:opacity-0" }>
                        </input>
                        <label className="absolute transition-all -top-2 left-2 text-xs text-gray-500 bg-white px-1 peer-focus:cursor-default peer-placeholder-shown:cursor-text peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs" htmlFor="password">Password</label>
                    </article>
                    <article className="relative max-w-[80%] my-2 mx-auto">
                        <input
                            required
                            id="cspassword"
                            type="password"
                            placeholder="..."
                            autoComplete="new-password"
                            title="Confirm Password 8-20 character"
                            onChange={ event => handleConfirmPassword( event.currentTarget.value ) }
                            className={ ( xConPassword ? "border-red-500 " : "" ) + "peer w-full h-10 border px-2 outline-none placeholder:opacity-0" }>
                        </input>
                        <label className="absolute transition-all -top-2 left-2 text-xs text-gray-500 bg-white px-1 peer-focus:cursor-default peer-placeholder-shown:cursor-text peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs" htmlFor="cspassword">Confirm Password</label>
                    </article>
                    <article className="relative max-w-[80%] my-2 mx-auto">
                        <input type="checkbox" id="accept" required></input>
                        <label htmlFor="accept" className="text-sm">
                            {" I accept all "}
                            <Link className="text-sky-600" href="./terms-of-service">terms of service</Link>
                        </label>
                    </article>
                    <article className="relative max-w-[80%] my-2 mx-auto">
                        <button className="text-center bg-black rounded-md text-white w-full font-semibold text-lg py-1" type="submit">Register</button>
                    </article>
                    <p className="text-sm text-center pt-1 pb-2">
                        {"Already have and account? "}
                        <Link className="text-sky-600" href="./login">Login</Link>
                    </p>
                </form>
            </main>
        </section>
    )
}

export default RegisterPage;
