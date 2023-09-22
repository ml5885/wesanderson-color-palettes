import React, { useState } from "react";

type Color = string;

interface ColorPaletteProps {
	image: string;
	colors: Color[];
}

const ColorPalette: React.FC<ColorPaletteProps> = (props) => {
	const { colors, image } = props;
	const [hoveredColor, setHoveredColor] = useState<Color | null>(null);
	const [isExpanded, setIsExpanded] = useState(false);

	const handleColorHover = (color: Color) => {
		setHoveredColor(color);
	};

	const handleColorClick = (color: Color) => {
		navigator.clipboard.writeText(color);
	};

	const handleImageClick = () => {
		setIsExpanded(true);
	};

	const handleClose = () => {
		setIsExpanded(false);
		setHoveredColor(null);
	};

	const handleOverlayClick = (e: React.MouseEvent) => {
		// Check if the click occurred outside the modal content
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
				<img src={image} alt="Image" />
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
			{isExpanded && (
				<div className="modal" onClick={handleOverlayClick}>
					<div className="modal-content">
						<div className="modal-image">
							<img src={image} alt="Image" />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ColorPalette;
