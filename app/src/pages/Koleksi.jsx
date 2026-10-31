import { useState } from 'react'
import KartuDestinasi from '../components/KartuDestinasi.jsx'
import KotakPencarian from '../components/KotakPencarian.jsx'
import PilihKategori from '../components/PilihKategori.jsx'
import useKoleksi from '../hooks/useKoleksi.js'
import './Koleksi.css'

export default function Koleksi() {
  const { items, loading, error } = useKoleksi()
  const [cari, setCari] = useState('')
  const [kategori, setKategori] = useState('Semua')

  if (loading) return <p>Memuat data destinasi...</p>
  if (error) return <p role="alert">Gagal memuat data: {error}</p>

  const daftarKategori = [...new Set(items.map((item) => item.kategori))]
  const kataKunci = cari.trim().toLowerCase()
  const hasil = items.filter(
    (item) =>
      item.judul.toLowerCase().includes(kataKunci) && (kategori === 'Semua' || item.kategori === kategori),
  )

  return (
    <>
      <h1>Koleksi Destinasi</h1>
      <div className="alat-koleksi">
        <KotakPencarian nilai={cari} onUbah={setCari} />
        <PilihKategori daftar={daftarKategori} nilai={kategori} onUbah={setKategori} />
      </div>
      {hasil.length === 0 ? (
        <p>Tidak ada destinasi yang cocok dengan pencarian dan filter.</p>
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
