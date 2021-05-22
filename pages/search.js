import axios from "axios";
import { useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

export default function search({ image_list, error }) {
  const router = useRouter();
  const topic = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.current.value) {
      console.log(topic.current.style.borderColor);
      topic.current.style.borderColor = "red";
      return;
    }
    console.log(topic.current.value);
    topic.current.style.borderColor = "black";
    console.log(`/search?q=${topic.current.value}`);

    router.replace(`/search?q=${topic.current.value}`);
  };

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
        <title>Antariksh 🚀 : Search </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
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
          content="https://i.imgur.com/O0dXTiK.png"
        ></meta>
      </Head>
      <header className="bg-black p-5 text-white flex flex-row justify-center gap-x-1">
        <span>
          <Image src="/icon.png" width="30" height="30"></Image>
        </span>
        <h1 className="font-body text-center  font-bold text-lg">Antariksh</h1>
      </header>
      <div className="">
        <span className="my-5">
          <Link href="/">
            <a className="text-sm text-center underline ml-2"> Go back</a>
          </Link>
        </span>
        <form
          className="text-center my-2 flex flex-wrap justify-center gap-2 "
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className="shadow appearance-none border rounded md:w-1/4 sm:w-full py-2 px-3 sm:mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline form-control"
            id="username"
            type="text"
            ref={topic}
            placeholder="Search something..."
          ></input>
          <button className="bg-black ml-2 text-sm  hover:bg-blue-700 transform transition duration-500  hover:scale-110 ease-in-out text-white font-bold py-0 px-2 rounded mr-3">
            Launch 🚀
          </button>
        </form>
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
            {image_list.map((image, index) => {
              const day = new Date(image.data[0].date_created);
              const cDate = day.getDate();
              const cMonth = day.getMonth();
              const cYear = day.getFullYear();
              return (
                <div
                  className="relative rounded-md h-64 w-full flex items-end justify-start text-left bg-cover bg-center shadow-md transition duration-500 ease-in-out transform hover:-translate-y-1 cursor-pointer"
                  key={index}
                  style={{ backgroundImage: `url(${image.links[0].href})` }}
                  onClick={() =>
                    router.push(`/image/?q=${image.data[0].nasa_id}`)
                  }
                >
                  <div className="absolute rounded-md top-0 mt-20 right-0 bottom-0 left-0 bg-gradient-to-b from-transparent to-gray-900"></div>
                  <div className="absolute top-0 right-0 left-0 mx-2 mt-2 flex  justify-end rounded-md">
                    <span
                      href="#"
                      className="text-xs bg-indigo-600 text-white px-5 py-2 uppercase hover:bg-white hover:text-indigo-600 transition ease-in-out duration-500"
                    >
                      {cDate + " " + months[parseInt(cMonth)] + "," + cYear}
                    </span>
                  </div>
                  <main className="p-5 z-10">
                    <span className="text-md tracking-tight font-medium leading-7 font-regular text-white ">
                      {image.data[0].title}
                    </span>
                  </main>
                </div>
              );
            })}
            {/* starts here */}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const topic = context.query.q;

  try {
    const image_list = await axios.get(
      `https://images-api.nasa.gov/search?q=${
        !topic ? "moon" : topic
      }&media_type=image`
    );

    console.log(image_list.data.collection.items[1]);

    return {
      props: {
        image_list: image_list.data.collection.items,
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
