import MapView from "./MapView";
import {
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  MapPin,
  Phone,
  Mail,
} from "react-feather";
import ButtonTextTypeA from "components/UI/buttons/ButtonTextTypeA";
import Link from "next/link";
import EmailSubscriptionForm from "./EmailSubscriptionForm";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";

function ContactComponent() {
  const router: NextRouter = useRouter();
  const { locale } = router;
  const text = locale !== "persian" ? en : persian;
  return (
    <section
      className="w-full flex bg-gray-100 py-10 px-10 md:px-0 md:py-52 font-body "
      dir={locale !== "persian" ? "ltr" : "rtl"}
      id="contact"
    >
      <div className="w-full md:max-w-6xl xxl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-36 gap-y-3">
        <h2 className="md:col-span-2 font-header text-2xl md:text-4xl text-secondary-500 uppercase rtl:font-bodyFa rtl:font-bold">
          {text.contact.title}
        </h2>
        <div className="grid grid-cols-2 text-primary-500 text-xs">
          <p className="col-span-2 rtl:font-bodyFa text-primary-500 !text-opacity-60 pb-5">
            {text.contact.media_inquiries.p1}
          </p>
          <div className="col-start-2 text-sm justify-self-end md:w-52">
            <Mail size={24} strokeWidth={1} className="stroke-gray-300 mb-2" />
            <a href="mailto:media@iranaj.org">media@iranaj.org</a>
          </div>
          <p className="col-span-2 rtl:font-bodyFa text-primary-500 !text-opacity-60 py-5">
            {text.contact.general_inquiries.p1}
          </p>
          <div className="">
            <MapPin
              size={24}
              strokeWidth={1}
              className="stroke-gray-300 mb-2"
            />
            <p className="text-sm">
              <span className="rtl:font-bodyFa">{text.general.name}</span>{" "}
              <br /> 1802 Vernon St NW PMB 514 <br />
              Washington, DC 20009
            </p>
          </div>
          <div className="justify-self-end md:w-52 text-sm">
            <Phone size={24} strokeWidth={1} className="stroke-gray-300 mb-2" />
            <a href="tel:+1(202)495-0880" dir="ltr">
              +1 (202) 495-0880
            </a>
            <Mail size={24} strokeWidth={1} className="stroke-gray-300 my-2" />
            <a href="mailto:info@iranaj.org">info@iranaj.org</a>
          </div>

          <p className="col-span-2 rtl:font-bodyFa text-primary-500 !text-opacity-60 pt-5">
            {text.contact.social_media.p1}
          </p>
          {/* social media links */}
          <div className="col-span-2 flex justify-center gap-x-24 my-8 ">
            <Link
              href={`https://twitter.com/${text.general.social_media_usernames.twitter}`}
            >
              <Twitter
                size={24}
                strokeWidth={1}
                className="stroke-secondary-500  hover:stroke-2"
              />
            </Link>
            <Link
              href={`https://www.instagram.com/${text.general.social_media_usernames.instagram}`}
            >
              <Instagram
                size={24}
                strokeWidth={1}
                className="stroke-secondary-500  hover:stroke-2"
              />
            </Link>
            {/* <Link
              href={`https://youtube.com/${text.general.social_media_usernames.youtube}`}
            >
              <Youtube
                size={24}
                strokeWidth={1}
                className="stroke-secondary-500  hover:stroke-2 "
              />
            </Link>
            <Link
              href={`https://facebook.com/${text.general.social_media_usernames.facebook}`}
            >
              <Facebook
                size={24}
                strokeWidth={1}
                className="stroke-secondary-500  hover:stroke-2"
              />
            </Link> */}
          </div>
          <p className="col-span-2 rtl:font-bodyFa text-primary-500 !text-opacity-60 mb-5 md:mb-2">
            {text.contact.newsletter.p1}
          </p>
          <EmailSubscriptionForm />
        </div>
        <div className="w-[21rem] md:w-[28rem] h-96 md:h-[30rem] flex flex-col items-end">
          <MapView
            dragable={false}
            latitude={38.9167833174732}
            longitude={-77.04204284957177}
            zoom={16}
          />
          <ButtonTextTypeA
            text={text.contact.map.button}
            hasIcon
            className="text-xxs font-normal"
            href="https://goo.gl/maps/8DRkBxfrwC2EybY58"
            target="_blank"
            passHref={true}
          />
        </div>
      </div>
    </section>
  );
}

export default ContactComponent;
