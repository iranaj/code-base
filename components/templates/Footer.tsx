"use client";

import LogoHorizeotalFull from "components/UI/identity/LogoHorizontalFull";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "react-feather";
import { useParams } from "next/navigation";
import { en, persian } from "utils/translations";

const Footer: React.FC = () => {
  const params = useParams();
  const locale = params?.locale as string || "en-US";

  const text = locale !== "persian" ? en : persian;
  return (
    <footer className="w-full md:h-48 bg-primary-500 px-10 md:px-0">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl xxl:max-w-7xl pt-7 md:pt-14 mx-auto gap-10 md:gap-32 text-project-gray-300 font-body text-xs">
        <div className="footer__logo">
          <LogoHorizeotalFull className="w-36 fill-project-gray-300 -mt-2" />
        </div>
        <ul className="uppercase w-full md:w-auto flex justify-between md:justify-start md:flex-col">
          <li className="mt-2">
            <Link
              className={`hover:text-secondary-500 cursor-pointer ${
                locale === "persian" ? "font-bodyFa font-normal" : ""
              }`}
              href={`/${locale}/#home`}
            >
              {text.home.title}
            </Link>
          </li>
          <li className="mt-2">
            <Link
              className={`hover:text-secondary-500 cursor-pointer ${
                locale === "persian" ? "font-bodyFa font-normal" : ""
              }`}
              href={`/${locale}/about`}
            >
              {text.about.title}
            </Link>
          </li>
          <li className="mt-2">
            <Link
              className={`hover:text-secondary-500 cursor-pointer ${
                locale === "persian" ? "font-bodyFa font-normal" : ""
              }`}
              href={`/${locale}/#contact`}
            >
              {text.contact.title}
            </Link>
          </li>
        </ul>
        <div className="text-base text-center md:text-left w-full md:w-auto md:text-sm text-project-gray-300 md:pt-3 ">
          <span
            className={`${
              locale === "persian" ? "font-bodyFa font-normal" : ""
            }`}
          >
            {text.general.name}
          </span>
          <p className="text-xs md:text-xxs font-light tracking-[0.25rem] md:tracking-normal">
            1802 Vernon St NW PMB 514
            <br />
            Washington, DC 20009
          </p>
        </div>
        <div className="flex w-full md:w-auto flex-col md:pt-4 ">
          <div className="flex  items-center justify-around md:gap-x-24 max-w-44 ">
            <Link
              href={`https://twitter.com/${text.general.social_media_usernames.twitter}`}
              target="_blank"
            >
              <Twitter
                size={18}
                strokeWidth={1}
                className="stroke-project-gray-300 hover:stroke-secondary-500 hover:stroke-2"
              />
            </Link>
            <Link
              href={`https://www.instagram.com/${text.general.social_media_usernames.instagram}`}
              target="_blank"
            >
              <Instagram
                size={18}
                strokeWidth={1}
                className="stroke-project-gray-300 hover:stroke-secondary-500 hover:stroke-2"
              />
            </Link>
            <Link
              href={`https://youtube.com/${text.general.social_media_usernames.youtube}`}
              target="_blank"
            >
              <Youtube
                size={18}
                strokeWidth={1}
                className="stroke-project-gray-300 hover:stroke-secondary-500 hover:stroke-2 "
              />
            </Link>
          </div>
          <span
            className={`text-xs text-center md:text-left md:text-xxs font-light ltr:tracking-[0.08rem] rtl:tracking-normal mt-8 mb-14 md:mb-0 ${
              locale === "persian"
                ? "font-bodyFa font-normal md:text-center tracking-normal"
                : ""
            }`}
          >
            © {text.general.name} {locale === "persian" ? "" : "2022"}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
