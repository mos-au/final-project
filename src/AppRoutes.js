import { Routes, Route } from "react-router-dom";
import FeedsPage from "./pages/FeedsPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<FeedsPage />} />
      <Route path="/post/:postId" element={<div>Post Page</div>} />
      <Route path="*" element={<h1>404 Not Found!</h1>} />
    </Routes>
  );
};

export default AppRoutes;
