import Home from "../components/home/home";
import Navbar from "../components/navbar/navbar";
import backgroundImage from "../assets/quiz-bg.png";
import "./App.css";

export default function Root() {
  return (
    <>
      <div>
        <div className="background">
          <Navbar />
          <img src={backgroundImage}></img>
          <Home />
        </div>
      </div>
    </>
  );
}
