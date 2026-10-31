import './KotakPencarian.css'

export default function KotakPencarian({ nilai, onUbah }) {
  return (
    <label className="kotak-pencarian">
      Cari destinasi
      <input
        type="search"
        value={nilai}
        onChange={(e) => onUbah(e.target.value)}
        placeholder="Ketik nama destinasi..."
      />
    </label>
  )
}
