import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import axios from "axios";
import Header from "./components/Header";
import NotificationsList from "./components/NotificationsList";
import ErrorPage from './components/ErrorPage';
import CreateE from "./components/crud/CreateE";
import UpdateE from "./components/crud/UpdateE";
import TemplateBirthday from "./components/Templates/TemplateBirthday";
import TemplatePosition from "./components/Templates/TemplatePosition";
import TemplateLate from "./components/Templates/TemplateLate";


function App() {

  return (
    <>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<NotificationsList />} />
        <Route path="/create" element={<CreateE />} />
        <Route path="/template/birthday" element={<TemplateBirthday />} />
        <Route path="/template/position" element={<TemplatePosition />} />
        <Route path="/template/late" element={<TemplateLate />} />
        <Route path='/update' element={<UpdateE />} />
        <Route path='/update/:id' element={<UpdateE />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

/*

<Route path="/template/birthday"
element={<Template
content="I want to wish you a funny and happy birthday!! See you soon!" />}
/>
<Route path="/template/position" 
element={<Template
content="Congratulations for your new position!! You´r going to be a great professional!" />}
/>
<Route path="/template/late" 
element={<Template
content="Today I´ll be late, don´t wait for me to dinner" />}
/>
*/