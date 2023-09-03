"use server"
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";


async function getImageOfTheDay() {
    try {
        const image_data = await axios.get(
            `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
        );
        return image_data;
    } catch (e) {
        console.error(e)
    }
}

export default async function iotd() {

    const iotdData = await getImageOfTheDay();

    if (iotdData?.status !== 200) {
        return (
            <div className="container h-full w-96 flex flex-col justify-center m-auto">
                <img
                    className=" rounded-lg"
                    src={"https://media.giphy.com/media/26FL1soZ3STRDSLGU/giphy.gif"}
                    alt="Place holder GIF"></img>
                <h1 className="text-lg mt-5">{"Looks like that got lost in the space 🤣  Try after some time... "}</h1>
            </div>
        );
    }

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
        <div className="container m-auto py-5">
            <div className="mt-12">
                <Link href="/" className="text-sm text-center underline ml-2 text-black">

                    {" "}Go back
                </Link>
            </div>
            <div className="flex flex-col flex-wrap m-5 items-center space-y-5 mt-5 ">
                <div className="max-w-sm text-center ">
          <span className="text-xs mb-2">
            Tap on the image for HD version
          </span>
                    <Image
                        src={iotdData?.data?.url}
                        width="384"
                        height="334"
                        className="rounded-lg cursor-pointer"
                        // onClick={() => {
                        //     "use server"
                        //     window.open(iotdData.hdurl, '_blank')
                        // }}
                        alt={"Image Of the Day"}/>
                    <p className="flex flex-wrap justify-between my-2">
                        <span className="font-bold">{iotdData?.data?.title}</span>
                        <span className="italic text-right">{`- By ${
                            iotdData?.data?.copyright ?? "NASA"
                        }`}</span>
                    </p>
                </div>
                <p className="md:w-1/2 text-justify">{iotdData?.data?.explanation}</p>
            </div>
        </div>
    </>;
};