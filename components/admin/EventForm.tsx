"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface EventFormProps {
	initialData?: any;
	isEditing?: boolean;
}

export default function EventForm({
	initialData,
	isEditing = false,
}: EventFormProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		titleEn: "",
		titleFa: "",
		descriptionEn: "",
		descriptionFa: "",
		location: "",
		date: "",
		imageUrl: "",
		registrationLink: "",
		isVirtual: false,
	});

	useEffect(() => {
		if (initialData) {
			// Format date for datetime-local input (YYYY-MM-DDTHH:mm)
			let formattedDate = "";
			if (initialData.date) {
				const d = new Date(initialData.date);
				d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
				formattedDate = d.toISOString().slice(0, 16);
			}

			setFormData({
				titleEn: initialData.title?.en || "",
				titleFa: initialData.title?.fa || "",
				descriptionEn: initialData.description?.en || "",
				descriptionFa: initialData.description?.fa || "",
				location: initialData.location || "",
				date: formattedDate,
				imageUrl: initialData.imageUrl || "",
				registrationLink: initialData.registrationLink || "",
				isVirtual: initialData.isVirtual || false,
			});
		}
	}, [initialData]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, checked } = e.target;
		setFormData((prev) => ({ ...prev, [name]: checked }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const payload = {
			title: { en: formData.titleEn, fa: formData.titleFa },
			description: { en: formData.descriptionEn, fa: formData.descriptionFa },
			location: formData.location,
			date: new Date(formData.date).toISOString(),
			imageUrl: formData.imageUrl,
			registrationLink: formData.registrationLink,
			isVirtual: formData.isVirtual,
		};

		try {
			const url = isEditing ? `/api/events/${initialData._id}` : "/api/events";

			const method = isEditing ? "PUT" : "POST";

			const response = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (response.ok) {
				toast.success(
					isEditing ? "Updated successfully" : "Created successfully",
				);
				router.back();
				router.refresh();
			} else {
				const errData = await response.json();
				toast.error(errData.error || "Something went wrong");
			}
		} catch (_error) {
			toast.error("An error occurred");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-6 max-w-4xl bg-white p-8 rounded-xl border border-project-gray-200 shadow-sm"
		>
			{/* Titles */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label
						htmlFor="event-title-en"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Event Title (English)
					</label>
					<input
						id="event-title-en"
						type="text"
						name="titleEn"
						value={formData.titleEn}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
				<div dir="rtl">
					<label
						htmlFor="event-title-fa"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						عنوان رویداد (فارسی)
					</label>
					<input
						id="event-title-fa"
						type="text"
						name="titleFa"
						value={formData.titleFa}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
					/>
				</div>
			</div>

			{/* Date & Virtual Toggle */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
				<div>
					<label
						htmlFor="event-date"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Date & Time
					</label>
					<input
						id="event-date"
						type="datetime-local"
						name="date"
						value={formData.date}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
				<div className="flex items-center mt-6">
					<input
						id="isVirtual"
						name="isVirtual"
						type="checkbox"
						checked={formData.isVirtual}
						onChange={handleCheckboxChange}
						className="h-5 w-5 text-primary-900 border-gray-300 rounded focus:ring-primary-500"
					/>
					<label
						htmlFor="isVirtual"
						className="ml-2 block text-sm text-project-gray-700"
					>
						Is this a Virtual/Online Event?
					</label>
				</div>
			</div>

			{/* Location */}
			{!formData.isVirtual && (
				<div>
					<label
						htmlFor="event-location"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Location Address
					</label>
					<input
						id="event-location"
						type="text"
						name="location"
						value={formData.location}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
						placeholder="123 Main St, City, Country"
						required={!formData.isVirtual}
					/>
				</div>
			)}

			{/* Links & Images */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label
						htmlFor="event-registration-link"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Registration Link (Optional)
					</label>
					<input
						id="event-registration-link"
						type="url"
						name="registrationLink"
						value={formData.registrationLink}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
						placeholder="https://..."
					/>
				</div>
				<div>
					<label
						htmlFor="event-image-url"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Image URL
					</label>
					<input
						id="event-image-url"
						type="text"
						name="imageUrl"
						value={formData.imageUrl}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
						placeholder="https://..."
					/>
				</div>
			</div>

			{/* Description */}
			<div className="space-y-6">
				<div>
					<label
						htmlFor="event-description-en"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Description (English)
					</label>
					<textarea
						id="event-description-en"
						name="descriptionEn"
						value={formData.descriptionEn}
						onChange={handleChange}
						required
						rows={4}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
				<div dir="rtl">
					<label
						htmlFor="event-description-fa"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						توضیحات (فارسی)
					</label>
					<textarea
						id="event-description-fa"
						name="descriptionFa"
						value={formData.descriptionFa}
						onChange={handleChange}
						required
						rows={4}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
					/>
				</div>
			</div>

			<div className="flex justify-end pt-4 border-t border-project-gray-100">
				<button
					type="button"
					onClick={() => router.back()}
					className="mr-4 px-6 py-2 text-project-gray-600 hover:text-project-gray-800 font-medium"
				>
					Cancel
				</button>
				<button
					type="submit"
					disabled={loading}
					className="px-8 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors font-medium disabled:opacity-50"
				>
					{loading
						? "Saving..."
						: isEditing
							? "Update Event"
							: "Schedule Event"}
				</button>
			</div>
		</form>
	);
}
