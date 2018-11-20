import React, { Component, Fragment } from "react";
import HeaderComponent from "../page-layout/HeaderComponent";
import {
  Button,
  Grid,
  withStyles,
  OutlinedInput,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import moment from "moment";

import ReportSectionComponent from "./ReportSectionComponent";

import type { Report } from "./models";
import ActivitiesSectionComponent from "./ActivitiesSectionComponent";
import { type Account } from "../authentication/models";
import { type KeyActivity } from "./models";

type Props = {
  classes: any,
  logout: () => void,
  updateReport: (report: Report, errorMessage: string) => Promise<any>,
  loadReport: (id: number) => Promise<any>,
  match: { params: { id: string } },
  report: Report,
  history: any,
  account: Account,
  isLoading: boolean
};

const styles = themes => ({
  input: {
    marginBottom: themes.spacing.unit * 2
  },
  label: {
    textTransform: "uppercase",
    fontSize: "10px",
    marginBottom: themes.spacing.unit,
    display: "block",
    marginLeft: 0
  },
  headerText: {
    color: "#404040",
    fontSize: "24px"
  },
  outerContainer: {
    height: "100vh",
    marginTop: themes.spacing.unit * 5
  }
});

type State = {
  overview: string,
  keyActivities: KeyActivity[],
  operatingEnvironment?: string,
  beneficiaryFeedback?: string,
  challengesFaced?: string,
  incidents?: string,
  otherIssues?: string,
  materialsForFundraising?: string
};

const sectionConfiguration = {
  grantProgress: {
    key: "grant-progress",
    stateProperty: "overview",
    title: "Grant progress",
    subtitle:
      "Please give a very brief overview of your project and progress since the last report.",
    inputKey: "report-progress-input",
    placeholder: "Please add an overview",
    optional: false
  },

  operatingEnvironment: {
    key: "operating-environment",
    stateProperty: "operatingEnvironment",
    title: "Operating environment",
    subtitle:
      "Outline any notable changes you have experienced to the context in which you work.",
    inputKey: "operating-environment-input",
    placeholder: "Please add an overview",
    optional: true
  },

  beneficiaryFeedback: {
    key: "beneficiary-feedback",
    stateProperty: "beneficiaryFeedback",
    title: "Beneficiary Feedback",
    subtitle:
      "Have you had any feedback from beneficiaries about the service/activities you offer?",
    inputKey: "beneficiary-feedback-input",
    placeholder: "Please add an overview",
    optional: true
  },

  challengesFaced: {
    key: "challenges-faced",
    stateProperty: "challengesFaced",
    title: "Challenges faced",
    subtitle:
      "Please use this section to describe any other challenges you may have faced in the last month e.g. legal, financial etc...",
    inputKey: "challenges-faced-input",
    placeholder: "Please add an overview",
    optional: true
  },

  incidents: {
    key: "incidents",
    stateProperty: "incidents",
    title: "Incidents and near misses",
    subtitle:
      "Please describe any incidents or near misses that may have occurred related to health & safety, safeguarding, protection or security. How was the incident resolved and what policy or procedure is in place to avoid this reoccurring?",
    inputKey: "incidents-input",
    placeholder: "Please add an overview",
    optional: true
  },

  otherIssues: {
    key: "other-issues",
    stateProperty: "otherIssues",
    title:
      "Is there anything you would like to use our platform to speak about?",
    subtitle:
      "Are there any issues, news or recent developments that you would like to amplify through our networks? We are always keen to hear about ways we can advocate for change, please contact us to discuss.",
    inputKey: "other-issues-input",
    placeholder: "Please add an overview",
    optional: true
  },

  materialsForFundraising: {
    key: "materials-for-fundraising",
    stateProperty: "materialsForFundraising",
    title: "Materials for fundraising",
    subtitle:
      "We depend on high quality images, film footage, copy and testimonials to raise funds and recruit volunteers. We are always keen to hear about ways we can advocate for change, please contact us to discuss.",
    inputKey: "materials-for-fundraising-input",
    placeholder: "Please add an overview",
    optional: true
  }
};

export class MyReportEditComponent extends Component<Props, State> {
  componentWillMount() {
    this.props
      .loadReport(parseInt(this.props.match.params.id, 10))
      .then(report => {
        if (!report) {
          this.props.history.push("/not-found");
        } else {
          this.setState(report);
        }
      });
  }

  get emptyState() {
    return !this.state || Object.keys(this.state).length === 0;
  }

  reviewAndSubmitReport = () => {
    const { report } = this.props;
    this.props
      .updateReport(
        {
          ...report,
          ...this.state
        },
        "Error saving report"
      )
      .then(() => this.props.history.push(`/my-reports/${report.id}/review`));
  };

  saveReport = (fieldName: string) => {
    return () => {
      const { report } = this.props;
      this.props.updateReport(
        {
          ...report,
          [fieldName]: this.state[fieldName]
        },
        "Error saving report"
      );
    };
  };

  isSubmitDisabled() {
    const { isLoading } = this.props;
    const requiredFields = ({ overview }) => ({ overview });
    const allBlank = object =>
      Object.entries(object).every(([key, value]) => {
        if (typeof value === "object") {
          return allBlank(value);
        }
        return value === "" || value === undefined;
      });

    return isLoading || allBlank(requiredFields(this.state));
  }

  renderToolbar = (classes: any, report: Report) => {
    return (
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Grid container justify="space-between">
            <Grid
              item
              container
              direction="row"
              xs={8}
              sm={6}
              lg={3}
              justify="flex-start"
            >
              <Grid item container direction="column" xs={3} sm={6}>
                <Typography color="textSecondary" variant="caption">
                  Grant
                </Typography>
                <Typography data-test-id="report-grant-name" variant="body1">
                  {report.grant}
                </Typography>
              </Grid>
              <Grid item container direction="column" xs={3} sm={6}>
                <Typography color="textSecondary" variant="caption">
                  Period
                </Typography>
                <Typography data-test-id="report-period" variant="body1">
                  {moment(report.reportPeriod).format("MMMM YYYY")}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              item
              container
              direction="row"
              xs={4}
              sm={6}
              lg={3}
              justify="flex-end"
            >
              <Button
                data-test-id="report-review-and-submit-button"
                variant="contained"
                color="primary"
                disabled={this.isSubmitDisabled()}
                onClick={() => this.reviewAndSubmitReport()}
              >
                Review & submit
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  };

  onSectionInputChange(
    key: string,
    sectionName?: string
  ): (event: Event) => void {
    return (event: Event) => {
      if (sectionName !== undefined) {
        const section = this.state[sectionName];
        this.setState({
          ...this.state,
          [sectionName]: {
            ...section,
            [key]: (event.target: window.HTMLInputElement).value
          }
        });
      } else {
        this.setState({
          ...this.state,
          [key]: (event.target: window.HTMLInputElement).value
        });
      }
    };
  }

  isSaveButtonDisabled({
    reportPropertyValue,
    statePropertyValue,
    isLoading
  }: any) {
    return isLoading || statePropertyValue === reportPropertyValue;
  }

  renderTextareaSection({
    key,
    stateProperty,
    title,
    subtitle,
    inputKey,
    placeholder,
    optional
  }: any) {
    const { report, isLoading } = this.props;
    const isDisabled = this.isSaveButtonDisabled({
      reportPropertyValue: report[stateProperty],
      statePropertyValue: this.state[stateProperty],
      isLoading
    });
    return (
      <ReportSectionComponent
        data-test-id={key}
        title={title}
        subtitle={subtitle}
        disabled={isDisabled}
        onSave={this.saveReport(stateProperty)}
        optional={optional}
      >
        <OutlinedInput
          data-test-id={inputKey}
          fullWidth={true}
          id="component-outlined"
          placeholder={placeholder}
          value={this.state[stateProperty] || ""}
          multiline
          rows={10}
          rowsMax={100}
          labelWidth={0}
          onChange={this.onSectionInputChange(stateProperty)}
        />
      </ReportSectionComponent>
    );
  }

  activitiesAreEqual(first: KeyActivity[], second: KeyActivity[]): boolean {
    if (first.length !== second.length) {
      return false;
    }
    for (let index = 0; index < first.length; index++) {
      for (let field of [
        "activityName",
        "numberOfParticipants",
        "demographicInfo",
        "impactOutcome"
      ]) {
        if (first[index][field] !== second[index][field]) {
          return false;
        }
      }
    }
    return true;
  }

  renderKeyActivitiesSection() {
    const { report, isLoading } = this.props;
    return (
      <ActivitiesSectionComponent
        activities={this.state.keyActivities}
        disabled={this.activitiesAreEqual(
          this.state.keyActivities,
          report.keyActivities
        )}
        isLoading={isLoading}
        onChange={this.onSectionInputChange("keyActivities")}
        onSave={this.saveReport("keyActivities")}
      />
    );
  }

  render() {
    const { report, classes, account, logout } = this.props;
    if (!report || this.emptyState) {
      return <div data-test-id="loading-placeholder">Loading...</div>;
    }

    if (report.completed) {
      return <Redirect to="/my-reports" />;
    }

    return (
      <Fragment>
        <HeaderComponent logout={logout} account={account} />
        {this.renderToolbar(classes, report)}
        <Grid container spacing={24} className={classes.outerContainer}>
          <Grid container justify="center">
            <Grid item xs={6}>
              {this.renderTextareaSection(sectionConfiguration.grantProgress)}
              {this.renderTextareaSection(
                sectionConfiguration.operatingEnvironment
              )}
              {this.renderKeyActivitiesSection()}
              {this.renderTextareaSection(
                sectionConfiguration.beneficiaryFeedback
              )}
              {this.renderTextareaSection(sectionConfiguration.challengesFaced)}
              {this.renderTextareaSection(sectionConfiguration.incidents)}
              {this.renderTextareaSection(sectionConfiguration.otherIssues)}
              {this.renderTextareaSection(
                sectionConfiguration.materialsForFundraising
              )}
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default withStyles(styles)(MyReportEditComponent);
