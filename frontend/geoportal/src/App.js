import './Assets/global.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Menu } from "./Components/Menu/Menu";
import { Main } from "./Pages/Main/Main";

export const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/map" element={<h1>Карта</h1>} />
        <Route path="/about" element={<h1>Описание</h1>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
