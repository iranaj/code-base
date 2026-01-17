"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { en, persian } from "utils/translations";

interface AdvocacyContentProps {
  locale: string;
  items: any[]; // The generic DB items
}

export default function AdvocacyContent({ locale, items }: AdvocacyContentProps) {
  const isPersian = locale === "persian";
  const staticText = isPersian ? persian : en;
  const langKey = isPersian ? 'fa' : 'en';

  // Helper to parse the seeded content content for links
  // Format was: "Link: <url>\nLabel: <label>"
  const parseContent = (content: string) => {
    const linkMatch = content?.match(/Link:\s*(.+)/);
    const labelMatch = content?.match(/Label:\s*(.+)/);
    return {
      link: linkMatch ? linkMatch[1].trim() : null,
      label: labelMatch ? labelMatch[1].trim() : null
    };
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto grid grid-cols-12 gap-8 pb-32 px-4 md:px-0">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
      </div>

      {/* Sidebar / Contents Rail */}
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
              {isPersian ? "فهرست مطالب" : "Contents"}
            </h3>
            
            <div className={`relative border-l-2 border-project-gray-200 ml-6 space-y-0 ${
              isPersian ? "border-l-0 border-r-2 mr-6 ml-0" : ""
            }`}>
              {items.map((item: any, index: number) => {
                  const title = item.title[langKey] || item.title['en'];
                  return (
                    <div key={item._id} className="relative group">
                      <div className={`absolute top-2 -left-[9px] w-4 h-4 rounded-full border-2 border-white bg-project-gray-300 group-hover:bg-secondary-500 group-hover:scale-125 transition-all duration-300 z-10 ${
                          isPersian ? "-right-[9px] left-auto" : ""
                      }`} />
                      <Link href={`#advocacy-${index}`}
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

      {/* Main Content */}
      <section
        dir={`${isPersian ? "rtl" : "ltr"}`}
        className="col-span-12 lg:col-span-8 lg:col-start-4 flex flex-col gap-12"
      >
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
            {staticText.advocacy.title}
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "60%" }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className={`absolute -bottom-4 h-2 bg-secondary-500 ${isPersian ? "right-0" : "left-0"}`} 
            />
          </h1>
        </motion.div>

        <div className="flex flex-col gap-16">
          {items.map((item: any, index: number) => {
               const title = item.title[langKey] || item.title['en'];
               const contentRaw = item.content[langKey] || item.content['en'];
               const { link, label } = parseContent(contentRaw);
               const dateStr = new Date(item.publishedAt).toLocaleDateString(isPersian ? 'fa-IR' : 'en-US', {
                   year: 'numeric',
                   month: 'long',
                   day: 'numeric'
               });

              return (
              <motion.div
                key={item._id}
                id={`advocacy-${index}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative scroll-mt-32"
              >
                {/* Date Label */}
                <div className={`absolute -top-6 left-8 z-20 ${isPersian ? 'right-8 left-auto' : ''}`}>
                    <span className="bg-secondary-500 text-white px-4 py-1 text-sm font-bold tracking-widest uppercase shadow-lg">
                    {dateStr}
                  </span>
                </div>

                {/* Card */}
                <div className="group relative overflow-hidden rounded-tr-[3rem] rounded-bl-[3rem] bg-primary-500 shadow-2xl transition-transform duration-500 hover:-translate-y-2">
                    {/* Background Texture */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-600/50 to-primary-900/50 opacity-50" />
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-secondary-500/10 rounded-full blur-3xl group-hover:bg-secondary-500/20 transition-colors duration-500" />
                    
                    <div className="relative p-8 md:p-12 z-10 flex flex-col gap-6">
                  
                      <h2 className={`text-3xl md:text-4xl text-white leading-tight ${
                        isPersian ? "font-bodyFa font-bold" : "font-header"
                      }`}>
                        {title}
                      </h2>
                      
                      {/* If there is a link, show button. Else show content as text if it's not the link format */}
                      {link ? (
                        <div className="mt-4 pt-6 border-t border-white/10 flex justify-end">
                          <Link
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/btn relative inline-flex items-center gap-3 text-secondary-500 hover:text-white transition-colors duration-300"
                          >
                              <span className="uppercase tracking-widest text-sm font-bold">
                              {label || (isPersian ? "مشاهده سند" : "Read Official Submission")}
                            </span>
                            <span className="p-3 rounded-full border border-secondary-500 group-hover/btn:bg-secondary-500 group-hover/btn:text-primary-900 transition-all duration-300">
                              <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth={2} 
                                stroke="currentColor" 
                                className={`w-5 h-5 ${isPersian ? 'rotate-180' : ''}`}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                              </svg>
                            </span>
                          </Link>
                        </div>
                      ) : (
                        <div className="mt-4 text-white/80 whitespace-pre-wrap">
                             {contentRaw}
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
