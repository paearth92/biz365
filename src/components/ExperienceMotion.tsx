import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ExperienceMotion() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cleanup: Array<() => void> = [];
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".site-header",
        { y: -18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, ease: "power3.out" },
      );

      const home = document.querySelector<HTMLElement>(".premium-home");
      if (!home) return;

      const hero = gsap.timeline({ defaults: { ease: "power3.out" } });
      hero
        .fromTo(".premium-pill", { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo(
          ".premium-hero h1",
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          "-=.35",
        )
        .fromTo(
          ".premium-hero-copy>p",
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          "-=.45",
        )
        .fromTo(
          ".premium-hero-actions,.premium-proof",
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.1 },
          "-=.35",
        )
        .fromTo(".hero-pedestal", { opacity: 0 }, { opacity: 1, duration: 0.7 }, 0.18)
        .fromTo(
          ".stage-card,.stage-caption",
          { scale: 0.88, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.55, stagger: 0.08 },
          0.65,
        );

      const ambientAnimations = [
        gsap.to(".stage-card-one", { y: -7, duration: 2.5, ease: "sine.inOut", repeat: -1, yoyo: true }),
        gsap.to(".stage-card-two", { y: 7, duration: 2.9, ease: "sine.inOut", repeat: -1, yoyo: true }),
      ];

      const heroSection = document.querySelector<HTMLElement>(".premium-hero");
      if (heroSection) {
        const observer = new IntersectionObserver(
          ([entry]) =>
            ambientAnimations.forEach((animation) =>
              entry.isIntersecting ? animation.resume() : animation.pause(),
            ),
          { rootMargin: "120px 0px" },
        );
        observer.observe(heroSection);
        cleanup.push(() => observer.disconnect());
      }

      gsap.to(".demo-halo", {
        scale: 1.1,
        opacity: 0.68,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: ".premium-how",
          start: "top bottom",
          end: "bottom top",
          toggleActions: "play pause resume pause",
        },
      });

      gsap.utils.toArray<HTMLElement>(".premium-home > section:not(.premium-hero)").forEach((section) => {
        const targets = section.querySelectorAll(":scope > .shell, :scope > .premium-section-head");
        if (!targets.length) return;
        gsap.fromTo(
          targets,
          { y: 26, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 88%", once: true },
          },
        );
      });

      const media = gsap.matchMedia();
      media.add("(min-width: 768px) and (pointer: fine)", () => {
        const stage = document.querySelector<HTMLElement>(".premium-hero-stage");
        if (!stage) return;

        const cardOne = document.querySelector<HTMLElement>(".stage-card-one");
        const cardTwo = document.querySelector<HTMLElement>(".stage-card-two");
        const cardOneX = cardOne ? gsap.quickTo(cardOne, "x", { duration: 0.55, ease: "power2.out" }) : null;
        const cardTwoX = cardTwo ? gsap.quickTo(cardTwo, "x", { duration: 0.55, ease: "power2.out" }) : null;

        const move = (event: PointerEvent) => {
          const rect = stage.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          cardOneX?.(x * -12);
          cardTwoX?.(x * 14);
        };
        const leave = () => {
          cardOneX?.(0);
          cardTwoX?.(0);
        };
        stage.addEventListener("pointermove", move, { passive: true });
        stage.addEventListener("pointerleave", leave, { passive: true });
        return () => {
          stage.removeEventListener("pointermove", move);
          stage.removeEventListener("pointerleave", leave);
        };
      });
      cleanup.push(() => media.revert());
    });

    return () => {
      cleanup.forEach((dispose) => dispose());
      ctx.revert();
    };
  }, []);

  return null;
}
