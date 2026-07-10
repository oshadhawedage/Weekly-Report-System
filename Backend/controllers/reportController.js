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

    if (!projectId || !projectId.trim()) {
      return res.status(400).json({ message: "Project selection is required" });
    }

    if (!weekStartDate || !weekStartDate.trim()) {
      return res.status(400).json({ message: "Week start date is required" });
    }

    if (!weekEndDate || !weekEndDate.trim()) {
      return res.status(400).json({ message: "Week end date is required" });
    }

    if (!tasksCompleted || !tasksCompleted.trim()) {
      return res.status(400).json({ message: "Completed tasks are required" });
    }

    if (!tasksPlanned || !tasksPlanned.trim()) {
      return res.status(400).json({ message: "Planned tasks are required" });
    }

    const parsedStart = new Date(weekStartDate);
    const parsedEnd = new Date(weekEndDate);

    if (Number.isNaN(parsedStart.getTime()) || Number.isNaN(parsedEnd.getTime())) {
      return res.status(400).json({ message: "Invalid week dates provided" });
    }

    if (parsedEnd < parsedStart) {
      return res.status(400).json({ message: "Week end date cannot come before the start date" });
    }

    const parsedHours = Number(hoursWorked);
    if (hoursWorked === undefined || hoursWorked === null || hoursWorked === "" || Number.isNaN(parsedHours)) {
      return res.status(400).json({ message: "Hours worked is required and must be a number" });
    }

    if (parsedHours < 0) {
      return res.status(400).json({ message: "Hours worked cannot be negative" });
    }

    const report = await prisma.report.create({
      data: {
        userId,
        projectId,
        weekStartDate: parsedStart,
        weekEndDate: parsedEnd,
        tasksCompleted,
        tasksPlanned,
        blockers,
        hoursWorked: parsedHours,
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

      where: {
        userId
      },

      include:{
        project:{
          select:{
            name:true
          }
        }
      },

      orderBy:{
        createdAt:"desc"
      }

    });


    res.json(reports);


  } catch(error){

    console.error(error);

    res.status(500).json({
      message:"Error fetching reports",
      error:error.message
    });

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