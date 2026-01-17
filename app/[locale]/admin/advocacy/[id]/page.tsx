"use client";

import AdvocacyForm from "components/admin/AdvocacyForm";
import { use, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function EditAdvocacyPage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = use(params);
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(`/api/advocacy/${id}`);
				if (response.ok) {
					const item = await response.json();
					setData(item);
				} else {
					toast.error("Failed to fetch item data");
				}
			} catch (_error) {
				toast.error("An error occurred");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	if (loading) return <div>Loading...</div>;
	if (!data) return <div>Item not found</div>;

	return (
		<div>
			<h1 className="text-2xl font-bold font-header text-primary-900 mb-6">
				Edit Advocacy Campaign
			</h1>
			<AdvocacyForm initialData={data} isEditing={true} />
		</div>
	);
}
