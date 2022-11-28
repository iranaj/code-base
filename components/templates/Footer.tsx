import LogoHorizeotalFull from "components/UI/identity/LogoHorizontalFull";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "react-feather";

const Footer: React.FC = () => {
  return (
    <footer className="w-full h-48 bg-primary-500">
      <div className="flex justify-between w-full max-w-7xl pt-14 mx-auto gap-36 text-projectGray-300 font-body text-xs ">
        <div className="footer__logo">
          <LogoHorizeotalFull className="w-36 fill-gray-300" />
        </div>
        <ul className="uppercase flex flex-col">
          <li className="mt-2">
            <Link href="/">Home</Link>
          </li>
          <li className="mt-2">
            <Link href="/about">About</Link>
          </li>
          <li className="mt-2">
            <Link href="/#contact">Contact</Link>
          </li>
          {/* <li>
              <Link href="https://diosf.com/privacy">Privacy</Link>
            </li>
            <li>
              <Link href="https://diosf.com/terms">Terms</Link>
            </li> */}
        </ul>
        <div className=" text-sm text-gray-300">
          <span>National Assembly of Jurists</span>
          <p className="text-xxs font-light">
            1802 Vernon St NW PMB 514 <br />
            Washington, DC 20009
          </p>
        </div>
        <div className="col-span-2 flex justify-center items-center gap-x-24 max-w-44">
          <Twitter size={18} strokeWidth={1} className="stroke-gray-300" />
          <Instagram size={18} strokeWidth={1} className="stroke-gray-300" />
          <Youtube size={18} strokeWidth={1} className="stroke-gray-300" />
          <Facebook size={18} strokeWidth={1} className="stroke-gray-300" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
