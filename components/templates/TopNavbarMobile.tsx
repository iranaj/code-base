import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { Menu as MenuIcon } from "react-feather";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";
import Link from "next/link";

export default function TopNavbarMobile({ scrolled }: { scrolled: boolean }) {
  const router: NextRouter = useRouter();
  const { locale } = router;

  const text = locale !== "persian" ? en : persian;
  return (
    <div className="fixed top-14 right-5 w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md  bg-opacity-20 px-4 py-2 text-sm font-medium text-projectGray-300 hover:bg-opacity-30 focus:outline-none focus-visible:ring-0 ">
            <MenuIcon
              className={`ml-2 -mr-1 h-6 w-6 transition-colors duration-300 hover:text-secondary-500 ${
                scrolled ? "stroke-primary-500" : "stroke-white"
              }`}
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-projectGray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="p-5 flex flex-col gap-7">
              <Menu.Item>
                {() => (
                  <Link
                    href="/#home"
                    className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
                      locale === "persian" ? "font-bodyFa font-normal" : null
                    }`}
                  >
                    {text.home.title}
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <Link
                    href="/about"
                    className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
                      locale === "persian" ? "font-bodyFa font-normal" : null
                    }`}
                  >
                    {text.about.title}
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <Link
                    href="/advocacy"
                    className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
                      locale === "persian" ? "font-bodyFa font-normal" : null
                    }`}
                  >
                    {text.advocacy.title}
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <Link
                    href="/events"
                    className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
                      locale === "persian" ? "font-bodyFa font-normal" : null
                    }`}
                  >
                    {text.events.title}
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <Link
                    href="/programs"
                    className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
                      locale === "persian" ? "font-bodyFa font-normal" : null
                    }`}
                  >
                    {text.programs.title}
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <Link
                    href="/press"
                    className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
                      locale === "persian" ? "font-bodyFa font-normal" : null
                    }`}
                  >
                    {text.press.title}
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {() => (
                  <Link
                    href="/#contact"
                    className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
                      locale === "persian" ? "font-bodyFa font-normal" : null
                    }`}
                  >
                    {text.contact.title}
                  </Link>
                )}
              </Menu.Item>
              {/* <Menu.Item>
                {() => (
                  <Link
                    href="/membership"
                    className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
                      locale === "persian" ? "font-bodyFa font-normal" : null
                    }`}
                  >
                    {text.membership.title}
                  </Link>
                )}
              </Menu.Item> */}
            </div>
            <div className="flex w-full justify-between p-6">
              <Menu.Item>
                {({ close }) => (
                  <span
                    className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
                      locale !== "persian" ? "text-secondary-500 " : null
                    }`}
                    onClick={() =>
                      router.push(router.pathname, router.pathname, {
                        locale: "en-US",
                      })
                    }
                  >
                    english
                  </span>
                )}
              </Menu.Item>

              <span className="inline-block rounded-lg py-1 px-2 ">|</span>
              <Menu.Item>
                {({ close }) => (
                  <span
                    className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 font-bodyFa font-normal cursor-pointer ${
                      locale !== "en-US" ? "text-secondary-500 " : null
                    }`}
                    onClick={() =>
                      router.push(router.pathname, router.pathname, {
                        locale: "persian",
                      })
                    }
                  >
                    فارسی
                  </span>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
