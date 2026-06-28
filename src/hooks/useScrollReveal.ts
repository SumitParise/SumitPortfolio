import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
}

export const useScrollReveal = <T extends HTMLElement>(options?: ScrollRevealOptions) => {
  const elementRef = useRef<T | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const yVal = options?.y !== undefined ? options.y : 40;
    const durationVal = options?.duration || 1.2;
    const delayVal = options?.delay || 0;
    const staggerVal = options?.stagger || 0.1;

    const ctx = gsap.context(() => {
      // If we are revealing children or the element itself
      const targets = element.querySelectorAll('.reveal-item').length > 0
        ? element.querySelectorAll('.reveal-item')
        : element;

      gsap.from(targets, {
        opacity: 0,
        y: yVal,
        duration: durationVal,
        delay: delayVal,
        stagger: staggerVal,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, element);

    return () => ctx.revert();
  }, [options]);

  return elementRef;
};
export default useScrollReveal;
