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

function ContactComponent() {
  return (
    <section className="w-full flex bg-gray-100 py-52 font-body">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 gap-x-36 gap-y-3">
        <h2 className="col-span-2 font-header text-4xl text-secondary-500 uppercase">
          contact us
        </h2>
        <div className="grid grid-cols-2 text-primary-500 text-xs">
          <p className="col-span-2 ">For media inquiries email us at:</p>
          <div className="col-start-2 text-sm">
            <Mail size={24} strokeWidth={1} className="stroke-gray-300 mb-2" />
            <a href="mailto:media@iranjurists.org">media@iranjurists.org</a>
          </div>
          <p className="col-span-2">For general inquiries:</p>
          <div className="">
            <MapPin
              size={24}
              strokeWidth={1}
              className="stroke-gray-300 mb-2"
            />
            <p className=" text-sm">
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

          <p className="col-span-2">find us on social media:</p>
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
          <p className="col-span-2 text-gray-300">
            you can also get latest updates and news as we announce them by
            sharing your email address with us.
          </p>
          <form className="col-span-2 relative">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="youremail@emialhost.com"
              className="w-full h-14 border-2 border-gray-300 rounded-lg bg-gray-200 px-4 accent-1 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent placeholder:text-gray-300"
            />
            <button
              type="submit"
              className="absolute right-4 top-1 h-12 hover:text-secondary-500"
            >
              join our newsletter list
              <span className="hidden sm:inline text-secondary-500">
                {" "}
                &rarr;
              </span>
            </button>
          </form>
        </div>
        <div className="w-full h-full flex flex-col items-end">
          <MapView
            dragable={false}
            latitude={38.9167833174732}
            longitude={-77.04204284957177}
            zoom={16}
          />
          <ButtonTextTypeA
            text="get directions"
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
