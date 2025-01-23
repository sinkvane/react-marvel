import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import { useEffect, useState } from 'react';

const CharInfo = ({ charId }) => {
	const marvelService = new MarvelService();

	const [char, setChar] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const onCharLoaded = (char) => {
		setError(false);
		setChar(char);
		setLoading(false);
	};

	const onCharLoading = () => {
		setLoading(true);
	};

	const onError = () => {
		setLoading(false);
		setError(true);
	};

	const updateChar = () => {
		if (!charId) {
			return;
		}

		onCharLoading();

		marvelService.getCharacter(charId).then(onCharLoaded).catch(onError);
	};

	useEffect(
		(updateChar) => {
			updateChar();
		},
		[charId, updateChar]
	);

	const skeleton = char || error || loading ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className="char__info">
			{skeleton}
			{errorMessage}
			{spinner}
			{content}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, wiki, home, thumbnail, comics } = char;

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a href={home} target="_blank" rel="noreferrer" className="button button__main">
							<div className="inner">homepage</div>
						</a>
						<a href={wiki} target="_blank" rel="noreferrer" className="button button__secondary">
							<div className="inner">Wiki</div>
						</a>
					</div>
				</div>
			</div>
			<div className="char__descr"> {description}</div>
			<div className="char__comics">Comics:</div>
			<ul className="char__comics-list">
				{comics.length > 0 ? null : 'There is no comics with this character'}
				{comics.map((item, i) => {
					// eslint-disable-next-line
					if (i > 9) return;
					return (
						<li key={i} className="char__comics-item">
							{item.name}
						</li>
					);
				})}
			</ul>
		</>
	);
};

export default CharInfo;
