'use client';

import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';

type Feedback = 'like' | 'dislike' | null;

const LikeDislike = () => {
  const [feedback, setFeedback] = useState<Feedback>(null);

  const handleFeedback = (type: Feedback) => {
    setFeedback((prev) => (prev === type ? null : type));
  };

  return (
    <div className="text-foreground/70 flex items-center space-x-2">
      <span className="mr-4">Was this helpful?</span>

      {/* LIKE */}
      <button
        aria-label="Like"
        aria-pressed={feedback === 'like'}
        onClick={() => handleFeedback('like')}
        className={`focus-visible:ring-primary cursor-pointer rounded-full p-2 transition-colors focus-visible:ring-2 hover:dark:bg-white/10 ${
          feedback === 'like' ? 'text-secondary' : 'text-foreground/70'
        }`}
      >
        <ThumbsUp />
      </button>

      {/* DISLIKE */}
      <button
        aria-label="Dislike"
        aria-pressed={feedback === 'dislike'}
        onClick={() => handleFeedback('dislike')}
        className={`focus-visible:ring-primary cursor-pointer rounded-full p-2 transition-colors focus-visible:ring-2 hover:dark:bg-white/10 ${
          feedback === 'dislike' ? 'text-secondary' : 'text-foreground/70'
        }`}
      >
        <ThumbsDown />
      </button>
    </div>
  );
};

export default LikeDislike;
