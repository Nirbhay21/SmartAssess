interface WorkflowContentWrapperProps {
  toggleButton: React.ReactElement;
  content: React.ReactElement;
}

const WorkflowContentWrapper = ({ toggleButton, content }: WorkflowContentWrapperProps) => {
  return (
    <>
      {toggleButton}
      {content}
    </>
  );
};

export default WorkflowContentWrapper;
