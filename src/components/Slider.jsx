import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";


const Slider = ({img}) => {

  const data = img.map((imageName) => ({
    url: `http://localhost:3000/file/${imageName}`,
  }));
  


  return (
       <div>
      <SimpleImageSlider
        width={250}
        height={200}
        images={data}
        showBullets={true}
        showNavs={true}
      />
    </div>
  )
}

export default Slider
