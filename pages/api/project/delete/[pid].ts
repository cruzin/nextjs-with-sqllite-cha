import {NextApiRequest, NextApiResponse} from "next";
import AppDAO from "../../../../db/dao";
import ProjectRepository from "../../../../db/project_repository";

type Data = {
    result: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    const { pid } = req.query
    console.log("IN DELETE HANDLER");
    console.log(pid);
    const dao = new AppDAO('C:\\Users\\Kjell\\IdeaProjects\\nextTest\\my-next-test\\db\\database.sqlite3')
    const projectRepo = new ProjectRepository(dao)
    const deleted = projectRepo.delete(pid);

    deleted.then((result: any)=>{
        res.status(200).json({ result: result })
    })
}
