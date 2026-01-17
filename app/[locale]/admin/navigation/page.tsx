import NavigationSettingsForm from "components/admin/NavigationSettingsForm";

export default function AdminNavigationPage() {
	return (
		<div>
			<h1 className="text-2xl font-header font-bold text-primary-900 mb-2">
				Navigation
			</h1>
			<p className="text-project-gray-500 mb-8 max-w-2xl">
				Control which pages appear in the navigation bar and customize their
				labels.
			</p>
			<NavigationSettingsForm />
		</div>
	);
}
