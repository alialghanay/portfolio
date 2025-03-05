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
import { Mail, Phone } from "lucide-react";
import { FiLinkedin, FiX, FiGithub } from "react-icons/fi";
// Zod schema for validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const response = await fetch("https://formspree.io/f/moveaqqk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (response.ok) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-12 px-6 max-w-4xl mx-auto text-center" id="contact">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        Feel free to reach out to me via the form below or through my social
        media channels.
      </p>

      {submitted ? (
        <p className="text-green-600 font-semibold">
          Thank you! Your message has been sent.
        </p>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Name" {...field} />
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
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Your Message" rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-primary py-3 px-6 rounded-lg hover:bg-primary-dark transition"
            >
              Send Message
            </Button>
          </form>
        </Form>
      )}

      {/* Contact Info */}
      <div className="mt-10 text-center space-y-4">
        <p className="text-lg font-semibold">Or contact me directly:</p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-6">
          <a
            href="mailto:alialghanay6@gmail.com"
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary"
          >
            <Mail className="w-5 h-5" />
            <span>alialghanay6@gmail.com</span>
          </a>
          <a
            href="tel:+218918653414"
            className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-primary"
          >
            <Phone className="w-5 h-5" />
            <span>+218 91 865 3414</span>
          </a>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://www.linkedin.com/in/alialghanay"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-primary"
          >
            <FiLinkedin className="w-6 h-6" />
          </a>
          <a
            href="https://x.com/alialghanay"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-primary"
          >
            <FiX className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/alialghanay"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-300 hover:text-primary"
          >
            <FiGithub className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
