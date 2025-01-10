import {
  EmptyDialog,
  DialogContent,
  DialogTrigger,
} from "~/components/ui/empty-dialog"
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { componentImage } from "~/lib/utils";
import { Button } from "../ui/button";
import { Database } from "~/lib/schema";
import React from "react";
import { search } from "~/lib/api";

export function SearchDialog() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Database['product']['Tables']['products']['Row'][]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 2) {
        setIsLoading(true);
        try {
          const { data, error } = await search(searchQuery);
          if (!error) {
            setSearchResults(data.map((product) => ({
              ...product,
              id: product.product_id,
              name: product.product_name,
              is_published: true,
              product_fts: null,
              product_trgms: null,
            })));
          } else {
            console.error('Error fetching search results:', error);
            setSearchResults([]);
          }
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(fetchSearchResults, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery])

  const getCategorySlug = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'power supply':
        return 'psu';
      case 'internal storage':
        return 'storage';
      default:
        return categoryName.toLowerCase().replace(/\s+/g, '-');
    }
  }

  return(
    <EmptyDialog>
      <DialogTrigger asChild>
        <Search size={20} className="cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-fit max-h-[95vh] overflow-y-auto">
        <div className={searchResults.length !== 0 ? '' : ''}>
          {/* Input Search */}
          <div className="sticky top-0 w-full">
            <input
              type="text"
              placeholder="Cari Komponen PC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-25"
            />
          </div>

          {/* Loading State */}
          {isLoading ? (
            <div className="text-center mt-4">Loading...</div>
          ) : searchResults.length !== 0 ? (
            <div className="flex justify-center mt-4">
              <div className="w-full max-w-screen-lg overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="bg-white divide-y divide-gray-200">
                    {searchResults.map((result: any) => (
                      <tr key={result.product_id} className="tablet:table-row space-x-4">
                        <td className="px-6 py-2 whitespace-nowrap flex items-center">
                          <Image
                            src={componentImage(result)}
                            alt={result.product_name}
                            width={64}
                            height={64}
                            className="h-16 w-16 object-contain mr-4"
                          />
                          <div className="flex flex-col max-w-lg">
                            <div
                              className="w-full font-semibold text-base truncate max-w-[250px]"
                              title={result.product_name}
                            >
                              {result.product_name}
                            </div>
                            <div className="text-slate-500 font-semibold text-sm">
                              {result.category_name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          Rp {result.lowest_price.toLocaleString()}
                        </td>
                        <td className="px-6 whitespace-nowrap">
                          <Link
                            href={`/katalog/${getCategorySlug(result.category_name)}/${encodeURIComponent(
                              result.product_name.replace(/\s+/g, '-').toLowerCase()
                            )}`}
                            passHref
                          >
                            <Button size="sm" variant="default" className="text-white">
                              Beli
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : searchQuery.trim().length !== 0 && (
            <div className="text-center mt-4">No results found.</div>
          )}
        </div>
      </DialogContent>

    </EmptyDialog>
  )
}