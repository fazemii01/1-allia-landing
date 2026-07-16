export interface ContentBlock {
  type: "paragraph" | "heading" | "image" | "quote";
  content?: string;
  src?: string;
  caption?: string;
  alt?: string;
}

export interface ArticleData {
  slug: string;
  title: string;
  desc: string; // Excerpt
  excerpt?: string; // Excerpt
  readTime?: string;
  content: string; // fallback flat text
  contentBlocks?: ContentBlock[];
  date: string;
  category: string;
  img: string;
}

export interface GalleryImage {
  src: string;
  caption?: string;
}

export interface GalleryData {
  slug: string;
  title: string;
  img: string;
  date: string;
  category: string;
  desc: string;
  images?: GalleryImage[];
}

export const articlesData: ArticleData[] = [
  {
    slug: "speech-delay-pada-anak",
    title: "Mengenal Speech Delay pada Anak dan Cara Menstimulasinya",
    desc: "Apakah si kecil belum lancar berbicara di usia 2 tahun? Simak tips dari terapis wicara kami untuk memicu keberanian anak merangkai kata.",
    excerpt: "Apakah si kecil belum lancar berbicara di usia 2 tahun? Simak tips dari terapis wicara kami untuk memicu keberanian anak merangkai kata.",
    readTime: "5 min read",
    content: `Speech delay atau keterlambatan bicara adalah kondisi ketika anak tidak mampu mencapai milestone perkembangan bicara sesuai dengan usianya. Kondisi ini sering membuat orang tua cemas. Namun, dengan deteksi dini dan stimulasi yang tepat di rumah, perkembangan bicara anak dapat dioptimalkan secara signifikan.

### Tanda-Tanda Anak Mengalami Speech Delay:
1. **Usia 12 Bulan:** Tidak menoleh saat namanya dipanggil atau tidak menggunakan gestur tubuh (seperti melambai atau menunjuk).
2. **Usia 18 Bulan:** Lebih memilih berkomunikasi dengan gerakan tubuh (non-verbal) dibandingkan suara atau kesulitan menirukan suara sederhana.
3. **Usia 2 Tahun:** Belum bisa meniru kata-kata baru atau hanya bisa mengulang beberapa patah kata sederhana secara spontan tanpa membentuk frasa bermakna.

### Cara Menstimulasi Anak di Rumah:
*   **Sering Mengajak Anak Mengobrol:** Ceritakan aktivitas Anda sehari-hari dengan kalimat yang jelas dan berulang.
*   **Membacakan Buku Cerita:** Pilih buku dengan gambar besar, sebutkan nama benda/hewannya, dan bacakan dengan intonasi menarik.
*   **Batasi Penggunaan Gadget (Screen Time):** Paparan layar berlebih dapat mengurangi interaksi sosial dua arah yang krusial untuk melatih saraf bicara anak.
*   **Bernyanyi Bersama:** Gunakan lagu anak-anak berirama ceria yang mudah ditirik liriknya.`,
    contentBlocks: [
      {
        type: "paragraph",
        content: "Speech delay atau keterlambatan bicara adalah kondisi ketika anak tidak mampu mencapai milestone perkembangan bicara sesuai dengan usianya. Kondisi ini sering membuat orang tua cemas. Namun, dengan deteksi dini dan stimulasi yang tepat di rumah, perkembangan bicara anak dapat dioptimalkan secara signifikan."
      },
      {
        type: "heading",
        content: "Tanda-Tanda Anak Mengalami Speech Delay:"
      },
      {
        type: "paragraph",
        content: "1. Usia 12 Bulan: Tidak menoleh saat namanya dipanggil atau tidak menggunakan gestur tubuh (seperti melambai atau menunjuk).\n2. Usia 18 Bulan: Lebih memilih berkomunikasi dengan gerakan tubuh (non-verbal) dibandingkan suara.\n3. Usia 2 Tahun: Belum bisa meniru kata-kata baru atau merangkai 2 kata secara spontan."
      },
      {
        type: "quote",
        content: "Deteksi dini di masa emas (Golden Age) 1-5 tahun menentukan keberhasilan terapi wicara anak."
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600",
        caption: "Stimulasi interaksi dua arah di rumah memegang peranan penting.",
        alt: "Terapis membimbing anak merangkai kata"
      },
      {
        type: "heading",
        content: "Cara Menstimulasi Anak di Rumah:"
      },
      {
        type: "paragraph",
        content: "Beberapa cara menstimulasi yang bisa dilakukan Ayah dan Bunda meliputi:\n* Sering mengajak anak mengobrol tentang kegiatannya.\n* Membacakan buku cerita bergambar besar dengan intonasi menarik.\n* Membatasi penggunaan gadget (screen time) di bawah 1 jam per hari.\n* Bernyanyi lagu anak ceria bersama-sama untuk memicu peniruan kosakata."
      }
    ],
    date: "10 Juli 2026",
    category: "Speech Therapy",
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=600",
  },
  {
    slug: "metode-hipnosleep-sugesti-anak",
    title: "Metode Hipnosleep: Menanamkan Sugesti Positif Saat Anak Tidur",
    desc: "Pelajari cara kerja pikiran bawah sadar balita dan bagaimana menanamkan sugesti positif untuk meredakan tantrum atau fobia makanan.",
    excerpt: "Pelajari cara kerja pikiran bawah sadar balita dan bagaimana menanamkan sugesti positif untuk meredakan tantrum atau fobia makanan.",
    readTime: "4 min read",
    content: `Pernahkah Anda mendengar istilah hypnosleep? Metode ini merupakan salah satu cara alami dan efektif untuk menanamkan nilai-nilai atau sugesti positif langsung ke pikiran bawah sadar anak. Sangat baik digunakan untuk meredakan tantrum, meningkatkan rasa percaya diri, mengatasi kebiasaan mengompol, atau mengatasi fobia makanan (seperti takut makan nasi).

### Bagaimana Hypnosleep Bekerja?
Pikiran manusia terbagi menjadi pikiran sadar (conscious) dan pikiran bawah sadar (subconscious). Pada saat anak tidur nyenyak, gelombang otaknya berada di fase Alfa/Theta yang merupakan pintu masuk ke pikiran bawah sadar. Pada fase ini, pikiran kritis anak sedang beristirahat, sehingga sugesti positif yang diberikan orang tua dapat diterima secara langsung tanpa penolakan.

### Langkah Praktis Melakukan Hypnosleep:
1. **Pilih Waktu yang Tepat:** Lakukan sekitar 30-45 menit setelah anak tertidur lelap.
2. **Uji Kedalaman Tidur:** Belai rambutnya lembut atau gerakkan tangannya sedikit.
3. **Panggil Namanya dengan Lembut:** Bisikkan kalimat pancingan.
4. **Berikan Sugesti Positif:** Gunakan kalimat sederhana, bermakna positif, dan fokus pada solusi.`,
    contentBlocks: [
      {
        type: "paragraph",
        content: "Pernahkah Anda mendengar istilah hypnosleep? Metode ini merupakan salah satu cara alami dan efektif untuk menanamkan nilai-nilai atau sugesti positif langsung ke pikiran bawah sadar anak. Sangat baik digunakan untuk meredakan tantrum, meningkatkan rasa percaya diri, mengatasi kebiasaan mengompol, atau mengatasi fobia makanan (seperti takut makan nasi)."
      },
      {
        type: "heading",
        content: "Bagaimana Hypnosleep Bekerja?"
      },
      {
        type: "paragraph",
        content: "Pikiran manusia terbagi menjadi pikiran sadar (conscious) dan pikiran bawah sadar (subconscious). Pada saat anak tidur nyenyak, gelombang otaknya berada di fase Alfa/Theta yang merupakan pintu masuk ke pikiran bawah sadar. Pada fase ini, pikiran kritis anak sedang beristirahat, sehingga sugesti positif yang diberikan orang tua dapat diterima secara langsung tanpa penolakan."
      },
      {
        type: "quote",
        content: "Sugesti saat hypnosleep menembus pertahanan kritis anak dan bekerja 10 kali lebih cepat di pikiran bawah sadar."
      },
      {
        type: "heading",
        content: "Langkah Praktis Melakukan Hypnosleep:"
      },
      {
        type: "paragraph",
        content: "1. Pilih Waktu yang Tepat: Lakukan sekitar 30-45 menit setelah anak tertidur lelap.\n2. Uji Kedalaman Tidur: Belai rambutnya lembut atau gerakkan tangannya sedikit. Jika ia tidak terbangun, ia berada di fase tidur dalam.\n3. Panggil Namanya dengan Lembut: Bisikkan kalimat seperti, 'Sayang, ini Bunda. Kalau dengar Bunda, gerakkan jarimu ya.'\n4. Berikan Sugesti Positif: Gunakan kalimat sederhana, bermakna positif, dan fokus pada solusi. Hindari kata larangan seperti 'jangan' atau 'tidak'. Contoh: 'Mulai besok dan seterusnya, Kakak suka sekali makan sayur dan buah yang sehat.'"
      }
    ],
    date: "08 Juli 2026",
    category: "Hypnotherapy",
    img: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?q=80&w=600",
  },
  {
    slug: "sensory-play-motorik-halus-toddler",
    title: "Sensory Play untuk Melatih Motorik Halus Toddler di Rumah",
    desc: "Aktivitas menyenangkan menggunakan bahan dapur sederhana untuk menstimulasi saraf sensorik dan motorik jari si kecil.",
    excerpt: "Aktivitas menyenangkan menggunakan bahan dapur sederhana untuk menstimulasi saraf sensorik dan motorik jari si kecil.",
    readTime: "3 min read",
    content: `Sensory play adalah permainan yang merangsang kelima indra anak: penglihatan, pendengaran, penciuman, perabaan, dan perasa. Melalui sensory play, anak belajar mengenali tekstur, melatih otot-otot jari (motorik halus), serta melatih konsentrasi yang sangat penting sebagai fondasi belajar menulis di kemudian hari.

### Manfaat Sensory Play:
*   **Membangun Koneksi Saraf di Otak:** Stimulasi indra membantu mengoptimalkan perkembangan kognitif anak.
*   **Melatih Motorik Halus:** Aktivitas memegang, meremas, menuang, dan menjimpit memperkuat otot tangan.
*   **Mendorong Kemampuan Bahasa:** Anak belajar kata sifat baru seperti basah, kering, kasar, halus, licin, dll.`,
    contentBlocks: [
      {
        type: "paragraph",
        content: "Sensory play adalah permainan yang merangsang kelima indra anak: penglihatan, pendengaran, penciuman, perabaan, dan perasa. Melalui sensory play, anak belajar mengenali tekstur, melatih otot-otot jari (motorik halus), serta melatih konsentrasi yang sangat penting sebagai fondasi belajar menulis di kemudian hari."
      },
      {
        type: "heading",
        content: "Manfaat Sensory Play:"
      },
      {
        type: "paragraph",
        content: "* Membangun Koneksi Saraf di Otak: Stimulasi indra membantu mengoptimalkan perkembangan kognitif anak.\n* Melatih Motorik Halus: Aktivitas memegang, meremas, menuang, and menjimpit memperkuat otot tangan.\n* Mendorong Kemampuan Bahasa: Anak belajar kata sifat baru seperti basah, kering, kasar, halus, licin.\n* Melatih Regulasi Diri: Permainan air atau pasir ajaib terbukti efektif menenangkan anak yang sedang cemas atau rewel."
      },
      {
        type: "quote",
        content: "Bermain adalah pekerjaan utama anak-anak. Melalui permainan sensori, mereka memahami dunia di sekelilingnya."
      },
      {
        type: "heading",
        content: "Ide Sensory Play Sederhana di Rumah:"
      },
      {
        type: "paragraph",
        content: "1. Sensory Bin Beras Warna-Warni: Masukkan beras berwarna ke wadah besar bersama sendok dan mangkuk.\n2. Playdough Mandiri: Buat adonan tepung terigu, air, garam, dan pewarna makanan.\n3. Mencari Mainan di Jeli: Sembunyikan mainan plastik kecil di dalam jeli yang sudah mengeras."
      }
    ],
    date: "05 Juli 2026",
    category: "Motorik Anak",
    img: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=600",
  },
];

export const galleryData: GalleryData[] = [
  {
    slug: "sesi-sensori-play-stimulasi-motorik",
    title: "Sesi Sensori Play & Stimulasi Motorik Halus",
    img: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800",
    date: "Maret 2026",
    category: "Stimulasi",
    desc: "Momen seru ketika anak-anak belajar mengenali tekstur kasar-halus melalui media beras warna-warni dan clay organik di bawah bimbingan terapis profesional kami.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800",
        caption: "Anak-anak antusias menuang dan memilah beras warna-warni."
      },
      {
        src: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800",
        caption: "Melatih otot jemari tangan menggunakan clay organik non-toxic."
      },
      {
        src: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800",
        caption: "Terapis memberikan instruksi sensori dengan penuh kasih sayang."
      }
    ]
  },
  {
    slug: "terapis-metode-bermain-ceria",
    title: "Terapis Menggunakan Metode Bermain Ceria",
    img: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800",
    date: "Februari 2026",
    category: "Terapi",
    desc: "Proses terapi wicara yang dikemas dalam bentuk bermain interaktif, menggunakan flashcard hewan dan boneka tangan agar anak aktif berbicara dengan riang gembira.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=800",
        caption: "Terapis menggunakan boneka tangan untuk memancing komunikasi verbal anak."
      },
      {
        src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800",
        caption: "Anak belajar melafalkan nama hewan melalui kartu flashcard berwarna menarik."
      }
    ]
  },
  {
    slug: "ruang-terapi-nyaman-ramah-anak",
    title: "Ruang Terapi yang Nyaman & Ramah Anak",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800",
    date: "Januari 2026",
    category: "Fasilitas",
    desc: "Desain ruang terapi yang dirancang luas, terang, ber-AC, dipenuhi dengan mainan sensori edukatif dan matras empuk demi kenyamanan dan keselamatan fisik si kecil.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800",
        caption: "Area terapi motorik kasar dilengkapi matras pelindung empuk."
      },
      {
        src: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=800",
        caption: "Pencahayaan alami dan mainan kayu sensori yang rapi & higienis."
      }
    ]
  },
  {
    slug: "skrining-tumbuh-kembang-massal-sekolah",
    title: "Skrining Tumbuh Kembang Massal di Sekolah Dasar",
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800",
    date: "Desember 2025",
    category: "Event",
    desc: "Tim Allia Kids berkolaborasi dengan TK/SD mitra melakukan pemeriksaan motorik, wicara, dan emosi anak secara gratis sebagai wujud peduli tumbuh kembang sejak dini.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800",
        caption: "Evaluasi kemampuan motorik anak usia prasekolah secara berkelompok."
      },
      {
        src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800",
        caption: "Konsultasi singkat terapis dengan guru pendamping kelas."
      }
    ]
  },
  {
    slug: "parenting-talkshow-sharing-session-ibu",
    title: "Parenting Talkshow & Sharing Session Bersama Ibu",
    img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800",
    date: "November 2025",
    category: "Parenting",
    desc: "Talkshow edukatif mingguan bagi para orang tua untuk saling bertukar cerita seputar hambatan anak tantrum dan cara memberikan stimulasi bahasa yang tepat di rumah.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=800",
        caption: "Para ibu berbagi pengalaman seputar tantangan pengasuhan balita."
      }
    ]
  },
  {
    slug: "sesi-analisis-bakat-sidik-jari-anak",
    title: "Sesi Analisis Bakat Sidik Jari Anak",
    img: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=800",
    date: "Oktober 2025",
    category: "Asesmen",
    desc: "Proses pemindaian sidik jari anak untuk melihat potensi kecerdasan bawaan dan gaya belajar yang paling cocok agar proses asuh anak menjadi lebih terarah.",
    images: [
      {
        src: "https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?q=80&w=800",
        caption: "Proses scan sidik jari aman dan nyaman untuk balita."
      }
    ]
  }
];
