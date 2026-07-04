// components/Spinner.jsx
// Shared loading indicator. `fullScreen` covers the whole viewport (used
// for page-level fetches); otherwise it renders inline within a section.

const Spinner = ({ fullScreen = false, label = "Loading..." }) => {
  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <span className="h-10 w-10 rounded-full border-4 border-ink/20 border-t-ink animate-spin" />
      <p className="text-sm text-charcoal/50">{label}</p>
    </div>
  );

  if (fullScreen) {
    return <div className="min-h-screen bg-paper flex items-center justify-center">{spinner}</div>;
  }

  return spinner;
};

export default Spinner;
