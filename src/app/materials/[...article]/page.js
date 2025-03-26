import styles from "./page.module.css";
// import React, { Suspense, useState, useEffect } from 'react';

import Article from "@/components/Article";
import ContentTable from "@/components/ContentTable";

function fetchArticle(url, pathname) {
    return new Promise((resolve) => {
        fetch(`/articles${url}`).then(response => {
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
    const response = await fetch(process.env.url + `/articles/${url}`);
    const text = await response.text();
    return (
        <>
            <div className={styles["article-box"]}>
                <Article markdown={text} url={url}/>
            </div>
        </>
    );
}


export async function generateStaticParams() {
    // const treeResponse = await fetch(process.env.url + '/articles/tree.json');
    // const tree = await treeResponse.json();
    
    // let articles = [];
    // const parsePage = (tree, url=[]) => {
    //     // console.log(tree);
    //     if(tree.child == undefined) {
    //         articles.push({article: [...url, tree.url]});
    //         return;
    //     }
    //     for (let child of tree.child) {
    //         parsePage(child, [...url, child.url]);
    //     }
    // };
    // for (let child of tree) {
    //     parsePage(child);
    // }
    // console.log(articles);
    return [{article: ['readme.md']}];//articles;
}