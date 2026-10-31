import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import './Tambah.css'

const KATEGORI = ['Pantai', 'Alam', 'Budaya', 'Kuliner']

const KABUPATEN = [
  'Bandar Lampung',
  'Metro',
  'Lampung Barat',
  'Lampung Selatan',
  'Lampung Tengah',
  'Lampung Timur',
  'Lampung Utara',
  'Mesuji',
  'Pesawaran',
  'Pesisir Barat',
  'Pringsewu',
  'Tanggamus',
  'Tulang Bawang',
  'Tulang Bawang Barat',
  'Way Kanan',
]

const AWAL = {
  judul: '',
  kategori: 'Pantai',
  kabupaten: 'Bandar Lampung',
  hargaTiket: '0',
  jamBuka: '08.00-17.00',
}

export default function Tambah() {
  const { tambah } = useKoleksi()
  const navigate = useNavigate()
  const [form, setForm] = useState(AWAL)
  const [galat, setGalat] = useState('')

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const simpan = (e) => {
    e.preventDefault()
    if (form.judul.trim().length < 3) {
      setGalat('Judul wajib diisi, minimal 3 karakter.')
      return
    }
    tambah({
      ...form,
      judul: form.judul.trim(),
      jamBuka: form.jamBuka.trim(),
      hargaTiket: Number(form.hargaTiket) || 0,
    })
    navigate('/koleksi')
  }

  return (
    <form className="formulir" onSubmit={simpan} noValidate>
      <h1>Tambah Destinasi</h1>

      <label htmlFor="judul">Judul</label>
      <input
        id="judul"
        name="judul"
        value={form.judul}
        onChange={ubah}
        placeholder="Nama destinasi"
        aria-invalid={galat ? 'true' : 'false'}
      />
      {galat && (
        <p role="alert" className="galat">
          {galat}
        </p>
      )}

      <label htmlFor="kategori">Kategori</label>
      <select id="kategori" name="kategori" value={form.kategori} onChange={ubah}>
        {KATEGORI.map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>

      <label htmlFor="kabupaten">Kabupaten/Kota</label>
      <select id="kabupaten" name="kabupaten" value={form.kabupaten} onChange={ubah}>
        {KABUPATEN.map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>

      <label htmlFor="hargaTiket">Harga Tiket (Rp)</label>
      <input id="hargaTiket" name="hargaTiket" type="number" min="0" step="1000" value={form.hargaTiket} onChange={ubah} />

      <label htmlFor="jamBuka">Jam Buka</label>
      <input id="jamBuka" name="jamBuka" value={form.jamBuka} onChange={ubah} placeholder="08.00-17.00" />

      <button type="submit">Simpan</button>
    </form>
  )
}
