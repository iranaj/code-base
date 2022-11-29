import React from "react";
import { useRouter } from "next/router";
import { en, persian } from "utils/translations";

function useLocal() {
  const router = useRouter();
  const { locale } = router;
  const text = locale === "persian" ? persian : en;

  return [locale, router, text];
}

export default useLocal;
