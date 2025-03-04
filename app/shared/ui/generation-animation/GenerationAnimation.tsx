"use client";

import { useEffect, useRef } from "react";
import styles from './styles.module.scss';
import anime from "animejs";

export function GeneratingAnimation() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const staggerVisualizerEl = containerRef.current;
    staggerVisualizerEl.innerHTML = "";

    const grid = [17, 17];
    const numberOfElements = grid[0] * grid[1];

    const fragment = document.createDocumentFragment();
    for (let i = 0; i < numberOfElements; i++) {
      const div = document.createElement("div");
      div.style.width = "1rem";
      div.style.height = "1rem";
      div.style.border = "1px solid #7559ff";
      div.style.background = "#7559ff";
      div.style.borderRadius = "999px";
      fragment.appendChild(div);
    }
    staggerVisualizerEl.appendChild(fragment);

    const staggersAnimation = anime.timeline({
      targets: staggerVisualizerEl.children,
      easing: "easeInOutSine",
      delay: anime.stagger(50),
      loop: true,
      autoplay: true,
    })
    .add({
      translateX: [
        { value: anime.stagger("-.1rem", { grid, from: "center", axis: "x" }) },
        { value: anime.stagger(".1rem", { grid, from: "center", axis: "x" }) },
      ],
      translateY: [
        { value: anime.stagger("-.1rem", { grid, from: "center", axis: "y" }) },
        { value: anime.stagger(".1rem", { grid, from: "center", axis: "y" }) },
      ],
      duration: 800,
      scale: 0.5,
      delay: anime.stagger(100, { grid, from: "center" }),
    })
    .add({
      translateX: anime.stagger(".25rem", { grid, from: "center", axis: "x" }),
      translateY: anime.stagger(".25rem", { grid, from: "center", axis: "y" }),
      rotate: 0,
      scaleX: 2.5,
      scaleY: 0.25,
      delay: anime.stagger(4, { from: "center" }),
    })
    .add({
      rotate: anime.stagger([90, 0], { grid, from: "center" }),
      delay: anime.stagger(50, { grid, from: "center" }),
    })
    .add({
      translateX: 0,
      translateY: 0,
      scale: 0.5,
      scaleX: 1,
      rotate: 180,
      duration: 800,
      delay: anime.stagger(100, { grid, from: "center" }),
    })
    .add({
      scaleY: 1,
      scale: 1,
      delay: anime.stagger(20, { grid, from: "center" }),
    });

    return () => {
      staggersAnimation.pause();
    };
  }, []);

  return <div ref={containerRef} className={styles.staggerVisualizer}></div>;
}
