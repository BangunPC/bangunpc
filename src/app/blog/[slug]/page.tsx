'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { blogPosts } from '@/data/blog-posts';
import { generateTableOfContents } from '@/utils/toc';
import { TableOfContents } from '@/components/blog/table-of-contents';
import { RelatedPosts } from '@/components/blog/related-posts';
import Link from 'next/link';

type Params = Promise<{ slug: string }>

export default function BlogPostPage(props: {
  params: Params
}) {
  const params = use(props.params)
  const post = blogPosts.find((p) => p.slug === params.slug);
  const [activeSection, setActiveSection] = useState<string>('');

  if (!post) {
    notFound();
  }

  const toc = generateTableOfContents(post.content);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
      }
    );

    // Observe all section headings
    document.querySelectorAll('h1, h2, h3').forEach((heading) => {
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-7xl mx-auto">
        <Link href="/blog" className="flex items-center gap-2 mb-8 hover:text-primary dark:text-white text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <span>All blogs</span>
        </Link>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-sm rounded-full">
              {post.category}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              {post.readTime}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          {/* <div className="flex items-center gap-3">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div> */}
        </header>

        <div className="relative h-[400px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex gap-8 justify-center">
          <div className="flex-1 max-w-full">
            <div className="prose dark:prose-invert max-w-none">
              {post.content.split('\n').map((line, index) => {
                if (line.startsWith('#')) {
                  const level = /^#+/.exec(line)?.[0].length ?? 0;
                  const title = line.replace(/^#+\s+/, '');
                  const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return (
                    <div
                      key={index}
                      id={id}
                      className={`scroll-mt-20 ${
                        level === 1
                          ? 'text-3xl font-bold'
                          : level === 2
                          ? 'text-2xl font-semibold'
                          : 'text-xl font-medium'
                      } mt-8 mb-4`}
                    >
                      {title}
                    </div>
                  );
                }
                return <p key={index} className="mb-4">{line}</p>;
              })}
            </div>
            <RelatedPosts currentPost={post} allPosts={blogPosts} />
          </div>

          {/* <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <TableOfContents items={toc} activeSection={activeSection} />
            </div>
          </aside> */}
        </div>
      </article>
    </div>
  );
} 