import { useState } from "react";
import { useAvailableTokens } from "../../hooks/useTokens";
// import { AvailableTokensServiceMock } from "../../services/available-tokens-mock.service";
import CommonText from "../CommonText";
import Modal from "../Modal";
import VerifyModal from "../VerifyModal/VerifyModal";
import { AvailableTokensService } from "../../services/available-tokens.service";

function CoverLetterGeneratorDisplay() {
    const availableTokenService = new AvailableTokensService();
    const [coverLetter, setCoverLetter] = useState('');
    const [newToken, setNewToken] = useState('');
    const [newTokenLabel, setNewTokenLabel] = useState('');
    const [isCreateTokenModalOpen, setIsCreateTokenModalOpen] = useState(false);
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
    const [availableTokens, setAvailableTokens] = useAvailableTokens();
    const [tokenIdToDelete, setTokenIdToDelete] = useState<string | null>(null);

    const openCreateTokenModal = () => setIsCreateTokenModalOpen(true);
    const closeCreateTokenModal = () => {
        clearNewEntry();
        console.log('setting false...');
        setIsCreateTokenModalOpen(false);
    };

    function updateCoverLetter(text: string): void {
        setCoverLetter(text);
    }
    function updateJobInfoInput(id: string, newText: string): void {
      const inputIndex = availableTokens.findIndex(v => v.id === id);
      if (inputIndex > -1) {
        const existingInput = availableTokens[inputIndex];
        if (existingInput.value !== newText) {
          const jobInfoInputsCopy = [...availableTokens];
          jobInfoInputsCopy[inputIndex] = { ...existingInput, value: newText };
          setAvailableTokens(jobInfoInputsCopy);
        }
      }
    }

    function insertToken(): Promise<AvailableToken | null> {
      const token: CreateAvailableToken = { label: newTokenLabel, token: newToken };
      return availableTokenService.createAvailableToken(token).then(res => {
        if (res) {
        clearNewEntry();
          setAvailableTokens([...availableTokens, res]);
        }
        closeCreateTokenModal();
        return res;
      });
    }
    
    async function deleteCopyableText(id: string): Promise<void> {
        const res = await availableTokenService.delete(id);
        if (res) {
            setAvailableTokens(availableTokens.filter(t => t.id !== id));
        }
    }

    function openConfirmDelete(id: string): void {
        setTokenIdToDelete(id);
        setIsVerifyModalOpen(true);
    }

    function clearNewEntry(): void {
        setNewToken('');
        setNewTokenLabel('');
    }

    async function continueDelete(isVerified: boolean): Promise<void> {
        if (isVerified && tokenIdToDelete) {
            await deleteCopyableText(tokenIdToDelete);
        }
        setTokenIdToDelete(null);
        setIsVerifyModalOpen(false);
    }

    return (
        <>
        <span className="flex justify-between items-center">
            <h1>Cover Letter Generator</h1>
            <button className="flex self-end items-center justify-center bg-teal-700 text-slate-900 hover:bg-teal-900 hover:text-slate-500" onClick={openCreateTokenModal}>+</button>
        </span>
        <section className="flex flex-col gap-4">
          {availableTokens.map((infoInput, i) =>
            <CommonText
              key={`infoInput_${i}`}
              label={infoInput.label}
              placeholder={infoInput.placeholder || ''}
              value={infoInput.value || ''}
              onChange={text => updateJobInfoInput(infoInput.id, text)}
            >
                <button onClick={() => openConfirmDelete(infoInput.id)}>Delete</button>
            </CommonText>
          )}
        </section>

        <section className="w-full">
          <h2>Cover Letter</h2>
          <textarea className="w-full h-400 resize-none" onChange={(e) => updateCoverLetter(e.target.value)} value={coverLetter}></textarea>
        </section>

        <Modal isOpen={isCreateTokenModalOpen} onClose={closeCreateTokenModal}>
                <span className="flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">Add Token</h3>
                    <span className="flex flex-col gap-2">
                        <CommonText label='Label' placeholder='Label (e.g. Company Name)' value={newTokenLabel} onChange={(text) => setNewTokenLabel(text)} />
                        <CommonText label='Token' placeholder='Token (e.g. companyName)' value={newToken} onChange={(text) => setNewToken(text)} />
                    </span>
                    <span className="flex flex-row justify-between">
                        <button className="self-end bg-violet-700" onClick={closeCreateTokenModal}>Cancel</button>
                        <button className="self-start bg-teal-700 hover:bg-teal-800 disabled:bg-gray-400 disabled:text-gray-500" disabled={!newTokenLabel || !newToken} onClick={() => insertToken()}>Add</button>
                    </span>
                </span>
        </Modal>
        <VerifyModal
            isOpen={isVerifyModalOpen}
            verifyHeader="Delete this Copyable Text?"
            verifyDetails="This will permanently delete this entry."
            onVerify={(isVerified) => continueDelete(isVerified)}
        />
        </>
    );
}

export default CoverLetterGeneratorDisplay;