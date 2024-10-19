import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";

import DataProvider from "./components/hoc/DataProvider";

import Navbar from "./components/navbar/Navbar";
import ContentPage from "./pages/content/ContentPage";
import HomePage from "./pages/home/HomePage";
import Footer from "./components/footer/Footer";
import AnnoucmentsPage from "./pages/announcments/AnnouncmentsPage";
import NewsPage from "./pages/news/NewsPage";
import PartnersPage from "./pages/partners/PartnersPage";
import AnnouncmentsDetails from "./components/announcments/AnnouncmentDetails";
import NewsDetails from "./components/news/NewsDetails";
import CustomContentPage from "./pages/custom/CustomContentPage";
import VacancyPage from "./pages/vacancy/VacancyPage";
import CategoryPage from "./pages/vacancy/category/CategoryPage";
import VacancyDetails from "./components/vacancies/VacancyDetails";
import PersonalDetails from "./pages/personal/PersonalDetails";
import ProgramDetails from "./pages/program/ProgramDetails";
import ProgramExams from "./pages/program/ProgramExams";
import RegistrationPage from "./pages/registration/RegistrationPage";
import TrainingPage from "./pages/training/TrainingPage";
import TrainingDetails from "./pages/training/TrainingDetails";
import ArticlePage from "./pages/article/ArticlePage";
import VideoPage from "./pages/videos/VideoPage";
import PhotoPage from "./pages/photo/PhotoPage";
import PhotoDetails from "./pages/photo/PhotoDetails";

function App() {
  const { i18n, t } = useTranslation();
  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  return (
    <BrowserRouter>
      <DataProvider>
        <ToastContainer style={{ zIndex: 9999 }} />
        <Navbar />
        <div className="maintenance">{t("maintenance")}</div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/announcments" element={<AnnoucmentsPage />} />
          <Route
            path="/announcments/details/:id"
            element={<AnnouncmentsDetails />}
          />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/news/details/:id" element={<NewsDetails />} />
          <Route path="/partners" element={<PartnersPage />} />
          <Route path="/:id" element={<ContentPage />} />
          <Route path="/custom/:id" element={<CustomContentPage />} />
          <Route path="/vacancies" element={<VacancyPage />} />
          <Route path="/vacancies/:id" element={<CategoryPage />} />
          <Route path="/vacancies/details/:id" element={<VacancyDetails />} />
          <Route path="/personals/:id" element={<PersonalDetails />} />
          <Route path="/programs/:id" element={<ProgramDetails />} />
          <Route path="/programs/exam/:id" element={<ProgramExams />} />
          <Route path="/register/:id" element={<RegistrationPage />} />
          <Route path="/trainings" element={<TrainingPage />} />
          <Route path="/trainings/:id" element={<TrainingDetails />} />
          <Route path="/photos" element={<PhotoPage />} />
          <Route path="/photos/:id" element={<PhotoDetails />} />
          <Route path="/videos" element={<VideoPage />} />
          <Route path="/articles" element={<ArticlePage />} />
        </Routes>
        <Footer />
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;
