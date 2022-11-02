import {useRouter} from 'next/router'
import {useEffect, useState} from "react";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";

function deleteProject(pid : string){
    const res = fetch("/api/project/delete/"+ pid).then(response => response.json()).then((r) => {
        console.log(r);
    });
    console.log(res);

};


function ProjectCard(props: { project: any }) {

    return <a href={"/project/" + props.project.id} className={styles.card}>
        <h2>{"Project: " + props.project.name}</h2>
        <span className={styles.cardDelBtn} onClick={(e)=> {
            e.preventDefault();
            deleteProject(props.project.id);
        }}> X </span>
    </a>;
}



const Project = () => {
    const router = useRouter()
    const {pid} = router.query

    const [projects, setProjects] = useState<any>(undefined);

    useEffect(() => {
        if (projects === undefined) {
            const res = fetch("/api/allprojects").then(response => response.json()).then((r) => {
                console.log(r);
                setProjects(r.result)
            });
            console.log(res);
        }
    }, []);

    return <div className={styles.container}>
        <Head>
            <title>All projects</title>
            <meta name="description" content="Generated by create next app"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
            <h1 className={styles.title}>
                All projects
            </h1>

            <div className={styles.grid}>
                {projects !== undefined && projects.map((project: any) => {
                    return <ProjectCard key={project.id} project={project}/>
                })}
            </div>
        </main>
    </div>
}

export default Project



