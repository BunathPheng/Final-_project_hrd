'use client';
import ProgressBar from "./progress-bar";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProgressBar />
      {children}
    </>
  );
};

export default Providers;