import{ 
  mittenRockMaterial, 
  rotation,
  lights 
} from '../src/settings.js';

describe('Mitten Rock Material', () => {
  it('it should not be decaf ☕️ 😴', () => {
    expect(mittenRockMaterial.color).not.toBe(0xDECAFF);
  });

  it('it should be shiny ', () => {
    expect(mittenRockMaterial.shininess).toBeGreaterThan(500);
  });

  it('it have flat shading', () => {
    expect(mittenRockMaterial.flatShading);
  });
});


describe('Rotation', () => {
  it('should not rotate on the x axis', () => {
    expect(rotation.x).toBe(0);
  });

  it('should rotate faster than the earth on the y axis 🌍 🐢', () => {
    const yearsPerFrame = 365 / 60 / 60 / 24 / 365;
    expect(rotation.y).toBeGreaterThan(yearsPerFrame);
  });

  it('should rotate slower than the electron of a hydrogen molecule ⚛️', () => {
    const revolutionsPerFrame = 10e15 / 60;
    expect(rotation.y).toBeLessThan(revolutionsPerFrame);
  });
});

describe('Lights', () => {

  it('should have a neutral light', () => {
    expect(lights.ambient[0]).toBeGreaterThan(0xDEDEDE);
    expect(lights.point[0]).toBeGreaterThan(0xDEDEDE);
  });

  it('generally, should not be too bright 🎚', () => {
    expect(lights.ambient[1]).toBeLessThan(1);

  });

  it('in spots, should be bright ☀️', () => {
    expect(lights.point[1]).toBeGreaterThan(1);
  });
});
