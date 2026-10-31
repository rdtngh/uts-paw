import { useEffect, useState } from 'react'

export default function useLocalStorage(kunci, nilaiAwal) {
  const [nilai, setNilai] = useState(() => {
    try {
      const tersimpan = localStorage.getItem(kunci)
      return tersimpan !== null ? JSON.parse(tersimpan) : nilaiAwal
    } catch {
      return nilaiAwal
    }
  })

  useEffect(() => {
    try {
      if (nilai === null) localStorage.removeItem(kunci)
      else localStorage.setItem(kunci, JSON.stringify(nilai))
    } catch {
    }
  }, [kunci, nilai])

  return [nilai, setNilai]
}
