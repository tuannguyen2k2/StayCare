"use client";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
const NprogressProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProgressBar
        height="2px"
        color="#F7961D"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};

export default NprogressProvider;
