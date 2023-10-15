import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import placeholderSrc from "../assets/placeholder.png";

type Color = string;

interface ColorPaletteProps {
	image: string;
	colors: Color[];
}

const ColorPalette: React.FC<ColorPaletteProps> = (props) => {
	const { colors, image } = props;
	const [hoveredColor, setHoveredColor] = useState<Color | null>(null);
	const [isExpanded, setIsExpanded] = useState(false);
	const [copiedColor, setCopiedColor] = useState<string | null>(null);

	const handleColorHover = (color: Color) => {
		setHoveredColor(color);
	};

	const handleColorClick = (color: Color) => {
		navigator.clipboard.writeText(color);
	    setCopiedColor(color);

	    // setTimeout(() => {
	    //   setCopiedColor(null);
	    // }, 2000);
	};

	const handleImageClick = () => {
		setIsExpanded(true);
	};

	const handleClose = () => {
		setIsExpanded(false);
		setHoveredColor(null);
	};

	const handleOverlayClick = (e: React.MouseEvent) => {
		if (
			isExpanded &&
			e.target instanceof HTMLElement &&
			!e.target.closest(".modal-content")
		) {
			handleClose();
		}
	};

	return (
		<div className="color-palette-wrapper">
			<div className="color-palette-image" onClick={handleImageClick}>
				<LazyLoadImage
					src={image}
					alt="image"
					placeholder={
						<span>
							<img src={placeholderSrc} alt="placeholder iamge"></img>
						</span>
					}
				/>
			</div>
			<div className="color-palette">
				{colors.map((color, index) => (
					<div
						className="color-circle"
						style={{ background: color }}
						onMouseEnter={() => handleColorHover(color)}
						onMouseLeave={() => handleColorHover("")}
						onClick={() => handleColorClick(color)}
					>
						{hoveredColor === color && <div className="tooltip">{color}</div>}
					</div>
				))}
			</div>
	      	{copiedColor && 
      		<div className="color-copied-popup">
      			Copied {copiedColor}
  			</div>}

			{isExpanded && (
				<div className="modal" onClick={handleOverlayClick}>
					<div className="modal-content">
						<div className="modal-image">
							<LazyLoadImage src={image} alt="image" />;
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ColorPalette;
