'use client'

import React, { useState, useEffect, use, Suspense } from 'react';
import { usePathname } from 'next/navigation'

import Link from 'next/link';

import styles from "./ContentTable.module.css";

import Filter from '@/components/Filter';
import Icons from '@/static/Icons';
import Filters from '@/static/Filters';
import Prefs from '@/util/Prefs';
import { usePrefs } from '@/hooks/usePrefs';

export default function ContentTable({onSelect, url, rootUrl}) {
    const filterButton = (text, icon, values=[{text: "Unset"}], marks, onClick=()=>{}) => {
        const [open, setOpen] = React.useState(false);
    
        const check = (filter, index) => (filter & (1 << index)) != 0;
        const applyFilter = (filter, index) => (filter | (1 << index));
        const invert = (filter, index) => (filter ^ (1 << index));

        return (<div className={styles["filter-container"]}>
            <div className={`${styles["filter-box"]} ${styles[open ? "active":"unactive"]}`} onClick={() => setOpen(open => !open)}>
                <div>
                    <div className={styles["filter-icon"]}>{icon}</div>
                    <div className={styles["filter-content"]}>
                        <div className={styles["filter-title"]}>{text}</div>
                    </div>
                </div>
                <div className={styles["filter-dropdown"]}>{Icons.dropdown}</div>
            </div>
            
            <div className={`${styles["filter-dropdown-body"]} ${styles[open ? "visible":"hidden"]}`}>
            {
                values.map((value, i) => (
                <div key={i} className={`${styles["filter-dropdown-item-box"]}`} onClick={() => {
                        setOpen(open => !open);
                        onClick(invert(marks, i))
                    }}>
                    <div>
                        <div style={value.color == undefined ? {} : {
                            color: value.color[0],
                            background: value.color[1],
                            borderColor: value.color[0],
                        }} className={styles["filter-dropdown-item-icon"]}>{icon}</div>
                        <div className={styles["filter-content"]}>
                            {value.text}
                        </div>
                    </div>
                    <div className={styles["filter-checkmark"]}>{check(marks, i) ? Icons.checkmark : undefined}</div>
                </div>))
            }
            </div>
        </div>);
    };

    // Filter for content table with using bit masking
    const [timeFilter, setTimeFilter] = usePrefs('filter-duration', 0b000);
    const [difficultyFilter, setDifficultyFilter] = usePrefs('filter-difficulty', 0b000);
    const [priorityFilter, setPriorityFilter] = usePrefs('filter-priority', 0b000);
    
    // Fetching tree (JSON) of content
    const [contentTablePromise, setContentTablePromise] = useState(null);
    useEffect(() => {
       const loadContentTablePromise = async () => {
            console.log('env', process.env.URL);
            console.log('url', url);
            const result = await fetch(process.env.URL + url); // TODO
            const data = await result.json();
            return data;
       };
       const promise = loadContentTablePromise();
       setContentTablePromise(promise);
    }, [])

    return (
        <div className={styles["content-table-box"]}>
            <div className={styles["filters-box"]}>
                <Filter filter={Filters.priorities}   marks={priorityFilter}   setMarks={setPriorityFilter}/>
                <Filter filter={Filters.durations}    marks={timeFilter}       setMarks={setTimeFilter}/>
                <Filter filter={Filters.difficulties} marks={difficultyFilter} setMarks={setDifficultyFilter}/>
            </div>
            <div className={styles["content-table-list"]}>
                <Suspense fallback={<div>Waiting for message...</div>}>
                    <ContentTableHolder filters={{
                        duration: timeFilter,
                        difficulty: difficultyFilter,
                        priority: priorityFilter,
                    }} contentTablePromise={contentTablePromise} onSelect={onSelect} rootUrl={rootUrl} />
                </Suspense>
            </div>
        </div>
    );
}

function ContentTableHolder({contentTablePromise, onSelect, rootUrl, filters}) {
    if(!contentTablePromise) return null;
    const pathname = usePathname();

    const createContentTable = (content, url="/") => {
        if(content == undefined) return {elements: undefined, visible: 0};

        let elements = []; // Group elements (including other groups)
        let visibleCount = 0; // Amount of visible by filter elements to detect target visibility of parent 
        for (let i = 0; i < content.length; i++) {
            let c = content[i];
            const curl = url + c.url;

            const check = (filter, index) => (filter & (1 << index)) != 0;

            const difficulty = c.difficulty == undefined ? "easy" : c.difficulty;
            const duration = c.duration == undefined ? "short" : c.duration;
            const priority = c.priority == undefined ? "base" : c.priority;

            let visible = true;
            if(filters.duration != 0 && !check(filters.duration, Filters.durations[duration].id)) visible = false;
            if(filters.difficulty != 0 && !check(filters.difficulty, Filters.difficulties[difficulty].id)) visible = false;
            if(filters.priority != 0 && !check(filters.priority, Filters.priorities[priority].id)) visible = false;

            if(c.child == undefined) {
                // Element
                elements.push(<ContentTableElement key={i} c={c} tags={{
                    difficulty: difficulty,
                    duration: duration,
                    priority: priority,
                }}
                    pathname={pathname}
                    rootUrl={rootUrl}
                    curl={curl}
                    visible={visible}
                />);
                visibleCount += visible;
                continue;
            }
            // Element group

            const [open, setOpen] = React.useState(false);

            const contentTable = createContentTable(c.child, curl + "/");
            visible = true;
            if(contentTable.visible == 0) visible = false;
            visibleCount += visible;
            elements.push(
                <div key={url + c.url} className={`${styles["content-table-group-box"]} ${styles[visible ? `ctg-visible` : `ctg-hidden`]}`}>
                    <div className={styles["content-table-group-title-box"]} onClick={() => setOpen(o => !o)}>
                        <div className={`${styles["content-table-group-title-icon"]} ${styles[open ? "expanded" : ""]}`}>{Icons.expand}</div>
                        {c.title}
                    </div>
                    <div key={url + c.url} className={`${styles["content-table-group"]} ${styles[open ? "visible" : "hidden"]}`}>
                        {contentTable.elements}
                    </div>
                </div>
            );
        }
        return {
            elements: elements,
            visible: visibleCount,
        };
    };
    const contentTable = use(contentTablePromise);
    return <div>{createContentTable(contentTable).elements}</div>;
}

function ContentTableElement({c, tags, pathname, rootUrl, curl, visible}) {
    const [completed, setCompleted] = useState(false);
    useEffect(() => {
        setCompleted(c => Prefs.get(`test-${curl}`, c));
    }, []);
    return (
    <Link className={`${styles["content-table-element"]} ${styles[`cte-difficulty-${tags.difficulty}`]} ${styles[pathname == `${rootUrl + curl}` ? "cte-active" : (visible ? `cte-visible` : `cte-hidden`)]}${completed ? " "+styles["completed"] : ""}`} href={rootUrl + curl}>
        <div className={styles["content-table-element-text"]}>{c.title}</div>{completed ? Icons.checkmark : null}
        <div className={styles["filter-tag-prop-box"]}>
            <div className={styles["filter-tag-prop"]} style={{color: Filters.difficulties[tags.difficulty].colors[0]}}>{Icons.difficulty}<label>{Filters.difficulties[tags.difficulty].desc}</label></div>
            <div className={styles["filter-tag-prop"]} style={{color: Filters.durations[tags.duration].colors[0]}}>{Icons.time}<label>{Filters.durations[tags.duration].desc}</label></div>
            <div className={styles["filter-tag-prop"]} style={{color: Filters.priorities[tags.priority].colors[0]}}>{Icons.priority}<label>{Filters.priorities[tags.priority].desc}</label></div>
        </div>
    </Link>);
}