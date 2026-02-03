import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // Initially hidden
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
        setIsMobile(window.matchMedia("(max-width: 768px)").matches || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      if (!isVisible) setIsVisible(true);
    };

    const checkPointer = () => {
        const target = document.elementFromPoint(mousePosition.x, mousePosition.y);
        if (target) {
            const computed = window.getComputedStyle(target);
            setIsPointer(computed.cursor === 'pointer');
        }
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseover", checkPointer); // Use mouseover for better detection

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseover", checkPointer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isVisible, mousePosition.x, mousePosition.y]);

  if (isMobile) return null; // Don't render on mobile

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1
    },
    pointer: {
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
        scale: 1.5,
        backgroundColor: "rgba(0, 255, 65, 0.1)",
        borderColor: "transparent"
    }
  };

  return (
    <motion.div
      className="custom-cursor"
      variants={variants}
      animate={isPointer ? "pointer" : "default"}
      transition={{ type: "tween", ease: "backOut", duration: 0.1 }} // Faster transition
      style={{ opacity: isVisible ? 1 : 0 }}
    />
  );
};

export default CustomCursor;
