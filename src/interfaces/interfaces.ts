export interface Code {
  code: string;
  lang: string;
  description: string;
  level: string;
  tags: string[];
  from: From;
}

interface From {
  article: string;
  slug?: string;
}

export interface Link {
  name: string;
  url: string;
}

export interface Info {
  creator: string;
  where: string;
  site: string;
  age: string;
}

export interface Index {
  title: string;
  subtitle: string;
  id: string;
}

export interface UserProfile {
  avatar?: string;
  rol?: string;
  bio?: string;
  facebook?: string;
  twitter?: string;
  github?: string;
  portfolio?: string;
  language?: string;
}

export interface SearchRequest {
  value: string;
  category?: string;
  tag?: string;
  advanced: boolean;
  year?: string;
  level?: string[];
  badges?: string[];
  stars?: number[];
  type?: string[];
  sort?: number;
}