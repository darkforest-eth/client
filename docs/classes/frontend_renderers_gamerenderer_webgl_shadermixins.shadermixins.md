# Class: ShaderMixins

[Frontend/Renderers/GameRenderer/WebGL/ShaderMixins](../modules/frontend_renderers_gamerenderer_webgl_shadermixins.md).ShaderMixins

these are 'includes' that you can add into shader template strings as in `${include}`

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#constructor)

### Properties

- [PI](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#pi)
- [arcTan](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#arctan)
- [blend](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#blend)
- [desaturate](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#desaturate)
- [fade](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#fade)
- [hueShift](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#hueshift)
- [invertBrightness](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#invertbrightness)
- [invertColors](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#invertcolors)
- [mod2pi](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#mod2pi)
- [modFloat](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#modfloat)
- [noiseVec3](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#noisevec3)
- [radAtAngle](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#radatangle)
- [seededRandom](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#seededrandom)
- [seededRandomVec2](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#seededrandomvec2)
- [simplex4](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md#simplex4)

## Constructors

### constructor

\+ **new ShaderMixins**(): [_ShaderMixins_](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md)

**Returns:** [_ShaderMixins_](frontend_renderers_gamerenderer_webgl_shadermixins.shadermixins.md)

## Properties

### PI

▪ `Static` **PI**: _string_

---

### arcTan

▪ `Static` **arcTan**: _string_

Good atan that returns [0, 2Pi)

---

### blend

▪ `Static` **blend**: _string_

1 minus source alpha blend mode

---

### desaturate

▪ `Static` **desaturate**: _string_

---

### fade

▪ `Static` **fade**: _string_

Fade out the last `tail * 100` percent of `value` to 0 - a plateau with a steep dropoff

---

### hueShift

▪ `Static` **hueShift**: _string_

---

### invertBrightness

▪ `Static` **invertBrightness**: _string_

---

### invertColors

▪ `Static` **invertColors**: _string_

---

### mod2pi

▪ `Static` **mod2pi**: _string_

---

### modFloat

▪ `Static` **modFloat**: _string_

---

### noiseVec3

▪ `Static` **noiseVec3**: _string_

---

### radAtAngle

▪ `Static` **radAtAngle**: _string_

---

### seededRandom

▪ `Static` **seededRandom**: _string_

---

### seededRandomVec2

▪ `Static` **seededRandomVec2**: _string_

---

### simplex4

▪ `Static` **simplex4**: _string_

4d simplex noise - `snoise(vec4)`, seems to return `[-1, 1]`
https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
