"use client";

import { useNavigationSettingsContext } from "components/providers/NavigationSettingsProvider";
import {
	buildDefaultNavigationSettings,
	mergeNavigationSettings,
	type NavigationSettings,
} from "lib/navigationConfig";
import { useEffect, useState } from "react";

export const useNavigationSettings = () => {
	const contextSettings = useNavigationSettingsContext();
	const [settings, setSettings] = useState<NavigationSettings>(
		contextSettings ?? buildDefaultNavigationSettings(),
	);
	const [loading, setLoading] = useState(!contextSettings);

	useEffect(() => {
		if (contextSettings) {
			setSettings(contextSettings);
			setLoading(false);
			return;
		}

		let isActive = true;

		const fetchSettings = async () => {
			try {
				const response = await fetch("/api/navigation", {
					cache: "no-store",
				});
				if (!response.ok) {
					return;
				}

				const data = await response.json();
				if (isActive) {
					setSettings(mergeNavigationSettings(data));
				}
			} catch (_error) {
				// Silently fall back to defaults
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
	}, [contextSettings]);

	return { settings, loading };
};
