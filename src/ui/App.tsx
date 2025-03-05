// import { useEffect } from 'react'
import { useState } from 'react';
import CommonCopyInput from './components/CommonCopyInput/CommonCopyInput';
import CommonText from './components/CommonText';
// import TitleBar from './components/TitleBar/TitleBar';

function App() {
  const [coverLetter, setCoverLetter] = useState('');
  const [newLabel, setNewLabel] = useState('');
  const [newValue, setNewValue] = useState('');

  function addNewLabel(): void {
    console.log('new label not implemented...');
  }

  function updateNewLabel(text:string): void {
    setNewLabel(text);
  }

  function updateNewValue(text:string): void {
    setNewValue(text);
  }

  function updateCoverLetter(text: string): void {
    setCoverLetter(text);
  }

  const jobInfoInputs = [
    { label: 'Company Name', value: '', placeholder: 'Company Name...' },
    { label: 'Job Title', value: '', placeholder: 'Senior Front End Engineer' },
    { label: 'Experience In?', value: '', placeholder: 'frontend web development' },
    { label: 'Job-Listing Location', value: '', placeholder: 'I found on LinkedIn...' },
    { label: 'Job-Specific Qualifications', value: '', placeholder: 'comma-separated' },
  ];
  const links = [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/nicklandkamer' },
    { label: 'Github', url: 'https://github.com/sandboxcastles' },
    { label: 'Website', url: 'https://www.nicklandkamer.com' },
  ];
  
  // useEffect(() => {
  //   const unsub = window.electron.subscribeStatistics(stats => console.log(stats));
  //   return unsub;
  // }, []);

  return (
    <>
      {/* <TitleBar /> */}
      <main className="flex gap-4 w-full max-lg:flex-col">
        <section className="flex flex-col flex-3 gap-8 max-lg:gap-4">
          <h1>Job Search Helper</h1>
          <section className="flex flex-col gap-4">
            {jobInfoInputs.map((infoInput, i) => <CommonText key={`infoInput_${i}`} label={infoInput.label} placeholder={infoInput.placeholder} value={infoInput.value} />)}
          </section>

          <section className="w-full">
            <h2>Cover Letter</h2>
            <textarea className="w-full h-400 resize-none" onChange={(e) => updateCoverLetter(e.target.value)} value={coverLetter}></textarea>
          </section>
        </section>
        <aside className="flex flex-2 flex-col gap-2">
          {links.map((link, i) => <CommonCopyInput key={`link_${i}`} label={link.label} value={link.url} />)}
          <hr />
          <CommonText label='Label' placeholder='' value={newLabel} onChange={(text) => updateNewLabel(text)} />
          <CommonText label='Value' placeholder='' value={newValue} onChange={(text) => updateNewValue(text)} />
          <button className="self-start" onClick={() => addNewLabel()}>Add</button>
        </aside>
      </main>
    </>
  )
}

export default App;
