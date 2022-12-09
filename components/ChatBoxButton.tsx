import Image from "next/image";
const ChatBoxButton = ({showChat,setShowChat}: any) => {

    return (
        <button onClick={() => {
            setShowChat(!showChat)
        }} className="fixed bottom-0 right-0 mr-4 mb-9 rounded-md bg-blue-500 text-white text-center p-4 hover:bg-blue-700 transition duration-150 ease-in-out">
           <Image src={"/open-ai-logo.svg"} alt={"Open AI logo"} width={70} height={60}/>
        </button>
    );

}
export default ChatBoxButton;