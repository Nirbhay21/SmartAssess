import { Variants } from 'motion';
import * as motion from 'motion/react-client';

interface WorkflowSteps {
  title: string;
  description: string;
}

interface WorkflowContentProps {
  activeUserType: UserType;
}

const recruiterWorkflowSteps: WorkflowSteps[] = [
  {
    title: 'Create an Account',
    description:
      'Sign up and set up your organization profile to start managing your recruitment process.',
  },
  {
    title: 'Setup Assessments',
    description:
      'Add questions manually, import from PDF, or let our AI generate a tailored Assessments from a resume.',
  },
  {
    title: 'Invite Candidates',
    description: 'Generate a secure, unique interview link and access key for each candidate.',
  },
  {
    title: 'Review Results',
    description: 'Analyze candidate performance with detailed reports and insights.',
  },
];

const candidateWorkflowSteps: WorkflowSteps[] = [
  {
    title: 'Login & Access',
    description:
      'Use the secure link and unique access key provided by the recruiter to log in to the assessment.',
  },
  {
    title: 'Proctored Environment',
    description:
      'Enter a secure, full-screen mode with camera and microphone enabled for identity verification.',
  },
  {
    title: 'Take Assessment',
    description:
      'Complete the assessment within the given time frame, following all instructions carefully.',
  },
  {
    title: 'Submit Assessment',
    description: 'Submit your responses instantly for AI grading and recruiter review.',
  },
];

const parentVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      ease: 'linear',
      staggerChildren: 0.5,
    },
  },
};

const childVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: 'linear',
    },
  },
};

const WorkflowContent = ({ activeUserType }: WorkflowContentProps) => {
  const workflowSteps =
    activeUserType === 'recruiter' ? recruiterWorkflowSteps : candidateWorkflowSteps;

  return (
    <div className="pt-6">
      <motion.div
        key={activeUserType}
        initial="hidden"
        animate="visible"
        variants={parentVariant}
        className="relative mx-auto max-w-5xl overflow-x-hidden"
      >
        {workflowSteps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-row-reverse items-center py-8 sm:flex-row sm:odd:text-end sm:even:flex-row-reverse"
          >
            {/* Step text content */}
            <motion.div
              initial={{
                x: index % 2 === 0 ? -20 : 20,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              transition={{
                delay: index * 0.5,
                duration: 0.5,
                ease: 'easeOut',
              }}
              className="flex-1 space-y-2"
            >
              <h3 className="font-inter text-2xl font-semibold">{step.title}</h3>
              <p className="font-montserrat dark:text-foreground/80">{step.description}</p>
            </motion.div>

            {/* Step number (with circle) */}
            <motion.div
              variants={childVariants}
              className="bg-secondary dark:bg-accent dark:border-background shadow-glow-xs mx-4 flex size-12 items-center justify-center rounded-full border-4 border-white font-semibold text-white shadow-black/25 dark:shadow-white/35"
            >
              {index + 1}
            </motion.div>
            <div className="hidden sm:block sm:flex-1"></div>
          </motion.div>
        ))}

        {/* Vertical Line */}
        <motion.div
          initial={{ height: '0%' }}
          animate={{ height: 'auto', opacity: [0, 1] }}
          transition={{ duration: 1.5, ease: 'linear' }}
          className="from-accent via-secondary to-primary dark:via-accent dark:to-secondary absolute top-[14%] bottom-[10%] left-10 -z-1 w-0.5 -translate-x-1/2 bg-linear-to-b sm:left-1/2 dark:from-white"
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default WorkflowContent;
