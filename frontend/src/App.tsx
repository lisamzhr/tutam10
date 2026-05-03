import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./pages/LandingPage";
import { RsvpForm } from "./pages/RsvpForm";
import { SuccessPage } from "./pages/SuccessPage";
import { GuestList } from "./pages/GuestList";
import { ContactPage } from "./pages/ContactPage";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/rsvp" element={<RsvpForm />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/guests" element={<GuestList />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;