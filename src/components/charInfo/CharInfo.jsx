import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';
import { useEffect, useState } from 'react';

const CharInfo = ({ charId }) => {
	const { error, loading, getCharacter, clearError } = useMarvelService();

	const [char, setChar] = useState(null);

	const onCharLoaded = (char) => {
		setChar(char);
	};

	const updateChar = () => {
		if (!charId) {
			return;
		}
		clearError();
		getCharacter(charId).then(onCharLoaded);
	};

	useEffect(() => {
		updateChar();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [charId]);

	const skeleton = char || error || loading ? null : <Skeleton />;
	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !char) ? <View char={char} /> : null;

	return (
		<div className="char__info">
			{errorMessage}
			{spinner}
			{content}
			{skeleton}
		</div>
	);
};

const View = ({ char }) => {
	const { name, description, wiki, home, thumbnail, comics } = char;

	let imgStyle = { objectFit: 'cover' };
	if (thumbnail.includes('image_not_available')) {
		imgStyle = { objectFit: 'unset' };
	}

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle} />
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
					if (i > 9) return null;
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
