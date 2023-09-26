import "./navbar.css";
import quizLogo from "../../assets/quiz-logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={quizLogo} width={350}></img>
    </div>
  );
};

export default Navbar;
