"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

const FormSchema = z.object({
  bio: z
    .string()
    .min(10, {
      message: "Bio must be at least 10 characters.",
    })
    .max(160, {
      message: "Bio must not be longer than 30 characters.",
    }),
})

export function TestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values:",{
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Please provide details about your feedback"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your feedback helps us improve our product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
            type="submit" 
            className="dark:bg-white dark:hover:bg-slate-100 bg-black hover:bg-slate-900 w-full" 
            disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </Button>
      </form>
    </Form>
  )
}
