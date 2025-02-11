/* eslint-disable react-hooks/exhaustive-deps */
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomChar = () => {
	const { loading, error, getCharacter, clearError } = useMarvelService();

	const [char, setChar] = useState('');

	useEffect(() => {
		updateChar();
		const timerId = setInterval(updateChar, 60000);

		return () => {
			clearInterval(timerId);
		};
	}, []);

	const onCharLoaded = (char) => {
		setChar(char);
	};

	const updateChar = () => {
		clearError();
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		getCharacter(id).then(onCharLoaded);
	};

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error) ? <View char={char} /> : null;

	return (
		<div className="randomchar">
			{errorMessage}
			{spinner}
			{content}
			<div className="randomchar__static">
				<p className="randomchar__title">
					Random character for today!
					<br />
					Do you want to get to know him better?
				</p>
				<p className="randomchar__title">Or choose another one</p>
				<button className="button button__main" onClick={updateChar}>
					<div className="inner">try it</div>
				</button>
				<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
			</div>
		</div>
	);
};

const View = ({ char }) => {
	const { name, thumbnail, description, home, wiki } = char;

	const defaultThumbnail = '';
	let thumbnailObjectFit = (thumbnail || defaultThumbnail).includes('image_not_available');

	return (
		<div className="randomchar__block">
			<img
				src={thumbnail}
				alt={name}
				className="randomchar__img"
				style={thumbnailObjectFit ? { objectFit: 'contain' } : { objectFit: 'cover' }}
			/>
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{description}</p>
				<div className="randomchar__btns">
					<a target="_blank" rel="noreferrer" href={home} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a target="_blank" rel="noreferrer" href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};

export default RandomChar;
