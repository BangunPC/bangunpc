import {
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { componentImage } from "@/lib/utils"
import { Button } from "../ui/button"
import { Database } from "@/lib/schema"
import { useState, useEffect, useCallback } from "react"
import { searchProduct } from "@/lib/api"
import { Command as CommandPrimitive } from 'cmdk'
import { Dialog, DialogProps } from "@radix-ui/react-dialog"
import { useRouter } from "next/navigation"
import { categoryTitleToSlug } from "@/lib/db"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

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
]

export function SearchDialog({ ...props }: DialogProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [searchResults, setSearchResults] = useState<Database['product']['Tables']['products']['Row'][]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
      document.addEventListener('keydown', down)
      return () => document.removeEventListener('keydown', down)
    }, [])
    
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchQuery.length > 2) {
        setIsLoading(true)
        try {
          const { data, error } = await searchProduct(searchQuery)
          if (!error) {
            setSearchResults(data.map((product) => ({
              ...product,
              id: product.product_id,
              name: product.product_name,
              is_published: true,
              product_fts: null,
              product_trgms: null,
              created_at: null
            })))
          } else {
            console.error('Error fetching search results:', error)
            setSearchResults([])
          }
        } catch (error) {
          console.error('Error fetching search results:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setSearchResults([])
      }
    }

    const debounceTimer = setTimeout(fetchSearchResults, 500)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery])

  const runCommand = useCallback((command: () => unknown) => {
      command()
      setOpen(false)
    }, [])

  const getCategorySlug = (categoryName: string) => {
    switch (categoryName.toLowerCase()) {
      case 'power supply':
        return 'psu'
      case 'internal storage':
        return 'storage'
      default:
        return categoryName.toLowerCase().replace(/\s+/g, '-')
    }
  }

  return(
    <>
      <Search size={20} className="cursor-pointer" onClick={() => setOpen((open) => !open)}/>
      <Dialog open={open} onOpenChange={setOpen} {...props}>
        <DialogContent className="overflow-hidden p-0">
          <VisuallyHidden>
            <DialogTitle>
              Menu
            </DialogTitle>
          </VisuallyHidden>
          <div className="flex h-full w-full flex-col overflow-hidden rounded-md bg-white dark:bg-gray-900">
            <CommandPrimitive className="flex h-full w-full flex-col overflow-hidden">
              {/* Input Search */}
              <div className="flex items-center border-b px-3 dark:border-gray-800">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <CommandPrimitive.Input
                  className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
                  placeholder="Cari Komponen PC..."
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
              </div>
              <CommandPrimitive.List className="max-h-[480px] overflow-y-auto overflow-x-hidden">
                {isLoading ? (
                  <div className="flex items-center justify-center py-6">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : searchResults.length !== 0 ? (
                  searchResults.map((product: any) => (
                    <div key={product.id} className="p-4 z-0">
                      <div className="flex items-center gap-4">
                        {/* Product info - always visible */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          <div className="h-16 w-16 flex-shrink-0 relative">
                            <Image
                              src={componentImage(product)}
                              alt={product.name}
                              layout="fill"
                              objectFit="contain"
                              className="rounded-md"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                              {product.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.category_name}
                            </p>
                            {/* Price - visible on mobile only */}
                            <p className="mt-1 text-sm font-medium text-white md:hidden">
                              Rp {product.lowest_price?.toLocaleString('id-ID')}
                            </p>
                          </div>
                        </div>
        
                        {/* Price column - visible on md and up */}
                        <div className="hidden md:block w-32 text-right">
                          <p className="text-sm font-medium text-white">
                            Rp {product.lowest_price?.toLocaleString('id-ID')}
                          </p>
                        </div>
        
                        {/* Action button */}
                        <div className="flex-shrink-0">
                          <Button size="sm" variant="default" className="text-white" onClick={() => runCommand(() => router.push(`/produk/${categoryTitleToSlug[product.category_name]}/${product.slug}`))}>
                            Beli
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : searchQuery.trim().length !== 0 && (
                  <div className="py-6 text-center text-sm">
                    Komponen tidak ditemukan
                  </div>
                )}
              </CommandPrimitive.List>
            </CommandPrimitive>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}