import Home from "./components/home/home";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import backgroundImage from "./assets/quiz-bg.png";

function App() {
  return (
    <div>
      <div className="background">
        <img src={backgroundImage}></img>
        <Navbar />
        <Home />
      </div>
    </div>
  );
}

export default App;
