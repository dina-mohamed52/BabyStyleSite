import { useState } from "react";
import { Menu, ShoppingCart, X, ChevronDown, Sparkles, Home, Sun, Snowflake, Wind, Heart, Layers, Grid3x3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
  
  gradientStart: "#FCF9F7",
  gradientEnd: "#F8F0EA",
  
  gold: "#E8C9A0",
  pink: "#F472B6",
  navy: "#1C2533",
  blush: "#FDE8F0",
  white: "#FFFFFF",
};

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------
const sidebarVariants = {
  hidden: (isRTL) => ({
    x: isRTL ? "-100%" : "100%",
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      damping: 28,
      stiffness: 300,
      duration: 0.4,
    },
  },
  exit: (isRTL) => ({
    x: isRTL ? "-100%" : "100%",
    opacity: 0,
    transition: {
      type: "spring",
      damping: 30,
      stiffness: 300,
      duration: 0.3,
    },
  }),
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

const menuButtonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, boxShadow: "0 8px 30px rgba(244, 114, 182, 0.3)" },
  tap: { scale: 0.92 },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.03,
      duration: 0.3,
      ease: "easeOut",
    },
  }),
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------
function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState(new Set());
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";

  const toggleExpand = (key) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const navTree = [
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
          // Main page for the category
          mainPage: "/Turbon",
          children: [
            {
              key: "summer.turbans.bandanas",
              to: "turbon/bandana",
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
          // Main page for the category
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
      children: [
        {
          key: "winter.collection",
          to: "/WinterCollection",
          label: { ar: "كولونات رسومات شتوية", en: "Winter Collection" },
          badge: { ar: "الأكثر طلباً", en: "Most Wanted" },
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

  const label = (obj) => {
    if (!obj?.label) return "";
    return obj.label[i18n.language] || obj.label.en || "";
  };

  // -------------------------------------------------------------------------
  // Render Node - احترافي مع أنيميشن
  // -------------------------------------------------------------------------
  const renderNode = (node, depth = 0, index = 0) => {
    if (node.type === "section") {
      const isExpanded = expandedKeys.has(node.key);
      const accent = node.accent || COLORS.primary;
      const hasMainPage = node.mainPage;

      return (
        <motion.div
          key={node.key}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={navItemVariants}
          className="space-y-0.5"
        >
          <div className="flex items-center gap-1">
            {hasMainPage ? (
              // إذا كان القسم له صفحة رئيسية - يبقى اسم القسم لينك
              <NavLink to={node.mainPage} className="flex-1" onClick={() => setIsOpen(false)}>
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ 
                      backgroundColor: "rgba(255, 255, 255, 0.6)",
                      x: isRTL ? -2 : 2,
                    }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 rounded-2xl transition-all duration-300 px-4 py-3.5
                      ${isExpanded ? "shadow-md" : ""}`}
                    style={{
                      backgroundColor: isActive ? `${accent}12` : "transparent",
                      color: isActive ? COLORS.ink : COLORS.ink,
                      boxShadow: isExpanded ? `0 2px 16px ${COLORS.shadow}` : "none",
                      border: isActive ? `1px solid ${accent}25` : "1px solid transparent",
                    }}
                  >
                    <span className="flex items-center gap-3 min-w-0">
                      {node.icon && (
                        <motion.span
                          className="shrink-0 transition-all duration-300"
                          style={{ 
                            color: isActive ? accent : COLORS.muted,
                          }}
                          animate={{ 
                            scale: isExpanded ? 1.15 : 1,
                            rotate: isExpanded ? 5 : 0,
                          }}
                        >
                          {node.icon}
                        </motion.span>
                      )}
                      <span className="truncate text-[15px] font-bold tracking-wide">
                        {label(node)}
                      </span>
                      {node.badge && (
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="shrink-0 text-[8px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase"
                          style={{
                            color: accent,
                            backgroundColor: `${accent}18`,
                            border: `1px solid ${accent}30`,
                          }}
                        >
                          {label(node.badge)}
                        </motion.span>
                      )}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: accent }}
                      />
                    )}
                  </motion.div>
                )}
              </NavLink>
            ) : (
              // إذا كان القسم ليس له صفحة رئيسية - يبقى زر عادي
              <motion.button
                onClick={() => toggleExpand(node.key)}
                whileHover={{ 
                  backgroundColor: "rgba(255, 255, 255, 0.6)",
                  x: isRTL ? -2 : 2,
                }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-between gap-3 rounded-2xl transition-all duration-300
                  ${depth === 0 ? "px-4 py-3.5" : "px-3.5 py-3"}
                  ${isExpanded ? "shadow-md" : ""}`}
                style={{
                  backgroundColor: isExpanded ? `${accent}12` : "transparent",
                  color: isExpanded ? COLORS.ink : depth === 0 ? COLORS.ink : COLORS.muted,
                  boxShadow: isExpanded ? `0 2px 16px ${COLORS.shadow}` : "none",
                  border: isExpanded ? `1px solid ${accent}25` : "1px solid transparent",
                }}
              >
                <span className="flex items-center gap-3 min-w-0">
                  {node.icon && (
                    <motion.span
                      className="shrink-0 transition-all duration-300"
                      style={{ 
                        color: isExpanded ? accent : COLORS.muted,
                      }}
                      animate={{ 
                        scale: isExpanded ? 1.15 : 1,
                        rotate: isExpanded ? 5 : 0,
                      }}
                    >
                      {node.icon}
                    </motion.span>
                  )}
                  <span
                    className={`truncate transition-all duration-300 ${
                      depth === 0
                        ? "text-[15px] font-bold tracking-wide"
                        : "text-[13.5px] font-medium"
                    }`}
                  >
                    {label(node)}
                  </span>
                  {node.badge && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="shrink-0 text-[8px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase"
                      style={{
                        color: accent,
                        backgroundColor: `${accent}18`,
                        border: `1px solid ${accent}30`,
                      }}
                    >
                      {label(node.badge)}
                    </motion.span>
                  )}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  style={{ color: isExpanded ? accent : COLORS.muted }}
                >
                  <ChevronDown size={16} strokeWidth={1.5} />
                </motion.div>
              </motion.button>
            )}
          </div>

          <AnimatePresence>
            {isExpanded && node.children && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: {
                    height: { duration: 0.3, ease: "easeInOut" },
                    opacity: { duration: 0.25, delay: 0.05 },
                  },
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: { duration: 0.25, ease: "easeInOut" },
                    opacity: { duration: 0.2 },
                  },
                }}
                className="overflow-hidden"
              >
                <div
                  className={`flex flex-col gap-0.5 py-1.5 ${
                    isRTL ? "mr-4 pr-3" : "ml-4 pl-3"
                  }`}
                  style={{ 
                    borderInlineStart: `2px solid ${COLORS.hairline}`,
                  }}
                >
                  {node.children.map((child, idx) =>
                    renderNode(child, depth + 1, idx)
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      );
    }

    // Leaf link - احترافي
    return (
      <motion.div
        key={node.key}
        custom={index}
        initial="hidden"
        animate="visible"
        variants={navItemVariants}
      >
        <NavLink to={node.to} onClick={() => setIsOpen(false)}>
          {({ isActive }) => (
            <motion.div
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                x: isRTL ? -2 : 2,
              }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center justify-between gap-3 rounded-2xl transition-all duration-300
                ${depth === 0 ? "px-4 py-3.5" : "px-3.5 py-3"}`}
              style={{
                backgroundColor: isActive ? `${COLORS.primary}12` : "transparent",
                color: isActive ? COLORS.ink : depth === 0 ? COLORS.ink : COLORS.muted,
                border: isActive ? `1px solid ${COLORS.primary}25` : "1px solid transparent",
                boxShadow: isActive ? `inset 3px 0 0 ${COLORS.primary}` : "none",
              }}
            >
              <span className="flex items-center gap-3 min-w-0">
                {node.icon ? (
                  <span
                    className="shrink-0 transition-all duration-300"
                    style={{ 
                      color: isActive ? COLORS.primary : COLORS.muted,
                    }}
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
                  {label(node)}
                </span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                {node.badge && (
                  <span
                    className="text-[8px] font-bold tracking-wider px-2.5 py-0.5 rounded-full uppercase"
                    style={{ 
                      color: COLORS.primary, 
                      backgroundColor: COLORS.primarySoft,
                      border: `1px solid ${COLORS.primary}30`,
                    }}
                  >
                    {label(node.badge)}
                  </span>
                )}
                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS.primary }}
                  />
                )}
              </span>
            </motion.div>
          )}
        </NavLink>
      </motion.div>
    );
  };

  return (
    <>
      {/* Menu Button - Pink ناعم مع Navy */}
      <motion.button
        onClick={() => setIsOpen(true)}
        aria-label={t("nav.open", "Open menu")}
        variants={menuButtonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={`fixed top-5 z-[100] bg-white backdrop-blur-xl p-4 rounded-2xl border-2
          transition-all duration-300 shadow-lg
          ${isRTL ? "left-5" : "right-5"}
          ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ 
          borderColor: COLORS.primary,
          color: COLORS.primary,
        }}
      >
        <Menu size={20} strokeWidth={1.5} />
      </motion.button>

      {/* Overlay - احترافي */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            onClick={() => setIsOpen(false)}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[60]"
            style={{
              backgroundColor: COLORS.overlay,
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Pink ناعم مع Navy Dark */}
      <AnimatePresence custom={isRTL}>
        {isOpen && (
          <motion.div
            custom={isRTL}
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`fixed top-0 ${
              isRTL ? "left-0" : "right-0"
            } h-full w-[360px] max-w-[90vw] z-[65] flex flex-col`}
            style={{
              backgroundColor: COLORS.bg,
              boxShadow: `-4px 0 50px ${COLORS.shadowStrong}`,
            }}
          >
            {/* Header - تدرج من Navy إلى Pink ناعم مع لمسة بيضاء */}
            <div
              className="flex justify-between items-center px-6 py-6 shrink-0 relative overflow-hidden"
              style={{
                borderBottom: `3px solid ${COLORS.primary}`,
                background: `linear-gradient(135deg, ${COLORS.secondary} 0%, ${COLORS.secondaryLight} 40%, ${COLORS.primary} 80%, ${COLORS.primaryLight} 100%)`,
              }}
            >
              {/* Decorative Elements - لمسات بيضاء */}
              <div
                className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
                style={{ background: COLORS.white }}
              />
              <div
                className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-8 translate-y-1/2 -translate-x-1/2"
                style={{ background: COLORS.white }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-5"
                style={{ background: COLORS.white }}
              />
              
              <div className="flex items-center gap-4 relative z-10">
                <motion.div
                  whileHover={{ rotate: -10, scale: 1.05 }}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.white} 0%, ${COLORS.primaryLight} 100%)`,
                  }}
                >
                  <Sparkles size={17} color={COLORS.primary} strokeWidth={1.5} />
                </motion.div>
                <div>
                  <motion.h2
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="font-serif text-2xl leading-none tracking-tight text-white"
                  >
                    BabyStyle
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="text-[10px] mt-1.5 tracking-wider text-white/80"
                  >
                    {isRTL ? "أطفالك بأجمل إطلالة" : "Your Child's Best Look"}
                  </motion.p>
                </div>
              </div>
              <motion.button
                onClick={() => setIsOpen(false)}
                aria-label={t("nav.close", "Close menu")}
                whileHover={{ rotate: 90, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 relative z-10 text-white/80 hover:text-white"
              >
                <X size={20} strokeWidth={1.5} />
              </motion.button>
            </div>

            {/* Navigation - مع Scrollbar مخصص */}
            <nav
              className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-0.5"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: `${COLORS.primary} transparent`,
              }}
            >
              <style>
                {`
                  nav::-webkit-scrollbar {
                    width: 3px;
                  }
                  nav::-webkit-scrollbar-track {
                    background: transparent;
                  }
                  nav::-webkit-scrollbar-thumb {
                    background: ${COLORS.primary};
                    border-radius: 10px;
                  }
                  nav::-webkit-scrollbar-thumb:hover {
                    background: ${COLORS.primaryDark};
                  }
                `}
              </style>
              {navTree.map((node, idx) => renderNode(node, 0, idx))}
            </nav>

            {/* Footer - Pink مع Navy و لمسة بيضاء */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="shrink-0 px-6 py-5"
              style={{
                borderTop: `3px solid ${COLORS.primary}`,
                background: `linear-gradient(0deg, ${COLORS.card} 0%, ${COLORS.bg} 100%)`,
              }}
            >
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-2.5">
                  <Heart size={12} fill={COLORS.primary} stroke="none" />
                  <span className="text-xs tracking-wide" style={{ color: COLORS.muted }}>
                    © 2024 BabyStyle
                  </span>
                  <Heart size={12} fill={COLORS.secondary} stroke="none" />
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-[10px] italic font-serif tracking-wider"
                  style={{ color: COLORS.primary }}
                >
                  ✦ Elegance in Every Detail ✦
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                  style={{
                    backgroundColor: COLORS.card,
                    border: `2px solid ${COLORS.primary}`,
                    boxShadow: `0 4px 20px ${COLORS.primarySoft}`,
                  }}
                >
                  <span className="text-[10px] tracking-wide" style={{ color: COLORS.muted }}>
                    {t("footer.designBy")}
                  </span>
                  <motion.a
                    href="https://wa.me/201114219671?text=مرحبا%20دينا،%20عايز%20استفسر%20عن%20الموقع%20👋"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="font-semibold flex items-center gap-1.5"
                  >
                    <span className="text-[10px]" style={{ color: COLORS.primary }}>
                      {t("footer.developerName")}
                    </span>
                    <FaWhatsapp
                      className="w-3.5 h-3.5 transition-transform duration-300"
                      style={{ color: COLORS.primary }}
                    />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SideBar;