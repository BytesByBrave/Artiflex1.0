import { Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout.jsx";
import Home from "../pages/Home.jsx";
import ServicesPage from "../pages/ServicesPage.jsx";
import WorkPage from "../pages/WorkPage.jsx";
import ProjectDetailPage from "../pages/ProjectDetailPage.jsx";
import AboutPage from "../pages/AboutPage.jsx";
import ContactPage from "../pages/ContactPage.jsx";
import BookPage from "../pages/BookPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
