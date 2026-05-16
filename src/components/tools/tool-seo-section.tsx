import type { ReactNode } from "react";

export type FaqItem = {
  question: string;
  answer: string;
};

type ToolSeoSectionProps = {
  aboutId: string;
  aboutTitle: string;
  aboutParagraphs: ReactNode[];
  featureList: string[];
  faqHeadingId?: string;
  faqs: readonly FaqItem[];
};

export function ToolSeoSection({
  aboutId,
  aboutTitle,
  aboutParagraphs,
  featureList,
  faqHeadingId = "faq-heading",
  faqs,
}: ToolSeoSectionProps) {
  return (
    <section
      aria-labelledby={aboutId}
      className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]"
    >
      <article className="space-y-4 rounded-2xl border bg-card/40 p-5 backdrop-blur sm:p-6">
        <h2
          id={aboutId}
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          {aboutTitle}
        </h2>
        {aboutParagraphs.map((paragraph, i) => (
          <p
            key={i}
            className="text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {paragraph}
          </p>
        ))}
        <ul className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2 sm:text-[15px]">
          {featureList.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 rounded-lg border bg-background/60 px-3 py-2 text-foreground/90"
            >
              <span className="size-1.5 rounded-full bg-emerald-500" />
              {feature}
            </li>
          ))}
        </ul>
      </article>

      <div
        aria-labelledby={faqHeadingId}
        className="rounded-2xl border bg-card/40 p-5 backdrop-blur sm:p-6"
      >
        <h2
          id={faqHeadingId}
          className="text-xl font-semibold tracking-tight sm:text-2xl"
        >
          Frequently asked questions
        </h2>
        <div className="mt-4 divide-y divide-border/60">
          {faqs.map((faq, idx) => (
            <details
              key={faq.question}
              className="group py-3 first:pt-0 last:pb-0"
              {...(idx === 0 ? { open: true } : {})}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-foreground sm:text-base">
                <span>{faq.question}</span>
                <span
                  aria-hidden
                  className="text-muted-foreground transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
