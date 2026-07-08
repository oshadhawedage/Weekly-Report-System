function Button({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    fullWidth = false,
    className = "",
    ...props
}) {
    const baseClasses = "inline-flex items-center justify-center font-semibold rounded transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
        secondary: "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
        success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
        danger: "bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-500",
        ghost: "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400"
    };

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base"
    };

    return (
        <button
            type={type}
            className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`.trim()}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
