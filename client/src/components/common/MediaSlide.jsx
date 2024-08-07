import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../api/modules/media.api";
import AutoSwiper from "./AutoSwiper";
import { toast } from "react-toastify";
import MediaItem from "./MediaItem";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      try {
        const { response } = await mediaApi.getList({
          mediaType,
          mediaCategory,
          page: 1,
        });

        // Check if response and response.results are defined and valid
        if (response && Array.isArray(response.results)) {
          setMedias(response.results);
        } else {
          // Optionally handle the case where the response is invalid
          setMedias([]);
        }
      } catch (err) {
        toast.error(err.message);
        // Optionally handle errors or set a default value
        setMedias([]);
      }
    };

    getMedias();
  }, [mediaType, mediaCategory]);

  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;