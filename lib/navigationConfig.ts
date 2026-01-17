import { en, persian } from "utils/translations";

export type NavKey =
	| "home"
	| "about"
	| "advocacy"
	| "events"
	| "programs"
	| "press"
	| "contact";

export interface LocalizedLabel {
	en: string;
	fa: string;
}

export interface NavigationItem {
	key: NavKey;
	enabled: boolean;
	label: LocalizedLabel;
}

export interface NavigationSettings {
	items: NavigationItem[];
}

export const NAV_ITEM_ORDER: NavKey[] = [
	"home",
	"about",
	"advocacy",
	"events",
	"programs",
	"press",
	"contact",
];

const DEFAULT_LABELS: Record<NavKey, LocalizedLabel> = {
	home: { en: en.home.title, fa: persian.home.title },
	about: { en: en.about.title, fa: persian.about.title },
	advocacy: { en: en.advocacy.title, fa: persian.advocacy.title },
	events: { en: en.events.title, fa: persian.events.title },
	programs: { en: en.programs.title, fa: persian.programs.title },
	press: { en: en.press.title, fa: persian.press.title },
	contact: { en: en.contact.title, fa: persian.contact.title },
};

const DEFAULT_ENABLED: Record<NavKey, boolean> = {
	home: true,
	about: true,
	advocacy: true,
	events: true,
	programs: false,
	press: false,
	contact: true,
};

export const buildDefaultNavigationSettings = (): NavigationSettings => ({
	items: NAV_ITEM_ORDER.map((key) => ({
		key,
		enabled: DEFAULT_ENABLED[key],
		label: { ...DEFAULT_LABELS[key] },
	})),
});

const pickLabel = (value: unknown, fallback: string) =>
	typeof value === "string" ? value : fallback;

export const mergeNavigationSettings = (
	incoming?: Partial<NavigationSettings> | null,
): NavigationSettings => {
	const defaults = buildDefaultNavigationSettings();
	if (!incoming?.items?.length) {
		return defaults;
	}

	const incomingMap = new Map<NavKey, NavigationItem>();
	for (const item of incoming.items) {
		if (item?.key && NAV_ITEM_ORDER.includes(item.key)) {
			incomingMap.set(item.key, item as NavigationItem);
		}
	}

	const items = NAV_ITEM_ORDER.map((key) => {
		const base = defaults.items.find(
			(item) => item.key === key,
		) as NavigationItem;
		const override = incomingMap.get(key);
		return {
			key,
			enabled:
				typeof override?.enabled === "boolean"
					? override.enabled
					: base.enabled,
			label: {
				en: pickLabel(override?.label?.en, base.label.en),
				fa: pickLabel(override?.label?.fa, base.label.fa),
			},
		};
	});

	return { items };
};

export const buildNavHref = (key: NavKey, locale: string) => {
	switch (key) {
		case "home":
			return `/${locale}/#home`;
		case "contact":
			return `/${locale}/#contact`;
		case "about":
			return `/${locale}/about`;
		case "advocacy":
			return `/${locale}/advocacy`;
		case "events":
			return `/${locale}/events`;
		case "programs":
			return `/${locale}/programs`;
		case "press":
			return `/${locale}/press`;
		default:
			return `/${locale}`;
	}
};

export const isHashNavKey = (key: NavKey) =>
	key === "home" || key === "contact";

export const buildNavLinks = (items: NavigationItem[], locale: string) => {
	const normalized = mergeNavigationSettings({ items }).items;
	return normalized
		.filter((item) => item.enabled)
		.map((item) => {
			const label =
				locale === "persian"
					? item.label.fa || item.label.en
					: item.label.en || item.label.fa;
			return {
				key: item.key,
				href: buildNavHref(item.key, locale),
				label,
				isHash: isHashNavKey(item.key),
			};
		});
};

export const isNavItemEnabled = (items: NavigationItem[], key: NavKey) => {
	const normalized = mergeNavigationSettings({ items }).items;
	return normalized.find((item) => item.key === key)?.enabled ?? true;
};

export const getNavItemLabel = (key: NavKey) => DEFAULT_LABELS[key].en;
