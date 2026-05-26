"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { useTheme } from "next-themes";
import {
  BarChart3,
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  ChevronDown,
  Command,
  Copy,
  Download,
  FileJson,
  FileText,
  Home,
  Inbox,
  Layers,
  Mail,
  MessageCircle,
  Plus,
  Search,
  Settings,
  User,
  UserRound,
  UserRoundSearch,
  X,
} from "lucide-react";

export interface Contact {
  id: string;
  name: string;
  email: string;
  connectionStrength: "Very weak" | "Weak" | "Good" | "Very strong";
  twitterFollowers: number;
  description?: string;
}

interface ContactsTableProps {
  title?: string;
  contacts?: Contact[];
  onContactSelect?: (contactId: string) => void;
  className?: string;
  enableAnimations?: boolean;
  itemsPerPage?: number;
}

const defaultContacts: Contact[] = [
  {
    id: "1",
    name: "Pierre from Claap",
    email: "pierre@claap.io",
    connectionStrength: "Weak",
    twitterFollowers: 2400,
    description: "Tech entrepreneur and investor",
  },
  {
    id: "2",
    name: "HardwareSavvy",
    email: "hardwaresavvy+andr...",
    connectionStrength: "Very strong",
    twitterFollowers: 8900,
    description: "Hardware specialist",
  },
  {
    id: "3",
    name: "Voiceform",
    email: "harrison@voiceform.c...",
    connectionStrength: "Good",
    twitterFollowers: 5200,
    description: "Voice technology expert",
  },
  {
    id: "4",
    name: "Marketer Milk",
    email: "hi@marketmilk.com",
    connectionStrength: "Good",
    twitterFollowers: 6100,
    description: "Marketing strategist",
  },
  {
    id: "5",
    name: "Allen from CAST AI",
    email: "allen@mail.cast.ai",
    connectionStrength: "Weak",
    twitterFollowers: 3300,
    description: "AI infrastructure lead",
  },
  {
    id: "6",
    name: "Marija Krasnovskyte",
    email: "marija@cast.ai",
    connectionStrength: "Very weak",
    twitterFollowers: 1800,
    description: "Technical advisor",
  },
  {
    id: "7",
    name: "eryn@basistheory.com",
    email: "eryn@basistheory.com",
    connectionStrength: "Very weak",
    twitterFollowers: 2100,
    description: "Security specialist",
  },
  {
    id: "8",
    name: "Brad Patterson",
    email: "brad@basistheory.com",
    connectionStrength: "Good",
    twitterFollowers: 4500,
    description: "Product manager",
  },
  {
    id: "9",
    name: "Sarah Chen",
    email: "sarah.chen@techvault.com",
    connectionStrength: "Very strong",
    twitterFollowers: 12400,
    description: "CEO and founder",
  },
  {
    id: "10",
    name: "David Rodriguez",
    email: "david.rodriguez@innovate.io",
    connectionStrength: "Good",
    twitterFollowers: 7800,
    description: "Lead developer",
  },
  {
    id: "11",
    name: "Emily Watson",
    email: "emily.watson@future.co",
    connectionStrength: "Weak",
    twitterFollowers: 3900,
    description: "Marketing director",
  },
  {
    id: "12",
    name: "James Mitchell",
    email: "james@buildit.dev",
    connectionStrength: "Very strong",
    twitterFollowers: 9200,
    description: "Architect and advisor",
  },
  {
    id: "13",
    name: "Lisa Anderson",
    email: "lisa.anderson@ventures.com",
    connectionStrength: "Good",
    twitterFollowers: 5600,
    description: "Venture investor",
  },
  {
    id: "14",
    name: "Michael Zhang",
    email: "michael@cloudtech.ai",
    connectionStrength: "Weak",
    twitterFollowers: 4100,
    description: "Infrastructure engineer",
  },
  {
    id: "15",
    name: "Jennifer Lee",
    email: "jen@designsystem.io",
    connectionStrength: "Very strong",
    twitterFollowers: 11200,
    description: "Design system lead",
  },
  {
    id: "16",
    name: "Robert Chang",
    email: "robert.chang@quantify.co",
    connectionStrength: "Good",
    twitterFollowers: 6800,
    description: "Analytics expert",
  },
  {
    id: "17",
    name: "Amanda Pierce",
    email: "amanda@growthlab.com",
    connectionStrength: "Weak",
    twitterFollowers: 2900,
    description: "Growth consultant",
  },
  {
    id: "18",
    name: "Christopher Hayes",
    email: "chris.hayes@webscale.io",
    connectionStrength: "Very strong",
    twitterFollowers: 13500,
    description: "Platform engineer",
  },
  {
    id: "19",
    name: "Victoria Moore",
    email: "victoria@datasync.com",
    connectionStrength: "Good",
    twitterFollowers: 7100,
    description: "Data scientist",
  },
  {
    id: "20",
    name: "Nicholas Brown",
    email: "nick@apibase.dev",
    connectionStrength: "Very weak",
    twitterFollowers: 1500,
    description: "API developer",
  },
  {
    id: "21",
    name: "Rebecca Sullivan",
    email: "rebecca.s@innovationlab.io",
    connectionStrength: "Good",
    twitterFollowers: 8300,
    description: "Innovation strategist",
  },
  {
    id: "22",
    name: "Thomas Wright",
    email: "thomas@blockchain.tech",
    connectionStrength: "Weak",
    twitterFollowers: 3700,
    description: "Blockchain developer",
  },
  {
    id: "23",
    name: "Maria Garcia",
    email: "maria.garcia@futuretech.com",
    connectionStrength: "Very strong",
    twitterFollowers: 10800,
    description: "Tech evangelist",
  },
  {
    id: "24",
    name: "Daniel Park",
    email: "daniel@smartsolutions.ai",
    connectionStrength: "Good",
    twitterFollowers: 6400,
    description: "Solutions architect",
  },
  {
    id: "25",
    name: "Sophie Laurent",
    email: "sophie.laurent@design.co",
    connectionStrength: "Weak",
    twitterFollowers: 4200,
    description: "UX lead",
  },
];

function NumberSymbolSquare24FilledIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hmn-symbol-gradient" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="48%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#4b4ba0" />
        </linearGradient>
      </defs>
      <path
        fill="url(#hmn-symbol-gradient)"
        d="m13.436 11l-.4 2h-2.47l.4-2zM6.25 3A3.25 3.25 0 0 0 3 6.25v11.5A3.25 3.25 0 0 0 6.25 21h11.5A3.25 3.25 0 0 0 21 17.75V6.25A3.25 3.25 0 0 0 17.75 3zm4.648 4.515a.75.75 0 0 1 .588.882l-.22 1.103h2.47l.28-1.397a.75.75 0 0 1 1.47.294l-.22 1.103h.984a.75.75 0 0 1 0 1.5h-1.285l-.4 2h1.185a.75.75 0 0 1 0 1.5h-1.485l-.28 1.398a.75.75 0 0 1-1.47-.295l.22-1.103h-2.47l-.28 1.398a.75.75 0 0 1-1.47-.295l.22-1.103H7.75a.75.75 0 0 1 0-1.5h1.286l.4-2H8.25a.75.75 0 0 1 0-1.5h1.486l.28-1.397a.75.75 0 0 1 .882-.588"
      />
    </svg>
  );
}

function RoundedFollowerIcon({ size = 14, opacity = 1 }: { size?: number; opacity?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{ opacity, flex: "0 0 auto" }}
    >
      <rect x="2.25" y="7.25" width="2.5" height="5.5" rx="1.25" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6.75" y="3.25" width="2.5" height="9.5" rx="1.25" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11.25" y="5.25" width="2.5" height="7.5" rx="1.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type SortField = "name" | "connectionStrength" | "twitterFollowers";
type SortOrder = "asc" | "desc";
type SocialPlatform = "instagram" | "tiktok" | "youtube";

const platformOrder: SocialPlatform[] = ["instagram", "tiktok", "youtube"];

const hashString = (value: string) =>
  value.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

const getContactPlatforms = (contact: Contact) => {
  const hash = hashString(contact.id);
  const platformCount = (hash % 3) + 1;
  const rotatedPlatforms = platformOrder
    .slice(hash % platformOrder.length)
    .concat(platformOrder.slice(0, hash % platformOrder.length));

  return rotatedPlatforms.slice(0, platformCount).map((platform, index) => {
    const multipliers: Record<SocialPlatform, number> = {
      instagram: 0.62,
      tiktok: 0.83,
      youtube: 0.34,
    };
    const variation = 0.88 + ((hash + index * 7) % 21) / 100;

    return {
      platform,
      count: Math.max(1000, Math.round(contact.twitterFollowers * multipliers[platform] * variation)),
    };
  });
};

function AnimatedFollowerCount({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const displayValueRef = useRef(value);

  useEffect(() => {
    const startValue = displayValueRef.current;
    const difference = value - startValue;
    const start = performance.now();
    const duration = 520;
    let animationFrame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const nextValue = Math.round(startValue + difference * eased);
      displayValueRef.current = nextValue;
      setDisplayValue(nextValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
}

function PlatformLogo({ platform }: { platform: SocialPlatform }) {
  const srcByPlatform: Record<SocialPlatform, string> = {
    instagram: "/assets/logos/instagram.svg",
    tiktok: "/assets/logos/tiktok.svg",
    youtube: "/assets/logos/youtube.svg",
  };

  return (
    <span
      aria-hidden="true"
      style={{
        width: "18px",
        height: "18px",
        display: "block",
        backgroundImage: `url(${srcByPlatform[platform]})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
      }}
    />
  );
}

export function ContactsTable({
  title = "Person",
  contacts: initialContacts = defaultContacts,
  onContactSelect,
  className = "",
  enableAnimations = true,
  itemsPerPage = 10,
}: ContactsTableProps = {}) {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showSearchMenu, setShowSearchMenu] = useState(false);
  const [filterStrength, setFilterStrength] = useState<string | null>(null);
  const [selectedContactDetail, setSelectedContactDetail] = useState<Contact | null>(null);
  const [selectedFollowerPlatforms, setSelectedFollowerPlatforms] = useState<Record<string, SocialPlatform>>({});
  const shouldReduceMotion = useReducedMotion();
  const { theme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme ?? theme ?? "dark") === "dark";

  const sortedAndFilteredContacts = useMemo(() => {
    const filtered = filterStrength
      ? initialContacts.filter((contact) => contact.connectionStrength === filterStrength)
      : [...initialContacts];

    if (!sortField) {
      return filtered;
    }

    return filtered.sort((a, b) => {
      let aVal: string | number = a[sortField];
      let bVal: string | number = b[sortField];

      if (sortField === "connectionStrength") {
        const strengthMap = {
          "Very weak": 0,
          Weak: 1,
          Good: 2,
          "Very strong": 3,
        };
        aVal = strengthMap[aVal as keyof typeof strengthMap];
        bVal = strengthMap[bVal as keyof typeof strengthMap];
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [initialContacts, sortField, sortOrder, filterStrength]);

  const paginatedContacts = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return sortedAndFilteredContacts.slice(startIdx, startIdx + itemsPerPage);
  }, [sortedAndFilteredContacts, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(sortedAndFilteredContacts.length / itemsPerPage);
  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  const handleContactSelect = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId) ? prev.filter((id) => id !== contactId) : [...prev, contactId],
    );
    onContactSelect?.(contactId);
  };

  const handleSelectAll = () => {
    if (selectedContacts.length === paginatedContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(paginatedContacts.map((contact) => contact.id));
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
    setShowSortMenu(false);
    setCurrentPage(1);
  };

  const handleFilter = (strength: string | null) => {
    setFilterStrength(strength);
    setShowFilterMenu(false);
    setCurrentPage(1);
  };

  const getStrengthColor = (strength: string) => {
    const strengthMap: Record<string, { bgColor: string; borderColor: string; textColor: string; dotColor: string }> = {
      "Very weak": {
        bgColor: isDark ? "bg-red-500/10" : "bg-red-50",
        borderColor: isDark ? "border-red-500/30" : "border-red-200",
        textColor: isDark ? "text-red-400" : "text-red-600",
        dotColor: isDark ? "bg-red-400" : "bg-red-600",
      },
      Weak: {
        bgColor: isDark ? "bg-orange-500/10" : "bg-orange-50",
        borderColor: isDark ? "border-orange-500/30" : "border-orange-200",
        textColor: isDark ? "text-orange-400" : "text-orange-600",
        dotColor: isDark ? "bg-orange-400" : "bg-orange-600",
      },
      Good: {
        bgColor: isDark ? "bg-blue-500/10" : "bg-blue-50",
        borderColor: isDark ? "border-blue-500/30" : "border-blue-200",
        textColor: isDark ? "text-blue-400" : "text-blue-600",
        dotColor: isDark ? "bg-blue-400" : "bg-blue-600",
      },
      "Very strong": {
        bgColor: isDark ? "bg-green-500/10" : "bg-green-50",
        borderColor: isDark ? "border-green-500/30" : "border-green-200",
        textColor: isDark ? "text-green-400" : "text-green-600",
        dotColor: isDark ? "bg-green-400" : "bg-green-600",
      },
    };

    return strengthMap[strength];
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Connection Strength", "Follower count", "Description"];
    const rows = sortedAndFilteredContacts.map((contact) => [
      contact.name,
      contact.email,
      contact.connectionStrength,
      contact.twitterFollowers,
      contact.description || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `contacts-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
  };

  const exportToJSON = () => {
    const jsonContent = JSON.stringify(sortedAndFilteredContacts, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `contacts-${new Date().toISOString().split("T")[0]}.json`;
    link.click();
  };

  const containerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  };

  const rowVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.7,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2 },
    },
  };

  const tableCellPadding = { paddingLeft: "18px", paddingRight: "18px" };
  const tableEdgeCellPadding = { paddingLeft: "14px", paddingRight: "14px" };
  const toolbarButtonPadding = { height: "30px", padding: "5px 8px" };
  const toolbarMenuPadding = { padding: "8px" };
  const toolbarMenuItemStyle = {
    padding: "8px 10px",
    gap: "8px",
    borderRadius: "5px",
  };
  const toolbarMenuIconStyle = {
    color: "rgba(244,244,245,0.52)",
    flex: "0 0 auto",
  };
  const railGradient = "linear-gradient(135deg, #ffffff 0%, #ec4899 48%, #4b4ba0 100%)";
  const railRadialGradient = "radial-gradient(circle at 28% 25%, #ffffff 0%, #ec4899 42%, #4b4ba0 100%)";
  const searchCommands = [
    "Find creator profile",
    "Search brand contact",
    "Open campaign brief",
    "Review active pipeline",
  ];
  const railItems = [
    { label: "Home", icon: Home },
    { label: "Creators", icon: UserRoundSearch, active: true },
    { label: "Campaigns", icon: Layers },
    { label: "Pipeline", icon: Inbox },
    { label: "Reports", icon: BarChart3 },
    { label: "Settings", icon: Settings },
  ];

  return (
    <div className={`w-full max-w-7xl mx-auto ${className}`} style={{ height: "100%" }}>
      <div style={{ display: "flex", alignItems: "stretch", gap: "16px", height: "100%", minHeight: "100%" }}>
        <aside
          aria-label="CRM navigation"
          style={{
            alignSelf: "stretch",
            background: "#050506",
            borderRight: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 0,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
            display: "flex",
            flex: "0 0 56px",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            height: "100%",
            minHeight: "100%",
            overflow: "hidden",
            padding: "8px",
            position: "sticky",
            top: 0,
            width: "56px",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: "30px",
              height: "30px",
              display: "grid",
              placeItems: "center",
            }}
          >
            <NumberSymbolSquare24FilledIcon size={28} />
          </div>

          <nav aria-label="CRM sections" style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "4px" }}>
            {railItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  title={item.label}
                  aria-label={item.label}
                  aria-current={item.active ? "page" : undefined}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "9px",
                    border: item.active ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
                    background: item.active ? "rgba(255,255,255,0.08)" : "transparent",
                    boxShadow: item.active ? "inset 0 1px 0 rgba(255,255,255,0.12)" : undefined,
                    backdropFilter: item.active ? "blur(12px)" : undefined,
                    color: item.active ? "rgba(244,244,245,0.88)" : "rgba(244,244,245,0.68)",
                    display: "grid",
                    placeItems: "center",
                    cursor: "default",
                  }}
                >
                  <Icon size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              );
            })}
          </nav>

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <button
              type="button"
              title="Notifications"
              aria-label="Notifications"
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "9px",
                border: "1px solid transparent",
                background: "transparent",
                color: "rgba(244,244,245,0.68)",
                display: "grid",
                placeItems: "center",
                cursor: "default",
              }}
            >
              <Bell size={16} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <div
              aria-hidden="true"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                background: railRadialGradient,
                boxShadow: "0 0 18px rgba(236,72,153,0.2)",
              }}
            />
          </div>
        </aside>

        <div
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            height: "100%",
            minHeight: 0,
            minWidth: 0,
            overflow: "hidden",
            paddingBottom: "1px",
          }}
        >
      <div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        style={{
          background: "rgba(9,9,11,0.92)",
          backdropFilter: "blur(14px)",
          flex: "0 0 auto",
          marginBottom: "6px",
          padding: "12px 0",
          position: "sticky",
          top: 0,
          zIndex: 30,
        }}
      >
        <div className="flex items-center gap-2">
          <div style={{ padding: "0 4px" }}>
            <p
              style={{
                color: "rgba(244,244,245,0.92)",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: 1,
              }}
            >
              Creators
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <button
              type="button"
              aria-label="Open search command menu"
              onClick={() => setShowSearchMenu(!showSearchMenu)}
              className="bg-background border border-border/50 text-foreground text-sm transition-colors flex items-center rounded-md"
              style={{
                height: "30px",
                minWidth: "240px",
                padding: "5px 8px",
                gap: "8px",
              }}
            >
              <Search size={14} strokeWidth={1.8} aria-hidden="true" style={{ color: "rgba(244,244,245,0.58)" }} />
              <span style={{ color: "rgba(244,244,245,0.52)", flex: 1, textAlign: "left" }}>Search CRM</span>
              <span
                aria-hidden="true"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "4px",
                  color: "rgba(244,244,245,0.45)",
                  fontSize: "10px",
                  lineHeight: 1,
                  padding: "3px 5px",
                }}
              >
                <Command size={12} strokeWidth={1.8} />
              </span>
            </button>

            {showSearchMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSearchMenu(false)} />
                <div
                  className="absolute left-0 mt-1 bg-background border border-border/50 shadow-lg rounded-md z-20"
                  onMouseLeave={() => setShowSearchMenu(false)}
                  style={{
                    padding: "6px",
                    width: "260px",
                  }}
                >
                  {searchCommands.map((command) => (
                    <button
                      key={command}
                      type="button"
                      onClick={() => setShowSearchMenu(false)}
                      className="w-full text-left text-sm hover:bg-muted/50 transition-colors rounded-sm"
                      style={{ padding: "8px 10px", color: "rgba(244,244,245,0.82)" }}
                    >
                      {command}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap" style={{ padding: "0 4px" }}>
          <button
            type="button"
            className="border border-border/50 text-sm transition-colors flex items-center gap-2 rounded-md"
            style={{
              ...toolbarButtonPadding,
              background: railGradient,
              color: "#050506",
              fontWeight: 600,
            }}
          >
            <Plus size={14} strokeWidth={2} aria-hidden="true" />
            New
          </button>

          <div className="relative">
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className={`px-3 py-1.5 bg-background border border-border/50 text-foreground text-sm hover:bg-muted/30 transition-colors flex items-center gap-2 rounded-md ${filterStrength ? "ring-2 ring-primary/30" : ""}`}
              style={toolbarButtonPadding}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 3H14M4 8H12M6 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Filter
              {filterStrength && <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-sm px-1.5 py-0.5">1</span>}
            </button>

            {showFilterMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowFilterMenu(false)} />
                <div
                  className="absolute right-0 mt-1 w-44 bg-background border border-border/50 shadow-lg rounded-md z-20"
                  onMouseLeave={() => setShowFilterMenu(false)}
                  style={toolbarMenuPadding}
                >
                  <button
                    onClick={() => handleFilter(null)}
                    className={`w-full text-left text-sm hover:bg-muted/50 transition-colors flex items-center ${!filterStrength ? "bg-muted/30" : ""}`}
                    style={toolbarMenuItemStyle}
                  >
                    <Check size={13} strokeWidth={1.8} aria-hidden="true" style={{ ...toolbarMenuIconStyle, opacity: !filterStrength ? 1 : 0.24 }} />
                    All Connections
                  </button>
                  <div className="h-px bg-border/30" style={{ margin: "6px 0" }} />
                  {["Very strong", "Good", "Weak", "Very weak"].map((strength) => (
                    <button
                      key={strength}
                      onClick={() => handleFilter(strength)}
                      className={`w-full text-left text-sm hover:bg-muted/50 transition-colors flex items-center ${filterStrength === strength ? "bg-muted/30" : ""}`}
                      style={toolbarMenuItemStyle}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          ...toolbarMenuIconStyle,
                          width: "7px",
                          height: "7px",
                          borderRadius: "999px",
                          background:
                            strength === "Very strong"
                              ? "#4ade80"
                              : strength === "Good"
                                ? "#60a5fa"
                                : strength === "Weak"
                                  ? "#fb923c"
                                  : "#f87171",
                        }}
                      />
                      {strength}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="px-3 py-1.5 bg-background border border-border/50 text-foreground text-sm hover:bg-muted/30 transition-colors flex items-center gap-2 rounded-md"
              style={toolbarButtonPadding}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 6L6 3L9 6M6 3V13M13 10L10 13L7 10M10 13V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sort {sortField && <span className="ml-1 text-xs bg-primary text-primary-foreground rounded-sm px-1.5 py-0.5">1</span>}
              <ChevronDown size={14} className="opacity-50" />
            </button>

            {showSortMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSortMenu(false)} />
                <div
                  className="absolute right-0 mt-1 w-48 bg-background border border-border/50 shadow-lg rounded-md z-20"
                  onMouseLeave={() => setShowSortMenu(false)}
                  style={toolbarMenuPadding}
                >
                  <button
                    onClick={() => handleSort("name")}
                    className={`w-full text-left text-sm hover:bg-muted/50 transition-colors flex items-center ${sortField === "name" ? "bg-muted/30" : ""}`}
                    style={toolbarMenuItemStyle}
                  >
                    <UserRound size={13} strokeWidth={1.8} aria-hidden="true" style={toolbarMenuIconStyle} />
                    <span>Name {sortField === "name" && `(${sortOrder === "asc" ? "A-Z" : "Z-A"})`}</span>
                  </button>
                  <button
                    onClick={() => handleSort("connectionStrength")}
                    className={`w-full text-left text-sm hover:bg-muted/50 transition-colors flex items-center ${sortField === "connectionStrength" ? "bg-muted/30" : ""}`}
                    style={toolbarMenuItemStyle}
                  >
                    <BarChart3 size={13} strokeWidth={1.8} aria-hidden="true" style={toolbarMenuIconStyle} />
                    <span>Connection {sortField === "connectionStrength" && `(${sortOrder === "asc" ? "up" : "down"})`}</span>
                  </button>
                  <button
                    onClick={() => handleSort("twitterFollowers")}
                    className={`w-full text-left text-sm hover:bg-muted/50 transition-colors flex items-center ${sortField === "twitterFollowers" ? "bg-muted/30" : ""}`}
                    style={toolbarMenuItemStyle}
                  >
                    <span style={toolbarMenuIconStyle}>
                      <RoundedFollowerIcon size={13} />
                    </span>
                    <span>Follower count {sortField === "twitterFollowers" && `(${sortOrder === "asc" ? "up" : "down"})`}</span>
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              className="px-3 py-1.5 bg-background border border-border/50 text-foreground text-sm hover:bg-muted/30 transition-colors flex items-center gap-2 rounded-md"
              style={toolbarButtonPadding}
            >
              <Download size={14} />
              Export
              <ChevronDown size={14} className="opacity-50" />
            </button>

            {showExportMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowExportMenu(false)} />
                <div
                  className="absolute right-0 mt-1 w-32 bg-background border border-border/50 shadow-lg rounded-md z-20"
                  onMouseLeave={() => setShowExportMenu(false)}
                  style={toolbarMenuPadding}
                >
                  <button
                    onClick={() => {
                      exportToCSV();
                      setShowExportMenu(false);
                    }}
                    className="w-full text-left text-sm hover:bg-muted/50 transition-colors flex items-center"
                    style={toolbarMenuItemStyle}
                  >
                    <FileText size={13} strokeWidth={1.8} aria-hidden="true" style={toolbarMenuIconStyle} />
                    CSV
                  </button>
                  <button
                    onClick={() => {
                      exportToJSON();
                      setShowExportMenu(false);
                    }}
                    className="w-full text-left text-sm hover:bg-muted/50 transition-colors flex items-center"
                    style={toolbarMenuItemStyle}
                  >
                    <FileJson size={13} strokeWidth={1.8} aria-hidden="true" style={toolbarMenuIconStyle} />
                    JSON
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className="bg-background border border-border/50 overflow-hidden rounded-lg relative"
        style={{ display: "flex", flex: "1 1 auto", flexDirection: "column", minHeight: 0 }}
      >
        <div className="overflow-x-auto" style={{ display: "flex", flex: 1, minHeight: 0 }}>
          <div className="min-w-[1100px]" style={{ display: "flex", flex: 1, flexDirection: "column", minHeight: 0 }}>
            <div
              className="text-xs font-medium text-muted-foreground/60 bg-muted/5 border-b border-border/30 text-left"
              style={{
                display: "grid",
                flex: "0 0 auto",
                gridTemplateColumns: "40px 220px 160px 170px 190px 1fr 40px",
                columnGap: "0px",
                minHeight: "36px",
                padding: "10px 12px",
              }}
            >
              <div className="flex items-center justify-center border-r border-border/20" style={tableEdgeCellPadding}>
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border/40 cursor-pointer"
                  style={{ accentColor: isDark ? "rgb(113, 113, 122)" : "rgb(161, 161, 170)" }}
                  checked={paginatedContacts.length > 0 && selectedContacts.length === paginatedContacts.length}
                  onChange={handleSelectAll}
                />
              </div>
              <div className="flex items-center gap-1.5 border-r border-border/20" style={tableCellPadding}>
                <UserRound
                  size={14}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  style={{ opacity: 0.4, flex: "0 0 auto" }}
                />
                <span>{title}</span>
              </div>
              <div className="flex items-center gap-1.5 border-r border-border/20" style={tableCellPadding}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-40">
                  <path d="M3 8L6 5L10 9L13 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>Connection Streng...</span>
              </div>
              <div className="flex items-center gap-1.5 border-r border-border/20" style={tableCellPadding}>
                <RoundedFollowerIcon size={14} opacity={0.4} />
                <span>Follower count</span>
              </div>
              <div className="flex items-center gap-1.5 border-r border-border/20" style={tableCellPadding}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-40">
                  <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <path d="M2 6L8 9L14 6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <span>Email Addresses</span>
              </div>
              <div className="flex items-center gap-1.5 border-r border-border/20" style={tableCellPadding}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-40">
                  <path d="M3 3H13M3 8H13M3 13H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>Description</span>
              </div>
              <div className="flex items-center justify-center" style={tableEdgeCellPadding}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="opacity-30">
                  <circle cx="8" cy="8" r="1" fill="currentColor" />
                  <circle cx="13" cy="8" r="1" fill="currentColor" />
                  <circle cx="3" cy="8" r="1" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div style={{ flex: "1 1 auto", minHeight: 0, overflowY: "auto" }}>
              <AnimatePresence mode="wait">
                <motion.div key={`page-${currentPage}`} variants={shouldAnimate ? containerVariants : {}} initial={shouldAnimate ? "hidden" : "visible"} animate="visible">
                  {paginatedContacts.map((contact) => (
                    <motion.div key={contact.id} variants={shouldAnimate ? rowVariants : {}}>
                      <div
                        className={`group relative transition-all duration-150 border-b border-border/20 ${
                          selectedContacts.includes(contact.id) ? "bg-muted/30" : "bg-muted/5 hover:bg-muted/20"
                        }`}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "40px 220px 160px 170px 190px 1fr 40px",
                          columnGap: "0px",
                          alignItems: "center",
                          minHeight: "42px",
                          padding: "12px 12px",
                        }}
                      >
                        <div className="flex items-center justify-center border-r border-border/20" style={tableEdgeCellPadding}>
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-border/40 cursor-pointer"
                            style={{ accentColor: isDark ? "rgb(113, 113, 122)" : "rgb(161, 161, 170)" }}
                            checked={selectedContacts.includes(contact.id)}
                            onChange={() => handleContactSelect(contact.id)}
                          />
                        </div>

                        <div className="flex items-center gap-2 min-w-0 border-r border-border/20" style={tableCellPadding}>
                          <div className="inline-flex items-center gap-2 bg-muted/30 rounded-full" style={{ padding: "6px 12px" }}>
                            <UserRound
                              size={14}
                              strokeWidth={1.5}
                              aria-hidden="true"
                              style={{ opacity: 0.5, flex: "0 0 auto" }}
                            />
                            <div className="min-w-0">
                              <div className="text-sm text-foreground truncate">{contact.name}</div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center border-r border-border/20" style={tableCellPadding}>
                          {(() => {
                            const { bgColor, textColor, dotColor } = getStrengthColor(contact.connectionStrength);
                            return (
                              <div className={`inline-flex items-center gap-1.5 text-xs font-medium ${bgColor} ${textColor} rounded-md`} style={{ padding: "6px 10px" }}>
                                {contact.connectionStrength === "Very strong" ? (
                                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                                    <path d="M8 1L3 9H7L8 15L13 7H9L8 1Z" />
                                  </svg>
                                ) : (
                                  <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                                )}
                                {contact.connectionStrength}
                              </div>
                            );
                          })()}
                        </div>

                        <div className="flex items-center border-r border-border/20" style={{ ...tableCellPadding, gap: "8px" }}>
                          {(() => {
                            const platforms = getContactPlatforms(contact);
                            const selectedPlatform = selectedFollowerPlatforms[contact.id];
                            const selectedPlatformData = platforms.find((item) => item.platform === selectedPlatform);
                            const displayedCount = selectedPlatformData?.count ?? contact.twitterFollowers;

                            return (
                              <>
                                <span className="text-sm text-foreground/80 tabular-nums" style={{ minWidth: "58px" }}>
                                  <AnimatedFollowerCount value={displayedCount} />
                                </span>
                                <div className="flex items-center" style={{ gap: "4px" }}>
                                  {platforms.map(({ platform }) => (
                                    <button
                                      key={platform}
                                      type="button"
                                      title={platform}
                                      aria-label={`Show ${platform} follower count for ${contact.name}`}
                                      className="transition-opacity hover:opacity-100"
                                      style={{
                                        opacity: selectedPlatform && selectedPlatform !== platform ? 0.46 : 0.9,
                                        display: "grid",
                                        placeItems: "center",
                                      }}
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        setSelectedFollowerPlatforms((current) => ({
                                          ...current,
                                          [contact.id]: platform,
                                        }));
                                      }}
                                    >
                                      <PlatformLogo platform={platform} />
                                    </button>
                                  ))}
                                </div>
                              </>
                            );
                          })()}
                        </div>

                        <div className="flex items-center min-w-0 border-r border-border/20" style={{ ...tableCellPadding, gap: "8px" }}>
                          <a href={`mailto:${contact.email}`} className="text-sm text-blue-500 hover:text-blue-600 truncate" onClick={(event) => event.stopPropagation()}>
                            {contact.email}
                          </a>
                          <button
                            type="button"
                            aria-label={`Copy ${contact.email}`}
                            className="opacity-0 group-hover:opacity-55 hover:opacity-100 transition-opacity"
                            style={{ color: "rgba(244,244,245,0.72)", flex: "0 0 auto" }}
                            onClick={(event) => {
                              event.stopPropagation();
                              void navigator.clipboard.writeText(contact.email);
                            }}
                          >
                            <Copy size={13} strokeWidth={1.8} aria-hidden="true" />
                          </button>
                        </div>

                        <div className="flex items-center min-w-0 border-r border-border/20" style={tableCellPadding}>
                          <span className="text-sm text-muted-foreground/80 truncate">{contact.description || "-"}</span>
                        </div>

                        <div className="flex items-center justify-center" style={tableEdgeCellPadding}>
                          <button onClick={() => setSelectedContactDetail(contact)} className="opacity-0 group-hover:opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                              <circle cx="8" cy="3" r="1.5" fill="currentColor" />
                              <circle cx="8" cy="8" r="1.5" fill="currentColor" />
                              <circle cx="8" cy="13" r="1.5" fill="currentColor" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {selectedContactDetail && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-10"
              onClick={() => setSelectedContactDetail(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
                className="bg-card border border-border rounded-xl p-6 mx-6 shadow-lg relative max-w-md w-full"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedContactDetail(null)}
                  className="absolute top-3 right-3 w-6 h-6 rounded-full bg-muted/50 hover:bg-muted/70 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{selectedContactDetail.name}</h3>
                      {(() => {
                        const { bgColor, textColor, dotColor } = getStrengthColor(selectedContactDetail.connectionStrength);
                        return (
                          <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium ${bgColor} ${textColor} rounded-md mt-1`}>
                            {selectedContactDetail.connectionStrength === "Very strong" ? (
                              <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 1L3 9H7L8 15L13 7H9L8 1Z" />
                              </svg>
                            ) : (
                              <div className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                            )}
                            {selectedContactDetail.connectionStrength}
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Mail className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Email</span>
                      </div>
                      <a href={`mailto:${selectedContactDetail.email}`} className="text-sm text-blue-500 hover:text-blue-600">
                        {selectedContactDetail.email}
                      </a>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <MessageCircle className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Follower count</span>
                      </div>
                      <p className="text-sm font-medium text-foreground">{selectedContactDetail.twitterFollowers.toLocaleString()}</p>
                    </div>

                    {selectedContactDetail.description && (
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-xs text-muted-foreground uppercase tracking-wide">Description</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedContactDetail.description}</p>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-border/50">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md text-sm font-medium transition-colors"
                      onClick={() => {
                        window.location.href = `mailto:${selectedContactDetail.email}`;
                      }}
                    >
                      Send Email
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between px-2" style={{ paddingTop: "8px", paddingBottom: "8px" }}>
          <div className="text-xs text-muted-foreground/70">
            Page {currentPage} of {totalPages} / {sortedAndFilteredContacts.length} contacts
          </div>

          <div className="flex gap-1.5">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="border border-border/50 text-foreground text-xs hover:bg-muted/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-md inline-flex items-center gap-1.5"
              style={{ background: "transparent", padding: "6px 10px" }}
            >
              <ArrowLeft size={13} strokeWidth={1.8} aria-hidden="true" />
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="border border-border/50 text-foreground text-xs hover:bg-muted/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors rounded-md inline-flex items-center gap-1.5"
              style={{ background: "transparent", padding: "6px 10px" }}
            >
              Next
              <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
