import React, { ReactNode, useEffect, useRef } from 'react';

type Props = {
  children: ReactNode;
  onContentEndVisible: () => void;
}

class Options {
  rootMargin: string;
  threshold: number;
  root: null;

  constructor(rootMargin: string, threshold: number) {
    this.rootMargin = rootMargin;
    this.threshold = threshold;
    this.root = null;
  }
}

// Опишіть Props
export function Observer({ children, onContentEndVisible }: Props) {
  // Вкажіть правильний тип для useRef зверніть увагу, в який DOM елемент ми його передаємо
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Вкажіть правильний тип для options, підказка, клас також можна вказувати як тип
    const options: Options= new Options('0px,', 1.0);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
}
