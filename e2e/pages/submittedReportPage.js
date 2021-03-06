import BasePage from "./basePage";
import { testId } from "./helpers";

export default class SubmittedReportPage extends BasePage {
  constructor(reportId) {
    super();
    this.reportId = reportId;
  }

  get path() {
    return `/reports/${this.reportId}`;
  }

  getSection(name, callback) {
    return cy
      .get(testId(name))
      .within((...args) => callback(new ReportSection(), ...args))
      .root();
  }

  verifyReportData(data) {
    cy.get(testId("report-grant-name")).should("contains.text", data.grantName);
    cy.get(testId("report-submission-date")).should(
      "contains.text",
      data.submissionDate
    );
  }
}

export class ReportSection {
  get title() {
    return cy.get(testId("report-section-title"));
  }

  contentFor(name) {
    return cy.get(testId(name));
  }
}
