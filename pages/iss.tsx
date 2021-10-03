import axios from "axios";
import Head from "next/head";
import Header from "../components/Header";
import Link from "next/link";
import { iss_props } from "../types/types";

export default function iss({ people_in_space, error }: iss_props) {
  const { people } = people_in_space;
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
        <title>Antariksh 🚀 : ISS crew </title>
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
          content="https://i.imgur.com/txLtrAx.png"
        ></meta>
      </Head>
      <Header />

      <div className="iss-cover">
        <div className="container h-screen m-auto text-white ">
          <div className="grid sm:grid-cols-1 md:grid-cols-1 justify-items-center content-center h-full space-y-3  ">
            <h2 className="text-white text-center text-md">
              {people_in_space.number} people currently in the ISS
              (International Space Station)
            </h2>
            {people.map((person) => {
              return (
                <div className="rounded bg-white text-center text-black md:w-1/4 w-2/3 md:py-5 sm:py-5 bg-gradient-to-r from-blue-900 to-transparent hover:from-yellow-500 hover:to-orange-500 transform transition duration-500  hover:scale-110 ease-in-out">
                  <a href={`https://en.wikipedia.org/wiki/${person.name}`} target="_blank">{person.name}</a>
                </div>
              );
            })}
            <div className="mt-12">
              <Link href="/">
                <a className=" text-center underline ml-2 text-white text-xl font-bold">
                  Go back
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const json_data = await axios.get(`http://api.open-notify.org/astros.json`);

    const people_in_space = json_data.data;

    return {
      props: {
        people_in_space,
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
