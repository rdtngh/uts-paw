import { Route, Routes } from 'react-router-dom'
import { KoleksiProvider } from './context/KoleksiProvider.jsx'
import Layout from './components/Layout.jsx'
import Beranda from './pages/Beranda.jsx'
import Koleksi from './pages/Koleksi.jsx'
import Detail from './pages/Detail.jsx'
import Tambah from './pages/Tambah.jsx'
import Statistik from './pages/Statistik.jsx'
import Tentang from './pages/Tentang.jsx'
import TidakDitemukan from './pages/TidakDitemukan.jsx'

// BrowserRouter ada di main.jsx, bukan di sini, agar uji otomatis bisa memakai MemoryRouter.
export default function App() {
  return (
    <KoleksiProvider>
      <Routes>
        {/* Rute induk tanpa path: semua halaman di dalamnya memakai Layout yang sama. */}
        <Route element={<Layout />}>
          <Route path="/" element={<Beranda />} />
          <Route path="/koleksi" element={<Koleksi />} />
          <Route path="/koleksi/:id" element={<Detail />} />
          <Route path="/tambah" element={<Tambah />} />
          <Route path="/statistik" element={<Statistik />} />
          <Route path="/tentang" element={<Tentang />} />
          <Route path="*" element={<TidakDitemukan />} />
        </Route>
      </Routes>
    </KoleksiProvider>
  )
}
