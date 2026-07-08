import prisma from "../prisma.js";
import { askGemini } from "../services/aiService.js";


export const chatWithAI = async (req, res) => {

    try {

        const { message } = req.body;


        if (!message) {

            return res.status(400).json({
                message: "Message is required"
            });

        }


        const reports = await prisma.report.findMany({

            include: {

                user: {
                    select:{
                        name:true
                    }
                },


                project:true

            },

            orderBy:{
                createdAt:"desc"
            },

            take:50

        });



        const reportContext = reports.map(report => ({

            member: report.user.name,

            project: report.project.name,

            status: report.status,

            hours: report.hoursWorked,

            completed: report.tasksCompleted,

            planned: report.tasksPlanned,

            blockers: report.blockers

        }));



        const prompt = `

You are an AI assistant for a weekly report management system.

Answer the manager's question using only the report data provided.

Reports:

${JSON.stringify(reportContext, null, 2)}


Manager question:

${message}


Give a clear and concise answer.

`;



        const answer = await askGemini(prompt);



        res.json({

            answer

        });



    } catch(error) {


        console.error(error);


        res.status(500).json({

            message:"AI assistant error",

            error:error.message

        });


    }

};