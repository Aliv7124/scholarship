import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Scholarships from "./pages/Scholarships";
import Matcher from "./pages/Matcher";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import Admin from "./pages/Admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/scholarships" element={<Scholarships />} />
      <Route path="/ai-matcher" element={<Matcher />} />
      <Route path="/categories" element={<Scholarships />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/account" element={<Account />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/students" element={<Admin />} />
      <Route path="/admin/applications" element={<Admin />} />
      <Route path="/admin/scholarships" element={<Admin />} />
      <Route path="/blog" element={<Home />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
