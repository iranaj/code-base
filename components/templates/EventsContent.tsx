"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { en, persian } from "utils/translations";

interface EventsContentProps {
  locale: string;
  items: any[];
}

export default function EventsContent({ locale, items }: EventsContentProps) {
  const isPersian = locale === "persian";
  const staticText = isPersian ? persian : en;
  const langKey = isPersian ? 'fa' : 'en';

  const formatEventDate = (value: string | Date) => {
    const date = new Date(value);
    const formatted = new Intl.DateTimeFormat(isPersian ? "fa-IR" : "en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
    return isPersian ? formatted : formatted.toUpperCase();
  };

  const extractDescription = (raw?: string) => {
    if (!raw) return "";
    // Keep only the first line to avoid showing raw recording/link text in the card.
    return raw.split(/\r?\n/)[0].trim();
  };

  const extractLink = (raw?: string) => {
    if (!raw) return "";
    const match = raw.match(/https?:\/\/\S+/);
    return match ? match[0] : "";
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto grid grid-cols-12 gap-8 pb-32 px-4 md:px-0">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Sidebar / Timeline Rail */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:block col-span-3 relative"
      >
        <div className="sticky top-40 w-full pr-8">
          <h3 className={`text-primary-500 text-3xl font-bold mb-8 pl-6 border-l-4 border-secondary-500 ${
            isPersian ? "font-bodyFa" : "font-header"
          }`}>
             {isPersian ? "رویدادها" : "Timeline"}
          </h3>
          
          {/* Timeline Stem */}
          <div className={`relative border-l-2 border-project-gray-200 ml-6 space-y-0 ${
             isPersian ? "border-l-0 border-r-2 mr-6 ml-0" : ""
          }`}>
            {items.map((item: any, index: number) => {
                const title = item.title[langKey] || item.title['en'];
                return (
                  <div key={item._id} className="relative group">
                    {/* Dot */}
                    <div className={`absolute top-2 -left-[9px] w-4 h-4 rounded-full border-2 border-white bg-project-gray-300 group-hover:bg-secondary-500 group-hover:scale-125 transition-all duration-300 z-10 ${
                       isPersian ? "-right-[9px] left-auto" : ""
                    }`} />
                    
                    {/* Link */}
                    <Link 
                      href={`#event-${index}`}
                      className={`block py-2 pl-8 pr-4 text-sm !text-project-gray-500 font-semibold group-hover:!text-primary-500 transition-colors duration-300 ${
                        isPersian ? "font-bodyFa text-right pr-8 pl-4" : "text-left"
                      }`}
                    >
                      <span className="block truncate transition-opacity">
                        {title}
                      </span>
                    </Link>
                  </div>
                );
            })}
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <section
        dir={`${isPersian ? "rtl" : "ltr"}`}
        className="col-span-12 lg:col-span-8 lg:col-start-4 flex flex-col gap-12"
      >
         {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1
              className={`text-6xl md:text-7xl text-primary-500 mb-8 relative inline-block ${
                isPersian ? "font-bodyFa font-black" : "font-header font-bold tracking-tight"
              }`}
            >
            {staticText.events.title}
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`absolute -bottom-4 h-2 bg-secondary-500 ${isPersian ? "right-0" : "left-0"}`} 
            />
          </h1>
        </motion.div>

        {/* Events Stream */}
        <div className="flex flex-col gap-16">
          {items.map((item: any, index: number) => {
              const title = item.title[langKey] || item.title['en'];
              const rawDescription = item.description[langKey] || item.description['en'];
              const description = extractDescription(rawDescription);
              const fallbackLink = extractLink(rawDescription);
              const actionLink = item.registrationLink || fallbackLink;
              const dateStr = formatEventDate(item.date);
              const isPastEvent = new Date(item.date).getTime() < Date.now();

              return (
              <motion.div
                key={item._id}
                id={`event-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative scroll-mt-32"
              >
                {/* Date/Year Label - Floating */}
                <div className={`absolute -top-6 left-8 z-20 ${isPersian ? 'right-8 left-auto' : ''}`}>
                   <span className="bg-secondary-500 text-white px-4 py-1 text-sm font-bold tracking-widest uppercase shadow-lg">
                      {dateStr}
                   </span>
                </div>

                {/* Card */}
                <div className="group relative overflow-hidden rounded-tr-[3rem] rounded-bl-[3rem] bg-primary-500 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                   {/* Background Texture/Gradient */}
                   <div className="absolute inset-0 bg-gradient-to-br from-primary-600/50 to-primary-900/50 opacity-50" />
                   <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl group-hover:bg-secondary-500/20 transition-colors duration-500" />
                   
                   <div className="relative p-8 md:p-12 z-10 flex flex-col gap-6">
                      
                      {/* Title */}
                      <h2 className={`text-3xl md:text-4xl text-white leading-tight ${
                         isPersian ? "font-bodyFa font-bold" : "font-header"
                      }`}>
                        {title}
                      </h2>

                      {/* Description / Subtitle */}
                      {description && (
                        <div className="text-secondary-400 text-lg font-light italic leading-relaxed whitespace-pre-wrap border-l-2 border-secondary-500 pl-4 py-1 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
                          {description}
                        </div>
                      )}

                      {/* Action Area */}
                      {actionLink && (
                        <div className="mt-4 pt-6 border-t border-white/10 flex justify-end">
                          <Link
                            href={actionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative inline-flex items-center gap-3 text-[#D2AA6D] transition-colors duration-300"
                          >
                            <span className="uppercase tracking-widest text-sm font-bold text-[#D2AA6D]">
                              {isPersian
                                ? (isPastEvent ? "مشاهده ویدیو" : "ثبت نام")
                                : (isPastEvent ? "Watch Recording" : "Register")}
                            </span>
                            <span className="p-3 rounded-full border border-[#D2AA6D] text-[#D2AA6D] transition-all duration-300">
                               <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className={`w-5 h-5 text-[#D2AA6D] ${isPersian ? "rotate-180" : ""}`}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                              </svg>
                            </span>
                          </Link>
                        </div>
                      )}
                   </div>
                </div>
              </motion.div>
            )})}
        </div>
      </section>
    </section>
  );
}
