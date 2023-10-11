type Post = {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    image: string;
    categories: string[];
    authors: string[];
    draft: boolean;
    slug?: string;
}