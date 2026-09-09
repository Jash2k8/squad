export type SectionId =
  | "home"
  | "about"
  | "events"
  | "ongoing-events"
  | "squad"
  | "gallery"
  | "contact"

export type TabId = SectionId

export type GalleryImage = {
  id: number
  src: string
  alt: string
  span: "tall" | "wide" | "square"
}

export const NAV_TABS: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "events", label: "Events" },
  { id: "ongoing-events", label: "Ongoing Events" },
  { id: "squad", label: "Squad" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Get in Touch" },
]

export type TeamMember = {
  id: number
  name: string
  role: string
  avatar: string
  objectPosition?: string
}

export const CORE_TEAM: TeamMember[] = [
  { id: 1,  name: "D. Anjali",       role: "President",          avatar: "/team/anjali.png"                                  },
  { id: 2,  name: "Vishnu",          role: "Vice President & External Lead", avatar: "/team/vishnu.jpeg"                                 },
  { id: 3,  name: "K. Rajalakshmi", role: "Treasurer",          avatar: "/team/rajalakshmi.jpeg"                            },
  { id: 4,  name: "Keerthana",       role: "Tech Lead",          avatar: "/team/keerthana.jpeg"                              },
  { id: 5,  name: "Kameshwari",      role: "Arts Lead",          avatar: "/team/kameshwari.jpeg", objectPosition: "top"      },
  { id: 6,  name: "Likith",           role: "Photography Lead",   avatar: "/team/likith.jpeg"                                 },
  { id: 7,  name: "Yoshitha",         role: "GD Lead",            avatar: "/team/yoshitha.jpeg"                               },
  { id: 8,  name: "Ch. Ramesh",      role: "Promotions Lead",    avatar: "/team/ramesh.jpeg"                                 },
  { id: 9,  name: "Lavanya",         role: "Operations Lead",    avatar: "/team/lavanya.jpeg"                                },
]

export type EventContent = {
  id: string
  title: string
  tagline: string
  description: string
  highlights: string[]
  images: GalleryImage[]
}

function buildGallery(label: string, count: number): GalleryImage[] {
  const spans: GalleryImage["span"][] = ["square", "tall", "wide", "square", "square", "tall"]
  const dims: Record<string, { h: number; w: number }> = {
    tall: { h: 640, w: 480 },
    wide: { h: 420, w: 680 },
    square: { h: 520, w: 520 },
  }
  return Array.from({ length: count }).map((_, i) => {
    const span = spans[i % spans.length]
    const { h, w } = dims[span]
    const query = encodeURIComponent(`${label} event photo ${i + 1}`)
    return {
      id: i + 1,
      src: `/placeholder.svg?height=${h}&width=${w}&query=${query}`,
      alt: `${label} — photo ${i + 1}`,
      span,
    }
  })
}

export const EVENTS: Record<"codex" | "unplugged" | "outreach" | "project-expo", EventContent> = {
  codex: {
    id: "codex",
    title: "CodeX",
    tagline: "Algorithmic Thinking & Competitive Programming",
    description:
      "CodeX is SQUAD's premier coding competition designed to test programming mastery, logical reasoning, and speed under pressure. Featuring a technical aptitude round followed by intense algorithmic challenges, participants evaluate their problem-solving efficiency while preparing for technical interviews and national hackathons.",
    highlights: [
      "Technical Aptitude & Logic Assessment",
      "Time-Constrained Algorithmic Challenges",
      "Interview & Competitive Programming Preparation",
    ],
    images: [
      { id: 1,  src: "/events/codex/photo1.jpeg",  alt: "CodeX — photo 1",  span: "square" },
      { id: 2,  src: "/events/codex/photo2.jpeg",  alt: "CodeX — photo 2",  span: "tall"   },
      { id: 3,  src: "/events/codex/photo3.jpeg",  alt: "CodeX — photo 3",  span: "wide"   },
      { id: 4,  src: "/events/codex/photo4.jpeg",  alt: "CodeX — photo 4",  span: "square" },
      { id: 5,  src: "/events/codex/photo5.jpeg",  alt: "CodeX — photo 5",  span: "square" },
      { id: 6,  src: "/events/codex/photo6.jpeg",  alt: "CodeX — photo 6",  span: "tall"   },
      { id: 7,  src: "/events/codex/photo7.jpeg",  alt: "CodeX — photo 7",  span: "wide"   },
      { id: 8,  src: "/events/codex/photo8.jpeg",  alt: "CodeX — photo 8",  span: "square" },
      { id: 9,  src: "/events/codex/photo9.jpeg",  alt: "CodeX — photo 9",  span: "square" },
      { id: 10, src: "/events/codex/photo10.jpeg", alt: "CodeX — photo 10", span: "tall"   },
      { id: 11, src: "/events/codex/photo11.jpeg", alt: "CodeX — photo 11", span: "square" },
      { id: 12, src: "/events/codex/photo12.jpeg", alt: "CodeX — photo 12", span: "wide"   },
      { id: 13, src: "/events/codex/photo13.jpeg", alt: "CodeX — photo 13", span: "square" },
    ],
  },
  unplugged: {
    id: "unplugged",
    title: "Unplugged",
    tagline: "Technical Workshop",
    description:
      "Conducted by the SQUAD Technical Team under the guidance of Pujitha Ma'am, Unplugged was an intensive hands-on Power BI workshop. The session introduced participants to data visualization, dashboard creation, and interactive reporting using real-world business intelligence examples.",
    highlights: [
      "Guided by Pujitha Ma'am & SQUAD Tech Team",
      "Data Visualization & Dashboards",
      "Real-World Business Intelligence",
    ],
    images: [
      { id: 1,  src: "/events/unplugged/photo1.jpeg",  alt: "Unplugged — photo 1",  span: "square" },
      { id: 2,  src: "/events/unplugged/photo2.jpeg",  alt: "Unplugged — photo 2",  span: "tall"   },
      { id: 3,  src: "/events/unplugged/photo3.jpeg",  alt: "Unplugged — photo 3",  span: "wide"   },
      { id: 4,  src: "/events/unplugged/photo4.jpeg",  alt: "Unplugged — photo 4",  span: "square" },
      { id: 5,  src: "/events/unplugged/photo5.jpeg",  alt: "Unplugged — photo 5",  span: "square" },
      { id: 6,  src: "/events/unplugged/photo6.jpeg",  alt: "Unplugged — photo 6",  span: "tall"   },
      { id: 7,  src: "/events/unplugged/photo7.jpeg",  alt: "Unplugged — photo 7",  span: "wide"   },
      { id: 8,  src: "/events/unplugged/photo8.jpeg",  alt: "Unplugged — photo 8",  span: "square" },
      { id: 9,  src: "/events/unplugged/photo9.jpeg",  alt: "Unplugged — photo 9",  span: "square" },
      { id: 10, src: "/events/unplugged/photo10.jpeg", alt: "Unplugged — photo 10", span: "tall"   },
      { id: 11, src: "/events/unplugged/photo11.jpeg", alt: "Unplugged — photo 11", span: "square" },
    ],
  },
  outreach: {
    id: "outreach",
    title: "Outreach Program",
    tagline: "Community Empowerment",
    description:
      "As part of the SQUAD Outreach Program, our team visited ZPHS, Gundlapochampally to interact with school students and inspire them towards innovation, technology, and creative thinking. The session included discussions on problem-solving, teamwork, and building confidence in future aspirations.",
    highlights: [
      "School Visit to ZPHS Gundlapochampally",
      "STEM & Creative Thinking Awareness",
      "Mentorship & Student Empowerment",
    ],
    images: [
      { id: 1, src: "/events/outreach/photo1.jpeg", alt: "Outreach — photo 1", span: "square" },
      { id: 2, src: "/events/outreach/photo2.jpeg", alt: "Outreach — photo 2", span: "tall"   },
      { id: 3, src: "/events/outreach/photo3.jpeg", alt: "Outreach — photo 3", span: "wide"   },
      { id: 4, src: "/events/outreach/photo4.jpeg", alt: "Outreach — photo 4", span: "square" },
      { id: 5, src: "/events/outreach/photo5.jpeg", alt: "Outreach — photo 5", span: "square" },
      { id: 6, src: "/events/outreach/photo6.jpeg", alt: "Outreach — photo 6", span: "tall"   },
      { id: 7, src: "/events/outreach/photo7.jpeg", alt: "Outreach — photo 7", span: "wide"   },
      { id: 8, src: "/events/outreach/photo8.jpeg", alt: "Outreach — photo 8", span: "square" },
      { id: 9, src: "/events/outreach/photo9.jpeg", alt: "Outreach — photo 9", span: "square" },
    ],
  },
  "project-expo": {
    id: "project-expo",
    title: "Project Expo",
    tagline: "Prototype Showcase & Jury Pitching",
    description:
      "SQUAD organized a Project Expo providing students a platform to showcase technical projects. SQUAD members mentored participants beforehand in refining ideas and prototypes. Projects were evaluated by invited industry professionals who provided valuable feedback and practical exposure.",
    highlights: [
      "Pre-Expo Mentorship by Senior SQUAD Members",
      "Live Prototype Demonstrations",
      "Evaluation by Industry Judges",
    ],
    images: [
      { id: 1, src: "/events/project-expo/photo1.jpeg", alt: "Project Expo — photo 1", span: "square" },
      { id: 2, src: "/events/project-expo/photo2.jpeg", alt: "Project Expo — photo 2", span: "tall"   },
      { id: 3, src: "/events/project-expo/photo3.jpeg", alt: "Project Expo — photo 3", span: "wide"   },
      { id: 4, src: "/events/project-expo/photo4.jpeg", alt: "Project Expo — photo 4", span: "square" },
      { id: 5, src: "/events/project-expo/photo5.jpeg", alt: "Project Expo — photo 5", span: "square" },
      { id: 6, src: "/events/project-expo/photo6.jpeg", alt: "Project Expo — photo 6", span: "tall"   },
      { id: 7, src: "/events/project-expo/photo7.jpeg", alt: "Project Expo — photo 7", span: "wide"   },
      { id: 8, src: "/events/project-expo/photo8.jpeg", alt: "Project Expo — photo 8", span: "square" },
    ],
  },
}

export const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/squadmlrit?igsh=MTBleWo0Nmd3NXUzeQ==",
    handle: "@squadmlrit",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/squadclub?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    handle: "SQUAD — MLRIT",
  },
]

export const GALLERY_IMAGES: GalleryImage[] = [
  { id: 1,  src: "/gallery/photo1.jpeg",  alt: "SQUAD Gallery 1",  span: "square" },
  { id: 2,  src: "/gallery/photo2.jpeg",  alt: "SQUAD Gallery 2",  span: "tall"   },
  { id: 3,  src: "/gallery/photo3.jpeg",  alt: "SQUAD Gallery 3",  span: "wide"   },
  { id: 4,  src: "/gallery/photo4.jpeg",  alt: "SQUAD Gallery 4",  span: "square" },
  { id: 5,  src: "/gallery/photo5.jpeg",  alt: "SQUAD Gallery 5",  span: "square" },
  { id: 6,  src: "/gallery/photo6.jpeg",  alt: "SQUAD Gallery 6",  span: "tall"   },
  { id: 7,  src: "/gallery/photo7.jpeg",  alt: "SQUAD Gallery 7",  span: "wide"   },
  { id: 8,  src: "/gallery/photo8.jpeg",  alt: "SQUAD Gallery 8",  span: "square" },
  { id: 9,  src: "/gallery/photo9.jpeg",  alt: "SQUAD Gallery 9",  span: "square" },
  { id: 10, src: "/gallery/photo10.jpeg", alt: "SQUAD Gallery 10", span: "tall"   },
  { id: 11, src: "/gallery/photo11.jpeg", alt: "SQUAD Gallery 11", span: "wide"   },
  { id: 12, src: "/gallery/photo12.jpeg", alt: "SQUAD Gallery 12", span: "square" },
]

export const CONTACT_EMAIL = "squadmlrit@gmail.com"
