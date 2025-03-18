import { useState } from "react";
import CommonText from "../CommonText/CommonText";
type CommonCopyInputProps = {
    label: string;
    value: string;
    onChange?: (text: string) => void;
};

function CommonCopyInput({ label, value, onChange }: CommonCopyInputProps) {
    const [inputValue, setInputValue] = useState(value);
    function handleInputValueChange(newValue: string): void {
        if (newValue !== value) {
            setInputValue(newValue);
            onChange?.(newValue);
        }
    }
    async function copyTextToClipboard(): Promise<void> {
        await navigator.clipboard.writeText(inputValue);
        console.log('Copied!')
    }
    return (
        <>
            <span className="flex items-center gap-4 font-medium">
                <CommonText
                    label={label}
                    value={value}
                    onChange={(newValue) => handleInputValueChange(newValue)}
                >
                <button onClick={() => copyTextToClipboard()}>Copy</button>
                </CommonText>
            </span>
        </>
    );
}

export default CommonCopyInput;