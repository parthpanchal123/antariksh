import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-black fixed w-screen p-3 text-white flex flex-row justify-center gap-x-1">
      <span>
        <Image src="/icon.png" width="30" height="30"></Image>
      </span>
      <h1 className="font-body text-center  font-bold text-lg">Antariksh</h1>
    </header>
  );
}
