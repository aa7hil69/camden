import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./pages/home";
import { Contact } from "./pages/contact";
import { Events } from "./pages/events";
import { Products } from "./pages/products";
import { Privacy } from "./pages/privacy";
import { Terms } from "./pages/terms";
import { ScrollToTopButton } from "./components/scrolltop";
import { Notfound } from "./pages/notfound";
import useRestoreThenAnimateToTop from "./hooks/useRestoreThenScrollTop";
import "./index.css";

const Splash = ({ visible = true }) => (
  <div
    className={[
      "fixed inset-0 z-[9999] flex items-center justify-center bg-[#32348d]",
      "transition-opacity duration-300 ease-out",
      visible ? "opacity-100" : "opacity-0",
    ].join(" ")}
    aria-hidden={!visible}
  >
    <img
      src="/logopics/logo.png"
      alt="Camden Imports & Exports logo"
      className="h-28 w-40 object-contain"
    />
  </div>
);

function useFooterSafeArea() {
  const location = useLocation();
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    const setVar = () => {
      const h = footer?.offsetHeight ?? 0;
      document.documentElement.style.setProperty("--footer-safe", `${h + 16}px`);
    };
    const raf = requestAnimationFrame(setVar);
    const ro = footer ? new ResizeObserver(setVar) : null;
    if (footer && ro) ro.observe(footer);
    window.addEventListener("resize", setVar);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setVar);
      ro?.disconnect();
    };
  }, [location.pathname]);
}

const AppShell = ({ appReady }) => {
  useFooterSafeArea();

  return (
    <>
      <Routes>
        <Route path="/" element={<Home appReady={appReady} />} />
        <Route path="/contact" element={<Contact appReady={appReady} />} />
        <Route path="/events" element={<Events appReady={appReady} />} />
        <Route path="/products" element={<Products appReady={appReady} />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/*" element={<Notfound />} />
      </Routes>
      <ScrollToTopButton showAfter={200} className="back-to-top" />
    </>
  );
};

const App = () => {
  const [booting, setBooting] = useState(true);
  const [bootSplashVisible, setBootSplashVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    )?.matches;
    const hold = reduced ? 0 : 1000;
    const t = setTimeout(() => setBooting(false), hold);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (booting) {
      document.body.style.overflow = "hidden";
      document.body.classList.remove("app-ready");
      setBootSplashVisible(true);
    } else {
      const reduced = window.matchMedia?.(
        "(prefers-reduced-motion: reduce)"
      )?.matches;
      const fade = reduced ? 0 : 300;
      const t = setTimeout(() => {
        setBootSplashVisible(false);
        document.body.classList.add("app-ready");
      }, fade);
      document.body.style.overflow = "";
      return () => clearTimeout(t);
    }
  }, [booting]);

  const appReady = !bootSplashVisible;
  useRestoreThenAnimateToTop({ delayMs: 400, enabled: appReady });

  return (
    <>
      {bootSplashVisible && <Splash visible={booting} />}
      <AppShell appReady={appReady} />
    </>
  );
};

export default App;
