interface ButtonTextWithActionProps {
	text: string;
	className?: string;
	action?: () => void;
	hasIcon?: boolean;
	wrapperClassName?: string;
}

const ButtonTextTypeWithAction: React.FC<ButtonTextWithActionProps> = ({
	text,
	action,
	className,
	wrapperClassName,
	hasIcon = true,
}) => {
	return (
		<div
			className={[
				"shrink-0 self-end ml-2 cursor-pointer",
				wrapperClassName,
			].join(" ")}
		>
			<button
				type="button"
				className={[
					"font-medium text-primary-500 hover:text-secondary-500 bg-transparent border-0 p-0",
					className,
				].join(" ")}
				onClick={action}
			>
				{text}
				{hasIcon && (
					<span className="sm:inline text-secondary-500"> &rarr;</span>
				)}
			</button>
		</div>
	);
};

export default ButtonTextTypeWithAction;
