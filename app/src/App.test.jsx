import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import App from './App.jsx'
import mahasiswa from '../mahasiswa.json'

const DATA = [
  {
    id: '1',
    judul: 'Pantai Uji Coba',
    kategori: 'Pantai',
    kabupaten: 'Pesawaran',
    hargaTiket: 15000,
    jamBuka: '07.00-17.00',
  },
  {
    id: '2',
    judul: 'Museum Uji Coba',
    kategori: 'Budaya',
    kabupaten: 'Bandar Lampung',
    hargaTiket: 5000,
    jamBuka: '08.00-14.00',
  },
]

beforeEach(() => {
  localStorage.clear()
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(DATA))))
})

afterEach(() => {
  vi.unstubAllGlobals()
})

function buka(path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

// Contoh test. Tambahkan minimal 5 test buatan sendiri (butir rubrik F1).
test('rute tidak dikenal menampilkan 404', () => {
  buka('/tidak-ada')
  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument()
})

test('menampilkan data hasil fetch di halaman koleksi', async () => {
  buka('/koleksi')
  expect(await screen.findByText('Pantai Uji Coba')).toBeInTheDocument()
  expect(screen.getByText('Museum Uji Coba')).toBeInTheDocument()
  expect(fetch).toHaveBeenCalled()
})

test('form menolak judul kosong', async () => {
  buka('/tambah')
  await userEvent.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(screen.getByRole('alert')).toHaveTextContent('Judul wajib diisi')
})

test('id yang tidak ada menampilkan pesan tidak ditemukan', async () => {
  buka('/koleksi/999')
  expect(await screen.findByText(/tidak ditemukan/i)).toBeInTheDocument()
  expect(screen.queryByText('404')).not.toBeInTheDocument()
})

test('pencarian menyaring kartu sesuai judul', async () => {
  const user = userEvent.setup()
  buka('/koleksi')
  await screen.findByText('Museum Uji Coba')
  await user.type(screen.getByRole('searchbox'), 'pantai')
  expect(screen.getByText('Pantai Uji Coba')).toBeInTheDocument()
  expect(screen.queryByText('Museum Uji Coba')).not.toBeInTheDocument()
})

test('halaman statistik menampilkan tabel jumlah per kategori', async () => {
  buka('/statistik')
  const tabel = await screen.findByRole('table')
  expect(within(tabel).getByText('Pantai')).toBeInTheDocument()
  expect(within(tabel).getByText('Budaya')).toBeInTheDocument()
  expect(within(tabel).getByText('Total')).toBeInTheDocument()
})

test('halaman tentang menampilkan nama dan NIM', () => {
  buka('/tentang')
  expect(screen.getByText(mahasiswa.nim)).toBeInTheDocument()
  expect(screen.getByText(mahasiswa.nama)).toBeInTheDocument()
})

test('menyimpan item baru membuatnya muncul di koleksi', async () => {
  const user = userEvent.setup()
  buka('/tambah')
  await screen.findByRole('button', { name: 'Simpan' })
  await user.type(screen.getByLabelText('Judul'), 'Air Terjun Uji Coba')
  await user.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(await screen.findByText('Air Terjun Uji Coba')).toBeInTheDocument()
  expect(screen.getByRole('searchbox')).toBeInTheDocument()
  expect(localStorage.getItem('uts-paw-koleksi')).toContain('Air Terjun Uji Coba')
})
