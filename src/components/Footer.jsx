import React from 'react';
import { IoMapSharp } from 'react-icons/io5';
import { FaPhone } from 'react-icons/fa6';
import { IoMailOpen } from 'react-icons/io5';
import { FaFacebookSquare, FaInstagramSquare, FaYoutubeSquare, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="w-full bg-[#32348d] text-white font-teko text-ss relative">
      {/* Background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/picsin/background.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#32348d]/20 sm:bg-transparent pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 border-t border-white/10">
        
        {/* CONTACT US */}
        <div className="font-teko -mt-4 sm:-mt-8 lg:-mt-10 space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl tracking-wide text-white mb-4 sm:mb-6">CONTACT US</h3>
          <ul className="mt-6 sm:mt-6 space-y-3 sm:space-y-4 text-white/90 text-[0.95rem] leading-6">
            <li className="flex items-start gap-3">
              <IoMapSharp className="h-6 w-6 text-[#00acec]" />
              <a
                href="https://www.google.com/maps/search/?api=1&query=1974,+Block+IX,+Grace+Villa,+Link+Valley,+Infopark+Road,+Opp.+Kusumagiri+Hospital,+Kakkanad,+Ernakulam,+Kerala,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="leading-6 font-light text-sm hover:text-[#00acec] transition-colors"
              >
                1974, Block IX, Grace Villa, Link Valley, <br />
                Infopark Road, Opp. Kusumagiri Hospital, <br />
                Kakkanad P.O., Ernakulam 682030, Kerala, India
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaPhone className="text-[#00acec] h-5 w-5" />
              <a
                href="tel:+96897708198"
                className="font-light text-sm hover:text-[#00acec] transition-colors"
              >
                +968 9770 8198
              </a>
            </li>
            <li className="flex items-center gap-3">
              <IoMailOpen className="text-[#00acec] h-6 w-6" />
              <a
                href="mailto:jessymathewhr@gmail.com"
                className="font-light text-sm hover:text-[#00acec] transition-colors"
              >
                jessymathewhr@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* LOCATION MAP */}
        <div className="font-teko -mt-4 sm:-mt-8 lg:-mt-10 space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl tracking-wide text-white mb-4 sm:mb-6">LOCATION MAP</h3>
          <div className="mx-auto w-full max-w-[520px] mt-6 sm:mt-6">
            <iframe
              className="block w-full h-[180px] sm:h-[180px] rounded-lg border border-white/10"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3928.990776904857!2d76.35610197478464!3d10.017619172731811!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b080c9aaaaaaaab%3A0xe3e71c1596b96ca4!2sKusumagiri%20Mental%20Health%20Centre!5e0!3m2!1sen!2sin!4v1757969782692!5m2!1sen!2sin" 
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            />
          </div>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="font-teko -mt-4 sm:-mt-8 lg:-mt-10 space-y-4 sm:space-y-6">
          <h3 className="text-lg sm:text-xl tracking-wide text-white mb-4 sm:mb-6">SOCIAL MEDIA</h3>
          <p className="text-white text-sm font-light mt-4 sm:mt-6 mb-5 sm:mb-6 leading-6">
            Find your next big opportunity with JJ² Consultancy UK Limited — where top talent meets top employers!
          </p>
          <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <FaFacebookSquare className="h-6 w-6 text-white" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <FaInstagramSquare className="h-6 w-6 text-white" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors">
              <FaYoutubeSquare className="h-6 w-6 text-white" />
            </a>
            <a
              href="https://www.linkedin.com/in/jessy-mathew-55318b99"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <FaLinkedin className="h-6 w-6 text-white/80" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div id="site-footer" className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-3 sm:py-4 text-ss font-teko text-center font-light text-white/70">
          © {new Date().getFullYear()} CAMDEN IMPORTS & EXPORTS
        </div>
      </div>
    </footer>
  );
};
