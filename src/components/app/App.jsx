import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import { useState } from 'react';

import decoration from '../../resources/img/vision.png';

const App = () => {
	const [char, selectChar] = useState('');

	const onCharSelected = (id) => {
		selectChar(id);
	};

	return (
		<div className="app">
			<AppHeader />
			<main>
				<RandomChar />
				<div className="char__content">
					<CharList onCharSelected={onCharSelected} />
					<CharInfo charID={char} />
				</div>
				<img className="bg-decoration" src={decoration} alt="vision" />
			</main>
		</div>
	);
};

export default App;
