import { RouterProvider, createBrowserRouter } from "react-router-dom";
import NewQuizPage from "./pages/new-quiz-page";
import HomePage from "./pages/home-page";
import NewQuestionPage from "./pages/new-question-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/new-quiz",
    element: <NewQuizPage />,
  },
]);
export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
