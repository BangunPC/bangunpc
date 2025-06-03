// Create a Providers component to wrap your application with all the components requiring 'use client', such as next-nprogress-bar or your different contexts...
"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import React, { useEffect, useState } from "react";

export default function ProgressBarProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {children}
      {mounted && (
        <ProgressBar
          height="2px"
          color="rgb(21 54 252)"
          options={{ showSpinner: false }}
          shallowRouting
        />
      )}
    </>
  );
}
