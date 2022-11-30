import Link from "next/link";
import { NextRouter, useRouter } from "next/router";

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
  const router: NextRouter = useRouter();
  const { locale } = router;

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
