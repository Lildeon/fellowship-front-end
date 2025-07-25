import { useInView } from "react-intersection-observer";
import { useState, useEffect, useRef } from "react";

// eslint-disable-next-line react/prop-types
export default function LazyPost({ content, image }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (inView) setVisible(true);
  }, [inView]);

  return (
    <div ref={ref} className="min-h-[150px] border p-4 mb-2 bg-white shadow">
      {isVisible ? (
        <>
          <p>{content}</p>
          <img
            src={image}
            alt="Post"
            loading="lazy"
            width="100%"
            className="mt-2 rounded"
          />
        </>
      ) : (
        <p className="text-gray-400">Loading post...</p>
      )}
    </div>
  );
}

// eslint-disable-next-line react/prop-types
export const LazyAutoPauseVideo = ({ src, poster }) => {
  const videoRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInView = entry.isIntersecting;

        if (videoRef.current) {
          if (isInView) {
            videoRef.current.play().catch(() => {}); // prevent error if not interactable
          } else {
            videoRef.current.pause().catch(() => {});
          }
        }
      },
      {
        rootMargin: "100px", // Load a bit before entering view
        threshold: 0.25,
      },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        muted
        width="100%"
        className="rounded-2xl"
      />
    </div>
  );
};
