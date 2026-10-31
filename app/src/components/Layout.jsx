import { NavLink, Outlet } from 'react-router-dom'

const MENU = [
  { ke: '/', label: 'Beranda' },
  { ke: '/koleksi', label: 'Koleksi' },
  { ke: '/tambah', label: 'Tambah' },
  { ke: '/statistik', label: 'Statistik' },
  { ke: '/tentang', label: 'Tentang' },
]

export default function Layout() {
  return (
    <>
      <header>
        <strong>Wisata Lampung</strong>
        <nav>
          {MENU.map(({ ke, label }) => (
            // end pada "/" agar menu Beranda tidak ikut aktif di semua halaman.
            <NavLink key={ke} to={ke} end={ke === '/'}>
              {label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}
