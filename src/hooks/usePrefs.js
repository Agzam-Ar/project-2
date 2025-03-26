import { useState, useEffect } from 'react';

import Prefs from '@/util/Prefs'

export function usePrefs(key, def) {
	const [value, setValue] = useState(def);
	const [inited, setInited] = useState(false);
	useEffect(() => {
		setValue(v => Prefs.get(key, def));
		setInited(i => true);
	}, [key]);
	useEffect(() => {
		if(!inited) return;
		Prefs.set(key, value);
	}, [value]);
	return [value, setValue];
}