import { NavigationSettingsProvider } from "components/providers/NavigationSettingsProvider";
import { getNavigationSettings } from "lib/navigationSettings.server";
import type { ReactNode } from "react";

export const dynamic = "force-dynamic";

export default async function LocaleLayout({
	children,
}: {
	children: ReactNode;
}) {
	const navigation = await getNavigationSettings();

	return (
		<NavigationSettingsProvider value={navigation}>
			{children}
		</NavigationSettingsProvider>
	);
}
