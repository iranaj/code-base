import React from "react";
import MapView from "./MapView";

function ContactComponent() {
  return (
    <section className="w-full flex bg-gray-100 py-52">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 gap-36">
        <h2 className="col-span-2 font-header text-4xl text-secondary-500 uppercase">
          contact us
        </h2>
        <div className="grid grid-cols-2">
          <p className="col-span-2 ">For media inquiries email us at:</p>
          <div className="col-start-2">
            <a href="mailto:media@iranjurists.org">media@iranjurists.org</a>
          </div>
          <p className="col-span-2">For general inquiries:</p>
          <div className="">
            <a href="call:media@iranjurists.org">media@iranjurists.org</a>
          </div>
          <div className="">
            <p>
              National Assembly of Jurists <br /> 1802 Vernon St NW PMB 514{" "}
              <br />
              Washington, DC 20009
            </p>
          </div>
          <p className="col-span-2">find us on social media:</p>
          <div className="col-span-2 flex justify-between"></div>
          <p className="col-span-2">
            you can also get latest updates and news as we announce them by
            sharing your email address with us.
          </p>
          <form className="col-span-2 relative">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              className="w-full h-14 border-2 border-gray-300 rounded-lg bg-gray-100 px-4"
            />
            <button type="submit" className="absolute right-4 top-1 h-12 ">
              join our newsletter list
            </button>
          </form>
        </div>
        <div className="w-full h-full flex flex-col">
          <MapView
            dragable={false}
            latitude={38.9167833174732}
            longitude={-77.04204284957177}
            zoom={16}
          />
        </div>
      </div>
    </section>
  );
}

export default ContactComponent;
