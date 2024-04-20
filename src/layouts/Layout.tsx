import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <header className="bg-slate-800">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white py-8">
            Administrador de Productos
          </h1>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-10 p-10 bg-white shadow">
        <Outlet />
      </main>
    </>
  );
}
