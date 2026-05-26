"use client";

import type { CSSProperties } from "react";
import { ContactsTable, type Contact } from "@/components/ui/contacts-table-with-modal";

const darkCrmTheme = {
  "--background": "#09090b",
  "--foreground": "#f4f4f5",
  "--card": "#111113",
  "--card-foreground": "#f4f4f5",
  "--popover": "#111113",
  "--popover-foreground": "#f4f4f5",
  "--primary": "#f97316",
  "--primary-foreground": "#09090b",
  "--secondary": "#18181b",
  "--secondary-foreground": "#f4f4f5",
  "--muted": "#27272a",
  "--muted-foreground": "#a1a1aa",
  "--accent": "#27272a",
  "--accent-foreground": "#f4f4f5",
  "--border": "rgba(255,255,255,0.12)",
  "--input": "rgba(255,255,255,0.14)",
  "--ring": "#f97316",
} as CSSProperties;

const hmnContacts: Contact[] = [
  {
    id: "hmn-1",
    name: "Naledi Mokoena",
    email: "naledi@hmn.agency",
    connectionStrength: "Very strong",
    twitterFollowers: 284200,
    description: "Fashion creator / premium lifestyle campaigns",
  },
  {
    id: "hmn-2",
    name: "Thebe Nkosi",
    email: "thebe@hmn.agency",
    connectionStrength: "Good",
    twitterFollowers: 146700,
    description: "Culture commentator / launch partnerships",
  },
  {
    id: "hmn-3",
    name: "Mila Jacobs",
    email: "mila@hmn.agency",
    connectionStrength: "Very strong",
    twitterFollowers: 432000,
    description: "Beauty creator / skincare and retail briefs",
  },
  {
    id: "hmn-4",
    name: "Anele Dlamini",
    email: "anele@hmn.agency",
    connectionStrength: "Weak",
    twitterFollowers: 121800,
    description: "Emerging creator / active onboarding",
  },
  {
    id: "hmn-5",
    name: "Rosebank Studio",
    email: "studio@rosebank.hmna",
    connectionStrength: "Good",
    twitterFollowers: 239100,
    description: "Production partner / campaign content support",
  },
  {
    id: "hmn-6",
    name: "Jordan Maseko",
    email: "jordan@hmn.agency",
    connectionStrength: "Very strong",
    twitterFollowers: 398400,
    description: "Travel creator / hospitality brand pipeline",
  },
  {
    id: "hmn-7",
    name: "Lerato Brand Desk",
    email: "lerato@branddesk.co.za",
    connectionStrength: "Good",
    twitterFollowers: 117400,
    description: "Brand lead / FMCG creator briefs",
  },
  {
    id: "hmn-8",
    name: "Kai Williams",
    email: "kai@hmn.agency",
    connectionStrength: "Weak",
    twitterFollowers: 228500,
    description: "Music creator / short-form sponsorship fit",
  },
  {
    id: "hmn-9",
    name: "Mpho Ndlovu",
    email: "mpho@hmn.agency",
    connectionStrength: "Very weak",
    twitterFollowers: 112300,
    description: "Prospect / profile needs verification",
  },
  {
    id: "hmn-10",
    name: "Aya Partnerships",
    email: "partnerships@aya.africa",
    connectionStrength: "Good",
    twitterFollowers: 255200,
    description: "Brand partnership / campaign negotiation",
  },
  {
    id: "hmn-11",
    name: "Tumi Khumalo",
    email: "tumi@hmn.agency",
    connectionStrength: "Very strong",
    twitterFollowers: 376000,
    description: "Fitness creator / active ambassador shortlist",
  },
  {
    id: "hmn-12",
    name: "Sage Collective",
    email: "hello@sagecollective.co.za",
    connectionStrength: "Weak",
    twitterFollowers: 133100,
    description: "Brand prospect / creative review pending",
  },
];

export default function Page() {
  return (
    <main
      className="h-screen w-screen overflow-hidden bg-background px-4 py-5 text-foreground"
      style={{ ...darkCrmTheme, paddingRight: "24px" }}
    >
      <ContactsTable title="Creator" contacts={hmnContacts} enableAnimations={false} itemsPerPage={20} />
    </main>
  );
}
