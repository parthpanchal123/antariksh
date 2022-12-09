import Image from "next/image";
import {useState} from "react";
import {GetServerSidePropsContext} from "next";
import axios from "axios";
import ChatList from "./ChatList";

const ChatBotPopUp = ({setShowChat}: any) => {
    const [query, setQuery] = useState("");

     const [chat, setChat] = useState([{
         from :"ai",
         content:"Hi There 👋 , Ask me anything about the Space 🌌"
     }]);

    const handleQuery = async (e: any) => {
        e.preventDefault();
        console.log(query);
        setChat((oldChat) => [...oldChat, {from: "me", content: query}])
        console.log(chat)
        const respData = await fetchData();
        console.log(respData)
        if(respData){
            setChat((oldChat) => [...oldChat, {from: "ai", content: respData.choices[0].text}])
        }
        setQuery("")
    }

    const fetchData = async () => {
        try {
            const resData = await axios.post("api/chat-gpt", {
                prompt: query
            });
            if (resData.data) {
                console.log(resData.data)
                return resData.data;
            }
        } catch (e) {
            console.log(e)
        }
    }

    return <div className={"md:w-1/2 md:h-3/5 pop-up bg-white rounded-md p-2"}>
        <div className={"w-full flex flex-row justify-end p-1"}>
            <button onClick={() => setShowChat(false)}>
                <Image src={"/close.svg"} alt={"Close Icon"} width={30} height={30}/>
            </button>
        </div>
        <div className="flex h-full h-100 flex-col p-2">
            <div className={"h-5/6 w-full overflow-y-scroll"}>
                <ChatList chatData={chat}/>
            </div>
            <div className="w-full p-2">
                <form>
                    <div className="flex flex-row justify-between w-full border-2 border-cyan-700 rounded-md">
                        <input placeholder={"Ask here ..."} className="w-full p-2 grow text-black outline-none"
                               autoFocus value={query} onChange={(e) => setQuery(e.target.value)}></input>
                        <button type={"submit"} className="flex-none" onClick={(e) => handleQuery(e)}>
                            <Image src={"/send.svg"} className="mr-2" alt={"Send Icon"} width={24} height={24}/>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
}


export async function getServerSideProps(context: GetServerSidePropsContext) {
    const prompt = context.query.prompt;
    console.log(context)
    try {

        const resData = await axios.post("/api/chat-gpt", {
            prompt: prompt
        });

        if (resData.data) {
            console.log(resData.data)
            return {
                props: {
                    respData: resData.data
                }
            }

        }

    } catch (e) {
        console.log(e)
        return {
            props: {
                error: e
            }
        }


    }

}

export default ChatBotPopUp;