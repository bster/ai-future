export const NAV_GROUPS = [
  { label: "What AI Is", sections: [{ id: "what", label: "What It Is Today" }, { id: "good", label: "What It Does Well Today" }, { id: "bad", label: "What It Can't Do" }] },
  { label: "Where It Matters", sections: [{ id: "transform", label: "Transformation & Economic Impact" }, { id: "beliefs", label: "The Believers" }] },
  { label: "What It Becomes", sections: [{ id: "futures", label: "Seven Futures" }] },
  { label: "Hard Questions", sections: [{ id: "mirror", label: "The Mirror Problem" }, { id: "unknown", label: "The Unknown" }] },
  { label: "For Educators", sections: [{ id: "liberal", label: "Liberal Arts" }, { id: "students", label: "For Students" }] },
  { label: "Reference", sections: [{ id: "glossary", label: "Glossary" }] },
];

export const ALL_SECTIONS = [{ id: "home" }, ...NAV_GROUPS.flatMap(g => g.sections), { id: "explore" }];

export const SECTION_META = {
  what:     { part: "What AI Is",       num: 1 },
  good:     { part: "What AI Is",       num: 2 },
  bad:      { part: "What AI Is",       num: 3 },
  transform:{ part: "Where It Matters", num: 4 },
  beliefs:  { part: "Where It Matters", num: 5 },
  futures:  { part: "What It Becomes",  num: 6 },
  mirror:   { part: "Hard Questions",   num: 7 },
  unknown:  { part: "Hard Questions",   num: 8 },
  liberal:  { part: "For Educators",    num: 9 },
  students: { part: "For Educators",    num: 10 },
};

export const TOTAL = Object.keys(SECTION_META).length;

export const PAGE_TITLES = {
  home: "Understanding AI",
  what: "What It Is Today",
  good: "What It Does Well Today",
  bad: "What It Can't Do",
  transform: "Transformation & Economic Impact",
  beliefs: "The Believers",
  futures: "Seven Futures",
  mirror: "The Mirror Problem",
  unknown: "The Unknown",
  liberal: "Liberal Arts Education",
  students: "For Students",
  explore: "Explore AI",
};

export function sectionLabel(id) {
  if (id === "explore") return "Explore AI";
  for (const g of NAV_GROUPS) {
    const sec = g.sections.find(x => x.id === id);
    if (sec) return sec.label;
  }
  return id;
}
