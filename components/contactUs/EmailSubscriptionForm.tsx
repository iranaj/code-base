import React from "react";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";

function EmailSubscriptionForm() {
  const router: NextRouter = useRouter();
  const { locale } = router;
  const text = locale === "en-US" ? en : persian;
  return (
    <form className="col-span-2 relative">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="youremail@emialhost.com"
        className="w-full h-14 border-2 border-gray-300 rounded-lg bg-gray-200 px-4 accent-1 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent placeholder:text-gray-300 placeholder:text-left"
        required
      />
      <button
        type="submit"
        className="absolute right-4 top-1 h-12 w-fit hover:text-secondary-500 rtl:font-bodyFa"
      >
        {text.contact.newsletter.button}
        <span className="hidden sm:inline text-secondary-500"> &rarr;</span>
      </button>
    </form>
  );
}

export default EmailSubscriptionForm;
