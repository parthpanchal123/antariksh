import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { specific_image_props } from "../types/types";
import Link from "next/link";

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
        ></img>
        <h1 className="text-lg mt-5">{error}</h1>
      </div>
    );

  var month = "";
  var year = more_data.date_created.slice(0, 4);
  var monthNum = more_data.date_created.slice(5, 7);
  var date = more_data.date_created.slice(8, 10);
  switch (monthNum) {
    case "01":
      month = "January";
      break;
    case "02":
      month = "February";
      break;
    case "03":
      month = "March";
      break;
    case "04":
      month = "April";
      break;
    case "05":
      month = "May";
      break;
    case "06":
      month = "June";
      break;
    case "07":
      month = "July";
      break;
    case "08":
      month = "August";
      break;
    case "09":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
    default:
      break;
  }

  var fullDate = date + " " + month + " " + year;

  var rest = more_data.date_created.slice(11,more_data.date_created.length);

  return (
    <>
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
            <Image src="/icon.png" width="30" height="30"></Image>
          </span>
        </Link>
        <Link href="/">
          <a className="font-body text-center  font-bold text-lg">Antariksh</a>
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
        <div className="flex flex-col flex-wrap m-5 items-center space-y-5 mt-5 ">
          <div className="max-w-sm text-center ">
            <span className="text-xs mb-4">
              Tap on the image for HD version
            </span>
            <img
              src={image_list[0].href}
              className="rounded-lg cursor-pointer"
              onClick={() => router.push(image_list[0].href)}
            ></img>

            <p className="flex flex-wrap flex-row-reverse justify-center my-2 text-lg font-bold">
              {more_data.title}
            </p>
          </div>
          <p className="sm:w-2/3  md:w-1/2 w-full  text-center break-words ">
            <b>Description:</b> {more_data.description} <br />
            <b>Secondary Creator:</b> {more_data.secondary_creator} <br />
            <b>NASA ID:</b> {more_data.nasa_id}
            <br />
            <b>Created On:</b> {fullDate} {rest}
            <br />
            <b>Captured By:</b> {more_data.keywords[1]}
          </p>
        </div>
      </div>
    </>
  );
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
