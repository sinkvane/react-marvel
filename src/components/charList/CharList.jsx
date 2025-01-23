import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useEffect, useState } from 'react';

const CharList = ({ onCharSelected }) => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [charList, setCharList] = useState([]);

	const marvelService = new MarvelService();

	useEffect(() => {
		marvelService.getAllCharacters().then(onCharListLoaded).catch(onError);
	}, []);

	const onCharListLoaded = (charList) => {
		setCharList(charList);
		setLoading(false);
	};

	const onError = () => {
		setError(true);
		setLoading(false);
	};

	const renderCharList = (arr) => {
		const items = arr.map((item) => {
			let imgStyle = { objectFit: 'cover' };
			if (item.thumbnail.includes('image_not_available')) {
				imgStyle = { objectFit: 'unset' };
			}

			return (
				<li className="char__item" key={item.id} onClick={() => onCharSelected(item.id)}>
					<img src={item.thumbnail} alt={item.name} style={imgStyle} />
					<div className="char__name">{item.name}</div>
				</li>
			);
		});
		return items;
	};

	const items = renderCharList(charList);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error) ? items : null;

	return (
		<div className="char__list">
			<ul className="char__grid" style={{ gridTemplateColumns: spinner ? '1fr' : 'repeat(3, 200px)' }}>
				{errorMessage}
				{spinner}
				{content}
			</ul>
			<button className="button button__main button__long">
				<div className="inner">load more</div>
			</button>
		</div>
	);
};

export default CharList;
