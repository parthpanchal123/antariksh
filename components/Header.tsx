import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-black fixed w-screen p-3 text-white flex flex-row justify-center gap-x-1" style={{position: "absolute"}}>
      <span>
        <Link href="/">
        <Image src="/icon.png" width="30" height="30" alt="Logo"></Image>
        </Link>
      </span>
      <Link href="/" className="font-body text-center  font-bold text-lg">  
        Antariksh
      </Link>
    </header>
  );
}
