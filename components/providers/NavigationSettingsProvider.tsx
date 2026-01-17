"use client";

import {
	mergeNavigationSettings,
	type NavigationSettings,
} from "lib/navigationConfig";
import type React from "react";
import { createContext, useContext, useMemo } from "react";

const NavigationSettingsContext = createContext<NavigationSettings | null>(
	null,
);

export const NavigationSettingsProvider = ({
	children,
	value,
}: {
	children: React.ReactNode;
	value: NavigationSettings;
}) => {
	const normalized = useMemo(() => mergeNavigationSettings(value), [value]);
	return (
		<NavigationSettingsContext.Provider value={normalized}>
			{children}
		</NavigationSettingsContext.Provider>
	);
};

export const useNavigationSettingsContext = () =>
	useContext(NavigationSettingsContext);
