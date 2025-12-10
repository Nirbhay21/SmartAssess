import { BotMessageSquare } from 'lucide-react';
import FAQItem from './FAQItem';
import SplitFaqLayout from './SplitFaqLayout';

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'Which AI models do you support?',
    answer:
      'We support major LLMs including GPT-4o, Gemini 1.5 Pro, Claude 3.5 Sonnet, and open-source models like Llama 3 via Groq. Our platform allows seamless switching between these models for optimal assessment performance.',
  },
  {
    id: 2,
    question: 'Is my API key secure?',
    answer:
      'Absolutely. Security is our priority. Your API keys are encrypted locally in your browser using AES-256 encryption and are only used to make direct requests to the model providers. We never store them on our servers.',
  },
  {
    id: 3,
    question: "What if I don't have an API key?",
    answer:
      'No problem! You can get started with our limited free tier which uses our funded keys. For heavier usage, we provide step-by-step guides on how to obtain your own keys from OpenAI, Google, or Anthropic.',
  },
  {
    id: 4,
    question: 'Can I customize the proctoring sensitivity?',
    answer:
      'Yes, SmartAssess offers granular control. You can configure strictness levels for tab switching, copy-paste blocking, and face detection. You can also whitelist specific resources if you want to allow open-book assessments.',
  },
  {
    id: 5,
    question: 'How does the AI grading work?',
    answer:
      'Our AI analyzes code for correctness, efficiency, and style, as well as text responses for relevance and depth. It provides detailed feedback and a score breakdown, saving you hours of manual grading time.',
  },
  {
    id: 6,
    question: 'Is there a free trial?',
    answer:
      'Yes, we offer a 14-day free trial on our Pro plan so you can experience the full power of SmartAssess. No credit card required to start.',
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="px-4 py-12 sm:py-16 2xl:pt-20">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="font-inter text-foreground mb-4 text-4xl font-semibold md:text-5xl">
          Frequently Asked
          <span className="from-primary to-secondary dark:from-secondary dark:to-accent bg-linear-to-r bg-clip-text text-transparent">
            {' '}
            Questions
          </span>
        </h2>
        <p className="font-poppins text-foreground/80 mb-8 text-[1.25rem] lg:mb-12">
          Find quick answers to your questions about our AI-powered assessment platform.
        </p>

        {/* Mobile FAQ List */}
        <div className="space-y-4 text-left lg:hidden">
          {faqs.map((faq) => (
            <FAQItem key={faq.id} id={faq.id} question={faq.question} answer={faq.answer} />
          ))}
        </div>

        {/* Desktop FAQ List */}
        <div className="hidden text-left lg:block">
          <div className="bg-border mb-8 h-px"></div>
          <SplitFaqLayout faqs={faqs} />
        </div>

        {/* Still have questions? */}
        <div className="border-border mt-12 rounded-md border bg-black/2.5 p-8 shadow-md dark:bg-white/3">
          <h5 className="font-inter mb-4 text-2xl font-semibold">Still have questions?</h5>
          <p className="text-foreground/70 font-inter mx-auto mb-6 max-w-[520px] text-lg font-medium">
            Can&apos;t find the answer you&apos;re looking for? Chat with our AI assistant for
            instant help.
          </p>
          <button
            aria-label="Ask AI Assistant"
            className="border-border/50 from-primary/10 to-accent/10 hover:border-border dark:from-secondary/20 dark:to-accent/20 mx-auto inline-flex cursor-pointer items-center space-x-2 rounded-full border bg-white px-6 py-2 shadow-sm hover:scale-102 hover:bg-linear-to-r active:scale-98 dark:bg-black"
          >
            <BotMessageSquare />
            <span className="font-inter font-medium">Ask AI Assistant</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
