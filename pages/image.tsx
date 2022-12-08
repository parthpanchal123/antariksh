import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { specific_image_props } from "../types/types";
import Link from "next/link";
import dateFormat from "dateformat";
import LoadingImage from "../components/LoadingImage";

export default function ImageInfo({
  image_list,
  more_data,
  error,
}: specific_image_props) {
  const router = useRouter();
  if (error)
    return (
      <div className="container h-full w-96 flex flex-col justify-center m-auto mt-52">
        <img
          className=" rounded-lg"
          src={"https://media.giphy.com/media/26FL1soZ3STRDSLGU/giphy.gif"}
         alt="Place holder GIF"></img>
        <h1 className="text-lg mt-5">{error}</h1>
      </div>
    );

  return <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <title>Antariksh 🚀 </title>
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
        content="Antariksh 🚀  — A Space Adventure"
      />
      <meta
        property="twitter:description"
        content="A beautiful visual treat of the space,planets and galaxies from the space captured by NASA"
      />
      <meta
        property="twitter:image"
        content="https://i.imgur.com/4s7dpmB.png"
      ></meta>
    </Head>
    <header className="bg-black p-5 text-white flex flex-row justify-center gap-x-1">
      <Link href="/">
        <span>
          <Image src="/icon.png" width="30" height="30" alt="Logo"></Image>
        </span>
      </Link>
      <Link href="/" className="font-body text-center  font-bold text-lg">
        Antariksh
      </Link>
    </header>
    <div className="container m-auto py-5 w-full h-full">
      <div className="mt-2">
        <span
          className="text-sm text-center underline ml-2 text-black cursor-pointer"
          onClick={() => router.back()}
        >
          {" "}
          Go back
        </span>
      </div>
      <div className="flex flex-col flex-wrap m-5 justify-center items-center space-y-5 mt-5 ">
        <div className="max-w-sm text-center ">
          <span className="text-xs mb-4">
            Tap on the image for HD version
          </span>
          <LoadingImage
              src={image_list[0].href}
              width={384}
              height={334}
              classes="rounded-lg cursor-pointer"
              click={() => window.open(image_list[0].href, "_blank")}
              alt="NASA search result image"
          />
          <p className="flex flex-wrap flex-row-reverse justify-center my-2 text-lg font-bold">
            {more_data.title}
          </p>
        </div>
        <p className="sm:w-2/3  md:w-96 w-full justify-center text-left break-words ">
          <b>Description:</b>  {more_data.description} <br />
          <b>Secondary Creator:</b> {more_data.secondary_creator} <br />
          <b>NASA ID:</b> {more_data.nasa_id}<br />
          <b>Created On:</b> {dateFormat(`${more_data.date_created}`, "dddd, mmmm dS, yyyy, h:MM:ss TT")}<br />
          <b>Captured By:</b> {more_data.keywords[1]}
        </p>
      </div>
    </div>
  </>;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const nasa_id = context.query.q;

  try {
    const image_list = await axios.get(
      `https://images-api.nasa.gov/asset/${nasa_id}`
    );

    const more_data = await axios.get(
      `https://images-api.nasa.gov/search?q=&nasa_id=${nasa_id}`
    );


    return {
      props: {
        image_list: image_list.data.collection.items,
        more_data: more_data.data.collection.items[0].data[0],
      },
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
