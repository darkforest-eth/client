# Module: Frontend/Pages/GifMaker

## Table of contents

### Variables

- [GIF_ARTIFACT_COLOR](frontend_pages_gifmaker.md#gif_artifact_color)

### Functions

- [GifMaker](frontend_pages_gifmaker.md#gifmaker)

## Variables

### GIF_ARTIFACT_COLOR

• `Const` **GIF_ARTIFACT_COLOR**: [_APP_BACKGROUND_](../enums/backend_gamelogic_artifactutils.artifactfilecolor.md#app_background)

## Functions

### GifMaker

▸ **GifMaker**(): _Element_

Entrypoint for gif and sprite generation, accessed via `yarn run gifs`.
Wait a second or so for the textures to get loaded, then click the buttons to download files as a zip.
gifs are saved as 60fps webm, and can take a while - open the console to see progress (logged verbosely)

**Returns:** _Element_
