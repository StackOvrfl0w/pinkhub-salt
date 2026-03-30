"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import productsData from "@/data/products.json";
import {
  Phone,
  Mail,
  Facebook,
  Instagram,
  Linkedin,
  Search,
  Menu,
  X,
} from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  //searchquery and search results state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/products", label: "Products" },
    { href: "/private-label", label: "Private Label" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact Us" },
  ];

  const socialLinks = [
    { href: "#", Icon: Facebook },
    { href: "#", Icon: Instagram },
    { href: "#", Icon: Linkedin },
  ];

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim().length > 0) {
      // Dynamically load data only when search is used
      const { default: productsData } = await import("@/data/products.json");

      const filtered = productsData.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(filtered.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <header className="shadow-md relative">
      {/* 1. TOP BAR */}
      <div className="bg-gray-100 text-gray-700 text-xs py-2 border-b border-gray-200">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex flex-col sm:flex-row gap-x-4 gap-y-1 mb-1 sm:mb-0">
            {/* Updated WhatsApp link */}
            <a
              href="https://wa.me/+923211117621"
              className="flex items-center gap-1 hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Phone size={14} />
              <span>+92 321 1117621</span>
            </a>

            {/* Updated Email link */}
            <a
              href="mailto:info@pakpink.com"
              className="flex items-center gap-1 hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={14} />
              <span>info@pakpink.com</span>
            </a>
          </div>

          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-500 hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <nav className="bg-white py-3">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* <Link
            href="/"
            className="text-2xl md:text-3xl font-bold text-gray-800"
          >
            Raqeeb<span className="text-primary">Salt</span>
          </Link> */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo/pakpinklogo-new-cropped.png"
              alt="Logo Header"
              width={435}
              height={362}
              className="h-24 w-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 font-medium pb-1 border-b-2 border-transparent hover:text-primary hover:border-primary transition-all duration-300"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-primary"
            >
              <Search size={20} />
            </button>
            <Link
              href="/contact"
              className="bg-primary text-white px-5 py-2 rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
            >
              Get a Quote
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-600 hover:text-primary"
            >
              <Search size={24} />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <Menu size={28} className="text-gray-700" />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. SEARCH BAR (Absolute Positioned) */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg z-40 border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 flex items-center relative">
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search products by name or category..."
              className="flex-grow border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:opacity-90">
              <Search size={20} />
            </button>
            <button
              onClick={closeSearch}
              className="ml-2 text-gray-500 hover:text-gray-800"
            >
              <X size={24} />
            </button>
          </div>

          {/* Real-time Search Results */}
          {searchQuery.trim().length > 0 && (
            <div className="container mx-auto px-4 pb-6">
              {searchResults.length > 0 ? (
                <ul className="bg-white border border-gray-100 rounded-md shadow-sm divide-y divide-gray-100 max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.category}/${product.id}`}
                        onClick={closeSearch}
                        className="flex items-center p-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="h-12 w-12 bg-gray-100 rounded overflow-hidden relative mr-4 flex-shrink-0">
                          <img
                            src={product.image || "/images/Category-Card.png"}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-primary capitalize mt-1">
                            {product.category.replace(/-/g, " ")}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">
                  No products found for "{searchQuery}"
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* 4. MOBILE MENU (Overlay) */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 p-4 flex flex-col">
          <div className="flex justify-between items-center mb-8 pb-4 border-b">
            {/* <Link href="/" className="text-2xl font-bold text-gray-800">
              Raqeeb<span className="text-primary">Salt</span>
            </Link> */}
            <Link href="/" className="flex items-center">
              <Image
                src="images/logo/pakpinklogo-new-cropped.png"
                alt="Logo"
                width={435}
                height={362}
                className="h-24 w-auto"
                priority
              />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <X size={28} className="text-gray-700" />
            </button>
          </div>

          <nav className="flex flex-col gap-4 flex-grow">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 text-lg font-medium p-3 rounded hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="bg-primary text-white px-6 py-3 rounded-full font-medium text-center mt-6 mb-4 hover:opacity-90 transition-opacity"
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
