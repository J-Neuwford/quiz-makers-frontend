import Home from "./components/home/home";
import Navbar from "./components/navbar/navbar";
import "./App.css";

export default function Root() {
  return (
    <>
      <div>
        <Navbar />
        <Home />
      </div>
    </>
  );
}
