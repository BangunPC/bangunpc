import { TableOfContentsItem } from '@/types/blog';

export function generateTableOfContents(content: string): TableOfContentsItem[] {
  const lines = content.split('\n');
  const toc: TableOfContentsItem[] = [];
  const stack: TableOfContentsItem[] = [];

  lines.forEach((line) => {
    const headingMatch = /^(#{2,6})\s+(.+)$/.exec(line);
    if (headingMatch?.[1] && headingMatch?.[2]) {
      const level = headingMatch[1].length;
      const title = headingMatch[2];
      const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      
      const item: TableOfContentsItem = {
        id,
        title,
        level,
      };

      while (stack.length > 0 && stack[stack.length - 1]!.level >= level) {
        stack.pop();
      }

      if (stack.length === 0) {
        toc.push(item);
      } else {
        const parent = stack[stack.length - 1];
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(item);
        }
      }

      stack.push(item);
    }
  });

  return toc;
} 