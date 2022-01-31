# Module: Frontend/Pages/GifMaker

## Table of contents

### Variables

- [GIF_ARTIFACT_COLOR](Frontend_Pages_GifMaker.md#gif_artifact_color)

### Functions

- [GifMaker](Frontend_Pages_GifMaker.md#gifmaker)

## Variables

### GIF_ARTIFACT_COLOR

• `Const` **GIF_ARTIFACT_COLOR**: [`APP_BACKGROUND`](../enums/Backend_GameLogic_ArtifactUtils.ArtifactFileColor.md#app_background)

## Functions

### GifMaker

▸ **GifMaker**(): `Element`

Entrypoint for gif and sprite generation, accessed via `yarn run gifs`.
Wait a second or so for the textures to get loaded, then click the buttons to download files as a zip.
gifs are saved as 60fps webm, and can take a while - open the console to see progress (logged verbosely)

#### Returns

`Element`
