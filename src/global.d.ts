import type en from "@/lib/constants/messages/en.json";

// Types every `t("...")` key against the English catalog.
declare module "next-intl" {
  interface AppConfig {
    Messages: typeof en;
  }
}
