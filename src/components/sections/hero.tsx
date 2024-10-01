"use client";

import { motion } from "framer-motion";
import { Icons } from "@/components/icons";
import HeroVideoDialog from "@/components/magicui/hero-video";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from 'next/image';
import heroImg from '@/public/hero-img.jpg';

const ease = [0.16, 1, 0.3, 1];

function HeroTitles() {
  const words = ["We", "match", "sellers", "to", "verified buyers", "to", "create", "seamless", "off-market", "transactions."];

  return (
    <div className="flex w-full max-w-6xl flex-col space-y-4 overflow-hidden">
      <motion.h1
        className="text-left text-4xl font-medium leading-tight text-foreground sm:text-5xl md:text-6xl"
        initial={{ filter: "blur(10px)", opacity: 0, y: 50 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{
          duration: 4,
          ease,
          staggerChildren: 0.2,
        }}
      >
        {words.map((text, index) => (
          <motion.span
            key={index}
            className="inline-block px-1 md:px-2 text-balance font-bold relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.2,
              ease,
            }}
          >
            {text}
            {text === "verified buyers" && (
              <motion.svg
                className="absolute bottom-[-0.5rem] left-0 w-full text-primary"
                width="382"
                height="24"
                viewBox="0 0 382 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ zIndex: -1 }}
              >
                <motion.path
                  d="M8 8H285.07L87.5458 16H374"
                  stroke="currentColor"
                  strokeWidth="16"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0. }}
                  animate={{ pathLength: 1, opacity: 0.3 }}
                  transition={{ delay: 3, duration: 1.5, ease: "easeInOut" }}
                />
              </motion.svg>
            )}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        className="max-w-4xl text-left text-lg leading-7 text-muted-foreground sm:text-xl sm:leading-9 text-balance"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 2,
          duration: 2,
          ease,
        }}
      >
        BuyerSpring is a unique match-making service that connects buyers and sellers of houses. Say goodbye to the hassle of traditional real estate websites and find your dream home or sell your property privately.
      </motion.p>
    </div>
  );
}

function HeroCTA() {
  return (
    <>
      <motion.div
        className="mt-6 mb-12 flex w-full max-w-2xl flex-col items-left justify-left space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 2, ease }}
      >
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "default", size: "lg" }),
            "w-full sm:w-auto text-background flex gap-2"
          )}
        >
          I'm Buying
        </Link>
        <Link
          href="/signup"
          className={cn(
            buttonVariants({ variant: "outline", size: "lg" }),
            "w-full sm:w-auto flex gap-2"
          )}
        >
          I'm Selling
        </Link>
      </motion.div>
    </>
  );
}

function HeroImage() {
  return (
    <motion.div
      className="relative flex w-full justify-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3, duration: 2, ease }}
    >
      <Image
        src="/hero-img.png"
        alt="Hero image"
        height={675}
        width={1200}
        className="rounded-lg w-full"
        priority
      />
    </motion.div>
  );
}

export default function Hero2() {
  return (
    <section id="hero">
      <div className="relative flex flex-col items-left justify-start px-4 pt-32 sm:px-6 sm:pt-24 md:pt-32 lg:px-8 mw-6xl">
        <HeroTitles />
        <HeroCTA />
        <HeroImage />
        <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 lg:h-1/4"></div>
      </div>
    </section>
  );
}
