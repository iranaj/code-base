import { useEffect, useState } from "react";
import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";
import LogoHorizeotalFull from "components/UI/identity/LogoHorizontalFull";
import TopNavbarMobile from "./TopNavbarMobile";
import { motion, AnimatePresence } from "framer-motion";

export default function TopNavbar() {
  const router: NextRouter = useRouter();
  const { locale, pathname } = router;
  const isHome = pathname === "/";

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
          <Link href="/">
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
          {[
            { href: "/#home", label: text.home.title },
            { href: "/about", label: text.about.title },
            { href: "/advocacy", label: text.advocacy.title },
            { href: "/events", label: text.events.title },
            { href: "/programs", label: text.programs.title },
            { href: "/press", label: text.press.title },
            { href: "/#contact", label: text.contact.title },
          ].map((link) => {
             const isActive =
                (link.href === "/#home" && router.pathname === "/" && (!router.asPath.includes("#") || router.asPath.endsWith("#home"))) ||
                router.asPath === link.href ||
                (link.href !== "/#home" && router.asPath.startsWith(link.href));
             
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
              onClick={() => router.push(router.pathname, router.asPath, { locale: "en-US" })}
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
              onClick={() => router.push(router.pathname, router.asPath, { locale: "persian" })}
            >
              فا
            </span>
          </div>
          <div className="md:hidden">
            <TopNavbarMobile />
          </div>
        </div>
      </nav>
    </motion.header>
  );
}
