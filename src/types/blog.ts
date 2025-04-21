export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  // author: {
  //   name: string;
  //   avatar: string;
  // };
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  children?: TableOfContentsItem[];
} 