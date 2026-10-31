export default function PilihKategori({ daftar, nilai, onUbah }) {
  return (
    <label className="pilih-kategori">
      Kategori
      <select value={nilai} onChange={(e) => onUbah(e.target.value)}>
        <option value="Semua">Semua</option>
        {daftar.map((kategori) => (
          <option key={kategori} value={kategori}>
            {kategori}
          </option>
        ))}
      </select>
    </label>
  )
}
