import React, { useState } from "react";
import Head from "next/head";
import Particles from "react-tsparticles";

interface HomepageProps {}

const generatePokemonPath = () => {
  // const amountOfPokemons = 898;

  const storage = [];

  for (let i = 1; i <= 20; i++) {
    storage.push({ src: `sprites/normal/${i}.png` });
  }

  return storage;
};

export const Homepage: React.FC<HomepageProps> = () => {
  const [pokemonPath, setPokemonPath] = useState<any>(generatePokemonPath());

  return (
    <div className="">
      <Head>
        <title>Skrelp Pokemon League</title>
        <link rel="icon" href="/skrelp.ico" />
      </Head>

      <header className="">
        <h1 className="">Welcome to Skrelps's Second League</h1>
      </header>

      <main className="text-center">
        <p>
          <span className="sm:hidden">☝️</span>
          <span className="hidden sm:inline">👈</span> use the navbar to navigate through the
          website
        </p>

        <Particles
          className="fixed inset-0"
          params={{
            particles: {
              zIndex: {
                value: 1,
              },
              number: {
                value: 20,
                density: {
                  enable: true,
                  value_area: 236.74802907265777,
                },
                max: 151,
              },
              color: {
                value: "#f3c3c3",
              },
              shape: {
                type: "images",
                stroke: {
                  width: 0,
                  color: "#f3c3c3",
                },
                polygon: {
                  nb_sides: 6,
                },
                images: pokemonPath,
              },
              size: {
                value: 25,
                random: {
                  enable: true,
                  minimumValue: 10,
                },
              },
              move: {
                enable: true,
                speed: 3,
                direction: "bottom",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: true,
                attract: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 1200,
                },
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onHover: {
                  enable: false,
                  mode: "grab",
                },
                onclick: {
                  enable: true,
                  mode: "push",
                },
                resize: true,
              },
              modes: {
                grab: {
                  distance: 400,
                  line_linked: {
                    opacity: 0.5,
                  },
                },
                bubble: {
                  distance: 150,
                  size: 4,
                  duration: 0.3,
                  opacity: 1,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
                push: {
                  particles_nb: 3,
                },
                remove: {
                  particles_nb: 2,
                },
              },
            },
            retina_detect: true,
          }}
        />
      </main>
    </div>
  );
};
