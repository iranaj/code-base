"use client";

import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Fragment } from "react";
import { Menu as MenuIcon } from "react-feather";
import { en, persian } from "utils/translations";

export default function TopNavbarMobile({ scrolled }: { scrolled: boolean }) {
	const params = useParams();
	const router = useRouter();
	const pathname = usePathname();
	const locale = (params?.locale as string) || "en-US";

	const cleanPathname = pathname.replace(/\/$/, "");

	const text = locale !== "persian" ? en : persian;

	const switchLanguage = (newLocale: string) => {
		// pathname currently looks like /[locale]/about
		// we want to change the [locale] part
		const segments = pathname.split("/");
		segments[1] = newLocale;
		router.push(segments.join("/"));
	};

	return (
		<div className="fixed top-14 right-5 w-56 text-right">
			<Menu as="div" className="relative inline-block text-left">
				<div>
					<Menu.Button className="inline-flex w-full justify-center rounded-md  bg-opacity-20 px-4 py-2 text-sm font-medium text-project-gray-300 hover:bg-opacity-30 focus:outline-none focus-visible:ring-0 ">
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
					<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-project-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="p-5 flex flex-col gap-7">
							<Menu.Item>
								{({ active }) => (
									<Link
										href={`/${locale}/#home`}
										className={`inline-block rounded-lg py-1 px-2 text-project-gray-500 transition-colors duration-200 cursor-pointer ${
											locale === "persian" ? "font-bodyFa font-normal" : ""
										} ${cleanPathname === `/${locale}` ? "text-secondary-500 font-bold" : ""} ${active ? "text-secondary-500" : ""}`}
									>
										{text.home.title}
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										href={`/${locale}/about`}
										className={`inline-block rounded-lg py-1 px-2 text-project-gray-500 transition-colors duration-200 cursor-pointer ${
											locale === "persian" ? "font-bodyFa font-normal" : ""
										} ${cleanPathname === `/${locale}/about` ? "text-secondary-500 font-bold" : ""} ${active ? "text-secondary-500" : ""}`}
									>
										{text.about.title}
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										href={`/${locale}/advocacy`}
										className={`inline-block rounded-lg py-1 px-2 text-project-gray-500 transition-colors duration-200 cursor-pointer ${
											locale === "persian" ? "font-bodyFa font-normal" : ""
										} ${cleanPathname === `/${locale}/advocacy` ? "text-secondary-500 font-bold" : ""} ${active ? "text-secondary-500" : ""}`}
									>
										{text.advocacy.title}
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										href={`/${locale}/events`}
										className={`inline-block rounded-lg py-1 px-2 text-project-gray-500 transition-colors duration-200 cursor-pointer ${
											locale === "persian" ? "font-bodyFa font-normal" : ""
										} ${cleanPathname === `/${locale}/events` ? "text-secondary-500 font-bold" : ""} ${active ? "text-secondary-500" : ""}`}
									>
										{text.events.title}
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										href={`/${locale}/programs`}
										className={`inline-block rounded-lg py-1 px-2 text-project-gray-500 transition-colors duration-200 cursor-pointer ${
											locale === "persian" ? "font-bodyFa font-normal" : ""
										} ${cleanPathname === `/${locale}/programs` ? "text-secondary-500 font-bold" : ""} ${active ? "text-secondary-500" : ""}`}
									>
										{text.programs.title}
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										href={`/${locale}/press`}
										className={`inline-block rounded-lg py-1 px-2 text-project-gray-500 transition-colors duration-200 cursor-pointer ${
											locale === "persian" ? "font-bodyFa font-normal" : ""
										} ${cleanPathname === `/${locale}/press` ? "text-secondary-500 font-bold" : ""} ${active ? "text-secondary-500" : ""}`}
									>
										{text.press.title}
									</Link>
								)}
							</Menu.Item>
							<Menu.Item>
								{({ active }) => (
									<Link
										href={`/${locale}/#contact`}
										className={`inline-block rounded-lg py-1 px-2 text-project-gray-500 transition-colors duration-200 cursor-pointer ${
											locale === "persian" ? "font-bodyFa font-normal" : ""
										} ${active ? "text-secondary-500" : ""}`}
									>
										{text.contact.title}
									</Link>
								)}
							</Menu.Item>
						</div>
						<div className="flex w-full justify-between p-6">
							<Menu.Item>
								{() => (
									<button
										type="button"
										className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 cursor-pointer ${
											locale !== "persian" ? "text-secondary-500 " : ""
										}`}
										onClick={() => switchLanguage("en-US")}
									>
										english
									</button>
								)}
							</Menu.Item>

							<span className="inline-block rounded-lg py-1 px-2 ">|</span>
							<Menu.Item>
								{() => (
									<button
										type="button"
										className={`inline-block rounded-lg py-1 px-2 hover:text-secondary-500 font-bodyFa font-normal cursor-pointer ${
											locale === "persian" ? "text-secondary-500 " : ""
										}`}
										onClick={() => switchLanguage("persian")}
									>
										فارسی
									</button>
								)}
							</Menu.Item>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
