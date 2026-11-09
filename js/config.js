/* ===== PENGATURAN UTAMA – ubah teks di sini ===== */
window.CONFIG = {
  company: { name: "PT. Tri ELang Indo Maritim ", brand: "Tri Elang Indo Maritim  Palembang", branch: "Palembang", subtitle: "AGEN PELAYARAN" },

  // Lokasi cabang Palembang
  address: "Perumahan Cemara, Jl. Padat Karya Blok LRG No. E-09, RT 03/RW 01, Kel. Srimulya, Kec. Sematangborang, Kota Palembang, Sumatera Selatan",
  mapsUrl: "https://maps.app.goo.gl/QcacFRg4LXEgiaUUA",
  mapEmbedUrl: "https://www.google.com/maps?q=Perumahan%20Cemara%2C%20Jl.%20Padat%20Karya%2C%20Srimulya%2C%20Sematang%20Borang%2C%20Palembang&output=embed",
  branchPhone: "62 711 570096",              // Telepon kantor Palembang
  branchEmail: "palembang@trielang.co.id",   // Email kantor Palembang

  // Kantor pusat (tampil kecil di bagian kontak)
  headOffice: {
    address: "Jl. Pemuda 66, Lantai 2 Rawamangun, Jakarta 13320 Indonesia",
    phone: "+62 21 470219 (Hunting)",
    email: "trielang@trielang.co.id",
    profileUrl: "https://drive.google.com/file/d/1fNxTwVXqKvgISBq_CJcyIGJCO3NS71gk/view?usp=drive_link"
  },

  // Urutan section di halaman
  sectionOrder: ["navbar","hero","highlights","about","services","products","tagline","contact","footer"],

  nav: [ { id: "hero", label: "Beranda" }, { id: "about", label: "Tentang Kami" }, { id: "services", label: "Layanan" }, { id: "products", label: "EPDA" }, { id: "contact", label: "Kontak" } ],

  hero: { cta: { label: "Layanan Perusahaan Kami", target: "highlights" } },

  highlights: {
    title: "Layanan Perusahaan Kami",
    button: { label: "Lihat Semua Layanan", target: "services" },
    items: [ "Keagenan Kapal dan Pelabuhan", "Brokerage", "Stevedoring" ]
  },

  about: {
    title: "Siapa Kami",
    paragraphs: [
      "PT Trielang Indo Maritim adalah agen pelayaran profesional dan bagian dari grup PT Tri Elang Jaya Maritim, yang melayani industri maritim Indonesia sejak 1999.",
      "Keahlian kami meliputi jasa keagenan kapal, brokerage dan charter kapal, serta seluruh kegiatan operasional keagenan pelabuhan.",
      "Kami bertindak sebagai perwakilan tepercaya pemilik kapal dan penyewa kapal (charterer) di seluruh pelabuhan Indonesia, menjaga kepentingan mereka melalui pengurusan bea cukai yang efisien, penanganan di pelabuhan, pengelolaan disbursement, serta pendampingan langsung saat bongkar muat.",
      "Cabang Palembang kami menghadirkan layanan ini untuk wilayah Sumatera Selatan."
    ],
    quote: "Setiap kunjungan pelabuhan, setiap saat."
  },

  services: {
    title: "Kami Menyediakan",
    items: [
      { title: "Keagenan Kapal", text: "Kami memberikan dukungan operasional 24/7, menjaga pemilik dan penyewa kapal tetap mendapat informasi terbaru melalui laporan perkembangan harian dan daftar antrean kapal (vessel line-up) mingguan di pelabuhan batubara dan berbagai operasi kargo. Kami dapat menangani beragam jenis kapal, mulai dari bulker, tanker, hingga tug/tongkang, dengan jenis muatan seperti batubara, semen/klinker, produk baja, dan pupuk." },
      { title: "Brokerage", text: "Kami menawarkan tarif freight yang kompetitif melalui jaringan luas kami, baik langsung dari pemilik kapal maupun melalui rekanan broker terpercaya. Fokus utama kami adalah operasi kargo curah, break bulk, dan cair. Kami juga membantu jual beli kapal (Sale & Purchase/S&P) bagi klien yang ingin membeli atau menjual kapal." },
      { title: "Stevedoring", text: "Didukung kerja sama Terminal Operator di Tanjung Priok (Jakarta), tim kami menangani muatan secara akurat dan tepat waktu untuk segala jenis dan bentuk, melayani klien perorangan, korporasi, dan industri. Operasi stevedoring kami kini meluas ke Kalimantan Selatan, Kalimantan Timur, dan Palembang (Sumatera Selatan), dengan lokasi lain segera menyusul." }
    ],
    otherTitle: "Layanan Lainnya",
    otherText: "Kami juga menyediakan statistik bulanan berdasarkan pelanggan, volume, dan tujuan, yang dapat dikirim sesuai permintaan. Kami mendampingi pelanggan dalam kunjungan ke pelanggan mereka, stockpile, otoritas, dan pelabuhan di seluruh Indonesia, serta membantu mempromosikan bisnis mereka di bidang pelayaran atau perdagangan.",
    listTitle: "Jenis Layanan Kami",
    list: ["Layanan Keagenan Pelabuhan","Protecting Agency","Konsultasi Pelayaran","Layanan Logistik Termasuk Grab","Cash to Master (CTM)","Inspeksi Bawah Air","Pembersihan Bawah Air","Port Captaincy"]
  },

  // Estimasi penawaran biaya keagenan (indikatif – UBAH angka sesuai daftar harga asli)
  products: {
    title: "Estimasi Penawaran Biaya Keagenan",
    subtitle: "",
    intro: "Biaya akhir bergantung pada jenis kapal, pelabuhan, muatan, dan layanan yang dibutuhkan.",
    currency: "IDR",
    unit: "per hari",
    updated: "2026",
    items: [
      { name: "Tug & Barge 270 ft", type: "barge", spec: "Kapasitas sekitar 4.000 – 5.000 MT", cargo: "Batubara, agregat, kargo umum", min: 45000000, max: 65000000 },
      { name: "Tug & Barge 300 ft", type: "barge", spec: "Kapasitas sekitar 7.000 – 8.000 MT", cargo: "Batubara, semen/klinker, produk baja", min: 60000000, max: 85000000 },
      { name: "Handysize Bulker", type: "bulker", spec: "Sekitar 25.000 – 35.000 DWT", cargo: "Batubara, pupuk, semen/klinker", min: 150000000, max: 220000000 },
      { name: "Supramax Bulker", type: "bulker", spec: "Sekitar 50.000 – 60.000 DWT", cargo: "Batubara, biji-bijian, produk baja", min: 190000000, max: 270000000 },
      { name: "Tanker Pesisir", type: "tanker", spec: "Sekitar 3.000 – 6.000 DWT", cargo: "Kargo cair, CPO, BBM", min: 70000000, max: 110000000 }
    ],
    excluded: ["Biaya pelabuhan", "Bunker", "Pajak"],
    stepsTitle: "Cara Mendapatkan Penawaran",
    steps: [
      { t: "Kirim Data Kapal", d: "Sampaikan jenis kapal, pelabuhan tujuan, dan muatan." },
      { t: "Terima Penawaran", d: "Tim kami menyusun rincian estimasi biaya keagenan." },
      { t: "Konfirmasi & Operasi", d: "Setelah disetujui, kami siap menangani kapal Anda." }
    ],
    ctaTitle: "Butuh penawaran resmi?",
    ctaText: "Hubungi tim cabang Palembang untuk estimasi sesuai kebutuhan Anda.",
    cta: { label: "Minta Penawaran", target: "contact" },
    note: "Tarif bersifat estimasi, belum termasuk biaya pelabuhan, bunker, dan pajak, serta dapat berubah sewaktu-waktu tanpa pemberitahuan."
  },

  tagline: { line1: "Sumber daya yang tepat, di tempat yang tepat, pada waktu yang tepat", line2: "Mitra tepercaya Anda di setiap pelabuhan" },

  footer: { note: "Hak cipta dilindungi." }
};
