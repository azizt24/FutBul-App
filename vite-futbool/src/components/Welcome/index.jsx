import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TeamAutoComplete from "../AutoComplete";

function Welcome() {
  const [welcome, setWelcome] = useState(true);
  const navigate = useNavigate();

  const saveMyFavTeam = (item) => {
    localStorage.setItem("Fav team", item.id);
    localStorage.setItem("NewsInfo", item.name);
  };

  const handleNavigate = () => {
    setWelcome(false);
    navigate("/home", { replace: true });
  };

  return (
    <section
      style={{
        backgroundImage:
          "url('https://upload.wikimedia.org/wikipedia/commons/b/b8/Etihad_Stadium.jpg')",
        backgroundSize: "cover",
        backgrounRepeat: "norepeat",
        position: "fixed",
        width: "100%",
        height: "100%",
      }}
    >
      {welcome ? (
        <article
          id="welcome"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 0%, #05110090  10%, #1f3223 50%)",
            backgroundSize: "cover",
            backgroundRepeat: "norepeat",
            position: "fixed",
            width: "100%",
            height: "100%",
          }}
        >
          <div id="scroll-container" className="mt-3">
            <div id="scroll-text">
              keep track of how is your favourite football team doing | check
              league tables | compare teams | find out latest news
            </div>
          </div>
          <main className="mx-auto my-5 w-100 d-flex flex-column align-items-center justify-content-center h-75">
            <h1>Welcome to Futbul App</h1>
            <hr />
            <h3>Keep track of your favourite team and more ...</h3>

            <TeamAutoComplete whichPage={saveMyFavTeam} />
           
            <button
              id="welcome-button"
              type="button"
              onClick={handleNavigate}
            >
              To your team &#8680;{" "}
            </button>
          </main>
        </article>
      ) : (
        <Navigate to="/home" replace />
      )}
    </section>
  );
} 


export default Welcome;
  <button onClick={() => localStorage.setItem('Fav team', favTeam)}>Lets start</button>