import en from "@/lib/constants/messages/en.json";
import ar from "@/lib/constants/messages/ar.json";

// `satisfies` makes a missing Arabic key a build-time type error.
export const messages = { en, ar: ar satisfies typeof en };
