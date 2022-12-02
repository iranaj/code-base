import { useState } from "react";
import { NextRouter, useRouter } from "next/router";
import { en, persian } from "utils/translations";
import Loading from "components/UI/loading";

function EmailSubscriptionForm() {
  const router: NextRouter = useRouter();
  const { locale } = router;
  const text = locale !== "persian" ? en : persian;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setEmailError("");
    try {
      if (email === "") {
        throw new Error("300");
      } else {
        // validate email
        const emailRegex =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegex.test(email)) {
          const response = await fetch("/api/email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          });
          const data = await response.json();
          if (data.ok) {
            setEmailSuccess(true);
          } else {
            throw new Error(text.contact.newsletter.subscribe_error.general);
          }
        } else {
          // throw invalid email error
          throw new Error(text.contact.newsletter.subscribe_error.email);
        }
      }
    } catch (err: any) {
      setEmailError(err.message);
    }
    setEmail("");
    setIsLoading(false);
  };

  if (emailSuccess) {
    return (
      <div className="flex flex-col items-center justify-center col-span-2 rtl:font-bodyFa">
        <span className="text-xl font-medium text-secondary-500">
          {text.contact.newsletter.subscribe_success}
        </span>
      </div>
    );
  }

  return (
    <form className="col-span-2 relative" onSubmit={handleEmailSubmit}>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="youremail@emialhost.com"
        value={email}
        onChange={handleEmailChange}
        className="w-full h-14 border-2 border-projectGray-300 rounded-lg bg-projectGray-100 px-4 accent-1 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent placeholder:text-projectGray-300 placeholder:text-left rtl:text-left "
        required
        disabled={isLoading}
      />
      {isLoading ? (
        <Loading className="absolute top-4 right-7" />
      ) : (
        <button
          type="submit"
          className="absolute right-4 top-1 h-12 w-fit hover:text-secondary-500 rtl:font-bodyFa"
          disabled={isLoading}
        >
          {text.contact.newsletter.button}
          <span className="hidden sm:inline text-secondary-500"> &rarr;</span>
        </button>
      )}
      <p className={`text-red-500 text-sm mt-2 h-4 rtl:font-bodyFa`}>
        {emailError}
      </p>
    </form>
  );
}

export default EmailSubscriptionForm;
