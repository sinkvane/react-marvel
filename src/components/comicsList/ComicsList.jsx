/* eslint-disable react-hooks/exhaustive-deps */
import './comicsList.scss';
import { useState, useEffect } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const ComicsList = () => {
	const offsetRandomize = Math.floor(Math.random() * (10 - 200) + 200);
	const [comicsList, setComicsList] = useState([]);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(offsetRandomize);
	const [comicsEnded, setComicsEnded] = useState(false);

	const { error, loading, getAllComics } = useMarvelService();

	const onComicsListLoaded = (newComicsList) => {
		let ended = false;

		if (newComicsList.length < 8) {
			ended = true;
		}

		setComicsList((prevComicsList) => [...prevComicsList, ...newComicsList]);
		setNewItemLoading(false);
		setOffset((offset) => offset + 8);
		setComicsEnded(ended);
	};

	const onRequest = (offset, initial) => {
		initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllComics(offset).then(onComicsListLoaded);
	};

	useEffect(() => {
		onRequest(offset, true);
	}, []);

	const renderComicsList = (arr) => {
		const items = arr.map((item, i) => {
			return (
				<li className="comics__item" key={i}>
					<Link to={`/comics/${item.id}`}>
						<img src={item.thumbnail} alt={item.title} className="comics__item-img" />
						<div className="comics__item-name">{item.title}</div>
						<div className="comics__item-price">{item.price}</div>
					</Link>
				</li>
			);
		});

		return <ul className="comics__grid">{items}</ul>;
	};

	const items = renderComicsList(comicsList);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading && !newItemLoading ? <Spinner /> : null;

	return (
		<div className="comics__list">
			{errorMessage}
			{spinner}
			{items}
			<button
				className="button button__main button__long"
				disabled={newItemLoading ? true : false}
				style={{ display: comicsEnded ? 'none' : 'block' }}
				onClick={() => onRequest(offset)}
			>
				<div className="inner">{newItemLoading ? 'loading...' : 'load more'}</div>
			</button>
		</div>
	);
};

export default ComicsList;
