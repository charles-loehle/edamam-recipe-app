import Favorite from './Favorite';

const Favorites = ({ favorites, setFavorites }) => {
	return (
		<div className="Favorites">
			{favorites.map((favorite, index) => {
				return (
					<Favorite
						key={index}
						favorite={favorite}
						favoriteList={favorites}
						setFavorites={setFavorites}
					/>
				);
			})}
		</div>
	);
};

export default Favorites;
