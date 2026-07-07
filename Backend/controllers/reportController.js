import prisma from "../prisma.js";

// CREATE REPORT
export const createReport = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      projectId,
      weekStartDate,
      weekEndDate,
      tasksCompleted,
      tasksPlanned,
      blockers,
      hoursWorked,
      notes
    } = req.body;

    const report = await prisma.report.create({
      data: {
        userId,
        projectId,
        weekStartDate: new Date(weekStartDate),
        weekEndDate: new Date(weekEndDate),
        tasksCompleted,
        tasksPlanned,
        blockers,
        hoursWorked: hoursWorked ? Number(hoursWorked) : null,
        notes
      }
    });

    res.status(201).json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating report", error: error.message });
  }
};
export const getMyReports = async (req, res) => {
  try {
    const userId = req.user.id;

    const reports = await prisma.report.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });

    res.json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching reports", error: error.message });
  }
};

export const getReportById = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const report = await prisma.report.findFirst({
      where: {
        id,
        userId
      }
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching report", error: error.message });
  }
};

export const updateReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const {
      tasksCompleted,
      tasksPlanned,
      blockers,
      hoursWorked,
      notes
    } = req.body;

    const report = await prisma.report.findFirst({
      where: { id, userId }
    });

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    if(report.status === "SUBMITTED"){
      return res.status(400).json({
        message:"Submitted reports cannot be edited"
      });
    }

    const updated = await prisma.report.update({
      where: { id },
      data: {
        tasksCompleted,
        tasksPlanned,
        blockers,
        hoursWorked: hoursWorked ? Number(hoursWorked) : null,
        notes
      }
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating report", error: error.message });
  }
};

export const submitReport = async (req, res) => {

  try {

    const userId = req.user.id;
    const { id } = req.params;


    const report = await prisma.report.findFirst({
      where: {
        id,
        userId
      }
    });


    if (!report) {

      return res.status(404).json({
        message: "Report not found"
      });

    }


    const updatedReport = await prisma.report.update({

      where: {
        id
      },

      data: {
        status: "SUBMITTED"
      }

    });


    res.json(updatedReport);


  } catch(error) {

    console.error(error);

    res.status(500).json({
      message: "Error submitting report",
      error: error.message
    });

  }

};