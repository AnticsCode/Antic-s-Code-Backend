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