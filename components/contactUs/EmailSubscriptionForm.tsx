import { useState } from "react";
import { useParams } from "next/navigation";
import { en, persian } from "utils/translations";
import Loading from "components/UI/loading";

function EmailSubscriptionForm() {
  const params = useParams();
  const locale = params?.locale as string || "en-US";
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
      <div className="flex flex-col items-start justify-center col-span-2 rtl:font-bodyFa animate-fadeIn">
        <span className="text-lg font-medium text-green-600 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          {text.contact.newsletter.subscribe_success}
        </span>
      </div>
    );
  }

  return (
    <form className="relative w-full max-w-md" onSubmit={handleEmailSubmit}>
      <div className="relative flex flex-col sm:block gap-2">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="your@email.com"
          value={email}
          onChange={handleEmailChange}
          className="w-full h-14 pl-6 rounded-full border border-gray-200 bg-gray-50 text-primary-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-secondary-500/20 focus:border-secondary-500 transition-all shadow-sm font-body text-sm rtl:text-right rtl:dir-rtl rtl:pr-6 sm:pr-36 rtl:sm:pl-36"
          required
          disabled={isLoading}
        />
        
        <div className={`sm:absolute sm:top-1.5 sm:bottom-1.5 ${locale === 'persian' ? 'sm:left-1.5' : 'sm:right-1.5'}`}>
            {isLoading ? (
               <div className="h-14 sm:h-full px-6 flex items-center justify-center">
                   <Loading className="w-5 h-5 text-secondary-500" />
               </div>
            ) : (
                <button
                type="submit"
                className="w-full sm:w-auto h-14 sm:h-full bg-secondary-500 text-white rounded-full px-6 text-sm font-bold hover:bg-secondary-600 transition-colors shadow-md hover:shadow-lg active:scale-95 rtl:font-bodyFa"
                disabled={isLoading}
                >
                {text.contact.newsletter.button}
                </button>
            )}
        </div>
      </div>
      
      {emailError && (
        <p className="text-red-500 text-sm mt-3 ml-2 rtl:mr-2 rtl:font-bodyFa animate-fadeIn">
            {emailError}
        </p>
      )}
    </form>
  );
}

export default EmailSubscriptionForm;
