import "./Chat.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";

function Chat() {
    const {newChat, previousChats} = useContext(MyContext);
    return (
        <>
            {newChat && <h1>Start a new chat!</h1>}
            <div className="chats">
                    {
                        previousChats?.map((chat, idx) => 
                            <div className={chat.role === "user" ? "userDiv" : "alfredDiv"} key={idx}>
                                {
                                    chat.role === "user" ? 
                                    <p className="userMessage">{chat.content}</p> : 
                                    <p className="alfredMessage">{chat.content}</p>
                                }
                            </div>
                        )
                    }


                <div className="user">
                    <p className="userMessage">User Message</p>
                </div>
                <div className="alfred">
                    <p className="alfredMessage">Alfred Message</p>
                </div>
            </div>
        </>
    )
}

export default Chat;