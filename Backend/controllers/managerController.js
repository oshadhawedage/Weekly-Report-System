import prisma from "../prisma.js";

export const getAllReports = async (req, res) => {
  try {
    const reports = await prisma.report.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        project: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports", error });
  }
};


export const getReportsByFilters = async (req, res) => {
  try {
    const { userId, projectId, startDate, endDate } = req.query;

    const filters = {};

    if (userId) filters.userId = userId;
    if (projectId) filters.projectId = projectId;

    if (startDate && endDate) {
      filters.weekStartDate = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const reports = await prisma.report.findMany({
      where: filters,
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        },
        project: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error filtering reports", error });
  }
};