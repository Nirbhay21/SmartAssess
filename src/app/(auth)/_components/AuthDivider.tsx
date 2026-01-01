interface AuthDividerProps {
  label: string;
}

const AuthDivider = ({ label }: AuthDividerProps) => {
  return (
    <div className="relative my-6 h-px bg-black/35 dark:bg-white/35">
      <span className="bg-card font-poppins text-muted-foreground xsm:text-sm absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 px-2 text-xs font-semibold capitalize">
        {label}
      </span>
    </div>
  );
};

export default AuthDivider;
