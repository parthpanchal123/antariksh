import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Header from "../components/Header";

export default function Home() {
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
      <meta property="twitter:url" content="https://metatags.io/" />
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
    <Header />

    <div className="home-cover">
      <div className="container h-screen m-auto text-white">
        {/* Middle section */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 justify-items-center content-center h-full space-y-6">
          {/* Left Text */}
          <div className="flex flex-col order-last self-center md:text-left sm:text-center">
            <div>
              <h1 className="text-base mb-10 md:text-left sm:text-center ">
                {" "}
                <span className="text-lg">
                  Exhilaratings views from the{" "}
                </span>{" "}
                <br /> <span className="font-bold text-7xl">SPACE</span>
              </h1>
            </div>

            <div>
              <p className="text-sm mb-5">
                {" "}
                Quench your thirst of the gigantic world above !
              </p>
              <div className="flex flex-row gap-x-2 mt-2">
                <Link href="/iotd">
                  <button className="bg-black hover:bg-blue-700 transform transition duration-500  hover:scale-110 ease-in-out text-white font-bold py-1 px-4 rounded ">
                    Image of the Day
                  </button>
                </Link>
                <Link href="/search">
                  <button className="bg-black hover:bg-blue-700 transform transition duration-500  hover:scale-110 ease-in-out  text-white font-bold py-1 px-4 rounded">
                    Search
                  </button>
                </Link>
                <Link href="/iss">
                  <button className="bg-black hover:bg-blue-700 transform transition duration-500  hover:scale-110 ease-in-out  text-white font-bold py-1 px-4 rounded">
                    ISS crew
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* Right Text */}
          <div className="place-self-end mt-5">
            <Image
              src="/space.png"
              width="450"
              height="400"
              id="space"
             alt="Space background"></Image>
          </div>
        </div>
      </div>
    </div>
    <footer className="h-8 bottom-0 mt-1 fixed w-screen text-white text-center text-md italic">
      Made with 💙 by -{" "}
      <a
        target="_blank"
        href="https://github.com/parthpanchal123"
        rel="noopener noreferrer"
      >
        <span className="cursor-pointer underline text-blue-400">
          {" "}
          Parth{" "}
        </span>
      </a>
    </footer>
  </>;
}
