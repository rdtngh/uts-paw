import useKoleksi from '../hooks/useKoleksi.js'

export default function Koleksi() {
  const { items, loading, error } = useKoleksi()

  if (loading) return <p>Memuat data destinasi...</p>
  if (error) return <p role="alert">Gagal memuat data: {error}</p>

  return (
    <>
      <h1>Koleksi Destinasi</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.judul}</li>
        ))}
      </ul>
    </>
  )
}
