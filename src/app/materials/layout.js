
import ContentTable from "@/components/ContentTable";
import styles from "./layout.module.css";

export default function Layout({ children }) {
	return (
        <div className={styles.page}>
            <ContentTable url="/articles/tree.json" rootUrl="/materials"/>
            <div className={styles["content-box"]}>
                {children}
            </div>
        </div>
	)
}