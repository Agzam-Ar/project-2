import ContentTable from "@/components/ContentTable";
import styles from "./layout.module.css";

export default function Layout({ children }) {
	return (
        <div className={styles.page}>
            <div className={styles["content-table-box"]}>
                <ContentTable url="/articles/tree.json" rootUrl="/materials"/>
            </div>
            <div className={styles["content-box"]}>
                {children}
            </div>
        </div>
	)
}