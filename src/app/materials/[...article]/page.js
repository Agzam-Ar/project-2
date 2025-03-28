import ArticleParser from "@/util/ArticleParser";
import Article from "@/components/Article";
 
export async function getStaticPaths() {
    const treeResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/articles/tree.json');
    const tree = await treeResponse.json();
    let articles = [];
    const parsePage = (tree, url=[]) => {
        if(tree.child == undefined) {
            articles.push({article: [...url, tree.url]});
            return;
        }
        for (let child of tree.child) {
            parsePage(child, [...url, tree.url]);
        }
    };
    for (let child of tree) parsePage(child);
    const paths = articles.map((a) => ({
        params: { article: a.article },
    }))
    return { paths, fallback: false }
}
 
export async function _getStaticProps({ params }) {
    const {article} = await params;
    const url = article.join("/");
    const response = await fetch(process.env.URL + `/articles/${url}`);
    const markdown = await response.text();
    const content = await ArticleParser.parse(markdown);
    return { props: { article: content} }
}



export async function generateStaticParams() {
    const staticPaths = await getStaticPaths()
    return staticPaths.paths.map((x) => x.params)
}


export default async function Page({ params }) {
    const { props } = await _getStaticProps({ params });
    // console.log(props.article);
    const { article } = await props;

    console.log(article);
    // const article = await props.article;
    return <Article data={article}/>;
}



// import styles from "./page.module.css";

// import Article from "@/components/Article";
// import ContentTable from "@/components/ContentTable";
// import Vars from '@/util/Vars';
// import ArticleParser from "@/util/ArticleParser";

// function fetchArticle(url, pathname) {
//     return new Promise((resolve) => {
//         fetch(process.env.URL + `/articles${url}`).then(response => {
//             if (!response.ok) {
//                 resolve(null);
//                 return;
//             }
//             response.text().then(text => resolve(ArticleParser.parse(text)));
//         }).catch(error => resolve(url));
//     });
// }

// export default async function Materials({ params }) {
//     const { article } = await params;
//     const url = article.join("/");
//     return (
//         <>
//             <div className={styles["article-box"]}>
//                 {/*{content}*/}
//                 <Article url={url}/>
//             </div>
//         </>
//     );
// }

// export async function generateStaticParams() {
//     const treeResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/articles/tree.json');
//     const tree = await treeResponse.json();
//     let articles = [];
//     const parsePage = (tree, url=[]) => {
//         if(tree.child == undefined) {
//             articles.push({article: [...url, tree.url]});
//             return;
//         }
//         for (let child of tree.child) {
//             parsePage(child, [...url, tree.url]);
//         }
//     };
//     for (let child of tree) parsePage(child);
//     return articles;
// }
