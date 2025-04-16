'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { Suspense, use, useEffect, useState } from "react";

import Translates from "@/static/Translates";
import Vars from "@/util/Vars";
import Prefs from "@/util/Prefs";
import AnimatedNumber from "@/components/text/AnimatedNumber";
import ProgressBar from "@/components/ProgressBar";

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
            Home
            <Suspense fallback={<div>Loading</div>}>
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
                    completed: completed
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


    return <>
        {/*<h1>{Translates.stats.progress}</h1>*/}
        {/*<div className={styles['progress-bar-box']}>
            <div className={styles['progress-bar-fill']} style={{
                maxWidth: `${completedAmount*100/urls.length}%`,
                animationDuration: `${Math.log10(Math.max(Math.round(completedAmount*100/urls.length), completedAmount)+1) + .5}s`,
            }}
            ></div>
            <AnimatedNumber startValue={0} targetValue={completedAmount}/>/{urls.length} (<AnimatedNumber startValue={0} targetValue={Math.round(completedAmount*100/urls.length)}/>%)
        </div>*/}
        <ProgressBar value={completedAmount} maxValue={urls.length}/>
        <div className={styles['completed-box']}>
            {/*{urls.map((e,i) => <div key={i} style={{color: e.completed ? "#0f0" : "#f00"}}>{e.title + "\n"}</div>)}*/}
        </div>
    </>
}