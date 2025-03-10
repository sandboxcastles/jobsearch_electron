import { JSX, useState } from "react";
export type CommonTextProps = {
    label: string;
    value: string;
    placeholder?: string;
    onChange?: (text: string) => void;
    children?: string | JSX.Element | JSX.Element[]
};

function CommonText({ label, value, placeholder, onChange, children }: CommonTextProps) {
    const [inputValue, setInputValue] = useState(value);
    function handleInputValueChange(input: HTMLInputElement): void {
        setInputValue(input.value);
        onChange?.(inputValue);
    }
    return (
        <>
            <span className="flex items-center gap-4 font-medium w-full max-lg:flex-col max-lg:items-start max-lg:gap-1">
                <label className="flex-1 pl-2 max-lg:flex-initial" htmlFor="value">{label}</label>
                <input className="flex-3 pl-2 max-lg:flex-initial max-lg:w-full" placeholder={placeholder || ''} value={inputValue} onChange={(event) => handleInputValueChange(event.target)} />
                {children}
            </span>
        </>
    );
}

export default CommonText;