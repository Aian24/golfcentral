export interface StaffMember {
  id: string;
  name: string;
  role: string;
  category: "Leadership & Editorial" | "Writers & Travel" | "Agronomy & Turf" | "PGA & Legacy";
  badge?: string;
  image: string;
  email?: string;
  quote?: string;
  highlights: string[];
  bio: string;
}

export interface MagazineIssue {
  volume: number;
  issue: number;
  title: string;
  theme: string;
  date: string;
  pageCount: number;
  coverImage: string;
  issuuUrl: string;
  features: string[];
  editorNote?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: "Course Architecture & Turf" | "Luxury Travel & Resorts" | "Tour & Competition" | "Lifestyle & Gear" | "Philanthropy & Military";
  departmentTag: string;
  author: {
    name: string;
    role: string;
  };
  publishedDate: string;
  readTime: string;
  audioDuration?: string;
  coverImage: string;
  imageCaption: string;
  excerpt: string;
  featured?: boolean;
  trending?: boolean;
  leadStory?: boolean;
  videoUrl?: string;
  content: {
    paragraphs: string[];
    pullQuote?: {
      quote: string;
      attribution: string;
    };
    subheading?: string;
    secondaryParagraphs?: string[];
  };
}

export const SITE_INFO = {
  name: "Golf Central Magazine",
  established: 1999,
  volume: 27,
  activeIssue: 6,
  season: "Summer Luxury Edition",
  location: "4313 Berwick Dr. Lake Wales, FL 33859",
  phone: "863-875-6863",
  email: "info@golfcentralmag.com",
  tagline: "The Voice of Golf in Florida & The Southeast Since 1999",
  officialLogo: "/images/official_logo_white.png",
  official25YearsBadge: "/images/official_25years.webp",
};

export const CURRENT_EDITION = {
  volume: 27,
  issue: 6,
  season: "Summer Luxury Edition",
  tagline: SITE_INFO.tagline,
  location: "Lake Wales, FL",
  temperature: "78°F",
  conditions: "Clear • Bermuda Greens Rolling at 12.5",
};

export const STAFF_MEMBERS: StaffMember[] = [
  {
    id: "terrie-purdum",
    name: "Terrie Purdum",
    role: "Founder & Publisher",
    category: "Leadership & Editorial",
    badge: "Founder • 1999",
    image: "/images/staff/terrie_purdum.jpg",
    email: "terrie@golfcentralmag.com",
    quote: "Growing the great game of golf, giving young and beginner golfers a sense of comfort on the course, and showing gratitude for our military heroes.",
    highlights: ["25+ Years Publishing", "PGA & GCSAA Media Partner", "Military Charity Champion"],
    bio: "Growing the great game of golf, giving young and beginner golfers a sense of comfort on the course. Publishing charity golf events, and giving sponsors the kick they deserve for participating in tournaments that make a difference, and change people's lives. Anything to support ANY Military golf events and, showing gratitude, for the men and women dedicated to serving our country. Making golf fun, being a rebel visionary with a very traditional game, and assisting the PGA and GCSAA in getting consumers educated in the ONLY regional Golf Magazine to survive in the South since 1999.",
  },
  {
    id: "shannon-coates",
    name: "Shannon Coates",
    role: "Editor-in-Chief",
    category: "Leadership & Editorial",
    badge: "Editor-in-Chief",
    image: "/images/staff/shannon_coates.jpg",
    email: "Shannon@golfcentralmag.com",
    quote: "A lifestyle brand saluting all things turf, whether you play on it, grow it, or mow it.",
    highlights: ["22+ Years with Golf Central", "Co-Founder TurfLife.club", "Oviedo Woman's Club"],
    bio: "Shannon Coates was born and raised in West Palm Beach, FL, and moved to Oviedo, FL 20 years ago. Wife to Kenny Coates and mother of Madison Coates, she spends most of her free time watching Madi play volleyball. In June 2002 she read a 'Help Wanted' ad in the newspaper and her fate was sealed with Terrie Purdum and Golf Central Magazine. In 2015 she helped Terrie launch www.turflife.club, a lifestyle brand saluting all things turf.",
  },
  {
    id: "melahn-cable",
    name: "Melahn Cable",
    role: "Art Director & Graphic Designer",
    category: "Leadership & Editorial",
    badge: "Creative Lead",
    image: "/images/staff/melahn_cable.webp",
    quote: "Creative design rooted in passion for visual storytelling and Central Florida culture.",
    highlights: ["25+ Years Graphic Design", "Orlando Native & UCF Alum", "Creative Writer & Musician"],
    bio: "Melahn was born in Orlando (a true native!), grew up in College Park, and has remained in the Central Florida area her entire life. She has been a professional Graphic Designer for over 25 years. Melahn's interests range from horses to photography and quilting, and she can often be seen on weekends onstage singing with local bands. Melahn is also an avid reader and creative writer.",
  },
  {
    id: "tony-leodora",
    name: "Tony Leodora",
    role: "Award-Winning Columnist & TV Host",
    category: "Writers & Travel",
    badge: "TV Host & Columnist",
    image: "/images/staff/tony_leodora.webp",
    quote: "Closing in on playing his 1,000th golf course — with the scorecard from every single one.",
    highlights: ["Host of The Traveling Golfer", "Played Over 1,000 Courses", "Arnold Palmer Collaborator"],
    bio: "Throughout a long journalistic career, Tony Leodora has been a national award-winner at every level as a newspaper columnist, golf magazine writer, columnist, editor, syndicated radio show host, and host of the award-winning Traveling Golfer TV show. Living in Nokomis, Florida, his love of golf architecture has led him to work closely with architects Arnold Palmer, Tom Fazio, Rees Jones, Ron Garl, and Dr. Michael Hurdzan.",
  },
  {
    id: "jay-golden",
    name: "Jay Golden, PGA",
    role: "PGA Professional & Contributing Writer",
    category: "PGA & Legacy",
    badge: "PGA Professional",
    image: "/images/staff/jay_golden.jpg",
    quote: "I hope to ignite an interest for you to combine YOUR interests, hobbies and skills with golf to enhance your enjoyment of the game.",
    highlights: ["PGA Teaching Professional", "GolfWorld Renaissance Man", "Author & Trick-Shot Artist"],
    bio: "Jay Golden, PGA, has taught and coached golfers from every age group and skill level ranging from children to Tour Players with one constant goal: TO SHOOT LOW SCORES. GolfWorld Magazine coined the title 'Jay Golden: Golf's True Renaissance Man' (now on Golf Digest) celebrating his unique combination of humor, art, poems, songs, trick-shot shows, screenplays, books, and videos.",
  },
  {
    id: "mike-may",
    name: "Mike May",
    role: "Freelance Golf Writer & Travel Correspondent",
    category: "Writers & Travel",
    badge: "GWAA Golf Writer",
    image: "/images/staff/mike_may.webp",
    email: "mmaymarketing@gmail.com",
    quote: "Tracing a lifelong passion for golf journalism back to the 1983 Open Championship at Royal Birkdale.",
    highlights: ["Indiana Golf Journal Editor", "GWAA & Univ of Florida Alum", "LPGA Scoring Division Lead"],
    bio: "Mike May is a freelance golf writer based in Wellington, Florida. Mike is the editor-in-chief of the Indiana Golf Journal, a correspondent for Golf Central Magazine, a senior writer for Team Insight Magazine, and a contributor to Midwest Golfing Magazine. A 1985 University of Florida graduate and GWAA member, Mike also works in the scoring division of R2 Innovative Technologies overseeing LPGA scoring.",
  },
  {
    id: "anthony-williams",
    name: "Anthony Williams, CGCS, CGM, MG",
    role: "Regional Director of Agronomy & Contributor",
    category: "Agronomy & Turf",
    badge: "GCSAA Triple Crown",
    image: "/images/staff/anthony_williams.webp",
    quote: "Environmental stewardship and agronomic excellence form the beating heart of championship golf.",
    highlights: ["38-Year Industry Veteran", "Regional Director of Agronomy", "GCSAA Environmental Leader"],
    bio: "Anthony L. Williams, CGCS, CGM, MG is a 38-year veteran of the golf/green industry working for world class brands such as Marriott, Renaissance, TPC and Four Seasons. Currently Regional Director of Agronomy for Invited Clubs based in Dallas, Texas. Accolades include GCSAA Environmental Leaders in Golf Awards Triple Crown and the President's Award for Environmental Stewardship.",
  },
  {
    id: "greg-corbo",
    name: "Greg Corbo",
    role: "Contributing Editor & Photojournalist",
    category: "Leadership & Editorial",
    badge: "Photojournalist",
    image: "/images/staff/greg_corbo.jpeg",
    quote: "Honor victims and celebrate the fraternity of caddies on prestigious courses from Florida to the Northeast.",
    highlights: ["Managing Editor in FGCM Year 1", "911 Memorial Caddie Walk", "Baltusrol & Lancaster Caddie"],
    bio: "Prior to graduating the Golf Academy of America (Orlando, 1999), Greg joined Florida Golf Central Magazine where he served as Managing Editor. His photojournalism career earned Press Association awards at The Daily Southerner and The Montclair Times. Greg remains active as a professional caddie at Baltusrol and Lancaster Country Club, and founded the annual 911 Be A Hero For Zero Memorial Caddie Walk.",
  },
  {
    id: "gerald-white",
    name: "Gerald White",
    role: "Contributing Writer & Columnist",
    category: "Writers & Travel",
    badge: "NFL Veteran & Author",
    image: "/images/staff/gerald_white.jpg",
    quote: "From Us, Forward: It Starts at Home and Shapes Everything.",
    highlights: ["Dallas Cowboys & Dolphins", "Author: From Us, Forward", "Founder Native Blue Bourbon"],
    bio: "Gerald White is a contributing writer for Golf Central Magazine, author, entrepreneur, and lifelong advocate for youth and community development. A former running back at the University of Michigan, Gerald played in the NFL with the Dallas Cowboys and Miami Dolphins. He is the author of 'From Us, Forward: It Starts at Home and Shapes Everything' and founder of Native Blue Bourbon in Titusville, Florida.",
  },
  {
    id: "joel-jackson",
    name: "Joel D. Jackson, CGCS Retired",
    role: "Agronomy & Turfgrass Editor",
    category: "Agronomy & Turf",
    badge: "Florida GCSA Legend",
    image: "/images/staff/joel_jackson.jpg",
    quote: "The turf speaks to you every morning at dawn. If you listen before the sun hits the dew, you build courses that endure.",
    highlights: ["20-Yr Walt Disney World Supt", "Arnold Palmer Isleworth G&CC", "Florida GCSA Exec Director"],
    bio: "Joel D. Jackson, CGCS Retired, was born and raised in Tampa, FL, graduated USF in 1964, and served as a U.S. Coast Guard Officer. His 40+ year agronomic career includes 20 years with Walt Disney World managing Osprey Ridge and Magnolia courses, collaborating with Arnold Palmer on Isleworth G&CC, and serving as Executive Director of the Florida GCSA and editor of Florida Green magazine.",
  },
  {
    id: "dave-finn",
    name: "Dave Finn",
    role: "Golf Travel Writer & Photographer",
    category: "Writers & Travel",
    badge: "Travel Photojournalist",
    image: "/images/staff/dave_finn.jpg",
    quote: "Exploring championship fairways across 24 countries with camera in hand and hickory in play.",
    highlights: ["35+ Years in Golf Travel", "World Hickory Gold Medalist", "Visited 24 Countries"],
    bio: "Dave Finn is a freelance golf travel writer and photographer based near Toronto with over 35 years in the golf business as founder of Golfinn International and travelinggolfer.net. Dave has covered golf destinations across 9 Canadian provinces, 15 US States, and 24 countries, is an Ambassador for Leading Courses, and won the gold medal in the Stableford Division at the World Hickory Open in Scotland.",
  },
  {
    id: "rick-harris",
    name: "Rick Harris",
    role: "In Loving Memory • Senior Columnist",
    category: "PGA & Legacy",
    badge: "USMC Veteran • Legacy",
    image: "/images/staff/rick_harris.jpg",
    quote: "A lifetime dedicated to service in the Marine Corps, youth education, and over 24 years with Golf Central.",
    highlights: ["Korean War Veteran & USMC", "FGCM Writer Since 2000", "Ventura & SAGA Golf Founder"],
    bio: "Rick Harris was born in White Plains, NY in 1930, served in the U.S. Marine Corps during the Korean War, and graduated from the University of Florida in 1956 before earning two master's degrees. He started the Ventura Golf Association and Senior Amateur Golfers Association in Orlando, and contributed to Florida Golf Central Magazine for over 24 years under publisher Terrie Purdum.",
  },
  {
    id: "bill-filson",
    name: "Bill Filson, PGA",
    role: "PGA Professional of the Year • Contributor",
    category: "PGA & Legacy",
    badge: "PGA Pro of the Year",
    image: "/images/staff/bill_filson.jpg",
    quote: "Sharing the wisdom of the professional game to make every golfer's swing more pure.",
    highlights: ["PGA Golf Pro of the Year", "Royal St. Cloud Golf Links", "Decades of PGA Leadership"],
    bio: "Bill Filson is a highly distinguished PGA Golf Professional who was awarded PGA Golf Professional of the Year. Based at Royal St. Cloud Golf Links, Bill brings deep tournament acumen, professional swing mechanics, and course management insights to golfers throughout Florida and the Southeast through Golf Central Magazine.",
  },
];

export const EXACT_ISSUES: MagazineIssue[] = [
  {
    volume: 27,
    issue: 6,
    title: "Volume 27 Issue 6",
    theme: "Championship Architecture & Coastal Luxury",
    date: "June 2024",
    pageCount: 84,
    coverImage: "/images/cover_v27_i6.jpg",
    issuuUrl: "https://issuu.com/editorinchief/docs/golf_central_magazine_vol_27_issue_6_ezine?fr=sOGJhZjkzMjg3MDc",
    features: [
      "The Architecture of Whispering Pines: Designing Florida's Coastal Sanctuary",
      "Agronomy: The Masters Conditioning Protocol for Southern Turf",
      "Caribbean Luxury: Baha Mar Royal Blue Jack Nicklaus Course",
      "Civilion Brand: Modern Golf Style & Sartorial Performance",
    ],
  },
  {
    volume: 27,
    issue: 4,
    title: "Volume 27 Issue 4",
    theme: "Spring Championship & Florida Tour Preview",
    date: "April 2024",
    pageCount: 78,
    coverImage: "/images/cover_v27_i4.webp",
    issuuUrl: "https://issuu.com/editorinchief/docs/golf_central_magazine-_vol_27_issue_5_ezine?fr=sN2JmMjkzMTA3Mjc",
    features: [
      "Florida Junior Amateur Spotlight: Rising Phenoms",
      "The Bear Trap to Copperhead: Surviving the Florida Swing",
      "Turfgrass Science: Zoysia vs Bermudagrass in Tropical Climates",
      "Clubhouse Dining: Smoked Bourbons and Coastal Seafood",
    ],
  },
  {
    volume: 27,
    issue: 3,
    title: "Volume 27 Issue 3",
    theme: "Plantation Bay & Clubhouse Essentials",
    date: "March 2024",
    pageCount: 72,
    coverImage: "/images/cover_v27_i3.jpg",
    issuuUrl: "https://issuu.com/editorinchief/docs/golf_central_mag-_vol_27_issue_3-_plantation_bay",
    features: [
      "Plantation Bay's New Era: Inside the 45-Hole Masterpiece",
      "GCSAA Innovation Awards: Water Stewardship Pioneers",
      "The Southern Championship Preview",
      "Bespoke Clubmaking: Forged Irons for Pure Ball-Strikers",
    ],
  },
  {
    volume: 27,
    issue: 2,
    title: "Volume 27 Issue 2",
    theme: "Hammock Beach Ocean Course Revival",
    date: "February 2024",
    pageCount: 76,
    coverImage: "/images/cover_v27_i2.jpg",
    issuuUrl: "https://issuu.com/editorinchief/docs/golf_central_magazine-vol_27_issue_2-hammock_beach",
    features: [
      "Hammock Beach Ocean Course: A Legendary Seaside Restoration",
      "The Caribbean Circuit: Nassau to Cable Beach",
      "Modern Clubhouse Craft: The Architectural Evolution of the 19th Hole",
      "Military Golf Honors: PGA HOPE Changes Lives on the Links",
    ],
  },
  {
    volume: 27,
    issue: 1,
    title: "Volume 27 Issue 1",
    theme: "Rumbling Bald: Mountain & Lake Golf",
    date: "January 2024",
    pageCount: 68,
    coverImage: "/images/cover_v27_i1.jpg",
    issuuUrl: "https://issuu.com/editorinchief/docs/golf_central_mag-vol_27_issue_1-rumbling_bald",
    features: [
      "Rumbling Bald: Golf Among the Mountain Pines",
      "Jack Nicklaus Signature Architecture in the Bahamas",
      "The Master Greenkeepers: The Dedication Behind Elite Courses",
      "PGA Merchandise Show 2024: The Future of Golf Gear",
    ],
  },
  {
    volume: 26,
    issue: 12,
    title: "Volume 26 Issue 12",
    theme: "Baha Mar Royal Blue Special",
    date: "December 2023",
    pageCount: 76,
    coverImage: "/images/cover_v26_i12.jpg",
    issuuUrl: "https://issuu.com/editorinchief/docs/golf_central_magazine-vol_26_issue_12_baha_mar",
    features: [
      "Baha Mar: Luxury, Golf & Island Vibes in Nassau",
      "Year in Review: Florida's Top 25 Courses to Play in 2024",
      "Superintendent Awards: The Keepers of the Green",
      "Holiday Luxury Gift Guide for the Discerning Golfer",
    ],
  },
  {
    volume: 26,
    issue: 11,
    title: "Volume 26 Issue 11",
    theme: "Autumn Ezine Edition",
    date: "November 2023",
    pageCount: 64,
    coverImage: "/images/cover_v26_i11.jpg",
    issuuUrl: "https://issuu.com/editorinchief/docs/golf_central_mag-vol_26_issue_11_-_ezine",
    features: [
      "Central Florida Golf Trail: Hidden Gems and Championship Tracks",
      "Military Veteran Golf: The Annual Florida Invitational",
      "Course Agronomy: Winter Overseeding Protocols",
      "Apparel Spotlight: Cashmere and Performance Polos",
    ],
  },
  {
    volume: 26,
    issue: 8,
    title: "Volume 26 Issue 8",
    theme: "Shot Scope & Performance Tech Special",
    date: "August 2023",
    pageCount: 68,
    coverImage: "/images/cover_v26_i8.jpg",
    issuuUrl: "https://issuu.com/editorinchief/docs/golf_central_mag-vol_26_issue_8",
    features: [
      "Shot Scope Laser & GPS: How Data Science Shapes Course Strategy",
      "Summer Resort Escapes: Florida's Best Stay & Play Packages",
      "PGA HOPE Veterans Clinic at Streamsong",
      "Turfgrass Management During Extreme Florida Heat",
    ],
  },
];

export const MAGAZINE_ISSUES = EXACT_ISSUES;

export const ADVERTISING_PACKAGES = [
  {
    name: "Full Page Premium Spread",
    dimensions: "8.375\" x 10.875\" (Trim)",
    bleed: "8.625\" x 11.125\" (0.125\" Bleed)",
    format: "High-Resolution PDF/X-1a, 300 DPI, CMYK",
    placement: "Inside Front Cover, Opposite Table of Contents, or Feature Open",
    reach: "Print distribution across private clubs + 35,000+ Digital Ezine readers",
    popular: true,
  },
  {
    name: "Two-Page Editorial Spread",
    dimensions: "16.75\" x 10.875\" (Trim)",
    bleed: "17.00\" x 11.125\" (0.125\" Bleed)",
    format: "High-Resolution PDF/X-1a, 300 DPI, CMYK",
    placement: "Centerfold or Premium Department Lead",
    reach: "Maximum brand prominence, luxury visual storytelling, digital clickable links",
    popular: false,
  },
  {
    name: "1/2 Page Horizontal",
    dimensions: "7.375\" x 4.875\"",
    bleed: "Non-bleed placement",
    format: "300 DPI, CMYK, Press-Optimized PDF",
    placement: "Resort Directory, Travel Showcase, or Gear Guide",
    reach: "Targeted visibility for equipment makers, apparel, and tournaments",
    popular: false,
  },
  {
    name: "1/4 Page Directory & Showcase",
    dimensions: "3.562\" x 4.875\"",
    bleed: "Non-bleed placement",
    format: "300 DPI, CMYK, Press-Optimized PDF",
    placement: "Florida Golf Trail & Classified Directory",
    reach: "Cost-effective presence for local tournaments, charity events, and club fittings",
    popular: false,
  },
];

export const ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "architecture-whispering-pines-sanctuary",
    title: "The Architecture of Whispering Pines: Designing Florida's Modern Coastal Sanctuary",
    subtitle: "How master architects are harmonizing unforgiving water hazards, native pine scrub, and velvet Bermuda turf into an unforgettable championship test.",
    category: "Course Architecture & Turf",
    departmentTag: "COVER STORY // ARCHITECTURE",
    author: {
      name: "Terrie Purdum & Rees Jones Studio",
      role: "Publisher & Guest Contributor",
    },
    publishedDate: "June 2024",
    readTime: "6 min read",
    coverImage: "/images/hero_golf_championship.jpg",
    imageCaption: "Dawn mist rising over the 16th fairway at Whispering Pines, where sculpted bunkers mirror natural coquina limestone contours.",
    leadStory: true,
    featured: true,
    trending: true,
    excerpt:
      "In the heart of Central Florida's ridge corridor, a reimagined sanctuary demonstrates how modern course architecture can honor environmental conservation while demanding shot-making courage.",
    content: {
      paragraphs: [
        "In the tranquil pre-dawn mist of Lake Wales and the surrounding Central Florida sandhills, the early light catches the dew-drenched ribbon of the 16th fairway. To the casual eye, it is simply a sublime visual poem. To the golf course architect and the dedicated greenkeeping crew, it represents an engineering marvel where drainage, native sand dunes, and drought-tolerant turfgrass exist in delicate equilibrium.",
        "For more than a century, Florida course design frequently swung between extremes: flat, uninspired residential routing on the one hand, and artificially mounded, water-saturated penal tracks on the other. Whispering Pines departs boldly from both paradigms.",
        "By allowing the native scrub pine, natural coquina limestone pockets, and indigenous palmettos to dictate the corridors, the course challenges players through sightline manipulation, dynamic green contouring, and multi-option angles of attack.",
      ],
      pullQuote: {
        quote: "True architectural greatness in golf is never about brute length. It is about presenting a visual dilemma on the tee that whispers caution to the mind while tempting the daring heart.",
        attribution: "Rees Jones, Master Golf Course Architect",
      },
      subheading: "Agronomic Resilience in the Southern Subtropics",
      secondaryParagraphs: [
        "Behind every great architectural vision stands the golf course superintendent. At Whispering Pines, the deployment of TifTuf Bermudagrass fairways paired with TifEagle ultra-dwarf greens has slashed water consumption by 38 percent while maintaining championship stimpmeter speeds of 12.5 throughout the scorching summer months.",
      ],
    },
  },
  {
    id: "art-2",
    slug: "masters-protocol-superintendents-agronomy",
    title: "The Masters Protocol: What Florida Superintendents Learn from Augusta's Agronomy Secrets",
    subtitle: "Inside the high-precision science, sub-air systems, and soil biology that maintain the most pristine putting greens in the world.",
    category: "Course Architecture & Turf",
    departmentTag: "AGRONOMY // GCSAA PARTNERSHIP",
    author: {
      name: "Joel D. Jackson, CGCS Retired",
      role: "Agronomy Editor • Former Disney Superintendent",
    },
    publishedDate: "June 2024",
    readTime: "5 min read",
    coverImage: "/images/turf_agronomy_green.jpg",
    imageCaption: "A master superintendent utilizing moisture probe refractometry at sunrise to regulate root-zone oxygenation.",
    featured: true,
    trending: true,
    excerpt:
      "From root-zone moisture meters to automated sub-surface air induction, Florida greenkeepers are adapting elite tournament science to triumph over subtropical humidity.",
    content: {
      paragraphs: [
        "Every April, millions of golf fans marvel at the neon-green emerald tapestry of Augusta National. But for the members of the Golf Course Superintendents Association of America (GCSAA), the broadcast is not just entertainment—it is an agronomic masterclass.",
        "In Florida, where unrelenting humidity, intense ultraviolet radiation, and nematode pressures test the mettle of even the most experienced turf managers, adapting these elite protocols has become both an art and an exacting science.",
      ],
      pullQuote: {
        quote: "The turf speaks to you every morning at dawn. If you don't listen with your eyes and your diagnostic instruments before the sun hits the dew, the afternoon heat will deliver an unforgiving verdict.",
        attribution: "Joel D. Jackson, CGCS Retired",
      },
    },
  },
  {
    id: "art-3",
    slug: "oceans-edge-hammock-beach-baha-mar-renaissance",
    title: "Ocean's Edge: Inside Hammock Beach & Baha Mar's Luxury Renaissance",
    subtitle: "From the Atlantic bluffs of Palm Coast to Nassau's turquoise shores, coastal golf has entered an era of unprecedented luxury.",
    category: "Luxury Travel & Resorts",
    departmentTag: "TRAVEL // RESORT SPOTLIGHT",
    author: {
      name: "Dave Finn",
      role: "Travel Writer & Leading Courses Ambassador",
    },
    publishedDate: "May 2024",
    readTime: "7 min read",
    coverImage: "/images/coastal_golf_resort.jpg",
    imageCaption: "The dramatic 17th green on the Atlantic ocean cliffs at Hammock Beach, where ocean spray meets manicured paspalum turf.",
    featured: true,
    trending: false,
    excerpt:
      "Playing golf with salt spray in the air and the roar of Atlantic surf underfoot is an irreplaceable thrill. Here is how two iconic seaside destinations elevated hospitality to five-star heights.",
    content: {
      paragraphs: [
        "There is something primordial about hitting an iron shot directly over crashing Atlantic surf. At Hammock Beach Golf Resort & Spa in Palm Coast, Florida, the Jack Nicklaus-designed Ocean Course features six holes running directly along the oceanfront, concluding with the formidable 'Bear Claw'—a closing stretch that tests both nerves and ball trajectory.",
        "Meanwhile, a short 50-minute flight across the Gulf Stream brings you to the Royal Blue Golf Club at Baha Mar in Nassau. Here, Jack Nicklaus created two distinct nine-hole experiences: front-nine fairways winding through rolling dunes, followed by a dramatic back nine carved into limestone moonscapes.",
      ],
    },
  },
  {
    id: "art-4",
    slug: "beyond-the-fairway-bespoke-leather-forged-craft",
    title: "Beyond the Fairway: Bespoke Leather, Forged Blades & Modern Clubhouse Living",
    subtitle: "The renaissance of artisan golf goods: why purists are embracing hand-stitched leather, tailored apparel, and craft spirits.",
    category: "Lifestyle & Gear",
    departmentTag: "LIFESTYLE // CIVILION BRAND",
    author: {
      name: "Gerald White",
      role: "Contributing Columnist • Native Blue Bourbon Founder",
    },
    publishedDate: "May 2024",
    readTime: "4 min read",
    coverImage: "/images/golf_lifestyle_craft.jpg",
    imageCaption: "Hand-finished saddle leather tour bags, forged carbon steel irons, and artisanal clubhouse bourbon.",
    featured: true,
    trending: true,
    excerpt:
      "From heritage Italian calfskin golf bags to buttery cashmere layers and custom-milled putters, golf style has returned to its dignified, heirloom roots.",
    content: {
      paragraphs: [
        "For decades, the golf equipment market was consumed by technological hyperbole: bigger clubheads, neon-colored shafts, and nylon bags plastered with loud corporate logos. But a profound cultural shift has taken hold in the clubhouses from Jupiter Island to Ponte Vedra.",
        "Golfers who appreciate craft and authenticity are turning to bespoke makers: bags crafted from vegetable-tanned steer hide that patina gracefully with age; hand-ground muscle-back irons; and tailored apparel that transitions effortlessly from the 18th green to fine dining.",
      ],
    },
  },
  {
    id: "art-5",
    slug: "honor-on-the-links-florida-military-charity",
    title: "Honor on the Links: How Florida Charity Tournaments & PGA HOPE Change Veteran Lives",
    subtitle: "For 25 years, Golf Central Magazine has championed the military heroes who find healing, brotherhood, and renewal through the game.",
    category: "Philanthropy & Military",
    departmentTag: "PHILANTHROPY // VETERANS",
    author: {
      name: "Terrie Purdum & Rick Harris",
      role: "Publisher & Korean War Veteran Columnist",
    },
    publishedDate: "May 2024",
    readTime: "5 min read",
    coverImage: "/images/military_golf_charity.jpg",
    imageCaption: "PGA HOPE participant and combat veteran standing tall on the 18th green at the annual Florida Military Invitational.",
    featured: true,
    trending: false,
    excerpt:
      "Golf has an extraordinary therapeutic power. Through initiatives like PGA HOPE and Folds of Honor, wounded warriors and combat veterans are rediscovering confidence and community on Florida's fairways.",
    content: {
      paragraphs: [
        "When I founded Golf Central Magazine over twenty-five years ago, I made a solemn pledge: our publication would not simply celebrate professional trophies and luxury resorts. We would use our platform to shine an unwavering spotlight on the charitable golf tournaments that change lives, and above all, to honor the courageous men and women of our United States Armed Forces.",
        "Over the past quarter-century, we have covered hundreds of military golf invitationals across Florida—from MacDill AFB in Tampa to NAS Pensacola, and private clubs from Orlando to Naples that open their gates for our veterans.",
      ],
      pullQuote: {
        quote: "Out on the course, with a club in my hand and fellow veterans by my side, the noise of combat and trauma finally goes quiet. Golf gave me my life back.",
        attribution: "Staff Sergeant Marcus Vance, USMC Combat Veteran",
      },
    },
  },
];
