"use server";

import { validateContactForm } from "@/lib/validations/contact";
import { createServerSupabaseAdminClient } from "@/lib/supabase/server";

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function submitContactForm(formData: FormData): Promise<ContactSubmissionResult> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    projectType: formData.get("projectType"),
    budget: formData.get("budget"),
    timeline: formData.get("timeline"),
    company: formData.get("company"),
    referenceUrl: formData.get("referenceUrl"),
    description: formData.get("description"),
  };

  const validation = validateContactForm(rawData);

  if (!validation.success) {
    const errors: Record<string, string> = {};
    validation.error.issues.forEach((err) => {
      const field = err.path[0] as string;
      if (!errors[field]) {
        errors[field] = err.message;
      }
    });
    return {
      success: false,
      message: "Validation failed",
      errors,
    };
  }

  const data = validation.data;

  try {
    const supabase = await createServerSupabaseAdminClient();

    const { error } = await supabase.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      project_type: data.projectType,
      budget: data.budget || null,
      timeline: data.timeline || null,
      company: data.company || null,
      reference_url: data.referenceUrl || null,
      message: data.description,
      status: "new",
    });

    if (error) {
      console.error("Contact form submission error:", error);
      return {
        success: false,
        message: "Something went wrong while submitting your inquiry. Please try again.",
      };
    }

    return {
      success: true,
      message: "Thanks — your project inquiry has been received.",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message: "Something went wrong while submitting your inquiry. Please try again.",
    };
  }
}