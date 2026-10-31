import mahasiswa from '../../mahasiswa.json'

// Halaman sementara; isinya dilengkapi di commit berikutnya.
export default function Beranda() {
  return (
    <>
      <h1>Destinasi Wisata Lampung</h1>
      <p>
        {mahasiswa.nama} ({mahasiswa.nim})
      </p>
    </>
  )
}
