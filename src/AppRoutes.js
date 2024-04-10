import { Routes, Route } from "react-router-dom";
import FeedsPage from "./pages/FeedsPage";
import PostPage from "./pages/PostPage/PostPage";
import CreateNewPage from "./pages/CreateNewPage/CreateNewPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FeedsPage />} />
      <Route path="/post/:postId" element={<PostPage />} />
      <Route path="/createNew" element={<CreateNewPage />} />
      <Route path="*" element={<h1>404 Not Found!</h1>} />
    </Routes>
  );
};

export default AppRoutes;
