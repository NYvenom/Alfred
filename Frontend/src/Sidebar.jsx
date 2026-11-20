import "./Sidebar.css";

function Sidebar() {
    return (
        <section className="sidebar">
            <button>
                <img className="logo" src="src/assets/Alfred.png" alt="Alfred logo"></img>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>
            
            <ul className="history">
                <li>history1</li>
                <li>history2</li>
                <li>history3</li>
            </ul>

            <div className="sign">
                <p>My Alfred &hearts;</p>
            </div>
        </section>
    )
}

export default Sidebar;