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
    letterGreeting: "Haiii manusia favorit Tatwa Sukma!",
    letterParagraphs: [
      "Selamat datang di kenangan indah Tatwa bersama Adiba...",
      "5 bulan bersama banyak cerita suka duka yang tidak pernah terlupa...",
      "Tolong di simak pake hati meskipun kamu telah memilih pergi 🫶🏼",
    ],
    sender: "Tatwa Sukma",
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
      title: "Merry Christmas, I Miss You",
      artist: "Alex Crichton",
      duration: "3:15",
      src: "/audio/song/MerryChristmast.mp3",
      coverImage: "/albums/merry.webp",
      tag: "Side A • Indie",
      memoryText:
        "Makasih udah sempet bikin sg pake lagu ini, Jadinya setiap aku kangen aku tau harus playyy lagu apa hihi😋",
    },
    {
      id: "song-2",
      title: "Orang-Orang di Kerumunan",
      artist: "FSTVLST",
      duration: "4:20",
      src: "/audio/song/OODK.mp3",
      coverImage: "/albums/OODK.webp",
      tag: "Side B • Rock",
      memoryText:
        "Makasih udah ngenalin aku sama festivalist terkhusus OODK, Jadinya setiap aku lagi cape ada lagu membara yg bisa aku repeat... HONG!!! 👊🏽",
    },
    {
      id: "song-3",
      title: "Remaja",
      artist: "HIVI!",
      duration: "3:40",
      src: "/audio/song/Remaja.mp3",
      coverImage: "/albums/remaja.webp",
      tag: "Side A • Pop",
      memoryText:
        "Makasih udah mau dengerin HIVI sama aku keliling bandung malam itu after rain meskipun tws sebelah²😭",
    },
  ],

  // 4. Segmen 3: Tumpukan Memori (Polaroid Interaktif)
  polaroids: [
    {
      id: "photo-1",
      src: "/polaroids/1.webp",
      title: "My favorite photo",
      frontCaption: "My favorite photo",
      backNote:
        "Sumpaahhh kamu disini shining bgtt dan cantik bgt, dan untuk mendapatkan fotonyaa aku harus membujuk kamu berkali² 🙄🙄wkwkwkw",
      rotation: -3,
    },
    {
      id: "photo-2",
      src: "/polaroids/2.webp",
      title: "simple but cute",
      frontCaption: "simple but cute",
      backNote:
        "Kalooo ini aku asal cekrek sebenernyaa😋, pas kamu lagi rapihin kalung kamu di aku...tapi  tingkat kelucuan fotonya 100%😉",
      rotation: 2,
    },
    {
      id: "photo-3",
      src: "/polaroids/3.webp",
      title: "Beautiful eyes",
      frontCaption: "Beautiful eyes",
      backNote:
        "Di fotoo ini yang keliatann cuma mataa kamuu, tapi justru ituu mewakili pesona kecantikan kamuu eakkk... lampu merah kala itu 😋",
      rotation: -1,
    },
    {
      id: "photo-4",
      src: "/polaroids/4.webp",
      title: "a lovely smile",
      frontCaption: "a lovely smile",
      backNote:
        "Salah satu foto yang aku suka juga nih... padahal aku asal paparazi tapi komuk kamu malah maniss bgt ih🫣",
      rotation: 2.5,
    },
    {
      id: "photo-5",
      src: "/polaroids/5.webp",
      title: "I like your red outfit",
      frontCaption: "I like your red outfit",
      backNote:
        "Si merah dengan tingkahnya, padahal cuma cardigan tapi kalo kamu yang make jadi special duper  cardigan🫠",
      rotation: -2,
    },
  ],

  // 5. Segmen 4: Kamus Bahasa Kita (Inside Jokes)
  dictionary: [
    {
      word: "Mukjek",
      phonetic: "/muk·jek/",
      type: "ungkapan / kode rahasia",
      definition:
        "Bahasa rahasia yang biasa kita ucapin kalau lagi asyik ngegibahin hal random di sekitar kita hehe.",
      example:
        "Diba: 'eh itu itu wa ada orang' — Tatwa: 'ihh mukjek anying' — Diba: 'tertawa dan menutup mulut'",
      secretFootnote:
        "kalo kata mukjek udah keluar berarti kita lagi mode tengil tengilnya. 😂🤫",
    },
    {
      word: "Mam",
      phonetic: "/maaam/",
      type: "verba / sinyal manja",
      definition:
        "Kata sakti yang mendadak keluar kalau Adiba lagi laper parah dan kangen, biasanya diiringi nada manja.",
      example:
        "Diba: 'mau mammm dimana' — Tatwa: 'sate pengkolan ga siii' 🍜",
      secretFootnote:
        "Kalau kata 'mam' udah keluar dengan nada gemasnya, artinya Tatwa harus nyediaiin tempat sebelum cemberutnya makin bertambah. 😋🍽️",
    },
    {
      word: "Achuuu",
      phonetic: "/a·chuuu/",
      type: "partikel afeksi / imbuhan eksklusif",
      definition:
        "Imbuhan penutup kalimat paling istimewa yang cuma boleh dan cuma pernah dipakai kalau lagi sama kamu.",
      example:
        "Diba: 'eh wa tau ga sii, bunda achuuu ngajakin ke singapur' — Tatwa: 'ih kayaaaa' — Diba: 'iyalaaa orang bunda achuuu' —",
      secretFootnote:
        "pokoknya kalau imbuhan itu udah keluar, artinya hal itu udah jadi kepemilikanmu.....",
    },
  ],

  // 6. Segmen 5: Hal-hal Kecil yang Aku Kangenin dari Kamu (Kaca Berembun)
  foggyGlass: [
    {
      id: "fog-1",
      title: "Hal Kecil #1",
      hiddenText:
        "Caraaa kamu manggil nama akuu \" Awaaaa... awaaaa. \" yg dipanggil badan yg nengok hati tauuu",
    },
    {
      id: "fog-2",
      title: "Hal Kecil #2",
      hiddenText:
        "Caraa kamu nyeritaun sesuatu... dari hening tiba² excited seketika dan langsung ngelirik dgn tatapan sinis namun lucukkk",
    },
    {
      id: "fog-3",
      title: "Hal Kecil #3",
      hiddenText:
        "Cara kamuu ngambekk, tiba tiba geser duduknyaa dan reflek nyubitt akuuu... sakit sih tapi canduu",
    },
    {
      id: "fog-4",
      title: "Hal Kecil #4",
      hiddenText:
        "aku paling suka kalo kamuu menggunakan bahasa bayikkk... contohh \" ih mayah mayah\"",
    },
  ],

  // 7. Segmen 6: Rekaman Tawa & Tanya (Voice Notes Asli & Balasan Tatwa)
  voiceNotes: [
    {
      id: "vn-1",
      sender: "Adiba",
      src: "/audio/vn/1.mp3",
      duration: "0:09",
      durationSeconds: 9,
      transcript:
        "iyaaaa gapapaaa siapa yang mayah si sakdakdalwkdad (salting)",
      tatwaReply:
        "hahaha saltingnya kedengeran banget sampe ngelantur gitu ngomongnya 😆 gemes bgt sih...",
    },
    {
      id: "vn-2",
      sender: "Adiba",
      src: "/audio/vn/2.mp3",
      duration: "0:03",
      durationSeconds: 3,
      transcript:
        "awaaaaaaaaaa......tolong (mau cerita sesuatu)",
      tatwaReply:
        "panik bgt manggilnya ada apa siii bocil... pasti ada gosip kampus atau drama baru kan? 🤣",
    },
    {
      id: "vn-3",
      sender: "Adiba",
      src: "/audio/vn/3.mp3",
      duration: "0:09",
      durationSeconds: 9,
      transcript:
        "masa aku pas pulang kan lapar banget trus pusing trus aduh kepala aku kaya di bekep AAAAAAA.....",
      tatwaReply:
        "kebiasaan deh telat makan! kan udah dibilang perutnya jangan dibiarin kosong, langsung lemes kan jadinya 🥺🍲",
    },
    {
      id: "vn-4",
      sender: "Adiba",
      src: "/audio/vn/4.mp3",
      duration: "0:07",
      durationSeconds: 7,
      transcript:
        "ihiihahaaahadi oiya kah ahiiahha (cekikikan)",
      tatwaReply:
        "ketawanya nular bgt tolong wkwkwk... tawa lepas kamu ini yang paling mahal tauu ✨",
    },
    {
      id: "vn-5",
      sender: "Adiba",
      src: "/audio/vn/5.mp3",
      duration: "0:07",
      durationSeconds: 7,
      transcript:
        "awaa masa naju gamau pulangin aku lagi besok karena dia gaada kelas nanti dipulangin hari minggu ihhhh",
      tatwaReply:
        "wkwkwk kasian bgt dioper-oper naju 😂 yauda sabar yaa, nanti aku yang nemenin ngobrol terus kok.",
    },
    {
      id: "vn-6",
      sender: "Adiba",
      src: "/audio/vn/6.mp3",
      duration: "0:07",
      durationSeconds: 7,
      transcript:
        "gantyiiii ga gantyiii nim guaaah (suara kesel imut)",
      tatwaReply:
        "gamauuu wleee 😜 lagian nim kamu udah terlanjur nempel di sec acc aku, biar inget terus wkwk",
    },
    {
      id: "vn-7",
      sender: "Adiba",
      src: "/audio/vn/7.mp3",
      duration: "0:04",
      durationSeconds: 4,
      transcript:
        "yaudaaa dehh, aku mau nonton ajaa (sebel dikit)",
      tatwaReply:
        "ngambek tipis nih ceritanyaa... nonton apa tuh? jangan lupa istirahat ya kesayangan Tatwa 🫶🏼",
    },
  ],

  // 8. Segmen 7: Rencana Tertunda (Wishlist Kertas Robek)
  wishlist: [
    {
      text: "Nonton festivalist Bareng",
      note: "Mungkin nanti kita bisa nyanyi GAS barengg huhu",
    },
    {
      text: "Photobooth Berdua",
      note: "Biar seluruh bandung tau kalo moment lucu kita perlu diabadikan",
    },
    {
      text: "Naik gunung Bareng",
      note: "Menikmati alam bersama kamu, soalnya alam sama kamu sama sama indah ",
    },
  ],

  // 9. Segmen 8: Penutup & Tiket Doa
  closing: {
    letter: {
      greeting: "Haiii lagiii... Cantikkkk",
      intro:
        "Lucu yaaa perjalananyaaa...\nOkeeee dari semuaaa itu ada 2 kata terakhir dari akuuu dibb",
      points: [
        {
          num: "1",
          title: "Makasih",
          body: "makasihhh atas semuaa kesempatan yg kamu kasih buat akuu, makasih atas waktu kamu pada saat kita masih barenggg, makasih atas hati kamuuu yg pada saat itu tulus di dekat akuuu dan aku rasakan ituuu🤍",
        },
        {
          num: "2",
          title: "Maaf",
          body: "Maafin awa dib atas segala sifattt kekanak kanakn nyaaa😔, maafin awa kalo kerjaannya mengeluh ke kamu dan ngeluarin sifat² clingy yg mungkin menyebalkan bagi kamuu🤕 dan maafin Tatwaaa yg terkadang tiba tiba serius membahas hubungann padahal waktunya ga tepattt.",
          subnote: "Oiyaaa satu kata lagi nih ya tambahan hehe... 🙃",
        },
        {
          num: "3",
          title: "Tolong",
          body: "Tolonggg jangan lupain aku ya adibaa, aku tauu temen kamu banyakkk... irpan, dipdut, bpkb, naju, ara, key, musang², bestie telkom dll, tapi please sisain sedikit ruang dihati kamuuu untuk akuu entah apapun itu statusnyaaa... aku masih sanggup dengerin omelan kamu tentang dunia kemakom dan perkuliahan aku masih sanggup dimintain anter jemput dimanapun itu dan aku masih sanggup nemenin makan kamuu...",
          outro:
            "Dah ah panjang² kaya bikin puisi ajee...\nAkuuu selalu berharap kamu dikelilingi orang² baik orang² tulus, orang² yg membahagiakan kamuuu... meskipun sekarang aku udah gada di dalamnya... 🫶🏼",
        },
      ],
      englishQuote:
        "I'll love you forever, with all my heart. i still remember the feeling i got when i first started talking to you, i was so excited, i don't even know how to tell you how much you mean to me, I'm so glad youre mine, i love you more than anything in this world, i can't believe i was able to find my love and best friend at the same, i love you so deeply, and I'l love you forever With all my heart..",
      signature: "-DukunPolban",
      previewText: "Haiii lagiii... Cantikkkk. Lucu yaaa perjalananyaaa...",
    },
    ticket: {
      passenger: "Adiba Askiyaa",
      classType: "First Class — Kehidupan Baru",
      flightNo: "PILKOM-2025",
      destination: "Masa Depan yang Cerah & Bahagia",
      seat: "No. 1 di Ceritamu Sendiri",
      validity: "Valid Selamanya",
    },
    prayer:
      "Semoga kuliahmu selalu lancar di Pilkom 25, langkahmu dipermudah, dan kamu selalu dikelilingi orang-orang yang tulus menyayangimu.",
    finalSignoff: "Berbahagialah. — Tatwa",
  },
};
