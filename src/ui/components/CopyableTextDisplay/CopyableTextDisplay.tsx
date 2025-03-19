import { useState } from "react";
import { useCopyableText } from "../../hooks/useTokens";
import CommonCopyInput from "../CommonCopyInput";
import CommonText from "../CommonText";
import { CopyableTextService } from "../../services/copyable-text.service";
import Modal from "../Modal";
import VerifyModal from "../VerifyModal/VerifyModal";

function CopyableTextDisplay() {
    const [copyableTextEntries, setCopyableText] = useCopyableText();
    const [newLabel, setNewLabel] = useState('');
    const [newValue, setNewValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
    const [textIdToDelete, setTextIdToDelete] = useState<string | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        clearNewEntry();
        setIsModalOpen(false);
    };

    function addCopyableText(): Promise<CopyableText | null> {
        const copyableTextService = new CopyableTextService();
        const newToken: CreateCopyableText = { label: newLabel, value: newValue };
        return copyableTextService.create(newToken).then(res => {
            if (res) {
                clearNewEntry();
                setCopyableText([...copyableTextEntries, res]);
                closeModal();
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

    async function deleteCopyableText(id: string): Promise<void> {
        const copyableTextService = new CopyableTextService();
        const res = await copyableTextService.delete(id);
        if (res) {
            setCopyableText(copyableTextEntries.filter(t => t.id !== id));
        }
    }

    function openConfirmDelete(id: string): void {
        setTextIdToDelete(id);
        setIsVerifyModalOpen(true);
    }

    async function continueDelete(isVerified: boolean): Promise<void> {
        if (isVerified && textIdToDelete) {
            await deleteCopyableText(textIdToDelete);
        }
        setTextIdToDelete(null);
        setIsVerifyModalOpen(false);
    }

    function clearNewEntry(): void {
        setNewLabel('');
        setNewValue('');
    }

    return (
        <>
            <span className="flex justify-between items-center">
                <h3>Copyable Text</h3>
                <button className="flex self-end items-center justify-center bg-teal-700 text-slate-900 hover:bg-teal-900 hover:text-slate-500" onClick={openModal}>+</button>
            </span>
            {copyableTextEntries.length > 0 ? <hr/> : ''}
            {
                copyableTextEntries.length
                    ? copyableTextEntries.map((copyableText) =>
                        <CommonCopyInput
                            key={copyableText.id}
                            label={copyableText.label}
                            value={copyableText.value}
                            onChange={(newValue) => updateTextEntries(copyableText.id, newValue)}
                        >
                            <button onClick={() => openConfirmDelete(copyableText.id)}>Delete</button>
                        </CommonCopyInput>
                    )
                    : <p className="flex justify-center">No copyable text entries</p>
            }

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <span className="flex flex-col gap-4">
                        <h3 className="text-xl font-semibold">Add Copyable Text</h3>
                        <span className="flex flex-col gap-2">
                            <CommonText label='Label' placeholder='Label...' value={newLabel} onChange={(text) => setNewLabel(text)} />
                            <CommonText label='Value' placeholder='https://example.com' value={newValue} onChange={(text) => setNewValue(text)} />
                        </span>
                        <span className="flex flex-row justify-between">
                            <button className="self-end bg-violet-700" onClick={closeModal}>Cancel</button>
                            <button className="self-start bg-teal-700 hover:bg-teal-800 disabled:bg-gray-400 disabled:text-gray-500" disabled={!newLabel || !newValue} onClick={() => addCopyableText()}>Add</button>
                        </span>
                    </span>
            </Modal>
            <VerifyModal isOpen={isVerifyModalOpen} verifyHeader="Delete this Copyable Text?" verifyDetails="This will permanently delete this entry." onVerify={(isVerified) => continueDelete(isVerified)} />
        </>
    );
}

export default CopyableTextDisplay;