import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';

const RandomChar = () => {

    const marvelService = new MarvelService();

    const [char, setChar] = useState('')

    useEffect(() => {
        updateChar();
    }, []) // 

    const onCharLoaded = (char) => {
        setChar(char)
    }
    
    const updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        marvelService
            .getCharacter(1009144)
            .then(onCharLoaded)
    }

    const { name, description, home, wiki, thumbnail } = char;

    return (
        <div className="randomchar">
            <div className="randomchar__block">
                <img src={thumbnail} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                        {description}
                    </p>
                    <div className="randomchar__btns">
                        <a target='_blank' rel='noreferrer' href={home} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a target='_blank' rel='noreferrer' href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar;