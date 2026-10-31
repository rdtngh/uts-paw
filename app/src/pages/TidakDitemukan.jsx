import { Link } from 'react-router-dom'
import './TidakDitemukan.css'

export default function TidakDitemukan() {
  return (
    <section className="halaman-404">
      <h1>404</h1>
      <p>Halaman yang kamu cari tidak ada. Mungkin alamatnya salah ketik atau sudah dipindahkan.</p>
      <Link to="/">Kembali ke beranda</Link>
    </section>
  )
}
