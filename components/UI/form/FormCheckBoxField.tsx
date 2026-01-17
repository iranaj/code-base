type Props = {
	label: string;
	name: string;
	additionalClasses?: string;
	formikObject: any;
};

function classNames(...classes: string[]) {
	return classes.join(" ");
}

export default function FormCheckBoxField({
	label,
	name,
	additionalClasses,
	formikObject,
}: Props) {
	return (
		<div
			className={classNames(
				"col-span-6 sm:col-span-6 flex items-start",
				additionalClasses || "",
			)}
		>
			<div className="flex h-5 items-center">
				<input
					name={name}
					id={name}
					type="checkbox"
					value={formikObject.values[name]}
					onChange={formikObject.handleChange(name)}
					className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
				/>
			</div>
			<div className="ml-3 text-sm">
				<label
					htmlFor={name}
					className="block text-sm font-medium text-gray-700"
				>
					{label}
				</label>
			</div>
			<span className="text-red-500 text-xs italic">
				{formikObject.touched[name] && formikObject.errors[name]}
			</span>
		</div>
	);
}
