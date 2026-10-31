import { createContext } from 'react'

// Wadah data koleksi yang bisa dibaca komponen mana pun di bawah KoleksiProvider.
// Dipisah dari Provider agar berkas komponen hanya mengekspor komponen.
export const KoleksiContext = createContext(null)
