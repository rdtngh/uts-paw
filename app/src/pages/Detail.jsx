import { Link, useParams } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import './Detail.css'

const formatHarga = (harga) => (Number(harga) === 0 ? 'Gratis' : `Rp${Number(harga).toLocaleString('id-ID')}`)

export default function Detail() {
  const { id } = useParams()
  const { items, loading, error } = useKoleksi()

  if (loading) return <p>Memuat data destinasi...</p>
  if (error) return <p role="alert">Gagal memuat data: {error}</p>

  const item = items.find((i) => String(i.id) === String(id))

  if (!item) {
    return (
      <section>
        <h1>Destinasi tidak ditemukan</h1>
        <p>Destinasi yang kamu cari tidak ada atau sudah dihapus.</p>
        <Link to="/koleksi">Kembali ke koleksi</Link>
      </section>
    )
  }

  return (
    <section>
      <h1>{item.judul}</h1>
      <dl className="rincian">
        <dt>Kategori</dt>
        <dd>{item.kategori}</dd>
        <dt>Kabupaten/Kota</dt>
        <dd>{item.kabupaten}</dd>
        <dt>Harga Tiket</dt>
        <dd>{formatHarga(item.hargaTiket)}</dd>
        <dt>Jam Buka</dt>
        <dd>{item.jamBuka}</dd>
      </dl>
      <Link to="/koleksi">Kembali ke koleksi</Link>
    </section>
  )
}
