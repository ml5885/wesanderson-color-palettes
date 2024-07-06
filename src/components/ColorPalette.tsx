import React, { useState, useCallback, MouseEvent } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholderSrc from "../assets/placeholder.png";

type Color = string;

interface ColorPaletteProps {
	image: string;
	colors: Color[];
}

const ColorPalette: React.FC<ColorPaletteProps> = React.memo(
	({ colors, image }) => {
		const [hoveredColor, setHoveredColor] = useState<Color | null>(null);
		const [isExpanded, setIsExpanded] = useState<boolean>(false);
		const [copiedColor, setCopiedColor] = useState<Color | null>(null);
		const [key, setKey] = useState<number>(0); // Add this line

		const handleColorHover = useCallback((color: Color | null) => {
			setHoveredColor(color);
		}, []);

		const handleColorClick = useCallback((color: Color) => {
			navigator.clipboard.writeText(color);
			setCopiedColor(null);
			setTimeout(() => {
				setCopiedColor(color);
				setKey((prevKey) => prevKey + 1);
			}, 10);
		}, []);

		const handleImageClick = useCallback(() => {
			setIsExpanded(true);
		}, []);

		const handleClose = useCallback(() => {
			setIsExpanded(false);
			setHoveredColor(null);
		}, []);

		const handleOverlayClick = useCallback(
			(e: MouseEvent<HTMLDivElement>) => {
				if (
					isExpanded &&
					e.target instanceof HTMLElement &&
					!e.target.closest(".modal-content")
				) {
					handleClose();
				}
			},
			[isExpanded, handleClose]
		);

		return (
			<div className="color-palette-wrapper">
				<div className="color-palette-image" onClick={handleImageClick}>
					<LazyLoadImage
						src={image}
						alt="Color palette inspiration"
						placeholder={<img src={placeholderSrc} alt="Loading placeholder" />}
						effect="blur"
						threshold={100}
					/>
				</div>
				<div className="color-palette">
					{colors.map((color, index) => (
						<div
							key={index}
							className="color-circle"
							style={{ background: color }}
							onMouseEnter={() => handleColorHover(color)}
							onMouseLeave={() => handleColorHover(null)}
							onClick={() => handleColorClick(color)}
						>
							{hoveredColor === color && <div className="tooltip">{color}</div>}
						</div>
					))}
				</div>
				{copiedColor && (
					<div key={key} className="color-copied-popup">
						Copied {copiedColor}
					</div>
				)}
				{isExpanded && (
					<div className="modal" onClick={handleOverlayClick}>
						<div className="modal-content">
							<div className="modal-image">
								<LazyLoadImage
									src={image}
									alt="Expanded color palette inspiration"
									effect="blur"
								/>
							</div>
						</div>
					</div>
				)}
			</div>
		);
	}
);

export default ColorPalette;
