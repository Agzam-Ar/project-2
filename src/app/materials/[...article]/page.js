import ArticleParser from "@/util/ArticleParser";
import Article from "@/components/Article";
import Vars from "@/util/Vars";
 
export async function getStaticPaths() {
    const treeResponse = await fetch(process.env.NEXT_PUBLIC_BASE_URL + 'articles/tree.json');
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
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + `articles/${url}`);
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
    const { article } = await props;
    return <Article data={article}/>
}