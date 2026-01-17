"use client";

import { useRouter } from "next/navigation";
import type React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface AdvocacyFormProps {
	initialData?: any;
	isEditing?: boolean;
}

export default function AdvocacyForm({
	initialData,
	isEditing = false,
}: AdvocacyFormProps) {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({
		titleEn: "",
		titleFa: "",
		contentEn: "",
		contentFa: "",
		imageUrl: "",
		slug: "",
		author: "",
		publishedAt: new Date().toISOString().split("T")[0], // YYYY-MM-DD
	});

	useEffect(() => {
		if (initialData) {
			setFormData({
				titleEn: initialData.title?.en || "",
				titleFa: initialData.title?.fa || "",
				contentEn: initialData.content?.en || "",
				contentFa: initialData.content?.fa || "",
				imageUrl: initialData.imageUrl || "",
				slug: initialData.slug || "",
				author: initialData.author || "",
				publishedAt: initialData.publishedAt
					? new Date(initialData.publishedAt).toISOString().split("T")[0]
					: new Date().toISOString().split("T")[0],
			});
		}
	}, [initialData]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	// Simple slug generator
	const generateSlug = () => {
		const slug = formData.titleEn
			.toLowerCase()
			.trim()
			.replace(/[^\w\s-]/g, "")
			.replace(/[\s_-]+/g, "-")
			.replace(/^-+|-+$/g, "");
		setFormData((prev) => ({ ...prev, slug }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const payload = {
			title: { en: formData.titleEn, fa: formData.titleFa },
			content: { en: formData.contentEn, fa: formData.contentFa },
			imageUrl: formData.imageUrl,
			slug: formData.slug,
			author: formData.author,
			publishedAt: formData.publishedAt,
		};

		try {
			const url = isEditing
				? `/api/advocacy/${initialData._id}`
				: "/api/advocacy";

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
						htmlFor="advocacy-title-en"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Title (English)
					</label>
					<input
						id="advocacy-title-en"
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
						htmlFor="advocacy-title-fa"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						عنوان (فارسی)
					</label>
					<input
						id="advocacy-title-fa"
						type="text"
						name="titleFa"
						value={formData.titleFa}
						onChange={handleChange}
						required
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
					/>
				</div>
			</div>

			{/* Slug & Date */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label
						htmlFor="advocacy-slug"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Slug
					</label>
					<div className="flex gap-2">
						<input
							id="advocacy-slug"
							type="text"
							name="slug"
							value={formData.slug}
							onChange={handleChange}
							required
							className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 bg-gray-50"
						/>
						<button
							type="button"
							onClick={generateSlug}
							className="px-3 py-2 text-sm bg-project-gray-100 hover:bg-project-gray-200 rounded-lg border border-project-gray-300"
						>
							Generate
						</button>
					</div>
				</div>
				<div>
					<label
						htmlFor="advocacy-published"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Published Date
					</label>
					<input
						id="advocacy-published"
						type="date"
						name="publishedAt"
						value={formData.publishedAt}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
			</div>

			{/* Author & Image */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<label
						htmlFor="advocacy-author"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Author
					</label>
					<input
						id="advocacy-author"
						type="text"
						name="author"
						value={formData.author}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
				<div>
					<label
						htmlFor="advocacy-image-url"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Image URL
					</label>
					<input
						id="advocacy-image-url"
						type="text"
						name="imageUrl"
						value={formData.imageUrl}
						onChange={handleChange}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
						placeholder="https://..."
					/>
				</div>
			</div>

			{/* Content */}
			<div className="space-y-6">
				<div>
					<label
						htmlFor="advocacy-content-en"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						Content (English)
					</label>
					<textarea
						id="advocacy-content-en"
						name="contentEn"
						value={formData.contentEn}
						onChange={handleChange}
						required
						rows={6}
						className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
					/>
				</div>
				<div dir="rtl">
					<label
						htmlFor="advocacy-content-fa"
						className="block text-sm font-medium text-project-gray-700 mb-1"
					>
						محتوا (فارسی)
					</label>
					<textarea
						id="advocacy-content-fa"
						name="contentFa"
						value={formData.contentFa}
						onChange={handleChange}
						required
						rows={6}
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
					{loading ? "Saving..." : isEditing ? "Update Item" : "Create Item"}
				</button>
			</div>
		</form>
	);
}
