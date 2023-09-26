import Home from "../components/home/home";
import Navbar from "../components/navbar/navbar";
import "./App.css";

export default function HomePage() {
  return (
    <>
      <div>
        <Navbar />
        <Home />
      </div>
    </>
  );
}
