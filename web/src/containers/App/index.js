import { useState, useEffect, createContext } from "react";
import { Route, Routes } from "react-router";

import HomePage from "../Home";

export const NotesContext = createContext();

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      {/* <Route path="/search" element={<SearchPage />} />
      <Route path="/changed" element={<ChangedCurrencyPage />} />
      <Route path="/currency/:id" element={<CurrencyPage />} /> */}
    </Routes>
  );
}

export default App;
