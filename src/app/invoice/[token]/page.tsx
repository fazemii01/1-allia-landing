import { notFound } from 'next/navigation'
import PrintButton from './PrintButton'

interface InvoiceItem {
  description: string
  amount: number
}

interface InvoiceData {
  id: number
  invoice_number: string
  invoice_token: string
  status: string
  due_date: string
  paid_at: string | null
  total_amount: number
  items: InvoiceItem[]
  payment_proof: string | null
  patient: {
    nama_lengkap: string
    nama_anak: string
    no_telepon: string
    email_ortu: string | null
  }
  appointment: {
    id: number
    scheduled_at: string
    duration_minutes: number
  } | null
  created_at: string
}

const STATUS_MAP: Record<string, { label: string; bg: string; text: string; border: string }> = {
  belum_bayar: { label: 'Belum Bayar', bg: '#FEF9C3', text: '#854D0E', border: '#FDE047' },
  sudah_bayar: { label: 'Lunas', bg: '#DCFCE7', text: '#166534', border: '#4ADE80' },
  jatuh_tempo: { label: 'Jatuh Tempo', bg: '#FEE2E2', text: '#991B1B', border: '#F87171' },
  menunggu_verifikasi: { label: 'Menunggu Verifikasi', bg: '#FFF7ED', text: '#9A3412', border: '#FB923C' },
}

function formatRp(amount: number) {
  return 'Rp ' + Number(amount).toLocaleString('id-ID')
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
}

interface PaymentMethodData {
  id: number
  bank_name: string
  account_number: string
  account_name: string
  instructions: string | null
  icon_url: string | null
  is_active: boolean
  sort_order: number
}

async function getInvoice(token: string): Promise<InvoiceData | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:9000'
    const url = `${apiUrl}/api/invoice/${token}`
    console.log('[Invoice] Fetching:', url)
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) {
      const body = await res.text()
      console.error(`[Invoice] Backend returned ${res.status}:`, body)
      return null
    }
    return res.json()
  } catch (err) {
    console.error('[Invoice] Fetch error:', err)
    return null
  }
}

async function getPaymentMethods(): Promise<PaymentMethodData[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:9000'
    const res = await fetch(`${apiUrl}/api/payment-methods`, { cache: 'no-store' })
    if (!res.ok) return []
    return res.json()
  } catch (err) {
    console.error('[Invoice] Payment methods fetch error:', err)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const invoice = await getInvoice(token)
  if (!invoice) return { title: 'Invoice Tidak Ditemukan — Allia Kids' }
  return {
    title: `Invoice ${invoice.invoice_number} — Allia Kids`,
    description: `Detail tagihan sesi terapi Allia Kids untuk ${invoice.patient?.nama_lengkap}`,
    robots: 'noindex',
  }
}

export default async function InvoicePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params
  const [invoice, paymentMethods] = await Promise.all([
    getInvoice(token),
    getPaymentMethods(),
  ])
  if (!invoice) notFound()

  const status = STATUS_MAP[invoice.status] ?? { label: invoice.status, bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' }
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:9000'

  return (
    <div className="min-h-screen bg-[#F0F4F9] py-10 px-4 print:bg-white print:py-0 print:px-0">
      <div className="max-w-2xl mx-auto">

        {/* Print Button — hidden on print */}
        <div className="flex justify-end mb-4 print:hidden">
          <PrintButton />
        </div>

        {/* Invoice Card */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden print:shadow-none print:rounded-none">

          {/* Header */}
          <div
            style={{ background: 'linear-gradient(135deg, #0f2d4a 0%, #1c72bb 100%)' }}
            className="px-8 py-7 flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <img
                src="/assets/img/alliakids2.png"
                alt="Allia Kids Logo"
                className="h-11 w-auto object-contain bg-white/10 p-1.5 rounded-xl border border-white/20 shadow-sm shrink-0"
              />
              <div>
                <h1 className="text-white text-2xl font-extrabold tracking-tight">Allia Kids</h1>
                <p className="text-white/60 text-xs mt-0.5">Klinik Tumbuh Kembang Anak</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">INVOICE</p>
              <p className="text-white text-lg font-extrabold font-mono">{invoice.invoice_number}</p>
            </div>
          </div>

          {/* Status Banner */}
          <div
            style={{ background: status.bg, borderBottom: `2px solid ${status.border}` }}
            className="px-8 py-3 flex items-center justify-between"
          >
            <span
              style={{ color: status.text }}
              className="text-sm font-extrabold uppercase tracking-widest"
            >
              {status.label}
            </span>
            <span className="text-xs text-gray-500 font-medium">
              Dibuat: {formatDate(invoice.created_at)}
            </span>
          </div>

          <div className="px-8 py-7 flex flex-col gap-7">

            {/* Patient & Appointment Info */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Ditagihkan Kepada</p>
                <p className="text-gray-800 font-extrabold text-base">{invoice.patient?.nama_lengkap}</p>
                {invoice.patient?.nama_anak && (
                  <p className="text-gray-600 text-sm">Anak: <span className="font-semibold">{invoice.patient.nama_anak}</span></p>
                )}
                <p className="text-gray-500 text-sm mt-0.5">{invoice.patient?.no_telepon}</p>
                {invoice.patient?.email_ortu && (
                  <p className="text-gray-400 text-xs mt-0.5">{invoice.patient.email_ortu}</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Tanggal Jatuh Tempo</p>
                <p className="text-gray-800 font-bold text-base">{formatDate(invoice.due_date)}</p>
                {invoice.appointment && (
                  <>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-3 mb-1">Jadwal Sesi</p>
                    <p className="text-gray-700 text-sm font-semibold">
                      {formatDate(invoice.appointment.scheduled_at)}
                    </p>
                    <p className="text-gray-500 text-xs">{invoice.appointment.duration_minutes} menit</p>
                  </>
                )}
                {invoice.paid_at && (
                  <>
                    <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mt-3 mb-1">Tanggal Lunas</p>
                    <p className="text-green-700 text-sm font-bold">{formatDate(invoice.paid_at)}</p>
                  </>
                )}
              </div>
            </div>

            {/* Items Table */}
            <div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-100">
                    <th className="text-left text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pb-2 pr-4">Deskripsi Layanan</th>
                    <th className="text-right text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pb-2">Jumlah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {invoice.items?.map((item, i) => (
                    <tr key={i}>
                      <td className="py-3 pr-4 text-gray-700 font-medium">{item.description}</td>
                      <td className="py-3 text-right text-gray-800 font-bold font-mono">{formatRp(item.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total */}
              <div className="mt-4 pt-4 border-t-2 border-gray-100 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Tagihan</span>
                <span
                  style={{ color: '#0f2d4a' }}
                  className="text-2xl font-extrabold tracking-tight font-mono"
                >
                  {formatRp(invoice.total_amount)}
                </span>
              </div>
            </div>

            {/* Payment Proof */}
            {invoice.payment_proof && (
              <div className="bg-green-50 rounded-xl border border-green-100 px-5 py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-green-800 text-xs font-extrabold uppercase tracking-widest">Bukti Pembayaran Diterima</p>
                  <p className="text-green-600 text-xs mt-0.5">File bukti pembayaran telah berhasil diunggah.</p>
                </div>
                <a
                  href={invoice.payment_proof}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-green-700 bg-white border border-green-200 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors shrink-0"
                >
                  Lihat Bukti ↗
                </a>
              </div>
            )}

            {/* Payment Instructions & Methods */}
            {invoice.status === 'belum_bayar' && (
              <div className="bg-blue-50/70 rounded-2xl border border-blue-100 p-5 flex flex-col gap-4">
                <div>
                  <p className="text-blue-900 text-xs font-extrabold uppercase tracking-widest mb-1">Cara Pembayaran</p>
                  <p className="text-blue-700 text-xs font-medium leading-relaxed">
                    Silakan transfer ke salah satu rekening resmi klinik di bawah ini dan kirimkan bukti pembayaran ke WhatsApp kami di{' '}
                    <a href="https://wa.me/6285138511348" target="_blank" rel="noopener noreferrer" className="font-bold underline text-blue-800">+62 851-3851-1348</a>.
                  </p>
                </div>

                {paymentMethods && paymentMethods.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {paymentMethods.map((pm) => (
                      <div key={pm.id} className="bg-white rounded-xl p-3.5 border border-blue-150 shadow-sm flex flex-col justify-between gap-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold text-gray-800">{pm.bank_name}</span>
                          {pm.icon_url && (
                            <img
                              src={pm.icon_url.startsWith('http') ? pm.icon_url : `${apiUrl}${pm.icon_url}`}
                              alt={pm.bank_name}
                              className="h-5 w-auto object-contain max-w-[60px]"
                            />
                          )}
                        </div>
                        <div>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-[10px] font-bold text-gray-400">No. Rek:</span>
                            <span className="text-xs font-extrabold text-blue-700 font-mono select-all">{pm.account_number}</span>
                          </div>
                          <p className="text-[10px] text-gray-500 font-semibold mt-0.5">a.n. {pm.account_name}</p>
                        </div>
                        {pm.instructions && (
                          <p className="text-[10px] text-gray-400 italic border-t border-gray-100 pt-1 mt-1 leading-tight">{pm.instructions}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="pt-5 border-t border-gray-100 flex flex-col items-center gap-1 text-center">
              <p className="text-[#1c72bb] font-extrabold text-sm">Allia Kids — Klinik Tumbuh Kembang Anak</p>
              <p className="text-gray-400 text-xs">Hubungi kami: +62 851-3851-1348</p>
              <p className="text-gray-300 text-[10px] mt-1 font-mono">Token: {invoice.invoice_token}</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
