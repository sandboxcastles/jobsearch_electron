import CopyableTextDisplay from './components/CopyableTextDisplay';
import CoverLetterGeneratorDisplay from './components/CoverLetterGeneratorDisplay';

function App() {
  return (
    <>
      <main className="flex gap-4 w-full max-lg:flex-col">
        <section className="flex flex-col flex-3 gap-8 max-lg:gap-4">
          <CoverLetterGeneratorDisplay />
        </section>
        <aside className="flex flex-2 flex-col gap-2">
          <CopyableTextDisplay />
        </aside>
      </main>
    </>
  )
}

export default App;
