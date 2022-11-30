import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";
import LogoHorizeotalFull from "components/UI/identity/LogoHorizontalFull";
import TopNavbarMobile from "./TopNavbarMobile";

export default function TopNavbarSinglePage() {
  const router: NextRouter = useRouter();
  const { locale } = router;

  const text = locale !== "persian" ? en : persian;

  return (
    <header
      className={`fixed flex w-full transition-all ease-in-out duration-500 top-0 bg-gray-100 z-50 pt-2`}
    >
      <nav className="flex justify-between w-full md:h-20 p-2 md:p-0 h-20 max-w-5xl xxl:max-w-7xl mx-auto gap-36 text-projectGray-300 font-body font-regular text-xs">
        <div className="pl-5 pt-4 md:pt-0 md:pl-0">
          <LogoHorizeotalFull className="w-32 fill-primary-500 md:-mt-1" />
        </div>
        <div
          className="hidden md:flex items-center w-full justify-end gap-24 uppercase"
          dir={locale !== "persian" ? "ltr" : "rtl"}
        >
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
          {/* language selection */}
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

          <div className="md:hidden">
            <TopNavbarMobile />
          </div>
        </div>
      </nav>
    </header>
  );
}
