/**
 * WEDDING INVITATION CONFIGURATION
 * All wedding details, couple information, events, story timeline, and gallery items
 * can be easily updated and customized in this single file.
 */

const WEDDING_CONFIG = {
  // Couple Information
  couple: {
    groom: {
      firstName: "Krishna",
      lastName: "Kumar",
      fullName: "Krishna Kumar",
      title: " Groom",
      parents: "Son of Smt. Sunita & Shri Rajendra Singhania",
      grandparents: "Grandson of Late Smt. Kamala & Late Shri Govind Singhania",
      bio: "An architect with a passion for heritage design and classical music, Krishna brings warmth, creativity, and steadfast love to every moment.",
      photo: "assets/images/groom_portrait.jpg",
      instagram: "krishna_singhania"
    },
    bride: {
      firstName: "Kuamri",
      lastName: "Muskan",
      fullName: "Muskan Kapoor",
      title: " Bride",
      parents: "Daughter of Smt. ANNU PRASAD & Shri UDAY SHANKAR PRASAD ",
      grandparents: "Granddaughter of LATE KAMINI DEVI & Late SHEO NANDAN PRASAD",
      bio: "An artistic soul and classical dancer with a radiant smile, Muskan turns every ordinary day into an extraordinary celebration of joy and grace.",
      photo: "assets/images/bride_portrait.jpg",
      instagram: "muskan_kapoor"
    },
    heroImage: "assets/images/couple_hero.jpg",
    hashtag: "#KrishnaKiMuskan",
    tagline: "Two Souls, One Royal Journey of Eternal Love",
    storyQuote: "In the sacred rhythm of destiny, two hearts beat together in unison to embark on the timeless voyage of togetherness."
  },

  // Background Music / Song Settings
  // Place your .mp3 / audio file in assets/audio/ or put an online audio URL
  // If audioUrl is empty or not found, it automatically plays the Royal Shehnai synthesizer
  music: {
    enabled: true,
    audioUrl: "assets/audio/jai_jai_ram.mp3",
    title: "Play Jai Jai Ram",
    playingTitle: "Pause Jai Jai Ram",
    volume: 0.8,
    loop: true
  },

  // Auspicious Dates & Countdown Target
  weddingDate: {
    displayDate: "Wednesday, 25th November 2026",
    displayTime: "07:00 PM Onwards (Shubh Muhurat)",
    targetIso: "2026-11-25T19:00:00+05:30", // For dynamic countdown
    muhurat: "Godhuli Bela | 07:15 PM to 09:30 PM",
    city: "Dhanbad, Jharkhand, India"
  },

  // Auspicious Shlokas & Blessings
  shlokas: [
    {
      sanskrit: "॥ ॐ श्री गणेशाय नमः ॥",
      transliteration: "Om Shree Ganeshay Namah",
      meaning: "Salutations to Lord Ganesha, the remover of obstacles and harbinger of auspicious beginnings."
    },
    {
      sanskrit: "मंगलम् भगवान विष्णुः मंगलम् गरुडध्वजः ।\nमंगलम् पुण्डरीकाक्षो मङ्गलाय तनो हरिः ॥",
      transliteration: "Mangalam Bhagwan Vishnuh, Mangalam Garudadhwajah",
      meaning: "May the divine grace of Lord Vishnu bestow eternal auspiciousness, peace, and prospering love."
    },
    {
      sanskrit: "धर्मे च अर्थे च कामे च नातिचरामि ॥",
      transliteration: "Dharme cha Arthe cha Kaame cha Naaticharaami",
      meaning: "In righteousness, in prosperity, and in love, I shall forever walk with you hand in hand."
    }
  ],

  // Wedding Events / Functions
  events: [
    {
      id: "haldi",
      name: "Haldi Ceremony",
      tagline: "Ubtan, Laughter & Golden Glow",
      date: "Tuesday, 24th December 2026",
      time: "10:00 AM - 01:00 PM",
      venue: "Sangli Resort, Near JIO Petrol PUMP, DHANBAD",
      address: "Sangli Resort, Near JIO Petrol PUMP, DHANBAD",
      dressCode: "Festive Yellow & Sunshine Pastels",
      description: "An auspicious morning bathed in golden turmeric pastes, marigold showers, fragrant rosewater, and joyful family banter.",
      icon: "sun",
      themeColor: "#E5A93B",
      googleMapsUrl: "https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur",
      calendarData: {
        title: "Haldi Ceremony - Krishna & Muskan Wedding",
        start: "20261124T100000",
        end: "20261124T130000",
        location: "Sangli Resort, Near JIO Petrol PUMP, DHANBAD"
      }
    },
    {
      id: "mehendi",
      name: "Mehendi & High Tea",
      tagline: "Intricate Henna, Folk Rhythms & Royal Flavors",
      date: "Monday, 24th December 2026",
      time: "04:00 PM - 07:30 PM",
      venue: "Sangli Resort, Near JIO Petrol PUMP, DHANBAD",
      address: "Sangli Resort, Near JIO Petrol PUMP, DHANBAD",
      dressCode: "Emerald Green, Mint & Floral Attire",
      description: "Adorning hands with exquisite fragrant henna motifs, live folk musicians, bangles stall, and lavish Rajasthani high-tea delicacies.",
      icon: "flower",
      themeColor: "#2D7F5E",
      googleMapsUrl: "https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur",
      calendarData: {
        title: "Mehendi Ceremony - Krishna & Muskan Wedding",
        start: "2026112411T160000",
        end: "20261124T193000",
        location: "Sangli Resort, Near JIO Petrol PUMP, DHANBAD"
      }
    },
    {
      id: "sangeet",
      name: "Royal Sangeet Night",
      tagline: "A Symphony of Beats, Glitz & Grand Performances",
      date: "Friday, 11th December 2026",
      time: "08:00 PM Onwards",
      venue: "Grand Chandra Mahal Ballroom",
      address: "The Oberoi Udaivilas, Udaipur",
      dressCode: "Glamorous Indowestern & Sparkly Lehengas",
      description: "An electrifying musical extravaganza featuring breathtaking family dance performances, DJ beats, signature royal cocktails, and gourmet dining.",
      icon: "music",
      themeColor: "#8B2671",
      googleMapsUrl: "https://maps.google.com/?q=The+Oberoi+Udaivilas+Udaipur",
      calendarData: {
        title: "Royal Sangeet - Krishna & Muskan Wedding",
        start: "20261211T200000",
        end: "20261212T010000",
        location: "Grand Chandra Mahal Ballroom, Udaivilas, Udaipur"
      }
    },
    {
      id: "wedding",
      name: "Baraat & Varmala & Pheras",
      tagline: "The Grand Royal Wedding Ceremony",
      date: "Saturday, 12th December 2026",
      time: "Baraat 04:30 PM | Varmala 06:30 PM | Pheras 07:15 PM",
      venue: "Lakeview Royal Mandap, Jagmandir Island Palace",
      address: "Pichola, Udaipur, Rajasthan 313001 (Boat transfer from jetty)",
      dressCode: "Royal Traditional (Ivory, Crimson, Maroons & Gold)",
      description: "The royal royal procession by royal boats, the garland exchange under floral fireworks, and the sacred 7 vows around the holy Agni.",
      icon: "sparkles",
      themeColor: "#8B1E2D",
      googleMapsUrl: "https://maps.google.com/?q=Jagmandir+Island+Palace+Udaipur",
      calendarData: {
        title: "Wedding Ceremony (Pheras) - Krishna & Muskan",
        start: "20261212T163000",
        end: "20261212T230000",
        location: "Lakeview Mandap, Jagmandir Palace, Udaipur"
      }
    },
    {
      id: "reception",
      name: "Grand Reception & Gala",
      tagline: "An Evening of Royal Feast, Toasts & Celebrations",
      date: "Sunday, 13th December 2026",
      time: "07:30 PM Onwards",
      venue: "Zenana Mahal Courtyard, City Palace",
      address: "Old City, Udaipur, Rajasthan 313001",
      dressCode: "Royal Black Tie / Tuxedos & Regal Sarees",
      description: "A majestic imperial banquet welcoming the newlyweds with candlelit crystal chandeliers, live symphony orchestra, and royal Rajasthani hospitality.",
      icon: "crown",
      themeColor: "#C59B27",
      googleMapsUrl: "https://maps.google.com/?q=City+Palace+Udaipur",
      calendarData: {
        title: "Grand Reception - Krishna & Muskan",
        start: "20261213T193000",
        end: "20261213T235900",
        location: "Zenana Mahal Courtyard, City Palace, Udaipur"
      }
    }
  ],

  // Love Story Timeline
  storyTimeline: [
    {
      year: "November 2022",
      title: "The Serendipitous Encounter",
      location: "Jaipur Literature & Arts Pavilion",
      description: "Across an ornate pavilion courtyard surrounded by havelis, a chance conversation over artisan Chai ignited an instant intellectual and soulful spark."
    },
    {
      year: "August 2023",
      title: "First Unforgettable Date",
      location: "Amber Fort Hilltop Cafe",
      description: "Under starry Rajasthan skies overlooking lit palace ramparts, hours vanished like seconds as they discovered shared dreams, music, and eternal ideals."
    },
    {
      year: "October 2024",
      title: "The Royal Sunset Proposal",
      location: "Lake Pichola Private Shikara",
      description: "As the sun set into shades of molten gold and amber over the lake, Krishna went down on one knee with an heirloom ring and asked the forever question."
    },
    {
      year: "February 2025",
      title: "Roka & Family Blessings",
      location: "Heritage Haveli, New Delhi",
      description: "Two venerable families united in laughter and sweets, sealing the auspicious bond of marriage with Vedic shlokas, warmth, and golden sweets."
    },
    {
      year: "December 2026",
      title: "Forever Begins Now",
      location: "Jagmandir Island Palace, Udaipur",
      description: "Taking the sacred 7 pheras around the holy fire, stepping hand-in-hand into a lifetime of cherished memories, shared journeys, and endless love."
    }
  ],

  // Photo Gallery
  gallery: [
    {
      src: "assets/images/couple_hero.jpg",
      caption: "Our Royal Pre-Wedding Portrait in Udaivilas Courtyard",
      category: "Pre-Wedding"
    },
    {
      src: "assets/images/gallery_prewedding.jpg",
      caption: "Golden Hour Stroll along the Palace Fountains",
      category: "Moments"
    },
    {
      src: "assets/images/bride_portrait.jpg",
      caption: "Muskan in her Royal Zardozi Bridal Finery",
      category: "Bridal"
    },
    {
      src: "assets/images/groom_portrait.jpg",
      caption: "Krishna in Imperial Ivory Sherwani with Emeralds",
      category: "Groom"
    },
    {
      src: "assets/images/gallery_mehendi.jpg",
      caption: "Joyous Mehendi Beats & Festive Marigold Laughter",
      category: "Festivities"
    },
    {
      src: "assets/images/gallery_mandap.jpg",
      caption: "The Enchanting Lakeside Floral Mandap Setup",
      category: "Decor"
    }
  ],

  // Family Lineage & Warm Welcomes
  families: {
    groomSide: {
      familyName: "The Singhania Family",
      title: "Groom's Family",
      elders: "With the loving blessings of Late Smt. Kamala & Late Shri Govind Singhania",
      parents: "Smt. Sunita & Shri Rajendra Singhania",
      siblings: "Rohan & Meera Singhania (Brother & Sister-in-law)",
      relatives: "All near and dear members of the Singhania & Verma families"
    },
    brideSide: {
      familyName: "The Kapoor Family",
      title: "Bride's Family",
      elders: "With the pious blessings of Smt. Shakuntala & Late Shri Harish Kapoor",
      parents: "Smt. Vandana & Shri Mahendra Kapoor",
      siblings: "Kabir Kapoor (Brother)",
      relatives: "All near and dear members of the Kapoor & Malhotra families"
    },
    message: "We cordially invite you and your family to grace the auspicious wedding ceremonies of our beloved children and bestow your heartfelt blessings upon the young couple as they start their new life together."
  },

  // Venue & Travel Information
  travelInfo: {
    airport: "Maharana Pratap Airport (UDR), Udaipur - 45 mins drive",
    railway: "Udaipur City Railway Station (UDZ) - 20 mins drive",
    hotelDesk: "Concierge & Guest Hospitality Desk available 24/7 at Udaivilas Lobby",
    contacts: [
      { name: "Rajesh Singhania (Guest Relations)", phone: "+91 98765 43210" },
      { name: "Vikram Kapoor (Logistics & Travel)", phone: "+91 98123 45678" }
    ]
  },

  // Default wishes for the live guestbook wall
  initialWishes: [
    {
      name: "Uncle Ramesh & Aarti Aunty",
      relation: "Family",
      message: "Wishing dearest Krishna & Muskan a lifetime filled with immense joy, prosperity, mutual respect, and unconditional love! God bless you both.",
      time: "2 hours ago"
    },
    {
      name: "Pooja & Siddharth",
      relation: "College Friends",
      message: "From college canteen debates to your royal wedding in Udaipur, what an incredible journey! Can't wait to dance our hearts out at the Sangeet!",
      time: "5 hours ago"
    },
    {
      name: "Dr. N. K. Malhotra",
      relation: "Family Well-wisher",
      message: "Heartiest congratulations to the Kapoor and Singhania families. May the Almighty shower everlasting happiness on the divine couple.",
      time: "1 day ago"
    }
  ]
};

// Export or expose globally
if (typeof module !== "undefined" && module.exports) {
  module.exports = WEDDING_CONFIG;
}
