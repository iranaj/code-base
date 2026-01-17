import Link from "next/link";
import { useParams } from "next/navigation";

interface Props {
	text: string;
	href: string;
	className?: string;
	wrapperClassName?: string;
	hasIcon?: boolean;
	target?: any;
	passHref?: boolean;
}

const ButtonTextTypeA: React.FC<Props> = ({
	text,
	href,
	className,
	wrapperClassName,
	hasIcon,
	target,
	passHref,
}) => {
	const params = useParams();
	const locale = (params?.locale as string) || "en-US";

	return (
		<div
			className={[
				"shrink-0 self-end ml-2 cursor-pointer relative",
				wrapperClassName,
			].join(" ")}
		>
			<Link href={href} target={target} passHref={passHref}>
				<span
					className={[
						"font-medium text-primary-500 hover:text-secondary-500",
						locale === "persian" ? "text-farsi" : "font-body",
						className,
					].join(" ")}
				>
					{text}
					{hasIcon && (
						<span className="sm:inline text-secondary-500"> &rarr;</span>
					)}
				</span>
			</Link>
		</div>
	);
};

export default ButtonTextTypeA;
