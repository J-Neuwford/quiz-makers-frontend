import { useState } from "react";
import axios from "axios";
import { QuizProps, QuestionProps } from "../new-quiz/new-quiz";

const NewQuestion = ({ quizTitle, newQuizId }) => {
  const [question, setQuestion] = useState<QuestionProps>({
    questionText: "",
    quizId: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/questions/new", question);
      console.log(response);
    } catch (err) {
      console.log("Post to backend unsuccessful.", err);
    }
  };

  return (
    <>
      <div>{`Your ${quizTitle} quiz ${newQuizId}`}</div>
      <form>
        <div>
          <label>Add a question</label>
        </div>
        <div>
          <textarea
            rows="3"
            id="questionName"
            value={question.questionText}
            onChange={(e) => {
              setQuestion({
                ...question,
                questionText: e.target.value,
                quizId: newQuizId,
              });
            }}
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          Add question
        </button>
      </form>
    </>
  );
};

export default NewQuestion;
