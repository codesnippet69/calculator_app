type ResultDisplayProps = {
  value: string;
};

export default function ResultDisplay({ value }: ResultDisplayProps) {
  return (
    <input
      type="text"
      value={value}
      placeholder="Result"
      readOnly
      className={`w-full rounded-xl border border-slate-200 bg-slate-100 text-slate-800 placeholder-slate-400 px-4 outline-none font-mono transition-all duration-300 ${
        value ? "py-4 text-lg" : "py-2 text-base"
      }`}
    />
  );
}


