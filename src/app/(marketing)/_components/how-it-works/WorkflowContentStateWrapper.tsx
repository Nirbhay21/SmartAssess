'use client';

import { useState } from 'react';
import UserTypeToggle from './UserTypeToggle';
import WorkflowContent from './WorkflowContent';
import WorkflowContentWrapper from './WorkflowContentWrapper';

const WorkflowContentStateWrapper = () => {
  const [activeUserType, setActiveUserType] = useState<UserType>('recruiter');

  return (
    <WorkflowContentWrapper
      toggleButton={<UserTypeToggle activeUserType={activeUserType} onChange={setActiveUserType} />}
      content={<WorkflowContent activeUserType={activeUserType} />}
    ></WorkflowContentWrapper>
  );
};

export default WorkflowContentStateWrapper;
