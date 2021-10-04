import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import { GetServerSidePropsContext } from "next";
import { image_list_type, search_props } from "../types/types";
import DateImage from "../components/DateImage";
import Link from "next/link";


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

export default function search({ image_list, error }: search_props) {
  const router = useRouter();
  const topic = useRef() as any;
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (topic.current && topic.current.value == "") {
      topic.current.style.borderColor = "red";
      return;
    } else {
      if (topic.current) {
        topic.current.style.borderColor = "black";
        router.replace(`/search?q=${topic.current.value}`);
      }
    }
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
        <link rel="preload" as="image" href="/icon-192x192.png"></link>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"
          integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
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
      <div className="">
        <span
          className="text-sm text-center underline ml-2 mt-2 cursor-pointer"
          onClick={() => router.back()}
        >
          {" "}
          Go back
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
          {image_list.length === 0 ? (
            <div className='resimg'>
              <img src="/empty_state.gif" className="block mx-auto" alt="Loading..."/>
              <h1 className='mt-10'>Sorry We Couldn't Find Any Results for This Search :(</h1>
              
            </div>)
              :image_list.map((image: image_list_type, index) => {
                const day = new Date(image.data[0].date_created);
                const cDate = day.getDate();
                const cMonth = day.getMonth();
                const cYear = day.getFullYear();
                return (
                  <DateImage
                    key={index}
                    image={image.links[0].href}
                    click={() =>
                      router.push(`/image/?q=${image.data[0].nasa_id}`)
                    }
                    date={cDate}
                    month={months[cMonth]}
                    year={cYear}
                    title={image.data[0].title}
                  ></DateImage>
                );
            })}
            {/* starts here */}
          </div>
        </div>
        {showScrollButton && (
          <button
            className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-black text-white"
            onClick={scrollToTop}
          >
            <i className="fas fa-chevron-up" />
          </button>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const topic = context.query.q;

  try {
    const image_list = await axios.get(
      `https://images-api.nasa.gov/search?q=${
        !topic ? "moon" : topic
      }&media_type=image`
    );

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
