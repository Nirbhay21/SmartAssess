import { cn } from '@/lib/cn';
import { Check, Stars } from 'lucide-react';

const CandidateTestMockup = () => {
  return (
    <figure className="relative w-full max-w-160 sm:mx-auto" aria-hidden="true">
      <div className="xxs:mx-6 xs:mx-8 border-border shadow-glow-xl shadow-accent/20 dark:shadow-accent/25 relative z-1 flex aspect-16/10 flex-col overflow-hidden rounded-lg border bg-white/85 backdrop-blur-3xl dark:bg-black/85">
        {/* Header */}
        <div className="xs:h-9 xsm:h-10 border-border xs:px-4 xsm:p-5 flex h-8 shrink-0 items-center space-x-2 border-b bg-black/5 px-3 dark:bg-white/10">
          <div className="xs:size-3 xsm:size-3.5 size-2.5 rounded-full bg-red-400/80" />
          <div className="xs:size-3 xsm:size-3.5 size-2.5 rounded-full bg-yellow-400/80" />
          <div className="xs:size-3 xsm:size-3.5 size-2.5 rounded-full bg-green-400/80" />
        </div>

        {/* Content */}
        <div className="flex flex-1">
          {/* Left Sidebar */}
          <div className="border-border xs:p-4 xsm:p-5 w-[33%] overflow-y-hidden border-r p-3">
            <div className="xs:rounded-lg xs:h-7 xsm:h-8 xs:mb-5 xsm:mb-5.5 mb-4 h-6 w-3/4 rounded-sm bg-black/5 dark:bg-white/8"></div>

            {/* Questions */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={cn(
                  'mb-2.5 flex h-7 items-center space-x-1.5 rounded-sm px-2',
                  'xxs:px-2.5 xs:px-3.5',
                  'xs:h-8.5 xsm:h-9.5',
                  'xs:rounded-lg',
                  index === 0
                    ? 'border-secondary/40 bg-secondary/10 border'
                    : 'bg-black/4 dark:bg-white/5',
                )}
              >
                <div
                  className={cn(
                    'size-2.5 shrink-0 rounded-full',
                    index === 0 ? 'bg-secondary/70' : 'bg-black/6 dark:bg-white/10',
                  )}
                ></div>
                <div
                  className={cn(
                    'h-2 w-[75%] rounded-xs',
                    index === 0 ? 'bg-secondary/50' : 'bg-black/6 dark:bg-white/10',
                  )}
                ></div>
              </div>
            ))}
          </div>

          {/* Right Content */}
          <div className="w-[67%]">
            <div className="xs:p-4 xsm:p-5 p-3">
              <div className="xs:mb-5 xsm:mb-5.5 mb-4 flex justify-between">
                <div className="xs:h-4 xsm:h-4.5 h-3.5 w-[35%] rounded-xs bg-black/6 dark:bg-white/10"></div>
                <div className="xs:h-4 xsm:h-4.5 h-3.5 w-[25%] rounded-xs bg-black/6 dark:bg-white/10"></div>
              </div>

              {/* Question */}
              <div className="xs:h-4 xsm:h-4.5 xs:mb-2 xsm:mb-2.5 mb-1.5 h-3 rounded-xs bg-black/6 dark:bg-white/10"></div>
              <div className="xs:h-4 xsm:h-4.5 xs:mb-5 xsm:mb-6 mb-4 h-3 w-[80%] rounded-xs bg-black/6 dark:bg-white/10"></div>

              {/* MCQ Options */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="xs:space-x-2.5 xsm:h-9 xsm:mb-2.5 xs:px-3 xs:rounded-lg border-border/60 mb-2 flex h-8 items-center space-x-2 rounded-sm border bg-black/3.5 px-2 dark:bg-white/5"
                >
                  <div className="xs:size-4 border-border size-3 rounded-full border"></div>
                  <div className="xs:h-2.5 xs:rounded-lg h-2 w-[70%] rounded-sm bg-black/6 dark:bg-white/10"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="xs:bottom-4 xs:right-4 xs:text-xs font-inter bg-secondary/10 text-secondary xs:px-4 xs:py-1.5 border-secondary/45 absolute right-2 bottom-2 flex items-center space-x-2 rounded-full border px-3 py-1 text-[0.625rem] font-medium backdrop-blur-sm">
          <div className="bg-secondary/45 size-2 rounded-full"></div>
          <span>AI Analyzing...</span>
        </div>
      </div>

      {/* Badges */}
      <div className="border-border/50 dark:border-border absolute top-0 right-0 z-2 -translate-y-1/2 overflow-hidden rounded-lg border bg-white shadow-lg dark:bg-black">
        <div className="xxs:flex xs:px-4 xs:py-2 hidden items-center space-x-2 bg-black/1.5 px-3 py-1.5 dark:bg-white/7">
          <Stars className="text-secondary xs:w-6 xs:h-6 h-5 w-5" />
          <span className="text-foreground font-inter xs:text-sm text-xs font-medium">
            Proctoring Active
          </span>
        </div>
      </div>
      <div className="border-border/50 dark:border-border absolute bottom-0 left-0 z-2 translate-y-1/2 overflow-hidden rounded-lg border bg-white shadow-lg dark:bg-black">
        <div className="xxs:flex xs:px-4 xs:py-2 hidden items-center space-x-2 bg-black/1.5 px-3 py-1.5 dark:bg-white/7">
          <Check className="text-success bg-success/30 xs:w-6 xs:h-6 h-5 w-5 rounded-full p-1" />
          <span className="text-foreground font-inter xs:text-sm text-xs font-medium">
            API Connected
          </span>
        </div>
      </div>
    </figure>
  );
};

export default CandidateTestMockup;
