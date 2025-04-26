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
import Popup from "@/components/Popup";

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

    const clampTime = time => {
        const dt = 1000*60*60*24*500;
        console.log('clampTime', 999);
        const now = new Date().getTime();
        time = Math.min(time, now + dt);
        time = Math.max(time, now);
        console.log(time);
        return time;
    };

    const [datePopup, setDatePopup] = useState(false);
    const [targetDate, setTargetDate] = useState(Prefs.get('deadline', new Date().getTime()));
    const value = new Date(clampTime(targetDate)).toISOString().split('T')[0];

    const sortedUrls = [...urls].filter((e) => !e.completed);

    const isEnoughTime = new Date().getTime() + 12*60_000*sortedUrls.reduce((a, value) => a + Filters.durations[value.duration].max, 0) <= targetDate;

    sortedUrls.sort((a,b) => {
        let aPriority = Filters.priorities[a.priority];
        let bPriority = Filters.priorities[b.priority];
        aPriority = aPriority == undefined ? 0 : aPriority.id;
        bPriority = bPriority == undefined ? 0 : bPriority.id;
        if(aPriority != bPriority) return aPriority - bPriority;

        if(isEnoughTime) {
            let aDuration = Filters.durations[a.duration];
            let bDuration = Filters.durations[b.duration];
            aDuration = aDuration == undefined ? 0 : aDuration.id;
            bDuration = bDuration == undefined ? 0 : bDuration.id;
            if(aDuration != bDuration) return aDuration - bDuration;

            let aPriority = Filters.priorities[a.priority];
            let bPriority = Filters.priorities[b.priority];
            aPriority = aPriority == undefined ? 0 : aPriority.id;
            bPriority = bPriority == undefined ? 0 : bPriority.id;
            return aPriority - bPriority;
        }
        let aDuration = Filters.durations[a.duration];
        let bDuration = Filters.durations[b.duration];
        aDuration = aDuration == undefined ? 0 : aDuration.id;
        bDuration = bDuration == undefined ? 0 : bDuration.id;
        return aDuration - bDuration;
    });

    return <>
        <h1>{Translates.stats.progress}</h1>
        <ProgressBar value={completedAmount} maxValue={urls.length}/>
        <h2 className={styles['available-time-header']}>{Translates.stats.availableTime}<div className={styles['edit-icon']} onClick={() => {
            setDatePopup(v => !v);
        }}>{Icons.edit}</div></h2>
        <div className={styles['timer-box']}>
            <Timer targetDate={targetDate} timeout={1000}/>
        </div>
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
        <Popup visible={datePopup} onHide={() => setDatePopup(false)}>
            <h1>{Translates.prefs.selectDeadline}</h1>
            <input type="date" className={styles["date-input"]} value={value} onChange={e => {
                let time = clampTime(e.target.valueAsNumber);
                Prefs.set('deadline', time);
                setTargetDate(Prefs.get('deadline', new Date().getTime()));
            }}/>
        </Popup>

        </div>
    </>
}