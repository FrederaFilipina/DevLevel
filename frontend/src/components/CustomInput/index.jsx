export const CustomInput = ({ type, label, id, value, setValue, placeholder= null, required = false, min = 0, labelClass = "", hasArrow = false, ...rest}) => {
    return (
        <fieldset className="flex flex-col gap-2 mb-2">
            {label && <label htmlFor={id} className={labelClass ? `${labelClass}` : "block text-sm font-medium mb-1"}>{label}</label>}
            <div className="relative group">
            {hasArrow && <span class="absolute left-4 top-1/2 -translate-y-1/2 font-code-md text-code-md text-primary-container/60">&gt;</span>}
            <input type={type} className="w-full bg-background border-b-2 border-outline/30 focus:border-primary-container text-on-surface font-code-md text-code-md pl-8 pr-4 py-3 outline-none transition-all placeholder:text-on-surface-variant/30"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                id={id}
                required
                minLength={min}
                {...rest}
                />
            </div>
        </fieldset>
    )
}
