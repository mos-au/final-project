import { Routes, Route } from "react-router-dom";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Feeds Page</div>} />
      <Route path="/post/:postId" element={<div>Post Page</div>} />
      <Route path="*" element={<h1>404 Not Found!</h1>} />
    </Routes>
  );
};

export default AppRoutes;
