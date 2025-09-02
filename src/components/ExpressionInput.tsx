import { forwardRef } from "react";

type ExpressionInputProps = {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  isEditing: boolean;
};

const ExpressionInput = forwardRef<HTMLInputElement, ExpressionInputProps>(
  ({ value, onChange, onFocus, isEditing }, ref) => {
    return (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        ref={ref}
        className={`w-full rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 px-4 outline-none focus:ring-2 focus:ring-slate-300 focus:border-slate-300 transition-all duration-300 font-mono ${
          isEditing ? "py-4 text-lg" : "py-2 text-base"
        }`}
        placeholder="Enter expression"
      />
    );
  }
);

export default ExpressionInput;


