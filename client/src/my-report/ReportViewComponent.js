import React from "react";
import { Grid, Paper, Typography, withStyles } from "@material-ui/core";

import { type Report } from "./models";

const styles = themes => ({
  image: {
    width: "120px",
    height: "120px",
    borderRadius: "5px",
    margin: "24px"
  },
  definitionListTitle: {
    fontSize: "10px",
    letterSpacing: "1.5px",
    color: "#757c80",
    textTransform: "uppercase",
    marginBottom: "8px",
    borderTop: "solid 1px #e5e5e5",
    paddingTop: "16px"
  },
  definitionListItem: {
    lineHeight: "1.43",
    margin: "0 0 24px"
  },
  activityName: {
    fontWeight: "600",
    fontSize: "20px",
    color: "#393e40"
  },
  pagePaper: {
    paddingTop: themes.spacing.unit * 3,
    paddingBottom: themes.spacing.unit * 3,
    paddingLeft: themes.spacing.unit * 4,
    paddingRight: themes.spacing.unit * 4,
    boxShadow: "none",
    marginBottom: themes.spacing.unit * 3
  },
  outerContainer: {
    height: "100vh",
    marginTop: themes.spacing.unit * 5,
    width: "100%"
  },
  rule: {
    marginTop: themes.spacing.unit * 2,
    borderTop: "solid 1px #e5e5e5",
    borderBottom: "none",
    borderLeft: "none",
    borderRight: "none",
    height: "1px",
    position: "relative",
    left: "-32px",
    width: "calc(100% + 2 * 32px)"
  },
  progress: {
    margin: "4px",
    fontSize: "14px",
    color: "#404040",
    letterSpacing: "0.3px"
  }
});

export class ReportViewComponent extends React.PureComponent<{
  report: $Shape<Report>,
  classes: any
}> {
  formatParagraph(content?: string): ?any {
    return (content || "").split("\n").map((item, index) => (
      <span key={index}>
        {item}
        <br />
      </span>
    ));
  }

  renderKeyActivities() {
    const { classes, report } = this.props;
    return (
      <Paper
        justify="center"
        className={classes.pagePaper}
        data-test-id="grant-key-activities"
      >
        <Grid container direction="column" spacing={32}>
          <Grid item>
            <Typography variant="h4" data-test-id="report-section-title">
              Key activities & impact
            </Typography>
            <hr className={classes.rule} />
          </Grid>
          {report.keyActivities.map((activity, index) => (
            <Grid item key={index}>
              <Typography
                data-test-id="report-key-activity-name"
                className={classes.activityName}
              >
                {activity.activityName || ""}
              </Typography>
              <dl>
                <dt className={classes.definitionListTitle}>
                  Average number of participants
                </dt>
                <dd
                  data-test-id="report-number-of-participants"
                  className={classes.definitionListItem}
                >
                  {activity.numberOfParticipants || ""}
                </dd>
                <dt className={classes.definitionListTitle}>
                  Demographic information
                </dt>
                <dd
                  data-test-id="report-demographic-info"
                  className={classes.definitionListItem}
                >
                  {activity.demographicInfo || ""}
                </dd>
                <dt className={classes.definitionListTitle}>
                  Positive impacts and outcome
                </dt>
                <dd
                  data-test-id="report-impact-outcome"
                  className={classes.definitionListItem}
                >
                  {this.formatParagraph(activity.impactOutcome || "")}
                </dd>
              </dl>
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
  }

  renderTextSection({ titleKey, title, valueKey, value }: any) {
    const { classes } = this.props;
    return (
      <Paper
        justify="center"
        className={classes.pagePaper}
        data-test-id={titleKey}
      >
        <Grid container direction="column" spacing={32}>
          <Grid item>
            <Typography variant="h4" data-test-id="report-section-title">
              {title}
            </Typography>
            <hr className={classes.rule} />
          </Grid>
          <Grid item>
            <Typography data-test-id={valueKey} className={classes.progress}>
              {this.formatParagraph(value)}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  render() {
    const { classes, report } = this.props;
    const grantProgressSection = {
      titleKey: "grant-progress",
      title: "Grant overview",
      valueKey: "report-progress",
      value: report.overview
    };
    const operatingEnvironmentSection = {
      titleKey: "operating-environment",
      title: "Operating environment",
      valueKey: "report-operating-environment",
      value: report.operatingEnvironment
    };
    const beneficiaryFeedbackSection = {
      titleKey: "beneficiary-feedback",
      title: "Beneficiary feedback",
      valueKey: "report-beneficiary-feedback",
      value: report.beneficiaryFeedback
    };
    const challengesFacedSection = {
      titleKey: "challenges-faced",
      title: "Challenges faced and lessons learned",
      valueKey: "report-challenges-faced",
      value: report.challengesFaced
    };
    const incidentsSection = {
      titleKey: "incidents",
      title: "Incidents and near misses",
      valueKey: "report-incidents",
      value: report.incidents
    };
    const otherIssuesSection = {
      titleKey: "other-issues",
      title:
        "Is there anything you would like to use our platform to speak about?",
      valueKey: "report-other-issues",
      value: report.otherIssues
    };
    const materialsForFundraisingSection = {
      titleKey: "materials-for-fundraising",
      title: "Materials for fundraising",
      valueKey: "report-materials-for-fundraising",
      value: report.materialsForFundraising
    };
    return (
      <Grid
        container
        spacing={24}
        direction="column"
        className={classes.outerContainer}
      >
        <Grid container justify="center">
          <Grid item xs={6}>
            {this.renderTextSection(grantProgressSection)}
            {this.renderTextSection(operatingEnvironmentSection)}
            {this.renderKeyActivities()}
            {this.renderTextSection(beneficiaryFeedbackSection)}
            {this.renderTextSection(challengesFacedSection)}
            {this.renderTextSection(incidentsSection)}
            {this.renderTextSection(otherIssuesSection)}
            {this.renderTextSection(materialsForFundraisingSection)}
            <Paper
              justify="center"
              className={classes.pagePaper}
              data-test-id={"attachments"}
            >
              <Grid container direction="column" spacing={32}>
                <Grid item>
                  <Typography variant="h4" data-test-id="report-section-title">
                    {"Attached files"}
                  </Typography>
                  <hr className={classes.rule} />
                </Grid>
                <Grid item>
                  {report.attachments.map((attachment, key) => {
                    return (
                      <img
                        alt={`${attachment.fileName}`}
                        className={classes.image}
                        key={key}
                        src={`${attachment.dataURL}`}
                      />
                    );
                  })}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ReportViewComponent);
