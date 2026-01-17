"use client";

import React, { useEffect, useState } from "react";
import MapView from "./MapView";
import {
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  MapPin,
  Phone,
  Mail,
  ArrowRight
} from "react-feather";
import ButtonTextTypeA from "components/UI/buttons/ButtonTextTypeA";
import Link from "next/link";
import EmailSubscriptionForm from "./EmailSubscriptionForm";
import { useParams } from "next/navigation";
import { en, persian } from "utils/translations";

interface ContactDetails {
  mediaEmail: string;
  generalEmail: string;
  generalPhone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  mapLink: string;
  mapLatitude: number;
  mapLongitude: number;
  mapZoom: number;
}

const defaultDetails: ContactDetails = {
  mediaEmail: "media@iranaj.org",
  generalEmail: "info@iranaj.org",
  generalPhone: "+1 (202) 495-0880",
  addressLine1: "1802 Vernon St NW PMB 514",
  addressLine2: "",
  city: "Washington",
  state: "DC",
  postalCode: "20009",
  country: "USA",
  mapLink: "https://goo.gl/maps/8DRkBxfrwC2EybY58",
  mapLatitude: 38.9167833174732,
  mapLongitude: -77.04204284957177,
  mapZoom: 16,
};

function ContactComponent() {
  const params = useParams();
  const locale = params?.locale as string || "en-US";
  const text = locale !== "persian" ? en : persian;
  const [details, setDetails] = useState<ContactDetails>(defaultDetails);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch("/api/contact-details");
        if (!response.ok) return;
        const data = await response.json();
        if (data && Object.keys(data).length > 0) {
          setDetails({ ...defaultDetails, ...data });
        }
      } catch (error) {
        // Keep defaults on error
      }
    };

    fetchDetails();
  }, []);

  const phoneHref = details.generalPhone
    ? `tel:${details.generalPhone.replace(/[^\d+]/g, "")}`
    : undefined;
  const mapLatitude = Number.isFinite(details.mapLatitude) ? details.mapLatitude : defaultDetails.mapLatitude;
  const mapLongitude = Number.isFinite(details.mapLongitude) ? details.mapLongitude : defaultDetails.mapLongitude;
  const mapZoom = Number.isFinite(details.mapZoom) ? details.mapZoom : defaultDetails.mapZoom;

  return (
    <section
      className="w-full relative py-20 md:py-32 px-5 md:px-0 bg-white"
      dir={locale !== "persian" ? "ltr" : "rtl"}
      id="contact"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-20">
          <h2 className={`text-5xl md:text-6xl text-primary-500 mb-6 ${
              locale === "persian" ? "font-bodyFa font-black" : "font-header font-bold tracking-tight"
            }`}>
            {text.contact.title}
          </h2>
          <div className={`h-1.5 w-32 bg-secondary-500 rounded-full ${locale === "persian" ? "mr-0" : "ml-0"}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
           {/* Left Column: Contact Info & Form */}
           <div className="flex flex-col gap-10">
              
              {/* Info Cards Grid */}
              <div className="grid gap-6">
                 {/* General & Media */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Media */}
                    <div className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-secondary-500/10 flex items-center justify-center text-secondary-500 mb-4 group-hover:bg-secondary-500 group-hover:text-white transition-colors">
                        <Mail className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                      <h3 className={`text-lg font-bold text-primary-500 mb-2 ${locale === "persian" ? "font-bodyFa" : "font-header"}`}>
                         {locale === "persian" ? "رسانه" : "Media Inquiries"}
                      </h3>
                      <a href={`mailto:${details.mediaEmail}`} className="text-project-gray-400 hover:text-secondary-500 transition-colors font-body text-sm">
                        {details.mediaEmail}
                      </a>
                    </div>

                    {/* General */}
                    <div className="group p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="w-12 h-12 rounded-full bg-secondary-500/10 flex items-center justify-center text-secondary-500 mb-4 group-hover:bg-secondary-500 group-hover:text-white transition-colors">
                        <Phone className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                      <h3 className={`text-lg font-bold text-primary-500 mb-2 ${locale === "persian" ? "font-bodyFa" : "font-header"}`}>
                         {locale === "persian" ? "تماس با ما" : "General Inquiries"}
                      </h3>
                      <div className="flex flex-col gap-1">
                        <a href={phoneHref} dir="ltr" className="text-project-gray-400 hover:text-secondary-500 transition-colors font-body text-sm text-left">
                          {details.generalPhone}
                        </a>
                        <a href={`mailto:${details.generalEmail}`} className="text-project-gray-400 hover:text-secondary-500 transition-colors font-body text-sm">
                          {details.generalEmail}
                        </a>
                      </div>
                    </div>
                 </div>

                 {/* Address Card */}
                 <div className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-secondary-500/10 flex items-center justify-center text-secondary-500 flex-shrink-0 group-hover:bg-secondary-500 group-hover:text-white transition-colors">
                       <MapPin className="w-6 h-6" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold text-primary-500 mb-2 ${locale === "persian" ? "font-bodyFa" : "font-header"}`}>
                         {locale === "persian" ? "آدرس پستی" : "Mailing Address"}
                      </h3>
                      <p className="text-project-gray-400 text-sm leading-relaxed font-body">
                         <span className="font-semibold text-primary-500">{text.general.name}</span>
                         <br /> {details.addressLine1}
                         {details.addressLine2 ? <><br /> {details.addressLine2}</> : null}
                         <br /> {details.city}, {details.state} {details.postalCode}
                         {details.country ? <><br /> {details.country}</> : null}
                      </p>
                    </div>
                 </div>
              </div>

              {/* Newsletter & Socials */}
              <div className="mt-8 pt-10 border-t border-gray-100">
                 <div className="mb-8">
                    <h3 className={` text-primary-500 mb-4 ${locale === "persian" ? "font-bodyFa" : "font-body"}`}>
                       {text.contact.newsletter.p1}
                    </h3>
                    <EmailSubscriptionForm />
                 </div>
                 
                 <div className="flex gap-4">
                    {[
                      { Icon: Twitter, link: `https://twitter.com/${text.general.social_media_usernames.twitter}` },
                      { Icon: Instagram, link: `https://www.instagram.com/${text.general.social_media_usernames.instagram}` },
                      { Icon: Youtube, link: `https://youtube.com/${text.general.social_media_usernames.youtube}` },
                    ].map(({ Icon, link }, index) => (
                      <Link key={index} href={link} target="_blank" className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-project-gray-400 hover:bg-secondary-500 hover:text-white hover:border-secondary-500 transition-all duration-300 group">
                         <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </Link>
                    ))}
                 </div>
              </div>

           </div>

           {/* Right Column: Map */}
           <div className="relative h-[500px] lg:h-auto rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white ring-1 ring-gray-100">
               <div className="absolute inset-0 z-0">
                 <MapView
                   dragable={false}
                   latitude={mapLatitude}
                   longitude={mapLongitude}
                   zoom={mapZoom}
                 />
               </div>
               
               {/* Floating Map Action */}
               <div className="absolute bottom-8 left-8 right-8 pointer-events-none flex justify-end">
                  <a 
                    href={details.mapLink || defaultDetails.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pointer-events-auto bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg flex items-center gap-4 hover:scale-105 transition-transform duration-300 group cursor-pointer border border-white/50"
                  >
                     <div className="text-left rtl:text-right">
                        <p className={`text-xs text-project-gray-400 font-semibold uppercase tracking-wider mb-1 ${locale === "persian" ? "font-bodyFa" : "font-body"}`}>
                           {text.contact.map.button}
                        </p>
                        <p className={`text-primary-500 font-semibold ${locale === "persian" ? "font-bodyFa" : "font-body"}`}>
                           Open in Google Maps
                        </p>
                     </div>
                     <div className="w-10 h-10 rounded-full bg-secondary-500 flex items-center justify-center text-white group-hover:rotate-45 transition-transform">
                        <ArrowRight className={`w-5 h-5 ${locale === "persian" ? "rotate-180" : ""}`} />
                     </div>
                  </a>
               </div>
           </div>
        </div>
      </div>
    </section>
  );
}

export default ContactComponent;
