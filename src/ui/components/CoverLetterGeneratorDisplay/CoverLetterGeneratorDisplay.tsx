import { useState } from "react";
import { useAvailableTokens } from "../../hooks/useTokens";
// import { AvailableTokensServiceMock } from "../../services/available-tokens-mock.service";
import CommonText from "../CommonText";

function CoverLetterGeneratorDisplay() {
    // const availableTokenService = new AvailableTokensServiceMock();
    const [coverLetter, setCoverLetter] = useState('');
    const [availableTokens, setAvailableTokens] = useAvailableTokens();

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

    // function insertToken(): Promise<AvailableToken | null> {
    //   const newToken: CreateAvailableToken = { label: newLabel, token: newValue };
    //   return availableTokenService.createAvailableToken(newToken).then(res => {
    //     if (res) {
    //       setAvailableTokens([...availableTokens, res]);
    //     }
    //     return res;
    //   });
    // }
    return (
        <>
        <h1>Cover Letter Generator</h1>
        <section className="flex flex-col gap-4">
          {availableTokens.map((infoInput, i) =>
            <CommonText
              key={`infoInput_${i}`}
              label={infoInput.label}
              placeholder={infoInput.placeholder || ''}
              value={infoInput.value || ''}
              onChange={text => updateJobInfoInput(infoInput.id, text)}
            />
          )}
        </section>

        <section className="w-full">
          <h2>Cover Letter</h2>
          <textarea className="w-full h-400 resize-none" onChange={(e) => updateCoverLetter(e.target.value)} value={coverLetter}></textarea>
        </section>
        </>
    );
}

export default CoverLetterGeneratorDisplay;