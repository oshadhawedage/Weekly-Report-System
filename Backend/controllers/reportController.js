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
        hoursWorked,
        notes
      }
    });

    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: "Error creating report", error });
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
    res.status(500).json({ message: "Error fetching reports", error });
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
    res.status(500).json({ message: "Error fetching report", error });
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

    const updated = await prisma.report.update({
      where: { id },
      data: {
        tasksCompleted,
        tasksPlanned,
        blockers,
        hoursWorked,
        notes
      }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating report", error });
  }
};