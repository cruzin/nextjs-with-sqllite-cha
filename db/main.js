const Promise = require('bluebird')
const AppDAO = require('./dao')
const ProjectRepository = require('./project_repository')
const TaskRepository = require('./task_repository');

function main() {
    const dao = new AppDAO('./database.sqlite3')
    const proj1 = { name: 'NextJS with sqllite' }
    const proj2 = { name: 'A mystery project' }
    const projectRepo = new ProjectRepository(dao)
    const taskRepo = new TaskRepository(dao)
    let projectId

    projectRepo.createTable()
        .then(() => taskRepo.createTable())
        .then(() => projectRepo.create(proj1.name))
        .then(() => projectRepo.create(proj2.name))
        .then((data) => {
            projectId = data.id
            const tasks = [
                {
                    name: 'Outline',
                    description: 'Get a high level overview',
                    isComplete: 1,
                    projectId
                },
                {
                    name: 'Write',
                    description: 'Write some code',
                    isComplete: 0,
                    projectId
                }
            ]
            return Promise.all(tasks.map((task) => {
                const { name, description, isComplete, projectId } = task
                return taskRepo.create(name, description, isComplete, projectId)
            }))
        })
        .then(() => projectRepo.getById(projectId))
        .then((project) => {
            console.log(`\nRetreived project from database`)
            console.log(`project id = ${project.id}`)
            console.log(`project name = ${project.name}`)
            return taskRepo.getTasks(project.id)
        })
        .then((tasks) => {
            console.log('\nRetrieved project tasks from database')
            return new Promise((resolve, reject) => {
                tasks.forEach((task) => {
                    console.log(`task id = ${task.id}`)
                    console.log(`task name = ${task.name}`)
                    console.log(`task description = ${task.description}`)
                    console.log(`task isComplete = ${task.isComplete}`)
                    console.log(`task projectId = ${task.projectId}`)
                })
            })
            resolve('success')
        })
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        })
}

main()
