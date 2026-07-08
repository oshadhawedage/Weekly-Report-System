import { forwardRef } from "react";

const Input = forwardRef(function Input(
    {
        type = "text",
        className = "",
        as = "input",
        children,
        ...props
    },
    ref
) {
    const baseClasses = "w-full rounded border border-slate-300 p-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

    if (as === "textarea") {
        return (
            <textarea
                ref={ref}
                className={`${baseClasses} ${className}`.trim()}
                {...props}
            />
        );
    }

    if (as === "select") {
        return (
            <select
                ref={ref}
                className={`${baseClasses} ${className}`.trim()}
                {...props}
            >
                {children}
            </select>
        );
    }

    return (
        <input
            ref={ref}
            type={type}
            className={`${baseClasses} ${className}`.trim()}
            {...props}
        />
    );
});

export default Input;
