import { Check, Stars } from 'lucide-react';

const CandidateTestMockup = () => {
  return (
    <figure className="w-full relative max-w-160 sm:mx-auto" aria-hidden="true">
      <div className="xxs:mx-6 xs:mx-8 border border-border aspect-16/10 rounded-lg shadow-glow-xl shadow-accent/20 dark:shadow-accent/25 relative z-1 flex flex-col overflow-hidden bg-white/85 dark:bg-black/85 backdrop-blur-3xl">
        {/* Header */}
        <div className="h-8 xs:h-9 xsm:h-10 border-b border-border bg-black/5 dark:bg-white/10 flex items-center space-x-2 px-3 xs:px-4 xsm:p-5 shrink-0">
          <div className="size-2.5 xs:size-3 xsm:size-3.5 rounded-full bg-red-400/80" />
          <div className="size-2.5 xs:size-3 xsm:size-3.5 rounded-full bg-yellow-400/80" />
          <div className="size-2.5 xs:size-3 xsm:size-3.5 rounded-full bg-green-400/80" />
        </div>

        {/* Content */}
        <div className="flex-1 flex">
          {/* Left Sidebar */}
          <div className="w-[33%] border-r border-border p-3 xs:p-4 xsm:p-5 overflow-y-hidden">
            <div className="bg-black/5 w-3/4 xs:rounded-lg rounded-sm h-6 xs:h-7 xsm:h-8 mb-4 xs:mb-5 xsm:mb-5.5 dark:bg-white/8"></div>

            {/* Questions */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className={`mb-2.5 h-7 space-x-1.5 xs:h-8.5 xsm:h-9.5 rounded-sm xs:rounded-lg flex items-center px-2 xxs:px-2.5 xs:px-3.5 ${
                  index === 0
                    ? 'border border-secondary/40 bg-secondary/10'
                    : 'bg-black/4 dark:bg-white/5'
                }`}
              >
                <div
                  className={`size-2.5 rounded-full shrink-0 ${
                    index === 0 ? 'bg-secondary/70' : 'bg-black/6 dark:bg-white/10'
                  }`}
                ></div>
                <div
                  className={`h-2 w-[75%] rounded-xs ${
                    index === 0 ? 'bg-secondary/50' : 'bg-black/6 dark:bg-white/10'
                  }`}
                ></div>
              </div>
            ))}
          </div>

          {/* Right Content */}
          <div className="w-[67%]">
            <div className="p-3 xs:p-4 xsm:p-5">
              <div className="flex justify-between mb-4 xs:mb-5 xsm:mb-5.5">
                <div className="w-[35%] rounded-xs h-3.5 xs:h-4 xsm:h-4.5 bg-black/6 dark:bg-white/10"></div>
                <div className="w-[25%] rounded-xs h-3.5 xs:h-4 xsm:h-4.5 bg-black/6 dark:bg-white/10"></div>
              </div>

              {/* Question */}
              <div className="rounded-xs h-3 xs:h-4 xsm:h-4.5 bg-black/6 dark:bg-white/10 mb-1.5 xs:mb-2 xsm:mb-2.5"></div>
              <div className="w-[80%] rounded-xs h-3 xs:h-4 xsm:h-4.5 bg-black/6 dark:bg-white/10 mb-4 xs:mb-5 xsm:mb-6"></div>

              {/* MCQ Options */}
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 xs:space-x-2.5 h-8 xsm:h-9 bg-black/3.5 dark:bg-white/5 mb-2 xsm:mb-2.5 px-2 xs:px-3 rounded-sm xs:rounded-lg border-border/60 border"
                >
                  <div className="size-3 xs:size-4 rounded-full border border-border"></div>
                  <div className="w-[70%] h-2 xs:h-2.5 bg-black/6 dark:bg-white/10 rounded-sm xs:rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-2 right-2 xs:bottom-4 xs:right-4 text-[0.625rem] xs:text-xs font-inter font-medium bg-secondary/10 text-secondary backdrop-blur-sm px-3 py-1 xs:px-4 xs:py-1.5 rounded-full border-secondary/45 border flex items-center space-x-2">
          <div className="size-2 bg-secondary/45 rounded-full"></div>
          <span>AI Analyzing...</span>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-white dark:bg-black absolute top-0 -translate-y-1/2 right-0 z-2 rounded-lg overflow-hidden border border-border/50 shadow-lg dark:border-border">
        <div className="items-center space-x-2 hidden xxs:flex px-3 py-1.5 xs:px-4 xs:py-2 bg-black/1.5 dark:bg-white/7">
          <Stars className="text-secondary h-5 w-5 xs:w-6 xs:h-6" />
          <span className="text-foreground font-inter font-medium text-xs xs:text-sm">
            Proctoring Active
          </span>
        </div>
      </div>
      <div className="bg-white dark:bg-black absolute bottom-0 translate-y-1/2 left-0 z-2 rounded-lg  overflow-hidden border border-border/50 shadow-lg dark:border-border">
        <div className="items-center space-x-2 hidden xxs:flex px-3 py-1.5 xs:px-4 xs:py-2 bg-black/1.5 dark:bg-white/7">
          <Check className="text-success bg-success/30 rounded-full p-1 h-5 w-5 xs:w-6 xs:h-6" />
          <span className="text-foreground font-inter font-medium text-xs xs:text-sm">
            API Connected
          </span>
        </div>
      </div>
    </figure>
  );
};

export default CandidateTestMockup;
