import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";
import CTAButton from "./CTAButton";
import logoUrl from "../../assets/logo-spark.png";

type NavLinkItem = {
  to: string;
  label: string;
  hasDropdown?: boolean;
};

const NAV_LINKS: NavLinkItem[] = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services", hasDropdown: true },
  { to: "/products", label: "Products", hasDropdown: true },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/news", label: "Blog" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const openRef = useRef(false);
  const lastYRef = useRef(0);
  const hiddenRef = useRef(false);
  const upAccumRef = useRef(0);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    hiddenRef.current = hidden;
  }, [hidden]);

  useEffect(() => {
    let ticking = false;

    const getY = () => {
      if (typeof window === "undefined") return 0;
      const winOffset = window.scrollY ?? window.pageYOffset ?? 0;
      const docOffset = document.documentElement?.scrollTop ?? 0;
      const bodyOffset = document.body?.scrollTop ?? 0;
      return Math.max(winOffset, docOffset, bodyOffset, 0);
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = getY();
        const last = lastYRef.current;
        const dy = y - last;
        const atTop = y <= 0;
        const beyond80 = y > 80;
        const beyondFold = y >= (window.innerHeight || 0);

        setScrolled(beyond80);

        if (openRef.current || atTop) {
          if (hiddenRef.current) setHidden(false);
          upAccumRef.current = 0;
          lastYRef.current = y;
          ticking = false;
          return;
        }

        if (dy > 0) {
          upAccumRef.current = 0;
          if (!hiddenRef.current && beyond80) {
            setHidden(true);
          }
        } else if (dy < 0) {
          if (hiddenRef.current && beyondFold) {
            upAccumRef.current += -dy;
            if (upAccumRef.current >= 16) {
              setHidden(false);
              upAccumRef.current = 0;
            }
          }
        }

        lastYRef.current = y;
        ticking = false;
      });
    };

    lastYRef.current = getY();
    setScrolled(lastYRef.current > 80);

    const target = window;
    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const container = menuRef.current;
    const toggleBtn = buttonRef.current;
    if (!container) return;

    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(",");
    const getFocusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));

    const focusables = getFocusable();
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleBtn?.focus();
        return;
      }
      if (e.key === "Tab") {
        if (focusables.length === 0) return;
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            (last || first).focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          (first || last).focus();
        }
      }
    };

    const onClickOutside = (event: MouseEvent) => {
      if (!menuRef.current || !openRef.current) return;
      if (
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open]);

  useEffect(() => {
    if (open) setHidden(false);
  }, [open]);

  const headerClasses = clsx(
    "fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out will-change-transform",
    scrolled ? "bg-white/95" : "bg-white/80",
    "backdrop-blur border-b border-[var(--border)]",
    scrolled && "shadow-[0_14px_40px_rgba(15,23,42,0.12)]",
    hidden && "pointer-events-none",
  );

  const mobileLinks: NavLinkItem[] = [
    ...NAV_LINKS,
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      data-scrolled={scrolled}
      data-hidden={hidden}
      className={headerClasses}
      style={{ transform: `translateY(${hidden ? "-100%" : "0%"})` }}
    >
      <div className="hidden lg:block border-b border-[var(--border)]/60 bg-[#f2f6fb]">
        <div className="section flex h-8 items-center justify-between text-[0.7rem] text-neutral-500">
          <span className="font-medium tracking-[0.18em] uppercase">
            Smart Access. Seamless Journeys.
          </span>
          <div className="flex items-center gap-5 whitespace-nowrap">
            <a
              href="tel:+38111222333"
              className="transition-colors hover:text-[var(--brand)]"
            >
              +381 11 222 333
            </a>
            <span className="text-neutral-400">|</span>
            <a
              href="mailto:info@sparksystems.com"
              className="transition-colors hover:text-[var(--brand)]"
            >
              info@sparksystems.com
            </a>
          </div>
        </div>
      </div>

      <div className="section flex h-[4.5rem] items-center gap-6 md:h-[5rem]">
        <Link to="/" className="flex items-center shrink-0" aria-label="Spark Systems home">
          <img
            src={logoUrl}
            alt="Spark Systems"
            className="h-10 w-auto md:h-12 lg:h-12 xl:h-[3.25rem]"
          />
        </Link>

        <nav className="hidden md:flex ml-auto items-stretch gap-2 lg:gap-4">
          {NAV_LINKS.map(({ to, label, hasDropdown }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                clsx(
                  "group relative inline-flex flex-col items-stretch px-2 py-2 text-[0.9rem] font-medium text-neutral-500 transition",
                  "lg:px-3 lg:text-[0.95rem]",
                  isActive
                    ? "text-neutral-900"
                    : "hover:text-neutral-900",
                )
              }
            >
              {({ isActive }) => (
                <span className="relative flex items-center gap-1.5">
                  <span className="leading-none">{label}</span>
                  {hasDropdown && (
                    <span
                      className="relative flex h-3 w-3 items-center justify-center text-neutral-400 transition-colors group-hover:text-neutral-600"
                      aria-hidden
                    >
                      <svg
                        viewBox="0 0 12 12"
                        className={clsx(
                          "h-3 w-3 transition-transform duration-200 ease-out",
                          isActive && "rotate-180",
                        )}
                      >
                        <path
                          d="M2 4.5L6 8.5L10 4.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  )}
                  <span
                    className={clsx(
                      "pointer-events-none absolute inset-x-0 -bottom-1 h-0.5 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-200 ease-out",
                      "group-hover:scale-x-100",
                      isActive && "scale-x-100",
                    )}
                    aria-hidden
                  />
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <CTAButton to="/contact" size="sm">Contact Us</CTAButton>
        </div>

        <button
          className="md:hidden ml-auto flex h-11 w-11 flex-col items-center justify-center rounded-md border border-[var(--border)] bg-white shadow-sm"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          ref={buttonRef}
        >
          <span className="sr-only">Menu</span>
          <span
            className={clsx(
              "block h-0.5 w-6 bg-[var(--text)] transition-transform duration-200",
              open && "translate-y-1.5 rotate-45",
            )}
          />
          <span
            className={clsx(
              "my-1 block h-0.5 w-6 bg-[var(--text)] transition-opacity duration-200",
              open && "opacity-0",
            )}
          />
          <span
            className={clsx(
              "block h-0.5 w-6 bg-[var(--text)] transition-transform duration-200",
              open && "-translate-y-1.5 -rotate-45",
            )}
          />
        </button>
      </div>

      {open && (
        <div
          className="md:hidden fixed inset-x-0 top-[4.5rem] bottom-0 z-[60] min-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-[var(--border)] bg-white/98 text-neutral-800 backdrop-blur-sm shadow-lg"
          id="mobile-menu"
          ref={menuRef}
        >
          <div className="px-6 py-8 text-left">
            <nav className="grid gap-5">
              {mobileLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    clsx(
                      "text-lg font-medium text-neutral-700 transition-colors",
                      isActive
                        ? "text-[var(--brand)]"
                        : "hover:text-[var(--brand)]",
                    )
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}



