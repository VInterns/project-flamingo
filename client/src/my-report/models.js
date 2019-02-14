export type KeyActivity = {
  activityName?: string,
  numberOfParticipants?: string,
  demographicInfo?: {
    number: number,
    type: string,
    note: string
  },
  impactOutcome?: string
};

export type Report = {
  id: number,
  overview: string,
  keyActivities: KeyActivity[],
  operatingEnvironment: string,
  beneficiaryFeedback: string,
  challengesFaced: string,
  incidents: string,
  otherIssues: string,
  materialsForFundraising: string,
  grant: string,
  completed: boolean,
  reportPeriod: string,
  dueDate: string,
  submissionDate?: string,
  attachments: any[]
};
