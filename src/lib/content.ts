import projectsEn from "@/lib/constants/projects.json";
import experienceEn from "@/lib/constants/experience.json";
import certificationsEn from "@/lib/constants/certifications.json";
import projectsAr from "@/lib/constants/ar/projects.json";
import experienceAr from "@/lib/constants/ar/experience.json";
import certificationsAr from "@/lib/constants/ar/certifications.json";

/**
 * The English JSON files in `src/lib/constants/` are the source of truth for
 * every field (links, images, flags, order). Each other locale only supplies
 * an overlay of translated text fields keyed by item `id`, so URLs and
 * structure can never drift between languages. Untranslated fields fall back
 * to English.
 */
type Overlay<T> = Record<string, Partial<T>>;

function localize<T extends { id: number }>(items: T[], overlay?: Overlay<T>): T[] {
  return items.map((item) => ({ ...item, ...overlay?.[item.id] }));
}

// Two-letter monogram, always from the English title so it stays Latin
// ("Mutah.ly" → "MU", "Survey Form" → "SF").
function monogram(title: string) {
  const words = title.replace(/\.[a-z]+$/i, "").split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? words[0][0] + words[1][0] : words[0].slice(0, 2);
  return letters.toUpperCase();
}

type ProjectData = (typeof projectsEn)[number];
type ExperienceData = (typeof experienceEn)[number];
type Certifications = typeof certificationsEn;

const overlays: Record<
  string,
  {
    projects: Overlay<ProjectData>;
    experience: Overlay<ExperienceData>;
    certifications: {
      certificates: Overlay<Certifications["certificates"][number]>;
      academic: Overlay<Certifications["academic"][number]>;
      leadership: Overlay<Certifications["leadership"][number]>;
    };
  }
> = {
  ar: { projects: projectsAr, experience: experienceAr, certifications: certificationsAr },
};

export function getContent(locale: string) {
  const o = overlays[locale];
  return {
    projects: localize(projectsEn, o?.projects).map((p, i) => ({
      ...p,
      initials: monogram(projectsEn[i].title),
    })),
    experience: localize(experienceEn, o?.experience),
    certifications: {
      certificates: localize(certificationsEn.certificates, o?.certifications.certificates),
      academic: localize(certificationsEn.academic, o?.certifications.academic),
      leadership: localize(certificationsEn.leadership, o?.certifications.leadership),
    },
  };
}

export type Content = ReturnType<typeof getContent>;
export type Project = Content["projects"][number];
