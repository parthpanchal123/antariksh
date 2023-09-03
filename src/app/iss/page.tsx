"use server"
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from "react";


async function getIssData() {
    try {
        const image_data = await axios.get(
            `http://api.open-notify.org/astros.json`
        );
        return image_data.data;
    } catch (e) {
        console.error(e)
    }
}

export default async function iss() {

    const issData = await getIssData();
    const {people} = issData;

    return <>
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            ></meta>
            <title>Antariksh 🚀 : Astronomy Picture Of the day</title>
            <meta
                property="og:title"
                content="Antariksh 🚀 : A beautiful visual treat of the space,planets and galaxies from the space captured by NASA"
                key="title"
            />

            <meta
                property="og:description"
                content="Antariksh is a web app that presents some amazing stories in the form of images collected by NASA"
                key="description"
            />

            <meta
                property="og:url"
                content="https://antariksh.vercel.app/"
                key="url"
            />
            <meta
                property="twitter:card"
                content="Antariksh 🚀 : A beautiful visual treat of the space,planets and galaxies from the space captured by NASA"
            />
            <meta property="twitter:url" content="https://antariksh.vercel.app"/>
            <meta
                property="twitter:title"
                content="Antariksh 🚀  — Astronomy picture of the day"
            />
            <meta
                property="twitter:description"
                content="A beautiful visual treat of the space,planets and galaxies from the space captured by NASA"
            />
            <meta
                property="twitter:image"
                content="https://i.imgur.com/5YeEQAG.png"
            ></meta>
        </Head>
        <div className="iss-cover md:h-screen">
            <div className="container h-full m-auto text-white">
                <div className="w-full flex flex-col justify-center items-center justify-items-center gap-y-2 ">
                    <h2 className="text-white text-center text-md mt-8 mb-8">
                        {issData.number} people currently in the ISS
                        (International Space Station)
                    </h2>
                    <div className={"flex flex-row justify-center items-center flex-wrap gap-5 h-100 "}>
                        {people.map((person: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; }) => {
                                return (
                                    <div
                                        className="rounded bg-white text-center text-black md:w-1/4 w-2/3 py-5 bg-gradient-to-r from-blue-900 to-transparent hover:from-yellow-500 hover:to-orange-500 transform transition duration-500  hover:scale-110 ease-in-out">
                                        <Link
                                            href={`https://en.wikipedia.org/wiki/${person.name}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {person.name}
                                        </Link>
                                    </div>
                                )
                            }
                        )}
                    </div>
                    <Link
                        href="/"
                        className=" text-center underline ml-2 text-white text-xl font-bold">
                        Go back
                    </Link>
                </div>
            </div>
        </div>
    </>;
};