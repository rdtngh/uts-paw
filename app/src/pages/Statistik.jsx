import PesanStatus from '../components/PesanStatus.jsx'
import useKoleksi from '../hooks/useKoleksi.js'
import './Statistik.css'

export default function Statistik() {
  const { items, loading, error } = useKoleksi()

  if (loading || error) return <PesanStatus loading={loading} error={error} />

  const perKategori = items.reduce((hitung, item) => {
    hitung[item.kategori] = (hitung[item.kategori] ?? 0) + 1
    return hitung
  }, {})
  const baris = Object.entries(perKategori)
  const total = items.length

  return (
    <>
      <h1>Statistik Destinasi</h1>
      <div className="bungkus-tabel">
        <table className="tabel-statistik">
          <thead>
            <tr>
              <th scope="col">Kategori</th>
              <th scope="col">Jumlah Destinasi</th>
              <th scope="col">Persentase</th>
            </tr>
          </thead>
          <tbody>
            {baris.map(([kategori, jumlah]) => (
              <tr key={kategori}>
                <td>{kategori}</td>
                <td>{jumlah}</td>
                <td>{Math.round((jumlah / total) * 100)}%</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row">Total</th>
              <td>{total}</td>
              <td>{total > 0 ? '100%' : '0%'}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}
