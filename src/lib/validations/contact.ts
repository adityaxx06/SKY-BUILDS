import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Please enter a valid email address").max(255),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  company: z.string().max(100).optional(),
  referenceUrl: z.string().url("Please enter a valid URL").max(500).optional().or(z.literal("")),
  description: z.string().min(20, "Please provide more detail (at least 20 characters)").max(5000),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export function validateContactForm(data: unknown) {
  return contactFormSchema.safeParse(data);
}