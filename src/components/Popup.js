
'use client'

import styles from './Popup.module.css';



export default function Popup({children, visible, onHide}) {
	return <>
		<div className={`${styles.locker} ${visible ? styles.visible : styles.hide}`} onClick={() => onHide()}></div>
		<div className={`${styles.box} ${visible ? styles.visible : styles.hide}`}>
			{children}
		</div>
	</>;
}