import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { iotd_props } from "../types/types";
import { ArrowLeft, Sparkles, Maximize2, Camera } from "lucide-react";

export default function iotd({ img_data, error }: iotd_props) {
  const router = useRouter();

  if (error || !img_data)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-sans font-bold text-accent mb-4">Signal Lost</h1>
        <p className="text-primary/60 font-mono text-sm max-w-md">{error || "Failed to establish telemetry link with the APOD subsystem."}</p>
        <button
          onClick={() => router.back()}
          className="mt-8 magnet-btn bg-dark text-primary px-8 py-3 rounded-full border border-dark flex items-center gap-2 hover:border-accent/50"
        >
          <ArrowLeft size={16} /> Retreat
        </button>
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
            <Sparkles size={12} className="text-accent" /> APOD Archive
          </div>
        </header>

        <main className="pt-32 px-6 md:px-12 max-w-[1400px] mx-auto w-full pb-16">

          {/* Editorial Header */}
          <div className="max-w-5xl mx-auto text-center mb-12 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-dark bg-background/50 backdrop-blur-md">
              <Camera size={14} className="text-accent" />
              <span className="font-mono text-xs tracking-widest text-primary/70 uppercase">{img_data.date}</span>
            </div>
            <h1 className="font-drama italic text-5xl md:text-7xl lg:text-8xl text-primary leading-tight mb-8 drop-shadow-lg">
              {img_data.title}
            </h1>
            <div className="font-mono text-[10px] md:text-xs tracking-widest text-primary/40 uppercase flex flex-wrap justify-center gap-6">
              <span><span className="text-accent">Captured By:</span> {img_data.copyright ? img_data.copyright.replace(/\n/g, '') : "NASA / Public Domain"}</span>
              <span><span className="text-accent">Classification:</span> {img_data.media_type}</span>
            </div>
          </div>

          {/* Exhibition Image */}
          <div className="w-full max-w-5xl mx-auto relative group rounded-3xl overflow-hidden bg-[#05050A] border border-dark transition-all duration-500 shadow-2xl mb-16 flex items-center justify-center">
            <div className="relative w-full h-[40vh] min-h-[300px] md:h-[60vh] max-h-[650px] flex items-center justify-center">
              {img_data.media_type === "video" ? (
                <iframe
                  src={img_data.url}
                  className="w-full h-full"
                  allowFullScreen
                ></iframe>
              ) : (
                <img
                  src={img_data.url}
                  alt={img_data.title}
                  className="w-full h-full object-contain p-4 md:p-8 transition-transform duration-1000 group-hover:scale-[1.01]"
                />
              )}
            </div>

            {/* Floating HD Action */}
            {img_data.media_type !== "video" && (
              <button
                onClick={() => window.open(img_data.hdurl || img_data.url, '_blank')}
                className="absolute bottom-6 right-6 magnet-btn bg-black/60 hover:bg-accent text-primary px-5 py-3 rounded-full border border-dark backdrop-blur-xl flex items-center gap-2 transition-colors cursor-pointer z-20 group-hover:shadow-[0_0_20px_rgba(123,97,255,0.4)]"
              >
                <Maximize2 size={16} className="shrink-0" />
                <span className="font-mono text-[10px] sm:text-xs tracking-widest uppercase font-bold whitespace-nowrap">HD View</span>
              </button>
            )}
          </div>

          {/* Editorial Columns */}
          <div className="max-w-5xl mx-auto w-full px-4 mb-16 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-24 bg-accent/20 rounded-full mb-12 hidden md:block" />

            <div className={`${(img_data.explanation?.length > 300) ? 'md:columns-2 gap-12 lg:gap-16' : 'max-w-3xl mx-auto'} pt-8 font-sans text-lg md:text-[21px] text-primary/80 leading-[1.8] font-light text-justify`}>
              <p>
                <span className="float-left text-7xl md:text-8xl font-drama text-accent italic leading-[0.8] pr-4 pt-2 mix-blend-screen drop-shadow-md">
                  {img_data.explanation.charAt(0)}
                </span>
                {img_data.explanation.slice(1)}
              </p>
            </div>
          </div>        </main>
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
