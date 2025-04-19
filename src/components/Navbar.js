'use client'

import { usePathname } from 'next/navigation'

import styles from "./Navbar.module.css";
import Link from 'next/link';
import Translates from '@/static/Translates';

const Navbar = () => {

	const pathname = usePathname()
	const linkButton = (text, url, icon) => {
		return (<Link href={`/${url}`} className={`${(url==='' ? pathname==='/' : pathname.startsWith(`/${url}`)) ? styles.active : ""} ${styles.item}`}>
					<div className={styles["content-box"]}>{icon}<span>{text}</span></div>
    			</Link>);
	};

    return (<div className={styles.navbar}>
    	<div className={styles.content}>
    		<div className="flex">
				<Link href="/"  className={styles.head}>Project 2</Link>
				{linkButton(Translates.navbar.home, "", null)}
				{linkButton(Translates.navbar.materials, "materials", null)}
    		</div>
    		<div className="flex">
				<div className="flex items-center">
					<input className={styles.search} type="text" name="" placeholder="поиск" id="navbar-search"/>
				</div>
			</div>
		</div>
    </div>);
};


export default Navbar;