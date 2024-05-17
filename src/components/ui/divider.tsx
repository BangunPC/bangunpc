import React from "react";

const Divider = ({
  vertical = false,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { vertical?: boolean }) => {
  return (
    <div
      className={`${vertical ? "h-full w-px" : "h-px w-full"} bg-slate-200 dark:bg-slate-800 ${className}`}
      {...props}
    />
  );
};

export default Divider;
