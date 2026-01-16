"use client";

import { useState, use } from "react";
import Layout from "components/templates/Layout";
import { useParams, useRouter } from "next/navigation";
import { en, persian } from "utils/translations";
import { motion } from "framer-motion";

export default function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  const router = useRouter();
  const text = locale !== "persian" ? en : persian;

  const [onMission, setOnMission] = useState(true);

  const handleClick = (section?: string) => {
    if (section === "mission") {
      setOnMission(true);
      router.push(`/${locale}/about#mission-statement`);
    } else {
      setOnMission(false);
      router.push(`/${locale}/about#vision-statement`);
    }
  };

  return (
    <Layout>
      <section className="relative w-full max-w-7xl mx-auto grid grid-cols-12 gap-8 pb-32 px-4 md:px-0">
         {/* Decorative Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
           <div className="absolute top-20 right-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
           <div className="absolute bottom-40 left-0 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
        </div>

        {/* Sidebar */}
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
                {locale === "persian" ? "درباره ما" : "About Us"}
             </h3>
             
             <div className={`relative border-l-2 border-projectGray-200 ml-6 space-y-0 ${
                locale === "persian" ? "border-l-0 border-r-2 mr-6 ml-0" : ""
             }`}>
                {/* Mission Link */}
                <div className="relative group cursor-pointer" onClick={() => handleClick("mission")}>
                    <div className={`absolute top-2 -left-[9px] w-4 h-4 rounded-full border-2 border-white transition-all duration-300 z-10 ${
                       onMission ? "bg-secondary-500 scale-125" : "bg-projectGray-300 group-hover:bg-secondary-500"
                    } ${locale === "persian" ? "-right-[9px] left-auto" : ""}`} />
                    <span className={`block py-2 pl-8 pr-4 text-sm font-medium transition-colors duration-300 ${
                        onMission ? "text-primary-500 font-bold" : "text-projectGray-400 group-hover:text-primary-500"
                      } ${locale === "persian" ? "font-bodyFa text-right pr-8 pl-4" : "text-left"}`}>
                       {text.about.mission_statement.title}
                    </span>
                </div>

                {/* Vision Link */}
                <div className="relative group cursor-pointer" onClick={() => handleClick("vision")}>
                    <div className={`absolute top-2 -left-[9px] w-4 h-4 rounded-full border-2 border-white transition-all duration-300 z-10 ${
                       !onMission ? "bg-secondary-500 scale-125" : "bg-projectGray-300 group-hover:bg-secondary-500"
                    } ${locale === "persian" ? "-right-[9px] left-auto" : ""}`} />
                    <span className={`block py-2 pl-8 pr-4 text-sm font-medium transition-colors duration-300 ${
                        !onMission ? "text-primary-500 font-bold" : "text-projectGray-400 group-hover:text-primary-500"
                      } ${locale === "persian" ? "font-bodyFa text-right pr-8 pl-4" : "text-left"}`}>
                       {text.about.vision_statement.title}
                    </span>
                </div>
             </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <section
          dir={`${locale !== "persian" ? "ltr" : "rtl"}`}
          className="col-span-12 lg:col-span-8 lg:col-start-4 flex flex-col gap-12"
        >
           {/* Main Title & Intro */}
           <motion.div
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
           >
              <h1
                className={`text-6xl md:text-7xl text-primary-500 mb-8 relative inline-block ${
                  locale === "persian" ? "font-bodyFa font-black" : "font-header font-bold tracking-tight"
                }`}
              >
                {text.about.title}
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "60%" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className={`absolute -bottom-4 h-2 bg-secondary-500 ${locale === "persian" ? "right-0" : "left-0"}`} 
                />
              </h1>
              
              <div className={`mt-12 space-y-6 text-lg md:text-xl leading-8 text-projectGray-500 text-justify font-light ${
                 locale === "persian" ? "font-bodyFa" : "font-body antialiased"
              }`}>
                 <p>{text.about.p1}</p>
                 <p>{text.about.p2}</p>
              </div>
           </motion.div>

           {/* Mission Section (Dark Card) */}
           <motion.div
              id="mission-statement"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative mt-8 scroll-mt-32"
           >
              <div className="relative overflow-hidden rounded-3xl bg-primary-500 shadow-xl p-8 md:p-12">
                 {/* Texture */}
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay" />
                 
                 <div className="relative z-10">
                    <h2 className={`text-4xl md:text-5xl mb-8 text-white ${
                       locale === "persian" ? "font-bodyFa font-black" : "font-header font-bold tracking-tight"
                    }`}>
                       {text.about.mission_statement.title}
                    </h2>
                    
                    <div className={`space-y-6 text-lg leading-8 text-white/90 text-justify font-light opacity-95 ${locale === "persian" ? "font-bodyFa" : "font-body antialiased"}`}>
                       <p>{text.about.mission_statement.p1}</p>
                       <p>{text.about.mission_statement.p2}</p>
                       
                       <ul className="grid gap-4 mt-8">
                          {[
                             text.about.mission_statement.bullet1,
                             text.about.mission_statement.bullet2,
                             text.about.mission_statement.bullet3,
                             text.about.mission_statement.bullet4,
                             text.about.mission_statement.bullet5,
                             text.about.mission_statement.bullet6,
                             text.about.mission_statement.bullet7,
                          ].filter(Boolean).map((bullet, idx) => (
                             <li key={idx} className={`flex items-start gap-4 ${locale === "persian" ? "font-bodyFa" : ""}`}>
                                <span className="mt-2 w-2 h-2 rounded-full bg-secondary-500 flex-shrink-0" />
                                <span>{bullet}</span>
                             </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </div>
           </motion.div>

           {/* Vision Section (Clean Block) */}
           <motion.div
              id="vision-statement"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative scroll-mt-32"
           >
              <div className={`relative p-8 md:p-12 border-l-4 border-secondary-500 bg-white shadow-sm rounded-r-3xl ${
                 locale === "persian" ? "border-l-0 border-r-4 rounded-r-none rounded-l-3xl" : ""
              }`}>
                 <h2 className={`text-4xl md:text-5xl mb-8 text-primary-500 ${
                    locale === "persian" ? "font-bodyFa font-black" : "font-header font-bold tracking-tight"
                 }`}>
                    {text.about.vision_statement.title}
                 </h2>
                 
                 <p className={`text-lg md:text-xl leading-8 text-projectGray-500 text-justify font-light ${
                    locale === "persian" ? "font-bodyFa" : "font-body antialiased"
                 }`}>
                    {text.about.vision_statement.p1}
                 </p>
              </div>
           </motion.div>

        </section>
      </section>
    </Layout>
  );
}
