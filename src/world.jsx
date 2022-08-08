import React, { useState, useEffect } from 'react';
import ReactGlobe from 'react-globe.gl';

export const World = () => {
	const [countries, setCountries] = useState({ features: [] });

	useEffect(() => {
		// load data
		fetch('./map.geojson')
			.then((res) => res.json())
			.then(setCountries);

		console.log(countries.features);
	}, []);

	return (
		<ReactGlobe
			// width={500}
			// height={500}
			globeImageUrl='//unpkg.com/three-globe/example/img/earth-dark.jpg'
			backgroundImageUrl={
				'https://unpkg.com/three-globe/example/img/night-sky.png'
			}
			// backgroundColor='green'
			hexPolygonsData={
				countries.features
				// .filter(
				// (c) => c.properties.REGION_UN === 'Asia')
			}
			hexPolygonResolution={4}
			hexPolygonMargin={0.3}
			hexPolygonColor={() =>
				`#${Math.round(Math.random() * Math.pow(2, 24))
					.toString(16)
					.padStart(6, '0')}`
			}
			hexPolygonLabel={({ properties: d }) => `
		    <b>${d.NAME} (${d.ISO_A3})</b> <br />
		    Population: <i>${d.POP_EST}</i>
		  `}
		/>
	);
};
