import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Dashboard } from "./pages/Dashboard";
import { Integrations } from "./pages/Integrations";
import { Tags } from "./pages/Tags";
import { Pixels } from "./pages/Pixels";
import { Events } from "./pages/Events";
import { SEO } from "./pages/SEO";
import { Consent } from "./pages/Consent";
import { Reports } from "./pages/Reports";
import { Sites } from "./pages/Sites";

export const App: React.FC = () => {
  return (
    <div className="omh-app">
      <Navbar />
      <main className="omh-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sites" element={<Sites />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/tags" element={<Tags />} />
          <Route path="/pixels" element={<Pixels />} />
          <Route path="/events" element={<Events />} />
          <Route path="/seo" element={<SEO />} />
          <Route path="/consent" element={<Consent />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </main>
    </div>
  );
};
