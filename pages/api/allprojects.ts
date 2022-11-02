import type { NextApiRequest, NextApiResponse } from 'next'
const Promise = require('bluebird')
const AppDAO = require('../../db/dao')
const ProjectRepository = require('../../db/project_repository')
const TaskRepository = require('../../db/task_repository');
let path = require("path");

type Data = {
    result: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // let absolutePath = path.resolve("../../db/database.sqlite3");
    // const pNormed = absolutePath.split("\\").join("\\\\")
    // const dao = new AppDAO(pNormed)
    const dao = new AppDAO('C:\\Users\\Kjell\\IdeaProjects\\nextTest\\my-next-test\\db\\database.sqlite3')
    const projectRepo = new ProjectRepository(dao)
    const all = projectRepo.getAll();

    all.then((result: any)=>{
        res.status(200).json({ result: result })
    })
}
