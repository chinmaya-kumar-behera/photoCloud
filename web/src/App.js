import Header from "./components/header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadPage from "./page/UploadPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<UploadPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
