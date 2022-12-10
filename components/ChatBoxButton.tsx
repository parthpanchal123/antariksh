import Image from "next/image";
const ChatBoxButton = ({showChat,setShowChat}: any) => {

    return (
        <button onClick={() => {
            setShowChat(!showChat)
        }} className="bg-black hover:bg-blue-700 transform transition duration-500 hover:scale-110 ease-in-out text-white font-bold py-2 px-4 rounded ">
           <Image src={"/open-ai-logo.svg"} alt={"Open AI logo"} width={80} height={80}/>
        </button>
    );

}
export default ChatBoxButton;