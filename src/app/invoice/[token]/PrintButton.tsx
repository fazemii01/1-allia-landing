'use client'

interface PrintButtonProps {
  invoice?: any
}

export default function PrintButton({ invoice }: PrintButtonProps) {
  const handlePrint = () => {
    if (!invoice) {
      window.print()
      return
    }

    const itemsList = invoice.items || [{ description: 'Biaya Sesi Terapi & Pendaftaran', amount: invoice.total_amount }]
    const parentName = invoice.patient?.nama_lengkap || 'Bapak / Ibu'
    const childName = invoice.patient?.nama_anak || '-'
    const phone = invoice.patient?.no_telepon || '-'
    const issueDate = invoice.created_at ? new Date(invoice.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'
    const dueDate = invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'
    const isPaid = invoice.status === 'sudah_bayar'

    const itemsHtml = itemsList.map((item: any, idx: number) => `
      <tr>
        <td style="text-align: center; width: 40px;">${idx + 1}</td>
        <td><strong>${item.description}</strong></td>
        <td style="text-align: right; font-weight: bold;">Rp ${Number(item.amount).toLocaleString('id-ID')}</td>
      </tr>
    `).join('')

    const printWindow = window.open('', '_blank', 'width=900,height=1100')
    if (!printWindow) {
      window.print()
      return
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <base href="${window.location.origin}/" />
          <title>Invoice - ${invoice.invoice_number} - Allia Kids</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
            @page { size: A4 portrait; margin: 12mm 15mm 15mm 15mm; }
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: 'Plus Jakarta Sans', Arial, sans-serif; color: #0f172a; background: #ffffff; font-size: 10pt; line-height: 1.5; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .invoice-container { width: 100%; max-width: 780px; margin: 0 auto; padding: 10px; }
            .inv-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px double #0284c7; padding-bottom: 14px; margin-bottom: 20px; }
            .brand-flex { display: flex; align-items: center; gap: 14px; }
            .inv-logo { height: 52px; width: auto; object-fit: contain; }
            .brand-info h1 { font-size: 18pt; font-weight: 900; color: #0369a1; letter-spacing: -0.5px; }
            .brand-info p { font-size: 8.5pt; color: #64748b; font-weight: 500; }
            .inv-meta-right { text-align: right; }
            .inv-doc-title { font-size: 14pt; font-weight: 900; color: #0f172a; text-transform: uppercase; letter-spacing: 1px; }
            .inv-number { font-size: 11pt; font-weight: 800; color: #0284c7; font-family: monospace; margin-top: 2px; }
            .status-bar { display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 16px; margin-bottom: 20px; }
            .status-badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 8.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; }
            .status-paid { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }
            .status-unpaid { background: #ffe4e6; color: #be123c; border: 1px solid #fca5a5; }
            .date-info { font-size: 8.5pt; color: #475569; }
            .customer-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 22px; }
            .info-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px; }
            .info-label { font-size: 7.5pt; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 2px; }
            .info-val { font-size: 9.5pt; font-weight: 700; color: #0f172a; }
            .items-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items-table th { background: #f0f9ff; color: #0369a1; font-size: 8.5pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; padding: 10px 12px; border-bottom: 2px solid #0284c7; }
            .items-table td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-size: 9.5pt; color: #0f172a; }
            .items-table tr:nth-child(even) td { background: #fafafa; }
            .total-wrapper { display: flex; justify-content: flex-end; margin-bottom: 24px; }
            .total-box { width: 300px; background: #f0f9ff; border: 2px solid #0284c7; border-radius: 10px; padding: 14px 18px; text-align: right; }
            .total-title { font-size: 8.5pt; font-weight: 800; color: #0369a1; text-transform: uppercase; }
            .total-num { font-size: 18pt; font-weight: 900; color: #0284c7; margin-top: 2px; }
            .footer-sigs { display: flex; justify-content: space-between; margin-top: 30px; page-break-inside: avoid; }
            .sig-card { text-align: center; width: 200px; }
            .sig-title { font-size: 8.5pt; color: #64748b; }
            .sig-line { margin-top: 55px; border-top: 1.5px solid #0f172a; font-weight: 700; font-size: 9.5pt; padding-top: 4px; }
            .nb-terms { margin-top: 20px; padding: 8px 12px; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 6px; text-align: center; font-size: 7.5pt; color: #64748b; font-style: italic; }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="inv-header">
              <div class="brand-flex">
                <img src="/assets/img/alliakids2.png" alt="Allia Kids Logo" class="inv-logo" />
                <div class="brand-info">
                  <h1>ALLIA KIDS</h1>
                  <p>Klinik Stimulasi & Terapi Tumbuh Kembang Anak Spesialis</p>
                </div>
              </div>
              <div class="inv-meta-right">
                <div class="inv-doc-title">TAGIHAN / INVOICE</div>
                <div class="inv-number">${invoice.invoice_number}</div>
              </div>
            </div>

            <div class="status-bar">
              <div>
                <span class="status-badge ${isPaid ? 'status-paid' : 'status-unpaid'}">${isPaid ? 'LUNAS' : 'BELUM DIBAYAR'}</span>
              </div>
              <div class="date-info">
                Tanggal Terbit: <strong>${issueDate}</strong> &nbsp;|&nbsp; Jatuh Tempo: <strong>${dueDate}</strong>
              </div>
            </div>

            <div class="customer-grid">
              <div class="info-box">
                <div class="info-label">DITAGIHKAN KEPADA (ORANG TUA / WALI)</div>
                <div class="info-val">${parentName}</div>
                <div class="date-info" style="margin-top: 2px;">No. HP/WA: ${phone}</div>
              </div>
              <div class="info-box">
                <div class="info-label">NAMA PASIEN (ANAK)</div>
                <div class="info-val">${childName}</div>
              </div>
            </div>

            <table class="items-table">
              <thead>
                <tr>
                  <th style="text-align: center; width: 40px;">No</th>
                  <th>Deskripsi Layanan / Sesi Terapi</th>
                  <th style="text-align: right;">Jumlah (Rp)</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>

            <div class="total-wrapper">
              <div class="total-box">
                <div class="total-title">TOTAL TAGIHAN HARUS DIBAYAR</div>
                <div class="total-num">Rp ${Number(invoice.total_amount).toLocaleString('id-ID')}</div>
              </div>
            </div>

            <div class="nb-terms">
              * Dokumen ini merupakan tagihan/bukti pembayaran elektronik resmi dari Klinik Allia Kids dan sah tanpa memerlukan tanda tangan basah.
            </div>
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500);
            };
          </script>
        </body>
      </html>
    `)
    printWindow.document.close()
  }

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-2 bg-[#1c72bb] text-white text-sm font-bold px-5 py-2.5 rounded-xl shadow hover:bg-[#0f5fa0] transition-colors cursor-pointer"
    >
      🖨️ Cetak / Download PDF
    </button>
  )
}
