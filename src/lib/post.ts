type Post = {
    title: string;
    description: string;
    date: string;
    image: string;
    categories: string[];
    authors: string[];
    tags: string[];
    draft: boolean;
    slug?: string;
}