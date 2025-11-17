export interface Link {
  name: string;
  url: string;
  icon: string;
  description?: string;
  color?: string;
}

export interface WorkExperience {
  role: string;
  company: string;
  period: string;
  tasks: string[];
}

export interface Skill {
  name:string;
  icon: string;
  url: string;
  color?: string;
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Project {
  name: string;
  links: Link[];
  description?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Song {
  title: string;
  artist: string;
  album: string;
  duration: string;
  spotifyId: string;
}
