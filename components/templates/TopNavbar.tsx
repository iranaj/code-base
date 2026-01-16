"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { en, persian } from "utils/translations";
import LogoHorizeotalFull from "components/UI/identity/LogoHorizontalFull";
import TopNavbarMobile from "./TopNavbarMobile";
import { motion, AnimatePresence } from "framer-motion";

export default function TopNavbar() {
  const params = useParams();
  const locale = params?.locale as string || "en-US";
  const pathname = usePathname();
  const router = useRouter();
  const [activeHash, setActiveHash] = useState("");

  // Track hash changes
  useEffect(() => {
    // Initial hash
    setActiveHash(window.location.hash || "#home");

    const handleHashChange = () => {
      setActiveHash(window.location.hash || "#home");
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const isHome = pathname === "/" || pathname === `/${locale}`;

  const text = locale !== "persian" ? en : persian;

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Visual state logic
  const showBackground = !isHome || scrolled;
  const showLogoDesktop = !isHome || scrolled;

  const switchLanguage = (newLocale: string) => {
    // Basic locale switching logic: replace the first segment if it matches a locale
    const segments = pathname.split("/");
    if (segments[1] === locale) {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join("/") || "/");
  };

  const navLinks = [
    { href: `/${locale}/#home`, label: text.home.title },
    { href: `/${locale}/about`, label: text.about.title },
    { href: `/${locale}/advocacy`, label: text.advocacy.title },
    { href: `/${locale}/events`, label: text.events.title },
    { href: `/${locale}/programs`, label: text.programs.title },
    { href: `/${locale}/press`, label: text.press.title },
    { href: `/${locale}/#contact`, label: text.contact.title },
  ];

  return (
    <motion.header
      className="fixed top-0 w-full z-50 transition-all duration-300 ease-in-out"
      initial={{ backgroundColor: "rgba(255, 255, 255, 0)", backdropFilter: "blur(0px)" }}
      animate={{
        backgroundColor: showBackground ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0)",
        backdropFilter: showBackground ? "blur(12px)" : "blur(0px)",
        boxShadow: showBackground ? "0 4px 6px -1px rgba(0, 0, 0, 0.05)" : "none",
      }}
      transition={{ duration: 0.3 }}
    >
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo Section */}
        <motion.div
           className={`${!showLogoDesktop && "md:invisible"}`}
           animate={{ opacity: showLogoDesktop ? 1 : 0 }}
           transition={{ duration: 0.3 }}
        >
          <Link href={`/${locale}`}>
            <LogoHorizeotalFull
              className={`w-36 transition-colors duration-300 ${
                showBackground ? "fill-primary-500" : "fill-white md:fill-secondary-500"
              }`}
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div
          className="hidden md:flex items-center gap-8 lg:gap-10 uppercase text-xs tracking-wider font-medium"
          dir={locale !== "persian" ? "ltr" : "rtl"}
        >
          {navLinks.map((link) => {
             const cleanHref = link.href.split("#")[0].replace(/\/$/, "").toLowerCase();
             const cleanPathname = pathname.replace(/\/$/, "").toLowerCase();
             
             // 3. Special handling for internal hash links on the home page
             const linkHash = link.href.split("#")[1] ? "#" + link.href.split("#")[1] : "";
             const isHashLink = link.href.includes("#");
             
             let isActive = false;
             if (isHashLink && isHome) {
               isActive = activeHash === linkHash;
             } else {
               isActive = cleanPathname === cleanHref || 
                 (cleanHref !== `/${locale}`.toLowerCase() && cleanPathname.startsWith(cleanHref + "/"));
             }
             
             // Dynamic color logic
             let textColorClass = "";
             if (showBackground) {
                // White/Light Background (Scrolled or Subpage)
                textColorClass = isActive ? "text-secondary-500 font-bold" : "text-projectGray-400 font-normal hover:text-secondary-500";
             } else {
                // Transparent Background (Top of Home)
                textColorClass = isActive ? "text-secondary-500 font-bold" : "text-white/70 font-normal hover:text-white";
             }

             return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative py-2 transition-colors duration-300 ${textColorClass} ${locale === "persian" ? "font-bodyFa" : "font-body"}`}
            >
              {link.label}
              
              {isActive && (
                <motion.span
                  layoutId="navbar-underline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
          })}
        </div>

        {/* Language Switcher & Mobile Menu */}
        <div className="flex items-center gap-4">
          <div className={`hidden md:flex items-center text-xs transition-colors duration-300 ${showBackground ? "text-projectGray-400" : "text-white/70 font-normal"}`}>
            <span
              className={`cursor-pointer transition-colors hover:text-secondary-500 ${
                locale === "en-US" 
                  ? "text-secondary-500 font-bold" 
                  : (showBackground ? "font-normal hover:text-secondary-500" : "font-normal hover:text-white")
              }`}
              onClick={() => switchLanguage("en-US")}
            >
              EN
            </span>
            <span className="mx-2">|</span>
            <span
              className={`cursor-pointer font-bodyFa transition-colors hover:text-secondary-500 ${
                locale === "persian" 
                  ? "text-secondary-500 font-bold" 
                  : (showBackground ? "font-normal hover:text-secondary-500" : "font-normal hover:text-white")
              }`}
              onClick={() => switchLanguage("persian")}
            >
              فا
            </span>
          </div>
          <div className="md:hidden">
            <TopNavbarMobile scrolled={showBackground} />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
