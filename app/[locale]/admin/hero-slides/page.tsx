"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

interface HeroSlideItem {
	_id: string;
	text: { en: string; fa: string };
	order: number;
	isActive: boolean;
}

export default function HeroSlidesList() {
	const [items, setItems] = useState<HeroSlideItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [seeding, setSeeding] = useState(false);
	const [attemptedSeed, setAttemptedSeed] = useState(false);
	const pathname = usePathname();
	const locale = pathname?.split("/")[1] || "en-US";

	const loadItems = useCallback(async () => {
		try {
			const response = await fetch("/api/hero-slides");
			if (response.ok) {
				const data = await response.json();
				return Array.isArray(data) ? data : [];
			} else {
				toast.error("Failed to load hero slides");
			}
		} catch (_error) {
			toast.error("An error occurred");
		}
		return null;
	}, []);

	const seedSlides = useCallback(async () => {
		if (seeding) return;
		setSeeding(true);
		setAttemptedSeed(true);
		try {
			const response = await fetch("/api/hero-slides/seed", { method: "POST" });
			if (response.ok) {
				toast.success("Imported current hero slides");
				const data = await loadItems();
				if (data) {
					setItems(data);
				}
			} else {
				const err = await response.json();
				toast.error(err?.error || "Failed to import slides");
			}
		} catch (_error) {
			toast.error("An error occurred");
		} finally {
			setSeeding(false);
		}
	}, [loadItems, seeding]);

	useEffect(() => {
		let isMounted = true;
		const fetchItems = async () => {
			const data = await loadItems();
			if (!data) {
				setLoading(false);
				return;
			}
			if (isMounted) {
				setItems(data);
				setLoading(false);
			}
			if (data.length === 0 && !attemptedSeed) {
				await seedSlides();
			}
		};

		fetchItems();
		return () => {
			isMounted = false;
		};
	}, [attemptedSeed, loadItems, seedSlides]);

	const handleDelete = async (id: string) => {
		if (!confirm("Are you sure you want to delete this slide?")) return;

		try {
			const response = await fetch(`/api/hero-slides/${id}`, {
				method: "DELETE",
			});

			if (response.ok) {
				toast.success("Slide deleted");
				const data = await loadItems();
				if (data) {
					setItems(data);
				}
			} else {
				toast.error("Failed to delete slide");
			}
		} catch (_error) {
			toast.error("An error occurred");
		}
	};

	return (
		<div>
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold font-header text-primary-900">
					Manage Hero Slides
				</h1>
				<Link
					href={`/${locale}/admin/hero-slides/create`}
					className="bg-primary-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary-800 transition-colors"
				>
					<PlusIcon className="w-5 h-5" />
					Create New
				</Link>
			</div>

			<div className="bg-white border border-project-gray-200 rounded-xl overflow-hidden shadow-sm">
				{loading ? (
					<div className="p-8 text-center text-project-gray-400">
						Loading...
					</div>
				) : items.length === 0 ? (
					<div className="p-8 text-center text-project-gray-400 space-y-4">
						<p>No hero slides found. Create one to get started.</p>
						<button
							type="button"
							onClick={seedSlides}
							disabled={seeding}
							className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-project-gray-200 text-sm text-primary-900 hover:bg-project-gray-50 disabled:opacity-50"
						>
							{seeding ? "Importing..." : "Import current hero slides"}
						</button>
					</div>
				) : (
					<table className="min-w-full divide-y divide-project-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-project-gray-500 uppercase tracking-wider"
								>
									Slide Text (English)
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-project-gray-500 uppercase tracking-wider"
								>
									Order
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-project-gray-500 uppercase tracking-wider"
								>
									Status
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-right text-xs font-medium text-project-gray-500 uppercase tracking-wider"
								>
									Actions
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-project-gray-200">
							{items.map((item) => (
								<tr key={item._id} className="hover:bg-gray-50">
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-900 max-w-[320px] truncate">
										{item.text?.en}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-project-gray-500">
										{item.order ?? 0}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-project-gray-500">
										<span
											className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${item.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}
										>
											{item.isActive ? "Active" : "Hidden"}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<div className="flex justify-end gap-3">
											<Link
												href={`/${locale}/admin/hero-slides/${item._id}`}
												className="text-primary-600 hover:text-primary-900"
											>
												<PencilIcon className="w-5 h-5" />
											</Link>
											<button
												type="button"
												onClick={() => handleDelete(item._id)}
												className="text-red-500 hover:text-red-700"
											>
												<TrashIcon className="w-5 h-5" />
											</button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
