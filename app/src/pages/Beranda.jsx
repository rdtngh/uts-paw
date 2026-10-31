import { Link } from 'react-router-dom'
import mahasiswa from '../../mahasiswa.json'
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
      {loading ? (
        <p>Memuat data destinasi...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : (
        <p>
          Terdapat {items.length} destinasi wisata dalam {jumlahKategori} kategori.
        </p>
      )}
      <Link to="/koleksi">Lihat semua destinasi</Link>
    </>
  )
}
