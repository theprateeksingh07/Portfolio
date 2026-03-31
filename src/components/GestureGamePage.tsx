import { useEffect, useRef, useState } from "react";
import "./styles/Work.css";

type ParticlesSwarmModule = {
  ParticlesSwarm: new (container: HTMLDivElement) => { dispose?: () => void };
};

const gameLoaders: Record<string, () => Promise<ParticlesSwarmModule>> = {
  "nexura-solar-system": () => import("./GestureGame3D/NexuraSolarSystem.ts"),
};

const GestureGamePage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState("Loading game...");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gameName = params.get("game");
    if (!gameName) {
      setStatus("No game selected.");
      return;
    }

    const loader = gameLoaders[gameName];
    if (!loader) {
      setStatus("Game not found.");
      return;
    }

    let instance: { dispose?: () => void } | null = null;
    let cancelled = false;

    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      loader().then((module) => {
        if (cancelled || !containerRef.current) return;
        instance = new module.ParticlesSwarm(containerRef.current);
        setStatus("");
      }).catch((error) => {
        console.error(error);
        setStatus("Failed to load game.");
      });
    }

    return () => {
      cancelled = true;
      if (instance?.dispose) {
        instance.dispose();
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="gesture-game-page">
      <div className="gesture-game-page-header">
        <h1>3D Gesture Game</h1>
        <p>{status || "Click the browser tab to see the simulation."}</p>
      </div>
      <div className="gesture-game-page-canvas" ref={containerRef} />
    </div>
  );
};

export default GestureGamePage;
