import Image from "next/image";
import {useEffect} from "react";

const ChatList = ({chatData}:any) => {
    useEffect(()=>{
        console.log("Rendered")
        console.log(chatData)
    },[chatData])
    return <>
        {
            chatData.map((summary:any) => {
                return summary.from === "ai" ? <div id={summary.id} className={"flex flex-row m-2 gap-x-2"}>
                    <Image src="/openai.svg" className="w-10 h-10 rounded-md border-2" alt={"Temp"} width={2}
                           height={5}/>
                    <div
                        className=" flex flex-col gap-y-1">
                        <div className="bg-blue-500 p-2 rounded-lg rounded-tl-none">
                            <p className="text-white text-sm">
                                {
                                    summary.content
                                }
                            </p>
                        </div>
                    </div>
                </div> : summary.from === "me" ? <div id={summary.id} className={"flex flex-row-reverse m-2 gap-x-2"}>
                    <Image src="/bitmoji.svg" className="w-10 h-10 rounded-md border-2" alt={"Temp"} width={8} height={8}/>
                    <div className="bg-blue-500 p-2 rounded-lg rounded-tr-none">
                        <p className="text-white text-sm">
                             {
                            summary.content
                        }
                        </p>
                    </div>
                </div> : <div></div>
            })
        }
    </>;
}

export default ChatList;