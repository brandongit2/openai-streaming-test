/** @type {import('next').NextConfig} */
const config = {
	trailingSlash: true,
	webpack: (config) => {
		config.module.rules.push({test: /\.glsl$/, use: `raw-loader`})

		const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.(`.svg`))
		config.module.rules.push({
			test: /\.svg$/i,
			resourceQuery: {not: /url/}, // exclude if *.svg?url
			use: [{loader: `@svgr/webpack`, options: {icon: true}}],
		})
		fileLoaderRule.exclude = /\.svg$/i

		return config
	},
}

export default config
