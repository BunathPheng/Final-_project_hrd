"use client";

import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine, IOptions, MoveDirection, RecursivePartial } from "tsparticles-engine";

type ParticlesComponentProps = {
    id?: string;
    number?: number
}

const ParticlesComponent: React.FC<ParticlesComponentProps> = ({ id = "tsparticles", number = 50 }) => {
    const particlesInit = useCallback(async (engine: Engine) => {
        await loadSlim(engine);
    }, []);

    const options: RecursivePartial<IOptions> = {
        background: {
            color: {
                value: "transparent",
            },
        },
        fullScreen: {
            enable: false, // ✅ disables fullscreen canvas behavior
        },
        fpsLimit: 120,
        interactivity: {
            events: {
                onClick: {
                    enable: true,
                    mode: "push",
                },
                onHover: {
                    enable: true,
                    mode: "grab",
                },
                resize: true,
            },
            modes: {
                push: {
                    quantity: 1,
                },
                grab: {
                    distance: 200,
                    links: {
                        opacity: 0.8,
                    },
                },
            },
        },
        particles: {
            color: {
                value: "#B50000",
            },
            links: {
                color: "#B50000",
                distance: 150,
                enable: true,
                opacity: 0.8,
                width: 1,
            },
            move: {
                direction: "none" as MoveDirection,
                enable: true,
                outModes: {
                    default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: number,
            },
            opacity: {
                value: 0.8,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 2, max: 5 },
            },
        },
        detectRetina: true,
    };

    return (
        <Particles
            id={id}
            init={particlesInit}
            options={options}
            className="absolute w-full h-full left-0 top-0 z-0"
        />
    );
};

export default ParticlesComponent;
