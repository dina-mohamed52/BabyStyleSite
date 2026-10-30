import { useState, useEffect, useCallback } from "react";
import {
  Menu,
  ShoppingCart,
  X,
  ChevronDown,
  Sparkles,
  Home,
  Sun,
  Snowflake,
  Heart,
  Layers,
  Grid3x3,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

// ---------------------------------------------------------------------------
// Design System - احترافي أنيق بألوان Pink ناعم مع Navy Dark
// ---------------------------------------------------------------------------
const COLORS = {
  primary: "#F472B6",
  primaryDark: "#E060A0",
  primaryLight: "#F9A8D4",
  primarySoft: "rgba(244, 114, 182, 0.15)",
  primaryGlow: "rgba(244, 114, 182, 0.3)",

  secondary: "#1C2533",
  secondaryLight: "#2A3548",
  secondarySoft: "rgba(28, 37, 51, 0.12)",
  secondaryGlow: "rgba(28, 37, 51, 0.2)",

  accent: "#F472B6",
  accentSoft: "rgba(244, 114, 182, 0.15)",

  ink: "#1A1513",
  inkSoft: "#3D322E",
  muted: "#8A7A72",
  mutedLight: "#C5B5AD",

  bg: "#FCF9F7",
  card: "#FFFFFF",
  hairline: "#E8DDD7",
  hairlineDark: "#D5C8C0",

  shadow: "rgba(28, 37, 51, 0.08)",
  shadowStrong: "rgba(28, 37, 51, 0.15)",
  overlay: "rgba(28, 37, 51, 0.35)",

  white: "#FFFFFF",
};

// ---------------------------------------------------------------------------
// Navigation data (ثابتة — مش بتتعمل من جديد مع كل render)
// ---------------------------------------------------------------------------
const NAV_TREE = [
  {
    key: "home",
    to: "/",
    icon: <Home size={18} strokeWidth={1.5} />,
    label: { ar: "الرئيسية", en: "Home" },
  },
  {
    key: "summer",
    type: "section",
    icon: <Sun size={18} strokeWidth={1.5} />,
    label: { ar: "صيفي", en: "Summer" },
    accent: COLORS.primary,
    children: [
      {
        key: "summer.turbans",
        type: "section",
        icon: <Layers size={16} strokeWidth={1.5} />,
        label: { ar: "بندانات وتربونات", en: "Headbands & Turbans" },
        badge: { ar: "الأكثر مبيعاً", en: "Bestseller" },
        mainPage: "/Turbon",
        children: [
          {
            key: "summer.turbans.bandanas",
            to: "/turbon/bandana",
            label: { ar: "بندانات", en: "Headbands" },
          },
          {
            key: "summer.turbans.turbans",
            to: "/turbon/turbon",
            label: { ar: "تربونات", en: "Turbans" },
          },
          {
            key: "summer.turbans.bandanaSet",
            to: "/turbon/bandana-set",
            label: { ar: "طقم بندانات", en: "Headband Set" },
          },
          {
            key: "summer.turbans.turbanSet",
            to: "/turbon/turbon-set",
            label: { ar: "طقم تربونات", en: "Turban Set" },
          },
        ],
      },
      {
        key: "summer.halfColon",
        to: "/SummerHalfColon",
        label: { ar: "هاف كولون", en: "Half Colon" },
        badge: { ar: "جديد", en: "New" },
      },
      {
        key: "summer.colon",
        to: "/SummerColon",
        label: { ar: "كولونات صيفي", en: "Summer Colon" },
        badge: { ar: "تخفيضات", en: "Sale" },
      },
      {
        key: "summer.clothes",
        type: "section",
        icon: <Grid3x3 size={16} strokeWidth={1.5} />,
        label: { ar: "ملابس صيفي", en: "Summer Clothes" },
        badge: { ar: "جديد", en: "New" },
        mainPage: "/clothes",
        children: [
          {
            key: "summer.clothes.tops",
            to: "/clothes/top",
            label: { ar: "توبات", en: "Tops" },
          },
          {
            key: "summer.clothes.leggings",
            to: "/clothes/legging",
            label: { ar: "ليجنز", en: "Leggings" },
          },
          {
            key: "summer.clothes.shorts",
            to: "/clothes/short",
            label: { ar: "شورتات", en: "Shorts" },
          },
        ],
      },
    ],
  },
  {
    key: "winter",
    type: "section",
    icon: <Snowflake size={18} strokeWidth={1.5} />,
    label: { ar: "شتوي", en: "Winter" },
    accent: COLORS.secondary,
    mainPage: "/winterHomePage",
    children: [
      {
        key: "winter.collection",
        to: "/WinterCollection",
        label: { ar: "كولونات رسومات شتوية", en: "Winter Collection" },
        badge: { ar: "الأكثر طلباً", en: "Most Wanted" },
      },
      {
        key: "winter.lined",
        to: "/winter/Lined",
        label: { ar: "كولونات شتوية مبطنة", en: "Winter Lined" },
        badge: { ar: "الأكثر طلباً", en: "Most Wanted" },
      },
      {
        key: "winter.fur",
        to: "/winter/fur",
        label: { ar: " كولونات شتوية مبطنة فرو", en: "Winter fur" },
        badge: { ar: "جديد", en: "Most Wanted" },
      },
    ],
  },
  {
    key: "cart",
    to: "/Checkout",
    icon: <ShoppingCart size={18} strokeWidth={1.5} />,
    label: { ar: "السلة", en: "Cart" },
  },
];

const SLIDE_MS = 300;

// ---------------------------------------------------------------------------
// Small pieces
// ---------------------------------------------------------------------------
function Badge({ text, accent }) {
  if (!text) return null;
  return (
    <span
      className="shrink-0 text-[8px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase"
      style={{
        color: accent,
        backgroundColor: `${accent}18`,
        border: `1px solid ${accent}30`,
      }}
    >
      {text}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Recursive node (component ثابت — مفيش motion components ولا layoutId)
// ---------------------------------------------------------------------------
function NavNode({ node, depth, ctx }) {
  const { lang, isRTL, expandedKeys, toggleExpand, close } = ctx;
  const pick = (o) => (o ? o[lang] || o.en || "" : "");
  const hoverShift = isRTL ? "hover:-translate-x-0.5" : "hover:translate-x-0.5";

  // ---------------- Section ----------------
  if (node.type === "section") {
    const isExpanded = expandedKeys.has(node.key);
    const accent = node.accent || COLORS.primary;
    const hasChildren = node.children && node.children.length > 0;

    const iconEl = node.icon && (
      <span
        className="shrink-0 transition-all duration-300"
        style={{
          color: isExpanded ? accent : COLORS.muted,
          transform: isExpanded ? "scale(1.15) rotate(5deg)" : "none",
        }}
      >
        {node.icon}
      </span>
    );

    return (
      <div className="space-y-0.5">
        <div className="flex items-center gap-1">
          {node.mainPage ? (
            <div className="flex items-center gap-1 flex-1">
              {/* اسم القسم كـ NavLink للصفحة الرئيسية */}
              <NavLink
                to={node.mainPage}
                className="flex-1 min-w-0"
                onClick={close}
              >
                {({ isActive }) => (
                  <div
                    className={`w-full flex items-center gap-3 rounded-2xl transition-all duration-300 px-4 py-3.5 active:scale-[0.98] ${hoverShift} ${
                      isActive ? "" : "hover:bg-white/60"
                    }`}
                    style={{
                      backgroundColor: isActive ? `${accent}12` : undefined,
                      color: COLORS.ink,
                      boxShadow: isExpanded
                        ? `0 2px 16px ${COLORS.shadow}`
                        : "none",
                      border: isActive
                        ? `1px solid ${accent}25`
                        : "1px solid transparent",
                    }}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      {node.icon && (
                        <span
                          className="shrink-0 transition-all duration-300"
                          style={{
                            color: isActive ? accent : COLORS.muted,
                            transform: isExpanded
                              ? "scale(1.15) rotate(5deg)"
                              : "none",
                          }}
                        >
                          {node.icon}
                        </span>
                      )}
                      <span className="truncate text-[15px] font-bold tracking-wide">
                        {pick(node.label)}
                      </span>
                      <Badge text={pick(node.badge)} accent={accent} />
                    </span>
                    {isActive && (
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: accent }}
                      />
                    )}
                  </div>
                )}
              </NavLink>

              {/* زر السهم المنفصل لفتح/قفل الـ children */}
              {hasChildren && (
                <button
                  type="button"
                  onClick={() => toggleExpand(node.key)}
                  aria-expanded={isExpanded}
                  aria-label={isExpanded ? "إغلاق القسم" : "فتح القسم"}
                  className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-90 hover:bg-[var(--hv)]"
                  style={{
                    "--hv": `${accent}20`,
                    color: isExpanded ? accent : COLORS.muted,
                    backgroundColor: isExpanded ? `${accent}15` : undefined,
                  }}
                >
                  <ChevronDown
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-300"
                    style={{
                      transform: isExpanded ? "rotate(180deg)" : "none",
                    }}
                  />
                </button>
              )}
            </div>
          ) : (
            // قسم ملوش صفحة رئيسية — زر عادي
            <button
              type="button"
              onClick={() => toggleExpand(node.key)}
              aria-expanded={isExpanded}
              className={`w-full flex items-center justify-between gap-3 rounded-2xl transition-all duration-300 active:scale-[0.98] ${hoverShift} ${
                depth === 0 ? "px-4 py-3.5" : "px-3.5 py-3"
              } ${isExpanded ? "" : "hover:bg-white/60"}`}
              style={{
                backgroundColor: isExpanded ? `${accent}12` : undefined,
                color:
                  isExpanded || depth === 0 ? COLORS.ink : COLORS.muted,
                boxShadow: isExpanded ? `0 2px 16px ${COLORS.shadow}` : "none",
                border: isExpanded
                  ? `1px solid ${accent}25`
                  : "1px solid transparent",
              }}
            >
              <span className="flex items-center gap-3 min-w-0">
                {iconEl}
                <span
                  className={`truncate transition-all duration-300 ${
                    depth === 0
                      ? "text-[15px] font-bold tracking-wide"
                      : "text-[13.5px] font-medium"
                  }`}
                >
                  {pick(node.label)}
                </span>
                <Badge text={pick(node.badge)} accent={accent} />
              </span>
              <ChevronDown
                size={16}
                strokeWidth={1.5}
                className="shrink-0 transition-transform duration-300"
                style={{
                  color: isExpanded ? accent : COLORS.muted,
                  transform: isExpanded ? "rotate(180deg)" : "none",
                }}
              />
            </button>
          )}
        </div>

        {/* الـ children — فتح/قفل بـ CSS من غير قياس ارتفاع ولا AnimatePresence */}
        {hasChildren && (
          <div
            aria-hidden={!isExpanded}
            style={{
              display: "grid",
              gridTemplateRows: isExpanded ? "1fr" : "0fr",
              opacity: isExpanded ? 1 : 0,
              visibility: isExpanded ? "visible" : "hidden",
              transition: `grid-template-rows ${SLIDE_MS}ms ease-in-out, opacity 250ms ease, visibility 0s linear ${
                isExpanded ? "0s" : `${SLIDE_MS}ms`
              }`,
            }}
          >
            <div className="overflow-hidden min-h-0">
              <div
                className={`flex flex-col gap-0.5 py-1.5 ${
                  isRTL ? "mr-4 pr-3" : "ml-4 pl-3"
                }`}
                style={{ borderInlineStart: `2px solid ${COLORS.hairline}` }}
              >
                {node.children.map((child) => (
                  <NavNode
                    key={child.key}
                    node={child}
                    depth={depth + 1}
                    ctx={ctx}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---------------- Leaf link ----------------
  return (
    <NavLink to={node.to} end={node.to === "/"} onClick={close}>
      {({ isActive }) => (
        <div
          className={`flex items-center justify-between gap-3 rounded-2xl transition-all duration-300 active:scale-[0.97] ${hoverShift} ${
            depth === 0 ? "px-4 py-3.5" : "px-3.5 py-3"
          } ${isActive ? "" : "hover:bg-white/60"}`}
          style={{
            backgroundColor: isActive ? `${COLORS.primary}12` : undefined,
            color: isActive || depth === 0 ? COLORS.ink : COLORS.muted,
            border: isActive
              ? `1px solid ${COLORS.primary}25`
              : "1px solid transparent",
            boxShadow: isActive ? `inset 3px 0 0 ${COLORS.primary}` : "none",
          }}
        >
          <span className="flex items-center gap-3 min-w-0">
            {node.icon ? (
              <span
                className="shrink-0 transition-all duration-300"
                style={{ color: isActive ? COLORS.primary : COLORS.muted }}
              >
                {node.icon}
              </span>
            ) : depth > 0 ? (
              <div
                className="shrink-0 w-1.5 h-1.5 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isActive ? COLORS.primary : COLORS.hairline,
                }}
              />
            ) : null}
            <span
              className={`truncate transition-all duration-300 ${
                depth === 0
                  ? "text-[15px] font-bold tracking-wide"
                  : "text-[13.5px] font-medium"
              } ${isActive ? "font-bold" : ""}`}
            >
              {pick(node.label)}
            </span>
          </span>
          <span className="flex items-center gap-2 shrink-0">
            <Badge text={pick(node.badge)} accent={COLORS.primary} />
            {isActive && (
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS.primary }}
              />
            )}
          </span>
        </div>
      )}
    </NavLink>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState(() => new Set());
  const { i18n, t } = useTranslation();
  const lang = (i18n.language || "en").split("-")[0];
  const isRTL = lang === "ar";

  const close = useCallback(() => setIsOpen(false), []);

  const toggleExpand = useCallback((key) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  // قفل سكرول الصفحة + Escape أثناء الفتح
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const ctx = { lang, isRTL, expandedKeys, toggleExpand, close };

  const closedTransform = isRTL ? "translateX(-100%)" : "translateX(100%)";

  return (
    <>
      {/* Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={t("nav.open", "Open menu")}
        className={`fixed top-5 z-[100] bg-white p-4 rounded-2xl border-2 shadow-lg
          transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(244,114,182,0.3)] active:scale-90
          ${isRTL ? "left-5" : "right-5"}
          ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ borderColor: COLORS.primary, color: COLORS.primary }}
      >
        <Menu size={20} strokeWidth={1.5} />
      </button>

      {/* Overlay — دايماً موجود، بس بيبقى pointer-events-none وهو مقفول
          فمستحيل يفضل حاجز على الصفحة */}
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backgroundColor: COLORS.overlay,
          backdropFilter: isOpen ? "blur(4px)" : "none",
          WebkitBackdropFilter: isOpen ? "blur(4px)" : "none",
        }}
      />

      {/* Sidebar */}
      <aside
        aria-hidden={!isOpen}
        className={`fixed top-0 ${
          isRTL ? "left-0" : "right-0"
        } h-full w-[360px] max-w-[90vw] z-[65] flex flex-col`}
        style={{
          backgroundColor: COLORS.bg,
          boxShadow: `-4px 0 50px ${COLORS.shadowStrong}`,
          transform: isOpen ? "translateX(0)" : closedTransform,
          visibility: isOpen ? "visible" : "hidden",
          transition: `transform ${SLIDE_MS}ms cubic-bezier(0.22, 1, 0.36, 1), visibility 0s linear ${
            isOpen ? "0s" : `${SLIDE_MS}ms`
          }`,
          willChange: "transform",
        }}
      >
        {/* Header */}
        <div
          className="flex justify-between items-center px-6 py-6 shrink-0 relative overflow-hidden"
          style={{
            borderBottom: `3px solid ${COLORS.primary}`,
            background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondaryLight} 40%, ${COLORS.primary} 80%, ${COLORS.primaryLight} 100%)`,
          }}
        >
          <div
            className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
            style={{ background: COLORS.white }}
          />
          <div
            className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-[0.08] translate-y-1/2 -translate-x-1/2"
            style={{ background: COLORS.white }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-5"
            style={{ background: COLORS.white }}
          />

          <div className="flex items-center gap-4 relative z-10">
            <div
              className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-transform duration-300 hover:-rotate-[10deg] hover:scale-105"
              style={{
                background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.primaryLight} 100%)`,
              }}
            >
              <Sparkles size={17} color={COLORS.primary} strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="font-serif text-2xl leading-none tracking-tight text-white">
                BabyStyle
              </h2>
              <p className="text-[10px] mt-1.5 tracking-wider text-white/80">
                {isRTL ? "أطفالك بأجمل إطلالة" : "Your Child's Best Look"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label={t("nav.close", "Close menu")}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 relative z-10 text-white/80 hover:text-white hover:rotate-90 hover:bg-white/20 active:scale-90"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className="bs-nav flex-1 overflow-y-auto overscroll-contain px-5 py-5 flex flex-col gap-0.5"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: `${COLORS.primary} transparent`,
          }}
        >
          <style>
            {`
              .bs-nav::-webkit-scrollbar { width: 3px; }
              .bs-nav::-webkit-scrollbar-track { background: transparent; }
              .bs-nav::-webkit-scrollbar-thumb { background: ${COLORS.primary}; border-radius: 10px; }
              .bs-nav::-webkit-scrollbar-thumb:hover { background: ${COLORS.primaryDark}; }
            `}
          </style>
          {NAV_TREE.map((node) => (
            <NavNode key={node.key} node={node} depth={0} ctx={ctx} />
          ))}
        </nav>

        {/* Footer */}
        <div
          className="shrink-0 px-6 py-5"
          style={{
            borderTop: `3px solid ${COLORS.primary}`,
            background: `linear-gradient(0deg, ${COLORS.card} 0%, ${COLORS.bg} 100%)`,
          }}
        >
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2.5">
              <Heart size={12} fill={COLORS.primary} stroke="none" />
              <span
                className="text-xs tracking-wide"
                style={{ color: COLORS.muted }}
              >
                © 2024 BabyStyle
              </span>
              <Heart size={12} fill={COLORS.secondary} stroke="none" />
            </div>
            <div
              className="text-[10px] italic font-serif tracking-wider"
              style={{ color: COLORS.primary }}
            >
              ✦ Elegance in Every Detail ✦
            </div>

            <div
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
              style={{
                backgroundColor: COLORS.card,
                border: `2px solid ${COLORS.primary}`,
                boxShadow: `0 4px 20px ${COLORS.primarySoft}`,
              }}
            >
              <span
                className="text-[10px] tracking-wide"
                style={{ color: COLORS.muted }}
              >
                {t("footer.designBy")}
              </span>
              <a
                href="https://wa.me/201114219671?text=مرحبا%20دينا،%20عايز%20استفسر%20عن%20الموقع%20👋"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold flex items-center gap-1.5 transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <span className="text-[10px]" style={{ color: COLORS.primary }}>
                  {t("footer.developerName")}
                </span>
                <FaWhatsapp
                  className="w-3.5 h-3.5"
                  style={{ color: COLORS.primary }}
                />
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default SideBar;