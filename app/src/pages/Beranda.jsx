import mahasiswa from '../../mahasiswa.json'
import useKoleksi from '../hooks/useKoleksi.js'

export default function Beranda() {
  const { items, loading } = useKoleksi()

  return (
    <>
      <h1>Destinasi Wisata Lampung</h1>
      <p>
        {mahasiswa.nama} ({mahasiswa.nim})
      </p>
      <p>{loading ? 'Memuat data...' : `Ada ${items.length} destinasi wisata di koleksi.`}</p>
    </>
  )
}
