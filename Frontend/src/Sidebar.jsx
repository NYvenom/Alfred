import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import {v1 as uuidv1} from "uuid";

function Sidebar() {
    const { allThreads, setAllThreads, currentThreadId, setNewChat, setPrompt, setReply, setCurrentThreadId, setPreviousChats } = useContext(MyContext);

    const getAllThreads = async () => {


        try {
            const response = await fetch("http://localhost:8080/api/thread");
            const res = await response.json();
            const filteredData = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
            // console.log(filteredData);
            setAllThreads(filteredData);
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllThreads();
    }, [currentThreadId])

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrentThreadId(uuidv1());
        setPreviousChats([]);
    }

    const changeThread = async (newThreadId) => {
        setCurrentThreadId(newThreadId);

        try{
            const response = await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
            const res = await response.json();
            setPreviousChats(res);
            setNewChat(false);
            setReply(null);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <section className="sidebar">
            <button onClick={createNewChat}>
                <img className="logo" src="src/assets/Alfred.png" alt="Alfred logo"></img>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>
            
            <ul className="history">
                {
                    allThreads?.map((thread, idx) => (
                        <li key={idx} onClick={(e) => changeThread(thread.threadId)}
                        >{thread.title}</li>
                    ))
                }
            </ul>

            <div className="sign">
                <p>My Alfred &hearts;</p>
            </div>
        </section>
    )
}

export default Sidebar;