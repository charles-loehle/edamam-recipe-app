import Favorite from './Favorite';

const Favorites = ({ favorites, setFavorites }) => {
	return (
		<div className="Favorites">
			<h3 className="font-wt-400 text-gray">Favorited Meals</h3>
			<div className="favorite-container">
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
		</div>
	);
};

export default Favorites;
