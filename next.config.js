// module.exports = {
// 	reactStrictMode: true,
// 	images: {
// 		domains: ['edamam-product-images.s3.amazonaws.com', 'www.edamam.com'],
// 	},
// };

module.exports = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'edamam-product-images.s3.amazonaws.com',
				port: '',
			},
		],
	},
};

