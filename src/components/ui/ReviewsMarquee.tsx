'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from 'react';

const AUTO_SCROLL_SPEED = 42;
const WHEEL_RESUME_DELAY_MS = 1200;

export type ReviewMarqueeItem = {
  id: string;
  title: string;
  text: string;
  author: string;
  img: string;
};

type Props = {
  items: ReviewMarqueeItem[];
  ariaLabel: string;
};

export default function ReviewsMarquee({ items, ariaLabel }: Props) {
  const loop = useMemo(() => [...items, ...items, ...items], [items]);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const segmentWidthRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const autoScrollEnabledRef = useRef(true);
  const lastFrameTimeRef = useRef(0);
  const wheelResumeTimerRef = useRef(0);

  const normalizeScroll = useCallback(() => {
    const viewport = viewportRef.current;
    const segmentWidth = segmentWidthRef.current;
    if (!viewport || segmentWidth <= 0) return;

    if (viewport.scrollLeft < segmentWidth * 0.5) {
      viewport.scrollLeft += segmentWidth;
      return;
    }

    if (viewport.scrollLeft > segmentWidth * 1.5) {
      viewport.scrollLeft -= segmentWidth;
    }
  }, []);

  const measureSegment = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;

    const segmentWidth = track.scrollWidth / 3;
    segmentWidthRef.current = segmentWidth;
    return segmentWidth;
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;

    const initialize = () => {
      const segmentWidth = measureSegment();
      if (segmentWidth > 0) {
        viewport.scrollLeft = segmentWidth;
      }
    };

    initialize();

    const resizeObserver = new ResizeObserver(() => {
      initialize();
    });

    resizeObserver.observe(viewport);
    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    let frameId = 0;

    const tick = (time: number) => {
      const segmentWidth = segmentWidthRef.current;
      if (
        segmentWidth > 0 &&
        autoScrollEnabledRef.current &&
        !isDraggingRef.current &&
        !prefersReducedMotion
      ) {
        if (lastFrameTimeRef.current > 0) {
          const deltaSeconds = (time - lastFrameTimeRef.current) / 1000;
          viewport.scrollLeft += AUTO_SCROLL_SPEED * deltaSeconds;
          normalizeScroll();
        }
        lastFrameTimeRef.current = time;
      } else {
        lastFrameTimeRef.current = 0;
      }

      frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(wheelResumeTimerRef.current);
      resizeObserver.disconnect();
    };
  }, [measureSegment, normalizeScroll]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || event.button !== 0) return;

    isPointerDownRef.current = true;
    isDraggingRef.current = false;
    dragStartXRef.current = event.clientX;
    dragStartScrollRef.current = viewport.scrollLeft;
    autoScrollEnabledRef.current = false;
    viewport.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport || !isPointerDownRef.current) return;

    const deltaX = event.clientX - dragStartXRef.current;
    if (!isDraggingRef.current && Math.abs(deltaX) > 4) {
      isDraggingRef.current = true;
    }

    if (!isDraggingRef.current) return;

    viewport.scrollLeft = dragStartScrollRef.current - deltaX;
    normalizeScroll();
  };

  const endPointerInteraction = (
    event: ReactPointerEvent<HTMLDivElement>,
    resumeAutoScroll: boolean,
  ) => {
    const viewport = viewportRef.current;
    if (!viewport || !isPointerDownRef.current) return;

    isPointerDownRef.current = false;
    isDraggingRef.current = false;

    if (viewport.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    normalizeScroll();
    autoScrollEnabledRef.current = resumeAutoScroll;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    endPointerInteraction(event, true);
  };

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    endPointerInteraction(event, true);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;
    endPointerInteraction(event, true);
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const dominantDelta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

    if (dominantDelta === 0) return;

    event.preventDefault();
    autoScrollEnabledRef.current = false;
    viewport.scrollLeft += dominantDelta;
    normalizeScroll();

    window.clearTimeout(wheelResumeTimerRef.current);
    wheelResumeTimerRef.current = window.setTimeout(() => {
      autoScrollEnabledRef.current = true;
    }, WHEEL_RESUME_DELAY_MS);
  };

  return (
    <div
      className="comments-marquee-fade"
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0, #000 6%, #000 94%, transparent 100%)',
      }}
    >
      <div
        ref={viewportRef}
        className="comments-marquee-viewport"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onPointerLeave={handlePointerLeave}
        onWheel={handleWheel}
      >
        <ul ref={trackRef} className="comments-marquee-track" aria-label={ariaLabel}>
          {loop.map((item, index) => (
            <li key={`${item.id}-${index}`} className="comments-marquee-slide">
              <article className="comments-item">
                <div className="comments-item-description">
                  <p className="comments-title">{item.title}</p>
                  <p className="comments-description">{item.text}</p>
                </div>
                <div className="comments-author-mark">
                  <Image
                    className="comments-avatar"
                    src={item.img}
                    alt={`Photo of ${item.author}`}
                    width={48}
                    height={48}
                  />
                  <div className="comments-name-raiting">
                    <p className="comments-name">{item.author}</p>
                    <Image
                      src="/img/mans/raiting-full.svg"
                      alt="5 star rating"
                      width={80}
                      height={16}
                    />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
