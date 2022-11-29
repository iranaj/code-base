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
  const text = locale === "en-US" ? en : persian;
  return (
    <section
      className="w-full flex bg-gray-100 py-52 font-body "
      dir={locale === "en-US" ? "ltr" : "rtl"}
      id="contact"
    >
      <div className="w-full max-w-6xl xxl:max-w-7xl mx-auto grid grid-cols-2 gap-x-36 gap-y-3">
        <h2 className="col-span-2 font-header text-4xl text-secondary-500 uppercase rtl:font-bodyFa rtl:font-bold">
          {text.contact.title}
        </h2>
        <div className="grid grid-cols-2 text-primary-500 text-xs">
          <p className="col-span-2 rtl:font-bodyFa">
            {text.contact.media_inquiries.p1}
          </p>
          <div className="col-start-2 text-sm">
            <Mail size={24} strokeWidth={1} className="stroke-gray-300 mb-2" />
            <a href="mailto:media@iranjurists.org">media@iranjurists.org</a>
          </div>
          <p className="col-span-2 rtl:font-bodyFa">
            {text.contact.general_inquiries.p1}
          </p>
          <div className="">
            <MapPin
              size={24}
              strokeWidth={1}
              className="stroke-gray-300 mb-2"
            />
            <p className="text-sm">
              National Assembly of Jurists <br /> 1802 Vernon St NW PMB 514{" "}
              <br />
              Washington, DC 20009
            </p>
          </div>
          <div className=" text-sm">
            <Phone size={24} strokeWidth={1} className="stroke-gray-300 mb-2" />
            <a href="call:media@iranjurists.org">+1 (202) 495-0880</a>
            <Mail size={24} strokeWidth={1} className="stroke-gray-300 my-2" />
            <a href="mailto:info@iranianjurist.org">info@iranianjurist.org</a>
          </div>

          <p className="col-span-2 rtl:font-bodyFa">
            {text.contact.social_media.p1}
          </p>
          <div className="col-span-2 flex justify-center gap-x-24">
            <Link href={""}>
              <Twitter
                size={24}
                strokeWidth={1}
                className="stroke-secondary-500  hover:stroke-2"
              />
            </Link>
            <Link href={""}>
              <Instagram
                size={24}
                strokeWidth={1}
                className="stroke-secondary-500  hover:stroke-2"
              />
            </Link>
            <Link href={""}>
              <Youtube
                size={24}
                strokeWidth={1}
                className="stroke-secondary-500  hover:stroke-2 "
              />
            </Link>
            <Link href={""}>
              <Facebook
                size={24}
                strokeWidth={1}
                className="stroke-secondary-500  hover:stroke-2"
              />
            </Link>
          </div>
          <p className="col-span-2 text-gray-300 rtl:font-bodyFa">
            {text.contact.newsletter.p1}
          </p>
          <EmailSubscriptionForm />
        </div>
        <div className="w-full h-full flex flex-col items-end">
          <MapView
            dragable={false}
            latitude={38.9167833174732}
            longitude={-77.04204284957177}
            zoom={16}
          />
          <ButtonTextTypeA
            text={text.contact.map.button}
            hasIcon
            className="text-xxs"
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
