import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './recipe.module.scss';

const appID = process.env.NEXT_PUBLIC_APP_ID;
const appKey = process.env.NEXT_PUBLIC_APP_KEY;

export async function getServerSideProps(context) {
	// console.log(context.query); // {id: 'recipe_1234567890'}
	// console.log(context.params.id); // recipe_1234567890
	const res = await fetch(
		`https://api.edamam.com/api/recipes/v2/${context.params.id}?type=public&app_id=${appID}&app_key=${appKey}`
	);
	const data = await res.json();
	console.log(data);
	return {
		props: { data },
	};
}

export default function Recipe({ data }) {
	const { digest, label, ingredientLines, url } = data.recipe;

	// console.log(digest);

	return (
		<>
			<nav className="navbar">
				<div className="container">
					{/* <h1 className="site-title">DASH Diet Recipe App</h1> */}
					<Image
						src="/recipe-app-logo.png"
						alt="logo"
						width={160}
						height={22}
					/>
				</div>
			</nav>
			<div className="container mt-3 mb-2">
				<h1 className="recipe-title font-xxl font-wt-600 mt-1">{label}</h1>
				<Link href={url} target="_blank" rel="noopener noreferrer">
					<Image
						src={data.recipe.image}
						alt="meal thumbnail"
						width={500}
						height={500}
					/>
					{/* <Image
						src={placeholder}
						alt="meal thumbnail"
						width={400}
						height={400}
					/> */}
				</Link>
				<h2 className="ingredients-title font-xl font-wt-600">Ingredients</h2>
				<ul className={styles.ingredients__list}>
					{ingredientLines.map((ingredient, index) => (
						<li key={index}>{ingredient}</li>
					))}
				</ul>
				<h2 className="nutrition-title font-xl font-wt-600 mt-2">Nutrition</h2>
				<div className="fats">
					<p className="font-wt-500 font-lg">{digest[0].label}s</p>
					<ul className="text-gray">
						{digest[0].sub.map((fat, index) => {
							const { total } = fat;
							return (
								<li key={index}>
									{fat.label}:{' '}
									<span className="text-black font-wt-700">
										{total.toFixed(2)} {fat.unit}
									</span>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="carbs mt-1">
					<p className="font-wt-500 font-lg">{digest[1].label}</p>
					<ul className="text-gray">
						{digest[1].sub.map((carb, index) => {
							const { total } = carb;
							return (
								<li key={index}>
									{carb.label}:{' '}
									<span className="text-black font-wt-700">
										{total.toFixed(2)} {carb.unit}
									</span>
								</li>
							);
						})}
					</ul>
				</div>
				<div className="protein mt-1">
					<p className="font-wt-500 font-lg">{digest[2].label}</p>
					<ul className="text-gray">
						<li>
							<span className="text-black font-wt-700">
								{digest[2].total.toFixed(2)} {digest[2].unit}
							</span>
						</li>
					</ul>
				</div>
				<div className="cholesterol mt-1">
					<p className="font-wt-500 font-lg">{digest[3].label}</p>
					<ul className="text-gray">
						<li>
							<span className="text-black font-wt-700">
								{digest[3].total.toFixed(2)} {digest[3].unit}
							</span>
						</li>
					</ul>
				</div>
				<div className="sodium mt-1">
					<p className="font-wt-500 font-lg">{digest[4].label}</p>
					<ul className="text-gray">
						<li>
							<span className="text-black font-wt-700">
								{digest[4].total.toFixed(2)} {digest[4].unit}
							</span>
						</li>
					</ul>
				</div>
				<div className="action-buttons mt-2">
					<Link
						className="btn-primary text-white font-sm"
						href={url}
						target="_blank"
						rel="noopener noreferrer"
					>
						View Recipe
					</Link>

					<Link href="/">
						<Link className={styles.back}>Go Back</Link>
					</Link>
				</div>
			</div>
		</>
	);
}
