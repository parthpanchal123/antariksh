import axios from "axios";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { specific_image_props } from "../types/types";
import Link from "next/link";
import dateFormat from "dateformat";
import { ArrowLeft, Sparkles, Camera, Maximize2, Search, Terminal } from "lucide-react";

export default function ImageInfo({
  image_list,
  more_data,
  error,
}: specific_image_props) {
  const router = useRouter();

  if (error)
    return (
      <div className="min-h-screen bg-background text-primary flex flex-col items-center justify-center">
        <div className="text-center font-mono opacity-60">
          <Terminal size={32} className="mx-auto mb-4 text-accent" />
          <p className="text-sm tracking-widest uppercase">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="mt-8 magnet-btn bg-dark text-primary px-6 py-2 rounded-full text-xs font-bold font-sans uppercase tracking-widest border border-dark hover:border-accent transition-colors"
          >
            Return to Base
          </button>
        </div>
      </div>
    );

  const formattedDate = dateFormat(`${more_data.date_created}`, "yyyy-mm-dd");

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Antariksh 🚀 | {more_data.title}</title>
        <meta property="og:title" content={`Antariksh 🚀 | ${more_data.title}`} key="title" />
        <meta property="og:description" content={more_data.description?.substring(0, 150) + "..."} key="description" />
        <meta property="og:url" content="https://antariksh.vercel.app/" key="url" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://antariksh.vercel.app" />
        <meta property="twitter:title" content={`Antariksh 🚀 | ${more_data.title}`} />
        <meta property="twitter:description" content={more_data.description?.substring(0, 150) + "..."} />
        <meta property="twitter:image" content={image_list?.[0]?.href || "https://i.imgur.com/4s7dpmB.png"} />
      </Head>

      <div className="min-h-screen bg-background text-primary selection:bg-accent selection:text-white pb-24">
        {/* Sleek Header */}
        <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-6 bg-background/80 backdrop-blur-xl border-b border-dark">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-dark/50 hover:bg-dark text-primary transition-colors border border-dark"
            >
              <ArrowLeft size={18} />
            </button>
            <Link href="/" className="font-sans font-bold text-2xl tracking-tighter hidden sm:block">
              Antariksh.
            </Link>
          </div>
          <div className="font-mono text-xs uppercase tracking-widest text-primary/40 flex items-center gap-2">
            <Search size={12} className="text-accent" /> Image Archive
          </div>
        </header>

        <main className="pt-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full pb-16">

          {/* Editorial Header */}
          <div className="max-w-5xl mx-auto text-center mb-12 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-dark bg-background/50 backdrop-blur-md">
              <Camera size={14} className="text-accent" />
              <span className="font-mono text-xs tracking-widest text-primary/70 uppercase">{formattedDate}</span>
            </div>
            <h1 className="font-drama italic text-5xl md:text-7xl lg:text-8xl text-primary leading-tight mb-8 drop-shadow-lg">
              {more_data.title}
            </h1>
            <div className="font-mono text-[10px] md:text-xs tracking-widest text-primary/40 uppercase flex flex-wrap justify-center gap-6">
              <span><span className="text-accent">Captured By:</span> {more_data.secondary_creator || "NASA / Public Domain"}</span>
              <span><span className="text-accent">NASA ID:</span> {more_data.nasa_id}</span>
            </div>
          </div>

          {/* Exhibition Image */}
          <div className="w-full max-w-5xl mx-auto relative group rounded-3xl overflow-hidden bg-[#05050A] border border-dark transition-all duration-500 shadow-2xl mb-16 flex items-center justify-center">
            <div className="relative w-full h-[40vh] min-h-[300px] md:h-[60vh] max-h-[650px] flex items-center justify-center">
              <img
                src={image_list[0].href}
                alt={more_data.title}
                className="w-full h-full object-contain p-4 md:p-8 transition-transform duration-1000 group-hover:scale-[1.01]"
              />
            </div>

            {/* Floating HD Action */}
            <button
              onClick={() => window.open(image_list[0].href, '_blank')}
              className="absolute bottom-6 right-6 magnet-btn bg-black/60 hover:bg-accent text-primary px-5 py-3 rounded-full border border-dark backdrop-blur-xl flex items-center gap-2 transition-colors cursor-pointer z-20 group-hover:shadow-[0_0_20px_rgba(123,97,255,0.4)]"
            >
              <Maximize2 size={16} className="shrink-0" />
              <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase font-bold whitespace-nowrap">HD View</span>
            </button>
          </div>

          {/* Editorial / Metadata Sections */}
          <div className="max-w-5xl mx-auto w-full px-4 mb-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 bg-accent/20 rounded-full mb-12 hidden md:block" />

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 pt-8 font-sans text-lg text-primary/80 font-light text-justify">
              <div className="lg:w-2/3 leading-[1.8]">
                <p>
                  <strong className="font-mono text-xs tracking-widest uppercase text-accent mb-4 block">Description</strong>
                  {more_data.description || "No description available."}
                </p>
              </div>
              <div className="lg:w-1/3 flex flex-col gap-6 font-mono text-xs md:text-sm">

                <div className="flex flex-col gap-1 border-b border-dark pb-4">
                  <span className="text-accent text-[10px] tracking-widest uppercase">NASA ID</span>
                  <span className="text-primary/90">{more_data.nasa_id || "N/A"}</span>
                </div>

                <div className="flex flex-col gap-1 border-b border-dark pb-4">
                  <span className="text-accent text-[10px] tracking-widest uppercase">Created On</span>
                  <span className="text-primary/90">{dateFormat(`${more_data.date_created}`, "dddd, mmmm dS, yyyy, h:MM:ss TT")}</span>
                </div>

                <div className="flex flex-col gap-1 border-b border-dark pb-4">
                  <span className="text-accent text-[10px] tracking-widest uppercase">Secondary Creator</span>
                  <span className="text-primary/90">{more_data.secondary_creator || "N/A"}</span>
                </div>

                <div className="flex flex-col gap-1 border-b border-dark pb-4">
                  <span className="text-accent text-[10px] tracking-widest uppercase">Captured By</span>
                  <span className="text-primary/90">{more_data.keywords && more_data.keywords.length > 1 ? more_data.keywords[1] : (more_data.keywords && more_data.keywords[0] ? more_data.keywords[0] : "N/A")}</span>
                </div>

              </div>
            </div>
          </div>
        </main>
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
