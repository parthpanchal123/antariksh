import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { iss_props } from "../types/types";
import { useRouter } from "next/router";
import { ArrowLeft, Activity, User, ArrowUpRight } from "lucide-react";

export default function iss({ people_in_space, error }: iss_props) {
  const router = useRouter();

  if (error || !people_in_space)
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-sans font-bold text-accent mb-4">Signal Lost</h1>
        <p className="text-primary/60 font-mono text-sm max-w-md">{error || "Failed to establish telemetry link with the International Space Station."}</p>
        <button
          onClick={() => router.back()}
          className="mt-8 magnet-btn bg-dark text-primary px-8 py-3 rounded-full border border-dark flex items-center gap-2 hover:border-accent/50"
        >
          <ArrowLeft size={16} /> Retreat
        </button>
      </div>
    );

  const { people } = people_in_space;
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
            <Activity size={12} className="text-accent" /> Live Telemetry
          </div>
        </header>

        <main className="pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto w-full min-h-screen">
          <div className="flex flex-col items-center justify-center mb-16 gap-6 text-center">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-dark bg-dark/30 animate-pulse">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="font-mono text-xs tracking-widest text-accent font-bold uppercase">Signal Active</span>
            </div>
            <h1 className="font-drama italic text-5xl md:text-7xl">Orbital Crew.</h1>
            <p className="font-mono text-primary/60 max-w-lg mx-auto leading-relaxed">
              <span className="text-accent font-bold">[{people_in_space.number}]</span> active biological signatures detected aboard the International Space Station.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {people.map((person: any, index: number) => (
              <a
                key={index}
                href={`https://en.wikipedia.org/wiki/${person.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-full bg-[#05050A] border border-dark rounded-[2rem] p-6 flex items-center justify-between hover:border-accent/50 hover:bg-dark/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent/0 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-dark flex items-center justify-center border border-dark group-hover:border-accent/30 transition-colors">
                    <User size={20} className="text-primary/40 group-hover:text-accent transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-lg text-primary">{person.name}</h3>
                    <div className="font-mono text-[10px] text-primary/40 uppercase tracking-widest mt-1">
                      Status: Nominal
                    </div>
                  </div>
                </div>
                <div className="text-primary/20 group-hover:text-accent transition-colors relative z-10">
                  <ArrowUpRight size={18} strokeWidth={2} />
                </div>
              </a>
            ))}
          </div>
        </main>
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
