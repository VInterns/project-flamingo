import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";

import { type Report } from "./models";
import UnsubmittedReportListComponent from "./UnsubmittedReportListComponent";

describe("UnsubmittedReportListComponent", () => {
  const unsubmittedReports: $Shape<Report>[] = [
    {
      id: 1,
      grant: "Hugh Grant",
      overview: "Hugh",
      completed: false,
      reportPeriod: "2018-10-01T00:00:00.000Z",
      keyActivities: [{}],
      operatingEnvironment: "",
      beneficiaryFeedback: "",
      challengesFaced: "",
      incidents: "",
      otherIssues: "",
      dueDate: "",
      materialsForFundraising: ""
    },
    {
      id: 3,
      grant: "Grant Mitchell",
      overview: "Mitchell",
      completed: false,
      reportPeriod: "2018-10-01T00:00:00.000Z",
      keyActivities: [{}],
      operatingEnvironment: "",
      beneficiaryFeedback: "",
      challengesFaced: "",
      incidents: "",
      otherIssues: "",
      dueDate: "",
      materialsForFundraising: ""
    }
  ];

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <UnsubmittedReportListComponent reports={unsubmittedReports} />
    );
  });

  it("displays a link to the report edit page for all incomplete reports", () => {
    expect(wrapper.find(Link)).toHaveLength(2);
  });
});
