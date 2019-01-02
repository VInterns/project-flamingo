/**
 * Generate a report for the current period, if required.
 */
const { generateDueDate, generateReportPeriod } = require("./utils");
const dbModule = require("../server/db");

module.exports = async dbUrl => {
  let insertedDocumentCount = 0;
  const reportPeriod = generateReportPeriod(new Date());

  const db = await dbModule.connect(dbUrl);
  const reports = await db
    .collection("reports")
    .find({ reportPeriod })
    .toArray();

  if (reports.length === 0) {
    const grants = await db
      .collection("grants")
      .find({ archived: false })
      .toArray();
    const lastReport = await getLastReport(db);
    const newReports = createReports(reportPeriod, lastReport, grants);
    console.log(newReports);
    const { result } = await db.collection("reports").insertMany(newReports);
    insertedDocumentCount = result.n;
  }
  await dbModule.close();
  return insertedDocumentCount;
};

function createReports(reportPeriod, lastReport, grants) {
  const firstId = (lastReport ? lastReport.id : 0) + 1;
  return grants.map((grant, index) =>
    createReport(reportPeriod, firstId + index, grant)
  );
}

function createReport(reportPeriod, id, grant) {
  return {
    overview: "",
    grant: grant.grant,
    completed: false,
    reportPeriod,
    dueDate: generateDueDate(reportPeriod),
    owner: grant.owner,
    id,
    keyActivities: [{}]
  };
}

function getLastReport(db) {
  return db.collection("reports").findOne({}, { sort: { id: -1 } });
}
