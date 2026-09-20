"use client";

import { useState, useCallback, useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContactField, ContactTextarea } from "./ContactField";
import { ProjectTypeSelector } from "./ProjectTypeSelector";
import { BudgetSelector, TimelineSelector } from "./ChipSelector";
import { submitContactForm, type ContactSubmissionResult } from "@/app/contact/actions";

export type FormStatus = "idle" | "validating" | "submitting" | "success" | "error";

interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  company: string;
  referenceUrl: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  projectType?: string;
  description?: string;
  referenceUrl?: string;
}

const INITIAL_FORM_DATA: ContactFormData = {
  name: "",
  email: "",
  projectType: "",
  budget: "",
  timeline: "",
  company: "",
  referenceUrl: "",
  description: "",
};

function validateForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required";
  } else if (data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.projectType) {
    errors.projectType = "Please select a project type";
  }

  if (!data.description.trim()) {
    errors.description = "Project description is required";
  } else if (data.description.trim().length < 20) {
    errors.description = "Please provide more detail (at least 20 characters)";
  }

  if (data.referenceUrl && !/^https?:\/\/.+/.test(data.referenceUrl)) {
    errors.referenceUrl = "Please enter a valid URL";
  }

  return errors;
}

async function formAction(
  prevState: ContactSubmissionResult | null,
  formData: FormData
): Promise<ContactSubmissionResult> {
  if (formData.get("reset") === "true") {
    return { success: false, message: "" };
  }

  const rawData: ContactFormData = {
    name: (formData.get("name") as string) || "",
    email: (formData.get("email") as string) || "",
    projectType: (formData.get("projectType") as string) || "",
    budget: (formData.get("budget") as string) || "",
    timeline: (formData.get("timeline") as string) || "",
    company: (formData.get("company") as string) || "",
    referenceUrl: (formData.get("referenceUrl") as string) || "",
    description: (formData.get("description") as string) || "",
  };

  const clientErrors = validateForm(rawData);
  if (Object.keys(clientErrors).length > 0) {
    return {
      success: false,
      message: "Validation failed",
      errors: clientErrors as Record<string, string>,
    };
  }

  return submitContactForm(formData);
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serverErrors, setServerErrors] = useState<Record<string, string>>({});

  const [actionState, actionDispatch, isPending] = useActionState(formAction, null);

  const handleChange = useCallback((field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newErrors = validateForm({ ...formData, [field]: value });
      setErrors(newErrors);
      if (serverErrors[field]) {
        setServerErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    }
  }, [formData, touched, serverErrors]);

  const handleBlur = useCallback((field: keyof ContactFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateForm(formData);
    setErrors(newErrors);
  }, [formData]);

  const getFieldError = (field: keyof FormErrors) => {
    return serverErrors[field] || (touched[field] ? errors[field] : undefined);
  };

  const isSubmitting = isPending;
  const isSuccess = actionState?.success === true;
  const isError = actionState?.success === false;

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
        role="status"
        aria-live="polite"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "linear-gradient(135deg, var(--success), var(--primary))" }}
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#120e1f" }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="font-display text-2xl font-bold mb-3" style={{ color: "var(--text)" }}>
          Inquiry received
        </h3>
        <p className="text-[1.125rem] max-w-md mx-auto mb-8" style={{ color: "var(--text-muted)" }}>
          {actionState.message}
        </p>
        <motion.button
          onClick={() => {
            setFormData(INITIAL_FORM_DATA);
            setTouched({});
            setErrors({});
            setServerErrors({});
            // Reset actionState by dispatching a new FormData with a reset flag
            const resetData = new FormData();
            resetData.set("reset", "true");
            actionDispatch(resetData);
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-colors"
          style={{ background: "var(--primary)", color: "var(--on-primary)" }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Send another inquiry
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </motion.button>
      </motion.div>
    );
  }

  if (isError && actionState) {
    // Show error inline in form - server errors will be shown via getFieldError
    // The form below will render with serverErrors populated
  }

  return (
    <form action={actionDispatch} noValidate className="space-y-6" aria-label="Project inquiry form">
      <AnimatePresence mode="popLayout">
        {!isSubmitting && !isSuccess && (
          <motion.div
            key="form-fields"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContactField
                label="Name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                onBlur={() => handleBlur("name")}
                error={getFieldError("name")}
                required
                autoComplete="name"
                name="name"
              />
              <ContactField
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                error={getFieldError("email")}
                required
                autoComplete="email"
                name="email"
              />
            </div>

            <ProjectTypeSelector
              value={formData.projectType}
              onChange={(value) => handleChange("projectType", value)}
              error={getFieldError("projectType")}
              disabled={isSubmitting || isSuccess}
              name="projectType"
            />

            <ContactTextarea
              label="Tell us about your project"
              placeholder="What are you building? Who is it for? What should it accomplish? Any references or inspiration?"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              onBlur={() => handleBlur("description")}
              error={getFieldError("description")}
              required
              rows={5}
              hint="The more detail you share, the better we can prepare for our first conversation."
              name="description"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BudgetSelector
                label="Approximate project budget"
                name="budget"
                value={formData.budget}
                onChange={(value) => handleChange("budget", value)}
                disabled={isSubmitting || isSuccess}
                hint="This helps us scope the right solution. No obligation."
              />
              <TimelineSelector
                label="Desired timeline"
                name="timeline"
                value={formData.timeline}
                onChange={(value) => handleChange("timeline", value)}
                disabled={isSubmitting || isSuccess}
                hint="When do you need this launched? Rough estimate is fine."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t" style={{ borderColor: "var(--border)" }}>
              <ContactField
                label="Company / Brand (optional)"
                type="text"
                placeholder="Company or project name"
                value={formData.company}
                onChange={(e) => handleChange("company", e.target.value)}
                onBlur={() => handleBlur("company")}
                autoComplete="organization"
                name="company"
              />
              <ContactField
                label="Reference URL (optional)"
                type="url"
                placeholder="https://example.com"
                value={formData.referenceUrl}
                onChange={(e) => handleChange("referenceUrl", e.target.value)}
                onBlur={() => handleBlur("referenceUrl")}
                error={getFieldError("referenceUrl")}
                autoComplete="url"
                hint="Existing site, competitor, or inspiration reference"
                name="referenceUrl"
              />
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="popLayout">
        {isSubmitting && (
            <motion.div
              key="submitting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
              role="status"
              aria-live="polite"
            >
              <div className="flex items-center justify-center gap-4 py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-10 h-10 rounded-full border-3 border-transparent border-t-[var(--primary)]"
                />
                <span className="font-display text-lg font-medium" style={{ color: "var(--text)" }}>
                  Sending your inquiry...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </AnimatePresence>

      <AnimatePresence mode="popLayout">
        <motion.button
            key="submit"
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-3"
            style={{
              background: isSubmitting ? "var(--text-muted)" : "var(--primary)",
              color: "var(--on-primary)",
              opacity: isSubmitting ? 0.6 : 1,
            }}
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 rounded-full border-2 border-transparent border-t-[var(--on-primary)]"
                />
                Sending...
              </>
            ) : (
              <>
                Submit inquiry
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8" />
                </svg>
              </>
            )}
          </motion.button>
      </AnimatePresence>

      <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
        By submitting, you agree to our privacy practices. We&rsquo;ll never share your details.
        No spam — only relevant follow-up about your project.
      </p>
    </form>
  );
}