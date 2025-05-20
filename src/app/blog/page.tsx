'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { blogPosts } from '@/data/blog-posts';
import { BlogSearch } from '@/components/blog/blog-search';
import { BlogPost } from '@/types/blog';

export default function BlogPage() {
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(blogPosts);

  return (
    <div className="container mt-16 mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tech Blog</h1>
      <BlogSearch posts={blogPosts} onFilter={setFilteredPosts} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group bg-white dark:bg-gray-950 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
            <div className="relative h-48 w-full">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-full">
                  {post.category}
                </span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {/* <div className="flex items-center gap-3">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm font-medium">{post.author.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div> */}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
