import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navbarRef = useRef(null);
  const location = useLocation();

  const navItems = [
    { id: 1, name: "Home", path: "/" },
    { id: 2, name: "Contact Us", path: "/contact" },
    { id: 3, name: "Events", path: "/events" },
    { id: 4, name: "Products", path: "/products" },
  ];

  const toggleNavbar = () => setIsOpen((v) => !v);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const original = document.body.style.overflow;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("nav-open");
    } else {
      document.body.style.overflow = original || "";
      document.body.classList.remove("nav-open");
    }
    return () => {
      document.body.style.overflow = original || "";
      document.body.classList.remove("nav-open");
    };
  }, [isOpen]);

  // Scrolled state for navbar styling
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active/hover underline styling
  const linkClass = (path) =>
    [
      "relative inline-block pb-1 transition-colors duration-200 rounded",
      "focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/70",
      "after:content-[''] after:absolute after:left-1/2 after:bottom-0",
      "after:h-[2px] after:w-0 after:bg-[#00acec] after:-translate-x-1/2",
      "after:transition-all after:duration-300 after:ease-out",
      location.pathname === path ? "after:w-full text-[#00acec]" : "hover:after:w-full",
    ].join(" ");

  return (
    <>
      <div
        id="navbar"
        ref={navbarRef}
        className={[
          "w-full h-16 fixed top-0 z-50 transition-colors duration-300",
          isScrolled ? "backdrop-blur-sm bg-[#32348d]" : "bg-[#32348d]",
          "border-b border-b-white/10",
        ].join(" ")}
      >
        {/* DESKTOP (md+) */}
        <div className="hidden md:flex items-center h-16 px-4 md:px-6 max-w-[1280px] mx-auto w-full">
          {/* Left group */}
          <ul className="flex-1 flex items-center justify-end gap-6 md:gap-8 lg:gap-10 text-white text-base md:text-sm font-normal font-teko pr-3 md:pr-6 min-w-0">
            <li><Link to="/" className={linkClass("/")}>HOME</Link></li>
            <li><Link to="/contact" className={linkClass("/contact")}>CONTACT US</Link></li>
          </ul>

          {/* Center logo (unchanged sizes/position) */}
          <div className="shrink-0 flex items-center justify-center">
            <img
              src="/logopics/logo.png"
              alt="Logo"
              className="h-[120px] w-[160px] md:h-[120px] md:w-[180px] md:mt-15 mt-0 lg:h-[120px] lg:w-[180px] mt-0 bg-[#32348d] rounded-b-full"
            />
          </div>

          {/* Right group */}
          <ul className="flex-1 flex items-center justify-start gap-6 md:gap-8 lg:gap-10 text-white text-base md:text-sm font-normal font-teko pl-3 md:pl-6 min-w-0">
            <li><Link to="/clients" className={linkClass("/events")}>EVENTS</Link></li>
            <li><Link to="/products" className={linkClass("/products")}>PRODUCTS</Link></li>
          </ul>
        </div>

        {/* MOBILE (< md) */}
        <div className="flex md:hidden w-full items-center h-16 px-3 xs:px-4 bg-[#32348D] relative">
          {/* Left spacer keeps logo truly centered on tiny widths */}
          <div className="w-10 shrink-0" />

          {/* Centered logo (unchanged sizes/position) */}
          <div className="flex-1 flex justify-center items-center pointer-events-none min-w-0">
            <img
              src="/logopics/logo.png"
              alt="Logo"
              className="h-[120px] w-[160px] mt-10 bg-[#32348d] rounded-b-full"
            />
          </div>

          {/* Hamburger */}
          <button
            onClick={toggleNavbar}
            className="w-10 shrink-0 flex items-center justify-center text-white focus:outline-none z-20"
            aria-label="Open menu"
            aria-expanded={isOpen}
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Mobile Slide-Out Menu */}
        <div
          className={[
            "fixed md:hidden inset-0 bg-[#32348D] text-white transform",
            "transition-transform duration-300 ease-in-out",
            isOpen ? "translate-x-0" : "translate-x-full",
            "z-50",
          ].join(" ")}
          role="dialog"
          aria-modal="true"
        >
          {/* Top row with close */}
          <div className="relative w-full h-16 flex items-center justify-center px-4 bg-[#32348D]">
            <button
              onClick={toggleNavbar}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white focus:outline-none"
              aria-label="Close menu"
            >
              <IoMdClose size={28} />
            </button>
          </div>

          {/* Scrollable menu */}
          <div className="w-full h-[calc(100vh-64px)] flex items-center justify-center px-6 bg-[#32348D] overflow-auto">
            <ul className="w-full max-w-sm flex flex-col items-stretch gap-5">
              {navItems.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <li key={item.id}>
                    <Link
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={[
                        "block w-full text-center py-3 rounded-md",
                        "text-lg sm:text-xl font-normal tracking-wide break-words",
                        active ? "text-[#00acec] bg-white/5" : "text-white hover:text-[#00acec] hover:bg-white/5",
                        "transition-colors duration-200",
                      ].join(" ")}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar on desktop */}
      <div className="hidden md:block h-16" />
    </>
  );
};
