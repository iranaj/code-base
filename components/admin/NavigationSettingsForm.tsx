"use client";

import {
	buildDefaultNavigationSettings,
	buildNavHref,
	mergeNavigationSettings,
	type NavigationItem,
} from "lib/navigationConfig";
import { usePathname } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const formatKeyLabel = (key: string) =>
	key.charAt(0).toUpperCase() + key.slice(1);

export default function NavigationSettingsForm() {
	const pathname = usePathname();
	const locale = pathname?.split("/")[1] || "en-US";
	const [items, setItems] = useState<NavigationItem[]>(
		buildDefaultNavigationSettings().items,
	);
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		let isActive = true;
		const fetchSettings = async () => {
			setLoading(true);
			try {
				const response = await fetch("/api/navigation", {
					cache: "no-store",
				});
				if (!response.ok) {
					return;
				}
				const data = await response.json();
				if (isActive) {
					setItems(mergeNavigationSettings(data).items);
				}
			} catch (_error) {
				toast.error("Failed to load navigation settings");
			} finally {
				if (isActive) {
					setLoading(false);
				}
			}
		};

		fetchSettings();
		return () => {
			isActive = false;
		};
	}, []);

	const updateItem = (key: string, updates: Partial<NavigationItem>) => {
		setItems((prev) =>
			prev.map((item) => (item.key === key ? { ...item, ...updates } : item)),
		);
	};

	const updateLabel = (key: string, localeKey: "en" | "fa", value: string) => {
		setItems((prev) =>
			prev.map((item) =>
				item.key === key
					? {
							...item,
							label: {
								...item.label,
								[localeKey]: value,
							},
						}
					: item,
			),
		);
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setSaving(true);
		try {
			const response = await fetch("/api/navigation", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ items }),
			});

			if (response.ok) {
				toast.success("Navigation settings updated");
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
			className="space-y-8 max-w-5xl bg-white p-8 rounded-xl border border-project-gray-200 shadow-sm"
		>
			<div>
				<h2 className="text-lg font-semibold text-primary-900 mb-2">
					Navigation Items
				</h2>
				<p className="text-sm text-project-gray-500">
					Toggle visibility and update the labels that appear in the top
					navigation bar.
				</p>
			</div>

			<div className="space-y-6">
				{items.map((item) => (
					<div
						key={item.key}
						className="border border-project-gray-200 rounded-xl p-6"
					>
						<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
							<div>
								<h3 className="text-base font-semibold text-primary-900">
									{formatKeyLabel(item.key)}
								</h3>
								<p className="text-xs text-project-gray-400">
									{buildNavHref(item.key, locale)}
								</p>
							</div>
							<label className="inline-flex items-center gap-2 text-sm font-medium text-project-gray-600">
								<input
									type="checkbox"
									checked={item.enabled}
									onChange={(event) =>
										updateItem(item.key, { enabled: event.target.checked })
									}
									className="h-4 w-4 rounded border-project-gray-300 text-secondary-500 focus:ring-secondary-500"
								/>
								Visible
							</label>
						</div>

						<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
							<div>
								<label
									htmlFor={`nav-${item.key}-en`}
									className="block text-sm font-medium text-project-gray-700 mb-1"
								>
									Label (English)
								</label>
								<input
									id={`nav-${item.key}-en`}
									type="text"
									value={item.label.en}
									onChange={(event) =>
										updateLabel(item.key, "en", event.target.value)
									}
									className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
								/>
							</div>
							<div dir="rtl">
								<label
									htmlFor={`nav-${item.key}-fa`}
									className="block text-sm font-medium text-project-gray-700 mb-1"
								>
									برچسب (فارسی)
								</label>
								<input
									id={`nav-${item.key}-fa`}
									type="text"
									value={item.label.fa}
									onChange={(event) =>
										updateLabel(item.key, "fa", event.target.value)
									}
									className="w-full px-4 py-2 border border-project-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 font-bodyFa"
								/>
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="flex justify-end">
				<button
					type="submit"
					disabled={saving}
					className="px-6 py-2 bg-primary-900 text-white text-sm font-semibold rounded-lg hover:bg-primary-800 transition-colors disabled:opacity-60"
				>
					{saving ? "Saving..." : "Save Changes"}
				</button>
			</div>
		</form>
	);
}
