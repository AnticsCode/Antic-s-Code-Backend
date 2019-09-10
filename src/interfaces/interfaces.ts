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