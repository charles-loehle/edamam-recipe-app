import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const Favorite = ({ favorite, favoriteList, setFavorites }) => {
	console.log(favoriteList);
	const deleteHandler = e => {
		setFavorites(favoriteList.filter(el => el.recipeId !== favorite.recipeId));
		console.log(favorite);
	};

	return (
		<div className="Favorite">
			<Image
				src={favorite.image}
				alt="recipe thumbnail"
				width={100}
				height={100}
			/>
			<p>{favorite.label}</p>
			<button onClick={deleteHandler} className="trash-btn">
				<FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
			</button>
		</div>
	);
};

export default Favorite;
