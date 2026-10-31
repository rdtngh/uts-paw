import { useEffect, useState } from 'react'

// Seperti useState, tetapi nilainya ikut tersimpan di localStorage dengan kunci tertentu.
export default function useLocalStorage(kunci, nilaiAwal) {
  // Fungsi di dalam useState hanya dijalankan sekali saat komponen pertama dirender.
  const [nilai, setNilai] = useState(() => {
    try {
      const tersimpan = localStorage.getItem(kunci)
      return tersimpan !== null ? JSON.parse(tersimpan) : nilaiAwal
    } catch {
      // Isi localStorage rusak (bukan JSON) atau tidak bisa diakses: pakai nilai awal.
      return nilaiAwal
    }
  })

  // Tulis ulang ke localStorage setiap kali nilai berubah.
  useEffect(() => {
    try {
      if (nilai === null) localStorage.removeItem(kunci)
      else localStorage.setItem(kunci, JSON.stringify(nilai))
    } catch {
      // Penyimpanan penuh atau diblokir browser: state di layar tetap jalan.
    }
  }, [kunci, nilai])

  return [nilai, setNilai]
}
