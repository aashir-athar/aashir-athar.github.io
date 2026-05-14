export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  features: string[]
  tech: string[]
  github: string
  demo?: string
  accent: string
  accentGlow: string
  category: string
  highlights: CaseStudyHighlight[]
  /** Marks a project as still in active development — renders an
   *  "IN DEVELOPMENT" badge instead of a category artifact pill. */
  inDevelopment?: boolean
}

export interface CaseStudyHighlight {
  label: string
  value: string
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  current?: boolean
  bullets: string[]
}

export interface Education {
  degree: string
  institution: string
  period: string
  note?: string
}

export interface Certification {
  name: string
  issuer: string
  year: string
}

export interface Skill {
  name: string
  category: string
  /** Optional self-rating, no longer rendered. Kept for back-compat. */
  level?: number
  icon?: string
}
