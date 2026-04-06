import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { scrollToSection } from "@/components/SmoothScroll";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollPercent > 0.25);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.6, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, scale: 1.08 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={() => scrollToSection("#home")}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-xl
                     bg-white/[0.04] border border-white/[0.08] backdrop-blur-[10px]
                     flex items-center justify-center cursor-pointer
                     hover:shadow-[0_0_12px_rgba(0,217,255,0.3)]
                     transition-shadow duration-300 ease-out"
          aria-label="Back to top"
        >
          <ChevronUp size={20} strokeWidth={1.5} className="text-primary" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
