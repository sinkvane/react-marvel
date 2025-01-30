import { useParams, Link } from 'react-router';
import './singleComicPage.scss';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useEffect, useState } from 'react';
import AppBanner from '../appBanner/AppBanner';

const SingleComicPage = () => {
	const { comicId } = useParams();
	const [comic, setComic] = useState(null);

	const { error, loading, getComic, clearError } = useMarvelService();

	const onComicLoaded = (comic) => {
		setComic(comic);
	};

	const updateComic = () => {
		clearError();
		getComic(comicId).then(onComicLoaded);
	};

	useEffect(() => {
		updateComic();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [comicId]);

	const errorMessage = error ? <ErrorMessage /> : null;
	const spinner = loading ? <Spinner /> : null;
	const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

	return (
		<>
			<AppBanner />
			{errorMessage}
			{spinner}
			{content}
		</>
	);
};

const View = ({ comic }) => {
	const { title, description, pageCount, price, thumbnail, language } = comic;

	return (
		<div className="single-comic">
			<img src={thumbnail} alt={title} className="single-comic__img" />
			<div className="single-comic__info">
				<h2 className="single-comic__name">{title}</h2>
				<p className="single-comic__descr">{description}</p>
				<p className="single-comic__descr">{pageCount}</p>
				<p className="single-comic__descr">Language: {language}</p>
				<div className="single-comic__price">{price}</div>
			</div>
			<Link to="/comics" className="single-comic__back">
				Back to all
			</Link>
		</div>
	);
};

export default SingleComicPage;
