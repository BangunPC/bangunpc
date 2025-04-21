'use client'

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";

export default function HeroParallax() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef(null);
  
  // Parallax effect setup
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const categories = ["CPU", "GPU", "Motherboard", "RAM", "SSD", "Power Supply"];
  const results = [
    { name: "Aerocool Lux RGB 550W", category: "Power Supply" },
    { name: "BitFenix Whisper 750W", category: "Power Supply" },
    { name: "Corsair RM650 80+ Gold", category: "Power Supply" },
    { name: "FSP HV Pro 80+ 550W", category: "Power Supply" },
    { name: "Enermax Revolution D.F. 850W", category: "Power Supply" },
  ];

  const filteredResults = results.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div ref={ref} className="overflow-hidden">

      {/* Parallax Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[url('/images/hero-background.png')] bg-center bg-no-repeat bg-cover"
          style={{
            y: yBg
            // scale: 1
          }}
        />
        
        <div className="flex flex-col justify-center items-center h-full px-4 text-center text-white bg-black/45 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-5xl px-4" // Added max-width and padding
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
              RAKIT PC IMPIANMU DENGAN MUDAH DAN MURAH
            </h1>
            <motion.p 
              className="font-light text-sm sm:text-base md:text-lg mb-8 md:mb-12 mx-auto md:max-w-xl sm:max-w-md px-4" // Added responsive text size and horizontal padding
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              merakit PC menjadi mudah, tanpa ribet, dan profesional sesuai dengan kebutuhan dan budget Anda.
            </motion.p>
            <motion.div 
              className="flex gap-3 sm:gap-4 flex-wrap justify-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button className="bg-primary hover:bg-blue-700 active:scale-95 px-4 sm:px-4 py-3 rounded text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform text-sm sm:text-base">
                Rakit Sekarang
              </button>
              <button className="border-white bg-transparent border-2 text-white hover:bg-gray-100 active:scale-95 hover:text-gray-800 px-4 sm:px-4 py-3 rounded font-semibold transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform text-sm sm:text-base">
                Simulasi Rakit PC
                {/* <span className="text-3xl">→</span> */}
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Placeholder Section to test parallax scroll */}
      <section className="h-[150vh] bg-gray-100 flex items-center justify-center">
        <h2 className="text-xl sm:text-2xl md:text-4xl text-gray-800 px-4 text-center">
          Scroll to see the parallax effect
        </h2>
      </section>

      {/* Search Modal using ShadCN Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="bg-[#0f111a] text-white max-w-xl">
          <div className="flex justify-between items-center mb-4">
            <input
              autoFocus
              type="text"
              placeholder="Cari komponen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded bg-gray-800 text-white outline-none"
            />
          </div>

          {searchQuery === "" ? (
            <motion.div 
              className="grid grid-cols-2 sm:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {categories.map((cat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Image
                    src="/ebad478a-daa4-49eb-952e-90b03598185d.png"
                    alt={cat}
                    width={80}
                    height={80}
                    className="mx-auto"
                  />
                  <p className="mt-2 text-sm font-medium">{cat}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.ul 
              className="space-y-2 max-h-64 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredResults.map((item, idx) => (
                <motion.li 
                  key={idx} 
                  className="flex items-center justify-between bg-gray-900 px-4 py-2 rounded-lg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-400">{item.category}</p>
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 active:scale-95 transition-transform duration-150">
                    Beli
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}