import React, { useContext } from 'react';
import { useState } from 'react';
import ImgsViewer from 'react-images-viewer';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../../App';
import VideoPoster from '../../../../assets/images/media_center/gallery1.png'
import ImageViewer from "react-simple-image-viewer";


const MediaCenter = () => {
  const { media_center, defualt_route } = useContext(AppCtx);
  let navigate = useNavigate();

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  // const images = media_center?.Row?.filter(r => !['mp4', 'avi'].includes(r.File_x0020_Type)).map(r => { return {src: r.EncodedAbsUrl, caption: r.BaseName} });
  const images = media_center?.Row?.filter(r => !['mp4', 'avi'].includes(r.File_x0020_Type)).map(r => r.EncodedAbsUrl).reverse();
  const videos = media_center?.Row?.filter(r => ['mp4', 'avi'].includes(r.File_x0020_Type)).map(r => r.EncodedAbsUrl).reverse();

  const openImageViewer = (index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  };
  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <div className="media-center">
      <div className="header">
        <h3>Media Center</h3>
        <a onClick={_ => navigate(`${defualt_route}/manage-media-center`)}>See All</a>
      </div>
      <div className="gallerys">
        <div className="gallery gallery1">
          {
            Array.isArray(videos)
            ? <video controls poster={VideoPoster} width="100%">
                <source src={videos[0]}></source>
              </video>
            : null
          }
        </div>


        {/* {images?.slice(-4)?.reverse()?.map((img, index) => (
          <div
            key={ index }
            src={img.src}
            className={`gallery gallery${index+2}`}
            style={{backgroundImage: `url(${img.src})`}}
            onClick={() => openImageViewer(index)}
          />
        ))}
        {
          Array.isArray(images)
          ? <ImgsViewer
              imgs={images?.reverse()}
              isOpen={isViewerOpen}
              onClose={closeImageViewer}
              currImg={currentImage}
              onClickPrev={() => setCurrentImage(prev => prev - 1)}
              onClickNext={() => setCurrentImage(prev => prev + 1)}
              showThumbnails={true}
              onClickThumbnail={(i) => setCurrentImage(i)}
              backdropCloseable={true}
            />
          : null
        } */}



        {images?.slice(0, 4)?.map((img, index) => (
          <div
            key={ index }
            src={img}
            className={`gallery gallery${index+2}`}
            style={{backgroundImage: `url(${img})`}}
            onClick={() => openImageViewer(index)}
          />
        ))}
      
        {isViewerOpen && (
          <ImageViewer
            src={images}
            currentIndex={currentImage}
            onClose={closeImageViewer}
            backgroundStyle={{
              backgroundColor: "rgba(0,0,0,0.9)"
            }}
          />
        )}
      </div>
    </div>
  )
}

export default MediaCenter