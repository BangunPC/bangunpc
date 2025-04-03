import { TableOfContentsItem } from '@/types/blog';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  activeSection: string;
}

export function TableOfContents({ items, activeSection }: TableOfContentsProps) {
  return (
    <nav className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`block text-sm transition-colors ${
                activeSection === item.id
                  ? 'text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
              style={{ paddingLeft: `${(item.level - 1) * 1}rem` }}
            >
              {item.title}
            </a>
            {item.children && (
              <ul className="mt-2 space-y-2">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <a
                      href={`#${child.id}`}
                      className={`block text-sm transition-colors ${
                        activeSection === child.id
                          ? 'text-blue-600 dark:text-blue-400 font-medium'
                          : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                      style={{ paddingLeft: `${(child.level - 1) * 1}rem` }}
                    >
                      {child.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
} 