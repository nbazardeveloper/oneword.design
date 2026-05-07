import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "1",
    title: "Discovery Call",
    content:
      "We talk for 30 min. I learn your goals, audience, timeline, and what success looks like.",
  },
  {
    id: "2",
    title: "Proposal & Timeline",
    content:
      "Clear scope, fixed price, exact delivery date. No hidden costs, no vague estimates.",
  },
  {
    id: "3",
    title: "Design & Development",
    content:
      "Hand-coded from scratch — fast, accessible, pixel-perfect. Weekly progress updates.",
  },
  {
    id: "4",
    title: "Review & Refine",
    content:
      "Two revision rounds included. Your feedback shapes the final product.",
  },
  {
    id: "5",
    title: "Launch & Handoff",
    content:
      "I deploy, configure analytics, and hand over everything. Full docs included.",
  },
  {
    id: "6",
    title: "Who I work with",
    content:
      "I collaborate with startups, brands, and individuals who value thoughtful design and want to create lasting impact.",
  },
];

export function Accordion05() {
  return (
    <section className="w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
            Process
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
            How the work moves from first call to final launch
          </h2>
        </div>

        <div className="mx-auto w-full max-w-3xl">
          <Accordion type="single" defaultValue="5" collapsible className="w-full">
            {items.map((item) => (
              <AccordionItem value={item.id} key={item.id} className="last:border-b">
                <AccordionTrigger className="cursor-pointer overflow-hidden pl-6 text-left text-foreground/20 duration-200 hover:no-underline data-[state=open]:space-y-0 data-[state=open]:text-primary md:pl-14 [&>svg]:hidden">
                  <div className="flex flex-1 items-start gap-4">
                    <p className="pt-1 text-xs">{item.id}</p>
                    <h3 className="relative text-left text-3xl uppercase md:text-5xl">
                      {item.title}
                    </h3>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-6 pl-6 text-muted-foreground md:px-20">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}