/**
 * Pusat Seluruh Data & Konten "The Scrapbook of Us"
 * -------------------------------------------------------------
 * Tatwa dapat dengan mudah mengganti teks, judul lagu, tautan file audio,
 * dan foto polaroid di file ini tanpa perlu menyentuh kode antarmuka.
 */

export const scrapbookData = {
  // 1. Informasi Penerima & Prolog (Segmen 1)
  recipient: {
    name: "Adiba",
    nickname: "Askiyaa",
    faculty: "Pilkom '25",
    greeting: "Untuk Askiyaa, Pilkom 25.",
    boxSubtitle: "Sebuah bingkisan kecil dari lembaran yang pernah kita tulis bersama.",
    ribbonInstruction: "Tarik pitanya perlahan...",
  },

  // 2. Musik Latar (BGM)
  bgm: {
    title: "Gentle Memory (Lo-Fi)",
    // Jika Tatwa sudah memiliki file MP3, masukkan ke public/audio/bgm/namafile.mp3
    src: "/audio/bgm/gentle-memory.mp3",
    defaultVolume: 0.3,
  },

  // 3. Segmen 2: Soundtrack Perjalanan (Mixtape Kita)
  soundtrack: [
    {
      id: "song-1",
      title: "Lagu Sore Hari",
      artist: "Nadin Amizah / Hindia",
      duration: "3:24",
      src: "/audio/songs/song1.mp3",
      memoryText: "Lagu pertama yang kita dengar di cafe waktu ngerjain tugas sampai sore itu...",
    },
    {
      id: "song-2",
      title: "Jalan Pulang",
      artist: "Yura Yunita",
      duration: "4:02",
      src: "/audio/songs/song2.mp3",
      memoryText: "Waktu nemenin kamu pulang naik motor pas jalanan lagi sepi dan dingin.",
    },
    {
      id: "song-3",
      title: "Kisah Klasik",
      artist: "Sheila on 7",
      duration: "3:50",
      src: "/audio/songs/song3.mp3",
      memoryText: "Karena setiap babak selalu punya cara manisnya sendiri untuk dikenang.",
    },
  ],

  // 4. Segmen 3: Tumpukan Memori (Polaroid Interaktif)
  polaroids: [
    {
      id: "photo-1",
      // Masukkan foto ke public/images/polaroids/photo1.jpg
      src: "/images/polaroids/photo1.jpg",
      date: "14 Oktober 2024",
      frontCaption: "Aku suka baju yang kamu pakai di foto itu.",
      backNote: "Di tempat ini kamu ketawa kencang banget sampai hampir menumpahkan minuman. Jangan pernah hilang tawa lepasmu itu ya.",
      rotation: -3,
    },
    {
      id: "photo-2",
      src: "/images/polaroids/photo2.jpg",
      date: "28 November 2024",
      frontCaption: "Muka cemberut andalan kalau lagi lapar.",
      backNote: "Padahal 5 menit setelah makanan datang langsung senyum lagi seperti anak kecil.",
      rotation: 2,
    },
    {
      id: "photo-3",
      src: "/images/polaroids/photo3.jpg",
      date: "12 Januari 2025",
      frontCaption: "Sudut kampus yang paling sering kita lewati.",
      backNote: "Banyak obrolan random dari masa depan sampai tugas kuliah yang gak selesai-selesai.",
      rotation: -1,
    },
    {
      id: "photo-4",
      src: "/images/polaroids/photo4.jpg",
      date: "14 Februari 2025",
      frontCaption: "Hari itu, terima kasih sudah tersenyum.",
      backNote: "Semoga langkahmu ke depan selalu dipenuhi orang-orang yang tulus menjagamu.",
      rotation: 3,
    },
  ],

  // 5. Segmen 4: Kamus Bahasa Kita (Inside Jokes)
  dictionary: [
    {
      word: "Ngambek 'Y'",
      phonetic: "/ngam·bek way/",
      type: "kata sifat / ungkapan",
      definition: "Kondisi saat Adiba mendadak membalas chat hanya dengan satu huruf kapital 'Y' tanpa titik.",
      example: "Tatwa: 'Mau pesen es krim rasa apa?' — Adiba: 'Y'",
    },
    {
      word: "Pilkom Pace",
      phonetic: "/pil·kom peys/",
      type: "nomina",
      definition: "Ritme kehidupan anak ilmu komputer: antara begadang ngoding, mengeluh pusing, tapi tugas tetap selesai.",
      example: "'Tetap semangat di Pilkom 25 ya, kamu jauh lebih tangguh dari yang kamu kira.'",
    },
    {
      word: "Dih!",
      phonetic: "/dih!/",
      type: "interjeksi",
      definition: "Kata seru andalan Adiba ketika Tatwa mulai melontarkan lelucon garing atau ejekan kecil.",
      example: "'Dih, apaan sih gak jelas banget!' *tapi sambil nahan ketawa*",
    },
  ],

  // 6. Segmen 5: Hal-hal Kecil (Kaca Berembun)
  foggyGlass: [
    {
      id: "fog-1",
      title: "Hal Kecil #1",
      hiddenText: "Cara bicaramu yang tiba-tiba jadi cepet banget kalau lagi antusias nyeritain hal yang kamu suka.",
    },
    {
      id: "fog-2",
      title: "Hal Kecil #2",
      hiddenText: "Kebiasaanmu mencatat hal-hal kecil di sticky notes warna-warni yang selalu tertempel di buku.",
    },
    {
      id: "fog-3",
      title: "Hal Kecil #3",
      hiddenText: "Gayamu kalau lagi ngambek tapi masih peduli dan nanyain 'Udah makan belum?'.",
    },
  ],

  // 7. Segmen 6: Rekaman Tawa & Tanya (Voice Notes Asli & Balasan Tatwa)
  voiceNotes: [
    {
      id: "vn-1",
      sender: "Adiba",
      // Masukkan rekaman suara asli Adiba ke public/audio/vn/vn1.mp3
      src: "/audio/vn/vn1.mp3",
      duration: "0:14",
      audioPreviewLabel: "VN: 'Tatwaaa...'",
      // Balasan imajiner Tatwa (lucu, personal, khas mereka berdua)
      tatwaReply: "kenapa sii panggil panggil... padahal mau nanya tugas doang kan aslinya :P",
    },
    {
      id: "vn-2",
      sender: "Adiba",
      src: "/audio/vn/vn2.mp3",
      duration: "0:22",
      audioPreviewLabel: "VN: 'Lagi di mana?'",
      tatwaReply: "lagi mikir, kok bisa ya ada orang se-random kamu wkwk.",
    },
    {
      id: "vn-3",
      sender: "Adiba",
      src: "/audio/vn/vn3.mp3",
      duration: "0:18",
      audioPreviewLabel: "VN: Tawa lepas",
      tatwaReply: "suara tawamu ini yang paling sering bikin kangen suasana waktu itu.",
    },
  ],

  // 8. Segmen 7: Rencana Tertunda (Wishlist Kertas Robek)
  wishlist: [
    {
      text: "Nonton konser bareng yang sempat kita rencanakan",
      note: "Mungkin di kesempatan lain, dengan ceritamu yang baru.",
    },
    {
      text: "Keliling kota naik motor pas sore hari waktu langit ungu",
      note: "Semoga kamu selalu menikmati angin sore di kotamu.",
    },
    {
      text: "Makan ramen pedas di tempat langganan",
      note: "Jangan lupa pesan minum yang manis ya, biar gak kepedesan.",
    },
    {
      text: "Selesai kuliah dan wisuda bareng",
      note: "Aku yakin kamu bakal jadi sarjana Pilkom yang hebat.",
    },
  ],

  // 9. Segmen 8: Penutup & Tiket Doa
  closing: {
    letter: `Terima kasih untuk setiap tawa, obrolan larut malam, dan semua hal baik yang pernah kita bagi bersama. Tidak ada penyesalan, hanya rasa syukur pernah mengenalmu dan berjalan bersamamu di satu potongan waktu.`,
    ticket: {
      passenger: "Adiba (Askiyaa)",
      classType: "First Class — Kehidupan Baru",
      flightNo: "PILKOM-2025",
      destination: "Masa Depan yang Cerah & Bahagia",
      seat: "No. 1 di Ceritamu Sendiri",
      validity: "Valid Selamanya",
    },
    prayer: "Semoga kuliahmu selalu lancar di Pilkom 25, langkahmu dipermudah, dan kamu selalu dikelilingi orang-orang yang tulus menyayangimu.",
    finalSignoff: "Berbahagialah. — Tatwa",
  },
};
