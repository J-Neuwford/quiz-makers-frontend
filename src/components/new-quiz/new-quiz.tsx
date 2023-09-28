import "./New-quiz.css";
import { useState } from "react";
import axios from "axios";
import NewQuestion from "../new-question/new-question";

export type QuizProps = {
  title: string;
  //description: string;
};

export type QuestionProps = {
  questionText: string;
  quizId: number | null;
};

const NewQuiz = () => {
  const [quiz, setQuiz] = useState<QuizProps>({
    title: "",
    //description: "",
  });
  const [showForm, setShowForm] = useState(true);
  const [quizId, setQuizId] = useState<number | null>(null);
  const [buttonText, setButtonText] = useState<string>("Create Quiz");
  const [submitIsDisabled, setSubmitIsDisabled] = useState<boolean>(false);
  const [continueIsDisabled, setContinueIsDisabled] = useState<boolean>(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (quiz.title != "") {
        const response = await axios.post("/api/quizzes/new", quiz);
        console.log("response:", response);
        setButtonText("Quiz created!");
        setSubmitIsDisabled(true);
        setContinueIsDisabled(false);
      }
    } catch (err) {
      console.log("Post to backend unsuccessful.", err);
    }
  };

  const getQuizId = async () => {
    console.log("requesting quiz id");
    try {
      const response = await axios.get("/api/quizzes");
      const lastQuizIndex = response.data.quizzes.length - 1;
      console.log("response:", response.data.quizzes[lastQuizIndex].id);
      return response.data.quizzes[lastQuizIndex].id;
    } catch (err) {
      console.log("get quizzes unsuccessful");
    }
  };

  const handleClick = async () => {
    setShowForm(false);
    console.log("QUIZ: ", quiz);
    const quizId = await getQuizId();
    setQuizId(quizId);
  };

  return (
    <>
      <div className="container">
        {showForm && (
          <form>
            <div>
              <label className="form">Enter quiz name:</label>
            </div>
            <div>
              <input
                className="form"
                type="text"
                value={quiz.title}
                onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                placeholder="Enter a quiz name"
              />
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitIsDisabled}
            >
              {`${buttonText}`}
            </button>
          </form>
        )}

        {!showForm && <NewQuestion quizTitle={quiz.title} newQuizId={quizId} />}

        <div>
          <button onClick={handleClick} disabled={continueIsDisabled}>
            Continue
          </button>
        </div>
      </div>
    </>
  );
};
export default NewQuiz;
