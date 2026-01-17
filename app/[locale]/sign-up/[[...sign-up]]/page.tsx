import { SignUp } from "@clerk/nextjs";
import AuthLayout from "components/auth/AuthLayout";

export default function Page() {
	return (
		<AuthLayout
			title="Join Our Community"
			subtitle="Create an account to become a member of the Iranian Jurists Global Network."
		>
			<SignUp
				appearance={{
					variables: {
						colorPrimary: "#0B1D44",
						colorText: "#374151",
						fontFamily: "var(--font-inter)",
						borderRadius: "0.75rem",
						spacingUnit: "1rem",
					},
					elements: {
						rootBox: "w-full",
						card: "shadow-xl border border-project-gray-300 w-full bg-white rounded-xl p-8",
						headerTitle: "font-header text-3xl text-primary-900 font-bold mb-2",
						headerSubtitle: "font-body text-project-gray-500 text-base mb-6",
						formButtonPrimary:
							"bg-primary-900 hover:bg-primary-800 text-white font-body font-semibold py-3 normal-case rounded-lg shadow-md transition-all duration-300",
						footerActionLink:
							"text-secondary-500 hover:text-secondary-600 font-bold ml-1",
						socialButtonsBlockButton:
							"font-body border border-project-gray-300 hover:bg-project-gray-200 text-project-gray-500 py-2.5 rounded-lg",
						socialButtonsBlockButtonText: "font-semibold",
						dividerLine: "bg-project-gray-300",
						dividerText: "text-project-gray-400 font-medium",
						formFieldLabel: "font-body text-project-gray-500 font-medium mb-1",
						formFieldInput:
							"font-body border-project-gray-300 focus:border-secondary-500 focus:ring-1 focus:ring-secondary-500 rounded-lg py-2.5 shadow-sm",
						footer: "hidden",
						footerActionText: "text-project-gray-500 font-medium",
						navbar: "hidden",
					},
					layout: {
						socialButtonsPlacement: "bottom",
						logoPlacement: "none",
					},
				}}
				signInUrl="/sign-in"
			/>
		</AuthLayout>
	);
}
