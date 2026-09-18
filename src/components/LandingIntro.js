"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DEFAULT_SETTINGS } from "@/lib/competitions";
import ImageSlot from "./ImageSlot";


export default function LandingIntro({
  deadline = DEFAULT_SETTINGS.techcon.registrationDeadline,
  eventDate = DEFAULT_SETTINGS.techcon.eventDate,
  venue = "SMVITM,BANTAKAL",
  host = "SMVITM",
  imageSrc = null,
  imageAlt = "Fest poster",
}) {
  const countdown = useCountdown(deadline);
  const title = " TECH FEST '26";

  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-paper">
      {/* Ticker */}
      <div className="border-b-2 border-ink bg-ink py-2">
        <div className="ticker whitespace-nowrap text-sm font-semibold text-paper">
          <span className="ticker-track">
            <TickerContent />
            <TickerContent aria-hidden="true" />
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:py-20 md:grid-cols-[1.15fr_1fr] md:items-center">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          {/* Badge */}
          <span className="intro-pop inline-block border-2 border-ink bg-signal px-4 py-1.5 text-xs font-bold tracking-wide sm:text-sm">
            REGISTRATIONS OPEN
          </span>

          {/* Big drop-in title */}
          <h1 className="mt-6 flex flex-wrap justify-center gap-x-4 font-display text-6xl font-extrabold leading-none sm:text-7xl md:justify-start">
            {title.split(" ").map((word, i) => (
              <span
                key={i}
                className="drop-word inline-block"
                style={{ animationDelay: `${i * 140}ms` }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="intro-fade mt-6 max-w-[45ch] text-lg text-neutral-700 sm:text-xl">
            The biggest tech event of the year. Papers, bots and builds — one sign-in, three
            competitions.
          </p>

          {/* CTAs */}
          <div className="intro-fade mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
            <Link href="#competitions" className="btn-primary">
              See the competitions
            </Link>
            <Link href="/login" className="btn-quiet">
              Sign in
            </Link>
          </div>

          {/* Date / Venue / Host */}
          <div className="intro-fade mt-12 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
            <InfoCell label="Date" value="26–27 Oct 2026" />
            <InfoCell label="Venue" value={venue} />
            <InfoCell label="Host" value={host} />
          </div>
        </div>

               <div className="intro-fade">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-auto w-full object-contain"
            />
          ) : (
            <ImageSlot label="Landing page image" ratio="aspect-[4/5]" />
          )}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-16 sm:pb-24">
        <div className="flex flex-col items-center text-center">
          {/* Countdown */}
          <div className="intro-fade w-full max-w-xl">
            <p className="mb-3 text-sm font-semibold text-neutral-600">
              {countdown?.done ? "Registration has closed" : "Registration closes in"}
            </p>
            <div className="grid grid-cols-4 gap-3">
              <CountBox value={countdown?.days} label="Days" />
              <CountBox value={countdown?.hours} label="Hours" />
              <CountBox value={countdown?.minutes} label="Min" />
              <CountBox value={countdown?.seconds} label="Sec" />
            </div>
          </div>

          {/* Scroll cue */}
          <div className="bounce mt-16 text-neutral-500" aria-hidden="true">
            ▾ scroll
          </div>
        </div>
      </div>

      {/* Why participate */}
      <div className="border-t-2 border-ink bg-wash">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="text-center font-display text-3xl font-extrabold sm:text-4xl">
            Why participate?
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_PARTICIPATE.map((item, i) => (
              <div key={item.title} className="border-2 border-ink bg-paper p-5 shadow-hard-sm">
                <span className="font-display text-3xl font-extrabold text-neutral-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-neutral-700">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .ticker-track {
          display: inline-flex;
          animation: scroll-left 22s linear infinite;
        }
        @keyframes scroll-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .drop-word {
          opacity: 0;
          animation: drop-in 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.3) forwards;
        }
        @keyframes drop-in {
          0% {
            opacity: 0;
            transform: translateY(-70px) rotate(-4deg);
          }
          60% {
            opacity: 1;
            transform: translateY(8px) rotate(1.5deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
        }

        .intro-pop {
          opacity: 0;
          animation: pop-in 0.5s ease-out forwards;
        }
        @keyframes pop-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .intro-fade {
          opacity: 0;
          animation: fade-up 0.6s ease-out 0.5s forwards;
        }
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .bounce {
          animation: bounce-y 2.5s ease-in-out infinite;
        }
        @keyframes bounce-y {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track,
          .drop-word,
          .intro-pop,
          .intro-fade,
          .bounce {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

const WHY_PARTICIPATE = [
  {
    title: "Three shots, one sign-in",
    body: "Register for TechCon, Line Follower and the Web Dev Challenge with the same account.",
  },
  {
    title: "Built for builders",
    body: "Present a paper, race a bot, or ship an AI-powered web experience — pick your arena.",
  },
  {
    title: "Real judging, real prizes",
    body: "Clear judging criteria for every competition, published in the Rule Book before you register.",
  },
  {
    title: "No busywork",
    body: "Deadlines, submissions and results all live on the site — no chasing forms over email.",
  },
];

function TickerContent() {
  const items = [
    "REGISTRATIONS OPEN",
    "TECHCON — PAPER PRESENTATION",
    "LINE FOLLOWER — ROBOTICS",
    "WEB DEV CHALLENGE — AI WEB EXPERIENCE",
  ];
  return (
    <span className="inline-flex items-center">
      {items.map((item, i) => (
        <span key={i} className="mx-4 inline-flex items-center">
          {item}
          <span className="ml-4 text-signal" aria-hidden="true">
            ●
          </span>
        </span>
      ))}
    </span>
  );
}

function InfoCell({ label, value }) {
  return (
    <div className="border-2 border-ink bg-paper px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">{label}</p>
      <p className="mt-1 font-display text-lg font-bold">{value}</p>
    </div>
  );
}

function CountBox({ value, label }) {
  return (
    <div className="border-2 border-ink bg-paper py-4 shadow-hard-sm">
      <p className="font-display text-3xl font-extrabold tabular-nums sm:text-4xl">
        {value === undefined || value === null ? "--" : String(value).padStart(2, "0")}
      </p>
      <p className="mt-1 text-xs font-semibold text-neutral-600">{label}</p>
    </div>
  );
}

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    const targetTime = new Date(target).getTime();
    if (Number.isNaN(targetTime)) return;

    function tick() {
      const diff = Math.max(targetTime - Date.now(), 0);
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        done: diff <= 0,
      });
    }

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}