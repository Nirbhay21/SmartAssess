'use client';

import { cn } from '@/lib/cn';
import { ChevronDown } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useState } from 'react';

interface FAQItemProps {
  id: number;
  question: string;
  answer: string;
}

const FAQItem = ({ id, question, answer }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleFaq = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="dark:bg-card border-border/45 relative rounded-lg border bg-white shadow-sm dark:border">
      <button
        className="group focus-visible:ring-primary flex w-full cursor-pointer justify-between p-5 text-left focus-visible:ring-1"
        aria-expanded={isOpen}
        aria-controls={`faq-content-${id}`}
        onClick={toggleFaq}
      >
        <span>{question}</span>
        <ChevronDown
          className={cn(
            'border-border rounded-full border p-0.5 transition-all duration-300',
            isOpen
              ? 'bg-primary rotate-180 text-white'
              : 'group-hover:bg-primary/10 dark:group-hover:bg-secondary/35 rotate-0 bg-transparent text-black dark:text-white',
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-content-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="box-content overflow-hidden"
          >
            <p className="px-5 pb-5 text-left">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FAQItem;
