import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Poppins } from "next/font/google";

import "./tailwind.globals.css";

const font = Poppins({ subsets:["latin"], weight:["100","200","300","400","500","600","700","800","900"] });

const useDescription = "Read or upload unlimited comics, manga, manhwa, and manhua on Webtoon platform. Free storage for member uploads.";

export const metadata : Metadata = {
    metadataBase: new URL('http://localhost:3000'),
    title: "Webtoon",
    description: useDescription,
    openGraph: {
        type: "website",
        title: "Webtoon",
        description: useDescription,
        images: ["/preview.png"]
    },
    twitter: {
        card: "summary_large_image",
        title: "Webtoon",
        description: useDescription,
        images: ["/preview.png"]
    }
};

export default function RootLayout({ children }:Readonly<{ children:React.ReactNode }>) {
    return (
        <html lang="en-US" className="scroll-smooth">
            <head>
                <link rel="shortcut icon apple-touch-icon" type="image/png" href="/favicon.png" />
            </head>
            <body className={ font.className }>{ children }<Toaster position="top-right" /></body>
        </html>
    );
}
