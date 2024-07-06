import React from "react";
import "./App.css";
import ColorPalette from "./components/ColorPalette";

const App: React.FC = () => {
	const palettes: { image: string; colors: string[] }[] = [
		{
			image: "/assets/images/FrenchDispatch/FrenchDispatch1.jpeg",
			colors: ["#255059", "#86A677", "#736C48", "#BFB493", "#A65E44"],
		},
		{
			image: "/assets/images/FrenchDispatch/FrenchDispatch2.jpeg",
			colors: ["#667F67", "#7D2828", "#8B5039", "#B69E7E", "#314F64"],
		},
		{
			image: "/assets/images/FrenchDispatch/FrenchDispatch3.jpeg",
			colors: ["#A60321", "#BF6B04", "#F2CAA7", "#8C5637", "#F25D27"],
		},
		{
			image: "/assets/images/LifeAquatic/LifeAquatic1.jpeg",
			colors: ["#B6CECE", "#0889A6", "#04D9D9", "#BFA084", "#D93D04"],
		},
		{
			image: "/assets/images/LifeAquatic/LifeAquatic2.jpeg",
			colors: ["#BF8A26", "#BF8973", "#E6D0B3", "#BFA799", "#A61508"],
		},
		{
			image: "/assets/images/LifeAquatic/LifeAquatic3.jpeg",
			colors: ["#A67233", "#A68568", "#73462D", "#40180A", "#8C0303"],
		},
		{
			image: "/assets/images/LifeAquatic/LifeAquatic4.jpeg",
			colors: ["#758DA6", "#7E775E", "#59583B", "#8C7C6F", "#730202"],
		},
		{
			image: "/assets/images/LifeAquatic/LifeAquatic5.jpeg",
			colors: ["#79838C", "#D9910B", "#BF6B04", "#8C623E", "#D9D4D0"],
		},
		{
			image: "/assets/images/LifeAquatic/LifeAquatic6.jpeg",
			colors: ["#8C0813", "#A3BAD9", "#58878C", "#736334", "#D9B8"],
		},
		{
			image: "/assets/images/LifeAquatic/LifeAquatic7.jpeg",
			colors: ["#13421C", "#9B9295", "#A97948", "#8C1E14", "#7D4D20"],
		},
		{
			image: "/assets/images/IsleOfDogs1.jpeg",
			colors: ["#252273", "#E5A7B9", "#D9B65B", "#BF8641", "#D9B89C"],
		},
	];

	return (
		<div className="app">
			<div className="board-side-panel"></div>
			<div className="board-main">
				<div className="board-top-panel"></div>
				<div className="board">
					<div className="header">
						<h1>Palettes</h1>
					</div>
					{palettes.map((palette, index) => (
						<ColorPalette
							key={index}
							image={palette.image}
							colors={palette.colors}
						/>
					))}
				</div>
				<div className="board-bottom-panel">
					<p>Created by &nbsp;</p>
					<a target="_blank" rel="noreferrer" href="https://ml5885.github.io/">
						Michael Li
					</a>
				</div>
			</div>
			<div className="board-side-panel"></div>
		</div>
	);
};

export default App;
