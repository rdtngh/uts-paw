import { useEffect, useState } from 'react'
import { KoleksiContext } from './koleksiContext.js'
import useLocalStorage from '../hooks/useLocalStorage.js'

export function KoleksiProvider({ children }) {
  // null berarti localStorage masih kosong dan data perlu diambil dari koleksi.json.
  const [items, setItems] = useLocalStorage('uts-paw-koleksi', null)
  const [loading, setLoading] = useState(items === null)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Data sudah ada di localStorage: tidak perlu fetch lagi.
    if (items !== null) return

    async function muat() {
      try {
        // BASE_URL wajib dipakai agar path tetap benar saat aplikasi di-deploy di subfolder GitHub Pages.
        const res = await fetch(`${import.meta.env.BASE_URL}data/koleksi.json`)
        if (!res.ok) throw new Error(`Gagal memuat data (status ${res.status})`)
        setItems(await res.json())
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    muat()
  }, [items, setItems])

  // id dibuat dari waktu sekarang supaya unik dan berupa teks seperti id di koleksi.json.
  const tambah = (item) => setItems((lama) => [...(lama ?? []), { ...item, id: String(Date.now()) }])
  const hapus = (id) => setItems((lama) => (lama ?? []).filter((item) => item.id !== id))

  return (
    <KoleksiContext.Provider value={{ items: items ?? [], loading, error, tambah, hapus }}>
      {children}
    </KoleksiContext.Provider>
  )
}
