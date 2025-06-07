import * as React from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, id, className }) => {
  return (
    <button
      type="button"
      id={id}
      role="switch"
      aria-checked={checked}
      tabIndex={0}
      className={
        `relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 ` +
        (checked ? "bg-sky-600" : "bg-zinc-700") +
        (className ? ` ${className}` : "")
      }
      onClick={() => onCheckedChange(!checked)}
      onKeyDown={e => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onCheckedChange(!checked);
        }
      }}
      aria-label="Toggle compatibility check"
    >
      <span
        className={
          `inline-block h-5 w-5 transform rounded-full bg-zinc-900 shadow transition-transform ` +
          (checked ? "translate-x-5" : "translate-x-1")
        }
      />
    </button>
  );
};

export default Switch; 