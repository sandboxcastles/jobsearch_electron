import { useState } from "react";
import { useCopyableText } from "../../hooks/useTokens";
import CommonCopyInput from "../CommonCopyInput";
import CommonText from "../CommonText";
import { CopyableTextService } from "../../services/copyable-text.service";

function CopyableTextDisplay() {
    const [copyableTextEntries, setCopyableText] = useCopyableText();
    const [newLabel, setNewLabel] = useState('');
    const [newValue, setNewValue] = useState('');

    function addCopyableText(): Promise<CopyableText | null> {
        const copyableTextService = new CopyableTextService();
        const newToken: CreateCopyableText = { label: newLabel, value: newValue };
        return copyableTextService.create(newToken).then(res => {
        if (res) {
            setNewLabel('');
            setNewValue('');
            setCopyableText([...copyableTextEntries, res]);
        }
        return res;
        });
    }

    function updateTextEntries(id: string, newText: string): void {
      const inputIndex = copyableTextEntries.findIndex(v => v.id === id);
      if (inputIndex > -1) {
        const existingInput = copyableTextEntries[inputIndex];
        if (existingInput.value !== newText) {
          const copyableTextEntriesCopy = [...copyableTextEntries];
          copyableTextEntriesCopy[inputIndex] = { ...existingInput, value: newText };
          setCopyableText(copyableTextEntriesCopy);
        }
      }
    }

    return (
        <>
            {copyableTextEntries.map((copyableText) =>
                <CommonCopyInput
                    key={copyableText.id}
                    label={copyableText.label}
                    value={copyableText.value}
                    onChange={(newValue) => updateTextEntries(copyableText.id, newValue)}
                />
            )}
            <hr />
            <CommonText label='Label' placeholder='' value={newLabel} onChange={(text) => setNewLabel(text)} />
            <CommonText label='Value' placeholder='' value={newValue} onChange={(text) => setNewValue(text)} />
            <button className="self-start" onClick={() => addCopyableText()}>Add</button>
        </>
    );
}

export default CopyableTextDisplay;