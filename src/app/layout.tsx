import "../../styles/globals.css"
import React from "react";
import Header from "../../components/Header";

export default function App({
                                children,
                            }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
        <body>
        <Header/>
        {children}
        </body>
        </html>
    );
}
