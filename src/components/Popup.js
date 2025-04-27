
'use client'

import React, { useEffect, useReducer, useRef, useState } from 'react';
import styles from './Popup.module.css';


export default function Popup({children, visible, onHide}) {

	const [_, render] = useState({});

	const translate = useRef({x:0,y:0});
	const [x, translateX] = useReducer((x, dx) => {
		translate.current.x = x+dx;
		return translate.current.x;
	}, 0);
	const [y, translateY] = useReducer((y, dy) => {
		translate.current.y = y+dy;
		return translate.current.y;
	}, 0);

	// const [_mouse, _setMouse] = useState();
	const mouse = useRef({x:0,y:0,down:false});

	const onMouseUp = e => {
		// mouse.current.x = e.screenX;
		// mouse.current.y = e.screenY;
		mouse.current.down = false;
		// console.log('onMouseUp', mouse.down);
		// setMouse({x:e.clientX, y:e.clientY, down:false});
	};

	const onMouseMove = e => {
		if(!mouse.current.down) return;
		const dx = e.screenX - mouse.current.x;
		const dy = e.screenY - mouse.current.y;
		translateX(dx);
		translateY(dy);
		mouse.current.x = e.screenX;
		mouse.current.y = e.screenY;
	};

	const onTouchMove = e => {
		if(!mouse.current.down) return;
		const dx = e.touches[0].screenX - mouse.current.x;
		const dy = e.touches[0].screenY - mouse.current.y;
		translateX(dx);
		translateY(dy);
		mouse.current.x = e.touches[0].screenX;
		mouse.current.y = e.touches[0].screenY;
        e.preventDefault();
	};

	// useEffect(() => {
		// translateX(-x);
	// }, [visible]);

	const returnBack = () => {
		if(mouse.current.down) return;
    	translateX(translate.current.x * -.1);
    	translateY(translate.current.y * -.1);
	};

	useEffect(() => {
		console.log('useEffect');
		addEventListener('mouseup', onMouseUp);
		addEventListener('touchend', onMouseUp);
		addEventListener('mousemove', onMouseMove);
		addEventListener('touchmove', onTouchMove, { passive: false });

    	const updater = setInterval(returnBack, 1000/60);

		return () => {
			removeEventListener('mouseup', onMouseUp);
			removeEventListener('touchend', onMouseMove);
			removeEventListener('mousemove', onMouseMove);
			clearInterval(updater);
		};
	}, []);


	return <>
		<div className={`${styles.locker} ${visible ? styles.visible : styles.hide}`} onClick={() => onHide()}></div>
		{/*<div className={styles.center}>*/}
			<div className={`${styles.box} ${visible ? styles.visible : styles.hide}`} 
			onMouseDown={e => {
				mouse.current.x = e.screenX;
				mouse.current.y = e.screenY;
				mouse.current.down = true;
			}}
			onTouchStart={e => {
				mouse.current.x = e.touches[0].screenX;
				mouse.current.y = e.touches[0].screenY;
				mouse.current.down = true;
			}}
			style={{
				translate: `${x}px ${y}px`
			}}>
				{children}
			</div>
		{/*</div>*/}
	</>;
}


// export default class Popup extends React.Component {

// 	mouse = {
// 		down: false,
// 		x: 10,
// 		y: 20
//     };

// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			x: 0,
// 			y: 0,
// 		}
// 	}

// 	onMouseUp(e) {
// 		this.mouse.down = false;
// 		this.mouse.x = e.clientX;
// 		this.mouse.y = e.clientY;
// 	}

// 	componentDidMount() {
//   		window.addEventListener('mouseup', this.onMouseUp, { passive: false });
// 	}

// 	componentWillUnmount() {
//   		window.removeEventListener('mouseup', this.onMouseUp);
// 	}

// 	render() {
// 		let {visible, children, onHide} = this.props;
// 		let {x, y} = this.state;

// 		return <>
// 		<div className={`${styles.locker} ${visible ? styles.visible : styles.hide}`} onClick={() => onHide()}></div>
// 		<div className={`${styles.box} ${visible ? styles.visible : styles.hide}`} 
// 		onMouseDown={e => {
// 			this.mouse.down = true;
// 			this.mouse.x = e.clientX;
// 			this.mouse.y = e.clientY;
// 		}}
// 		onMouseUp={e => {
// 		}}
// 		onMouseMove={e => {
// 			if(this.mouse.down) {
// 				const dx = this.mouse.x - e.clientX;
// 				this.setState(s => {
// 					return {...s, x: s.x + dx}
// 				});
// 				console.log(this.state, dx);
// 			}
// 		}} style={{
// 			translate: `${x}px ${y}px`
// 		}}>
// 			{this.state.x}{x}{children}
// 		</div>
// 	</>;
// 	}
// }