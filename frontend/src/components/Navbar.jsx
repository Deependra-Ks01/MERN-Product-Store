import { NavLink } from 'react-router-dom';

const linkBase =
  'rounded-md px-3 py-2 text-sm font-medium transition-colors';

export default function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to="/" className="text-lg font-semibold text-slate-900">
          Product Store
        </NavLink>

        <nav className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`
            }
            end
          >
            Products
          </NavLink>
          <NavLink
            to="/products/new"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'}`
            }
          >
            Add Product
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

