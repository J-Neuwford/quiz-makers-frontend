import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewQuizPage from "./pages/new-quiz-page";
import HomePage from "./pages/home-page";
import AllQuizzesPage from "./pages/all-quizzes-page";
import QuizPage from "./pages/quiz-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/new-quiz",
    element: <NewQuizPage />,
  },
  {
    // path: "/quizzes
    path: "/all-quizzes",
    element: <AllQuizzesPage />,
  },
  {
    // path: "/quiz/:id",
    path: "/quiz",
    element: <QuizPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
