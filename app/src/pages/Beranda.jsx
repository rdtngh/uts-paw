import { Link } from 'react-router-dom'
import mahasiswa from '../../mahasiswa.json'
import PesanStatus from '../components/PesanStatus.jsx'
import useKoleksi from '../hooks/useKoleksi.js'

export default function Beranda() {
  const { items, loading, error } = useKoleksi()
  const jumlahKategori = new Set(items.map((item) => item.kategori)).size

  return (
    <>
      <h1>{mahasiswa.tema}</h1>
      <p>
        {mahasiswa.nama} ({mahasiswa.nim})
      </p>
      {loading || error ? (
        <PesanStatus loading={loading} error={error} />
      ) : (
        <p>
          Terdapat {items.length} destinasi wisata dalam {jumlahKategori} kategori.
        </p>
      )}
      <Link to="/koleksi">Lihat semua destinasi</Link>
    </>
  )
}
