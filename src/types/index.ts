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
  level: number
  category: string
  icon?: string
}
