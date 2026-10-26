import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useCallback,
  Children,
  isValidElement,
} from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X } from "lucide-react";

/**
 * Select — نسخة يدوية بنفس شكل Ant Design Select
 *
 * Props:
 *  value / defaultValue      القيمة (لو مررت prop اسمها value حتى لو undefined يبقى Controlled)
 *  onChange(value, option)
 *  options                   [{ value, label, disabled }]  أو استخدم <Select.Option>
 *  placeholder, disabled, size ("small" | "middle" | "large")
 *  allowClear, onClear
 *  showSearch, onSearch, filterOption(input, option) => boolean
 *  notFoundContent, listHeight (default 256)
 *  className, style          بيتطبقوا على الـ selector نفسه (تقدر تغير الـ rounded مثلاً)
 *  dropdownClassName, dropdownStyle
 *  onDropdownVisibleChange(open)
 *  name                      لو عايزه يتبعت مع فورم
 *
 * مثال:
 *  <Select value={v} onChange={setV} size="large" placeholder="اختر"
 *          options={[{ value: 1, label: "واحد" }]} />
 *
 *  <Select value={v} onChange={setV}>
 *    <Select.Option value="a"><b>A</b></Select.Option>
 *  </Select>
 */

function Option() {
  return null;
}
Option.displayName = "Select.Option";

const SIZE_CLS = {
  small: "h-6 px-2 text-sm rounded",
  middle: "h-8 px-[11px] text-sm rounded-md",
  large: "h-10 px-[11px] text-base rounded-lg",
};

function normalize(options, children) {
  if (Array.isArray(options)) {
    return options.map((o) =>
      o !== null && typeof o === "object"
        ? o
        : { value: o, label: String(o) },
    );
  }
  const list = [];
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Option) {
      const { value, label, children: content, disabled } = child.props;
      list.push({ value, label: label ?? content, disabled });
    }
  });
  return list;
}

function optionText(o) {
  return typeof o.label === "string" || typeof o.label === "number"
    ? String(o.label)
    : String(o.value);
}

function Select(props) {
  const {
    value: valueProp,
    defaultValue,
    onChange,
    options,
    children,
    placeholder,
    disabled = false,
    size = "middle",
    allowClear = false,
    onClear,
    showSearch = false,
    onSearch,
    filterOption,
    notFoundContent = "لا توجد بيانات",
    listHeight = 256,
    className = "",
    style,
    dropdownClassName = "",
    dropdownStyle,
    onDropdownVisibleChange,
    id,
    name,
  } = props;

  const controlled = "value" in props;
  const [innerValue, setInnerValue] = useState(defaultValue);
  const value = controlled ? valueProp : innerValue;

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const [pos, setPos] = useState(null);

  const rootRef = useRef(null);
  const dropRef = useRef(null);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  const all = normalize(options, children);
  const selected = all.find((o) => o.value === value);
  const hasValue = value !== undefined && value !== null && value !== "";

  const filtered =
    showSearch && query
      ? all.filter((o) =>
          filterOption
            ? filterOption(query, o)
            : optionText(o).toLowerCase().includes(query.toLowerCase()),
        )
      : all;

  const latest = useRef({ filtered, active });
  latest.current = { filtered, active };

  const changeOpen = useCallback(
    (next) => {
      setOpen((prev) => {
        if (prev === next) return prev;
        onDropdownVisibleChange?.(next);
        return next;
      });
      if (!next) setQuery("");
    },
    [onDropdownVisibleChange],
  );

  const choose = (opt) => {
    if (opt.disabled) return;
    if (!controlled) setInnerValue(opt.value);
    onChange?.(opt.value, opt);
    changeOpen(false);
  };

  const clear = (e) => {
    e.stopPropagation();
    if (!controlled) setInnerValue(undefined);
    onChange?.(undefined, undefined);
    onClear?.();
  };

  // مكان القايمة (fixed + portal علشان ما تتقصش بـ overflow-hidden)
  const updatePos = useCallback(() => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const maxH = listHeight + 8;
    const below = window.innerHeight - r.bottom - 8;
    const above = r.top - 8;
    const up = below < maxH && above > below;
    const avail = up ? above : below;
    setPos({
      left: r.left,
      width: r.width,
      maxHeight: Math.max(80, Math.min(maxH, avail)),
      dir: window.getComputedStyle(el).direction,
      ...(up
        ? { bottom: window.innerHeight - r.top + 4 }
        : { top: r.bottom + 4 }),
    });
  }, [listHeight]);

  useLayoutEffect(() => {
    if (!open) return;
    updatePos();
    window.addEventListener("resize", updatePos);
    window.addEventListener("scroll", updatePos, true);
    return () => {
      window.removeEventListener("resize", updatePos);
      window.removeEventListener("scroll", updatePos, true);
    };
  }, [open, updatePos]);

  // اقفل عند الضغط بره
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (rootRef.current?.contains(e.target)) return;
      if (dropRef.current?.contains(e.target)) return;
      changeOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, changeOpen]);

  useEffect(() => {
    if (disabled) changeOpen(false);
  }, [disabled, changeOpen]);

  // العنصر النشط عند الفتح أو البحث
  useEffect(() => {
    if (!open) return;
    const list = latest.current.filtered;
    const selIdx = list.findIndex((o) => o.value === value && !o.disabled);
    setActive(selIdx >= 0 ? selIdx : list.findIndex((o) => !o.disabled));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, query]);

  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current?.children[active]?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  useEffect(() => {
    if (open && showSearch) inputRef.current?.focus();
  }, [open, showSearch]);

  const move = (dir) => {
    const list = latest.current.filtered;
    if (!list.length) return;
    let i = latest.current.active;
    for (let n = 0; n < list.length; n++) {
      i = (i + dir + list.length) % list.length;
      if (!list[i].disabled) {
        setActive(i);
        return;
      }
    }
  };

  const onKeyDown = (e) => {
    if (disabled) return;
    if (!open) {
      if (
        e.key === "ArrowDown" ||
        e.key === "Enter" ||
        (e.key === " " && !showSearch)
      ) {
        e.preventDefault();
        changeOpen(true);
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      changeOpen(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      move(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      move(-1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const opt = latest.current.filtered[latest.current.active];
      if (opt) choose(opt);
    } else if (e.key === "Tab") {
      changeOpen(false);
    }
  };

  const onRootClick = (e) => {
    if (disabled) return;
    if (open && showSearch && e.target === inputRef.current) return;
    changeOpen(!open);
  };

  const rootCls = [
    "relative flex items-center w-full border border-solid transition-colors duration-200 select-none outline-none",
    SIZE_CLS[size] || SIZE_CLS.middle,
    disabled
      ? "bg-black/[0.04] border-[#d9d9d9] text-black/25 cursor-not-allowed"
      : open
        ? "bg-white border-[#1677ff] shadow-[0_0_0_2px_rgba(5,145,255,0.1)] text-black/90 cursor-pointer"
        : "bg-white border-[#d9d9d9] hover:border-[#4096ff] focus-visible:border-[#1677ff] focus-visible:shadow-[0_0_0_2px_rgba(5,145,255,0.1)] text-black/90 cursor-pointer",
    "group",
    className,
  ].join(" ");

  const dropdown =
    open && pos
      ? createPortal(
          <div
            ref={dropRef}
            dir={pos.dir}
            className={`fixed z-[1050] bg-white rounded-lg p-1 overflow-y-auto shadow-[0_6px_16px_0_rgba(0,0,0,0.08),0_3px_6px_-4px_rgba(0,0,0,0.12),0_9px_28px_8px_rgba(0,0,0,0.05)] ${dropdownClassName}`}
            style={{
              left: pos.left,
              width: pos.width,
              top: pos.top,
              bottom: pos.bottom,
              maxHeight: pos.maxHeight,
              ...dropdownStyle,
            }}
          >
            {filtered.length === 0 ? (
              <div className="px-3 py-[5px] text-sm text-center text-black/25">
                {notFoundContent}
              </div>
            ) : (
              <div ref={listRef} role="listbox">
                {filtered.map((opt, i) => {
                  const isSelected = opt.value === value;
                  return (
                    <div
                      key={String(opt.value)}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={opt.disabled}
                      onMouseEnter={() => !opt.disabled && setActive(i)}
                      onClick={() => choose(opt)}
                      className={[
                        "min-h-8 px-3 py-[5px] rounded text-sm leading-[22px] transition-colors duration-200 flex items-center",
                        opt.disabled
                          ? "text-black/25 cursor-not-allowed"
                          : "text-black/90 cursor-pointer",
                        isSelected && !opt.disabled
                          ? "bg-[#e6f4ff] font-semibold"
                          : i === active && !opt.disabled
                            ? "bg-black/[0.04]"
                            : "",
                      ].join(" ")}
                    >
                      <div className="flex-1 min-w-0">{opt.label}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div
        ref={rootRef}
        id={id}
        role="combobox"
        aria-expanded={open}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={onKeyDown}
        onClick={onRootClick}
        className={rootCls}
        style={style}
      >
        <div className="relative flex-1 min-w-0 h-full flex items-center">
          {showSearch && open ? (
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                onSearch?.(e.target.value);
              }}
              placeholder={
                selected && typeof selected.label === "string"
                  ? selected.label
                  : placeholder
              }
              className="w-full h-full bg-transparent outline-none border-0 p-0 text-inherit placeholder:text-black/25"
            />
          ) : selected ? (
            <span className="truncate">{selected.label}</span>
          ) : (
            <span className="truncate text-black/25">{placeholder}</span>
          )}
        </div>

        <span className="ms-2 shrink-0 w-3 h-3 relative text-black/25">
          <ChevronDown
            className={`absolute inset-0 w-3 h-3 ${
              allowClear && hasValue && !disabled ? "group-hover:opacity-0" : ""
            }`}
          />
          {allowClear && hasValue && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={clear}
              className="absolute inset-0 w-3 h-3 rounded-full bg-white text-black/25 hover:text-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              aria-label="clear"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </span>
      </div>

      {name && (
        <input type="hidden" name={name} value={hasValue ? String(value) : ""} />
      )}
      {dropdown}
    </>
  );
}

Select.Option = Option;

export default Select;
