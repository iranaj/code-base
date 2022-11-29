import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";

export default function TopNavbar() {
  const router: NextRouter = useRouter();
  const { locale } = router;

  const text = locale !== "persian" ? en : persian;

  // calculate screen height
  const [showSecondaryTopNav, setShowSecondaryTopNav] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setShowSecondaryTopNav(true);
    } else {
      setShowSecondaryTopNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed flex w-full transition-all ease-in-out duration-500 ${
        showSecondaryTopNav
          ? "top-2 bg-gray-100"
          : "top-5 xxl:top-24 backdrop-blur"
      } z-50`}
    >
      <nav className="flex justify-between w-full h-20 max-w-5xl xxl:max-w-7xl mx-auto gap-36 text-projectGray-300 font-body font-regular text-xs">
        <div className={`${showSecondaryTopNav ? "" : "hidden"}`}>
          <Image
            src={`/logo_horizontal.svg`}
            alt="NAJ logo"
            width={107}
            height={54}
            className="max-w-none mb-4"
          />
        </div>
        <div className="hidden md:flex items-center w-full justify-end gap-24 uppercase">
          <Link
            href="/#home"
            className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
              locale === "persian" ? "font-bodyFa font-normal" : null
            }`}
          >
            {text.home.title}
          </Link>
          <Link
            href="/about"
            className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
              locale === "persian" ? "font-bodyFa font-normal" : null
            }`}
          >
            {text.about.title}
          </Link>
          <Link
            href="/#contact"
            className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
              locale === "persian" ? "font-bodyFa font-normal" : null
            }`}
          >
            {text.contact.title}
          </Link>
        </div>
        <div className="flex items-center w-28 ">
          <div className="hidden md:block">
            <span
              className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
                locale !== "persian" ? "text-secondary-500 " : null
              }`}
              onClick={() =>
                router.push(router.pathname, router.pathname, {
                  locale: "en-US",
                })
              }
            >
              english
            </span>
          </div>
          <div className="hidden md:block">
            <span className="inline-block rounded-lg py-1 px-2 ">|</span>
          </div>

          <div className="hidden md:block">
            <span
              className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 font-bodyFa font-normal cursor-pointer ${
                locale !== "en-US" ? "text-secondary-500 " : null
              }`}
              onClick={() =>
                router.push(router.pathname, router.pathname, {
                  locale: "persian",
                })
              }
            >
              فارسی
            </span>
          </div>

          <div className="-mr-1 md:hidden">
            <div>
              <button
                className="relative z-10 flex h-8 w-8 items-center justify-center [:not(:focus-visible)]:focus:outline-none"
                aria-label="Toggle Navigation"
                id="headlessui-popover-button-:R1p6:"
                type="button"
                aria-expanded="false"
              >
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path
                    d="M0 1H14M0 7H14M0 13H14"
                    className="origin-center transition"
                  />
                  <path
                    d="M2 2L12 12M12 2L2 12"
                    className="origin-center transition scale-90 opacity-0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
