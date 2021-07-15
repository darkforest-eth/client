# Class: ShaderMixins

[Frontend/Renderers/GameRenderer/WebGL/ShaderMixins](../modules/Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.md).ShaderMixins

these are 'includes' that you can add into shader template strings as in `${include}`

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#constructor)

### Properties

- [PI](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#pi)
- [arcTan](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#arctan)
- [blend](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#blend)
- [desaturate](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#desaturate)
- [fade](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#fade)
- [hueShift](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#hueshift)
- [invertBrightness](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#invertbrightness)
- [invertColors](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#invertcolors)
- [mod2pi](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#mod2pi)
- [modFloat](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#modfloat)
- [noiseVec3](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#noisevec3)
- [radAtAngle](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#radatangle)
- [seededRandom](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#seededrandom)
- [seededRandomVec2](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#seededrandomvec2)
- [simplex4](Frontend_Renderers_GameRenderer_WebGL_ShaderMixins.ShaderMixins.md#simplex4)

## Constructors

### constructor

• **new ShaderMixins**()

## Properties

### PI

▪ `Static` **PI**: `string`

---

### arcTan

▪ `Static` **arcTan**: `string`

Good atan that returns [0, 2Pi)

---

### blend

▪ `Static` **blend**: `string`

1 minus source alpha blend mode

---

### desaturate

▪ `Static` **desaturate**: `string`

---

### fade

▪ `Static` **fade**: `string`

Fade out the last `tail * 100` percent of `value` to 0 - a plateau with a steep dropoff

---

### hueShift

▪ `Static` **hueShift**: `string`

---

### invertBrightness

▪ `Static` **invertBrightness**: `string`

---

### invertColors

▪ `Static` **invertColors**: `string`

---

### mod2pi

▪ `Static` **mod2pi**: `string`

---

### modFloat

▪ `Static` **modFloat**: `string`

---

### noiseVec3

▪ `Static` **noiseVec3**: `string`

---

### radAtAngle

▪ `Static` **radAtAngle**: `string`

---

### seededRandom

▪ `Static` **seededRandom**: `string`

---

### seededRandomVec2

▪ `Static` **seededRandomVec2**: `string`

---

### simplex4

▪ `Static` **simplex4**: `string`

4d simplex noise - `snoise(vec4)`, seems to return `[-1, 1]`
https://gist.github.com/patriciogonzalezvivo/670c22f3966e662d2f83
