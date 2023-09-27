import "./New-quiz.css";
import { useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export type QuizProps = {
  title: string;
  //description: string;
};

const NewQuiz = () => {
  const [quiz, setQuiz] = useState<QuizProps>({
    title: "",
    //description: "",
  });

  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    try {
      const response = await axios.post("/api/quizzes/new", quiz);
      console.log("response:", response);
    } catch (err) {
      console.log("Post to backend unsuccessful.", err);
    }
  };

  const handleClick = () => {
    // to /new-question
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Quiz Name</label>
        </div>
        <div>
          <input
            type="text"
            id="quizName"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            placeholder="Enter a quiz name"
          />
        </div>
        <button type="submit">Create Quiz</button>
      </form>

      <div>
        <button onClick={handleClick}>Continue</button>
      </div>
    </>
  );
};
export default NewQuiz;

//{
/* <div>
<label htmlFor="quiz-description">Quiz Description</label>
</div>
<div className="quiz-form-field">
<input
  id="quiz-description"
  name="description"
  value={quiz.description}
  onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
  placeholder="Enter a quiz description"
/>
</div> */
//}
