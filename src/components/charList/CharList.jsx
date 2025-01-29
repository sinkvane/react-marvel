import PropTypes from 'prop-types';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useEffect, useState } from 'react';

const CharList = ({ onCharSelected }) => {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [charList, setCharList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(0);
	const [charEnded, setCharEnded] = useState(false);

	const marvelService = new MarvelService();

	const onCharListLoading = () => {
		setNewItemLoading(true);
	};

	const onRequest = (offset) => {
		onCharListLoading();
		marvelService.getAllCharacters(offset).then(onCharListLoaded).catch(onError);
	};

	useEffect(() => {
		onRequest();
	}, []);

	const onCharListLoaded = (newCharList) => {
		let ended = false;

		if (newCharList.length < 9) {
			ended = true;
		}

		setCharList((prevCharList) => [...prevCharList, ...newCharList]);
		setLoading(false);
		setNewItemLoading(false);
		setOffset(offset + 9);
		setCharEnded(ended);
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
			<button
				className="button button__main button__long"
				disabled={newItemLoading ? true : false}
				style={{ display: charEnded ? 'none' : 'block' }}
				onClick={() => {
					onRequest(offset);
				}}
			>
				<div className="inner">{newItemLoading ? 'loading...' : 'load more'}</div>
			</button>
		</div>
	);
};

CharList.propTypes = {
	onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
