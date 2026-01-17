import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useParams } from "next/navigation";
import { Fragment, useState } from "react";
import { en, persian } from "utils/translations";

interface listItem {
	id: number;
	name: string;
}

interface Props {
	list: listItem[];
	label: string;
	name: string;
	additionalClasses?: string;
	formikObject: any;
}

function classNames(...classes: string[]) {
	return classes.join(" ");
}

export default function FormCombobox({
	list,
	name,
	label,
	additionalClasses,
	formikObject,
}: Props) {
	const params = useParams();
	const locale = (params?.locale as string) || "en-US";
	const text = locale !== "persian" ? en : persian;
	const [query, setQuery] = useState("");

	const filteredItems =
		query === ""
			? list
			: list.filter((item: listItem) =>
					item.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, "")),
				);

	// return null;
	return (
		<div
			className={classNames(
				"col-span-6 sm:col-span-3",
				additionalClasses || "",
			)}
		>
			<label
				htmlFor={name}
				className={"block text-sm font-medium text-gray-700"}
			>
				{label}
			</label>
			<Combobox
				value={formikObject.values[name]}
				onChange={(value) => formikObject.setFieldValue(name, value)}
			>
				<div className="relative mt-1">
					<div className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-1 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
						<Combobox.Input
							className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
							displayValue={(item: listItem) => item?.name || ""}
							onChange={(event) => {
								setQuery(event.target.value);
							}}
						/>
						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
							<ChevronUpDownIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery("")}
					>
						<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{filteredItems.length === 0 && query !== "" ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									{text.general.combobox.nothing_found}
								</div>
							) : (
								filteredItems.map((item) => (
									<Combobox.Option
										key={item.id}
										className={({ active }) =>
											`relative cursor-default select-none py-2 pl-10 pr-4 ${
												active ? "bg-teal-600 text-white" : "text-gray-900"
											}`
										}
										value={item}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? "font-medium" : "font-normal"
													}`}
												>
													{item.name}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? "text-white" : "text-teal-600"
														}`}
													>
														<CheckIcon className="h-5 w-5" aria-hidden="true" />
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
			<span className="text-red-500 text-xs italic">
				{formikObject.touched[name] && formikObject.errors[name]}
			</span>
		</div>
	);
}
