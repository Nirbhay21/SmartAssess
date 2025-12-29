'use client';

import { useState } from 'react';
import { FAQItem } from './FAQSection';
import { ChevronRight } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import FeedbackLikeDislike from './FeedbackLikeDislike';
import { cn } from '@/lib/cn';

interface SplitFaqLayoutProps {
  faqs: FAQItem[];
}

const SplitFaqLayout = ({ faqs }: SplitFaqLayoutProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(faqs[0]?.id ?? 1);

  const currentFaq = faqs.find((faq) => faq.id === currentQuestion);

  return (
    <div className="flex">
      <div className="w-1/3">
        <h4 className="font-montserrat mb-4 rounded-md font-semibold uppercase">
          Common Questions
        </h4>
        <ul role="tablist" aria-label="Frequently asked questions">
          {faqs.map((faq) => (
            <li key={faq.id} className="group relative">
              <button
                role="tab"
                id={`faq-question-${faq.id}`}
                aria-selected={currentQuestion === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
                className="flex w-full cursor-pointer items-center justify-between px-5 py-2.5 pr-10 text-left"
                onClick={() => setCurrentQuestion(faq.id)}
              >
                <span
                  className={cn(
                    'font-poppins line-clamp-1 text-lg',
                    currentQuestion === faq.id ? 'font-medium' : 'text-foreground/70 font-normal',
                  )}
                >
                  {faq.question}
                </span>

                <AnimatePresence>
                  {currentQuestion === faq.id && (
                    <motion.div
                      layoutId="right-arrow"
                      className="absolute right-2"
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronRight />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>

              <div
                className={cn(
                  'absolute top-0 h-full w-0.5',
                  currentQuestion === faq.id
                    ? 'bg-primary dark:bg-accent'
                    : 'bg-primary/10 group-hover:bg-primary/20 dark:bg-accent/20 dark:group-hover:bg-accent/40',
                )}
              ></div>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-2/3">
        <div className="pl-12">
          <h4 className="font-montserrat mb-5 rounded-md font-semibold uppercase">Answer</h4>
          <motion.div
            key={currentFaq?.id}
            id={`faq-answer-${currentFaq?.id}`}
            role="tabpanel"
            aria-labelledby={`faq-question-${currentFaq?.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentFaq ? (
              <>
                <h4 className="font-poppins mb-4 text-3xl font-semibold">{currentFaq.question}</h4>
                <p className="font-inter text-foreground/70 text-lg leading-relaxed font-medium">
                  {currentFaq.answer}
                </p>
                <div className="bg-border my-6 h-px"></div>
                <FeedbackLikeDislike />
              </>
            ) : (
              <p className="">Select a question to see the answer.</p>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SplitFaqLayout;
