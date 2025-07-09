import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import type { PanInfo } from "framer-motion";
import {
  FiCircle,
  FiCode,
  FiFileText,
  FiLayers,
  FiLayout,
} from "react-icons/fi";
import styles from "./HomePage.module.css";
import bgImage from "../../assets/fiat_bg.jpg";

export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  icon: React.ReactElement;
  image?: string;
}

export interface CarouselProps {
  items?: CarouselItem[];
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: "Text Animations",
    description: "Cool text animations for your projects.",
    id: 1,
    icon: <FiFileText className={styles.carouselIcon} />,
    image: bgImage,
  },
  {
    title: "Animations",
    description: "Smooth animations for your projects.",
    id: 2,
    icon: <FiCircle className={styles.carouselIcon} />,
    image: bgImage,
  },
  {
    title: "Components",
    description: "Reusable components for your projects.",
    id: 3,
    icon: <FiLayers className={styles.carouselIcon} />,
    image: bgImage,
  },
  {
    title: "Backgrounds",
    description: "Beautiful backgrounds and patterns for your projects.",
    id: 4,
    icon: <FiLayout className={styles.carouselIcon} />,
    image: bgImage,
  },
  {
    title: "Common UI",
    description: "Common UI components are coming soon!",
    id: 5,
    icon: <FiCode className={styles.carouselIcon} />,
    image: bgImage,
  },
];

const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const GAP = 16;
  const carouselItems = loop ? [...items, items[0]] : items;
  const totalTrackWidth = carouselItems.length * containerWidth + GAP * (carouselItems.length - 1);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) return prev + 1;
          if (prev === carouselItems.length - 1) return loop ? 0 : prev;
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    const DRAG_BUFFER = 0;
    const VELOCITY_THRESHOLD = 500;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) =>
        Math.min(prev + 1, carouselItems.length - 1)
      );
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <div className="container">
      <div
        className={`${styles.carouselContainer}`}
        ref={containerRef}
        style={{
          width: "100%",
          margin: "0 auto",
          borderRadius: "24px",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        }}
      >
        <motion.div
            className={`${styles.carouselTrack}`}
            drag="x"
            style={{
              x,
              width: totalTrackWidth ? `${totalTrackWidth}px` : undefined,
            }}
            animate={{ x: -(currentIndex * (containerWidth + GAP)) }}
            transition={isResetting ? { duration: 0 } : SPRING_OPTIONS}
            onAnimationComplete={handleAnimationComplete}
            onDragEnd={handleDragEnd}
        >

        {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`${styles.carouselItem} ${round ? styles.round : ""}`}
              style={{
                width: `${containerWidth}px`,
                height: round ? `${containerWidth}px` : "300px",
                backgroundImage: item.image ? `url(${item.image})` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: round ? "50%" : "16px",
              }}
            >
              <div className={styles.carouselOverlay}>
                <div className="d-flex justify-content-center align-items-center flex-column h-100 text-white p-3">
                  <span className={styles.carouselIconContainer}>
                    {item.icon}
                  </span>
                  <h5 className="mt-3">{item.title}</h5>
                  <p className="text-center">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className={`${styles.carouselIndicatorsContainer} mt-3`}>
        <div className={styles.carouselIndicators}>
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`${styles.carouselIndicator} ${
                currentIndex % items.length === index
                  ? styles.active
                  : styles.inactive
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
