'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { Suspense, use, useEffect, useState } from "react";

import Translates from "@/static/Translates";
import Vars from "@/util/Vars";
import Prefs from "@/util/Prefs";
import AnimatedNumber from "@/components/text/AnimatedNumber";
import ProgressBar from "@/components/ProgressBar";
import Filters from "@/static/Filters";
import Icons from "@/static/Icons";
import Link from "next/link";
import Timer from "@/components/text/Timer";

export default function Home() {

    // Fetching tree (JSON) of content
    const [contentTablePromise, setContentTablePromise] = useState(null);
    useEffect(() => {
       const loadContentTablePromise = async () => {
            const result = await fetch(Vars.env.url + '/articles/tree.json');
            const data = await result.json();
            return data;
       };
       const promise = loadContentTablePromise();
       setContentTablePromise(promise);
    }, [])

    return (
    
    <div className={styles.page}>
        <main className={styles.main}>
            <Suspense fallback={<>
                    <h1>{Translates.stats.progress}</h1>
                    <ProgressBar value={0} maxValue={0}/>
                    <div className={styles['completed-box']}></div>
                    <h1>{Translates.stats.suggest}</h1>
                    <div className={`${styles['grid-2x']} ${styles['articles-grid']}`}>
                    {
                    }
                    </div>
                </>
            }>
                <HomeHolder contentTablePromise={contentTablePromise}/>
            </Suspense>
        </main>
    </div>
  );
}


function HomeHolder({contentTablePromise}) {
    if(!contentTablePromise) return null;
    const contentTable = use(contentTablePromise);

    const urls = [];

    let completedAmount = 0;

    const loadUrls = (content=contentTable, url="/") => {
        if(content == undefined) return;
        for (let i = 0; i < content.length; i++) {
            let c = content[i];
            const curl = url + c.url;
            if(c.child == undefined) {
                // Element
                let completed = !!Prefs.get(`test-${curl}`, false);
                completedAmount += completed;
                // if(completed) console.log('completed', curl, completed);//Prefs.get(`test-${curl}`, false));
                urls.push({
                    title: c.title,
                    url: curl,
                    completed: completed,
                    priority: c.priority == undefined ? Filters.priorities.values[0].tag : c.priority,
                    duration: c.duration == undefined ? Filters.durations.values[0].tag : c.duration,
                    difficulty: c.difficulty == undefined ? Filters.difficulties.values[0].tag : c.difficulty,
                });
                continue;
            }
            // Element group
            loadUrls(c.child, curl + "/");
        }
    };
    loadUrls();

    // useEffect(() => {
    //     // setCompleted(c => Prefs.get(`test-${curl}`, c));
    //     for (let i = 0; i < urls.length; i++) {
    //         urls[i];
    //     }
    // }, []);

    console.log(contentTable);


    const sortedUrls = [...urls].filter((e) => !e.completed);

    sortedUrls.sort((a,b) => {
        let aPriority = Filters.priorities[a.priority];
        let bPriority = Filters.priorities[b.priority];
        aPriority = aPriority == undefined ? 0 : aPriority.id;
        bPriority = bPriority == undefined ? 0 : bPriority.id;
        if(aPriority != bPriority) return aPriority - bPriority;

        // if time more than we has sort by "difficulty" but else sort by "duractions" and then by "difficulty"

        let aDuration = Filters.durations[a.duration];
        let bDuration = Filters.durations[b.duration];
        aDuration = aDuration == undefined ? 0 : aDuration.id;
        bDuration = bDuration == undefined ? 0 : bDuration.id;

        return aDuration > bDuration ? 1 : -1;
    });


    return <>
        <h1>{Translates.stats.progress}</h1>
        <ProgressBar value={completedAmount} maxValue={urls.length}/>
        <div className={styles['completed-box']}>
            {/*{urls.map((e,i) => <div key={i} style={{color: e.completed ? "#0f0" : "#f00"}}>{e.title + "\n"}</div>)}*/}
        </div>
       {/* <div className={styles['grid-3x']}>
        <ProgressBar value={completedAmount} maxValue={urls.length}/>
        <ProgressBar value={completedAmount} maxValue={urls.length}/>
        <ProgressBar value={completedAmount} maxValue={urls.length}/>
        </div>*/}
        {Translates.stats.availableTime}:<Timer targetDate={Prefs.get('deadline', new Date().getTime() + 12000*10_000)} timeout={1000}/>

        <h1>{Translates.stats.suggest}</h1>
        <div className={`${styles['grid-2x']} ${styles['articles-grid']}`}>
        {
            sortedUrls.map((e,i) => 
            <Link href={`/materials${e.url}`} key={i} className={styles["article-box"]} style={{animationDelay: `${i/urls.length}s`}}>
                <h2>{e.title}</h2>
                <div className={styles["filter-tag-prop-box"]}>
                    <div className={styles["tag-prop"]} style={{color: Filters.difficulties[e.difficulty].colors[0]}}>{Icons.difficulty}<label>{Filters.difficulties[e.difficulty].desc}</label></div>
                    <div className={styles["tag-prop"]} style={{color: Filters.durations[e.duration].colors[0]}}>{Icons.time}<label>{Filters.durations[e.duration].desc}</label></div>
                    <div className={styles["tag-prop"]} style={{color: Filters.priorities[e.priority].colors[0]}}>{Icons.priority}<label>{Filters.priorities[e.priority].desc}</label></div>
                </div>
            </Link>)
        }
        </div>
    </>
}