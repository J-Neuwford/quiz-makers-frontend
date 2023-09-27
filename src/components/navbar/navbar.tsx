import "./navbar.css";
import quizLogo from "../../assets/quiz-logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <div className="logo-container">
          <img src={quizLogo} width={350} alt="Quiz Logo" />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
