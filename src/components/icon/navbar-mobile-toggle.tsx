import * as React from "react";
const NavbarMobileToggle = (
  props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>,
) => {
  return (
    <svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width={44} height={44} rx={8} className="fill-primary" />
      <path
        d="M32 18.52V13.98C32 12.57 31.36 12 29.77 12H25.73C24.14 12 23.5 12.57 23.5 13.98V18.51C23.5 19.93 24.14 20.49 25.73 20.49H29.77C31.36 20.5 32 19.93 32 18.52Z"
        fill="#F1F1F1"
      />
      <path
        d="M32 29.77V25.73C32 24.14 31.36 23.5 29.77 23.5H25.73C24.14 23.5 23.5 24.14 23.5 25.73V29.77C23.5 31.36 24.14 32 25.73 32H29.77C31.36 32 32 31.36 32 29.77Z"
        fill="#F1F1F1"
      />
      <path
        d="M20.5 18.52V13.98C20.5 12.57 19.86 12 18.27 12H14.23C12.64 12 12 12.57 12 13.98V18.51C12 19.93 12.64 20.49 14.23 20.49H18.27C19.86 20.5 20.5 19.93 20.5 18.52Z"
        fill="#F1F1F1"
      />
      <path
        d="M20.5 29.77V25.73C20.5 24.14 19.86 23.5 18.27 23.5H14.23C12.64 23.5 12 24.14 12 25.73V29.77C12 31.36 12.64 32 14.23 32H18.27C19.86 32 20.5 31.36 20.5 29.77Z"
        fill="#F1F1F1"
      />
    </svg>
  );
};
export default NavbarMobileToggle;
