"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { useMobile } from "@/hooks/use-mobile"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { submitFeedback } from "@/lib/dal/feedback"

interface FeedbackButtonProps {
  buttonText?: string
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  iconOnly?: boolean
}

export function FeedbackButton({
  // buttonText = "",
  buttonVariant = "outline",
  buttonSize = "icon",
  iconOnly = false,
}: FeedbackButtonProps) {
  const isMobile = useMobile()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Handle successful form submission
  const handleSubmitSuccess = () => {
    setIsDialogOpen(false)
    setIsDropdownOpen(false)
  }

  // Mobile version (Dialog)
  if (isMobile || iconOnly) {
    return (
      <>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant={buttonVariant} size="icon" className="rounded-full">
              <MessageSquare className="h-5 w-5" />
              {/* <span className="sr-only">{buttonText}</span> */}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <FeedbackForm onSubmitSuccess={handleSubmitSuccess} />
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // Desktop version (Dropdown)
  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={buttonVariant} size={buttonSize}>
            <MessageSquare className="h-4 w-4" />
            {/* <span>{buttonText}</span> */}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="center" className="w-[400px] p-4 mt-2">
          <FeedbackForm onSubmitSuccess={handleSubmitSuccess} />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

// Form schema using zod
const formSchema = z.object({
  message: z.string().min(1, {
    message: "Pesan feedback tidak boleh kosong",
  }),
})

export type FeedbackFormValues = z.infer<typeof formSchema>

interface FeedbackFormProps {
  onSubmitSuccess?: () => void
  className?: string
}

function FeedbackForm({ onSubmitSuccess, className = "" }: FeedbackFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form definition
  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  })

  // Handle form submission
  async function onSubmit(values: FeedbackFormValues) {
    try {
      setIsSubmitting(true)
      // await submitFeedback(values)
      const { error } = await submitFeedback(values.message)

      if (error) {
        toast("Error", {
          description: error
        })
      } else {
        // Reset the form
        form.reset()
  
        // Show a success message with toast
        toast("Feedback Terkirim", {
          description: "Terima kasih untuk masukan yang Anda berikan 😊",
        })
  
        // Call the success callback if provided
        if (onSubmitSuccess) {
          onSubmitSuccess()
        }
      }
    } catch (error) {
      toast("Error", {
        description: "There was a problem submitting your feedback."
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Masukan Anda membantu kami meningkatkan layanan kami"
                  className="min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          variant='raw'
          type="submit" 
          className="dark:bg-white dark:hover:bg-slate-100 bg-black hover:bg-slate-900 w-full" disabled={isSubmitting}>
          {isSubmitting ? "Sedang mengirim..." : "Kirim Feedback"}
        </Button>
      </form>
    </Form>
  )
}