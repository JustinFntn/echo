"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLenis } from "@/components/smooth-scroll";
import EchoLogo from "@/components/icons/echo-logo";
import { useGithubData } from "@/hooks/use-github-data";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "@tanstack/react-router";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lenis = useLenis();
  const { stars } = useGithubData();
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDarkMode = document.documentElement.classList.contains("dark");
      setIsDark(isDarkMode);
    }
  }, []);

  useEffect(() => {
    if (location.hash) {
        if (location.hash === "top") {
            lenis?.scrollTo(0);
        } else {
            const element = document.querySelector(`#${location.hash}`);
            if (element) {
                lenis?.scrollTo(element as HTMLElement);
            }
        }
    }
  }, [location.hash, lenis]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-5xl z-50"
    >
      <div className="bg-background/80 backdrop-blur-md border border-border rounded-full shadow-lg pl-6 pr-2.5 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            hash="top"
            className="flex items-center gap-2"
          >
            <EchoLogo variant="full" className="h-6 w-auto text-foreground" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link 
            to="/"
            hash="features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link 
            to="/faq" 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            FAQ
          </Link>
          <Link 
            to="/"
            hash="download"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Download
          </Link>
          <a
            href="https://github.com/damien-schneider/Echo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2"
          >
            GitHub
            {stars && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center justify-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                >
                    {stars}
                </motion.span>
            )}
          </a>
          
          <div className="flex items-center gap-2 ml-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button asChild className="rounded-full gap-2">
                <Link to="/" hash="download">
                    <Download className="h-4 w-4" />
                    Download
                </Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 mt-2 bg-background/95 backdrop-blur-md border border-border rounded-2xl p-4 flex flex-col gap-4 shadow-xl"
        >
          <Link 
            to="/"
            hash="features"
            className="text-sm font-medium" 
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link 
            to="/faq" 
            className="text-sm font-medium" 
            onClick={() => setIsMenuOpen(false)}
          >
            FAQ
          </Link>
          <Link 
            to="/"
            hash="download"
            className="text-sm font-medium" 
            onClick={() => setIsMenuOpen(false)}
          >
            Download
          </Link>
          <a
            href="https://github.com/damien-schneider/Echo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            GitHub
            {stars && (
                <span className="flex items-center justify-center rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    {stars}
                </span>
            )}
          </a>
          <Button asChild className="w-full rounded-full gap-2">
            <Link to="/" hash="download" onClick={() => setIsMenuOpen(false)}>
                <Download className="h-4 w-4" />
                Download
            </Link>
          </Button>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.nav>
  );
}
