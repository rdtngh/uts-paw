import mahasiswa from '../../mahasiswa.json'
import './Tentang.css'

const REPO = 'https://github.com/rdtngh/uts-paw'

export default function Tentang() {
  const { nama, nim, kelas, tema } = mahasiswa

  return (
    <section>
      <h1>Tentang Aplikasi</h1>
      <p>
        Aplikasi ini dibuat untuk Ujian Tengah Semester mata kuliah Pengembangan Aplikasi Web dengan tema {tema}.
      </p>
      <dl className="profil">
        <dt>Nama</dt>
        <dd>{nama}</dd>
        <dt>NIM</dt>
        <dd>{nim}</dd>
        <dt>Kelas</dt>
        <dd>{kelas}</dd>
        <dt>Tema</dt>
        <dd>{tema}</dd>
      </dl>
      <p>
        Kode sumber:{' '}
        <a href={REPO} target="_blank" rel="noreferrer">
          {REPO.replace('https://', '')}
        </a>
      </p>
    </section>
  )
}
