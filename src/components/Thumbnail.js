import { useState } from 'react';

function Thumbnail({ thumbnail1, thumbnail2 = thumbnail1, width = 270, height = 270 }) {
    const [isHovering, setIsHovering] = useState(false);
    const handleMouseOver = () => {
        setIsHovering(true);
    };
    const handleMouseOut = () => {
        setIsHovering(false);
    };

    const ThumbnailSrc = isHovering ? thumbnail2 : thumbnail1;
    return (
        <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <img src={ThumbnailSrc} alt="" style={{ width: width, height: height }} />
        </div>
    );
}
export default Thumbnail;
