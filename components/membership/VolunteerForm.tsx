import axios from "axios";
import FormCombobox from "components/UI/form/FormCombobox";
import FormInputField from "components/UI/form/FormInputField";
import ToastComponent from "components/UI/notifications/ToastComponent";
import { useFormik } from "formik";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { countryList } from "utils/comboboxLists";
import { en, persian } from "utils/translations";
import * as Yup from "yup";

type Props = {
	onSuccess: () => void;
};

type FormValues = {
	"first-name": string;
	"last-name": string;
	"email-address": string;
	phone: string;
	country: { id: number; name: string };
	"street-address": string;
	city: string;
	region: string;
	"postal-code": string;
	notes: string;
};

function VolunteerForm({ onSuccess }: Props) {
	const params = useParams();
	const locale = (params?.locale as string) || "en-US";
	const text = locale !== "persian" ? en : persian;

	const [canSubmit, setCanSubmit] = useState(false);

	const validationSchema = Yup.object().shape({
		"first-name": Yup.string().label("First Name").required(),
		"last-name": Yup.string().label("Last Name").required(),
		"email-address": Yup.string()
			.email("Please enter a valid email")
			.label("Email")
			.required(),
		phone: Yup.string().label("Phone").required(),
		country: Yup.object().label("Country").required(),
		"street-address": Yup.string().label("Street Address").required(),
		city: Yup.string().label("City").required(),
		region: Yup.string().label("Region").required(),
		"postal-code": Yup.string().label("Postal Code").required(),

		notes: Yup.string().label("additional info"),
	});
	const initialValues = {
		"first-name": "",
		"last-name": "",
		"email-address": "",
		phone: "",
		country: {
			id: 80,
			name: "Iran",
		},
		"street-address": "",
		city: "",
		region: "",
		"postal-code": "",
		notes: "",
	};
	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: (values) => {
			handleAppointmentCreation(values);
		},
	});
	const handleAppointmentCreation = async (values: FormValues) => {
		try {
			const body = {
				...values,
				membership: "volunteer",
				country: values.country.name,
			};

			const response = await axios.post("/api/membership", body);

			if (response.data.ok) {
				toast.custom((t) => (
					<ToastComponent toastObject={t}>
						<div className="ml-3 flex-1">
							<p className="text-sm font-body text-gray-700">
								your application has been submitted.
							</p>
						</div>
					</ToastComponent>
				));
				formik.resetForm();
				onSuccess();
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	useEffect(() => {
		// focus on first input
		const first = document.querySelector("input");
		if (first) first.focus();
	}, []);

	useEffect(() => {
		if (
			formik.isSubmitting ||
			!formik.isValid ||
			formik.values["first-name"] === ""
		) {
			setCanSubmit(false);
		} else {
			setCanSubmit(true);
		}
	}, [formik.isSubmitting, formik.isValid, formik.values]);

	return (
		<div className="bg-gray-100 mx-auto py-6 sm:px-6 lg:px-8 rounded-lg">
			<div className="mt-10 sm:mt-0">
				<div className="md:grid md:grid-cols-3 md:gap-6 ">
					<div className="md:col-span-1 p-10">
						<div className="px-4 sm:px-0">
							<h3 className="text-lg font-medium leading-6 text-gray-900 ">
								{text.membership.form.personal_info.title}
							</h3>
							<p className="mt-1 text-sm text-gray-600">
								{text.membership.form.personal_info.sub}
							</p>
						</div>
					</div>
					<div className="mt-5 md:col-span-2 md:mt-0">
						<div className="overflow-hidden shadow sm:rounded-md">
							<div className="bg-white px-4 py-5 sm:p-6">
								<div className="grid grid-cols-6 gap-6">
									{/* first name */}
									<FormInputField
										name="first-name"
										label={text.membership.form.personal_info.first_name}
										formikObject={formik}
										type="text"
										autoComplete="given-name"
									/>
									{/* lastname */}
									<FormInputField
										name="last-name"
										label={text.membership.form.personal_info.last_name}
										formikObject={formik}
										type="text"
										autoComplete="family-name"
									/>

									{/* email */}
									<FormInputField
										name="email-address"
										label={text.membership.form.personal_info.email}
										formikObject={formik}
										type="email"
										autoComplete="email"
									/>
									{/* phone */}
									<FormInputField
										name="phone"
										label={text.membership.form.personal_info.phone}
										formikObject={formik}
										type="text"
										autoComplete="tel"
									/>

									{/* country */}
									<FormCombobox
										list={countryList}
										name="country"
										formikObject={formik}
										label={text.membership.form.personal_info.country}
									/>

									{/* stree */}
									<FormInputField
										name="street-address"
										type="text"
										label={text.membership.form.personal_info.street_address}
										formikObject={formik}
										additionalClasses="col-span-6 sm:col-span-6"
										autoComplete="street-address"
									/>

									{/* city */}
									<FormInputField
										name="city"
										label={text.membership.form.personal_info.city}
										formikObject={formik}
										type="text"
										autoComplete="address-level2"
									/>

									{/* state */}
									<FormInputField
										name="region"
										label={text.membership.form.personal_info.state}
										formikObject={formik}
										type="text"
										autoComplete="region"
									/>

									{/* zip */}
									<FormInputField
										name="postal-code"
										label={text.membership.form.personal_info.zip_code}
										formikObject={formik}
										type="text"
										autoComplete="postal-code"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* divider */}
			<div className="hidden sm:block" aria-hidden="true">
				<div className="py-5">
					<div className="border-t border-gray-200" />
				</div>
			</div>

			<div className="mt-10 sm:mt-0">
				<div className="md:grid md:grid-cols-3 md:gap-6">
					<div className="md:col-span-1 p-10">
						<div className="px-4 sm:px-0">
							<h3 className="text-lg font-medium leading-6 text-gray-900 ">
								{text.membership.form.volunteer.additional_info.title}
							</h3>
							<p className="mt-1 text-sm text-gray-600">
								{text.membership.form.volunteer.additional_info.sub}
							</p>
						</div>
					</div>
					<div className="mt-5 md:col-span-2 md:mt-0">
						<div className="overflow-hidden shadow sm:rounded-md">
							{/* notes */}
							<div className="bg-white px-4 py-5 sm:p-6">
								<div className="grid grid-cols-6 gap-6">
									<div className="col-span-6 sm:col-span-6">
										<label
											htmlFor="note"
											className="block text-sm font-medium text-gray-700"
										>
											{text.membership.form.volunteer.additional_info.note}
										</label>
										<div className="mt-1">
											<textarea
												id="note"
												name="note"
												rows={3}
												className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
												placeholder={
													text.membership.form.volunteer.additional_info
														.note_placeholder
												}
												defaultValue={""}
											/>
										</div>
										<p className="mt-2 text-sm text-gray-500">
											{text.membership.form.volunteer.additional_info.why_join}
										</p>
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
								<button
									type="submit"
									className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
									disabled={!canSubmit}
									onClick={() => {
										formik.handleSubmit();
									}}
								>
									{text.membership.form.general.submit}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VolunteerForm;
