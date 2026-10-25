import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/**
 * Drawer — نسخة يدوية بنفس شكل Ant Design Drawer (من غير أي dependency غير lucide)
 *
 * Props:
 *  open, onClose
 *  placement      "right" (default) | "left" | "top" | "bottom"
 *  width          لـ left/right (default 378)
 *  height         لـ top/bottom (default 378 — أو "auto")
 *  title, extra, footer
 *  closable (default true), closeIcon
 *  mask (default true), maskClosable (default true), keyboard (default true)
 *  zIndex (default 1000)
 *  className, style           على الـ panel
 *  headerStyle, bodyStyle, footerStyle
 *  afterOpenChange(open)
 *
 * مثال:
 *  <Drawer open={open} onClose={() => setOpen(false)} placement="bottom" height="auto" title="المقاس">
 *    ...
 *  </Drawer>
 */

const DURATION = 300;

const HIDDEN_TRANSFORM = {
  right: "translateX(100%)",
  left: "translateX(-100%)",
  top: "translateY(-100%)",
  bottom: "translateY(100%)",
};

const SHADOW = {
  right:
    "-6px 0 16px 0 rgba(0,0,0,0.08), -3px 0 6px -4px rgba(0,0,0,0.12), -9px 0 28px 8px rgba(0,0,0,0.05)",
  left: "6px 0 16px 0 rgba(0,0,0,0.08), 3px 0 6px -4px rgba(0,0,0,0.12), 9px 0 28px 8px rgba(0,0,0,0.05)",
  top: "0 6px 16px 0 rgba(0,0,0,0.08), 0 3px 6px -4px rgba(0,0,0,0.12), 0 9px 28px 8px rgba(0,0,0,0.05)",
  bottom:
    "0 -6px 16px 0 rgba(0,0,0,0.08), 0 -3px 6px -4px rgba(0,0,0,0.12), 0 -9px 28px 8px rgba(0,0,0,0.05)",
};

const px = (v) => (typeof v === "number" ? `${v}px` : v);

export default function Drawer({
  open = false,
  onClose,
  placement = "right",
  width = 378,
  height = 378,
  title,
  extra,
  footer,
  closable = true,
  closeIcon,
  mask = true,
  maskClosable = true,
  keyboard = true,
  zIndex = 1000,
  className = "",
  style,
  headerStyle,
  bodyStyle,
  footerStyle,
  afterOpenChange,
  children,
}) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);

  // mount / unmount مع أنيميشن
  useEffect(() => {
    if (open) {
      setMounted(true);
      let raf2;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setShown(true));
      });
      const t = setTimeout(() => afterOpenChange?.(true), DURATION);
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
        clearTimeout(t);
      };
    }
    setShown(false);
    const t = setTimeout(() => {
      setMounted(false);
      afterOpenChange?.(false);
    }, DURATION);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Escape
  useEffect(() => {
    if (!open || !keyboard) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.(e);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, keyboard, onClose]);

  // قفل سكرول الصفحة
  useEffect(() => {
    if (!mounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  if (!mounted || typeof document === "undefined") return null;

  const horizontal = placement === "left" || placement === "right";

  const panelPos = {
    right: "top-0 bottom-0 right-0",
    left: "top-0 bottom-0 left-0",
    top: "top-0 left-0 right-0",
    bottom: "bottom-0 left-0 right-0",
  }[placement];

  const panelSize = horizontal
    ? { width: px(width), maxWidth: "100vw" }
    : { height: height === "auto" ? "auto" : px(height), maxHeight: "100vh" };

  const hasHeader = title || extra || closable;

  return createPortal(
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ zIndex, pointerEvents: shown ? "auto" : "none" }}
    >
      {mask && (
        <div
          className="absolute inset-0 bg-black/45 transition-opacity"
          style={{
            opacity: shown ? 1 : 0,
            transitionDuration: `${DURATION}ms`,
          }}
          onClick={(e) => maskClosable && onClose?.(e)}
        />
      )}

      <div
        role="dialog"
        aria-modal="true"
        className={`absolute flex flex-col bg-white ${panelPos} ${className}`}
        style={{
          ...panelSize,
          transform: shown ? "none" : HIDDEN_TRANSFORM[placement],
          boxShadow: shown ? SHADOW[placement] : "none",
          transition: `transform ${DURATION}ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow ${DURATION}ms`,
          ...style,
        }}
      >
        {hasHeader && (
          <div
            className="flex items-center shrink-0 px-6 py-4 border-b border-black/[0.06]"
            style={headerStyle}
          >
            {closable && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="me-3 inline-flex items-center justify-center w-4 h-4 text-black/45 hover:text-black/88 transition-colors"
              >
                {closeIcon || <X className="w-4 h-4" />}
              </button>
            )}
            <div className="flex-1 min-w-0 text-base font-semibold leading-6 text-black/88 truncate">
              {title}
            </div>
            {extra && <div className="ms-3 shrink-0">{extra}</div>}
          </div>
        )}

        <div className="flex-1 min-h-0 overflow-auto p-6" style={bodyStyle}>
          {children}
        </div>

        {footer && (
          <div
            className="shrink-0 px-4 py-2 border-t border-black/[0.06]"
            style={footerStyle}
          >
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
