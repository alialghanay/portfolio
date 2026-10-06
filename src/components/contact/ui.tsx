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
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/section-heading";
import SocialLinks from "@/components/ui/social-links";

// Built per render so validation messages follow the active locale.
const makeSchema = (errors: { name: string; email: string; message: string }) =>
  z.object({
    name: z.string().min(2, errors.name),
    email: z.string().email(errors.email),
    message: z.string().min(10, errors.message),
  });

type FormValues = z.infer<ReturnType<typeof makeSchema>>;

const Contact = () => {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const formSchema = useMemo(
    () =>
      makeSchema({
        name: t("errors.name"),
        email: t("errors.email"),
        message: t("errors.message"),
      }),
    [t]
  );

  // Email and phone are LTR values; the `dir="ltr"` span in the row keeps
  // them readable inside the Arabic layout.
  const contactRows = [
    { Icon: Mail, label: t("email"), value: "alialghanay@gmail.com", href: "mailto:alialghanay@gmail.com", ltr: true },
    { Icon: Phone, label: t("phone"), value: "+218 91 865 3414", href: "tel:+218918653414", ltr: true },
    { Icon: MapPin, label: t("location"), value: t("locationValue"), href: null, ltr: false },
  ];

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
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div>
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-3">
                {t("talkTitle")}
              </h3>
              <p className="text-muted-foreground">
                {t("talkBody")}
              </p>
            </div>

            <ul className="space-y-3">
              {contactRows.map(({ Icon, label, value, href, ltr }) => {
                const body = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
                      <span dir={ltr ? "ltr" : undefined} className="block truncate text-start font-medium text-foreground">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a
                        href={href}
                        className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3 transition-colors outline-none hover:border-accent/40 focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-3">{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>

            <div>
              <h4 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                {t("follow")}
              </h4>
              <SocialLinks className="-ms-2.5" linkClassName="text-foreground" />
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {status === "success" ? (
              <div role="status" className="flex flex-col items-center justify-center h-full min-h-80 text-center p-8 rounded-3xl border border-border bg-card shadow-sm">
                <span className="mb-4 grid size-14 place-items-center rounded-full bg-accent/10 text-accent">
                  <CheckCircle2 className="size-7" aria-hidden="true" />
                </span>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {t("successTitle")}
                </h3>
                <p className="text-muted-foreground">
                  {t("successBody")}
                </p>
                <Button onClick={() => setStatus("idle")} variant="outline" className="rounded-full">
                  {t("sendAnother")}
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  noValidate
                  className="flex flex-col gap-5 p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("nameLabel")}</FormLabel>
                          <FormControl>
                            <Input autoComplete="name" placeholder={t("namePlaceholder")} className="h-11" {...field} />
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
                          <FormLabel>{t("emailLabel")}</FormLabel>
                          <FormControl>
                            <Input type="email" autoComplete="email" dir="ltr" placeholder={t("emailPlaceholder")} className="h-11" {...field} />
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
                        <FormLabel>{t("messageLabel")}</FormLabel>
                        <FormControl>
                          <Textarea placeholder={t("messagePlaceholder")} rows={5} className="min-h-36" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {status === "error" && (
                    <div role="alert" className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-destructive text-sm">
                      <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                      {t("sendError")}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="h-12 w-full rounded-full px-8 sm:w-auto sm:self-end"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="animate-spin" aria-hidden="true" />
                        {t("sending")}
                      </>
                    ) : (
                      <>
                        {t("send")}
                        <Send aria-hidden="true" className="rtl:-scale-x-100" />
                      </>
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
