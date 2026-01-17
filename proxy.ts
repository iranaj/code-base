import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";

const locales = ["en-US", "persian"];
const defaultLocale = "en-US";

// Match both the root sign-in path and localized sign-in paths
const _isPublicRoute = createRouteMatcher([
	"/sign-in(.*)",
	"/sign-up(.*)",
	"/en-US/sign-in(.*)",
	"/en-US/sign-up(.*)",
	"/persian/sign-in(.*)",
	"/persian/sign-up(.*)",
]);

const isAdminRoute = createRouteMatcher([
	"/admin(.*)",
	"/en-US/admin(.*)",
	"/persian/admin(.*)",
]);

export default clerkMiddleware(async (auth, request: NextRequest) => {
	const { nextUrl } = request;
	const pathname = nextUrl.pathname;

	// 1. Protect Admin Routes
	if (isAdminRoute(request)) {
		await auth.protect();
	}

	// 2. Locale Redirection Logic
	// Check if there is any supported locale in the pathname
	const pathnameHasLocale = locales.some(
		(locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
	);

	if (pathnameHasLocale) return;

	// Redirect if there is no locale
	if (
		!pathname.startsWith("/_next") &&
		!pathname.startsWith("/api") &&
		!pathname.includes(".")
	) {
		nextUrl.pathname = `/${defaultLocale}${pathname}`;
		return NextResponse.redirect(nextUrl);
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		"/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
		// Always run for API routes
		"/(api|trpc)(.*)",
	],
};
