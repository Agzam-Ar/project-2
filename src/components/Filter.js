'use client'

import { useState } from 'react';

import styles from "./Filter.module.css";
import Icons from '@/static/Icons';

export default function Filter({filter, marks, setMarks}) {
    const [open, setOpen] = useState(false);
    const check = (f,i) => (f & (1 << i)) != 0;
    const invert = (f,i) => (f ^ (1 << i));
    if(filter.values == undefined) return <div>Filter values is undefined</div>;
    return (<div className={styles["container"]}>
        <div className={`${styles["box"]} ${styles[open ? "active":"unactive"]}`} onClick={() => setOpen(open => !open)}>
            <div className="flex">
                <div className={styles["icon"]}>{filter.icon}</div>
                <div className={styles["content"]}>
                    <div className={styles["title"]}>{filter.name}</div>
                </div>
            </div>
            <div className={styles["dropdown-icon"]}>{Icons.dropdown}</div>
        </div>

        <div className={`${styles["dropdown-body"]} ${styles[open ? "visible":"hidden"]}`}>
        {
            filter.values.map((value, i) => (
            <div key={i} className={`${styles["item-box"]}`} onClick={() => {
                setOpen(open => !open);
                setMarks(marks => invert(marks, i));
            }}>
            <div className="flex">
                <div style={value.colors == undefined ? {} : {
                    color: value.colors[0],
                    background: value.colors[1],
                    borderColor: value.colors[0],
                }} className={styles["icon"]}>
                    {filter.icon}
                </div>
                <div className="flex items-center">{value.name}</div>
            </div>
            <div className={styles["checkmark"]}>{check(marks, i) ? Icons.checkmark : undefined}</div>
            </div>))
        }
        </div>
    </div>);
};