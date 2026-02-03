import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const chars = "-_~`!@#$%^&*()+=[]{}|;:,.<>?/";

const DecryptText = ({ text, className, speed = 60 }) => {
  const [displayText, setDisplayText] = useState(text); // Default to full text so it's always visible
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" }); // Re-trigger on every entry

  useEffect(() => {
    if (isInView) {
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        iteration += 1 / 2;
      }, speed);

      return () => clearInterval(interval);
    } else {
        // When out of view, ensure text is fully visible (no scramble)
        // so if the user scrolls back quickly it's there, 
        // and ready to be scrambled again on next view entry.
        setDisplayText(text);
    }
  }, [isInView, text, speed]);

  return (
    <span
      ref={ref}
      className={className}
      // Removed opacity animation to ensure persistent visibility
    >
      {displayText} 
    </span>
  );
};

export default DecryptText;
