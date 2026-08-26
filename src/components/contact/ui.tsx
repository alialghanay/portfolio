"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { Mail, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { FiLinkedin, FiGithub } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setStatus("loading");
    try {
      const response = await fetch("https://formspree.io/f/moveaqqk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-medium text-accent uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Contact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Send me a message and I&apos;ll get back to you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Let&apos;s talk
              </h3>
              <p className="text-muted-foreground mb-6">
                I&apos;m open to freelance projects, full-time opportunities, and interesting collaborations.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:alialghanay@gmail.com"
                className="flex items-center gap-3 text-foreground hover:text-accent transition-colors group"
              >
                <span className="p-2.5 rounded-full bg-muted group-hover:bg-accent/10 transition-colors">
                  <Mail className="w-5 h-5" />
                </span>
                <span>alialghanay@gmail.com</span>
              </a>
              <a
                href="tel:+218918653414"
                className="flex items-center gap-3 text-foreground hover:text-accent transition-colors group"
              >
                <span className="p-2.5 rounded-full bg-muted group-hover:bg-accent/10 transition-colors">
                  <Phone className="w-5 h-5" />
                </span>
                <span>+218 91 865 3414</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <span className="p-2.5 rounded-full bg-muted">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>Tripoli, Libya</span>
              </div>
            </div>

            <div>
              <h4 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Follow me
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/alialghanay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-muted text-foreground hover:bg-accent hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/alialghanay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-muted text-foreground hover:bg-accent hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="X (Twitter)"
                >
                  <FaXTwitter className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com/alialghanay"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-muted text-foreground hover:bg-accent hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="GitHub"
                >
                  <FiGithub className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-8 rounded-2xl border border-border bg-muted/30">
                <CheckCircle2 className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  Message sent!
                </h3>
                <p className="text-muted-foreground mb-6">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
                <Button onClick={() => setStatus("idle")} variant="outline" className="rounded-full">
                  Send another message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-5 p-6 sm:p-8 rounded-2xl border border-border bg-card"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Tell me about your project..." rows={5} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-destructive text-sm">
                      <AlertCircle className="w-4 h-4" />
                      Something went wrong. Please try again.
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="rounded-full px-8 py-3 h-auto"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
