'use client'

import styles from "./page.module.css";
import React, { Suspense, useState, useEffect } from 'react';

import Article from "@/components/Article";
import ContentTable from "@/components/ContentTable";
import ArticleParser from "@/util/ArticleParser";

import { usePathname, useRouter, asPath } from 'next/navigation'

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

export default function Materials({ params }) {
    const [articlePromise, setArticlePromise] = useState(null);
    const [content, setContent] = useState(null);
    const fetchContent = async () => {
        const { article } = await params;
        const url = article.join("/");
        const response = await fetch(`/articles/${url}`);
        const text = await response.text();
        const content = ArticleParser.parse(text, url);
        setContent(c => content);
    };
    useEffect(() => {
        fetchContent();
    }, [ params ]);
    return (
        <>
            <div className={styles["article-box"]}>
                {content}
            </div>
        </>
    );
}