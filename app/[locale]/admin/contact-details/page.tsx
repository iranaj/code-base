"use client";

import ContactDetailsForm from "components/admin/ContactDetailsForm";

export default function ContactDetailsPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold font-header text-primary-900 mb-6">
				Contact Details
			</h1>
			<ContactDetailsForm />
		</div>
	);
}
