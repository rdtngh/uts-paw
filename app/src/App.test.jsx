import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import App from './App.jsx'

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
