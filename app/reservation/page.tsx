"use client";

import { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus, Minus, Dog, MessageSquare, Home, BedDouble, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ───────────────────────────────────────────────────────────────────

type HebergementType = "chambres" | "gite";

type Chambre = {
  slug: string;
  name: string;
  price: number;
  capacity: number;
  description: string;
};

// ─── Données ─────────────────────────────────────────────────────────────────

const CHAMBRES: Chambre[] = [
  {
    slug: "roussanne",
    name: "La Roussanne",
    price: 50,
    capacity: 2,
    description: "Chambre double — ambiance d'autrefois",
  },
  {
    slug: "manseng-folies",
    name: "Manseng'Folies",
    price: 60,
    capacity: 5,
    description: "Grande chambre mansardée — jusqu'à 5 personnes",
  },
];

const GITE_BASE_PRICE = 120;
const GITE_CAPACITY_BASE = 8; // prix de base inclut 8 personnes
const GITE_EXTRA_PERSON_PRICE = 10; // par personne supplémentaire/nuit
const GITE_MAX_CAPACITY = 12;
const ANIMAL_FEE = 0; // admis sans supplément

// ─── Helpers date ─────────────────────────────────────────────────────────────

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function diffDays(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / 86400000);
}

function formatDate(d: Date) {
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function formatShortDate(d: Date) {
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

function startOfDay(d: Date) {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  return r;
}

// ─── Calendrier custom ────────────────────────────────────────────────────────

const MONTHS_FR = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
const DAYS_FR = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

interface CalendarProps {
  bookedRanges: { start: Date; end: Date }[];
  checkIn: Date | null;
  checkOut: Date | null;
  onSelectDate: (d: Date) => void;
  minDate?: Date;
}

function MiniCalendar({ bookedRanges, checkIn, checkOut, onSelectDate, minDate }: CalendarProps) {
  const today = startOfDay(new Date());
  const [viewDate, setViewDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  // Jours du mois
  const firstDay = new Date(year, month, 1);
  // Lundi = 0
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: (Date | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let i = 1; i <= daysInMonth; i++) cells.push(new Date(year, month, i));

  const isBooked = (d: Date) =>
    bookedRanges.some(r => d >= r.start && d < r.end);

  const isCheckIn = (d: Date) => checkIn ? isSameDay(d, checkIn) : false;
  const isCheckOut = (d: Date) => checkOut ? isSameDay(d, checkOut) : false;

  const isInRange = (d: Date) => {
    if (!checkIn || !checkOut) return false;
    return d > checkIn && d < checkOut;
  };

  const isPast = (d: Date) => d < today;
  const isBeforeMin = (d: Date) => minDate ? d <= minDate : false;

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <div className="select-none">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-soft text-foreground/50 hover:text-foreground"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="eyebrow text-foreground text-[0.7rem]">
          {MONTHS_FR[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center hover:bg-muted transition-soft text-foreground/50 hover:text-foreground"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_FR.map(d => (
          <div key={d} className="text-center text-[0.6rem] uppercase tracking-widest text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Grille */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const disabled = isPast(day) || isBooked(day) || isBeforeMin(day);
          const isStart = isCheckIn(day);
          const isEnd = isCheckOut(day);
          const inRange = isInRange(day);
          const booked = isBooked(day);

          return (
            <button
              key={i}
              onClick={() => !disabled && onSelectDate(day)}
              disabled={disabled}
              className={cn(
                "relative h-9 text-sm transition-soft",
                disabled && "cursor-not-allowed opacity-40",
                booked && "line-through text-muted-foreground",
                !disabled && !isStart && !isEnd && "hover:bg-accent/15",
                inRange && "bg-accent/10",
                (isStart || isEnd) && "bg-accent text-white font-medium z-10",
                isStart && "rounded-l-sm",
                isEnd && "rounded-r-sm",
                !isStart && !isEnd && inRange && "rounded-none",
                !inRange && !isStart && !isEnd && "rounded-sm",
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      {/* Légende */}
      <div className="flex gap-4 mt-4 justify-center">
        <span className="flex items-center gap-1.5 text-[0.6rem] text-muted-foreground uppercase tracking-widest">
          <span className="w-3 h-3 rounded-sm bg-accent inline-block" /> Sélection
        </span>
        <span className="flex items-center gap-1.5 text-[0.6rem] text-muted-foreground uppercase tracking-widest">
          <span className="w-3 h-3 rounded-sm bg-muted inline-block" /> Réservé
        </span>
      </div>
    </div>
  );
}

// ─── Compteur de personnes ────────────────────────────────────────────────────

function Counter({
  label,
  sublabel,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  sublabel?: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        {sublabel && <p className="text-xs text-muted-foreground">{sublabel}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="w-8 h-8 border border-border flex items-center justify-center transition-soft hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Minus size={14} />
        </button>
        <span className="w-6 text-center font-display text-lg italic">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="w-8 h-8 border border-border flex items-center justify-center transition-soft hover:border-accent hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
}

// ─── Récap tarifaire ──────────────────────────────────────────────────────────

function PriceBreakdown({
  hebergement,
  chambreSlug,
  checkIn,
  checkOut,
  adults,
  children,
  animals,
}: {
  hebergement: HebergementType;
  chambreSlug: string | null;
  checkIn: Date | null;
  checkOut: Date | null;
  adults: number;
  children: number;
  animals: boolean;
}) {
  const nights = checkIn && checkOut ? diffDays(checkIn, checkOut) : 0;
  const totalPersons = adults + children;

  let basePrice = 0;
  let extraPersonFee = 0;
  let lines: { label: string; amount: number }[] = [];

  if (hebergement === "chambres" && chambreSlug) {
    const chambre = CHAMBRES.find(c => c.slug === chambreSlug);
    if (chambre && nights > 0) {
      basePrice = chambre.price * nights;
      lines.push({ label: `${chambre.name} · ${nights} nuit${nights > 1 ? "s" : ""} × ${chambre.price}€`, amount: basePrice });
    }
  } else if (hebergement === "gite" && nights > 0) {
    basePrice = GITE_BASE_PRICE * nights;
    lines.push({ label: `Gîte Noulibos · ${nights} nuit${nights > 1 ? "s" : ""} × ${GITE_BASE_PRICE}€`, amount: basePrice });
    if (totalPersons > GITE_CAPACITY_BASE) {
      const extra = totalPersons - GITE_CAPACITY_BASE;
      extraPersonFee = extra * GITE_EXTRA_PERSON_PRICE * nights;
      lines.push({ label: `+${extra} pers. supplémentaire${extra > 1 ? "s" : ""} × ${GITE_EXTRA_PERSON_PRICE}€/nuit`, amount: extraPersonFee });
    }
  }

  const animalFee = animals ? ANIMAL_FEE : 0;
  if (animals) lines.push({ label: "Forfait animaux", amount: ANIMAL_FEE });

  const total = basePrice + extraPersonFee + animalFee;

  if (nights === 0 || total === 0) return null;

  return (
    <div className="border border-border p-5 space-y-3">
      <p className="eyebrow text-foreground text-[0.65rem] mb-4">Estimation tarifaire</p>
      {lines.map((l, i) => (
        <div key={i} className="flex justify-between text-sm">
          <span className="text-foreground/70">{l.label}</span>
          <span className="font-medium">{l.amount}€</span>
        </div>
      ))}
      <div className="border-t border-border pt-3 flex justify-between">
        <span className="font-display italic text-lg">Total estimé</span>
        <span className="font-display italic text-2xl text-accent">{total}€</span>
      </div>
      <p className="text-[0.65rem] text-muted-foreground italic">
        * Estimation non contractuelle. Le montant définitif sera confirmé par nos soins.
      </p>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function ReservationPage() {
  // Step 1 : choix hébergement
  const [hebergement, setHebergement] = useState<HebergementType | null>(null);
  // Step 2 : choix chambre (si chambres d'hôtes)
  const [chambreSlug, setChambreSlug] = useState<string | null>(null);
  // Step 3 : dates
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [selectingDate, setSelectingDate] = useState<"checkIn" | "checkOut">("checkIn");
  // Step 4 : personnes
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  // Step 5 : animaux & extras
  const [animals, setAnimals] = useState(false);
  const [notes, setNotes] = useState("");

  // Form
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Dates réservées (simulées — en prod, props server component)
  // On ferait passer via props depuis un Server Component
  const bookedRanges: { start: Date; end: Date }[] = [];

  const maxPersons = hebergement === "gite" ? GITE_MAX_CAPACITY :
    hebergement === "chambres" && chambreSlug
      ? CHAMBRES.find(c => c.slug === chambreSlug)?.capacity ?? 2
      : 2;

  const nights = checkIn && checkOut ? diffDays(checkIn, checkOut) : 0;

  // Ajustement des personnes si on change de chambre
  useEffect(() => {
    if (adults > maxPersons) setAdults(maxPersons);
  }, [maxPersons]);

  const handleDateSelect = (d: Date) => {
    if (selectingDate === "checkIn") {
      setCheckIn(d);
      setCheckOut(null);
      setSelectingDate("checkOut");
    } else {
      if (checkIn && d <= checkIn) {
        // Re-sélectionne depuis le début
        setCheckIn(d);
        setCheckOut(null);
        setSelectingDate("checkOut");
      } else {
        setCheckOut(d);
        setSelectingDate("checkIn");
      }
    }
  };

  const resetDates = () => {
    setCheckIn(null);
    setCheckOut(null);
    setSelectingDate("checkIn");
  };

  const canSubmit = hebergement &&
    (hebergement === "gite" || chambreSlug) &&
    checkIn && checkOut && nights >= 2 &&
    name && email;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitStatus("sending");

    const chambre = hebergement === "chambres" ? CHAMBRES.find(c => c.slug === chambreSlug) : null;
    const totalPersons = adults + children;

    const body = {
      name,
      email,
      message: `
== DEMANDE DE RÉSERVATION ==

Hébergement : ${hebergement === "gite" ? "Gîte Noulibos" : `Chambres d'hôtes Pesaulhe — ${chambre?.name}`}
Arrivée : ${checkIn ? formatDate(checkIn) : "-"}
Départ : ${checkOut ? formatDate(checkOut) : "-"}
Durée : ${nights} nuit${nights > 1 ? "s" : ""}
Adultes : ${adults}
Enfants : ${children}
Total personnes : ${totalPersons}
Animaux : ${animals ? "Oui" : "Non"}

Téléphone : ${phone || "Non renseigné"}
Demandes particulières : ${notes || "Aucune"}
      `.trim(),
    };

    try {
      const res = await fetch("/api/", {
        method: "POST",
        body: JSON.stringify(body),
      });
      if (res.ok) setSubmitStatus("sent");
      else setSubmitStatus("error");
    } catch {
      setSubmitStatus("error");
    }
  };

  const step = !hebergement ? 1
    : hebergement === "chambres" && !chambreSlug ? 2
    : !checkIn || !checkOut ? 3
    : 4;

  return (
    <main className="pt-32 pb-20 px-6 max-w-5xl mx-auto">
      {/* ── En-tête ── */}
      <div className="text-center mb-14 fade-in-up">
        <span className="eyebrow justify-center mb-4">
          <span className="rule mr-2" /> Réservation <span className="rule ml-2" />
        </span>
        <h1 className="text-4xl md:text-5xl font-display italic">
          Réserver votre séjour
        </h1>
        <p className="mt-3 text-muted-foreground text-sm max-w-md mx-auto">
          Choisissez votre hébergement, vos dates et complétez votre demande.
          Nous vous confirmons la disponibilité sous 24h.
        </p>
      </div>

      {/* ── Progression ── */}
      <div className="flex items-center justify-center gap-2 mb-12">
        {["Hébergement", "Dates", "Voyageurs", "Demande"].map((s, i) => {
          const sNum = i + 1;
          // Recalcul progress selon step logique
          const progressStep = !hebergement ? 1
            : hebergement === "chambres" && !chambreSlug ? 1
            : !checkIn || !checkOut ? 2
            : step === 4 ? 3
            : 3;
          const active = sNum <= progressStep;
          return (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                "flex items-center gap-2",
                active ? "text-foreground" : "text-muted-foreground"
              )}>
                <span className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[0.65rem] font-medium border transition-soft",
                  active ? "bg-accent text-white border-accent" : "border-border"
                )}>
                  {sNum}
                </span>
                <span className="hidden sm:block text-xs uppercase tracking-[0.15em]">{s}</span>
              </div>
              {i < 3 && <span className={cn("w-8 h-px", active ? "bg-accent" : "bg-border")} />}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-start">
        {/* ── Colonne principale ── */}
        <div className="space-y-8">

          {/* ── Étape 1 : Choix de l'hébergement ── */}
          <section className={cn("border border-border p-6 transition-soft", !hebergement && "border-accent/40 shadow-editorial")}>
            <div className="flex items-center gap-3 mb-6">
              <span className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border",
                hebergement ? "bg-accent text-white border-accent" : "border-foreground"
              )}>
                {hebergement ? <Check size={13} /> : "1"}
              </span>
              <h2 className="font-display text-2xl italic">Quel hébergement ?</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Chambres d'hôtes */}
              <button
                onClick={() => { setHebergement("chambres"); setChambreSlug(null); resetDates(); setAdults(2); }}
                className={cn(
                  "group text-left p-5 border transition-soft relative overflow-hidden",
                  hebergement === "chambres"
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                )}
              >
                {hebergement === "chambres" && (
                  <span className="absolute top-3 right-3 w-5 h-5 bg-accent text-white rounded-full flex items-center justify-center">
                    <Check size={11} />
                  </span>
                )}
                <BedDouble size={20} className="text-accent mb-3" />
                <h3 className="font-display text-xl italic mb-1">Chambres d'hôtes</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Maison Pesaulhe — 2 chambres de charme avec petit-déjeuner
                </p>
                <p className="mt-3 text-accent font-display italic text-sm">À partir de 50€ / nuit</p>
              </button>

              {/* Gîte */}
              <button
                onClick={() => { setHebergement("gite"); setChambreSlug(null); resetDates(); setAdults(2); }}
                className={cn(
                  "group text-left p-5 border transition-soft relative overflow-hidden",
                  hebergement === "gite"
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                )}
              >
                {hebergement === "gite" && (
                  <span className="absolute top-3 right-3 w-5 h-5 bg-accent text-white rounded-full flex items-center justify-center">
                    <Check size={11} />
                  </span>
                )}
                <Home size={20} className="text-accent mb-3" />
                <h3 className="font-display text-xl italic mb-1">Gîte Noulibos</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ferme béarnaise entière — jusqu'à 12 personnes, grange incluse
                </p>
                <p className="mt-3 text-accent font-display italic text-sm">À partir de 120€ / nuit</p>
              </button>
            </div>

            {/* Choix de la chambre (si chambres d'hôtes) */}
            {hebergement === "chambres" && (
              <div className="mt-5 space-y-3">
                <p className="eyebrow text-[0.65rem] mb-3">Quelle chambre ?</p>
                {CHAMBRES.map(chambre => (
                  <button
                    key={chambre.slug}
                    onClick={() => { setChambreSlug(chambre.slug); resetDates(); setAdults(1); }}
                    className={cn(
                      "w-full text-left flex items-center justify-between p-4 border transition-soft",
                      chambreSlug === chambre.slug
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    )}
                  >
                    <div>
                      <p className="font-display italic text-lg">{chambre.name}</p>
                      <p className="text-xs text-muted-foreground">{chambre.description}</p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <p className="text-accent font-display italic">{chambre.price}€<span className="text-xs font-sans not-italic text-muted-foreground">/nuit</span></p>
                      <p className="text-xs text-muted-foreground">max {chambre.capacity} pers.</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* ── Étape 2 : Dates ── */}
          {(hebergement === "gite" || chambreSlug) && (
            <section className={cn("border border-border p-6 transition-soft",
              (!checkIn || !checkOut) && "border-accent/40 shadow-editorial"
            )}>
              <div className="flex items-center gap-3 mb-6">
                <span className={cn("w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border",
                  (checkIn && checkOut) ? "bg-accent text-white border-accent" : "border-foreground"
                )}>
                  {(checkIn && checkOut) ? <Check size={13} /> : "2"}
                </span>
                <h2 className="font-display text-2xl italic">Vos dates de séjour</h2>
              </div>

              {/* Sélecteur check-in / check-out */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setSelectingDate("checkIn")}
                  className={cn(
                    "p-4 border text-left transition-soft",
                    selectingDate === "checkIn" && !checkIn ? "border-accent bg-accent/5" :
                    checkIn ? "border-border" : "border-dashed border-border"
                  )}
                >
                  <p className="eyebrow text-[0.6rem] mb-1">Arrivée</p>
                  <p className={cn("font-display italic", checkIn ? "text-xl" : "text-muted-foreground text-sm")}>
                    {checkIn ? formatShortDate(checkIn) : "Choisir"}
                  </p>
                </button>
                <button
                  onClick={() => checkIn && setSelectingDate("checkOut")}
                  className={cn(
                    "p-4 border text-left transition-soft",
                    selectingDate === "checkOut" && checkIn ? "border-accent bg-accent/5" :
                    checkOut ? "border-border" : "border-dashed border-border",
                    !checkIn && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <p className="eyebrow text-[0.6rem] mb-1">Départ</p>
                  <p className={cn("font-display italic", checkOut ? "text-xl" : "text-muted-foreground text-sm")}>
                    {checkOut ? formatShortDate(checkOut) : "Choisir"}
                  </p>
                </button>
              </div>

              {/* Instruction */}
              <p className="text-xs text-muted-foreground mb-4 italic text-center">
                {!checkIn ? "Cliquez sur une date d'arrivée"
                  : !checkOut ? "Maintenant sélectionnez votre date de départ"
                  : nights < 2 ? <span className="text-amber-600 flex items-center gap-1 justify-center"><AlertCircle size={13} /> Séjour minimum 2 nuits</span>
                  : `${nights} nuit${nights > 1 ? "s" : ""} · du ${formatShortDate(checkIn)} au ${formatShortDate(checkOut)}`
                }
              </p>

              <MiniCalendar
                bookedRanges={bookedRanges}
                checkIn={checkIn}
                checkOut={checkOut}
                onSelectDate={handleDateSelect}
                minDate={selectingDate === "checkOut" && checkIn ? checkIn : undefined}
              />

              {(checkIn || checkOut) && (
                <button
                  onClick={resetDates}
                  className="mt-4 text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-soft"
                >
                  Réinitialiser les dates
                </button>
              )}
            </section>
          )}

          {/* ── Étape 3 : Voyageurs ── */}
          {checkIn && checkOut && nights >= 2 && (
            <section className="border border-border p-6 transition-soft border-accent/40 shadow-editorial">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border border-foreground bg-accent text-white border-accent">
                  3
                </span>
                <h2 className="font-display text-2xl italic">Vos voyageurs</h2>
              </div>

              <div className="space-y-1">
                <Counter
                  label="Adultes"
                  sublabel="13 ans et plus"
                  value={adults}
                  min={1}
                  max={maxPersons - children}
                  onChange={setAdults}
                />
                <Counter
                  label="Enfants"
                  sublabel="2 à 12 ans"
                  value={children}
                  min={0}
                  max={maxPersons - adults}
                  onChange={setChildren}
                />
              </div>

              {/* Capacité max */}
              <p className="text-xs text-muted-foreground mt-3 italic">
                Capacité maximale : {maxPersons} personnes
                {hebergement === "gite" && adults + children > GITE_CAPACITY_BASE && (
                  <span className="ml-1 text-amber-600">
                    (+{adults + children - GITE_CAPACITY_BASE} pers. supplémentaire{adults + children - GITE_CAPACITY_BASE > 1 ? "s" : ""} → +{(adults + children - GITE_CAPACITY_BASE) * GITE_EXTRA_PERSON_PRICE * nights}€)
                  </span>
                )}
              </p>

              {/* Animaux */}
              <div className="mt-5 pt-5 border-t border-border">
                <button
                  onClick={() => setAnimals(v => !v)}
                  className={cn(
                    "flex items-center justify-between w-full p-4 border transition-soft",
                    animals ? "border-accent bg-accent/5" : "border-border hover:border-accent/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Dog size={18} className={cn("transition-soft", animals ? "text-accent" : "text-muted-foreground")} />
                    <div className="text-left">
                      <p className="text-sm font-medium">Animal de compagnie</p>
                      <p className="text-xs text-muted-foreground">pas de supplément</p>
                    </div>
                  </div>
                  <span className={cn(
                    "w-5 h-5 border flex items-center justify-center transition-soft",
                    animals ? "bg-accent border-accent text-white" : "border-border"
                  )}>
                    {animals && <Check size={12} />}
                  </span>
                </button>
              </div>

              {/* Notes */}
              <div className="mt-4">
                <label className="eyebrow text-[0.65rem] mb-2 flex items-center gap-2">
                  <MessageSquare size={12} /> Demandes particulières
                </label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Lit bébé, allergies, heure d'arrivée approximative, etc."
                  className="w-full p-3 text-sm bg-transparent border border-border focus:border-accent outline-none transition-soft resize-none placeholder:text-muted-foreground/50"
                />
              </div>
            </section>
          )}

          {/* ── Étape 4 : Formulaire de contact ── */}
          {checkIn && checkOut && nights >= 2 && (
            <section className="border border-border p-6">
              <div className="flex items-center gap-3 mb-6">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium border border-foreground">4</span>
                <h2 className="font-display text-2xl italic">Vos coordonnées</h2>
              </div>

              {submitStatus === "sent" ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center mx-auto">
                    <Check size={22} />
                  </div>
                  <h3 className="font-display italic text-2xl">Demande envoyée !</h3>
                  <p className="text-muted-foreground text-sm">
                    Nous vous répondrons dans les 24h pour confirmer votre réservation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="eyebrow text-[0.65rem] mb-2">Nom complet *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                        className="w-full p-3 text-sm bg-transparent border border-border focus:border-accent outline-none transition-soft"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label className="eyebrow text-[0.65rem] mb-2">Email *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        className="w-full p-3 text-sm bg-transparent border border-border focus:border-accent outline-none transition-soft"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="eyebrow text-[0.65rem] mb-2">Téléphone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full p-3 text-sm bg-transparent border border-border focus:border-accent outline-none transition-soft"
                      placeholder="+33 6 xx xx xx xx"
                    />
                  </div>

                  {submitStatus === "error" && (
                    <p className="text-red-500 text-xs flex items-center gap-2">
                      <AlertCircle size={13} /> Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmit || submitStatus === "sending"}
                    className={cn(
                      "btn-hero w-full mt-2",
                      (!canSubmit || submitStatus === "sending") && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    {submitStatus === "sending" ? "Envoi en cours..." : "Envoyer ma demande de réservation"}
                  </button>

                  <p className="text-xs text-muted-foreground text-center italic">
                    Votre demande sera confirmée par email dans les 24h. Aucun paiement n'est requis à ce stade.
                  </p>
                </form>
              )}
            </section>
          )}
        </div>

        {/* ── Colonne latérale : récap ── */}
        <div className="space-y-5 lg:sticky lg:top-28">

          {/* Récap séjour */}
          {hebergement && (
            <div className="border border-border p-5 space-y-4">
              <p className="eyebrow text-[0.65rem] text-foreground">Votre sélection</p>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hébergement</span>
                  <span className="font-medium text-right">
                    {hebergement === "gite" ? "Gîte Noulibos" :
                      chambreSlug ? CHAMBRES.find(c => c.slug === chambreSlug)?.name : "—"}
                  </span>
                </div>

                {checkIn && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Arrivée</span>
                    <span>{formatShortDate(checkIn)}</span>
                  </div>
                )}
                {checkOut && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Départ</span>
                    <span>{formatShortDate(checkOut)}</span>
                  </div>
                )}
                {nights > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Durée</span>
                    <span className="font-display italic">{nights} nuit{nights > 1 ? "s" : ""}</span>
                  </div>
                )}
                {checkIn && checkOut && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Voyageurs</span>
                    <span>{adults + children} pers.{animals ? " + animal" : ""}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tarification */}
          <PriceBreakdown
            hebergement={hebergement ?? "chambres"}
            chambreSlug={chambreSlug}
            checkIn={checkIn}
            checkOut={checkOut}
            adults={adults}
            children={children}
            animals={animals}
          />

          {/* Infos pratiques */}
          <div className="border border-border p-5 space-y-3 bg-surface-warm">
            <p className="eyebrow text-[0.65rem] text-foreground mb-3">Bon à savoir</p>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>· Séjour minimum <strong>2 nuits</strong> pour le gîte</p>
              <p>· Petit-déjeuner <strong>inclus</strong> pour les chambres d'hôtes</p>
              <p>· Arrivée à partir de <strong>16h</strong></p>
              <p>· Départ avant <strong>11h</strong></p>
              <p>· Ménage de fin de séjour <strong>inclus pour le gîte</strong></p>
              <p>· Animaux acceptés</p>
              <p>· Taxe de séjour <strong>non incluse</strong></p>
              <p>· Hébergements non fumeurs </p>
            </div>
          </div>

          {/* Lien direct */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-3">Préférez-vous nous appeler ?</p>
            <a href="/contact" className="btn-outline btn-sm w-full">
              Nous contacter directement
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}