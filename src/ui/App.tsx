import { Link, Outlet } from 'react-router-dom';
import CopyableTextDisplay from './components/CopyableTextDisplay';

function App() {
  return (
    <div className="flex flex-col gap-2">
      <nav className="flex gap-3 justify-start">
        <Link className="flex place-items-center h-10 px-4 cursor-pointer rounded-lg border border-solid border-transparent font-medium self-end bg-teal-700 text-slate-900 hover:bg-teal-900 hover:text-slate-500" to="/">Home</Link>
        <Link className="flex place-items-center h-10 px-4 cursor-pointer rounded-lg border border-solid border-transparent font-medium self-end bg-teal-700 text-slate-900 hover:bg-teal-900 hover:text-slate-500" to="/token-settings">Settings</Link>
      </nav>
      <main className="flex gap-8 w-full max-lg:flex-col">
        <section className="flex flex-col flex-3 gap-8 max-lg:gap-4">
          <Outlet />
        </section>
        <aside className="flex flex-2 flex-col gap-2">
          <CopyableTextDisplay />
        </aside>
      </main>
    </div>
  )
}

export default App;
