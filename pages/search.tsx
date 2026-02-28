import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import { image_list_type, search_props } from "../types/types";
import DateImage from "../components/DateImage";
import Link from "next/link";
import { Search as SearchIcon, ArrowLeft, ArrowUp, Zap } from "lucide-react";


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
          alt="Placeholder Image"></img>
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
          href={"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css"}
          integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      <div className="min-h-screen bg-background text-primary selection:bg-accent selection:text-white">
        {/* Sleek Header */}
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-background/80 backdrop-blur-xl border-b border-dark">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-dark/50 hover:bg-dark text-primary transition-colors border border-dark"
            >
              <ArrowLeft size={18} />
            </button>
            <Link href="/" className="font-sans font-bold text-2xl tracking-tighter">
              Antariksh.
            </Link>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-primary/40 flex items-center gap-2">
            <Zap size={12} className="text-accent" /> Archive Access
          </div>
        </header>

        <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
          {/* Search Input Area */}
          <div className="flex flex-col items-center justify-center mb-16 gap-6">
            <h1 className="font-drama italic text-5xl md:text-7xl text-center">Query The Void.</h1>

            <form
              className="w-full max-w-2xl flex items-center bg-[#05050A] border-2 border-dark rounded-full p-2 shadow-2xl focus-within:border-accent/50 transition-all group"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="pl-6 pr-4 text-primary/40 group-focus-within:text-accent transition-colors hidden sm:block">
                <SearchIcon size={24} />
              </div>
              <input
                className="flex-1 bg-transparent py-4 pl-6 sm:pl-2 pr-4 text-base md:text-xl font-sans text-primary placeholder-primary/20 focus:outline-none"
                id="username"
                type="text"
                ref={topic}
                placeholder="e.g. Jupiter, Apollo 11, Carina..."
                autoFocus
              />
              <button className="magnet-btn bg-accent text-white px-8 py-4 font-bold rounded-full flex items-center justify-center hover:shadow-[0_0_20px_rgba(123,97,255,0.4)] whitespace-nowrap">
                <span className="relative z-10 font-sans tracking-wide">Launch</span>
              </button>
            </form>
          </div>

          {/* Results Grid */}
          <div className="w-full">
            {image_list.length === 0 ? (
              <div className="flex flex-col justify-center items-center py-20 opacity-50">
                <SearchIcon size={64} className="text-primary/10 mb-6" />
                <h1 className="font-sans text-xl font-medium text-center">No coordinates found for that trajectory.</h1>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {
                  image_list.map((image: image_list_type, index) => {
                    if (!image?.data?.[0] || !image?.links?.[0]) return null;
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
                      />
                    );
                  })
                }
              </div>
            )}
          </div>
        </main>

        {/* Floating Scroll Button */}
        {showScrollButton && (
          <button
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-accent/20 border border-accent/50 text-accent flex items-center justify-center backdrop-blur-md hover:bg-accent hover:text-white transition-all shadow-[0_0_30px_rgba(123,97,255,0.2)] z-50"
            onClick={scrollToTop}
          >
            <ArrowUp size={24} />
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
      `https://images-api.nasa.gov/search?q=${!topic ? "Jupiter" : topic
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
