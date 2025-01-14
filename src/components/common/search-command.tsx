'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search, Loader2 } from 'lucide-react';
import { Dialog, DialogContent } from '~/components/ui/dialog';

const searchItems = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'Blog',
    url: '/blog',
  },
  {
    title: 'Products',
    url: '/products',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
];

export function SearchCommand({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'u' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const filteredItems = query
    ? searchItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : searchItems;

  return (
    <Dialog open={open} onOpenChange={setOpen} {...props}>
      <DialogContent className="overflow-hidden p-0">
        <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-white dark:bg-gray-900">
          <CommandPrimitive className="flex h-full w-full flex-col overflow-hidden">
            <div className="flex items-center border-b px-3 dark:border-gray-800">
              <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
              <CommandPrimitive.Input
                className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
                placeholder="Search anything..."
                value={query}
                onValueChange={setQuery}
              />
            </div>
            <CommandPrimitive.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
              <CommandPrimitive.Empty className="py-6 text-center text-sm">
                No results found.
              </CommandPrimitive.Empty>
              {isLoading ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              ) : (
                filteredItems.map((item) => (
                  <CommandPrimitive.Item
                    key={item.url}
                    className="px-4 py-2 text-sm cursor-pointer aria-selected:bg-gray-100 dark:aria-selected:bg-gray-800"
                    onSelect={() => runCommand(() => router.push(item.url))}
                  >
                    {item.title}
                  </CommandPrimitive.Item>
                ))
              )}
            </CommandPrimitive.List>
          </CommandPrimitive>
        </div>
      </DialogContent>
    </Dialog>
  );
}