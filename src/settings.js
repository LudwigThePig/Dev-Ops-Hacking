import colors, { lightColors } from './colors';

  // The properties of phong shader
export const mittenRockMaterial = {
  color: colors.darkBrown,
  flatShading: true,
  shininess: 1000,
};
  
  // Rotations per second / 60 fps
export const rotation = {
  x: 0,
  y: Math.PI * 0.5 / 60,
  z: Math.PI * 0.3 / 60,
};

// Light Characteristics [color, brightness, ?distance]
export const lights = {
  ambient: [colors.softWhite, 0.7],
  point: [colors.softWhite, 1.7, 100],
};

export default { 
  mittenRockMaterial,
  rotation,
  lights,
};
