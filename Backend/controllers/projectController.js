import prisma from "../prisma.js";

// CREATE PROJECT
export const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;

    const project = await prisma.project.create({
      data: {
        name,
        description
      }
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Error creating project", error });
  }
};

// GET ALL PROJECTS
export const getProjects = async (req, res) => {
  try {

    const projects = await prisma.project.findMany({

      include: {

        users: {

          include: {

            user: {

              select: {

                id: true,
                name: true,
                email: true

              }

            }

          }

        }

      },

      orderBy: {
        createdAt: "desc"
      }

    });


    res.json(projects);


  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error fetching projects",
      error
    });

  }
};

// UPDATE PROJECT
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const project = await prisma.project.update({
      where: { id },
      data: {
        name,
        description
      }
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: "Error updating project", error });
  }
};

// DELETE PROJECT
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.$transaction([
      prisma.report.deleteMany({
        where: { projectId: id }
      }),
      prisma.userProject.deleteMany({
        where: { projectId: id }
      }),
      prisma.project.delete({
        where: { id }
      })
    ]);

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting project", error });
  }
};

// GET ALL MEMBERS
export const getMembers = async (req,res)=>{

    try{

        const users = await prisma.user.findMany({

            where:{
                role:"MEMBER"
            },

            select:{
                id:true,
                name:true,
                email:true
            }

        });


        res.json(users);


    }catch(error){

        res.status(500).json({
            message:"Error fetching members",
            error
        });

    }

};

// ASSIGN USERS TO PROJECT
export const assignUsersToProject = async (req, res) => {

    try {

        const { id } = req.params;

        const { userIds } = req.body;


        // Remove old assignments
        await prisma.userProject.deleteMany({

            where:{
                projectId:id
            }

        });



        // Create new assignments
        const assignments = userIds.map((userId)=>({

            userId,

            projectId:id

        }));


        if(assignments.length > 0){

            await prisma.userProject.createMany({

                data: assignments

            });

        }


        res.json({

            message:"Project members updated successfully"

        });


    } catch(error){

        console.error(error);

        res.status(500).json({

            message:"Error updating project members",

            error

        });

    }

};

export const getMyProjects = async (req,res)=>{

    try{

        const userId = req.user.id;


        const projects = await prisma.project.findMany({

            where:{

                users:{

                    some:{

                        userId

                    }

                }

            },

            orderBy:{

                createdAt:"desc"

            }

        });


        res.json(projects);


    }catch(error){

        console.error(error);

        res.status(500).json({

            message:"Error fetching user projects",

            error

        });

    }

};