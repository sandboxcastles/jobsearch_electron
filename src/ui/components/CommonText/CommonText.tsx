import { JSX } from "react";
export type CommonTextProps = {
    label: string;
    value?: string;
    placeholder?: string;
    onChange?: (text: string) => void;
    children?: string | JSX.Element | JSX.Element[]
};

function CommonText({ label, value, placeholder, onChange, children }: CommonTextProps) {
    function handleInputValueChange(input: HTMLInputElement): void {
        if (input.value !== value) {
            onChange?.(input.value);
        }
    }
    return (
        <>
            <span className="flex items-center gap-4 font-medium w-full max-sm:flex-col max-sm:items-start max-sm:gap-2">
                <label className="flex-1 pl-2 max-sm:flex-initial" htmlFor="value">{label}</label>
                <input className="flex-3 pl-2 max-sm:flex-initial max-sm:w-full" placeholder={placeholder || ''} value={value} onChange={(event) => handleInputValueChange(event.target)} />
                {children || ''}
            </span>
        </>
    );
}

export default CommonText;