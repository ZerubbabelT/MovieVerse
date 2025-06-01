"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Menu, X, Search, Moon } from "lucide-react";
import { Button } from "../ui/button";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
      setSearch("");
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-background/70 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-border/20">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3">
        {/* Left - Logo */}
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-foreground">MovieVerse</h1>
        </div>

        {/* Center - Desktop Nav Links */}
        <div className="hidden md:flex justify-center flex-grow">
          <ul className="flex gap-6 items-center text-sm font-medium text-foreground">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/movies">Movies</Link>
            </li>
            <li>
              <Link href="/tv-series">TV Series</Link>
            </li>
            <li>
              <Link href="/top-rated">Top Rated</Link>
            </li>
          </ul>
        </div>

        {/* Right - Search + Theme Toggle */}
        <div className="flex items-center gap-3 ml-auto">
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1 bg-background/50 backdrop-blur-sm w-40 sm:w-52 lg:w-64 focus-visible:ring-1"
            />
          </form>
          <Button variant="ghost" size="icon" aria-label="Toggle dark mode">
            <Moon className="text-foreground" />
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background/70 backdrop-blur-md border-t border-border/20 pb-4 px-4">
          <ul className="flex flex-col gap-3 text-sm text-foreground">
            <li>
              <Link href="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/movies" onClick={closeMenu}>
                Movies
              </Link>
            </li>
            <li>
              <Link href="/tv-series" onClick={closeMenu}>
                TV Series
              </Link>
            </li>
            <li>
              <Link href="/top-rated" onClick={closeMenu}>
                Top Rated
              </Link>
            </li>
            <li>
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 w-full"
                />
              </form>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;