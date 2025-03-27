import styles from "./page.module.css";
// import React, { Suspense, useState, useEffect } from 'react';

import Article from "@/components/Article";
import ContentTable from "@/components/ContentTable";
import Vars from '@/util/Vars';
import ArticleParser from "@/util/ArticleParser";

// import articlesTree from '@/../../articles/tree.json'

function fetchArticle(url, pathname) {
    return new Promise((resolve) => {
        fetch(process.env.URL + `/articles${url}`).then(response => {
            if (!response.ok) {
                resolve(null);
                return;
            }
            response.text().then(text => resolve(ArticleParser.parse(text)));
        }).catch(error => resolve(url));
    });
}

export default async function Materials({ params }) {
    const { article } = await params;
    const url = article.join("/");
    const response = await fetch(process.env.URL + `/articles/${url}`);
    const markdown = await response.text();
    const content = await ArticleParser.parse(markdown, url);
    return (
        <>
            <div className={styles["article-box"]}>
                {/*{content}*/}
                <Article markdown={markdown} url={url}/>
            </div>
        </>
    );
}
// export default function Materials({ content }) {
//     return (
//         <>
//             <div className={styles["article-box"]}>
//                 {content}
//             </div>
//         </>
//     );
// }


export async function generateStaticParams() {
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
    return articles;
}

// export async function getStaticProps({ params }) {
//     const { article } = await params;
//     const url = article.join("/");
//     const response = await fetch(process.env.URL + `/articles/${url}`);
//     const markdown = await response.text();
//     const content = await ArticleParser.parse(markdown, url);
//     return {
//         props: {
//           content,
//         },
//     };
// }