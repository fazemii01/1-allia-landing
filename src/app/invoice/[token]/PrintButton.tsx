'use client'

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 bg-[#1c72bb] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow hover:bg-[#0f5fa0] transition-colors"
    >
      🖨️ Cetak / Download PDF
    </button>
  )
}
