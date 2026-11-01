import './PesanStatus.css'

export default function PesanStatus({ loading, error }) {
  if (loading) return <p className="pesan-status">Memuat data destinasi...</p>
  if (error) {
    return (
      <p role="alert" className="pesan-status pesan-gagal">
        Gagal memuat data: {error}
      </p>
    )
  }
  return null
}
