"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface ContactDetails {
	mediaEmail: string;
	generalEmail: string;
	generalPhone: string;
	addressLine1: string;
	addressLine2: string;
	city: string;
	state: string;
	postalCode: string;
	country: string;
	mapLink: string;
	mapLatitude: number;
	mapLongitude: number;
	mapZoom: number;
}

const defaultDetails: ContactDetails = {
	mediaEmail: "media@iranaj.org",
	generalEmail: "info@iranaj.org",
	generalPhone: "+1 (202) 495-0880",
	addressLine1: "1802 Vernon St NW PMB 514",
	addressLine2: "",
	city: "Washington",
	state: "DC",
	postalCode: "20009",
	country: "USA",
	mapLink: "https://goo.gl/maps/8DRkBxfrwC2EybY58",
	mapLatitude: 38.9167833174732,
	mapLongitude: -77.04204284957177,
	mapZoom: 16,
};

export default function ContactDetailsForm() {
	const [formData, setFormData] = useState<ContactDetails>(defaultDetails);
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await fetch("/api/contact-details");
				if (response.ok) {
					const data = (await response.json()) as Partial<ContactDetails>;
					if (data && Object.keys(data).length > 0) {
						setFormData({
							mediaEmail: data.mediaEmail ?? defaultDetails.mediaEmail,
							generalEmail: data.generalEmail ?? defaultDetails.generalEmail,
							generalPhone: data.generalPhone ?? defaultDetails.generalPhone,
							addressLine1: data.addressLine1 ?? defaultDetails.addressLine1,
							addressLine2: data.addressLine2 ?? defaultDetails.addressLine2,
							city: data.city ?? defaultDetails.city,
							state: data.state ?? defaultDetails.state,
							postalCode: data.postalCode ?? defaultDetails.postalCode,
							country: data.country ?? defaultDetails.country,
							mapLink: data.mapLink ?? defaultDetails.mapLink,
							mapLatitude: data.mapLatitude ?? defaultDetails.mapLatitude,
							mapLongitude: data.mapLongitude ?? defaultDetails.mapLongitude,
							mapZoom: data.mapZoom ?? defaultDetails.mapZoom,
						});
					}
				}
			} catch (_error) {
				toast.error("Failed to load contact details");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: Number(value) }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSaving(true);

		try {
			const response = await fetch("/api/contact-details", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				toast.success("Contact details updated");
			} else {
				const errData = await response.json();
				toast.error(errData.error || "Something went wrong");
			}
		} catch (_error) {
			toast.error("An error occurred");
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return <div className="text-project-gray-400">Loading...</div>;
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6 max-w-4xl bg-white p-8 rounded-xl border border-project-gray-200 shadow-sm"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label
						htmlFor="contact-media-email"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Media Email
					</label>
					<input
						id="contact-media-email"
						type="email"
						name="mediaEmail"
						value={formData.mediaEmail}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
				<div>
					<label
						htmlFor="contact-general-email"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						General Email
					</label>
					<input
						id="contact-general-email"
						type="email"
						name="generalEmail"
						value={formData.generalEmail}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label
						htmlFor="contact-general-phone"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						General Phone
					</label>
					<input
						id="contact-general-phone"
						type="text"
						name="generalPhone"
						value={formData.generalPhone}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
				<div>
					<label
						htmlFor="contact-map-link"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Map Link
					</label>
					<input
						id="contact-map-link"
						type="url"
						name="mapLink"
						value={formData.mapLink}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label
						htmlFor="contact-address-line1"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Address Line 1
					</label>
					<input
						id="contact-address-line1"
						type="text"
						name="addressLine1"
						value={formData.addressLine1}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
				<div>
					<label
						htmlFor="contact-address-line2"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Address Line 2
					</label>
					<input
						id="contact-address-line2"
						type="text"
						name="addressLine2"
						value={formData.addressLine2}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<div>
					<label
						htmlFor="contact-city"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						City
					</label>
					<input
						id="contact-city"
						type="text"
						name="city"
						value={formData.city}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
				<div>
					<label
						htmlFor="contact-state"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						State
					</label>
					<input
						id="contact-state"
						type="text"
						name="state"
						value={formData.state}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
				<div>
					<label
						htmlFor="contact-postal-code"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Postal Code
					</label>
					<input
						id="contact-postal-code"
						type="text"
						name="postalCode"
						value={formData.postalCode}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label
						htmlFor="contact-country"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Country
					</label>
					<input
						id="contact-country"
						type="text"
						name="country"
						value={formData.country}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
				<div>
					<label
						htmlFor="contact-map-zoom"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Map Zoom
					</label>
					<input
						id="contact-map-zoom"
						type="number"
						name="mapZoom"
						value={formData.mapZoom}
						onChange={handleNumberChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label
						htmlFor="contact-map-lat"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Map Latitude
					</label>
					<input
						id="contact-map-lat"
						type="number"
						name="mapLatitude"
						value={formData.mapLatitude}
						onChange={handleNumberChange}
						step="any"
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
				<div>
					<label
						htmlFor="contact-map-lng"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Map Longitude
					</label>
					<input
						id="contact-map-lng"
						type="number"
						name="mapLongitude"
						value={formData.mapLongitude}
						onChange={handleNumberChange}
						step="any"
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
			</div>

			<div className="flex justify-end pt-4 border-t border-project-gray-100">
				<button
					type="submit"
					disabled={saving}
					className="px-8 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors font-medium disabled:opacity-50"
				>
					{saving ? "Saving..." : "Save Changes"}
				</button>
			</div>
		</form>
	);
}
