// 📁 LinedOrderCollection.jsx
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { winterLined } from "../../data/WinterLined";
import { useCart } from "../cart/CartContext";
import { useCartActions } from "../cart/AddAndBuyTOCart";

const CATEGORY_LABEL = {
    baby: "👶 بيبي",
    girl: "🎀 بنوتة",
};

function LinedOrderCollection({ selectedOffer, scrollToOffers }) {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const count = selectedOffer?.count || selectedOffer?.value || 0;

    const [pieces, setPieces] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState({});
    const [openDropdown, setOpenDropdown] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setPieces(
            Array.from({ length: count }, (_, i) => ({
                id: i + 1,
                productId: "",
                color: "",
                category: "", // baby / girl
            }))
        );
        setSelectedSizes({});
    }, [count]);

    /* ─── helpers ─── */
    const getProduct = (productId) =>
        winterLined.find((p) => p.id === productId);

    const getColors = (productId) => getProduct(productId)?.productColors || [];

    const getSizes = (productId) => getProduct(productId)?.sizes || [];

    const handleChange = (id, field, value) => {
        setPieces((prev) =>
            prev.map((pc) => {
                if (pc.id !== id) return pc;
                if (field === "productId") {
                    return { ...pc, productId: value, color: "", category: "" };
                }
                return { ...pc, [field]: value };
            })
        );
        if (field === "productId") {
            setSelectedSizes((prev) => {
                const next = { ...prev };
                delete next[id];
                return next;
            });
        }
        setOpenDropdown(null);
    };

    const handleSize = (id, size, category) => {
        setSelectedSizes((prev) => ({ ...prev, [id]: size }));
        setPieces((prev) =>
            prev.map((pc) =>
                pc.id === id ? { ...pc, category: category || "" } : pc
            )
        );
        setOpenDropdown(null);
    };

    /* ─── completion ─── */
    const completedPieces = useMemo(() => {
        const obj = {};
        pieces.forEach((p) => {
            obj[p.id] = !!(p.productId && p.color && selectedSizes[p.id]);
        });
        return obj;
    }, [pieces, selectedSizes]);

    const completedCount = Object.values(completedPieces).filter(Boolean).length;
    const progress = pieces.length ? (completedCount / pieces.length) * 100 : 0;
    const isFormValid = pieces.length > 0 && completedCount === pieces.length;

    /* ─── السعر النهائي ─── */
    const finalPrice = useMemo(() => {
        const prices = selectedOffer?.prices;
        if (!prices) return selectedOffer?.price || 0;

        const cats = pieces.map((p) => p.category).filter(Boolean);

        // لو لسه مفيش كاردات مكتملة، اعرض سعر البناتي
        if (cats.length === 0) return prices.girls;

        const allBaby = cats.every((c) => c === "baby");
        const allGirls = cats.every((c) => c === "girl");

        if (allBaby) return prices.baby;
        if (allGirls) return prices.girls;

        // ميكس → السعر الأكبر
        return Math.max(prices.baby, prices.girls);
    }, [pieces, selectedOffer]);

    /* ─── نوع العرض (للعرض فوق) ─── */
    const offerType = useMemo(() => {
        const cats = pieces.map((p) => p.category).filter(Boolean);
        if (cats.length === 0) return "";
        const allBaby = cats.every((c) => c === "baby");
        const allGirls = cats.every((c) => c === "girl");
        if (allBaby) return "بيبي 👶";
        if (allGirls) return "بناتي 🎀";
        return "ميكس 👶🎀";
    }, [pieces]);

    /* ─── cart item ─── */
    const prepareCartItem = () => {
        const orderWithDetails = pieces.map((piece) => {
            const product = getProduct(piece.productId);
            const colorObj = product?.productColors?.find(
                (c) => c.color === piece.color
            );
            const image =
                colorObj?.img || product?.productColors?.[0]?.img || "";

            return {
                id: piece.id,
                name: product?.name,
                color: piece.color,
                size: selectedSizes[piece.id],
                category: piece.category,
                image,
            };
        });

        const mainImage = orderWithDetails.find((p) => p.image)?.image || "";

        return {
            id: `wl-offer-${selectedOffer?.name}-${Date.now()}`,
            name: selectedOffer?.name,
            nameEn: `Winter Offer: ${selectedOffer?.name}`,
            price: finalPrice,
            originalPrice: selectedOffer?.oldPrice,
            quantity: 1,
            isOffer: true,
            offerDetails: {
                totalPieces: pieces.length,
                pieces: orderWithDetails,
                type: "winter-colon",
                offerType,
            },
            image: mainImage,
        };
    };

    /* ─── cart actions ─── */
    const { handleAddOnly: originalAddOnly, handleBuyNow: originalBuyNow } =
        useCartActions({
            prepareCartItem,
            isFormValid,
        });

    /* ─── wrapped actions with toast ─── */
    const handleAddOnly = () => {
        if (!isFormValid) {
            toast.error("⚠️ يرجى إكمال جميع البيانات أولاً", {
                position: "bottom-center",
                autoClose: 3000,
            });
            return;
        }
        try {
            originalAddOnly?.();
            toast.success(
                <div className="flex items-center gap-2">
                    <span>✅</span>
                    <span>
                        تم إضافة <strong>{selectedOffer?.name}</strong> إلى
                        السلة! 🛒
                    </span>
                </div>,
                { position: "bottom-center", autoClose: 3000 }
            );
        } catch (err) {
            console.error(err);
            toast.error("❌ حصل خطأ أثناء الإضافة", {
                position: "bottom-center",
            });
        }
    };

    const handleBuyNow = () => {
        if (!isFormValid) {
            toast.error("⚠️ يرجى إكمال جميع البيانات أولاً", {
                position: "bottom-center",
                autoClose: 3000,
            });
            return;
        }
        try {
            originalBuyNow?.();
            toast.success("🎉 جاري تحويلك لإتمام الطلب...", {
                position: "bottom-center",
                autoClose: 1500,
            });
        } catch (err) {
            console.error(err);
            toast.error("❌ حصل خطأ", { position: "bottom-center" });
        }
    };

    /* ─── empty state ─── */
    if (!selectedOffer || count === 0) {
        return (
            <section className="wlo-section wlo-empty">
                <style>{wloCss}</style>
                <div className="wlo-empty-inner">
                    <div className="wlo-empty-icon">🎁</div>
                    <h3>اختاري عرضك الأول</h3>
                    <p>برجاء اختيار عرض مناسب من الأعلى</p>
                    <button
                        className="wlo-btn wlo-btn-primary"
                        onClick={scrollToOffers}
                    >
                        🛍️ اختاري عرضك المناسب
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="wlo-section">
            <style>{wloCss}</style>

            {/* Head */}
            <div className="wlo-head">
                <span className="wlo-pill">✨ تخصيص طلبك</span>
                <h2>
                    اختاري تفاصيل <em>الكولونات</em>
                </h2>
                <p className="wlo-sub">
                    حدّدي المنتج واللون والمقاس لكل كولون 🎀
                </p>

                <div className="wlo-selected">
                    <span>
                        🎁 عرضك المختار: <b>{selectedOffer.name}</b>
                    </span>
                    <span className="wlo-selected-price">{finalPrice} ج</span>
                </div>

                {offerType && (
                    <p className="wlo-type-badge">
                        نوع العرض: <b>{offerType}</b>
                    </p>
                )}

                <div className="wlo-progress">
                    <div className="wlo-progress-top">
                        <span>تقدم الطلب</span>
                        <span className="wlo-progress-count">
                            {completedCount}/{pieces.length}
                        </span>
                    </div>
                    <div className="wlo-progress-bar">
                        <div
                            className="wlo-progress-fill"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    {progress === 100 && (
                        <p className="wlo-progress-done">
                            ✨ جميع الكولونات مكتملة!
                        </p>
                    )}
                </div>
            </div>

            {/* Pieces Grid */}
            <div className="wlo-grid">
                {pieces.map((piece) => {
                    const product = getProduct(piece.productId);
                    const colors = getColors(piece.productId);
                    const sizes = getSizes(piece.productId);
                    const isDone = completedPieces[piece.id];

                    return (
                        <div
                            key={piece.id}
                            className={`wlo-card ${
                                isDone ? "wlo-card-done" : ""
                            }`}
                        >
                            <span className="wlo-tape" />

                            <div className="wlo-card-head">
                                <div className="wlo-num">
                                    {isDone ? "✓" : piece.id}
                                </div>
                                <div>
                                    <p className="wlo-num-label">الكولون</p>
                                    <p className="wlo-num-value">
                                        #{piece.id}
                                    </p>
                                </div>
                                {product && (
                                    <span className="wlo-tag">
                                        {product.name}
                                    </span>
                                )}
                            </div>

                            {/* Product */}
                            <div className="wlo-field">
                                <label className="wlo-label">
                                    🧵 الكولون
                                </label>
                                <Dropdown
                                    open={openDropdown === `p-${piece.id}`}
                                    onToggle={() =>
                                        setOpenDropdown(
                                            openDropdown === `p-${piece.id}`
                                                ? null
                                                : `p-${piece.id}`
                                        )
                                    }
                                    placeholder="اختاري الكولون"
                                    value={
                                        product ? { label: product.name } : null
                                    }
                                    options={winterLined.map((p) => ({
                                        value: p.id,
                                        label: p.name,
                                    }))}
                                    onSelect={(opt) =>
                                        handleChange(
                                            piece.id,
                                            "productId",
                                            opt.value
                                        )
                                    }
                                />
                            </div>

                            {/* Color */}
                            <div className="wlo-field">
                                <label className="wlo-label">🎨 اللون</label>
                                <Dropdown
                                    disabled={!piece.productId}
                                    open={openDropdown === `c-${piece.id}`}
                                    onToggle={() =>
                                        setOpenDropdown(
                                            openDropdown === `c-${piece.id}`
                                                ? null
                                                : `c-${piece.id}`
                                        )
                                    }
                                    placeholder="اختاري اللون"
                                    value={
                                        piece.color
                                            ? {
                                                  label: piece.color,
                                                  img: colors.find(
                                                      (c) =>
                                                          c.color ===
                                                          piece.color
                                                  )?.img,
                                              }
                                            : null
                                    }
                                    options={colors.map((c) => ({
                                        value: c.color,
                                        label: c.color,
                                        img: c.img,
                                    }))}
                                    onSelect={(opt) =>
                                        handleChange(
                                            piece.id,
                                            "color",
                                            opt.value
                                        )
                                    }
                                    showThumb
                                />
                            </div>

                            {/* Size */}
                            <div className="wlo-field">
                                <label className="wlo-label">📏 المقاس</label>
                                <Dropdown
                                    disabled={!piece.color}
                                    open={openDropdown === `s-${piece.id}`}
                                    onToggle={() =>
                                        setOpenDropdown(
                                            openDropdown === `s-${piece.id}`
                                                ? null
                                                : `s-${piece.id}`
                                        )
                                    }
                                    placeholder="اختاري المقاس"
                                    value={
                                        selectedSizes[piece.id]
                                            ? {
                                                  label: `${
                                                      selectedSizes[piece.id]
                                                  } - ${
                                                      sizes.find(
                                                          (s) =>
                                                              s.size ===
                                                              selectedSizes[
                                                                  piece.id
                                                              ]
                                                      )?.age || ""
                                                  }`,
                                              }
                                            : null
                                    }
                                    options={sizes.map((s) => ({
                                        value: s.size,
                                        label: `${s.size} — ${s.age}`,
                                        badge:
                                            CATEGORY_LABEL[s.category] ||
                                            s.category,
                                        category: s.category,
                                    }))}
                                    onSelect={(opt) =>
                                        handleSize(
                                            piece.id,
                                            opt.value,
                                            opt.category
                                        )
                                    }
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Actions */}
            <div className="wlo-actions">
                <button
                    type="button"
                    className="wlo-btn wlo-btn-ghost"
                    disabled={!isFormValid || isSubmitting}
                    onClick={handleAddOnly}
                >
                    🛒 إضافة للسلة
                </button>
                <button
                    type="button"
                    className="wlo-btn wlo-btn-primary"
                    disabled={!isFormValid || isSubmitting}
                    onClick={handleBuyNow}
                >
                    💳 شراء الآن
                </button>
            </div>
        </section>
    );
}

/* ── Dropdown ── */
function Dropdown({
    open,
    onToggle,
    options,
    value,
    onSelect,
    placeholder,
    disabled,
    showThumb,
}) {
    const handleKeyDown = (e, opt) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(opt);
        }
    };

    const handleButtonKeyDown = (e) => {
        if (disabled) return;
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            e.preventDefault();
            onToggle();
        }
        if (e.key === "Escape" && open) {
            e.preventDefault();
            onToggle();
        }
    };

    return (
        <div className={`wlo-dd ${disabled ? "wlo-dd-disabled" : ""}`}>
            <button
                type="button"
                className={`wlo-dd-btn ${open ? "open" : ""}`}
                onClick={() => !disabled && onToggle()}
                onKeyDown={handleButtonKeyDown}
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className="wlo-dd-arrow">{open ? "▲" : "▼"}</span>
                <span className="wlo-dd-value">
                    {value?.img && (
                        <img
                            className="wlo-dd-thumb"
                            src={value.img}
                            alt={value.label}
                        />
                    )}
                    <span className={value ? "" : "wlo-dd-placeholder"}>
                        {value?.label || placeholder}
                    </span>
                </span>
            </button>

            {open && !disabled && (
                <div className="wlo-dd-list" role="listbox">
                    {options.length === 0 ? (
                        <div className="wlo-dd-empty">لا توجد خيارات</div>
                    ) : (
                        options.map((opt) => {
                            const selected = value?.label === opt.label;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    role="option"
                                    aria-selected={selected}
                                    className={`wlo-dd-item ${
                                        selected ? "selected" : ""
                                    }`}
                                    onClick={() => onSelect(opt)}
                                    onKeyDown={(e) => handleKeyDown(e, opt)}
                                >
                                    <span className="wlo-dd-item-left">
                                        {showThumb && opt.img && (
                                            <img
                                                className="wlo-dd-thumb"
                                                src={opt.img}
                                                alt={opt.label}
                                            />
                                        )}
                                        <span className="wlo-dd-item-label">
                                            {opt.label}
                                        </span>
                                        {opt.badge && (
                                            <span className="wlo-dd-badge">
                                                {opt.badge}
                                            </span>
                                        )}
                                    </span>
                                    {selected && (
                                        <span className="wlo-dd-check">
                                            ✓
                                        </span>
                                    )}
                                </button>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}

/* ── CSS ── */
const wloCss = `
.wlo-section{
  --ink:#3A2E45;
  --ink-soft:#7C6E88;
  --paper:#FFFDF7;
  --paper-2:#FFF7EE;
  --line:#E8E0D4;
  --pink:#FF9EC4;
  --pink-d:#F06292;
  --lav:#B69CFF;
  --sun:#FFD166;
  --mint:#7BD9B0;
  --tape:#F4E4B8;
  position:relative;
  max-width:1140px;
  margin:0 auto;
  padding:90px 22px;
  direction:rtl;
  font-family:'Cairo','Tajawal',system-ui,sans-serif;
  color:var(--ink);
}

.wlo-empty{text-align:center}
.wlo-empty-inner{
  max-width:400px;margin:0 auto;padding:40px 24px;
  background:#fff;border:2.5px dashed var(--pink);border-radius:20px;
}
.wlo-empty-icon{
  font-size:44px;width:80px;height:80px;margin:0 auto 16px;
  display:grid;place-items:center;
  background:var(--paper-2);border-radius:50%;
  border:2px solid var(--ink);
}
.wlo-empty h3{
  font-family:'Lalezar','Cairo',sans-serif;
  font-size:22px;font-weight:400;margin:0 0 6px;
}
.wlo-empty p{color:var(--ink-soft);font-size:13.5px;margin:0 0 20px}

.wlo-head{text-align:center;max-width:660px;margin:0 auto 44px}
.wlo-pill{
  display:inline-flex;align-items:center;gap:6px;
  font-weight:700;font-size:13px;
  padding:8px 20px;border-radius:999px;
  background:#fff;border:2px solid var(--ink);margin-bottom:16px;
}
.wlo-head h2{
  font-family:'Lalezar','Cairo',sans-serif;
  font-size:clamp(28px,4.6vw,46px);
  font-weight:400;line-height:1.25;margin:0 0 12px;
}
.wlo-head h2 em{
  font-style:normal;
  background:linear-gradient(120deg,var(--pink-d),var(--lav));
  -webkit-background-clip:text;background-clip:text;
  -webkit-text-fill-color:transparent;padding:0 6px;
}
.wlo-sub{color:var(--ink-soft);font-size:14.5px;margin:0 0 18px}

.wlo-selected{
  display:flex;align-items:center;justify-content:space-between;gap:10px;
  max-width:480px;margin:0 auto 14px;padding:12px 18px;
  background:#fff;border:2.5px dashed var(--pink);
  border-radius:14px;font-size:13.5px;font-weight:800;
}
.wlo-selected b{color:var(--ink)}
.wlo-selected-price{
  color:var(--pink-d);font-family:'Lalezar',sans-serif;font-size:20px;
}

.wlo-type-badge{
  display:inline-block;
  font-size:12px;
  padding:6px 14px;
  background:#FFF7EE;
  border:2px solid var(--ink);
  border-radius:999px;
  margin:0 auto 18px;
  color:var(--ink-soft);
  font-weight:700;
}
.wlo-type-badge b{color:var(--pink-d)}

.wlo-progress{max-width:420px;margin:0 auto}
.wlo-progress-top{
  display:flex;justify-content:space-between;
  font-size:12.5px;font-weight:700;color:var(--ink-soft);margin-bottom:8px;
}
.wlo-progress-count{color:var(--pink-d)}
.wlo-progress-bar{
  height:8px;background:#F4E9F0;border-radius:999px;overflow:hidden;
}
.wlo-progress-fill{
  height:100%;background:linear-gradient(90deg,var(--pink),var(--lav));
  border-radius:999px;transition:width .4s ease;
}
.wlo-progress-done{
  margin:8px 0 0;font-size:12px;
  color:var(--mint);font-weight:800;text-align:center;
}

.wlo-grid{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
  gap:24px;margin-top:8px;
}

.wlo-card{
  position:relative;background:#fff;
  border:2.5px solid var(--ink);
  padding:24px 20px 20px;
  box-shadow:6px 6px 0 rgba(58,46,69,.15);
  transition:.25s ease;
}
.wlo-card-done{box-shadow:6px 6px 0 var(--mint)}
.wlo-card-done:hover{box-shadow:10px 10px 0 var(--mint)}
.wlo-tape{
  position:absolute;top:-11px;left:50%;width:60px;height:20px;
  background:var(--tape);opacity:.9;
  transform:translateX(-50%) rotate(-4deg);
  box-shadow:0 2px 5px rgba(0,0,0,.08);
  pointer-events:none;
}
.wlo-card-head{
  display:flex;align-items:center;gap:12px;
  padding-bottom:14px;margin-bottom:16px;
  border-bottom:2px dashed var(--line);
}
.wlo-num{
  flex:none;width:40px;height:40px;border-radius:12px;
  display:grid;place-items:center;
  background:var(--paper-2);color:var(--ink);
  font-weight:800;font-size:15px;
  border:2px solid var(--ink);
}
.wlo-card-done .wlo-num{background:var(--mint);color:#fff;border-color:var(--mint)}
.wlo-num-label{margin:0;font-size:10.5px;color:var(--ink-soft);font-weight:700}
.wlo-num-value{
  margin:0;font-family:'Lalezar',sans-serif;font-size:17px;line-height:1;
}
.wlo-tag{
  margin-inline-start:auto;
  font-size:10.5px;font-weight:800;
  padding:4px 10px;border-radius:999px;
  background:var(--pink);color:#fff;
  white-space:nowrap;max-width:120px;overflow:hidden;text-overflow:ellipsis;
}

.wlo-field{margin-bottom:14px}
.wlo-field:last-child{margin-bottom:0}
.wlo-label{
  display:flex;align-items:center;gap:6px;
  font-size:12.5px;font-weight:800;color:var(--ink);
  margin-bottom:6px;
}

.wlo-dd{position:relative}
.wlo-dd-btn{
  width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;
  background:#fff;border:2px solid var(--ink);
  padding:10px 12px;border-radius:12px;
  font-family:inherit;font-size:13px;font-weight:700;color:var(--ink);
  cursor:pointer;transition:.2s;
}
.wlo-dd-btn:hover:not(:disabled){background:var(--paper-2)}
.wlo-dd-btn:focus-visible{
  outline:3px solid var(--pink-d);
  outline-offset:2px;
}
.wlo-dd-btn.open{
  box-shadow:3px 3px 0 var(--pink);
  transform:translate(-1px,-1px);
}
.wlo-dd-disabled .wlo-dd-btn{
  background:#F7F5F2;color:#B8B0B5;cursor:not-allowed;
  border-style:dashed;
}
.wlo-dd-arrow{font-size:9px;color:var(--ink-soft);order:2}
.wlo-dd-value{
  display:flex;align-items:center;gap:8px;flex:1;
  text-align:right;overflow:hidden;
}
.wlo-dd-placeholder{color:#B8B0B5;font-weight:600}
.wlo-dd-thumb{
  width:28px;height:28px;border-radius:8px;object-fit:cover;
  border:2px solid var(--ink);background:#fff;flex:none;
}
.wlo-dd-list{
  position:absolute;top:calc(100% + 6px);right:0;left:0;z-index:40;
  background:#fff;border:2px solid var(--ink);
  border-radius:12px;
  box-shadow:6px 6px 0 rgba(58,46,69,.2);
  max-height:260px;overflow-y:auto;
  padding:6px;
}
.wlo-dd-empty{
  padding:20px;text-align:center;color:var(--ink-soft);font-size:12.5px;
}
.wlo-dd-item{
  width:100%;display:flex;align-items:center;justify-content:space-between;
  gap:10px;padding:9px 10px;border-radius:8px;
  font-family:inherit;font-size:13px;font-weight:700;color:var(--ink);
  cursor:pointer;transition:.15s;background:none;border:0;text-align:right;
}
.wlo-dd-item:hover{background:var(--paper-2)}
.wlo-dd-item:focus-visible{
  outline:3px solid var(--pink-d);
  outline-offset:-2px;
}
.wlo-dd-item.selected{background:#FFE7F1}
.wlo-dd-item-left{display:flex;align-items:center;gap:10px;flex:1;overflow:hidden}
.wlo-dd-item-label{
  flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;
}
.wlo-dd-badge{
  flex:none;font-size:10px;font-weight:800;
  padding:2px 8px;border-radius:999px;
  background:var(--sun);color:var(--ink);
}
.wlo-dd-check{color:var(--pink-d);font-weight:900;font-size:15px}

.wlo-actions{
  display:flex;flex-wrap:wrap;gap:14px;justify-content:center;
  margin-top:44px;
}
.wlo-btn{
  display:inline-flex;align-items:center;gap:8px;
  padding:14px 30px;border-radius:999px;
  font-family:inherit;font-weight:800;font-size:14.5px;
  border:3px solid var(--ink);cursor:pointer;transition:.2s;
}
.wlo-btn:focus-visible{
  outline:3px solid var(--pink-d);
  outline-offset:3px;
}
.wlo-btn-primary{
  background:var(--ink);color:#fff;
  box-shadow:5px 5px 0 var(--pink);
}
.wlo-btn-primary:hover:not(:disabled){
  transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--pink-d);
}
.wlo-btn-ghost{
  background:#fff;color:var(--ink);
  box-shadow:5px 5px 0 var(--lav);
}
.wlo-btn-ghost:hover:not(:disabled){
  transform:translate(-2px,-2px);box-shadow:7px 7px 0 var(--lav);
}
.wlo-btn:disabled{
  opacity:.5;cursor:not-allowed;box-shadow:5px 5px 0 rgba(58,46,69,.15);
}

@media(max-width:700px){
  .wlo-section{padding:70px 16px}
  .wlo-grid{grid-template-columns:1fr;gap:18px}
  .wlo-card{padding:20px 16px}
  .wlo-num{width:36px;height:36px;font-size:13px}
  .wlo-num-value{font-size:15px}
  .wlo-dd-btn{font-size:12.5px;padding:9px 10px}
  .wlo-dd-thumb{width:24px;height:24px}
  .wlo-selected{font-size:12.5px;padding:10px 14px}
  .wlo-selected-price{font-size:17px}
  .wlo-btn{padding:12px 22px;font-size:13px}
}
`;

export default LinedOrderCollection;