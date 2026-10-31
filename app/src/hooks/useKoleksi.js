import { useContext } from 'react'
import { KoleksiContext } from '../context/koleksiContext.js'

// Jalan pintas untuk membaca isi KoleksiContext: items, loading, error, tambah, dan hapus.
export default function useKoleksi() {
  const konteks = useContext(KoleksiContext)
  // Nilai awal context adalah null, jadi null berarti komponen ini berada di luar Provider.
  if (!konteks) throw new Error('useKoleksi harus dipakai di dalam <KoleksiProvider>')
  return konteks
}
