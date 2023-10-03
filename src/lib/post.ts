type Post = {
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    image: string;
    categories: string[];
    authors: string[];
    tags: string[];
    draft: boolean;
    slug?: string;
}