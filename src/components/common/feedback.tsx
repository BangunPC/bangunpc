"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { submitFeedback } from "@/lib/dal/feedback"
import { Turnstile } from "@marsidev/react-turnstile"

interface FeedbackButtonProps {
  buttonText?: string
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  buttonSize?: "default" | "sm" | "lg" | "icon"
  iconOnly?: boolean
}

export function FeedbackButton({
  buttonText = "Feedback",
  buttonVariant = "outline",
}: FeedbackButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmitSuccess = () => {
    setIsDialogOpen(false)
  }

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant={buttonVariant} 
            size="icon" 
            className="flex flex-col items-center justify-center h-auto p-3 gap-3 rounded-l-lg rounded-r-none border-l border-t border-b border-gray-700 bg-gray-800 hover:bg-gray-700 shadow-lg"
          >
            <span className="text-sm [writing-mode:vertical-rl] rotate-180 mr-1">
              {buttonText}
            </span>
            <MessageSquare 
              className="h-5 w-5 -rotate-90" 
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <FeedbackForm onSubmitSuccess={handleSubmitSuccess} />
        </DialogContent>
      </Dialog>
    </div>
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
  const [captchaToken, setCaptchaToken] = useState("");

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
          position: "top-right",
          description: "Terima kasih untuk masukan yang Anda berikan 😊",
          duration: 5000,
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
                  placeholder="Masukan yang Anda berikan akan membantu untuk meningkatkan kualitas website Bangun PC"
                  className="min-h-[120px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {captchaToken.length == 0 ? (
          <>
            <Turnstile
              siteKey="0x4AAAAAAAcTY5MLJfC_A1SN"
              onSuccess={(token) => {
                setCaptchaToken(token);
              }}
              aria-label="Cloudlare Captcha"
              className="m-auto w-full"
            />
          </>
        ) : (
          // Button Login (masuk)
          (
          <div className="flex flex-col gap-4">
            <Button 
              variant='raw'
              type="submit" 
              className="bg-primary hover:bg-primary/80 w-full" disabled={isSubmitting}>
              {/* {loading ? <Spinner /> : "Kirim Feedback"} */}
              {isSubmitting ? "Sedang mengirim..." : "Kirim Feedback"}
            </Button>
          </div>
          )
        )}
      </form>
    </Form>
  )
}