import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from './recipe.module.scss';

export async function getServerSideProps(context) {
	console.log(context.query); // {id: 'recipe_1234567890'}
	//console.log(context.params.id); // recipe_1234567890
	const res = await fetch(
		`https://api.edamam.com/api/recipes/v2/${context.params.id}?type=public&app_id=14c68664&app_key=cc33a02c16fadb22aea4ecea7184fee1`
	);
	const data = await res.json();
	//console.log(data);
	return {
		props: { data },
	};
}

export default function Recipe({ data }) {
	const { digest, label, ingredientLines, url } = data.recipe;
	return (
		<>
			<nav className="navbar">
				<div className="container">
					<h1 className="site-title">DASH Diet Recipe App</h1>
				</div>
			</nav>
			<div className="container mb-2">
				<h1>{label}</h1>
				<a href={url} target="_blank" rel="noopener noreferrer">
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
				</a>
				<h2>Ingredients</h2>
				<ul>
					{ingredientLines.map((ingredient, index) => (
						<li key={index}>{ingredient}</li>
					))}
				</ul>
				<h2>Nutrients</h2>
				<div className="fats">
					<p>{digest[0].label}</p>
					<ul>
						{digest[0].sub.map((fat, index) => (
							<li key={index}>
								{fat.label}: {fat.total}
								{fat.unit}
							</li>
						))}
					</ul>
				</div>
				<div className="carbs">
					<p>{digest[1].label}</p>
					<ul>
						{digest[1].sub.map((carb, index) => (
							<li key={index}>
								{carb.label}: {carb.total}
								{carb.unit}
							</li>
						))}
					</ul>
				</div>
				<div className="protein">
					<p>{digest[2].label}</p>
					<ul>
						<li>
							{digest[2].total}
							{digest[2].unit}
						</li>
					</ul>
				</div>
				<div className="cholesterol">
					<p>{digest[3].label}</p>
					<ul>
						<li>
							{digest[3].total}
							{digest[3].unit}
						</li>
					</ul>
				</div>
				<div className="sodium">
					<p>{digest[4].label}</p>
					<ul>
						<li>
							{digest[4].total}
							{digest[4].unit}
						</li>
					</ul>
				</div>
				<div className="action-buttons">
					<a
						className="btn-primary text-white"
						href={url}
						target="_blank"
						rel="noopener noreferrer"
					>
						Go to instructions
					</a>

					<Link href="/">
						<a className={styles.back}>Go Back</a>
					</Link>
				</div>
			</div>
		</>
	);
}
