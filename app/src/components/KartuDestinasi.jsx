import { Link } from 'react-router-dom'
import './KartuDestinasi.css'

export default function KartuDestinasi({ item }) {
  const { id, judul, kategori, kabupaten } = item

  return (
    <article className="kartu">
      <h3>
        <Link to={`/koleksi/${id}`}>{judul}</Link>
      </h3>
      <p>
        <span className="lencana">{kategori}</span> · {kabupaten}
      </p>
    </article>
  )
}
