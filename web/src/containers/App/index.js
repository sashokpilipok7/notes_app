import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";

import { HomePage, CreateNotePage, NotePage } from "containers";
import { NotesProvider } from "context/notes-context";

export function App() {
  const routes = (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route path="/notes/:id" element={<NotePage />} />
      <Route path="/create" element={<CreateNotePage />} />
      <Route path="/edit/:id" element={<CreateNotePage isEdit={true} />} />
    </Routes>
  );
  return (
    <NotesProvider>
      {routes}
      <ToastContainer />
    </NotesProvider>
  );
}
