import React from "react";
import "./App.css"
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "./Layout/MainLayout";
import { HomePage } from "./Components/HomePage/HomePage";
import { NotFound } from "./Components/NotFound";

export const App: React.FC = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />

      </Route>
        <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
}