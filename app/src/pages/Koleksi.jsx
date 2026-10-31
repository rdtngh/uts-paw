import KartuDestinasi from '../components/KartuDestinasi.jsx'
import useKoleksi from '../hooks/useKoleksi.js'

export default function Koleksi() {
  const { items, loading, error } = useKoleksi()

  if (loading) return <p>Memuat data destinasi...</p>
  if (error) return <p role="alert">Gagal memuat data: {error}</p>

  return (
    <>
      <h1>Koleksi Destinasi</h1>
      <div className="daftar-kartu">
        {items.map((item) => (
          <KartuDestinasi key={item.id} item={item} />
        ))}
      </div>
    </>
  )
}
