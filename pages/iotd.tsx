import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import { useRouter } from "next/router";
import { iotd_props } from "../types/types";

export default function iotd({ img_data, error }: iotd_props) {
  const router = useRouter();
  if (error)
    return (
      <div className="container h-full w-96 flex flex-col justify-center m-auto mt-52">
        <img
          className=" rounded-lg"
          src={"https://media.giphy.com/media/26FL1soZ3STRDSLGU/giphy.gif"}
        ></img>
        <h1 className="text-lg mt-5">{error}</h1>
      </div>
    );

  return (
    <>
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
        <meta property="twitter:url" content="https://antariksh.vercel.app" />
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
      <Header />
      <div className="container m-auto py-5">
        <div className="mt-12">
          <Link href="/">
            <a className="text-sm text-center underline ml-2 text-black">
              {" "}
              Go back
            </a>
          </Link>
        </div>
        <div className="flex flex-col flex-wrap m-5 items-center space-y-5 mt-5 ">
          <div className="max-w-sm text-center ">
            <span className="text-xs mb-2">
              Tap on the image for HD version
            </span>
            <img
              src={img_data.url}
              className="rounded-lg cursor-pointer"
              onClick={() => router.push(img_data.hdurl)}
              width="384"
              height="334"
            ></img>
            <p className="flex flex-wrap flex-row-reverse justify-between my-2">
              <span className="italic text-right">{`- By ${
                img_data.copyright ?? "NASA"
              }`}</span>
              <span className="font-bold">{img_data.title}</span>
            </p>
          </div>
          <p className="md:w-1/2 text-justify">{img_data.explanation}</p>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const image_data = await axios.get(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`
    );

    return {
      props: {
        img_data: image_data.data,
      },
      revalidate: 1000,
    };
  } catch (error) {
    return {
      props: {
        error:
          "Looks like that got lost in the space 🤣 Try checking your internet maybe.",
      },
    };
  }
}
