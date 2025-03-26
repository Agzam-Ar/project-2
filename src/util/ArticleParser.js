import remarkDirective from 'remark-directive'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import {unified} from 'unified'
import {removePosition} from 'unist-util-remove-position'

import Prism from "prismjs";
import 'prismjs/components/prism-javascript';

import DOMPurify from 'dompurify'
import Prefs from '@/util/Prefs';
import Link from 'next/link';
import styles from "./ArticleParser.module.css";

import CodeBlock from "@/components/CodeBlock";
import Quiz from "@/components/Quiz";

const processor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkMath)

const ArticleParser = {
	
	parse: async (markdown, url) => {

		const parseTree = processor.parse(markdown);
		const tree = await processor.run(parseTree);
		let Vars = {};
		
		removePosition(tree, {force: true});
		let testId = 0;
		
		const build = (tree) => {
			let elements = [];
			for (let node of tree) {
				let className = node.type;
        		let attr = {};
				let Tag = 'span';
				if(node.type == 'inlineCode' && node.value != undefined && node.value.startsWith("$")) {
					node.value = Vars[node.value];
					className = node.type = "text";
					Tag = "span";
				}
				if(node.type == 'thematicBreak') {
					Tag = "div";
					node.value = "";
				}
				if(node.type == 'heading') {
					Tag = `h${node.depth}`;
				}
				if(node.type == 'link') {
					Tag = Link;
					attr.href = `${node.url}`;
				}
				if(node.type == 'html') {
					// console.log(JSON.stringify(node, null, 4));
					// console.log('injected html: ', DOMPurify.sanitize(node.value));
					// elements.push(<div key={elements.length} className={styles[`md-${className}`]} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(node.value)}}/>);
					continue;
				}
				if(node.type == 'code') {
                    if(node.lang == 'init') {
						const Vars_ = eval(`let Vars = {};${node.value};Vars;`);
						Vars = {...Vars, ...Vars_};
						continue;
                    }
                    if(node.lang == 'quiz') {
						let lines = node.value.split("\n");
						let items = [];
						let corrects = 0;
						for (let line of lines) {
							let val = line.substring(1);
							let correct = line.charAt(0) == "+";
							corrects += correct;
							items.push({
								correct: correct,
								value: val.charAt(0) == '$' ? Vars[val] : val,
							});
						}
                        elements.push(
                            <Quiz
                                key={elements.length}
                                id={testId++}
                                url={url}
                                config={{
                                	items: items,
                                }}
                            />
                        );
                        continue;
                    }
					elements.push(
						<CodeBlock
							key={elements.length}
                			code={node.value}
                			lang={node.lang}
            			/>);
					continue;
				}

				if(styles[`md-${node.type}`] == undefined) console.warn(`md-${node.type}`, 'not defined'); // Reminder about unset styles
				if(node.value != undefined) elements.push(<Tag {...attr} key={elements.length} className={styles[`md-${className}`]}>{node.value}</Tag>);
				if(node.children != undefined) elements.push(<Tag {...attr} key={elements.length} className={styles[`md-${className}`]}>{build(node.children)}</Tag>);
			}
			
			return elements;
		}
		let builded = build(tree.children);
		return builded;
	},
};

export default ArticleParser;