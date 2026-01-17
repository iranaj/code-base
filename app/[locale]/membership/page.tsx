"use client";

import { Tab } from "@headlessui/react";
import LawyerForm from "components/membership/LawyerForm";
import VolunteerForm from "components/membership/VolunteerForm";
import Layout from "components/templates/Layout";
import { useRouter } from "next/navigation";
import { use } from "react";
import { en, persian } from "utils/translations";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function MembershipPage({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = use(params);
	const router = useRouter();
	const text = locale !== "persian" ? en : persian;

	const onSuccess = async () => {
		try {
			router.push(`/${locale}/membership/success`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Layout>
			<section
				className={`relative w-full max-w-6xl xxl:max-w-7xl mx-auto grid grid-cols-10 gap-y-3 pb-32 text-gray-600 ${
					locale === "persian" ? "font-bodyFa" : ""
				}`}
				dir={`${locale !== "persian" ? "ltr" : "rtl"}`}
			>
				<p className="col-span-10 mt-4 indent-3 md:indent-5 px-5 ">
					{text.membership.membership_types.subtitle}
				</p>
				<p className="col-span-10 mt-4 indent-3 md:indent-5 px-5">
					{text.membership.membership_types.p1}
				</p>
				<Tab.Group>
					<Tab.List
						className="col-span-10 mt-10 mb-5 flex space-x-10 uppercase px-5"
						dir={"ltr"}
					>
						{Object.keys(text.membership.membership_types.types).map(
							(category) => (
								<Tab
									key={category}
									className={({ selected }) =>
										classNames(
											"flex items-center rounded-md py-3 px-3 text-sm font-semibold lg:pr-3  shadow",
											selected
												? "shadow bg-gray-700 text-white"
												: " hover:bg-white/[0.12] hover:text-gray-400",
										)
									}
								>
									{category}
								</Tab>
							),
						)}
					</Tab.List>
					<Tab.Group>
						<Tab.Panels className="col-span-10">
							<Tab.Panel>
								<LawyerForm onSuccess={onSuccess} />
							</Tab.Panel>
							<Tab.Panel>
								<VolunteerForm onSuccess={onSuccess} />
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</Tab.Group>
			</section>
		</Layout>
	);
}
