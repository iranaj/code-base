import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

export default function TopNavbar() {
  const router = useRouter();
  const { locale } = router;

  return (
    <header className="flex fixed w-full h-32 top-0">
      <nav className="relative z-50 flex justify-between w-full max-w-7xl mx-auto gap-36 text-projectGray-300 font-body font-regular text-xs mt-24">
        <div className="hidden">
          <Image
            src={`/logo_horizontal.svg`}
            alt="NAJ logo"
            width={107}
            height={54}
          />
        </div>
        <div className="hidden md:flex items-center w-full justify-end gap-24">
          <Link
            href="/#"
            className="inline-block rounded-lg py-1 px-2  hover:bg-slate-100 hover:text-slate-900"
          >
            home
          </Link>
          <Link
            href="/#"
            className="inline-block rounded-lg py-1 px-2  hover:bg-slate-100 hover:text-slate-900"
          >
            about
          </Link>
          <Link
            href="/#"
            className="inline-block rounded-lg py-1 px-2  hover:bg-slate-100 hover:text-slate-900"
          >
            contact
          </Link>
        </div>
        <div className="flex items-center w-28 ">
          <div className="hidden md:block">
            <span className="inline-block rounded-lg py-1 px-2  hover:bg-slate-100 hover:text-slate-900">
              english
            </span>
          </div>
          <div className="hidden md:block">
            <span className="inline-block rounded-lg py-1 px-2  hover:bg-slate-100 hover:text-slate-900">
              |
            </span>
          </div>

          <div className="hidden md:block">
            <span className="inline-block rounded-lg py-1 px-2  hover:bg-slate-100 hover:text-slate-900 font-bodyFa font-normal">
              فارسی
            </span>
          </div>

          <div className="-mr-1 md:hidden">
            <div>
              <button
                className="relative z-10 flex h-8 w-8 items-center justify-center [:not(:focus-visible)]:focus:outline-none"
                aria-label="Toggle Navigation"
                id="headlessui-popover-button-:R1p6:"
                type="button"
                aria-expanded="false"
              >
                <svg
                  aria-hidden="true"
                  className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path
                    d="M0 1H14M0 7H14M0 13H14"
                    className="origin-center transition"
                  />
                  <path
                    d="M2 2L12 12M12 2L2 12"
                    className="origin-center transition scale-90 opacity-0"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
