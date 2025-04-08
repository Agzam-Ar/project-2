import remarkDirective from 'remark-directive'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import {unified} from 'unified'
import {removePosition} from 'unist-util-remove-position'

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

import Prism from "prismjs";
import 'prismjs/components/prism-javascript';

import DOMPurify from 'dompurify'
import Link from 'next/link';
import Image from 'next/image'

import CodeBlock from "@/components/CodeBlock";
import TestField from "@/components/TestField";
import Quiz from "@/components/Quiz";
import Prefs from '@/util/Prefs';
import Vars_ from '@/util/Vars';

import styles from "./ArticleParser.module.css";

const processor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkMath)

/*
 * TODO: save correct tests to localStorage
 */

const ArticleParser = {
	
	parse: async (markdown) => {
		const parseTree = processor.parse(markdown);
		const tree = await processor.run(parseTree);
		return tree;
	},

	build: (tree, url) => {
		let Vars = {};
		removePosition(tree, {force: true});
		
		let testId = 0;
		let eTests = [];

		let completedTests = [];
		const onComplete = (tid) => {
			completedTests[tid] = true;
			console.log(completedTests);
			for (let state of completedTests) if(!state) return;
			console.log("All correct!", url);
			Prefs.set(`test-/${url}`, true);
		};

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
				if(node.type == 'image') {
					Tag = Image;
					attr.src = `${node.url}`;
					console.log(node);
					// elements.push(<Image key={elements.length} className={styles[`md-${className}`]} alt={node.alt} src={`/images/${node.url}`} width={0} 
  // sizes="100vw" height={0}/>);
					elements.push(<img key={elements.length} className={styles[`md-${className}`]} src={`${Vars_.env.url}/images/${node.url}`}/>);
					continue;
				}
				if(node.type == 'inlineMath') {
					Tag = InlineMath;
				}
				if(node.type == 'math') {
					Tag = BlockMath;
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
                    if(node.lang == 'test') {
                        const config = {
                            answer: /.*/,
                            validator: /.*/,
                            placeholder: "error",
                            filter: undefined,
                        };
                        try {
                            const parseRegexp = (str, def=str) => {
                                // if(str.startsWith("/")) {
                                //     let match = str.match(new RegExp('^/(.*?)/([gimy]*)$'));
                                //     if(match == null) return def;
                                //     if(match[1] == undefined) return def;
                                //     if(match[2] == undefined) return def;
                                //     return new RegExp(match[1], match[2]);
                                // }
                                return def;
                            }
                            const configJson = JSON.parse(`{${node.value}}`);
                            config.answer = configJson.answer.startsWith("$") ? Vars[configJson.answer] : configJson.answer;
                            config.validator = parseRegexp(configJson.validator, undefined);
                            config.placeholder = configJson.placeholder;
                            config.filter = configJson.filter;
                        } catch(e) {
                            console.error(e, `\n{${node.value}}`);
                        }
						const tid = completedTests.length;
						let tf = <TestField key={elements.length} onComplete={() => onComplete(tid)} config={config}/>;
                        elements.push(tf);
                        eTests.push(tf);
                        completedTests.push(false);
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