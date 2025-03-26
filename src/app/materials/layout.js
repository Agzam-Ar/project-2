
import styles from "./layout.module.css";

export default function Layout({ children }) {
	return (
        <div className={styles.page}>
            <div className={styles["content-box"]}>
                {children}
            </div>
        </div>
	)
}