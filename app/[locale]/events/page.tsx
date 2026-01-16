"use client";

import { use } from "react";
import Layout from "components/templates/Layout";
import { useParams } from "next/navigation";
import { en, persian } from "utils/translations";
import Link from "next/link";
import { motion } from "framer-motion";

export default function EventsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const text = locale !== "persian" ? en : persian;

  return (
    <Layout>
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
              locale === "persian" ? "font-bodyFa" : "font-header"
            }`}>
               {locale === "persian" ? "رویدادها" : "Timeline"}
            </h3>
            
            {/* Timeline Stem */}
            <div className={`relative border-l-2 border-projectGray-200 ml-6 space-y-0 ${
               locale === "persian" ? "border-l-0 border-r-2 mr-6 ml-0" : ""
            }`}>
              {text.events.items &&
                text.events.items.map((item: any, index: number) => (
                  <div key={index} className="relative group">
                    {/* Dot */}
                    <div className={`absolute top-2 -left-[9px] w-4 h-4 rounded-full border-2 border-white bg-projectGray-300 group-hover:bg-secondary-500 group-hover:scale-125 transition-all duration-300 z-10 ${
                       locale === "persian" ? "-right-[9px] left-auto" : ""
                    }`} />
                    
                    {/* Link */}
                    <Link 
                      href={`#event-${index}`}
                      className={`block py-2 pl-8 pr-4 text-sm text-projectGray-400 font-medium group-hover:text-primary-500 transition-colors duration-300 ${
                        locale === "persian" ? "font-bodyFa text-right pr-8 pl-4" : "text-left"
                      }`}
                    >
                      <span className="block truncate opacity-70 group-hover:opacity-100 transition-opacity">
                        {item.title}
                      </span>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content Area */}
        <section
          dir={`${locale !== "persian" ? "ltr" : "rtl"}`}
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
                  locale === "persian" ? "font-bodyFa font-black" : "font-header font-bold tracking-tight"
                }`}
              >
              {text.events.title}
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "60%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className={`absolute -bottom-4 h-2 bg-secondary-500 ${locale === "persian" ? "right-0" : "left-0"}`} 
              />
            </h1>
          </motion.div>

          {/* Events Stream */}
          <div className="flex flex-col gap-16">
            {text.events.items &&
              text.events.items.map((item: any, index: number) => (
                <motion.div
                  key={index}
                  id={`event-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative scroll-mt-32"
                >
                  {/* Date/Year Label - Floating */}
                  <div className={`absolute -top-6 left-8 z-20 ${locale === 'persian' ? 'right-8 left-auto' : ''}`}>
                     <span className="bg-secondary-500 text-white px-4 py-1 text-sm font-bold tracking-widest uppercase shadow-lg">
                        {item.date}
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
                           locale === "persian" ? "font-bodyFa font-bold" : "font-header"
                        }`}>
                          {item.title}
                        </h2>

                        {/* Subtitle */}
                        {item.subtitle && (
                          <h3 className="text-secondary-400 text-lg md:text-xl font-medium italic border-l-2 border-secondary-500 pl-4 py-1 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-4">
                            {item.subtitle}
                          </h3>
                        )}

                        {/* Action Area */}
                        {item.link && (
                          <div className="mt-4 pt-6 border-t border-white/10 flex justify-end">
                            <Link
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group/btn relative inline-flex items-center gap-3 text-secondary-500 hover:text-white transition-colors duration-300"
                            >
                              <span className="uppercase tracking-widest text-sm font-bold">
                                {locale === "persian" ? "مشاهده ویدیو" : "Watch Recording"}
                              </span>
                              <span className="p-3 rounded-full border border-secondary-500 group-hover/btn:bg-secondary-500 group-hover/btn:text-primary-900 transition-all duration-300">
                                 <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className={`w-5 h-5 ${locale === "persian" ? "rotate-180" : ""}`}
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
              ))}
          </div>
        </section>
      </section>
    </Layout>
  );
}
