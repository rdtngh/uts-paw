import { useState } from 'react'
import KartuDestinasi from '../components/KartuDestinasi.jsx'
import KotakPencarian from '../components/KotakPencarian.jsx'
import useKoleksi from '../hooks/useKoleksi.js'

export default function Koleksi() {
  const { items, loading, error } = useKoleksi()
  const [cari, setCari] = useState('')

  if (loading) return <p>Memuat data destinasi...</p>
  if (error) return <p role="alert">Gagal memuat data: {error}</p>

  const kataKunci = cari.trim().toLowerCase()
  const hasil = items.filter((item) => item.judul.toLowerCase().includes(kataKunci))

  return (
    <>
      <h1>Koleksi Destinasi</h1>
      <KotakPencarian nilai={cari} onUbah={setCari} />
      {hasil.length === 0 ? (
        <p>Tidak ada destinasi yang cocok dengan "{cari}".</p>
      ) : (
        <div className="daftar-kartu">
          {hasil.map((item) => (
            <KartuDestinasi key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  )
}
