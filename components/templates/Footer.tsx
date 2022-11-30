import LogoHorizeotalFull from "components/UI/identity/LogoHorizontalFull";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "react-feather";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";

const Footer: React.FC = () => {
  const router: NextRouter = useRouter();
  const { locale } = router;

  const text = locale !== "persian" ? en : persian;
  return (
    <footer className="w-full h-48 bg-primary-500">
      <div className="flex justify-between w-full max-w-6xl xxl:max-w-7xl pt-14 mx-auto gap-32 text-projectGray-300 font-body text-xs ">
        <div className="footer__logo">
          <LogoHorizeotalFull className="w-36 fill-gray-300 -mt-2" />
        </div>
        <ul className="uppercase flex flex-col">
          <li className="mt-2">
            <Link
              className={`hover:text-secondary-500 cursor-pointer ${
                locale === "persian" ? "font-bodyFa font-normal" : null
              }`}
              href="/#home"
            >
              {text.home.title}
            </Link>
          </li>
          <li className="mt-2">
            <Link
              className={`hover:text-secondary-500 cursor-pointer ${
                locale === "persian" ? "font-bodyFa font-normal" : null
              }`}
              href="/about"
            >
              {text.about.title}
            </Link>
          </li>
          <li className="mt-2">
            <Link
              className={`hover:text-secondary-500 cursor-pointer ${
                locale === "persian" ? "font-bodyFa font-normal" : null
              }`}
              href="/#contact"
            >
              {text.contact.title}
            </Link>
          </li>
          {/* <li>
              <Link href="https://diosf.com/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="https://diosf.com/terms">Terms</Link>
            </li> */}
        </ul>
        <div className=" text-sm text-gray-300 pt-3">
          <span
            className={`${
              locale === "persian" ? "font-bodyFa font-normal" : null
            }`}
          >
            {text.general.name}
          </span>
          <p className="text-xxs font-light">
            1802 Vernon St NW PMB 514 <br />
            Washington, DC 20009
          </p>
        </div>
        <div className="flex flex-col pt-4">
          <div className="col-span-2 flex justify-center items-center gap-x-24 max-w-44">
            <Link
              href={`https://twitter.com/${text.general.social_media_usernames.twitter}`}
            >
              <Twitter
                size={18}
                strokeWidth={1}
                className="stroke-gray-300 hover:stroke-secondary-500 hover:stroke-2"
              />
            </Link>
            <Link
              href={`https://www.instagram.com/${text.general.social_media_usernames.instagram}`}
            >
              <Instagram
                size={18}
                strokeWidth={1}
                className="stroke-gray-300 hover:stroke-secondary-500 hover:stroke-2"
              />
            </Link>
            <Link
              href={`https://youtube.com/${text.general.social_media_usernames.youtube}`}
            >
              <Youtube
                size={18}
                strokeWidth={1}
                className="stroke-gray-300 hover:stroke-secondary-500 hover:stroke-2 "
              />
            </Link>
            <Link
              href={`https://facebook.com/${text.general.social_media_usernames.facebook}`}
            >
              <Facebook
                size={18}
                strokeWidth={1}
                className="stroke-gray-300 hover:stroke-secondary-500 hover:stroke-2"
              />
            </Link>
          </div>
          <span
            className={`text-xxs font-light tracking-[0.25rem] mt-8 ${
              locale === "persian"
                ? "font-bodyFa font-normal text-right tracking-normal"
                : null
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
