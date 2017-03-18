///<reference path="box2d.d.ts"/>
declare module PIXI {

    export var game: Phaser.Game;
    export var WEBGL_RENDERER: number;
    export var CANVAS_RENDERER: number;
    export var VERSION: string;

    export enum blendModes {

        NORMAL,
        ADD,
        MULTIPLY,
        SCREEN,
        OVERLAY,
        DARKEN,
        LIGHTEN,
        COLOR_DODGE,
        COLOR_BURN,
        HARD_LIGHT,
        SOFT_LIGHT,
        DIFFERENCE,
        EXCLUSION,
        HUE,
        SATURATION,
        COLOR,
        LUMINOSITY

    }

    export enum scaleModes {

        DEFAULT,
        LINEAR,
        NEAREST

    }

    export var defaultRenderOptions: PixiRendererOptions;

    export var INTERACTION_REQUENCY: number;
    export var AUTO_PREVENT_DEFAULT: boolean;

    export var PI_2: number;
    export var RAD_TO_DEG: number;
    export var DEG_TO_RAD: number;

    export var RETINA_PREFIX: string;
    export var identityMatrix: Matrix;
    export var glContexts: WebGLRenderingContext[];
    export var instances: any[];

    export var TextureSilentFail: boolean;
    export var BitmapText: { fonts: {} };

    export function isPowerOfTwo(width: number, height: number): boolean;

    export function rgb2hex(rgb: number[]): string;
    export function hex2rgb(hex: string): number[];

    export function autoDetectRenderer(width?: number, height?: number, options?: PixiRendererOptions): PixiRenderer;
    export function autoDetectRecommendedRenderer(width?: number, height?: number, options?: PixiRendererOptions): PixiRenderer;

    export function canUseNewCanvasBlendModes(): boolean;
    export function getNextPowerOfTwo(value: number): number;

    export function AjaxRequest(): XMLHttpRequest;

    export function CompileFragmentShader(gl: WebGLRenderingContext, shaderSrc: string[]): any;
    export function CompileProgram(gl: WebGLRenderingContext, vertexSrc: string[], fragmentSrc: string[]): any;


    export interface IEventCallback {
        (e?: IEvent): void;
    }

    export interface IEvent {
        type: string;
        content: any;
    }

    export interface HitArea {
        contains(x: number, y: number): boolean;
    }

    export interface IInteractionDataCallback {
        (interactionData: InteractionData): void;
    }

    export interface PixiRenderer {

        autoResize: boolean;
        clearBeforeRender: boolean;
        height: number;
        resolution: number;
        transparent: boolean;
        type: number;
        view: HTMLCanvasElement;
        width: number;

        destroy(): void;
        render(stage: DisplayObjectContainer): void;
        resize(width: number, height: number): void;

    }

    export interface PixiRendererOptions {

        autoResize?: boolean;
        antialias?: boolean;
        clearBeforeRender?: boolean;
        preserveDrawingBuffer?: boolean;
        resolution?: number;
        transparent?: boolean;
        view?: HTMLCanvasElement;

    }

    export interface BitmapTextStyle {

        font?: string;
        align?: string;
        tint?: string;

    }

    export interface TextStyle {

        align?: string;
        dropShadow?: boolean;
        dropShadowColor?: string;
        dropShadowAngle?: number;
        dropShadowDistance?: number;
        fill?: string;
        font?: string;
        lineJoin?: string;
        stroke?: string;
        strokeThickness?: number;
        wordWrap?: boolean;
        wordWrapWidth?: number;

    }

    export interface Loader {

        load(): void;

    }

    export interface MaskData {

        alpha: number;
        worldTransform: number[];

    }

    export interface RenderSession {

        context: CanvasRenderingContext2D;
        maskManager: CanvasMaskManager;
        scaleMode: scaleModes;
        smoothProperty: string;
        roundPixels: boolean;

    }

    export interface ShaderAttribute {
        // TODO: Find signature of shader attributes
    }

    export interface FilterBlock {

        visible: boolean;
        renderable: boolean;

    }

    export class AbstractFilter {

        constructor(fragmentSrc: string | string[], uniforms: any);

        dirty: boolean;
        padding: number;
        uniforms: any;
        fragmentSrc: string | string[];

        apply(frameBuffer: WebGLFramebuffer): void;
        syncUniforms(): void;

    }

    export class AlphaMaskFilter extends AbstractFilter {

        constructor(texture: Texture);

        map: Texture;

        onTextureLoaded(): void;

    }

    export class AsciiFilter extends AbstractFilter {

        size: number;

    }

    export class AssetLoader implements Mixin {

        assetURLs: string[];
        crossorigin: boolean;
        loadersByType: { [key: string]: Loader };

        constructor(assetURLs: string[], crossorigin: boolean);

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;


    }

    export class AtlasLoader implements Mixin {

        url: string;
        baseUrl: string;
        crossorigin: boolean;
        loaded: boolean;

        constructor(url: string, crossorigin: boolean);

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;

    }


    /**
    * A texture stores the information that represents an image. All textures have a base texture.
    */
    export class BaseTexture implements Mixin {


        /**
        * Helper function that creates a base texture from the given canvas element.
        * 
        * @param canvas The canvas element source of the texture
        * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
        * @param resolution the resolution of the texture (for HiDPI displays)
        */
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: scaleModes): BaseTexture;


        /**
        * A texture stores the information that represents an image. All textures have a base texture.
        * 
        * @param source the source object (image or canvas)
        * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
        * @param resolution the resolution of the texture (for HiDPI displays)
        */
        constructor(source: HTMLImageElement, scaleMode: scaleModes);

        /**
        * A texture stores the information that represents an image. All textures have a base texture.
        * 
        * @param source the source object (image or canvas)
        * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
        * @param resolution the resolution of the texture (for HiDPI displays)
        */
        constructor(source: HTMLCanvasElement, scaleMode: scaleModes);


        /**
        * [read-only] The height of the base texture set when the image has loaded
        */
        height: number;

        /**
        * [read-only] Set to true once the base texture has loaded
        */
        hasLoaded: boolean;

        /**
        * Set this to true if a mipmap of this texture needs to be generated. This value needs to be set before the texture is used
        * Also the texture must be a power of two size to work
        */
        mipmap: boolean;

        /**
        * Controls if RGB channels should be pre-multiplied by Alpha  (WebGL only)
        * Default: true
        */
        premultipliedAlpha: boolean;

        /**
        * The Resolution of the texture.
        */
        resolution: number;

        /**
        * The scale mode to apply when scaling this texture
        * Default: PIXI.scaleModes.LINEAR
        */
        scaleMode: scaleModes;

        /**
        * A BaseTexture can be set to skip the rendering phase in the WebGL Sprite Batch.
        * 
        * You may want to do this if you have a parent Sprite with no visible texture (i.e. uses the internal `__default` texture)
        * that has children that you do want to render, without causing a batch flush in the process.
        */
        skipRender: boolean;

        /**
        * The image source that is used to create the texture.
        */
        source: HTMLImageElement;

        /**
        * The multi texture batching index number.
        */
        textureIndex: number;

        /**
        * [read-only] The width of the base texture set when the image has loaded
        */
        width: number;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        /**
        * Forces this BaseTexture to be set as loaded, with the given width and height.
        * Then calls BaseTexture.dirty.
        * Important for when you don't want to modify the source object by forcing in `complete` or dimension properties it may not have.
        * 
        * @param width - The new width to force the BaseTexture to be.
        * @param height - The new height to force the BaseTexture to be.
        */
        forceLoaded(width: number, height: number): void;

        /**
        * Destroys this base texture
        */
        destroy(): void;

        /**
        * Sets all glTextures to be dirty.
        */
        dirty(): void;

        /**
        * Removes the base texture from the GPU, useful for managing resources on the GPU.
        * Atexture is still 100% usable and will simply be reuploaded if there is a sprite on screen that is using it.
        */
        unloadFromGPU(): void;

    }

    export class BitmapFontLoader implements Mixin {

        constructor(url: string, crossorigin: boolean);

        baseUrl: string;
        crossorigin: boolean;
        texture: Texture;
        url: string;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;

    }

    export class BlurFilter extends AbstractFilter {

        blur: number;
        blurX: number;
        blurY: number;

    }

    export class BlurXFilter extends AbstractFilter {

        blur: number;

    }

    export class BlurYFilter extends AbstractFilter {

        blur: number;

    }


    /**
    * Creates a Canvas element of the given size.
    */
    export class CanvasBuffer {


        /**
        * Creates a Canvas element of the given size.
        * 
        * @param width the width for the newly created canvas
        * @param height the height for the newly created canvas
        */
        constructor(width: number, height: number);


        /**
        * The Canvas object that belongs to this CanvasBuffer.
        */
        canvas: HTMLCanvasElement;

        /**
        * A CanvasRenderingContext2D object representing a two-dimensional rendering context.
        */
        context: CanvasRenderingContext2D;

        /**
        * The height of the Canvas in pixels.
        */
        height: number;

        /**
        * The width of the Canvas in pixels.
        */
        width: number;


        /**
        * Frees the canvas up for use again.
        */
        destroy(): void;

        /**
        * Clears the canvas that was created by the CanvasBuffer class.
        */
        clear(): void;

        /**
        * Resizes the canvas to the specified width and height.
        * 
        * @param width the new width of the canvas
        * @param height the new height of the canvas
        */
        resize(width: number, height: number): void;

    }

    export class CanvasPool {

        static create(parent: HTMLElement, width?: number, height?: number): HTMLCanvasElement;
        static getFirst(): HTMLCanvasElement;
        static remove(parent: HTMLElement): void;
        static removeByCanvas(canvas: HTMLCanvasElement): HTMLCanvasElement;
        static getTotal(): number;
        static getFree(): number;

    }


    /**
    * A set of functions used to handle masking.
    */
    export class CanvasMaskManager {


        /**
        * This method adds it to the current stack of masks.
        * 
        * @param maskData the maskData that will be pushed
        * @param renderSession The renderSession whose context will be used for this mask manager.
        */
        pushMask(maskData: MaskData, renderSession: RenderSession): void;

        /**
        * Restores the current drawing context to the state it was before the mask was applied.
        * 
        * @param renderSession The renderSession whose context will be used for this mask manager.
        */
        popMask(renderSession: RenderSession): void;

    }


    /**
    * The CanvasRenderer draws the Stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
    * Don't forget to add the CanvasRenderer.view to your DOM or you will not see anything :)
    */
    export class CanvasRenderer implements PixiRenderer {


        /**
        * The CanvasRenderer draws the Stage and all its content onto a 2d canvas. This renderer should be used for browsers that do not support webGL.
        * Don't forget to add the CanvasRenderer.view to your DOM or you will not see anything :)
        * 
        * @param game A reference to the Phaser Game instance
        */
        constructor(game: Phaser.Game);

        game: Phaser.Game;

        /**
        * The renderer type.
        */
        type: number;

        /**
        * The resolution of the canvas.
        */
        resolution: number;

        /**
        * This sets if the CanvasRenderer will clear the canvas or not before the new render pass.
        * If the Stage is NOT transparent Pixi will use a canvas sized fillRect operation every frame to set the canvas background color.
        * If the Stage is transparent Pixi will use clearRect to clear the canvas every frame.
        * Disable this by setting this to false. For example if your game has a canvas filling background image you often don't need this set.
        */
        clearBeforeRender: boolean;

        /**
        * Whether the render view is transparent
        */
        transparent: boolean;

        /**
        * Whether the render view should be resized automatically
        */
        autoResize: boolean;

        /**
        * The width of the canvas view
        * Default: 800
        */
        width: number;

        /**
        * The height of the canvas view
        * Default: 600
        */
        height: number;

        /**
        * The canvas element that everything is drawn to.
        */
        view: HTMLCanvasElement;

        /**
        * The canvas 2d context that everything is drawn with
        */
        context: CanvasRenderingContext2D;

        /**
        * Boolean flag controlling canvas refresh.
        */
        refresh: boolean;

        /**
        * Internal var.
        */
        count: number;
        maskManager: CanvasMaskManager;

        /**
        * The render session is just a bunch of parameter used for rendering
        */
        renderSession: RenderSession;


        /**
        * Renders the DisplayObjectContainer, usually the Phaser.Stage, to this canvas view.
        * 
        * @param root The root element to be rendered.
        */
        render(stage: DisplayObjectContainer): void;

        /**
        * Resizes the canvas view to the specified width and height
        * 
        * @param width the new width of the canvas view
        * @param height the new height of the canvas view
        */
        resize(width: number, height: number): void;

        /**
        * Removes everything from the renderer and optionally removes the Canvas DOM element.
        * 
        * @param removeView Removes the Canvas element from the DOM. - Default: true
        */
        destroy(removeView?: boolean): void;

    }


    /**
    * Utility methods for Sprite/Texture tinting.
    */
    export class CanvasTinter {


        /**
        * Basically this method just needs a sprite and a color and tints the sprite with the given color.
        * 
        * @param sprite the sprite to tint
        * @param color the color to use to tint the sprite with
        * @return The tinted canvas
        */
        static getTintedTexture(sprite: Sprite, color: number): HTMLCanvasElement;

        /**
        * Tint a texture using the "multiply" operation.
        * 
        * @param texture the texture to tint
        * @param color the color to use to tint the sprite with
        * @param canvas the current canvas
        */
        static tintWithMultiply(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static tintWithOverlay(texture: Texture, color: number, canvas: HTMLCanvasElement): void;
        static tintWithPerPixel(texture: Texture, color: number, canvas: HTMLCanvasElement): void;

        static canUseMultiply: boolean;
        static tintMethod: any;

    }

    export class Circle implements HitArea {

        constructor(x: number, y: number, radius: number);

        x: number;
        y: number;
        radius: number;

        clone(): Circle;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }

    export class ColorMatrixFilter extends AbstractFilter {

        constructor();

        matrix: number[];

    }

    export class ColorStepFilter extends AbstractFilter {

        step: number;

    }

    export class ConvolutionFilter extends AbstractFilter {

        constructor(matrix: number[], width: number, height: number);

        matrix: Matrix;
        width: number;
        height: number;

    }

    export class CrossHatchFilter extends AbstractFilter {

        blur: number;

    }

    export class DisplacementFilter extends AbstractFilter {

        constructor(texture: Texture);

        map: Texture;
        offset: Point;
        scale: Point;

    }

    export class DotScreenFilter extends AbstractFilter {

        angle: number;
        scale: Point;

    }


    /**
    * The base class for all objects that are rendered. Contains properties for position, scaling,
    * rotation, masks and cache handling.
    * 
    * This is an abstract class and should not be used on its own, rather it should be extended.
    * 
    * It is used internally by the likes of PIXI.Sprite.
    */
    export class DisplayObject {


        /**
        * The alpha value of this DisplayObject. A value of 1 is fully opaque. A value of 0 is transparent.
        * Please note that an object with an alpha value of 0 is skipped during the render pass.
        * 
        * The value of this property does not reflect any alpha values set further up the display list.
        * To obtain that value please see the `worldAlpha` property.
        */
        alpha: number;
        buttonMode: boolean;

        /**
        * Sets if this DisplayObject should be cached as a bitmap.
        * 
        * When invoked it will take a snapshot of the DisplayObject, as it is at that moment, and store it
        * in a RenderTexture. This is then used whenever this DisplayObject is rendered. It can provide a
        * performance benefit for complex, but static, DisplayObjects. I.e. those with lots of children.
        * 
        * Cached Bitmaps do not track their parents. If you update a property of this DisplayObject, it will not
        * re-generate the cached bitmap automatically. To do that you need to call `DisplayObject.updateCache`.
        * 
        * To remove a cached bitmap, set this property to `null`.
        */
        cacheAsBitmap: boolean;
        defaultCursor: string;

        /**
        * The rectangular area used by filters when rendering a shader for this DisplayObject.
        */
        filterArea: Rectangle;

        /**
        * Sets the filters for this DisplayObject. This is a WebGL only feature, and is ignored by the Canvas
        * Renderer. A filter is a shader applied to this DisplayObject. You can modify the placement of the filter
        * using `DisplayObject.filterArea`.
        * 
        * To remove filters, set this property to `null`.
        * 
        * Note: You cannot have a filter set, and a MULTIPLY Blend Mode active, at the same time. Setting a
        * filter will reset this DisplayObjects blend mode to NORMAL.
        */
        filters: AbstractFilter[];

        /**
        * This is the defined area that will pick up mouse / touch events. It is null by default.
        * Setting it is a neat way of optimising the hitTest function that the interactionManager will use (as it will not need to hit test all the children)
        */
        hitArea: HitArea;
        interactive: boolean;

        /**
        * Sets a mask for this DisplayObject. A mask is an instance of a Graphics object.
        * When applied it limits the visible area of this DisplayObject to the shape of the mask.
        * Under a Canvas renderer it uses shape clipping. Under a WebGL renderer it uses a Stencil Buffer.
        * To remove a mask, set this property to `null`.
        */
        mask: Graphics;

        /**
        * The parent DisplayObjectContainer that this DisplayObject is a child of.
        * All DisplayObjects must belong to a parent in order to be rendered.
        * The root parent is the Stage object. This property is set automatically when the
        * DisplayObject is added to, or removed from, a DisplayObjectContainer.
        */
        parent: DisplayObjectContainer;

        /**
        * The pivot point of this DisplayObject that it rotates around. The values are expressed
        * in pixel values.
        */
        pivot: Point;

        /**
        * The coordinates, in pixels, of this DisplayObject, relative to its parent container.
        * 
        * The value of this property does not reflect any positioning happening further up the display list.
        * To obtain that value please see the `worldPosition` property.
        */
        position: Point;

        /**
        * Should this DisplayObject be rendered by the renderer? An object with a renderable value of
        * `false` is skipped during the render pass.
        */
        renderable: boolean;

        /**
        * The rotation of this DisplayObject. The value is given, and expressed, in radians, and is based on
        * a right-handed orientation.
        * 
        * The value of this property does not reflect any rotation happening further up the display list.
        * To obtain that value please see the `worldRotation` property.
        */
        rotation: number;

        /**
        * The scale of this DisplayObject. A scale of 1:1 represents the DisplayObject
        * at its default size. A value of 0.5 would scale this DisplayObject by half, and so on.
        * 
        * The value of this property does not reflect any scaling happening further up the display list.
        * To obtain that value please see the `worldScale` property.
        */
        scale: Point;
        stage: DisplayObjectContainer;

        /**
        * The visibility of this DisplayObject. A value of `false` makes the object invisible.
        * A value of `true` makes it visible. Please note that an object with a visible value of
        * `false` is skipped during the render pass. Equally a DisplayObject with visible false will
        * not render any of its children.
        * 
        * The value of this property does not reflect any visible values set further up the display list.
        * To obtain that value please see the `worldVisible` property.
        */
        visible: boolean;

        /**
        * The multiplied alpha value of this DisplayObject. A value of 1 is fully opaque. A value of 0 is transparent.
        * This value is the calculated total, based on the alpha values of all parents of this DisplayObjects
        * in the display list.
        * 
        * To obtain, and set, the local alpha value, see the `alpha` property.
        * 
        * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until
        * that happens this property will contain values based on the previous frame. Be mindful of this if
        * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
        */
        worldAlpha: number;

        /**
        * The coordinates, in pixels, of this DisplayObject within the world.
        * 
        * This property contains the calculated total, based on the positions of all parents of this
        * DisplayObject in the display list.
        * 
        * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until
        * that happens this property will contain values based on the previous frame. Be mindful of this if
        * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
        */
        worldPosition: Point;

        /**
        * The global scale of this DisplayObject.
        * 
        * This property contains the calculated total, based on the scales of all parents of this
        * DisplayObject in the display list.
        * 
        * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until
        * that happens this property will contain values based on the previous frame. Be mindful of this if
        * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
        */
        worldScale: Point;

        /**
        * The current transform of this DisplayObject.
        * 
        * This property contains the calculated total, based on the transforms of all parents of this
        * DisplayObject in the display list.
        * 
        * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until
        * that happens this property will contain values based on the previous frame. Be mindful of this if
        * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
        */
        worldTransform: Matrix;

        /**
        * The rotation, in radians, of this DisplayObject.
        * 
        * This property contains the calculated total, based on the rotations of all parents of this
        * DisplayObject in the display list.
        * 
        * Note: This property is only updated at the end of the `updateTransform` call, once per render. Until
        * that happens this property will contain values based on the previous frame. Be mindful of this if
        * accessing this property outside of the normal game flow, i.e. from an asynchronous event callback.
        */
        worldRotation: number;

        /**
        * Indicates if this DisplayObject is visible, based on it, and all of its parents, `visible` property values.
        */
        worldVisible: boolean;

        /**
        * The horizontal position of the DisplayObject, in pixels, relative to its parent.
        * If you need the world position of the DisplayObject, use `DisplayObject.worldPosition` instead.
        */
        x: number;

        /**
        * The vertical position of the DisplayObject, in pixels, relative to its parent.
        * If you need the world position of the DisplayObject, use `DisplayObject.worldPosition` instead.
        */
        y: number;

        click(e: InteractionData): void;
        displayObjectUpdateTransform(parent?: DisplayObjectContainer): void;
        generateTexture(resolution?: number, scaleMode?: number, renderer?: PixiRenderer | number): RenderTexture;
        mousedown(e: InteractionData): void;
        mouseout(e: InteractionData): void;
        mouseover(e: InteractionData): void;
        mouseup(e: InteractionData): void;
        mousemove(e: InteractionData): void;
        mouseupoutside(e: InteractionData): void;
        rightclick(e: InteractionData): void;
        rightdown(e: InteractionData): void;
        rightup(e: InteractionData): void;
        rightupoutside(e: InteractionData): void;
        setStageReference(stage: DisplayObjectContainer): void;
        tap(e: InteractionData): void;
        toGlobal(position: Point): Point;
        toLocal(position: Point, from: DisplayObject): Point;
        touchend(e: InteractionData): void;
        touchendoutside(e: InteractionData): void;
        touchstart(e: InteractionData): void;
        touchmove(e: InteractionData): void;
        updateTransform(parent?: DisplayObjectContainer): void;

    }


    /**
    * A DisplayObjectContainer represents a collection of display objects.
    * It is the base class of all display objects that act as a container for other objects.
    */
    export class DisplayObjectContainer extends DisplayObject {


        /**
        * A DisplayObjectContainer represents a collection of display objects.
        * It is the base class of all display objects that act as a container for other objects.
        */
        constructor();


        /**
        * [read-only] The array of children of this container.
        */
        children: DisplayObject[];

        /**
        * The height of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
        */
        height: number;

        /**
        * The width of the displayObjectContainer, setting this will actually modify the scale to achieve the value set
        */
        width: number;

        /**
        * If `ignoreChildInput`  is `false` it will allow this objects _children_ to be considered as valid for Input events.
        * 
        * If this property is `true` then the children will _not_ be considered as valid for Input events.
        * 
        * Note that this property isn't recursive: only immediate children are influenced, it doesn't scan further down.
        */
        ignoreChildInput: boolean;


        /**
        * Adds a child to the container.
        * 
        * @param child The DisplayObject to add to the container
        * @return The child that was added.
        */
        addChild(child: DisplayObject): DisplayObject;

        /**
        * Adds a child to the container at a specified index. If the index is out of bounds an error will be thrown
        * 
        * @param child The child to add
        * @param index The index to place the child in
        * @return The child that was added.
        */
        addChildAt(child: DisplayObject, index: number): DisplayObject;

        /**
        * Retrieves the global bounds of the displayObjectContainer as a rectangle. The bounds calculation takes all visible children into consideration.
        * 
        * @param targetCoordinateSpace Returns a rectangle that defines the area of the display object relative to the coordinate system of the targetCoordinateSpace object.
        * @return The rectangular bounding area
        */
        getBounds(targetCoordinateSpace?: DisplayObject | Matrix): Rectangle;

        /**
        * Returns the child at the specified index
        * 
        * @param index The index to get the child from
        * @return The child at the given index, if any.
        */
        getChildAt(index: number): DisplayObject;

        /**
        * Returns the index position of a child DisplayObject instance
        * 
        * @param child The DisplayObject instance to identify
        * @return The index position of the child display object to identify
        */
        getChildIndex(child: DisplayObject): number;

        /**
        * Retrieves the non-global local bounds of the displayObjectContainer as a rectangle without any transformations. The calculation takes all visible children into consideration.
        * @return The rectangular bounding area
        */
        getLocalBounds(): Rectangle;

        /**
        * Removes a child from the container.
        * 
        * @param child The DisplayObject to remove
        * @return The child that was removed.
        */
        removeChild(child: DisplayObject): DisplayObject;

        /**
        * Removes a child from the specified index position.
        * 
        * @param index The index to get the child from
        * @return The child that was removed.
        */
        removeChildAt(index: number): DisplayObject;

        /**
        * Removes all children from this container that are within the begin and end indexes.
        * 
        * @param beginIndex The beginning position. Default value is 0.
        * @param endIndex The ending position. Default value is size of the container.
        */
        removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[];
        removeStageReference(): void;

        /**
        * Changes the position of an existing child in the display object container
        * 
        * @param child The child DisplayObject instance for which you want to change the index number
        * @param index The resulting index number for the child display object
        */
        setChildIndex(child: DisplayObject, index: number): void;

        /**
        * Swaps the position of 2 Display Objects within this container.
        * 
        * @param child -
        * @param child2 -
        */
        swapChildren(child: DisplayObject, child2: DisplayObject): void;

        /**
        * Determines whether the specified display object is a child of the DisplayObjectContainer instance or the instance itself.
        * 
        * @param child -
        */
        contains(child: DisplayObject): boolean;

    }

    export class Ellipse implements HitArea {

        constructor(x: number, y: number, width: number, height: number);

        x: number;
        y: number;
        width: number;
        height: number;

        clone(): Ellipse;
        contains(x: number, y: number): boolean;
        getBounds(): Rectangle;

    }

    export class Event {

        constructor(target: any, name: string, data: any);

        target: any;
        type: string;
        data: any;
        timeStamp: number;

        stopPropagation(): void;
        preventDefault(): void;
        stopImmediatePropagation(): void;

    }

    export class EventTarget {

        static mixin(obj: any): void;

    }

    export class FilterTexture {


        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        * @param width the horizontal range of the filter
        * @param height the vertical range of the filter
        * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
        */
        constructor(gl: WebGLRenderingContext, width: number, height: number, scaleMode: scaleModes);

        fragmentSrc: string[];
        frameBuffer: WebGLFramebuffer;
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        scaleMode: number;
        texture: WebGLTexture;


        /**
        * Clears the filter texture.
        */
        clear(): void;

        /**
        * Resizes the texture to the specified width and height
        * 
        * @param width the new width of the texture
        * @param height the new height of the texture
        */
        resize(width: number, height: number): void;

        /**
        * Destroys the filter texture.
        */
        destroy(): void;

    }

    export class GraphicsData {

        constructor(lineWidth?: number, lineColor?: number, lineAlpha?: number, fillColor?: number, fillAlpha?: number, fill?: boolean, shape?: any);

        lineWidth: number;
        lineColor: number;
        lineAlpha: number;
        fillColor: number;
        fillAlpha: number;
        fill: boolean;
        shape: any;
        type: number;

    }

    export class Graphics extends DisplayObjectContainer {

        static POLY: number;
        static RECT: number;
        static CIRC: number;
        static ELIP: number;
        static RREC: number;

        blendMode: number;
        boundsPadding: number;
        fillAlpha: number;
        isMask: boolean;
        lineWidth: number;
        lineColor: number;
        tint: number;
        worldAlpha: number;

        arc(cx: number, cy: number, radius: number, startAngle: number, endAngle: number, anticlockwise: boolean): Graphics;
        arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): Graphics;
        beginFill(color?: number, alpha?: number): Graphics;
        bezierCurveTo(cpX: number, cpY: number, cpX2: number, cpY2: number, toX: number, toY: number): Graphics;
        clear(): Graphics;
        destroyCachedSprite(): void;
        drawCircle(x: number, y: number, diameter: number): Graphics;
        drawEllipse(x: number, y: number, width: number, height: number): Graphics;
        drawPolygon(...path: any[]): Graphics;
        drawRect(x: number, y: number, width: number, height: number): Graphics;
        drawRoundedRect(x: number, y: number, width: number, height: number, radius: number): Graphics;
        drawShape(shape: Circle): GraphicsData;
        drawShape(shape: Rectangle): GraphicsData;
        drawShape(shape: Ellipse): GraphicsData;
        drawShape(shape: Polygon): GraphicsData;
        endFill(): Graphics;
        generateTexture(resolution?: number, scaleMode?: number, padding?: number): RenderTexture;
        lineStyle(lineWidth?: number, color?: number, alpha?: number): Graphics;
        lineTo(x: number, y: number): Graphics;
        moveTo(x: number, y: number): Graphics;
        quadraticCurveTo(cpX: number, cpY: number, toX: number, toY: number): Graphics;

    }

    export class GrayFilter extends AbstractFilter {

        gray: number;

    }

    export class ImageLoader implements Mixin {

        constructor(url: string, crossorigin?: boolean);

        texture: Texture;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;
        loadFramedSpriteSheet(frameWidth: number, frameHeight: number, textureName: string): void;

    }

    export class InteractionData {

        global: Point;
        target: Sprite;
        originalEvent: Event;

        getLocalPosition(displayObject: DisplayObject, point?: Point, globalPos?: Point): Point;

    }

    export class InteractionManager {

        currentCursorStyle: string;
        last: number;
        mouse: InteractionData;
        mouseOut: boolean;
        mouseoverEnabled: boolean;
        onMouseMove: Function;
        onMouseDown: Function;
        onMouseOut: Function;
        onMouseUp: Function;
        onTouchStart: Function;
        onTouchEnd: Function;
        onTouchMove: Function;
        pool: InteractionData[];
        resolution: number;
        stage: DisplayObjectContainer;
        touches: { [id: string]: InteractionData };

        constructor(stage: DisplayObjectContainer);
    }

    export class InvertFilter extends AbstractFilter {

        invert: number;

    }

    export class JsonLoader implements Mixin {

        constructor(url: string, crossorigin?: boolean);

        baseUrl: string;
        crossorigin: boolean;
        loaded: boolean;
        url: string;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;

    }

    export class Matrix {

        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;

        append(matrix: Matrix): Matrix;
        apply(pos: Point, newPos: Point): Point;
        applyInverse(pos: Point, newPos: Point): Point;
        determineMatrixArrayType(): number[];
        identity(): Matrix;
        rotate(angle: number): Matrix;
        fromArray(array: number[]): void;
        translate(x: number, y: number): Matrix;
        toArray(transpose: boolean): number[];
        scale(x: number, y: number): Matrix;

    }

    export interface Mixin {

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

    }

    export class NoiseFilter extends AbstractFilter {

        noise: number;

    }

    export class NormalMapFilter extends AbstractFilter {

        map: Texture;
        offset: Point;
        scale: Point;

    }

    export class PixelateFilter extends AbstractFilter {

        size: number;

    }

    export interface IPixiShader {

        fragmentSrc: string[];
        gl: WebGLRenderingContext;
        program: WebGLProgram;
        vertexSrc: string[];

        destroy(): void;
        init(): void;

    }

    export class PixiShader implements IPixiShader {


        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        */
        constructor(gl: WebGLRenderingContext);


        /**
        * Uniform attributes cache.
        */
        attributes: ShaderAttribute[];

        /**
        * The Default Vertex shader source.
        */
        defaultVertexSrc: string[];

        /**
        * A dirty flag
        */
        dirty: boolean;

        /**
        * A local flag
        */
        firstRun: boolean;

        /**
        * A local texture counter for multi-texture shaders.
        */
        textureCount: number;

        /**
        * The fragment shader.
        */
        fragmentSrc: string[];
        gl: WebGLRenderingContext;

        /**
        * The WebGL program.
        */
        program: WebGLProgram;
        vertexSrc: string[];


        /**
        * Initialises a Sampler2D uniform (which may only be available later on after initUniforms once the texture has loaded)
        */
        initSampler2D(): void;

        /**
        * Initialises the shader uniform values.
        * 
        * Uniforms are specified in the GLSL_ES Specification: http://www.khronos.org/registry/webgl/specs/latest/1.0/
        * http://www.khronos.org/registry/gles/specs/2.0/GLSL_ES_Specification_1.0.17.pdf
        */
        initUniforms(): void;

        /**
        * Updates the shader uniform values.
        */
        syncUniforms(): void;


        /**
        * Destroys the shader.
        */
        destroy(): void;

        /**
        * Initialises the shader.
        */
        init(): void;

    }

    export class PixiFastShader implements IPixiShader {


        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        */
        constructor(gl: WebGLRenderingContext);


        /**
        * A local texture counter for multi-texture shaders.
        */
        textureCount: number;

        /**
        * The fragment shader.
        */
        fragmentSrc: string[];
        gl: WebGLRenderingContext;

        /**
        * The WebGL program.
        */
        program: WebGLProgram;

        /**
        * The vertex shader.
        */
        vertexSrc: string[];


        /**
        * Destroys the shader.
        */
        destroy(): void;

        /**
        * Initialises the shader.
        */
        init(): void;

    }

    export class PrimitiveShader implements IPixiShader {


        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        */
        constructor(gl: WebGLRenderingContext);

        /**
        * The fragment shader.
        */
        fragmentSrc: string[];
        gl: WebGLRenderingContext;

        /**
        * The WebGL program.
        */
        program: WebGLProgram;

        /**
        * The vertex shader.
        */
        vertexSrc: string[];


        /**
        * Destroys the shader.
        */
        destroy(): void;

        /**
        * Initialises the shader.
        */
        init(): void;

    }

    export class ComplexPrimitiveShader implements IPixiShader {


        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        */
        constructor(gl: WebGLRenderingContext);

        /**
        * The fragment shader.
        */
        fragmentSrc: string[];
        gl: WebGLRenderingContext;

        /**
        * The WebGL program.
        */
        program: WebGLProgram;

        /**
        * The vertex shader.
        */
        vertexSrc: string[];


        /**
        * Destroys the shader.
        */
        destroy(): void;

        /**
        * Initialises the shader.
        */
        init(): void;

    }

    export class StripShader implements IPixiShader {


        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        */
        constructor(gl: WebGLRenderingContext);

        /**
        * The fragment shader.
        */
        fragmentSrc: string[];
        gl: WebGLRenderingContext;

        /**
        * The WebGL program.
        */
        program: WebGLProgram;

        /**
        * The vertex shader.
        */
        vertexSrc: string[];


        /**
        * Destroys the shader.
        */
        destroy(): void;

        /**
        * Initialises the shader.
        */
        init(): void;

    }

    export class Point {

        constructor(x?: number, y?: number);

        x: number;
        y: number;

        clone(): Point;
        set(x: number, y: number): void;

    }

    export class Polygon implements HitArea {

        constructor(points: Point[]);
        constructor(points: number[]);
        constructor(...points: Point[]);
        constructor(...points: number[]);

        points: any[];

        clone(): Polygon;
        contains(x: number, y: number): boolean;

    }

    export class Rectangle implements HitArea {

        constructor(x?: number, y?: number, width?: number, height?: number);

        x: number;
        y: number;
        width: number;
        height: number;

        clone(): Rectangle;
        contains(x: number, y: number): boolean;

    }

    export class RGBSplitFilter extends AbstractFilter {

        red: Point;
        green: Point;
        blue: Point;

    }

    export class Rope extends Strip {

        points: Point[];
        vertices: number[];

        constructor(texture: Texture, points: Point[]);

        refresh(): void;
        setTexture(texture: Texture): void;

    }

    export class RoundedRectangle implements HitArea {

        constructor(x?: number, y?: number, width?: number, height?: number, radius?: number);

        x: number;
        y: number;
        width: number;
        height: number;
        radius: number;

        clone(): RoundedRectangle;
        contains(x: number, y: number): boolean;

    }

    export class SepiaFilter extends AbstractFilter {

        sepia: number;

    }

    export class SmartBlurFilter extends AbstractFilter {

        blur: number;

    }

    export class SpineLoader implements Mixin {

        url: string;
        crossorigin: boolean;
        loaded: boolean;

        constructor(url: string, crossOrigin: boolean);

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;

    }

    export class SpineTextureLoader {

        constructor(basePath: string, crossorigin: boolean);

        load(page: AtlasPage, file: string): void;
        unload(texture: BaseTexture): void;

    }


    /**
    * The Sprite object is the base for all textured objects that are rendered to the screen
    */
    export class Sprite extends DisplayObjectContainer {


        /**
        * The Sprite object is the base for all textured objects that are rendered to the screen
        * 
        * @param texture The texture for this sprite
        */
        constructor(texture: Texture);


        /**
        * The anchor sets the origin point of the texture.
        * The default is 0,0 this means the texture's origin is the top left
        * Setting than anchor to 0.5,0.5 means the textures origin is centered
        * Setting the anchor to 1,1 would mean the textures origin points will be the bottom right corner
        */
        anchor: Point;

        /**
        * The blend mode to be applied to the sprite. Set to PIXI.blendModes.NORMAL to remove any blend mode.
        * 
        * Warning: You cannot have a blend mode and a filter active on the same Sprite. Doing so will render the sprite invisible.
        * Default: PIXI.blendModes.NORMAL;
        */
        blendMode: blendModes;

        /**
        * Controls if this Sprite is processed by the core Phaser game loops and Group loops.
        * Default: true
        */
        exists: boolean;

        /**
        * The shader that will be used to render this Sprite.
        * Set to null to remove a current shader.
        * Default: null
        */
        shader: IPixiShader;

        /**
        * The texture that the sprite is using
        */
        texture: Texture;

        /**
        * The tint applied to the sprite. This is a hex value. A value of 0xFFFFFF will remove any tint effect.
        * Default: 0xFFFFFF
        */
        tint: number;


        /**
        * Sets the texture of the sprite. Be warned that this doesn't remove or destroy the previous
        * texture this Sprite was using.
        * 
        * @param texture The PIXI texture that is displayed by the sprite
        * @param destroy Call Texture.destroy on the current texture before replacing it with the new one?
        */
        setTexture(texture: Texture, destroyBase?: boolean): void;

    }

    export class SpriteBatch extends DisplayObjectContainer {

        constructor(texture?: Texture);

        ready: boolean;
        textureThing: Texture;

        initWebGL(gl: WebGLRenderingContext): void;

    }

    export class SpriteSheetLoader implements Mixin {

        constructor(url: string, crossorigin?: boolean);

        baseUrl: string;
        crossorigin: boolean;
        frames: any;
        texture: Texture;
        url: string;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;

        load(): void;

    }

    export class Strip extends DisplayObjectContainer {

        static DrawModes: {

            TRIANGLE_STRIP: number;
            TRIANGLES: number;

        };

        constructor(texture: Texture);

        blendMode: number;
        colors: number[];
        dirty: boolean;
        indices: number[];
        canvasPadding: number;
        texture: Texture;
        uvs: number[];
        vertices: number[];

        getBounds(matrix?: Matrix): Rectangle;

    }


    /**
    * A texture stores the information that represents an image or part of an image. It cannot be added
    * to the display list directly. Instead use it as the texture for a PIXI.Sprite. If no frame is provided then the whole image is used.
    */
    export class Texture implements Mixin {

        static emptyTexture: Texture;


        /**
        * Helper function that creates a new a Texture based on the given canvas element.
        * 
        * @param canvas The canvas element source of the texture
        * @param scaleMode See {{#crossLink "PIXI/scaleModes:property"}}PIXI.scaleModes{{/crossLink}} for possible values
        */
        static fromCanvas(canvas: HTMLCanvasElement, scaleMode?: scaleModes): Texture;


        /**
        * A texture stores the information that represents an image or part of an image. It cannot be added
        * to the display list directly. Instead use it as the texture for a PIXI.Sprite. If no frame is provided then the whole image is used.
        * 
        * @param baseTexture The base texture source to create the texture from
        * @param frame The rectangle frame of the texture to show
        * @param crop The area of original texture
        * @param trim Trimmed texture rectangle
        */
        constructor(baseTexture: BaseTexture, frame?: Rectangle, crop?: Rectangle, trim?: Rectangle);


        /**
        * The base texture that this texture uses.
        */
        baseTexture: BaseTexture;

        /**
        * This is the area of the BaseTexture image to actually copy to the Canvas / WebGL when rendering,
        * irrespective of the actual frame size or placement (which can be influenced by trimmed texture atlases)
        */
        crop: Rectangle;

        /**
        * The frame specifies the region of the base texture that this texture uses
        */
        frame: Rectangle;

        /**
        * The height of the Texture in pixels.
        */
        height: number;

        /**
        * Does this Texture have any frame data assigned to it?
        */
        noFrame: boolean;

        /**
        * This will let a renderer know that a texture has been updated (used mainly for webGL uv updates)
        */
        requiresUpdate: boolean;

        /**
        * The texture trim data.
        */
        trim: Point;

        /**
        * The width of the Texture in pixels.
        */
        width: number;
        scope: any;

        /**
        * This will let the renderer know if the texture is valid. If it's not then it cannot be rendered.
        */
        valid: boolean;

        /**
        * A flag that controls if this frame is rotated or not.
        * Rotation allows you to use rotated frames in texture atlas packing, it has nothing to do with
        * Sprite rotation.
        */
        rotated: boolean;

        listeners(eventName: string): Function[];
        emit(eventName: string, data?: any): boolean;
        dispatchEvent(eventName: string, data?: any): boolean;
        on(eventName: string, fn: Function): Function;
        addEventListener(eventName: string, fn: Function): Function;
        once(eventName: string, fn: Function): Function;
        off(eventName: string, fn: Function): Function;
        removeAllEventListeners(eventName: string): void;


        /**
        * Destroys this texture
        * 
        * @param destroyBase Whether to destroy the base texture as well
        */
        destroy(destroyBase: boolean): void;

        /**
        * Specifies the region of the baseTexture that this texture will use.
        * 
        * @param frame The frame of the texture to set it to
        */
        setFrame(frame: Rectangle): void;

    }

    export class TilingSprite extends Sprite {

        constructor(texture: Texture, width: number, height: number);

        canvasBuffer: PIXI.CanvasBuffer;
        blendMode: number;
        refreshTexture: boolean;
        texture: Texture;
        textureDebug: boolean;
        tint: number;
        tilePosition: Point;
        tilePattern: PIXI.Texture;
        tileScale: Point;
        tileScaleOffset: Point;

        destroy(): void;
        generateTilingTexture(forcePowerOfTwo?: boolean): void;
        setTexture(texture: Texture): void;

    }

    export class TiltShiftFilter extends AbstractFilter {

        blur: number;
        gradientBlur: number;
        start: number;
        end: number;

    }

    export class TiltShiftXFilter extends AbstractFilter {

        blur: number;
        gradientBlur: number;
        start: number;
        end: number;

        updateDelta(): void;

    }

    export class TiltShiftYFilter extends AbstractFilter {

        blur: number;
        gradientBlur: number;
        start: number;
        end: number;

        updateDelta(): void;

    }

    export class TwistFilter extends AbstractFilter {

        angle: number;
        offset: Point;
        radius: number;

    }

    export class VideoTexture extends BaseTexture {

        static baseTextureFromVideo(video: HTMLVideoElement, scaleMode: number): BaseTexture;
        static textureFromVideo(video: HTMLVideoElement, scaleMode: number): Texture;
        static fromUrl(videoSrc: string, scaleMode?: number, autoPlay?: boolean, type?: string, loop?: boolean): Texture;

        controls: boolean;
        autoUpdate: boolean;
        type: string;

        changeSource(src: string, type: string, loop: boolean): void;
        play(): void;
        stop(): void;

        destroy(): void;
        updateBound(): void;
        onPlayStart: () => void;
        onPlayStop: () => void;
        onCanPlay: (event: any) => void;

    }

    export class WebGLBlendModeManager {

        currentBlendMode: number;


        /**
        * Destroys this object.
        */
        destroy(): void;

        /**
        * Sets-up the given blendMode from WebGL's point of view.
        * 
        * @param blendMode the blendMode, should be a Pixi const, such as PIXI.BlendModes.ADD
        */
        setBlendMode(blendMode: number): boolean;

        /**
        * Sets the WebGL Context.
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;

    }

    export class WebGLFastSpriteBatch {

        constructor(gl: CanvasRenderingContext2D);

        currentBatchSize: number;
        currentBaseTexture: BaseTexture;
        currentBlendMode: number;
        renderSession: RenderSession;
        drawing: boolean;
        indexBuffer: any;

        /**
        * Index data
        */
        indices: number[];
        lastIndexCount: number;
        matrix: Matrix;
        maxSize: number;
        shader: IPixiShader;
        size: number;
        vertexBuffer: any;

        /**
        * Vertex data
        */
        vertices: number[];
        vertSize: number;

        end(): void;

        /**
        * 
        * 
        * @param spriteBatch -
        * @param renderSession -
        */
        begin(spriteBatch: SpriteBatch, renderSession: RenderSession): void;
        destroy(removeView?: boolean): void;
        flush(): void;

        /**
        * 
        * 
        * @param spriteBatch -
        */
        render(spriteBatch: SpriteBatch): void;

        /**
        * 
        * 
        * @param sprite -
        */
        renderSprite(sprite: Sprite): void;

        /**
        * Sets the WebGL Context.
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;
        start(): void;
        stop(): void;

    }

    export class WebGLFilterManager {

        filterStack: AbstractFilter[];
        transparent: boolean;
        offsetX: number;
        offsetY: number;


        /**
        * Applies the filter to the specified area.
        * 
        * @param filter the filter that needs to be applied
        * @param filterArea TODO - might need an update
        * @param width the horizontal range of the filter
        * @param height the vertical range of the filter
        */
        applyFilterPass(filter: AbstractFilter, filterArea: Texture, width: number, height: number): void;

        /**
        * 
        * 
        * @param renderSession -
        * @param buffer -
        */
        begin(renderSession: RenderSession, buffer: ArrayBuffer): void;

        /**
        * Destroys the filter and removes it from the filter stack.
        */
        destroy(): void;

        /**
        * Initialises the shader buffers.
        */
        initShaderBuffers(): void;

        /**
        * Removes the last filter from the filter stack and doesn't return it.
        */
        popFilter(): void;

        /**
        * Applies the filter and adds it to the current filter stack.
        * 
        * @param filterBlock the filter that will be pushed to the current filter stack
        */
        pushFilter(filterBlock: FilterBlock): void;

        /**
        * Initialises the context and the properties.
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;

    }


    /**
    * A set of functions used by the webGL renderer to draw the primitive graphics data
    */
    export class WebGLGraphics {

        static graphicsDataPool: any[];


        /**
        * Renders the graphics object
        * 
        * @param graphics -
        * @param renderSession -
        */
        static renderGraphics(graphics: Graphics, renderRession: RenderSession): void;

        /**
        * Updates the graphics object
        * 
        * @param graphicsData The graphics object to update
        * @param gl the current WebGL drawing context
        */
        static updateGraphics(graphics: Graphics, gl: WebGLRenderingContext): void;

        /**
        * 
        * 
        * @param webGL -
        * @param type -
        */
        static switchMode(webGL: WebGLRenderingContext, type: number): any;

        /**
        * Builds a rectangle to draw
        * 
        * @param graphicsData The graphics object containing all the necessary properties
        * @param webGLData -
        */
        static buildRectangle(graphicsData: GraphicsData, webGLData: any): void;

        /**
        * Builds a rounded rectangle to draw
        * 
        * @param graphicsData The graphics object containing all the necessary properties
        * @param webGLData -
        */
        static buildRoundedRectangle(graphicsData: GraphicsData, webGLData: any): void;

        /**
        * Calculate the points for a quadratic bezier curve. (helper function..)
        * Based on: https://stackoverflow.com/questions/785097/how-do-i-implement-a-bezier-curve-in-c
        * 
        * @param fromX Origin point x
        * @param fromY Origin point x
        * @param cpX Control point x
        * @param cpY Control point y
        * @param toX Destination point x
        * @param toY Destination point y
        */
        static quadraticBezierCurve(fromX: number, fromY: number, cpX: number, cpY: number, toX: number, toY: number): number[];

        /**
        * Builds a circle to draw
        * 
        * @param graphicsData The graphics object to draw
        * @param webGLData -
        */
        static buildCircle(graphicsData: GraphicsData, webGLData: any): void;

        /**
        * Builds a line to draw
        * 
        * @param graphicsData The graphics object containing all the necessary properties
        * @param webGLData -
        */
        static buildLine(graphicsData: GraphicsData, webGLData: any): void;

        /**
        * Builds a complex polygon to draw
        * 
        * @param graphicsData The graphics object containing all the necessary properties
        * @param webGLData -
        */
        static buildComplexPoly(graphicsData: GraphicsData, webGLData: any): void;

        /**
        * Builds a polygon to draw
        * 
        * @param graphicsData The graphics object containing all the necessary properties
        * @param webGLData -
        */
        static buildPoly(graphicsData: GraphicsData, webGLData: any): boolean;

        reset(): void;
        upload(): void;

    }

    export class WebGLGraphicsData {

        constructor(gl: WebGLRenderingContext);

        gl: WebGLRenderingContext;
        glPoints: any[];
        color: number[];
        points: any[];
        indices: any[];
        buffer: WebGLBuffer;
        indexBuffer: WebGLBuffer;
        mode: number;
        alpha: number;
        dirty: boolean;

        reset(): void;
        upload(): void;

    }

    export class WebGLMaskManager {


        /**
        * Destroys the mask stack.
        */
        destroy(): void;

        /**
        * Removes the last filter from the filter stack and doesn't return it.
        * 
        * @param maskData -
        * @param renderSession an object containing all the useful parameters
        */
        popMask(renderSession: RenderSession): void;

        /**
        * Applies the Mask and adds it to the current filter stack.
        * 
        * @param maskData -
        * @param renderSession -
        */
        pushMask(maskData: any[], renderSession: RenderSession): void;

        /**
        * Sets the drawing context to the one given in parameter.
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;

    }


    /**
    * The WebGLRenderer draws the stage and all its content onto a webGL enabled canvas. This renderer
    * should be used for browsers that support webGL. This Render works by automatically managing webGLBatchs.
    * So no need for Sprite Batches or Sprite Clouds.
    * Don't forget to add the view to your DOM or you will not see anything :)
    */
    export class WebGLRenderer implements PixiRenderer {

        static createWebGLTexture(texture: Texture, gl: WebGLRenderingContext): void;


        /**
        * The WebGLRenderer draws the stage and all its content onto a webGL enabled canvas. This renderer
        * should be used for browsers that support webGL. This Render works by automatically managing webGLBatchs.
        * So no need for Sprite Batches or Sprite Clouds.
        * Don't forget to add the view to your DOM or you will not see anything :)
        * 
        * @param game A reference to the Phaser Game instance
        */
        constructor(game: Phaser.Game);

        game: Phaser.Game;
        type: number;

        /**
        * The resolution of the renderer
        * Default: 1
        */
        resolution: number;

        /**
        * Whether the render view is transparent
        */
        transparent: boolean;

        /**
        * Whether the render view should be resized automatically
        */
        autoResize: boolean;

        /**
        * The value of the preserveDrawingBuffer flag affects whether or not the contents of the stencil buffer is retained after rendering.
        */
        preserveDrawingBuffer: boolean;

        /**
        * This sets if the WebGLRenderer will clear the context texture or not before the new render pass. If true:
        * If the Stage is NOT transparent, Pixi will clear to alpha (0, 0, 0, 0).
        * If the Stage is transparent, Pixi will clear to the target Stage's background color.
        * Disable this by setting this to false. For example: if your game has a canvas filling background image, you often don't need this set.
        */
        clearBeforeRender: boolean;

        /**
        * The width of the canvas view
        */
        width: number;

        /**
        * The height of the canvas view
        */
        height: number;
        currentBatchedTextures: string[];

        /**
        * The canvas element that everything is drawn to
        */
        view: HTMLCanvasElement;
        projection: Point;
        offset: Point;

        /**
        * Deals with managing the shader programs and their attribs
        */
        shaderManager: WebGLShaderManager;

        /**
        * Manages the rendering of sprites
        */
        spriteBatch: WebGLSpriteBatch;

        /**
        * Manages the masks using the stencil buffer
        */
        maskManager: WebGLMaskManager;

        /**
        * Manages the filters
        */
        filterManager: WebGLFilterManager;

        /**
        * Manages the stencil buffer
        */
        stencilManager: WebGLStencilManager;

        /**
        * Manages the blendModes
        */
        blendModeManager: WebGLBlendModeManager;
        renderSession: RenderSession;

        initContext(): void;

        /**
        * Renders the stage to its webGL view
        * 
        * @param stage the Stage element to be rendered
        */
        render(stage: DisplayObjectContainer): void;

        /**
        * Renders a Display Object.
        * 
        * @param displayObject The DisplayObject to render
        * @param projection The projection
        * @param buffer a standard WebGL buffer
        */
        renderDisplayObject(displayObject: DisplayObject, projection: Point, buffer: WebGLBuffer): void;

        /**
        * Resizes the webGL view to the specified width and height.
        * 
        * @param width the new width of the webGL view
        * @param height the new height of the webGL view
        */
        resize(width: number, height: number): void;

        /**
        * Updates and Creates a WebGL texture for the renderers context.
        * 
        * @param texture the texture to update
        * @return True if the texture was successfully bound, otherwise false.
        */
        updateTexture(texture: Texture): void;

        /**
        * Removes everything from the renderer (event listeners, spritebatch, etc...)
        */
        destroy(): void;

        /**
        * Maps Pixi blend modes to WebGL blend modes.
        */
        mapBlendModes(): void;

        /**
        * If Multi Texture support has been enabled, then calling this method will enable batching on the given
        * textures. The texture collection is an array of keys, that map to Phaser.Cache image entries.
        * 
        * The number of textures that can be batched is dependent on hardware. If you provide more textures
        * than can be batched by the GPU, then only those at the start of the array will be used. Generally
        * you shouldn't provide more than 16 textures to this method. You can check the hardware limit via the
        * `maxTextures` property.
        * 
        * You can also check the property `currentBatchedTextures` at any time, to see which textures are currently
        * being batched.
        * 
        * To stop all textures from being batched, call this method again with an empty array.
        * 
        * To change the textures being batched, call this method with a new array of image keys. The old ones
        * will all be purged out and no-longer batched, and the new ones enabled.
        * 
        * Note: Throws a warning if you haven't enabled Multiple Texture batching support in the Phaser Game config.
        * 
        * @param textureNameCollection An Array of Texture Cache keys to use for multi-texture batching.
        * @return An array containing the texture keys that were enabled for batching.
        */
        setTexturePriority(textureNameCollection: string[]): string[];

    }

    export class WebGLShaderManager {

        maxAttibs: number;
        attribState: any[];
        stack: any[];
        tempAttribState: any[];


        /**
        * Destroys this object.
        */
        destroy(): void;

        /**
        * Takes the attributes given in parameters.
        * 
        * @param attribs attribs
        */
        setAttribs(attribs: ShaderAttribute[]): void;

        /**
        * Initialises the context and the properties.
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;

        /**
        * Sets the current shader.
        * 
        * @param shader -
        */
        setShader(shader: IPixiShader): boolean;

    }

    export class WebGLStencilManager {

        stencilStack: any[];
        reverse: boolean;
        count: number;


        /**
        * TODO this does not belong here!
        * 
        * @param graphics -
        * @param webGLData -
        * @param renderSession -
        */
        bindGraphics(graphics: Graphics, webGLData: any[], renderSession: RenderSession): void;

        /**
        * Destroys the mask stack.
        */
        destroy(): void;

        /**
        * 
        * 
        * @param graphics -
        * @param webGLData -
        * @param renderSession -
        */
        popStencil(graphics: Graphics, webGLData: any[], renderSession: RenderSession): void;
        pushStencil(graphics: Graphics, webGLData: any[], renderSession: RenderSession): void;

        /**
        * Sets the drawing context to the one given in parameter.
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;

    }

    export class WebGLSpriteBatch {

        blendModes: number[];

        /**
        * View on the vertices as a Uint32Array
        */
        colors: number[];
        currentBatchSize: number;
        currentBaseTexture: Texture;
        defaultShader: AbstractFilter;
        dirty: boolean;
        drawing: boolean;

        /**
        * Holds the indices
        */
        indices: number[];
        lastIndexCount: number;

        /**
        * View on the vertices as a Float32Array
        */
        positions: number[];
        textures: Texture[];
        shaders: IPixiShader[];

        /**
        * The number of images in the SpriteBatch before it flushes
        */
        size: number;
        sprites: any[];

        /**
        * Holds the vertices
        */
        vertices: number[];
        vertSize: number;


        /**
        * 
        * 
        * @param renderSession The RenderSession object
        */
        begin(renderSession: RenderSession): void;

        /**
        * Destroys the SpriteBatch.
        */
        destroy(): void;
        end(): void;

        /**
        * Renders the content and empties the current batch.
        */
        flush(shader?: IPixiShader): void;

        /**
        * 
        * 
        * @param sprite the sprite to render when using this spritebatch
        * @param matrix - Optional matrix. If provided the Display Object will be rendered using this matrix, otherwise it will use its worldTransform.
        */
        render(sprite: Sprite): void;

        /**
        * 
        * 
        * @param texture -
        * @param size -
        * @param startIndex -
        */
        renderBatch(texture: Texture, size: number, startIndex: number): void;

        /**
        * Renders a TilingSprite using the spriteBatch.
        * 
        * @param sprite the sprite to render
        */
        renderTilingSprite(sprite: TilingSprite): void;
        setBlendMode(blendMode: blendModes): void;

        /**
        * 
        * 
        * @param gl the current WebGL drawing context
        */
        setContext(gl: WebGLRenderingContext): void;
        start(): void;
        stop(): void;

    }

    export class RenderTexture extends Texture {

        constructor(width?: number, height?: number, renderer?: PixiRenderer, scaleMode?: scaleModes, resolution?: number);

        frame: Rectangle;
        baseTexture: BaseTexture;
        renderer: PixiRenderer;
        resolution: number;
        valid: boolean;

        clear(): void;
        getBase64(): string;
        getCanvas(): HTMLCanvasElement;
        getImage(): HTMLImageElement;
        resize(width: number, height: number, updateBase: boolean): void;
        render(displayObject: DisplayObject, matrix?: Matrix, clear?: boolean): void;

    }

    // SPINE

    export class BoneData {

        constructor(name: string, parent?: any);

        name: string;
        parent: any;
        length: number;
        x: number;
        y: number;
        rotation: number;
        scaleX: number;
        scaleY: number;

    }

    export class SlotData {

        constructor(name: string, boneData: BoneData);

        name: string;
        boneData: BoneData;
        r: number;
        g: number;
        b: number;
        a: number;
        attachmentName: string;

    }

    export class Bone {

        constructor(boneData: BoneData, parent?: any);

        data: BoneData;
        parent: any;
        yDown: boolean;
        x: number;
        y: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        worldRotation: number;
        worldScaleX: number;
        worldScaleY: number;

        updateWorldTransform(flipX: boolean, flip: boolean): void;
        setToSetupPose(): void;

    }

    export class Slot {

        constructor(slotData: SlotData, skeleton: Skeleton, bone: Bone);

        data: SlotData;
        skeleton: Skeleton;
        bone: Bone;
        r: number;
        g: number;
        b: number;
        a: number;
        attachment: RegionAttachment;
        setAttachment(attachment: RegionAttachment): void;
        setAttachmentTime(time: number): void;
        getAttachmentTime(): number;
        setToSetupPose(): void;

    }

    export class Skin {

        constructor(name: string);

        name: string;
        attachments: any;

        addAttachment(slotIndex: number, name: string, attachment: RegionAttachment): void;
        getAttachment(slotIndex: number, name: string): void;

    }

    export class Animation {

        constructor(name: string, timelines: ISpineTimeline[], duration: number);

        name: string;
        timelines: ISpineTimeline[];
        duration: number;
        apply(skeleton: Skeleton, time: number, loop: boolean): void;
        min(skeleton: Skeleton, time: number, loop: boolean, alpha: number): void;

    }

    export class Curves {

        constructor(frameCount: number);

        curves: number[];

        setLinear(frameIndex: number): void;
        setStepped(frameIndex: number): void;
        setCurve(frameIndex: number, cx1: number, cy1: number, cx2: number, cy2: number): void;
        getCurvePercent(frameIndex: number, percent: number): number;

    }

    export interface ISpineTimeline {

        curves: Curves;
        frames: number[];

        getFrameCount(): number;
        apply(skeleton: Skeleton, time: number, alpha: number): void;

    }

    export class RotateTimeline implements ISpineTimeline {

        constructor(frameCount: number);

        curves: Curves;
        frames: number[];
        boneIndex: number;

        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, angle: number): void;
        apply(skeleton: Skeleton, time: number, alpha: number): void;

    }

    export class TranslateTimeline implements ISpineTimeline {

        constructor(frameCount: number);

        curves: Curves;
        frames: number[];
        boneIndex: number;

        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, x: number, y: number): void;
        apply(skeleton: Skeleton, time: number, alpha: number): void;

    }

    export class ScaleTimeline implements ISpineTimeline {

        constructor(frameCount: number);

        curves: Curves;
        frames: number[];
        boneIndex: number;

        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, x: number, y: number): void;
        apply(skeleton: Skeleton, time: number, alpha: number): void;

    }

    export class ColorTimeline implements ISpineTimeline {

        constructor(frameCount: number);

        curves: Curves;
        frames: number[];
        boneIndex: number;

        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, r: number, g: number, b: number, a: number): void;
        apply(skeleton: Skeleton, time: number, alpha: number): void;

    }

    export class AttachmentTimeline implements ISpineTimeline {

        constructor(frameCount: number);

        curves: Curves;
        frames: number[];
        attachmentNames: string[];
        slotIndex: number;

        getFrameCount(): number;
        setFrame(frameIndex: number, time: number, attachmentName: string): void;
        apply(skeleton: Skeleton, time: number, alpha: number): void;

    }

    export class SkeletonData {

        bones: Bone[];
        slots: Slot[];
        skins: Skin[];
        animations: Animation[];
        defaultSkin: Skin;

        findBone(boneName: string): Bone;
        findBoneIndex(boneName: string): number;
        findSlot(slotName: string): Slot;
        findSlotIndex(slotName: string): number;
        findSkin(skinName: string): Skin;
        findAnimation(animationName: string): Animation;

    }

    export class Skeleton {

        constructor(skeletonData: SkeletonData);

        data: SkeletonData;
        bones: Bone[];
        slots: Slot[];
        drawOrder: any[];
        x: number;
        y: number;
        skin: Skin;
        r: number;
        g: number;
        b: number;
        a: number;
        time: number;
        flipX: boolean;
        flipY: boolean;

        updateWorldTransform(): void;
        setToSetupPose(): void;
        setBonesToSetupPose(): void;
        setSlotsToSetupPose(): void;
        getRootBone(): Bone;
        findBone(boneName: string): Bone;
        fineBoneIndex(boneName: string): number;
        findSlot(slotName: string): Slot;
        findSlotIndex(slotName: string): number;
        setSkinByName(skinName: string): void;
        setSkin(newSkin: Skin): void;
        getAttachmentBySlotName(slotName: string, attachmentName: string): RegionAttachment;
        getAttachmentBySlotIndex(slotIndex: number, attachmentName: string): RegionAttachment;
        setAttachment(slotName: string, attachmentName: string): void;
        update(data: number): void;

    }

    export class RegionAttachment {

        offset: number[];
        uvs: number[];
        x: number;
        y: number;
        rotation: number;
        scaleX: number;
        scaleY: number;
        width: number;
        height: number;
        rendererObject: any;
        regionOffsetX: number;
        regionOffsetY: number;
        regionWidth: number;
        regionHeight: number;
        regionOriginalWidth: number;
        regionOriginalHeight: number;

        setUVs(u: number, v: number, u2: number, v2: number, rotate: number): void;
        updateOffset(): void;
        computeVertices(x: number, y: number, bone: Bone, vertices: number[]): void;

    }

    export class AnimationStateData {

        constructor(skeletonData: SkeletonData);

        skeletonData: SkeletonData;
        animationToMixTime: any;
        defaultMix: number;

        setMixByName(fromName: string, toName: string, duration: number): void;
        setMix(from: string, to: string): number;

    }

    export class AnimationState {

        constructor(stateData: any);

        animationSpeed: number;
        current: any;
        previous: any;
        currentTime: number;
        previousTime: number;
        currentLoop: boolean;
        previousLoop: boolean;
        mixTime: number;
        mixDuration: number;
        queue: Animation[];

        update(delta: number): void;
        apply(skeleton: any): void;
        clearAnimation(): void;
        setAnimation(animation: any, loop: boolean): void;
        setAnimationByName(animationName: string, loop: boolean): void;
        addAnimationByName(animationName: string, loop: boolean, delay: number): void;
        addAnimation(animation: any, loop: boolean, delay: number): void;
        isComplete(): number;

    }

    export class SkeletonJson {

        constructor(attachmentLoader: AtlasAttachmentLoader);

        attachmentLoader: AtlasAttachmentLoader;
        scale: number;

        readSkeletonData(root: any): SkeletonData;
        readAttachment(skin: Skin, name: string, map: any): RegionAttachment;
        readAnimation(name: string, map: any, skeletonData: SkeletonData): void;
        readCurve(timeline: ISpineTimeline, frameIndex: number, valueMap: any): void;
        toColor(hexString: string, colorIndex: number): number;

    }

    export class Atlas {

        static FORMAT: {

            alpha: number;
            intensity: number;
            luminanceAlpha: number;
            rgb565: number;
            rgba4444: number;
            rgb888: number;
            rgba8888: number;

        };

        static TextureFilter: {

            nearest: number;
            linear: number;
            mipMap: number;
            mipMapNearestNearest: number;
            mipMapLinearNearest: number;
            mipMapNearestLinear: number;
            mipMapLinearLinear: number;

        };

        static textureWrap: {

            mirroredRepeat: number;
            clampToEdge: number;
            repeat: number;

        };

        constructor(atlasText: string, textureLoader: AtlasLoader);

        textureLoader: AtlasLoader;
        pages: AtlasPage[];
        regions: AtlasRegion[];

        findRegion(name: string): AtlasRegion;
        dispose(): void;
        updateUVs(page: AtlasPage): void;

    }

    export class AtlasPage {

        name: string;
        format: number;
        minFilter: number;
        magFilter: number;
        uWrap: number;
        vWrap: number;
        rendererObject: any;
        width: number;
        height: number;

    }

    export class AtlasRegion {

        page: AtlasPage;
        name: string;
        x: number;
        y: number;
        width: number;
        height: number;
        u: number;
        v: number;
        u2: number;
        v2: number;
        offsetX: number;
        offsetY: number;
        originalWidth: number;
        originalHeight: number;
        index: number;
        rotate: boolean;
        splits: any[];
        pads: any[];

    }

    export class AtlasReader {

        constructor(text: string);

        lines: string[];
        index: number;

        trim(value: string): string;
        readLine(): string;
        readValue(): string;
        readTuple(tuple: number): number;

    }

    export class AtlasAttachmentLoader {

        constructor(atlas: Atlas);

        atlas: Atlas;

        newAttachment(skin: Skin, type: number, name: string): RegionAttachment;

    }

    export class Spine extends DisplayObjectContainer {

        constructor(url: string);

        autoUpdate: boolean;
        spineData: any;
        skeleton: Skeleton;
        stateData: AnimationStateData;
        state: AnimationState;
        slotContainers: DisplayObjectContainer[];

        createSprite(slot: Slot, descriptor: { name: string }): Sprite[];
        update(dt: number): void;

    }

}

declare function requestAnimFrame(callback: Function): void;

declare module PIXI.PolyK {
    export function Triangulate(p: number[]): number[];
}

// Generated by typings
// Source: https://raw.githubusercontent.com/photonstorm/phaser-ce/master/typescript/p2.d.ts
declare module p2 {

    export class AABB {

        constructor(options?: {
            upperBound?: number[];
            lowerBound?: number[];
        });

        setFromPoints(points: number[][], position: number[], angle: number, skinSize: number): void;
        copy(aabb: AABB): void;
        extend(aabb: AABB): void;
        overlaps(aabb: AABB): boolean;

    }

    export class Broadphase {

        static AABB: number;
        static BOUNDING_CIRCLE: number;

        static NAIVE: number;
        static SAP: number;

        static boundingRadiusCheck(bodyA: Body, bodyB: Body): boolean;
        static aabbCheck(bodyA: Body, bodyB: Body): boolean;
        static canCollide(bodyA: Body, bodyB: Body): boolean;

        constructor(type: number);

        type: number;
        result: Body[];
        world: World;
        boundingVolumeType: number;

        setWorld(world: World): void;
        getCollisionPairs(world: World): Body[];
        boundingVolumeCheck(bodyA: Body, bodyB: Body): boolean;

    }

    export class GridBroadphase extends Broadphase {

        constructor(options?: {
            xmin?: number;
            xmax?: number;
            ymin?: number;
            ymax?: number;
            nx?: number;
            ny?: number;
        });

        xmin: number;
        xmax: number;
        ymin: number;
        ymax: number;
        nx: number;
        ny: number;
        binsizeX: number;
        binsizeY: number;

    }

    export class NativeBroadphase extends Broadphase {

    }

    export class Narrowphase {

        contactEquations: ContactEquation[];
        frictionEquations: FrictionEquation[];
        enableFriction: boolean;
        slipForce: number;
        frictionCoefficient: number;
        surfaceVelocity: number;
        reuseObjects: boolean;
        resuableContactEquations: any[];
        reusableFrictionEquations: any[];
        restitution: number;
        stiffness: number;
        relaxation: number;
        frictionStiffness: number;
        frictionRelaxation: number;
        enableFrictionReduction: boolean;
        contactSkinSize: number;

        collidedLastStep(bodyA: Body, bodyB: Body): boolean;
        reset(): void;
        createContactEquation(bodyA: Body, bodyB: Body, shapeA: Shape, shapeB: Shape): ContactEquation;
        createFrictionFromContact(c: ContactEquation): FrictionEquation;

    }

    export class SAPBroadphase extends Broadphase {

        axisList: Body[];
        axisIndex: number;

    }

    export class Constraint {

        static DISTANCE: number;
        static GEAR: number;
        static LOCK: number;
        static PRISMATIC: number;
        static REVOLUTE: number;

        constructor(bodyA: Body, bodyB: Body, type: number, options?: {
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
        });

        type: number;
        equeations: Equation[];
        bodyA: Body;
        bodyB: Body;
        collideConnected: boolean;

        update(): void;
        setStiffness(stiffness: number): void;
        setRelaxation(relaxation: number): void;

    }

    export class DistanceConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, type: number, options?: {
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            distance?: number;
            localAnchorA?: number[];
            localAnchorB?: number[];
            maxForce?: number;
        });

        localAnchorA: number[];
        localAnchorB: number[];
        distance: number;
        maxForce: number;
        upperLimitEnabled: boolean;
        upperLimit: number;
        lowerLimitEnabled: boolean;
        lowerLimit: number;
        position: number;

        setMaxForce(f: number): void;
        getMaxForce(): number;

    }

    export class GearConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, type: number, options?: {
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            angle?: number;
            ratio?: number;
            maxTorque?: number;
        });

        ratio: number;
        angle: number;

        setMaxTorque(torque: number): void;
        getMaxTorque(): number;

    }

    export class LockConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, type: number, options?: {
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            localOffsetB?: number[];
            localAngleB?: number;
            maxForce?: number;
        });

        setMaxForce(force: number): void;
        getMaxForce(): number;

    }

    export class PrismaticConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, type: number, options?: {
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            maxForce?: number;
            localAnchorA?: number[];
            localAnchorB?: number[];
            localAxisA?: number[];
            disableRotationalLock?: boolean;
            upperLimit?: number;
            lowerLimit?: number;
        });

        localAnchorA: number[];
        localAnchorB: number[];
        localAxisA: number[];
        position: number;
        velocity: number;
        lowerLimitEnabled: boolean;
        upperLimitEnabled: boolean;
        lowerLimit: number;
        upperLimit: number;
        upperLimitEquation: ContactEquation;
        lowerLimitEquation: ContactEquation;
        motorEquation: Equation;
        motorEnabled: boolean;
        motorSpeed: number;

        enableMotor(): void;
        disableMotor(): void;
        setLimits(lower: number, upper: number): void;

    }

    export class RevoluteConstraint extends Constraint {

        constructor(bodyA: Body, bodyB: Body, type: number, options?: {
            collideConnected?: boolean;
            wakeUpBodies?: boolean;
            worldPivot?: number[];
            localPivotA?: number[];
            localPivotB?: number[];
            maxForce?: number;
        });

        pivotA: number[];
        pivotB: number[];
        motorEquation: RotationalVelocityEquation;
        motorEnabled: boolean;
        angle: number;
        lowerLimitEnabled: boolean;
        upperLimitEnabled: boolean;
        lowerLimit: number;
        upperLimit: number;
        upperLimitEquation: ContactEquation;
        lowerLimitEquation: ContactEquation;

        enableMotor(): void;
        disableMotor(): void;
        motorIsEnabled(): boolean;
        setLimits(lower: number, upper: number): void;
        setMotorSpeed(speed: number): void;
        getMotorSpeed(): number;

    }

    export class AngleLockEquation extends Equation {

        constructor(bodyA: Body, bodyB: Body, options?: {
            angle?: number;
            ratio?: number;
        });

        computeGq(): number;
        setRatio(ratio: number): number;
        setMaxTorque(torque: number): number;

    }

    export class ContactEquation extends Equation {

        constructor(bodyA: Body, bodyB: Body);

        contactPointA: number[];
        penetrationVec: number[];
        contactPointB: number[];
        normalA: number[];
        restitution: number;
        firstImpact: boolean;
        shapeA: Shape;
        shapeB: Shape;

        computeB(a: number, b: number, h: number): number;

    }

    export class Equation {

        static DEFAULT_STIFFNESS: number;
        static DEFAULT_RELAXATION: number;

        constructor(bodyA: Body, bodyB: Body, minForce?: number, maxForce?: number);

        minForce: number;
        maxForce: number;
        bodyA: Body;
        bodyB: Body;
        stiffness: number;
        relaxation: number;
        G: number[];
        offset: number;
        a: number;
        b: number;
        epsilon: number;
        timeStep: number;
        needsUpdate: boolean;
        multiplier: number;
        relativeVelocity: number;
        enabled: boolean;

        gmult(G: number[], vi: number[], wi: number[], vj: number[], wj: number[]): number;
        computeB(a: number, b: number, h: number): number;
        computeGq(): number;
        computeGW(): number;
        computeGWlambda(): number;
        computeGiMf(): number;
        computeGiMGt(): number;
        addToWlambda(deltalambda: number): number;
        computeInvC(eps: number): number;

    }

    export class FrictionEquation extends Equation {

        constructor(bodyA: Body, bodyB: Body, slipForce: number);

        contactPointA: number[];
        contactPointB: number[];
        t: number[];
        shapeA: Shape;
        shapeB: Shape;
        frictionCoefficient: number;

        setSlipForce(slipForce: number): number;
        getSlipForce(): number;
        computeB(a: number, b: number, h: number): number;

    }

    export class RotationalLockEquation extends Equation {

        constructor(bodyA: Body, bodyB: Body, options?: {
            angle?: number;
        });

        angle: number;

        computeGq(): number;

    }

    export class RotationalVelocityEquation extends Equation {

        constructor(bodyA: Body, bodyB: Body);

        computeB(a: number, b: number, h: number): number;

    }

    export class EventEmitter {

        on(type: string, listener: Function, context: any): EventEmitter;
        has(type: string, listener: Function): boolean;
        off(type: string, listener: Function): EventEmitter;
        emit(event: any): EventEmitter;

    }

    export class ContactMaterialOptions {

        friction: number;
        restitution: number;
        stiffness: number;
        relaxation: number;
        frictionStiffness: number;
        frictionRelaxation: number;
        surfaceVelocity: number;

    }

    export class ContactMaterial {

        static idCounter: number;

        constructor(materialA: Material, materialB: Material, options?: ContactMaterialOptions);

        id: number;
        materialA: Material;
        materialB: Material;
        friction: number;
        restitution: number;
        stiffness: number;
        relaxation: number;
        frictionStuffness: number;
        frictionRelaxation: number;
        surfaceVelocity: number;
        contactSkinSize: number;

    }

    export class Material {

        static idCounter: number;

        constructor(id: number);

        id: number;

    }

    export class vec2 {

        static crossLength(a: number[], b: number[]): number;
        static crossVZ(out: number[], vec: number[], zcomp: number): number;
        static crossZV(out: number[], zcomp: number, vec: number[]): number;
        static rotate(out: number[], a: number[], angle: number): void;
        static rotate90cw(out: number[], a: number[]): number;
        static centroid(out: number[], a: number[], b: number[], c: number[]): number[];
        static create(): number[];
        static clone(a: number[]): number[];
        static fromValues(x: number, y: number): number[];
        static copy(out: number[], a: number[]): number[];
        static set(out: number[], x: number, y: number): number[];
        static toLocalFrame(out: number[], worldPoint: number[], framePosition: number[], frameAngle: number): void;
        static toGlobalFrame(out: number[], localPoint: number[], framePosition: number[], frameAngle: number): void;
        static add(out: number[], a: number[], b: number[]): number[];
        static subtract(out: number[], a: number[], b: number[]): number[];
        static sub(out: number[], a: number[], b: number[]): number[];
        static multiply(out: number[], a: number[], b: number[]): number[];
        static mul(out: number[], a: number[], b: number[]): number[];
        static divide(out: number[], a: number[], b: number[]): number[];
        static div(out: number[], a: number[], b: number[]): number[];
        static scale(out: number[], a: number[], b: number): number[];
        static distance(a: number[], b: number[]): number;
        static dist(a: number[], b: number[]): number;
        static squaredDistance(a: number[], b: number[]): number;
        static sqrDist(a: number[], b: number[]): number;
        static length(a: number[]): number;
        static len(a: number[]): number;
        static squaredLength(a: number[]): number;
        static sqrLen(a: number[]): number;
        static negate(out: number[], a: number[]): number[];
        static normalize(out: number[], a: number[]): number[];
        static dot(a: number[], b: number[]): number;
        static str(a: number[]): string;

    }

    export class BodyOptions {

        mass: number;
        position: number[];
        velocity: number[];
        angle: number;
        angularVelocity: number;
        force: number[];
        angularForce: number;
        fixedRotation: number;

    }

    export class Body extends EventEmitter {

        sleepyEvent: {
            type: string;
        };

        sleepEvent: {
            type: string;
        };

        wakeUpEvent: {
            type: string;
        };

        static DYNAMIC: number;
        static STATIC: number;
        static KINEMATIC: number;
        static AWAKE: number;
        static SLEEPY: number;
        static SLEEPING: number;

        constructor(options?: BodyOptions);

        id: number;
        world: World;
        shapes: Shape[];
        shapeOffsets: number[][];
        shapeAngles: number[];
        mass: number;
        invMass: number;
        inertia: number;
        invInertia: number;
        invMassSolve: number;
        invInertiaSolve: number;
        fixedRotation: number;
        position: number[];
        interpolatedPosition: number[];
        interpolatedAngle: number;
        previousPosition: number[];
        previousAngle: number;
        velocity: number[];
        vlambda: number[];
        wlambda: number[];
        angle: number;
        angularVelocity: number;
        force: number[];
        angularForce: number;
        damping: number;
        angularDamping: number;
        type: number;
        boundingRadius: number;
        aabb: AABB;
        aabbNeedsUpdate: boolean;
        allowSleep: boolean;
        wantsToSleep: boolean;
        sleepState: number;
        sleepSpeedLimit: number;
        sleepTimeLimit: number;
        gravityScale: number;

        updateSolveMassProperties(): void;
        setDensity(density: number): void;
        getArea(): number;
        getAABB(): AABB;
        updateAABB(): void;
        updateBoundingRadius(): void;
        addShape(shape: Shape, offset?: number[], angle?: number): void;
        removeShape(shape: Shape): boolean;
        updateMassProperties(): void;
        applyForce(force: number[], worldPoint: number[]): void;
        toLocalFrame(out: number[], worldPoint: number[]): void;
        toWorldFrame(out: number[], localPoint: number[]): void;
        fromPolygon(path: number[][], options?: {
            optimalDecomp?: boolean;
            skipSimpleCheck?: boolean;
            removeCollinearPoints?: any; //boolean | number
        }): boolean;
        adjustCenterOfMass(): void;
        setZeroForce(): void;
        resetConstraintVelocity(): void;
        applyDamping(dy: number): void;
        wakeUp(): void;
        sleep(): void;
        sleepTick(time: number, dontSleep: boolean, dt: number): void;
        getVelocityFromPosition(story: number[], dt: number): number[];
        getAngularVelocityFromPosition(timeStep: number): number;
        overlaps(body: Body): boolean;

    }

    export class Spring {

        constructor(bodyA: Body, bodyB: Body, options?: {

            stiffness?: number;
            damping?: number;
            localAnchorA?: number[];
            localAnchorB?: number[];
            worldAnchorA?: number[];
            worldAnchorB?: number[];

        });

        stiffness: number;
        damping: number;
        bodyA: Body;
        bodyB: Body;

        applyForce(): void;

    }

    export class LinearSpring extends Spring {

        localAnchorA: number[];
        localAnchorB: number[];
        restLength: number;

        setWorldAnchorA(worldAnchorA: number[]): void;
        setWorldAnchorB(worldAnchorB: number[]): void;
        getWorldAnchorA(result: number[]): number[];
        getWorldAnchorB(result: number[]): number[];
        applyForce(): void;

    }

    export class RotationalSpring extends Spring {

        constructor(bodyA: Body, bodyB: Body, options?: {
            restAngle?: number;
            stiffness?: number;
            damping?: number;
        });

        restAngle: number;

    }

    export class Capsule extends Shape {

        constructor(length?: number, radius?: number);

        length: number;
        radius: number;

    }

    export class Circle extends Shape {

        constructor(radius: number);

        radius: number;

    }

    export class Convex extends Shape {

        static triangleArea(a: number[], b: number[], c: number[]): number;

        constructor(vertices: number[][], axes: number[]);

        vertices: number[][];
        axes: number[];
        centerOfMass: number[];
        triangles: number[];
        boundingRadius: number;

        projectOntoLocalAxis(localAxis: number[], result: number[]): void;
        projectOntoWorldAxis(localAxis: number[], shapeOffset: number[], shapeAngle: number, result: number[]): void;

        updateCenterOfMass(): void;

    }

    export class Heightfield extends Shape {

        constructor(data: number[], options?: {
            minValue?: number;
            maxValue?: number;
            elementWidth: number;
        });

        data: number[];
        maxValue: number;
        minValue: number;
        elementWidth: number;

    }

    export class Shape {

        static idCounter: number;
        static CIRCLE: number;
        static PARTICLE: number;
        static PLANE: number;
        static CONVEX: number;
        static LINE: number;
        static RECTANGLE: number;
        static CAPSULE: number;
        static HEIGHTFIELD: number;

        constructor(type: number);

        type: number;
        id: number;
        boundingRadius: number;
        collisionGroup: number;
        collisionMask: number;
        material: Material;
        area: number;
        sensor: boolean;

        computeMomentOfInertia(mass: number): number;
        updateBoundingRadius(): number;
        updateArea(): void;
        computeAABB(out: AABB, position: number[], angle: number): void;

    }

    export class Line extends Shape {

        constructor(length?: number);

        length: number;

    }

    export class Particle extends Shape {

    }

    export class Plane extends Shape {

    }

    export class Rectangle extends Shape {

        static sameDimensions(a: Rectangle, b: Rectangle): boolean;

        constructor(width?: number, height?: number);

        width: number;
        height: number;

    }

    export class Solver extends EventEmitter {

        static GS: number;
        static ISLAND: number;

        constructor(options?: {}, type?: number);

        type: number;
        equations: Equation[];
        equationSortFunction: Equation; //Equation | boolean

        solve(dy: number, world: World): void;
        solveIsland(dy: number, island: Island): void;
        sortEquations(): void;
        addEquation(eq: Equation): void;
        addEquations(eqs: Equation[]): void;
        removeEquation(eq: Equation): void;
        removeAllEquations(): void;

    }

    export class GSSolver extends Solver {

        constructor(options?: {
            iterations?: number;
            tolerance?: number;
        });

        iterations: number;
        tolerance: number;
        useZeroRHS: boolean;
        frictionIterations: number;
        usedIterations: number;

        solve(h: number, world: World): void;

    }

    export class OverlapKeeper {

        constructor(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Shape);

        shapeA: Shape;
        shapeB: Shape;
        bodyA: Body;
        bodyB: Body;

        tick(): void;
        setOverlapping(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Body): void;
        bodiesAreOverlapping(bodyA: Body, bodyB: Body): boolean;
        set(bodyA: Body, shapeA: Shape, bodyB: Body, shapeB: Shape): void;

    }

    export class TupleDictionary {

        data: number[];
        keys: number[];

        getKey(id1: number, id2: number): string;
        getByKey(key: number): number;
        get(i: number, j: number): number;
        set(i: number, j: number, value: number): number;
        reset(): void;
        copy(dict: TupleDictionary): void;

    }

    export class Utils {

        static appendArray<T>(a: Array<T>, b: Array<T>): Array<T>;
        static chanceRoll(chance: number): boolean;
        static defaults(options: any, defaults: any): any;
        static extend(a: any, b: any): void;
        static randomChoice(choice1: any, choice2: any): any;
        static rotateArray(matrix: any[], direction: any): any[];
        static splice<T>(array: Array<T>, index: number, howMany: number): void;
        static shuffle<T>(array: T[]): T[];
        static transposeArray<T>(array: T[]): T[];

    }

    export class Island {

        equations: Equation[];
        bodies: Body[];

        reset(): void;
        getBodies(result: any): Body[];
        wantsToSleep(): boolean;
        sleep(): boolean;

    }

    export class IslandManager extends Solver {

        static getUnvisitedNode(nodes: Node[]): IslandNode; // IslandNode | boolean

        equations: Equation[];
        islands: Island[];
        nodes: IslandNode[];

        visit(node: IslandNode, bds: Body[], eqs: Equation[]): void;
        bfs(root: IslandNode, bds: Body[], eqs: Equation[]): void;
        split(world: World): Island[];

    }

    export class IslandNode {

        constructor(body: Body);

        body: Body;
        neighbors: IslandNode[];
        equations: Equation[];
        visited: boolean;

        reset(): void;

    }

    export class World extends EventEmitter {

        postStepEvent: {
            type: string;
        };

        addBodyEvent: {
            type: string;
        };

        removeBodyEvent: {
            type: string;
        };

        addSpringEvent: {
            type: string;
        };

        impactEvent: {
            type: string;
            bodyA: Body;
            bodyB: Body;
            shapeA: Shape;
            shapeB: Shape;
            contactEquation: ContactEquation;
        };

        postBroadphaseEvent: {
            type: string;
            pairs: Body[];
        };

        beginContactEvent: {
            type: string;
            shapeA: Shape;
            shapeB: Shape;
            bodyA: Body;
            bodyB: Body;
            contactEquations: ContactEquation[];
        };

        endContactEvent: {
            type: string;
            shapeA: Shape;
            shapeB: Shape;
            bodyA: Body;
            bodyB: Body;
        };

        preSolveEvent: {
            type: string;
            contactEquations: ContactEquation[];
            frictionEquations: FrictionEquation[];
        };

        static NO_SLEEPING: number;
        static BODY_SLEEPING: number;
        static ISLAND_SLEEPING: number;

        static integrateBody(body: Body, dy: number): void;

        constructor(options?: {
            solver?: Solver;
            gravity?: number[];
            broadphase?: Broadphase;
            islandSplit?: boolean;
            doProfiling?: boolean;
        });

        springs: Spring[];
        bodies: Body[];
        solver: Solver;
        narrowphase: Narrowphase;
        islandManager: IslandManager;
        gravity: number[];
        frictionGravity: number;
        useWorldGravityAsFrictionGravity: boolean;
        useFrictionGravityOnZeroGravity: boolean;
        doProfiling: boolean;
        lastStepTime: number;
        broadphase: Broadphase;
        constraints: Constraint[];
        defaultMaterial: Material;
        defaultContactMaterial: ContactMaterial;
        lastTimeStep: number;
        applySpringForces: boolean;
        applyDamping: boolean;
        applyGravity: boolean;
        solveConstraints: boolean;
        contactMaterials: ContactMaterial[];
        time: number;
        stepping: boolean;
        islandSplit: boolean;
        emitImpactEvent: boolean;
        sleepMode: number;

        addConstraint(c: Constraint): void;
        addContactMaterial(contactMaterial: ContactMaterial): void;
        removeContactMaterial(cm: ContactMaterial): void;
        getContactMaterial(materialA: Material, materialB: Material): ContactMaterial; // ContactMaterial | boolean
        removeConstraint(c: Constraint): void;
        step(dy: number, timeSinceLastCalled?: number, maxSubSteps?: number): void;
        runNarrowphase(np: Narrowphase, bi: Body, si: Shape, xi: any[], ai: number, bj: Body, sj: Shape, xj: any[], aj: number, cm: number, glen: number): void;
        addSpring(s: Spring): void;
        removeSpring(s: Spring): void;
        addBody(body: Body): void;
        removeBody(body: Body): void;
        getBodyByID(id: number): Body; //Body | boolean
        disableBodyCollision(bodyA: Body, bodyB: Body): void;
        enableBodyCollision(bodyA: Body, bodyB: Body): void;
        clear(): void;
        clone(): World;
        hitTest(worldPoint: number[], bodies: Body[], precision: number): Body[];
        setGlobalEquationParameters(parameters: {
            relaxation?: number;
            stiffness?: number;
        }): void;
        setGlobalStiffness(stiffness: number): void;
        setGlobalRelaxation(relaxation: number): void;
    }

}

// Generated by typings
// Source: https://raw.githubusercontent.com/photonstorm/phaser-ce/master/typescript/phaser.comments.d.ts
declare module "phaser-ce" {
    export = Phaser;
}

declare class Phaser {

    static VERSION: string;
    static DEV_VERSION: string;
    static GAMES: Phaser.Game[];

    static AUTO: number;
    static CANVAS: number;
    static WEBGL: number;
    static HEADLESS: number;
    static WEBGL_MULTI: number;

    static BITMAPDATA: number;
    static BITMAPTEXT: number;
    static BUTTON: number;
    static CANVAS_FILTER: number;
    static CIRCLE: number;
    static ELLIPSE: number;
    static EMITTER: number;
    static GRAPHICS: number;
    static GROUP: number;
    static IMAGE: number;
    static LINE: number;
    static MATRIX: number;
    static POINT: number;
    static POINTER: number;
    static POLYGON: number;
    static RECTANGLE: number;
    static ROUNDEDRECTANGLE: number;
    static RENDERTEXTURE: number;
    static RETROFONT: number;
    static SPRITE: number;
    static SPRITEBATCH: number;
    static TEXT: number;
    static TILEMAP: number;
    static TILEMAPLAYER: number;
    static TILESPRITE: number;
    static WEBGL_FILTER: number;
    static ROPE: number;
    static CREATURE: number;
    static VIDEO: number;

    static NONE: number;
    static LEFT: number;
    static RIGHT: number;
    static UP: number;
    static DOWN: number;

    static HORIZONTAL: number;
    static VERTICAL: number;
    static LANDSCAPE: number;
    static PORTRAIT: number;

    static ANGLE_UP: number;
    static ANGLE_DOWN: number;
    static ANGLE_LEFT: number;
    static ANGLE_RIGHT: number;
    static ANGLE_NORTH_EAST: number;
    static ANGLE_NORTH_WEST: number;
    static ANGLE_SOUTH_EAST: number;
    static ANGLE_SOUTH_WEST: number;

    static TOP_LEFT: number;
    static TOP_CENTER: number;
    static TOP_RIGHT: number;

    static LEFT_TOP: number;
    static LEFT_CENTER: number;
    static LEFT_BOTTOM: number;

    static CENTER: number;

    static RIGHT_TOP: number;
    static RIGHT_CENTER: number;
    static RIGHT_BOTTOM: number;

    static BOTTOM_LEFT: number;
    static BOTTOM_CENTER: number;
    static BOTTOM_RIGHT: number;

}

declare module Phaser {

    class Animation {

        constructor(game: Phaser.Game, parent: Phaser.Sprite, name: string, frameData: Phaser.FrameData, frames: number[] | string[], frameRate?: number, loop?: boolean);

        currentFrame: Phaser.Frame;
        delay: number;
        enableUpdate: boolean;
        frame: number;
        frameTotal: number;
        game: Phaser.Game;
        isFinished: boolean;
        isPaused: boolean;
        isPlaying: boolean;
        killOnComplete: boolean;
        loop: boolean;
        loopCount: number;
        name: string;
        onComplete: Phaser.Signal;
        onLoop: Phaser.Signal;
        onStart: Phaser.Signal;
        onUpdate: Phaser.Signal;
        paused: boolean;
        reversed: boolean;
        speed: number;

        complete(): void;
        destroy(): void;
        static generateFrameNames(prefix: string, start: number, stop: number, suffix?: string, zeroPad?: number): string[];
        next(quantity?: number): void;
        onPause(): void;
        onResume(): void;
        play(frameRate?: number, loop?: boolean, killOnComplete?: boolean): Phaser.Animation;
        previous(quantity?: number): void;
        restart(): void;
        reverse(): Animation;
        reverseOnce(): Animation;
        setFrame(frameId?: string | number, useLocalFrameIndex?: boolean): void;
        stop(resetFrame?: boolean, dispatchComplete?: boolean): void;
        update(): boolean;
        updateCurrentFrame(signalUpdate: boolean, fromPlay?: boolean): boolean;
        updateFrameData(frameData: FrameData): void;

    }

    class AnimationManager {

        constructor(sprite: Phaser.Sprite);

        currentAnim: Phaser.Animation;
        currentFrame: Phaser.Frame;
        frame: number;
        frameData: Phaser.FrameData;
        frameName: string;
        frameTotal: number;
        game: Phaser.Game;
        isLoaded: boolean;
        name: string;
        paused: boolean;
        sprite: Phaser.Sprite;
        updateIfVisible: boolean;

        add(name: string, frames?: number[] | string[], frameRate?: number, loop?: boolean, useNumericIndex?: boolean): Phaser.Animation;
        copyFrameData(frameData: Phaser.FrameData, frame: string | number): boolean;
        destroy(): void;
        getAnimation(name: string): Phaser.Animation;
        next(quantity?: number): void;
        play(name: string, frameRate?: number, loop?: boolean, killOnComplete?: boolean): Phaser.Animation;
        previous(quantity?: number): void;
        stop(name?: string, resetFrame?: boolean): void;
        update(): boolean;
        validateFrames(frames: Phaser.Frame[], useNumericIndex?: boolean): boolean;

    }

    class AnimationParser {

        static JSONData(game: Phaser.Game, json: any): Phaser.FrameData;
        static JSONDataHash(game: Phaser.Game, json: any): Phaser.FrameData;
        static JSONDataPyxel(game: Phaser.Game, json: any): Phaser.FrameData;
        static spriteSheet(game: Phaser.Game, key: string, frameWidth: number, frameHeight: number, frameMax?: number, margin?: number, spacing?: number, skipFrames?: number): Phaser.FrameData;
        static XMLData(game: Phaser.Game, xml: any): Phaser.FrameData;

    }

    class AudioSprite {

        constructor(game: Phaser.Game, key: string);

        game: Phaser.Game;
        key: string;
        config: any;
        autoplayKey: string;
        autoplay: boolean;
        sounds: any;

        get(marker: string): Phaser.Sound;
        play(marker: string, volume?: number): Phaser.Sound;
        stop(marker: string): Phaser.Sound;

    }

    class ArraySet {

        constructor(list: any[]);

        position: number;
        list: any[];
        total: number;
        first: any;
        next: any;

        add(item: any): any;
        getByKey(property: string, value: any): any;
        getIndex(item: any): number;
        exists(item: any): boolean;
        reset(): void;
        remove(item: any): any;
        removeAll(destoy?: boolean): void;
        setAll(key: any, value: any): void;
        callAll(key: string, ...parameter: any[]): void;

    }

    class ArrayUtils {

        static getRandomItem<T>(objects: T[], startIndex?: number, length?: number): T;
        static removeRandomItem<T>(objects: T[], startIndex?: number, length?: number): T;
        static shuffle<T>(array: T[]): T[];
        static transposeMatrix<T>(array: T[]): T;
        static rotateMatrix(matrix: any, direction: number | string): any;
        static findClosest(value: number, arr: number[]): number;
        static rotate(array: any[]): any;
        static rotateLeft(array: any[]): any;
        static rotateRight(array: any[]): any;
        static numberArray(start: number, end: number): number[];
        static numberArrayStep(start: number, end?: number, step?: number): number[];

    }

    interface BitmapFont {

        base: PIXI.BaseTexture;
        data: HTMLImageElement;
        font: Phaser.BMFont;
        url: string;

    }

    interface BMFont {

        chars: Phaser.BMFontChar[];
        font: string;
        lineHeight: number;
        size: number;

    }

    interface BMFontChar {

        x: number;
        y: number;
        width: number;
        height: number;
        xOffset: number;
        yOffset: number;
        xAdvance: number;
        kerning: number[];
        texture: PIXI.BaseTexture;

    }

    class BitmapData {

        constructor(game: Phaser.Game, key: string, width?: number, height?: number, skipPool?: boolean);

        baseTexture: PIXI.BaseTexture;
        buffer: ArrayBuffer;
        canvas: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        ctx: CanvasRenderingContext2D;
        data: Uint8Array;
        dirty: boolean;
        disableTextureUpload: boolean;
        game: Phaser.Game;
        height: number;
        imageData: ImageData;
        key: string;
        op: string;
        pixels: Uint32Array;
        smoothed: boolean;
        smoothProperty: string;
        texture: PIXI.Texture;
        textureFrame: Phaser.Frame;
        type: number;
        width: number;

        static getTransform(translateX: number, translateY: number, scaleX: number, scaleY: number, skewX: number, skewY: number): any;

        add(object: any): Phaser.BitmapData;
        addToWorld(x?: number, y?: number, anchorX?: number, anchorY?: number, scaleX?: number, scaleY?: number): Phaser.Image;
        alphaMask(source: any, mask?: any, sourceRect?: Phaser.Rectangle, maskRect?: Phaser.Rectangle): Phaser.BitmapData;
        blendAdd(): Phaser.BitmapData;
        blendColor(): Phaser.BitmapData;
        blendColorBurn(): Phaser.BitmapData;
        blendColorDodge(): Phaser.BitmapData;
        blendDarken(): Phaser.BitmapData;
        blendDestinationAtop(): Phaser.BitmapData;
        blendDestinationIn(): Phaser.BitmapData;
        blendDestinationOut(): Phaser.BitmapData;
        blendDestinationOver(): Phaser.BitmapData;
        blendDifference(): Phaser.BitmapData;
        blendExclusion(): Phaser.BitmapData;
        blendHardLight(): Phaser.BitmapData;
        blendHue(): Phaser.BitmapData;
        blendLighten(): Phaser.BitmapData;
        blendLuminosity(): Phaser.BitmapData;
        blendMultiply(): Phaser.BitmapData;
        blendOverlay(): Phaser.BitmapData;
        blendReset(): Phaser.BitmapData;
        blendSaturation(): Phaser.BitmapData;
        blendScreen(): Phaser.BitmapData;
        blendSoftLight(): Phaser.BitmapData;
        blendSourceAtop(): Phaser.BitmapData;
        blendSourceIn(): Phaser.BitmapData;
        blendSourceOut(): Phaser.BitmapData;
        blendSourceOver(): Phaser.BitmapData;
        blendXor(): Phaser.BitmapData;
        circle(x: number, y: number, radius: number, fillStyle?: string): Phaser.BitmapData;
        clear(x?: number, y?: number, width?: number, height?: number): Phaser.BitmapData;
        cls(): Phaser.BitmapData;
        copy(source?: any, x?: number, y?: number, width?: number, height?: number, tx?: number, ty?: number, newWidth?: number, newHeight?: number, rotate?: number, anchorX?: number, anchorY?: number, scaleX?: number, scaleY?: number, alpha?: number, blendMode?: string, roundPx?: boolean): Phaser.BitmapData;
        copyPixels(source: any, area: Phaser.Rectangle, x: number, y: number, alpha?: number): void;
        copyRect(source: any, area: Phaser.Rectangle, x?: number, y?: number, alpha?: number, blendMode?: string, roundPx?: boolean): Phaser.BitmapData;
        copyTransform(source: any, blendMode?: string, roundPx?: boolean): Phaser.BitmapData;
        destroy(): void;
        draw(source: any, x?: number, y?: number, width?: number, height?: number, blendMode?: string, roundPx?: boolean): Phaser.BitmapData;
        drawFull(parent: any, blendMode?: string, roundPx?: boolean): Phaser.BitmapData;
        drawGroup(group: Phaser.Group, blendMode?: string, roundPx?: boolean): Phaser.BitmapData;
        extract(destination: Phaser.BitmapData, r: number, g: number, b: number, a?: number, resize?: boolean, r2?: number, g2?: number, b2?: number): Phaser.BitmapData;
        fill(r: number, g: number, b: number, a?: number): Phaser.BitmapData;
        generateTexture(key: string): PIXI.Texture;
        getBounds(rect?: Phaser.Rectangle): Phaser.Rectangle;
        getFirstPixel(direction: number): { r: number; g: number; b: number; x: number; y: number; };
        getPixel(x: number, y: number, out?: any): any;
        getPixelRGB(x: number, y: number, out?: any, hsl?: boolean, hsv?: boolean): any;
        getPixel32(x: number, y: number): number;
        getPixels(rect: Phaser.Rectangle): ImageData;
        getTransform(translateX: number, translateY: number, scaleX: number, scaleY: number, skewX: number, skewY: number): any;
        line(x1: number, y1: number, x2: number, y2: number, color?: string, width?: number): Phaser.BitmapData;
        load(source: any): Phaser.BitmapData;
        move(x: number, y: number, wrap?: boolean): Phaser.BitmapData;
        moveH(distance: number, wrap?: boolean): Phaser.BitmapData;
        moveV(distance: number, wrap?: boolean): Phaser.BitmapData;
        processPixel(callback: (color: number, x: number, y: number) => void, callbackContext: any, x?: number, y?: Number, width?: number, height?: number): Phaser.BitmapData;
        processPixelRGB(callback: (color: ColorComponents, x: number, y: number) => void, callbackContext: any, x?: number, y?: Number, width?: number, height?: number): Phaser.BitmapData;
        rect(x: number, y: number, width: number, height: number, fillStyle?: string): Phaser.BitmapData;
        render(): Phaser.BitmapData;
        replaceRGB(r1: number, g1: number, b1: number, a1: number, r2: number, g2: number, b2: number, a2: number, region?: Phaser.Rectangle): Phaser.BitmapData;
        resize(width: number, height: number): Phaser.BitmapData;
        resizeFrame(parent: any, width: number, height: number): void;
        setHSL(h?: number, s?: number, l?: number, region?: Phaser.Rectangle): Phaser.BitmapData;
        setPixel(x: number, y: number, red: number, green: number, blue: number, immediate?: boolean): Phaser.BitmapData;
        setPixel32(x: number, y: number, red: number, green: number, blue: number, alpha: number, immediate?: boolean): Phaser.BitmapData;
        shadow(color: string, blur?: number, x?: number, y?: number): Phaser.BitmapData;
        shiftHSL(h?: number, s?: number, l?: number, region?: Phaser.Rectangle): Phaser.BitmapData;
        text(text: string, x?: number, y?: number, font?: string, color?: string, shadow?: boolean): Phaser.BitmapData;
        textureLine(line: Phaser.Line, key: string, repeat?: string): Phaser.BitmapData;
        update(x?: number, y?: number, width?: number, height?: number): Phaser.BitmapData;

    }

    class BitmapText extends PIXI.DisplayObjectContainer {

        constructor(game: Phaser.Game, x: number, y: number, font: string, text?: string, size?: number, align?: string);

        align: string;
        alive: boolean;
        anchor: Phaser.Point;
        animations: Phaser.AnimationManager;
        angle: number;
        autoCull: boolean;
        body: Phaser.Physics.Arcade.Body | Phaser.Physics.P2.Body | Phaser.Physics.Ninja.Body | any;
        bottom: number;
        cameraOffset: Phaser.Point;
        checkWorldBounds: boolean;
        data: any;
        destroyPhase: boolean;
        debug: boolean;
        dirty: boolean;
        events: Phaser.Events;
        exists: boolean;
        fixedToCamera: boolean;
        font: string;
        fontSize: number;
        fresh: boolean;
        game: Phaser.Game;
        input: Phaser.InputHandler;
        inputEnabled: boolean;
        inCamera: boolean;
        inWorld: boolean;
        key: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture;
        left: number;
        name: string;
        components: any;
        lifespan: number;
        maxWidth: number;
        offsetX: number;
        offsetY: number;
        outOfBoundsKill: boolean;
        pendingDestroy: boolean;
        physicsType: number;
        previousPosition: Phaser.Point;
        previousRotation: number;
        position: Phaser.Point;
        renderOrderID: number;
        right: number;
        text: string;
        smoothed: boolean;
        textWidth: number;
        textHeight: number;
        tint: number;
        top: number;
        type: number;
        world: Phaser.Point;
        x: number;
        y: number;
        z: number;

        alignIn(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): any;
        alignTo(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): any;
        destroy(destroyChildren?: boolean): void;
        kill(): void;
        postUpdate(): void;
        preUpdate(): void;
        purgeGlyphs(): number;
        reset(x: number, y: number, health?: number): Phaser.BitmapText;
        revive(health?: number): Phaser.BitmapText;
        scanLine(data: any, scale: number, text: string): { width: number; text: string; end: boolean; chars: string[] };
        setText(text: string): void;
        update(): void;
        updateText(): void;
        updateTransform(): void;

    }

    class Bullet extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, key?: any, frame?: any);

        kill(): Phaser.Bullet;
        update(): void;

    }

    class Button extends Phaser.Image {

        constructor(game: Phaser.Game, x?: number, y?: number, key?: string, callback?: Function, callbackContext?: any, overFrame?: string | number, outFrame?: string | number, downFrame?: string | number, upFrame?: string | number);

        forceOut: boolean;
        freezeFrames: boolean;
        onDownSound: Phaser.Sound | Phaser.AudioSprite;
        onDownSoundMarker: string;
        onInputDown: Phaser.Signal;
        onInputOut: Phaser.Signal;
        onInputOver: Phaser.Signal;
        onInputUp: Phaser.Signal;
        onOutSound: Phaser.Sound | Phaser.AudioSprite;
        onOutSoundMarker: string;
        onOverSound: Phaser.Sound | Phaser.AudioSprite;
        onOverSoundMarker: string;
        onOverMouseOnly: boolean;
        onUpSound: Phaser.Sound | Phaser.AudioSprite;
        onUpSoundMaker: string;
        physicsType: number;
        type: number;

        clearFrames(): void;
        setDownSound(sound: Phaser.Sound | Phaser.AudioSprite, marker?: string): void;
        setFrames(overFrame?: string | number, outFrame?: string | number, downFrame?: string | number, upFrame?: string | number): void;
        onInputOverHandler(sprite: Phaser.Button, pointer: Phaser.Pointer): void;
        onInputOutHandler(sprite: Phaser.Button, pointer: Phaser.Pointer): void;
        onInputDownHandler(sprite: Phaser.Button, pointer: Phaser.Pointer): void;
        onInputUpHandler(sprite: Phaser.Button, pointer: Phaser.Pointer, isOver: boolean): void;
        removedFromWorld(): void;
        setOutSound(sound: Phaser.Sound | Phaser.AudioSprite, marker?: string): void;
        setOverSound(sound: Phaser.Sound | Phaser.AudioSprite, marker?: string): void;
        setSounds(overSound?: Phaser.Sound | Phaser.AudioSprite, overMarker?: string, downSound?: Phaser.Sound | Phaser.AudioSprite, downMarker?: string, outSound?: Phaser.Sound | Phaser.AudioSprite, outMarker?: string, upSound?: Phaser.Sound | Phaser.AudioSprite, upMarker?: string): void;
        setState(newState: number): void;
        setUpSound(sound: Phaser.Sound | Phaser.AudioSprite, marker?: string): void;

    }

    class PointerMode {

        static CURSOR: number;
        static CONTACT: number;

    }

    class Cache {

        constructor(game: Phaser.Game);

        static BINARY: number;
        static BITMAPDATA: number;
        static BITMAPFONT: number;
        static CANVAS: number;
        static IMAGE: number;
        static JSON: number;
        static PHYSICS: number;
        static RENDER_TEXTURE: number;
        static SHADER: number;
        static SOUND: number;
        static SPRITE_SHEET: number;
        static TEXT: number;
        static TEXTURE: number;
        static TEXTURE_ATLAS: number;
        static TILEMAP: number;
        static XML: number;
        static VIDEO: number;

        static DEFAULT: PIXI.Texture;
        static MISSING: PIXI.Texture;

        autoResolveURL: boolean;
        game: Phaser.Game;
        onSoundUnlock: Phaser.Signal;

        addBinary(key: string, binaryData: any): void;
        addBitmapData(key: string, bitmapData: Phaser.BitmapData, frameData?: Phaser.FrameData): Phaser.BitmapData;
        addBitmapFont(key: string, url: string, data: any, atlasData: any, atlasType: string, xSpacing?: number, ySpacing?: number): void;
        addBitmapFontFromAtlas(key: string, atlasKey: string, atlasFrame: string, dataKey: string, dataType?: string, xSpacing?: number, ySpacing?: number): void;
        addCanvas(key: string, canvas: HTMLCanvasElement, context?: CanvasRenderingContext2D): void;
        addDefaultImage(): void;
        addImage(key: string, url: string, data: any): HTMLImageElement;
        addJSON(key: string, urL: string, data: any): void;
        addMissingImage(): void;
        addPhysicsData(key: string, url: string, JSONData: any, format: number): void;
        addRenderTexture(key: string, texture: RenderTexture): void;
        addShader(key: string, url: string, data: any): void;
        addSound(key: string, url: string, data: any, webAudio: boolean, audioTag: boolean): void;
        addSpriteSheet(key: string, url: string, data: any, frameWidth: number, frameHeight: number, frameMax?: number, margin?: number, spacing?: number, skipFrames?: number): void;
        addText(key: string, url: string, data: any): void;
        addTextureAtlas(key: string, url: string, data: any, atlasData: any, format: number): void;
        addTilemap(key: string, url: string, mapData: any, format: number): void;
        addVideo(key: string, url: string, data: any, isBlob?: boolean): void;
        addXML(key: string, url: string, data: any): void;
        checkBinaryKey(key: string): boolean;
        checkBitmapDataKey(key: string): boolean;
        checkBitmapFontKey(key: string): boolean;
        checkCanvasKey(key: string): boolean;
        checkImageKey(key: string): boolean;
        checkJSONKey(key: string): boolean;
        checkKey(cache: number, key: string): boolean;
        checkPhysicsKey(key: string): boolean;
        checkRenderTextureKey(key: string): boolean;
        checkShaderKey(key: string): boolean;
        checkSoundKey(key: string): boolean;
        checkTextKey(key: string): boolean;
        checkTextureKey(key: string): boolean;
        checkTilemapKey(key: string): boolean;
        checkURL(url: string): any;
        checkUrl(url: string): any;
        checkXMLKey(key: string): boolean;
        checkVideoKey(key: string): boolean;
        clearGLTextures(): void;
        decodedSound(key: string, data: any): void;
        destroy(): void;
        getBaseTexture(key: string, cache?: number): PIXI.BaseTexture;
        getBinary(key: string): any;
        getBitmapData(key: string): Phaser.BitmapData;
        getBitmapFont(key: string): Phaser.BitmapFont;
        getCanvas(key: string): HTMLCanvasElement;
        getFrame(key: string, cache?: number): Phaser.Frame;
        getFrameByIndex(key: string, index: number, cache?: number): Phaser.Frame;
        getFrameByName(key: string, name: string, cache?: number): Phaser.Frame;
        getFrameCount(key: string, cache?: number): number;
        getFrameData(key: string, cache?: number): Phaser.FrameData;
        getImage(key: string, full?: boolean): HTMLImageElement;
        getItem(key: string, cache: number, method?: string, property?: string): any;
        getJSON(key: string, clone?: boolean): any;
        getKeys(cache: number): string[];
        getPhysicsData(key: string, object?: string, fixtureKey?: string): any[];
        getRenderTexture(key: string): Phaser.CachedRenderTexture;
        getShader(key: string): string;
        getSound(key: string): Phaser.Sound;
        getSoundData(key: string): any;
        getSpriteSheetKey(key: string): boolean;
        getText(key: string): string;
        getTextKeys(): string[];
        getTexture(key: string): Phaser.RenderTexture;
        getTextureAtlasKey(key: string): boolean;
        getTextureFrame(key: string): Phaser.Frame;
        getTilemap(key: string): any;
        getTilemapData(key: string): any;
        getURL(url: string): any;
        getXML(key: string): any;
        getVideo(key: string): Phaser.Video;
        hasFrameData(key: string, cache?: number): boolean;
        isSoundDecoded(key: string): boolean;
        isSoundReady(key: string): boolean;
        isSpriteSheet(key: string): boolean;
        reloadSound(key: string): void;
        reloadSoundComplete(key: string): void;
        removeBinary(key: string): void;
        removeBitmapData(key: string): void;
        removeBitmapFont(key: string): void;
        removeCanvas(key: string): void;
        removeImage(key: string, removeFromPixi?: boolean): void;
        removeJSON(key: string): void;
        removePhysics(key: string): void;
        removeRenderTexture(key: string): void;
        removeShader(key: string): void;
        removeSound(key: string): void;
        removeSpriteSheet(key: string): void;
        removeText(key: string): void;
        removeTextureAtlas(key: string): void;
        removeTilemap(key: string): void;
        removeXML(key: string): void;
        removeVideo(key: string): void;
        updateFrameData(key: string, frameData: any, cache?: number): void;
        updateSound(key: string, property: string, value: Phaser.Sound): void;

    }

    interface CachedRenderTexture {

        frame: Phaser.Frame;
        texture: Phaser.RenderTexture;

    }

    class Camera {

        constructor(game: Phaser.Game, id: number, x: number, y: number, width: number, height: number);

        static FOLLOW_LOCKON: number;
        static FOLLOW_PLATFORMER: number;
        static FOLLOW_TOPDOWN: number;
        static FOLLOW_TOPDOWN_TIGHT: number;
        static SHAKE_BOTH: number;
        static SHAKE_HORIZONTAL: number;
        static SHAKE_VERTICAL: number;
        static ENABLE_FX: number;

        atLimit: { x: boolean; y: boolean; };
        bounds: Phaser.Rectangle;
        deadzone: Phaser.Rectangle;
        displayObject: PIXI.DisplayObject;
        id: number;
        fx: Phaser.Graphics;
        game: Phaser.Game;
        height: number;
        lerp: Phaser.Point;
        position: Phaser.Point;
        roundPx: boolean;
        scale: Phaser.Point;
        shakeIntensity: number;
        onFadeComplete: Phaser.Signal;
        onFlashComplete: Phaser.Signal;
        onShakeComplete: Phaser.Signal;
        target: Phaser.Sprite;
        totalInView: number;
        view: Phaser.Rectangle;
        visible: boolean;
        width: number;
        world: Phaser.World;
        x: number;
        y: number;

        checkBounds(): void;
        fade(color?: number, duration?: number, force?: boolean, alpha?: number): boolean;
        flash(color?: number, duration?: number, force?: boolean, alpha?: number): boolean;
        focusOn(displayObject: PIXI.DisplayObject): void;
        focusOnXY(x: number, y: number): void;
        follow(target: Phaser.Sprite, style?: number, lerpX?: number, lerpY?: number): void;
        reset(): void;
        resetFX(): void;
        setBoundsToWorld(): void;
        setPosition(x: number, y: number): void;
        setSize(width: number, height: number): void;
        shake(intensity?: number, duration?: number, force?: boolean, direction?: number, shakeBounds?: boolean): boolean;
        unfollow(): void;
        update(): void;

    }

    class Canvas {

        static addToDOM(canvas: HTMLCanvasElement, parent: HTMLElement, overflowHidden?: boolean): HTMLCanvasElement;
        static create(parent: HTMLDivElement, width?: number, height?: number, id?: string, skipPool?: boolean): HTMLCanvasElement;
        static getSmoothingEnabled(context: CanvasRenderingContext2D): boolean;
        static getSmoothingPrefix(context: CanvasRenderingContext2D): string;
        static removeFromDOM(canvas: HTMLCanvasElement): void;
        static setBackgroundColor(canvas: HTMLCanvasElement, color: string): HTMLCanvasElement;
        static setImageRenderingBicubic(canvas: HTMLCanvasElement): HTMLCanvasElement;
        static setImageRenderingCrisp(canvas: HTMLCanvasElement): HTMLCanvasElement;
        static setSmoothingEnabled(context: CanvasRenderingContext2D, value: boolean): CanvasRenderingContext2D;
        static setTouchAction(canvas: HTMLCanvasElement, value: string): HTMLCanvasElement;
        static setTransform(context: CanvasRenderingContext2D, translateX: number, translateY: number, scaleX: number, scaleY: number, skewX: number, skewY: number): CanvasRenderingContext2D;
        static setUserSelect(canvas: HTMLCanvasElement, value?: string): HTMLCanvasElement;

    }

    class Circle {

        constructor(x?: number, y?: number, diameter?: number);

        area: number;
        bottom: number;
        diameter: number;
        empty: boolean;
        left: number;
        radius: number;
        right: number;
        top: number;
        x: number;
        y: number;

        static circumferencePoint(a: Phaser.Circle, angle: number, asDegrees: boolean, out?: Phaser.Point): Phaser.Point;
        static contains(a: Phaser.Circle, x: number, y: number): boolean;
        static equals(a: Phaser.Circle, b: Phaser.Circle): boolean;
        static intersects(a: Phaser.Circle, b: Phaser.Circle): boolean;
        static intersectsRectangle(c: Phaser.Circle, r: Phaser.Rectangle): boolean;

        circumference(): number;
        circumferencePoint(angle: number, asDegrees?: boolean, out?: Phaser.Point): Phaser.Point;
        clone(output: Phaser.Circle): Phaser.Circle;
        contains(x: number, y: number): boolean;
        copyFrom(source: any): Circle;
        copyTo(dest: any): any;
        distance(dest: any, round?: boolean): number;
        getBounds(): Phaser.Rectangle;
        offset(dx: number, dy: number): Phaser.Circle;
        offsetPoint(point: Phaser.Point): Phaser.Circle;
        random(out?: Phaser.Point): Phaser.Point;
        scale(x: number, y?: number): Phaser.Rectangle;
        setTo(x: number, y: number, diameter: number): Circle;
        toString(): string;

    }

    class Color {

        static componentToHex(color: number): string;
        static createColor(r?: number, g?: number, b?: number, a?: number, h?: number, s?: number, l?: number, v?: number): ColorComponents;
        static fromRGBA(rgba: number, out?: ColorComponents): ColorComponents;
        static getAlpha(color: number): number;
        static getAlphaFloat(color: number): number;
        static getBlue(color: number): number;
        static getColor(red: number, green: number, blue: number): number;
        static getColor32(alpha: number, red: number, green: number, blue: number): number;
        static getGreen(color: number): number;
        static getRandomColor(min?: number, max?: number, alpha?: number): number;
        static getRed(color: number): number;
        static getRGB(color: number): RGBColor;
        static getWebRGB(color: number | RGBColor): string;
        static hexToRGBArray(color: number): number[];
        static hexToRGB(h: string): number;
        static hexToColor(hex: string, out?: ColorComponents): ColorComponents;
        static HSLtoRGB(h: number, s: number, l: number, out?: ColorComponents): ColorComponents;
        static HSLColorWheel(s?: number, l?: number): ColorComponents[];
        static HSVtoRGB(h: number, s: number, v: number, out?: ColorComponents): ColorComponents;
        static HSVColorWheel(s?: number, v?: number): ColorComponents[];
        static hueToColor(p: number, q: number, t: number): number;
        static interpolateColor(color1: number, color2: number, steps: number, currentStep: number, alpha?: number): number;
        static interpolateColorWithRGB(color: number, r: number, g: number, b: number, steps: number, currentStep: number): number;
        static interpolateRGB(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number, steps: number, currentStep: number): number;
        static packPixel(r: number, g: number, b: number, a: number): number;
        static RGBArrayToHex(rgb: number[]): number;
        static RGBtoHSL(r: number, g: number, b: number, out?: ColorComponents): ColorComponents;
        static RGBtoHSV(r: number, g: number, b: number, out?: ColorComponents): ColorComponents;
        static RGBtoString(r: number, g: number, b: number, a?: number, prefix?: string): string;
        static toRGBA(r: number, g: number, b: number, a: number): number;
        static toABGR(r: number, g: number, b: number, a: number): number;
        static unpackPixel(rgba: number, out?: ColorComponents, hsl?: boolean, hsv?: boolean): ColorComponents;
        static updateColor(out: ColorComponents): ColorComponents;
        static valueToColor(value: string, out?: ColorComponents): ColorComponents;
        static webToColor(web: string, out?: ColorComponents): ColorComponents;
        static blendNormal(a: number): number;
        static blendLighten(a: number, b: number): number;
        static blendDarken(a: number, b: number): number;
        static blendMultiply(a: number, b: number): number;
        static blendAverage(a: number, b: number): number;
        static blendAdd(a: number, b: number): number;
        static blendSubtract(a: number, b: number): number;
        static blendDifference(a: number, b: number): number;
        static blendNegation(a: number, b: number): number;
        static blendScreen(a: number, b: number): number;
        static blendExclusion(a: number, b: number): number;
        static blendOverlay(a: number, b: number): number;
        static blendSoftLight(a: number, b: number): number;
        static blendHardLight(a: number, b: number): number;
        static blendColorDodge(a: number, b: number): number;
        static blendColorBurn(a: number, b: number): number;
        static blendLinearDodge(a: number, b: number): number;
        static blendLinearBurn(a: number, b: number): number;
        static blendLinearLight(a: number, b: number): number;
        static blendVividLight(a: number, b: number): number;
        static blendPinLight(a: number, b: number): number;
        static blendHardMix(a: number, b: number): number;
        static blendReflect(a: number, b: number): number;
        static blendGlow(a: number, b: number): number;
        static blendPhoenix(a: number, b: number): number;

    }

    interface RGBColor {
        r: number;
        g: number;
        b: number;
        a: number;
    }
    interface ColorComponents extends RGBColor {
        h: number;
        s: number;
        v: number;
        l: number;
        color: number;
        color32: number;
        rgba: string;
    }

    class Create {

        constructor(game: Phaser.Game);

        static PALETTE_ARNE: number;
        static PALETTE_JMP: number;
        static PALETTE_CGA: number;
        static PALETTE_C64: number;
        static PALETTE_JAPANESE_MACHINE: number;

        bmd: Phaser.BitmapData;
        canvas: HTMLCanvasElement;
        ctx: CanvasRenderingContext2D;
        game: Phaser.Game;
        palettes: any;

        grid(key: string, width: number, height: number, cellWidth: number, cellHeight: number, color: string): PIXI.Texture;
        texture(key: string, data: any, pixelWidth?: number, pixelHeight?: number, palette?: number): PIXI.Texture;

    }

    interface CursorKeys {

        up: Phaser.Key;
        down: Phaser.Key;
        left: Phaser.Key;
        right: Phaser.Key;

    }

    class Device {

        static LITTLE_ENDIAN: boolean;
        static onInitialized: Phaser.Signal;

        static checkFullScreenSupport(): void;
        static canPlayAudio(type: string): boolean;
        static canPlayVideo(type: string): boolean;
        static isConsoleOpen(): boolean;
        static isAndroidStockBrowser(): string;
        static whenReady: (callback: Function, context?: any) => void;

        android: boolean;
        arora: boolean;
        audioData: boolean;
        cancelFullScreen: string;
        canHandleAlpha: boolean;
        canUseMultiply: boolean;
        canvas: boolean;
        chrome: boolean;
        chromeOS: boolean;
        chromeVersion: number;
        cocoonJS: boolean;
        cocoonJSApp: boolean;
        cordova: boolean;
        crosswalk: boolean;
        css3D: boolean;
        desktop: boolean;
        deviceReadyAt: number;
        electron: boolean;
        ejecta: boolean;
        epiphany: boolean;
        file: boolean;
        fileSystem: boolean;
        firefox: boolean;
        firefoxVersion: number;
        fullScreen: boolean;
        fullScreenKeyboard: boolean;
        getUserMedia: boolean;
        game: Phaser.Game;
        h264Video: boolean;
        hlsVideo: boolean;
        ie: boolean;
        ieVersion: number;
        iOS: boolean;
        iOSVersion: number;
        initialized: boolean;
        iPad: boolean;
        iPhone: boolean;
        iPhone4: boolean;
        kindle: boolean;
        linux: boolean;
        littleEndian: boolean;
        localStorage: boolean;
        m4a: boolean;
        macOS: boolean;
        midori: boolean;
        mobileSafari: boolean;
        mp3: boolean;
        mp4Video: boolean;
        mspointer: boolean;
        node: boolean;
        nodeWebkit: boolean;
        ogg: boolean;
        oggVideo: number;
        opera: boolean;
        opus: boolean;
        pixelRatio: number;
        pointerLock: boolean;
        quirksMode: boolean;
        requestFullScreen: string;
        safari: boolean;
        silk: boolean;
        support32bit: boolean;
        touch: boolean;
        trident: boolean;
        tridentVersion: number;
        typedArray: boolean;
        vibration: boolean;
        vita: boolean;
        wav: boolean;
        webApp: boolean;
        webAudio: boolean;
        webGL: boolean;
        webm: boolean;
        webmVideo: boolean;
        windows: boolean;
        windowsPhone: boolean;
        wheelEvent: string;
        worker: boolean;
        wp9Video: boolean;

    }

    class DeviceButton {

        constructor(parent: Phaser.Pointer | Phaser.SinglePad, butonCode: number);

        buttonCode: number;
        game: Phaser.Game;
        isDown: boolean;
        isUp: boolean;
        onDown: Phaser.Signal;
        onFloat: Phaser.Signal;
        onUp: Phaser.Signal;
        pad: Phaser.Gamepad;
        repeats: number;
        timeDown: number;
        timeUp: number;
        value: number;

        destroy(): void;
        justPressed(duration?: number): boolean;
        justReleased(duration?: number): boolean;
        processButtonDown(value: number): void;
        processButtonFloat(value: number): void;
        processButtonUp(value: number): void;
        reset(): void;

    }

    module Easing {

        var Default: Function;
        var Power0: Function;
        var Power1: Function;
        var power2: Function;
        var power3: Function;
        var power4: Function;

        class Back {
            static In(k: number): number;
            static Out(k: number): number;
            static InOut(k: number): number;
        }

        class Bounce {
            static In(k: number): number;
            static Out(k: number): number;
            static InOut(k: number): number;
        }

        class Circular {
            static In(k: number): number;
            static Out(k: number): number;
            static InOut(k: number): number;
        }

        class Cubic {
            static In(k: number): number;
            static Out(k: number): number;
            static InOut(k: number): number;
        }

        class Elastic {
            static In(k: number): number;
            static Out(k: number): number;
            static InOut(k: number): number;
        }

        class Exponential {
            static In(k: number): number;
            static Out(k: number): number;
            static InOut(k: number): number;
        }

        class Linear {
            static None(k: number): number;
        }

        class Quadratic {
            static In(k: number): number;
            static Out(k: number): number;
            static InOut(k: number): number;
        }

        class Quartic {
            static In(k: number): number;
            static Out(k: number): number;
            static InOut(k: number): number;
        }

        class Quintic {
            static In(k: number): number;
            static Out(k: number): number;
            static InOut(k: number): number;
        }

        class Sinusoidal {
            static In(k: number): number;
            static Out(k: number): number;
            static InOut(k: number): number;
        }

    }

    class Ellipse {

        constructor(x?: number, y?: number, width?: number, height?: number);

        bottom: number;
        empty: boolean;
        height: number;
        left: number;
        right: number;
        top: number;
        type: number;
        width: number;
        x: number;
        y: number;

        static constains(a: Phaser.Ellipse, x: number, y: number): boolean;

        clone(output: Phaser.Ellipse): Phaser.Ellipse;
        contains(x: number, y: number): boolean;
        copyFrom(source: any): Phaser.Ellipse;
        copyTo(dest: any): any;
        getBounds(): Phaser.Rectangle;
        random(out?: Phaser.Point): Phaser.Point;
        setTo(x: number, y: number, width: number, height: number): Phaser.Ellipse;
        toString(): string;

    }

    class Events {

        constructor(sprite: Phaser.Sprite);

        parent: Phaser.Sprite;
        onAddedToGroup: Phaser.Signal;
        onRemovedFromGroup: Phaser.Signal;
        onRemovedFromWorld: Phaser.Signal;
        onKilled: Phaser.Signal;
        onRevived: Phaser.Signal;
        onOutOfBounds: Phaser.Signal;
        onEnterBounds: Phaser.Signal;
        onInputOver: Phaser.Signal;
        onInputOut: Phaser.Signal;
        onInputDown: Phaser.Signal;
        onInputUp: Phaser.Signal;
        onDestroy: Phaser.Signal;
        onDragStart: Phaser.Signal;
        onDragStop: Phaser.Signal;
        onDragUpdate: Phaser.Signal;
        onAnimationStart: Phaser.Signal;
        onAnimationComplete: Phaser.Signal;
        onAnimationLoop: Phaser.Signal;

        destroy(): void;

    }

    class Filter extends PIXI.AbstractFilter {

        constructor(game: Phaser.Game, uniforms: any, fragmentSrc: string | string[]);

        dirty: boolean;
        game: Phaser.Game;
        height: number;
        fragmentSrc: string | string[];
        padding: number;
        prevPoint: Phaser.Point;
        type: number;
        uniforms: any;
        width: number;

        addToWorld(x?: number, y?: number, width?: number, height?: number, anchorX?: number, anchorY?: number): Phaser.Image;
        apply(frameBuffer: WebGLFramebuffer): void;
        destroy(): void;
        init(...args: any[]): void;
        setResolution(width: number, height: number): void;
        syncUniforms(): void;
        update(pointer?: Phaser.Pointer): void;

    }

    module Filter {

        class BinarySerpents extends Phaser.Filter {

            constructor(game: Phaser.Game, width: number, height: number, march?: number, maxDistance?: number);

            fog: number;

        }

        class BlurX extends Phaser.Filter {

            blur: number;

        }

        class BlurY extends Phaser.Filter {

            blur: number;

        }

        class CausticLight extends Phaser.Filter {

            constructor(game: Phaser.Game, width: number, height: number, divisor?: number);

            init(width: number, height: number, divisor?: number): void;

        }

        class CheckerWave extends Phaser.Filter {

            constructor(game: Phaser.Game, width: number, height: number);

            alpha: number;
            cameraX: number;
            cameraY: number;
            cameraZ: number;

            init(width: number, height: number): void;
            setColor1(red: number, green: number, blue: number): void;
            setColor2(red: number, green: number, blue: number): void;

        }

        class ColorBars extends Phaser.Filter {

            constructor(game: Phaser.Game, width: number, height: number);

            alpha: number;

            init(width: number, height: number): void;

        }

        class Fire extends Phaser.Filter {

            constructor(width: number, height: number, alpha?: number, shift?: number);

            alpha: number;
            shift: number;
            speed: number;

            init(width: number, height: number, alpha?: number, shift?: number): void;

        }

        class Gray extends Phaser.Filter {

            gray: number;

        }

        class HueRotate extends Phaser.Filter {

            constructor(game: Phaser.Game, width: number, height: number, texture: any);

            alpha: number;

            init(width: number, height: number, texture: any): void;

        }

        class LazerBeam extends Phaser.Filter {

            init(width: number, height: number, divisor?: number): void;

        }

        class LightBeam extends Phaser.Filter {

            constructor(game: Phaser.Game, width: number, height: number);

            alpha: number;
            blue: number;
            green: number;
            red: number;
            thickness: number;
            speed: number;

            init(width: number, height: number): void;

        }

        class Marble extends Phaser.Filter {

            constructor(game: Phaser.Game, width: number, height: number, speed?: number, intensity?: number);

            alpha: number;
            intensity: number;
            speed: number;

            init(width: number, height: number, speed?: number, intensity?: number): void;

        }

        class Pixelate extends Phaser.Filter {

            size: number;
            sizeX: number;
            sizeY: number;

        }

        class Plasma extends Phaser.Filter {

            constructor(game: Phaser.Game, width: number, height: number, alpha?: number, size?: number);

            alpha: number;
            blueShift: number;
            greenShift: number;
            redShift: number;
            size: number;

            init(width: number, height: number, alpha?: number, size?: number): void;

        }

        class SampleFilter extends Phaser.Filter {

            constructor(game: Phaser.Game, width: number, height: number, divisor?: number);

            init(width: number, height: number, divisor?: number): void;

        }

        class Tunnel extends Phaser.Filter {

            constructor(game: Phaser.Game, width: number, height: number, texture: any);

            alpha: number;
            origin: number;

            init(width: number, height: number, texture: any): void;

        }
    }

    class FlexGrid {

        constructor(manager: Phaser.ScaleManager, width: number, height: number);

        game: Phaser.Game;
        manager: Phaser.ScaleManager;
        width: number;
        height: number;
        boundsCustom: Phaser.Rectangle;
        boundsFluid: Phaser.Rectangle;
        boundsFull: Phaser.Rectangle;
        boundsNone: Phaser.Rectangle;
        customWidth: number;
        customHeight: number;
        customOffsetX: number;
        customOffsetY: number;
        positionCustom: Phaser.Point;
        positionFluid: Phaser.Point;
        positionFull: Phaser.Point;
        positionNone: Phaser.Point;
        scaleCustom: Phaser.Point;
        scaleFluid: Phaser.Point;
        scaleFluidInversed: Phaser.Point;
        scaleFull: Phaser.Point;
        scaleNone: Phaser.Point;
        ratioH: number;
        ratioV: number;
        multiplier: number;

        createCustomLayer(width: number, height: number, children?: PIXI.DisplayObject[], addToWorld?: boolean): Phaser.FlexLayer;
        createFluidLayer(children: PIXI.DisplayObject[]): Phaser.FlexLayer;
        createFullLayer(children: PIXI.DisplayObject[]): Phaser.FlexLayer;
        createFixedLayer(children: PIXI.DisplayObject[]): Phaser.FlexLayer;
        debug(): void;
        fitSprite(sprite: Phaser.Sprite): void;
        onResize(width: number, height: number): void;
        refresh(): void;
        reset(): void;
        setSize(width: number, height: number): void;

    }

    class FlexLayer extends Phaser.Group {

        constructor(manager: Phaser.ScaleManager, position: Phaser.Point, bounds: Phaser.Rectangle, scale: Phaser.Point);

        grid: Phaser.FlexGrid;
        manager: Phaser.ScaleManager;

        bottomLeft: Phaser.Point;
        bottomMiddle: Phaser.Point;
        bottomRight: Phaser.Point;
        bounds: Phaser.Rectangle;
        persist: boolean;
        position: Phaser.Point;
        scale: Phaser.Point;
        topLeft: Phaser.Point;
        topMiddle: Phaser.Point;
        topRight: Phaser.Point;

        debug(): void;
        resize(): void;

    }

    class Frame {

        constructor(index: number, x: number, y: number, width: number, height: number, name: string);

        bottom: number;
        centerX: number;
        centerY: number;
        distance: number;
        height: number;
        index: number;
        name: string;
        right: number;
        rotated: boolean;
        sourceSizeH: number;
        sourceSizeW: number;
        spriteSourceSizeH: number;
        spriteSourceSizeW: number;
        spriteSourceSizeX: number;
        spriteSourceSizeY: number;
        trimmed: boolean;
        uuid: string;
        width: number;
        x: number;
        y: number;

        clone(): Phaser.Frame;
        getRect(out?: Phaser.Rectangle): Phaser.Rectangle;
        setTrim(trimmed: boolean, actualWidth: number, actualHeight: number, destX: number, destY: number, destWidth: number, destHeight: number): void;
        resize(width: number, height: number): void;

    }

    class FrameData {

        total: number;

        addFrame(frame: Frame): Phaser.Frame;
        checkFrameName(name: string): boolean;
        clone(): Phaser.FrameData;
        getFrame(index: number): Phaser.Frame;
        getFrameByName(name: string): Phaser.Frame;
        getFrameIndexes(frames?: number[], useNumericIndex?: boolean, output?: number[]): number[];
        getFrameRange(start: number, end: number, output: Phaser.Frame[]): Phaser.Frame[];
        getFrames(frames?: number[], useNumericIndex?: boolean, output?: Phaser.Frame[]): Phaser.Frame[];

    }

    interface IGameConfig {

        enableDebug?: boolean;
        width?: number;
        height?: number;
        renderer?: number;
        parent?: any;
        transparent?: boolean;
        antialias?: boolean;
        resolution?: number;
        preserveDrawingBuffer?: boolean;
        physicsConfig?: any;
        seed?: string;
        state?: Phaser.State;
        forceSetTimeOut?: boolean;
        multiTextue?: boolean;

    }

    class Game {

        constructor(width?: number | string, height?: number | string, renderer?: number, parent?: any, state?: any, transparent?: boolean, antialias?: boolean, physicsConfig?: any);
        constructor(config: IGameConfig);

        add: Phaser.GameObjectFactory;
        antialias: boolean;
        cache: Phaser.Cache;
        camera: Phaser.Camera;
        canvas: HTMLCanvasElement;
        clearBeforeRender: boolean;
        config: IGameConfig;
        context: CanvasRenderingContext2D;
        count: number;
        create: Phaser.Create;
        debug: Phaser.Utils.Debug;
        device: Phaser.Device;
        forceSingleUpdate: boolean;
        fpsProblemNotifier: Phaser.Signal;
        height: number;
        id: number;
        input: Phaser.Input;
        isBooted: boolean;
        isRunning: boolean;
        load: Phaser.Loader;
        lockRender: boolean;
        make: Phaser.GameObjectCreator;
        math: Phaser.Math;
        net: Phaser.Net;
        onBlur: Phaser.Signal;
        onFocus: Phaser.Signal;
        onPause: Phaser.Signal;
        onResume: Phaser.Signal;
        parent: HTMLElement;
        particles: Phaser.Particles;
        paused: boolean;
        pendingStep: boolean;
        physics: Phaser.Physics;
        physicsConfig: any;
        plugins: PluginManager;
        preserveDrawingBuffer: Boolean;
        raf: Phaser.RequestAnimationFrame;
        renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer;
        renderType: number;
        resolution: number;
        rnd: Phaser.RandomDataGenerator;
        scale: Phaser.ScaleManager;
        scratch: Phaser.BitmapData;
        sound: Phaser.SoundManager;
        stage: Phaser.Stage;
        state: Phaser.StateManager;
        stepCount: number;
        stepping: boolean;
        time: Phaser.Time;
        transparent: boolean;
        tweens: Phaser.TweenManager;
        currentUpdateID: number;
        updatesThisFrame: number;
        width: number;
        world: Phaser.World;

        boot(): void;
        destroy(): void;
        disableStep(): void;
        enableStep(): void;
        focusGain(event: any): void;
        focusLoss(event: any): void;
        gamePaused(event: any): void;
        gameResumed(event: any): void;
        parseConfig(config: any): void;
        removeFromDOM(canvas: HTMLCanvasElement): void;
        setUpRenderer(): void;
        showDebugHeader(): void;
        step(): void;
        update(time: number): void;
        updateLogic(timeStep: number): void;
        updateRender(timeStep: number): void;

    }

    class GameObjectCreator {

        constructor(game: Phaser.Game);

        game: Phaser.Game;
        world: Phaser.World;

        audio(key: string, volume?: number, loop?: boolean, connect?: boolean): Phaser.Sound;
        audioSprite(key: string): Phaser.AudioSprite;
        bitmapData(width?: number, height?: number, key?: string, addToCache?: boolean): Phaser.BitmapData;
        bitmapText(x: number, y: number, font: string, text?: string, size?: number, align?: string): Phaser.BitmapText;
        button(x?: number, y?: number, key?: string, callback?: Function, callbackContext?: any, overFrame?: any, outFrame?: any, downFrame?: any, upFrame?: any): Phaser.Button;
        emitter(x?: number, y?: number, maxParticles?: number): Phaser.Particles.Arcade.Emitter;
        filter(filter: any, ...args: any[]): Phaser.Filter;
        graphics(x?: number, y?: number): Phaser.Graphics;
        group(parent?: any, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number): Phaser.Group;
        image(x: number, y: number, key?: any, frame?: any): Phaser.Image;
        renderTexture(width?: number, height?: number, key?: any, addToCache?: boolean): Phaser.RenderTexture;
        retroFont(font: string, characterWidth: number, characterHeight: number, chars: string, charsPerRow: number, xSpacing?: number, ySpacing?: number, xOffset?: number, yOffset?: number): Phaser.RetroFont;
        rope(x: number, y: number, key: any, frame?: any, points?: Phaser.Point[]): Phaser.Rope;
        sound(key: string, volume?: number, loop?: boolean, connect?: boolean): Phaser.Sound;
        sprite(x: number, y: number, key?: any, frame?: any): Phaser.Sprite;
        spriteBatch(parent: any, name?: String, addToStage?: boolean): Phaser.SpriteBatch;
        text(x: number, y: number, text?: string, style?: any): Phaser.Text;
        tilemap(key: string, tileWidth?: number, tileHeight?: number, width?: number, height?: number): Phaser.Tilemap;
        tileSprite(x: number, y: number, width: number, height: number, key: any, frame: any): Phaser.TileSprite;
        tween(obj: any): Phaser.Tween;

    }

    class GameObjectFactory {

        constructor(game: Phaser.Game);

        game: Phaser.Game;
        world: Phaser.World;

        audio(key: string, volume?: number, loop?: boolean, connect?: boolean): Phaser.Sound;
        audioSprite(key: string): Phaser.AudioSprite;
        bitmapData(width?: number, height?: number, key?: string, addToCache?: boolean): Phaser.BitmapData;
        bitmapText(x: number, y: number, font: string, text?: string, size?: number, group?: Phaser.Group): Phaser.BitmapText;
        button(x?: number, y?: number, key?: string, callback?: Function, callbackContext?: any, overFrame?: any, outFrame?: any, downFrame?: any, upFrame?: any, group?: Phaser.Group): Phaser.Button;
        emitter(x?: number, y?: number, maxParticles?: number): Phaser.Particles.Arcade.Emitter;
        existing(object: any): any;
        filter(filter: string, ...args: any[]): Phaser.Filter;
        graphics(x: number, y: number, group?: Phaser.Group): Phaser.Graphics;
        group(parent?: any, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number): Phaser.Group;
        image(x: number, y: number, key?: any, frame?: any, group?: Phaser.Group): Phaser.Image;
        physicsGroup(physicsBodyType?: number, parent?: any, name?: string, addToStage?: boolean): Phaser.Group;
        plugin(plugin: Phaser.Plugin, ...parameter: any[]): Phaser.Plugin;
        renderTexture(width?: number, height?: number, key?: string, addToCache?: boolean): Phaser.RenderTexture;
        retroFont(font: string, characterWidth: number, characterHeight: number, chars: string, charsPerRow: number, xSpacing?: number, ySpacing?: number, xOffset?: number, yOffset?: number): Phaser.RetroFont;
        rope(x: number, y: number, key: any, frame?: any, points?: Phaser.Point[]): Phaser.Rope;
        sound(key: string, volume?: number, loop?: boolean, connect?: boolean): Phaser.Sound;
        sprite(x: number, y: number, key?: any, frame?: any, group?: Phaser.Group): Phaser.Sprite;
        spriteBatch(parent: any, name?: string, addToStage?: boolean): Phaser.Group;
        text(x: number, y: number, text: string, style: any, group?: Phaser.Group): Phaser.Text;
        tilemap(key?: string, tileWidth?: number, tileHeight?: number, width?: number, height?: number): Phaser.Tilemap;
        tileSprite(x: number, y: number, width: number, height: number, key?: any, frame?: any, group?: Phaser.Group): Phaser.TileSprite;
        tween(obj: any): Phaser.Tween;
        weapon(quantity?: number, key?: any, frame?: any, group?: Phaser.Group): Phaser.Weapon;
        video(key?: string, url?: string): Phaser.Video;

    }

    class Gamepad {

        constructor(game: Phaser.Game);

        static BUTTON_0: number;
        static BUTTON_1: number;
        static BUTTON_2: number;
        static BUTTON_3: number;
        static BUTTON_4: number;
        static BUTTON_5: number;
        static BUTTON_6: number;
        static BUTTON_7: number;
        static BUTTON_8: number;
        static BUTTON_9: number;
        static BUTTON_10: number;
        static BUTTON_11: number;
        static BUTTON_12: number;
        static BUTTON_13: number;
        static BUTTON_14: number;
        static BUTTON_15: number;

        static AXIS_0: number;
        static AXIS_1: number;
        static AXIS_2: number;
        static AXIS_3: number;
        static AXIS_4: number;
        static AXIS_5: number;
        static AXIS_6: number;
        static AXIS_7: number;
        static AXIS_8: number;
        static AXIS_9: number;

        static XBOX360_A: number;
        static XBOX360_B: number;
        static XBOX360_X: number;
        static XBOX360_Y: number;
        static XBOX360_LEFT_BUMPER: number;
        static XBOX360_RIGHT_BUMPER: number;
        static XBOX360_LEFT_TRIGGER: number;
        static XBOX360_RIGHT_TRIGGER: number;
        static XBOX360_BACK: number;
        static XBOX360_START: number;
        static XBOX360_STICK_LEFT_BUTTON: number;
        static XBOX360_STICK_RIGHT_BUTTON: number;
        static XBOX360_DPAD_LEFT: number;
        static XBOX360_DPAD_RIGHT: number;
        static XBOX360_DPAD_UP: number;
        static XBOX360_DPAD_DOWN: number;
        static XBOX360_STICK_LEFT_X: number;
        static XBOX360_STICK_LEFT_Y: number;
        static XBOX360_STICK_RIGHT_X: number;
        static XBOX360_STICK_RIGHT_Y: number;

        static PS3XC_X: number;
        static PS3XC_CIRCLE: number;
        static PS3XC_SQUARE: number;
        static PS3XC_TRIANGLE: number;
        static PS3XC_L1: number;
        static PS3XC_R1: number;
        static PS3XC_L2: number;
        static PS3XC_R2: number;
        static PS3XC_SELECT: number;
        static PS3XC_START: number;
        static PS3XC_STICK_LEFT_BUTTON: number;
        static PS3XC_STICK_RIGHT_BUTTON: number;
        static PS3XC_DPAD_UP: number;
        static PS3XC_DPAD_DOWN: number;
        static PS3XC_DPAD_LEFT: number;
        static PS3XC_DPAD_RIGHT: number;
        static PS3XC_STICK_LEFT_X: number;
        static PS3XC_STICK_LEFT_Y: number;
        static PS3XC_STICK_RIGHT_X: number;
        static PS3XC_STICK_RIGHT_Y: number;

        active: boolean;
        callbackContext: any;
        enabled: boolean;
        game: Phaser.Game;
        onAxisCallBack: Function;
        onConnectCallback: Function;
        onDisconnectCallback: Function;
        onDownCallback: Function;
        onFloatCallback: Function;
        onUpCallback: Function;
        pad1: Phaser.SinglePad;
        pad2: Phaser.SinglePad;
        pad3: Phaser.SinglePad;
        pad4: Phaser.SinglePad;
        padsConnected: number;
        supported: boolean;

        addCallbacks(context: any, callbacks: any): void;
        isDown(buttonCode: number): boolean;
        justPressed(buttonCode: number, duration?: number): boolean;
        justReleased(buttonCode: number, duration?: number): boolean;
        reset(): void;
        setDeadZones(value: any): void;
        start(): void;
        stop(): void;
        update(): void;

    }

    class Graphics extends PIXI.Graphics {

        constructor(game: Phaser.Game, x?: number, y?: number);

        angle: number;
        alive: boolean;
        animations: Phaser.AnimationManager;
        autoCull: boolean;
        body: Phaser.Physics.Arcade.Body | Phaser.Physics.P2.Body | Phaser.Physics.Ninja.Body | any;
        bottom: number;
        cameraOffset: Phaser.Point;
        checkWorldBounds: boolean;
        components: any;
        data: any;
        debug: boolean;
        destroyPhase: boolean;
        exists: boolean;
        events: Phaser.Events;
        fixedToCamera: boolean;
        key: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture;
        fresh: boolean;
        game: Phaser.Game;
        height: number;
        input: Phaser.InputHandler;
        inputEnabled: boolean;
        inCamera: boolean;
        inWorld: boolean;
        left: number;
        name: string;
        lifespan: number;
        offsetX: number;
        offsetY: number;
        outOfBoundsKill: boolean;
        pendingDestroy: boolean;
        physicsType: number;
        position: Phaser.Point;
        previousPosition: Phaser.Point;
        previousRotation: number;
        renderOrderID: number;
        right: number;
        top: number;
        type: number;
        world: Phaser.Point;
        width: number;
        z: number;

        alignIn(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): any;
        alignTo(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): any;
        destroy(destroyChildren?: boolean): void;
        drawTriangle(points: Phaser.Point[], cull?: boolean): void;
        drawTriangles(vertices: Phaser.Point[] | number[], indices?: number[], cull?: boolean): void;
        kill(): Phaser.Graphics;
        postUpdate(): void;
        preUpdate(): void;
        reset(x: number, y: number, health?: number): Phaser.Graphics;
        revive(health?: number): Phaser.Graphics;
        update(): void;

    }

    class Group extends PIXI.DisplayObjectContainer {

        constructor(game: Phaser.Game, parent?: PIXI.DisplayObjectContainer, name?: string, addToStage?: boolean, enableBody?: boolean, physicsBodyType?: number);

        static RETURN_CHILD: number;
        static RETURN_NONE: number;
        static RETURN_TOTAL: number;
        static RETURN_ALL: number;
        static SORT_ASCENDING: number;
        static SORT_DESCENDING: number;

        alpha: number;
        angle: number;
        alive: boolean;
        bottom: number;
        cameraOffset: Phaser.Point;
        centerX: number;
        centerY: number;
        classType: any;
        cursor: any;
        cursorIndex: number;
        enableBody: boolean;
        enableBodyDebug: boolean;
        exists: boolean;
        fixedToCamera: boolean;
        game: Phaser.Game;
        hash: PIXI.DisplayObject[];
        ignoreDestroy: boolean;
        inputEnableChildren: boolean;
        left: number;
        length: number;
        name: string;
        onChildInputDown: Phaser.Signal;
        onChildInputUp: Phaser.Signal;
        onChildInputOver: Phaser.Signal;
        onChildInputOut: Phaser.Signal;
        onDestroy: Phaser.Signal;
        pendingDestroy: boolean;
        physicsBodyType: number;
        physicsType: number;
        physicsSortDirection: number;
        position: Phaser.Point;
        right: number;
        rotation: number;
        scale: Phaser.Point;
        top: number;
        total: number;
        type: number;
        visible: boolean;
        z: number;

        add(child: any, silent?: boolean, index?: number): any;
        addAll(property: string, amount: number, checkAlive: boolean, checkVisible: boolean): void;
        addAt(child: any, index: number, silent?: boolean): any;
        addMultiple(children: any[], silent?: boolean): any[];
        addToHash(child: PIXI.DisplayObject): boolean;
        align(width: number, height: number, cellWidth: number, cellHeight: number, position?: number, offset?: number): boolean;
        alignIn(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): Phaser.Group;
        alignTo(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): Phaser.Group;
        bringToTop(child: any): any;
        callAll(method: string, context: any, ...parameters: any[]): void;
        callAllExists(callback: string, existsValue: boolean, ...parameters: any[]): void;
        callbackFromArray(child: any, callback: Function, length: number): void;
        checkAll(key: string[], value: any, checkAlive?: boolean, checkVisible?: boolean, force?: boolean): boolean;
        checkProperty(child: any, key: string[], value: any, force?: boolean): boolean;
        countDead(): number;
        countLiving(): number;
        create(x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture, frame?: string | number, exists?: boolean, index?: number): any;
        createMultiple(quantity: number, key: string | string[], frame?: any | any[], exists?: boolean): any[];
        customSort(sortHandler: Function, context?: any): void;
        destroy(destroyChildren?: boolean, soft?: boolean): void;
        divideAll(property: string, amount: number, checkAlive?: boolean, checkVisible?: boolean): void;
        forEach(callback: Function, callbackContext: any, checkExists?: boolean, ...args: any[]): void;
        forEachAlive(callback: Function, callbackContext?: any, ...args: any[]): void;
        forEachDead(callback: Function, callbackContext?: any, ...args: any[]): void;
        forEachExists(callback: Function, callbackContext?: any): void;
        filter(predicate: Function, checkExists?: boolean): ArraySet;
        getAll(property: string, value: any, startIndex: number, endIndex: number): any;
        getAt(index: number): PIXI.DisplayObject | number;
        getBottom(): any;
        getByName(name: string): any;
        getClosestTo(object: any, callback?: Function, callbackContext?: any): any;
        getFirstAlive(createIfNull?: boolean, x?: number, y?: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture, frame?: string | number): any;
        getFirstDead(createIfNull?: boolean, x?: number, y?: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture, frame?: string | number): any;
        getFirstExists(exists: boolean, createIfNull?: boolean, x?: number, y?: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture, frame?: string | number): any;
        getFurthestFrom(object: any, callback?: Function, callbackContext?: any): any;
        getIndex(child: any): number;
        getRandom(startIndex?: number, length?: number): any;
        getTop(): any;
        hasProperty(child: any, key: string[]): boolean;
        iterate(key: string, value: any, returnType: number, callback?: Function, callbackContext?: any, ...args: any[]): any;
        moveAll(group: Phaser.Group, silent?: boolean): Phaser.Group;
        moveDown(child: any): any;
        moveUp(child: any): any;
        multiplyAll(property: string, amount: number, checkAlive: boolean, checkVisible: boolean): void;
        next(): any;
        postUpdate(): void;
        preUpdate(): void;
        previous(): void;
        remove(child: any, destroy?: boolean, silent?: boolean): boolean;
        removeAll(destroy?: boolean, silent?: boolean, destroyTexture?: boolean): void;
        removeBetween(startIndex: number, endIndex?: number, destroy?: boolean, silent?: boolean): void;
        removeFromHash(child: PIXI.DisplayObject): boolean;
        replace(oldChild: any, newChild: any): any;
        resetChild(child: any, x?: number, y?: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture, frame?: string | number): any;
        resetCursor(index?: number): any;
        reverse(): void;
        sendToBack(child: any): any;
        set(child: any, key: string[], value: any, operation?: number, force?: boolean): boolean;
        setAll(key: string, value: any, checkAlive?: boolean, checkVisible?: boolean, operation?: number, force?: boolean): void;
        setAllChildren(key: string, value: any, checkAlive?: boolean, checkVisible?: boolean, operation?: number, force?: boolean): void;
        setProperty(child: any, key: string[], value: any, operation?: number, force?: boolean): boolean;
        sort(key?: string, order?: number): void;
        subAll(property: string, amount: number, checkAlive: boolean, checkVisible: boolean): void;
        swap(child1: any, child2: any): boolean;
        update(): void;
        updateZ(): void;
        xy(index: number, x: number, y: number): void;

    }

    class Image extends PIXI.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number);

        alive: boolean;
        angle: number;
        anchor: Phaser.Point;
        animations: Phaser.AnimationManager;
        autoCull: boolean;
        bottom: number;
        cameraOffset: Phaser.Point;
        centerX: number;
        centerY: number;
        components: any;
        cropRect: Phaser.Rectangle;
        customRender: boolean;
        data: any;
        debug: boolean;
        deltaX: number;
        deltaY: number;
        deltaZ: number;
        destroyPhase: boolean;
        events: Phaser.Events;
        exists: boolean;
        fixedToCamera: boolean;
        frame: string | number;
        frameName: string;
        fresh: boolean;
        game: Phaser.Game;
        inCamera: boolean;
        input: Phaser.InputHandler;
        inputEnabled: boolean;
        inWorld: boolean;
        key: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture;
        lifespan: number;
        left: number;
        name: string;
        offsetX: number;
        offsetY: number;
        pendingDestroy: boolean;
        position: Phaser.Point;
        previousPosition: Phaser.Point;
        previousRotation: number;
        renderOrderID: number;
        right: number;
        scale: Phaser.Point;
        smoothed: boolean;
        top: number;
        type: number;
        world: Phaser.Point;
        z: number;

        alignIn(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): any;
        alignTo(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): any;
        bringToTop(): Phaser.Image;
        crop(rect: Phaser.Rectangle, copy?: boolean): void;
        destroy(destroyChildren?: boolean): void;
        kill(): Phaser.Image;
        loadTexture(key: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture, frame?: string | number, stopAnimation?: boolean): void;
        resizeFrame(parent: any, width: number, height: number): void;
        moveDown(): Phaser.Image;
        moveUp(): Phaser.Image;
        overlap(displayObject: Phaser.Sprite | Phaser.Image | Phaser.TileSprite | Phaser.Button | PIXI.DisplayObject): boolean;
        play(name: string, frameRate?: number, loop?: boolean, killOnComplete?: boolean): Phaser.Animation;
        postUpdate(): void;
        preUpdate(): void;
        reset(x: number, y: number, health?: number): Phaser.Image;
        resetFrame(): void;
        revive(health?: number): Phaser.Image;
        sendToBack(): Phaser.Image;
        setFrame(frame: Phaser.Frame): void;
        update(): void;
        updateCrop(): void;

    }

    class ImageCollection {

        constructor(name: string, firstgid: number, width?: number, height?: number, margin?: number, spacing?: number, properties?: any);

        name: string;
        firstgid: number;
        imageWidth: number;
        imageHeight: number;
        imageMargin: number;
        imageSpacing: number;
        properties: any;
        images: any[];
        total: number;

        addImage(gid: number, image: string): void;
        containsImageIndex(imageIndex: number): boolean;

    }

    class Input {

        constructor(game: Phaser.Game);

        static MAX_POINTERS: number;
        static MOUSE_OVERRIDES_TOUCH: number;
        static MOUSE_TOUCH_COMBINE: number;
        static TOUCH_OVERRIDES_MOUSE: number;

        activePointer: Phaser.Pointer;
        circle: Phaser.Circle;
        enabled: boolean;
        doubleTapRate: number;
        game: Phaser.Game;
        gamepad: Phaser.Gamepad;
        hitCanvas: HTMLCanvasElement;
        hitContext: CanvasRenderingContext2D;
        holdRate: number;
        interactiveItems: Phaser.ArraySet;
        justPressedRate: number;
        justReleasedRate: number;
        keyboard: Phaser.Keyboard;
        maxPointers: number;
        minPriorityID: number;
        mouse: Phaser.Mouse;
        mousePointer: Phaser.Pointer;
        moveCallbacks: (pointer: Phaser.Pointer, x: number, y: number) => void[];
        mspointer: Phaser.MSPointer;
        multiInputOverride: number;
        onDown: Phaser.Signal;
        onHold: Phaser.Signal;
        onTap: Phaser.Signal;
        onUp: Phaser.Signal;
        pointer1: Phaser.Pointer;
        pointer2: Phaser.Pointer;
        pointer3: Phaser.Pointer;
        pointer4: Phaser.Pointer;
        pointer5: Phaser.Pointer;
        pointer6: Phaser.Pointer;
        pointer7: Phaser.Pointer;
        pointer8: Phaser.Pointer;
        pointer9: Phaser.Pointer;
        pointer10: Phaser.Pointer;
        pollLocked: boolean;
        pollRate: number;
        position: Phaser.Point;
        pointer: Phaser.Pointer[];
        recordLimit: number;
        recordPointerHistory: boolean;
        recordRate: number;
        resetLocked: boolean;
        scale: Phaser.Point;
        speed: Phaser.Point;
        tapRate: number;
        totalActivePointers: number;
        totalInactivePointers: number;
        touch: Phaser.Touch;
        worldX: number;
        worldY: number;
        x: number;
        y: number;

        addPointer(): Phaser.Pointer;
        addMoveCallback(callback: Function, context: any): number;
        boot(): void;
        countActivePointers(limit?: number): number;
        deleteMoveCallback(callback: Function, context?: any): void;
        destroy(): void;
        getLocalPosition(displayObject: any, pointer: Phaser.Pointer): Phaser.Point;
        getPointer(isActive?: boolean): Phaser.Pointer;
        getPointerFromId(pointerID: number): Phaser.Pointer;
        getPointerFromIdentifier(identifier: number): Phaser.Pointer;
        hitTest(displayObject: PIXI.DisplayObject, pointer: Phaser.Pointer, localPoint: Phaser.Point): void;
        reset(hard?: boolean): void;
        resetSpeed(x: number, y: number): void;
        setInteractiveCandidateHandler(callback: Function, context?: any): void;
        startPointer(event: any): Phaser.Pointer;
        stopPointer(event: any): Phaser.Pointer;
        update(): void;
        updatePointer(event: any): Phaser.Pointer;

    }

    class InputHandler {

        constructor(sprite: Phaser.Sprite);

        allowHorizontalDrag: boolean;
        allowVerticalDrag: boolean;
        boundsRect: Phaser.Rectangle;
        boundsSprite: Phaser.Sprite;
        bringToTop: boolean;
        downPoint: Phaser.Point;
        dragDistanceThreshold: number;
        dragOffset: Phaser.Point;
        dragFromCenter: boolean;
        draggable: boolean;
        dragStartPoint: Phaser.Point;
        dragStopBlocksInputUp: boolean;
        dragTimeThreshold: number;
        enabled: boolean;
        game: Phaser.Game;
        globalToLocalX(x: number): number;
        globalToLocalY(y: number): number;
        isDragged: boolean;
        pixelPerfectAlpha: number;
        pixelPerfectClick: boolean;
        pixelPerfectOver: boolean;
        priorityID: number;
        scaleLayer: boolean;
        snapOffset: Phaser.Point;
        snapOffsetX: number;
        snapOffsetY: number;
        snapOnDrag: boolean;
        snapOnRelease: boolean;
        snapPoint: Phaser.Point;
        snapX: number;
        snapY: number;
        sprite: Phaser.Sprite;
        useHandCursor: boolean;

        checkBoundsRect(): void;
        checkBoundsSprite(): void;
        checkPixel(x: number, y: number, pointer?: Phaser.Pointer): boolean;
        checkPointerDown(pointer: Phaser.Pointer, fastTest?: boolean): boolean;
        checkPointerOver(pointer: Phaser.Pointer, fastTest?: boolean): boolean;
        destroy(): void;
        disableDrag(): void;
        disableSnap(): void;
        downDuration(pointerId?: number): number;
        enableDrag(lockCenter?: boolean, bringToTop?: boolean, pixelPerfect?: boolean, alphaThreshold?: number, boundsRect?: Phaser.Rectangle, boundsSprite?: Phaser.Sprite): void;
        enableSnap(snapX: number, snapY: number, onDrag?: boolean, onRelease?: boolean, snapOffsetX?: number, snapOffsetY?: number): void;
        isPixelPerfect(): boolean;
        justOut(pointerId?: number, delay?: number): boolean;
        justOver(pointerId?: number, delay?: number): boolean;
        justPressed(pointerId?: number, delay?: number): boolean;
        justReleased(pointerId?: number, delay?: number): boolean;
        overDuration(pointerId?: number): number;
        pointerDown(pointerId?: number): boolean;
        pointerDragged(pointerId?: number): boolean;
        pointerOut(pointerId?: number): boolean;
        pointerOver(pointerId?: number): boolean;
        pointerTimeDown(pointerId?: number): number;
        pointerTimeOut(pointerId?: number): number;
        pointerTimeOver(pointerId?: number): number;
        pointerTimeUp(pointerId?: number): number;
        pointerUp(pointerId?: number): boolean;
        pointerX(pointerId?: number): number;
        pointerY(pointerId?: number): number;
        reset(): void;
        setDragLock(allowHorizontal?: boolean, allowVertical?: boolean): void;
        start(priority: number, useHandCursor: boolean): Phaser.Sprite;
        startDrag(pointer: Phaser.Pointer): void;
        stop(): void;
        stopDrag(pointer: Phaser.Pointer): void;
        update(pointer: Phaser.Pointer): void;
        updateDrag(pointer: Phaser.Pointer): boolean;
        validForInput(highestID: number, highestRenderID: number, includePixelPerfect?: boolean): boolean;

    }

    class Key {

        constructor(game: Phaser.Game, keycode: number);

        altKey: boolean;
        ctrlKey: boolean;
        duration: number;
        enabled: boolean;
        event: any;
        game: Phaser.Game;
        isDown: boolean;
        isUp: boolean;
        _justDown: boolean;
        justDown: boolean;
        _justUp: boolean;
        justUp: boolean;
        keyCode: number;
        onDown: Phaser.Signal;
        onHoldCallback: Function;
        onHoldContext: any;
        onUp: Phaser.Signal;
        repeats: number;
        shiftKey: boolean;
        timeDown: number;
        timeUp: number;

        downDuration(duration?: number): boolean;
        processKeyDown(event: KeyboardEvent): void;
        processKeyUp(event: KeyboardEvent): void;
        reset(hard?: boolean): void;
        update(): void;
        upDuration(duration?: number): boolean;

    }

    class Keyboard {

        constructor(game: Phaser.Game);

        static A: number;
        static B: number;
        static C: number;
        static D: number;
        static E: number;
        static F: number;
        static G: number;
        static H: number;
        static I: number;
        static J: number;
        static K: number;
        static L: number;
        static M: number;
        static N: number;
        static O: number;
        static P: number;
        static Q: number;
        static R: number;
        static S: number;
        static T: number;
        static U: number;
        static V: number;
        static W: number;
        static X: number;
        static Y: number;
        static Z: number;
        static ZERO: number;
        static ONE: number;
        static TWO: number;
        static THREE: number;
        static FOUR: number;
        static FIVE: number;
        static SIX: number;
        static SEVEN: number;
        static EIGHT: number;
        static NINE: number;
        static NUMPAD_0: number;
        static NUMPAD_1: number;
        static NUMPAD_2: number;
        static NUMPAD_3: number;
        static NUMPAD_4: number;
        static NUMPAD_5: number;
        static NUMPAD_6: number;
        static NUMPAD_7: number;
        static NUMPAD_8: number;
        static NUMPAD_9: number;
        static NUMPAD_MULTIPLY: number;
        static NUMPAD_ADD: number;
        static NUMPAD_ENTER: number;
        static NUMPAD_SUBTRACT: number;
        static NUMPAD_DECIMAL: number;
        static NUMPAD_DIVIDE: number;
        static F1: number;
        static F2: number;
        static F3: number;
        static F4: number;
        static F5: number;
        static F6: number;
        static F7: number;
        static F8: number;
        static F9: number;
        static F10: number;
        static F11: number;
        static F12: number;
        static F13: number;
        static F14: number;
        static F15: number;
        static COLON: number;
        static EQUALS: number;
        static COMMA: number;
        static UNDERSCORE: number;
        static PERIOD: number;
        static QUESTION_MARK: number;
        static TILDE: number;
        static OPEN_BRACKET: number;
        static BACKWARD_SLASH: number;
        static CLOSED_BRACKET: number;
        static QUOTES: number;
        static BACKSPACE: number;
        static TAB: number;
        static CLEAR: number;
        static ENTER: number;
        static SHIFT: number;
        static CONTROL: number;
        static ALT: number;
        static CAPS_LOCK: number;
        static ESC: number;
        static SPACEBAR: number;
        static PAGE_UP: number;
        static PAGE_DOWN: number;
        static END: number;
        static HOME: number;
        static LEFT: number;
        static UP: number;
        static RIGHT: number;
        static DOWN: number;
        static INSERT: number;
        static DELETE: number;
        static HELP: number;
        static NUM_LOCK: number;
        static PLUS: number;
        static MINUS: number;

        callbackContext: any;
        enabled: boolean;
        event: any;
        game: Phaser.Game;
        lastChar: string;
        lastKey: Phaser.Key;
        onDownCallback: Function;
        onPressCallback: Function;
        onUpCallback: Function;
        pressEvent: any;

        addCallbacks(context: any, onDown?: Function, onUp?: Function, onPress?: Function): void;
        addKey(keycode: number): Phaser.Key;
        addKeys(keys: any): any;
        addKeyCapture(keycode: any): void;
        createCursorKeys(): Phaser.CursorKeys;
        clearCaptures(): void;
        destroy(): void;
        downDuration(keycode: number, duration?: number): boolean;
        isDown(keycode: number): boolean;
        processKeyDown(event: KeyboardEvent): void;
        processKeyPress(event: KeyboardEvent): void;
        processKeyUp(event: KeyboardEvent): void;
        removeKey(keycode: number): void;
        removeKeyCapture(keycode: number): void;
        reset(hard?: boolean): void;
        start(): void;
        stop(): void;
        update(): void;
        upDuration(keycode: number, duration?: number): boolean;

    }

    class KeyCode {

        static A: number;
        static B: number;
        static C: number;
        static D: number;
        static E: number;
        static F: number;
        static G: number;
        static H: number;
        static I: number;
        static J: number;
        static K: number;
        static L: number;
        static M: number;
        static N: number;
        static O: number;
        static P: number;
        static Q: number;
        static R: number;
        static S: number;
        static T: number;
        static U: number;
        static V: number;
        static W: number;
        static X: number;
        static Y: number;
        static Z: number;
        static ZERO: number;
        static ONE: number;
        static TWO: number;
        static THREE: number;
        static FOUR: number;
        static FIVE: number;
        static SIX: number;
        static SEVEN: number;
        static EIGHT: number;
        static NINE: number;
        static NUMPAD_0: number;
        static NUMPAD_1: number;
        static NUMPAD_2: number;
        static NUMPAD_3: number;
        static NUMPAD_4: number;
        static NUMPAD_5: number;
        static NUMPAD_6: number;
        static NUMPAD_7: number;
        static NUMPAD_8: number;
        static NUMPAD_9: number;
        static NUMPAD_MULTIPLY: number;
        static NUMPAD_ADD: number;
        static NUMPAD_ENTER: number;
        static NUMPAD_SUBTRACT: number;
        static NUMPAD_DECIMAL: number;
        static NUMPAD_DIVIDE: number;
        static F1: number;
        static F2: number;
        static F3: number;
        static F4: number;
        static F5: number;
        static F6: number;
        static F7: number;
        static F8: number;
        static F9: number;
        static F10: number;
        static F11: number;
        static F12: number;
        static F13: number;
        static F14: number;
        static F15: number;
        static COLON: number;
        static EQUALS: number;
        static COMMA: number;
        static UNDERSCORE: number;
        static PERIOD: number;
        static QUESTION_MARK: number;
        static TILDE: number;
        static OPEN_BRACKET: number;
        static BACKWARD_SLASH: number;
        static CLOSED_BRACKET: number;
        static QUOTES: number;
        static BACKSPACE: number;
        static TAB: number;
        static CLEAR: number;
        static ENTER: number;
        static SHIFT: number;
        static CONTROL: number;
        static ALT: number;
        static CAPS_LOCK: number;
        static ESC: number;
        static SPACEBAR: number;
        static PAGE_UP: number;
        static PAGE_DOWN: number;
        static END: number;
        static HOME: number;
        static LEFT: number;
        static UP: number;
        static RIGHT: number;
        static DOWN: number;
        static INSERT: number;
        static DELETE: number;
        static HELP: number;
        static NUM_LOCK: number;
        static PLUS: number;
        static MINUS: number;

    }

    class Line {

        constructor(x1?: number, y1?: number, x2?: number, y2?: number);

        angle: number;
        end: Phaser.Point;
        height: number;
        left: number;
        length: number;
        normalAngle: number;
        normalX: number;
        normalY: number;
        perpSlope: number;
        right: number;
        slope: number;
        start: Phaser.Point;
        top: number;
        type: number;
        width: number;
        x: number;
        y: number;

        static intersectsPoints(a: Phaser.Point, b: Phaser.Point, e: Phaser.Point, f: Phaser.Point, asSegment?: boolean, result?: Phaser.Point): Phaser.Point;
        static intersects(a: Phaser.Line, b: Phaser.Line, asSegment?: boolean, result?: Phaser.Point): Phaser.Point;
        static intersectsRectangle(line: Phaser.Line, rect: Phaser.Rectangle): boolean;
        static reflect(a: Phaser.Line, b: Phaser.Line): number;

        centerOn(x: number, y: number): Phaser.Line;
        clone(output: Phaser.Line): Phaser.Line;
        coordinatesOnLine(stepRate: number, results: any[]): any[];
        fromAngle(x: number, y: number, angle: number, length: number): Phaser.Line;
        fromSprite(startSprite: Phaser.Sprite, endSprite: Phaser.Sprite, useCenter?: boolean): Phaser.Line;
        intersects(line: Phaser.Line, asSegment?: boolean, result?: Phaser.Point): Phaser.Point;
        midPoint(out?: Phaser.Point): Phaser.Point;
        pointOnLine(x: number, y: number): boolean;
        pointOnSegment(x: number, y: number): boolean;
        random(out?: Phaser.Point): Phaser.Point;
        reflect(line: Phaser.Line): number;
        rotate(angle: number, asDegrees?: boolean): Phaser.Line;
        rotateAround(x: number, y: number, angle: number, asDegrees?: boolean): Phaser.Line;
        setTo(x1?: number, y1?: number, x2?: number, y2?: number): Phaser.Line;

    }

    class LinkedList {

        first: any;
        last: any;
        next: any;
        prev: any;
        total: number;

        add(item: any): any;
        callAll(callback: Function): void;
        remove(item: any): void;
        reset(): void;

    }

    class Loader {

        constructor(game: Phaser.Game);

        static PHYSICS_LIME_CORONA_JSON: number;
        static PHYSICS_PHASER_JSON: number;
        static TEXTURE_ATLAS_JSON_ARRAY: number;
        static TEXTURE_ATLAS_JSON_HASH: number;
        static TEXTURE_ATLAS_XML_STARLING: number;
        static TEXTURE_ATLAS_JSON_PYXEL: number;

        baseURL: string;
        cache: Phaser.Cache;
        crossOrigin: boolean | string;
        enableParallel: boolean;
        game: Phaser.Game;
        hasLoaded: boolean;
        headers: any;
        isLoading: boolean;
        maxParallelDownloads: number;
        onFileStart: Phaser.Signal;
        onFileComplete: Phaser.Signal;
        onFileError: Phaser.Signal;
        onLoadComplete: Phaser.Signal;
        onLoadStart: Phaser.Signal;
        onPackComplete: Phaser.Signal;
        path: string;
        preloadSprite: any;
        progress: number;
        progressFloat: number;
        resetLocked: boolean;
        useXDomainRequest: boolean;

        asyncComplete(file: any, errorMessage?: string): void;
        addSyncPoint(type: string, key: string): Phaser.Loader;
        addToFileList(type: string, key: string, url?: string, properties?: any, overwrite?: boolean, extension?: string): Phaser.Loader;
        atlas(key: string, textureURL?: string, atlasURL?: string, atlasData?: any, format?: number): Phaser.Loader;
        atlasJSONArray(key: string, textureURL?: string, atlasURL?: string, atlasData?: any): Phaser.Loader;
        atlasJSONHash(key: string, textureURL?: string, atlasURL?: string, atlasData?: any): Phaser.Loader;
        atlasXML(key: string, textureURL?: string, atlasURL?: string, atlasData?: any): Phaser.Loader;
        audio(key: string, urls: string | string[] | any, autoDecode?: boolean): Phaser.Loader;
        audiosprite(key: string, urls: string[], jsonURL?: string, jsonData?: string | any, autoDecode?: boolean): Phaser.Loader;
        binary(key: string, url?: string, callback?: Function, callbackContext?: any): Phaser.Loader;
        bitmapFont(key: string, textureURL?: string, atlasURL?: string, atlasData?: any, xSpacing?: number, ySpacing?: number): Phaser.Loader;
        checkKeyExists(type: string, key: string): boolean;
        csvLoadComplete(file: any, xhr: XMLHttpRequest): void;
        fileComplete(file: any, xhr: XMLHttpRequest): void;
        fileError(file: any, xhr: XMLHttpRequest, reason: string): void;
        finishedLoading(abnormal?: boolean): void;
        getAsset(type: string, key: string): any;
        getAssetIndex(type: string, key: string): number;
        getAudioURL(urls: any[]): void;
        image(key: string, url?: string | any, overwrite?: boolean): Phaser.Loader;
        images(keys: string[], urls?: string[]): Phaser.Loader;
        json(key: string, url?: string, overwrite?: boolean): Phaser.Loader;
        jsonLoadComplete(file: any, xhr: XMLHttpRequest): void;
        loadAudioTag(file: any): void;
        loadFile(file: any): void;
        loadImageTag(file: any): void;
        pack(key: string, url?: string, data?: any, callbackContext?: any): Phaser.Loader;
        parseXml(data: string): XMLDocument;
        physics(key: string, url?: string, data?: any, format?: string): Phaser.Loader;
        processLoadQueue(): void;
        processPack(pack: any): void;
        removeAll(): void;
        removeFile(type: string, key: string): void;
        replaceInFileList(type: string, key: string, url: string, properties: any): void;
        reset(hard?: boolean, clearEvents?: boolean): void;
        resize(): void;
        script(key: string, url?: String, callback?: Function, callbackContext?: any): Phaser.Loader;
        shader(key: string, url?: String, overwrite?: boolean): Phaser.Loader;
        setPreloadSprite(sprite: Phaser.Sprite | Phaser.Image, direction?: number): void;
        spritesheet(key: string, url: string, frameWidth: number, frameHeight: number, frameMax?: number, margin?: number, spacing?: number, skipFrames?: number): Phaser.Loader;
        start(): void;
        text(key: string, url?: string, overwrite?: boolean): Phaser.Loader;
        texture(key: string, object: any, overwrite?: boolean): Phaser.Loader;
        tilemap(key: string, url?: string, data?: any, format?: number): Phaser.Loader;
        totalLoadedFiles(): number;
        totalLoadedPacks(): number;
        totalQueuedFiles(): number;
        totalQueuedPacks(): number;
        transformUrl(url: string, file?: any): string;
        updateProgress(): void;
        video(key: string, urls: string | string[] | any, loadEvent?: string, asBlob?: boolean): Phaser.Loader;
        withSyncPoint(callback: Function, callbackContext?: any): Phaser.Loader;
        xml(key: string, url?: string, overwrite?: boolean): Phaser.Loader;
        xhrLoad(file: any, url: string, type: string, onload: Function, onerror?: Function): void;
        xhrLoadWithXDR(file: any, url: string, type: string, onload: Function, onerror?: Function): void;
        xmlLoadComplete(file: any, xhr: XMLHttpRequest): void;

    }

    class LoaderParser {

        static bitmapFont(xml: any, baseTexture: PIXI.BaseTexture, xSpacing?: number, ySpacing?: number): any;
        static xmlBitmapFont(xml: any, baseTexture: PIXI.BaseTexture, xSpacing?: number, ySpacing?: number, frame?: Phaser.Frame): any;
        static jsonBitmapFont(json: any, baseTexture: PIXI.BaseTexture, xSpacing?: number, ySpacing?: number, frame?: Phaser.Frame): any;

    }

    class Matrix extends PIXI.Matrix {

        a: number;
        b: number;
        c: number;
        d: number;
        tx: number;
        ty: number;
        type: number;

        constructor(a?: number, b?: number, c?: number, d?: number, tx?: number, ty?: number);

        apply(pos: Phaser.Point, newPos?: Phaser.Point): Phaser.Point;
        applyInverse(pos: Phaser.Point, newPos?: Phaser.Point): Phaser.Point;
        clone(output?: Phaser.Matrix): Phaser.Matrix;
        copyFrom(matrix: Phaser.Matrix): Phaser.Matrix;
        copyTo(matrix: Phaser.Matrix): Phaser.Matrix;
        fromArray(array: number[]): Phaser.Matrix;
        setTo(a: number, b: number, c: number, d: number, tx: number, ty: number): Phaser.Matrix;
        toArray(transpose?: boolean, array?: number[]): number[];
        translate(x: number, y: number): Phaser.Matrix;
        scale(x: number, y: number): Phaser.Matrix;
        rotate(angle: number): Phaser.Matrix;
        append(matrix: Phaser.Matrix): Phaser.Matrix;
        identity(): Phaser.Matrix;

    }

    class Math {

        static angleBetween(x1: number, y1: number, x2: number, y2: number): number;
        static angleBetweenPoints(point1: Phaser.Point, point2: Phaser.Point): number;
        static angleBetweenY(x1: number, y1: number, x2: number, y2: number): number;
        static angleBetweenPointsY(point1: Phaser.Point, point2: Phaser.Point): number;
        static average(...numbers: number[]): number;
        static bernstein(n: number, i: number): number;
        static random(min: number, max: number): number;
        static between(min: number, max: number): number;
        static bezierInterpolation(v: number[], k: number): number;
        static catmullRom(p0: number, p1: number, p2: number, p3: number, t: number): number;
        static catmullRomInterpolation(v: number[], k: number): number;
        static ceilTo(value: number, place?: number, base?: number): number;
        static clamp(x: number, a: number, b: number): number;
        static clampBottom(x: number, a: number): number;
        static degToRad(degrees: number): number;
        static difference(a: number, b: number): number;
        static distance(x1: number, y1: number, x2: number, y2: number): number;
        static distanceSq(x1: number, y1: number, x2: number, y2: number): number;
        static distancePow(xy: number, y1: number, x2: number, y2: number, pow?: number): number;
        static factorial(value: number): number;
        static floorTo(value: number, place: number, base: number): number;
        static fuzzyCeil(val: number, epsilon?: number): boolean;
        static fuzzyEqual(a: number, b: number, epsilon?: number): boolean;
        static fuzzyLessThan(a: Number, b: number, epsilon?: number): boolean;
        static fuzzyFloor(val: number, epsilon?: number): boolean;
        static fuzzyGreaterThan(a: number, b: number, epsilon?: number): boolean;
        static fuzzyLessThan(a: number, b: number, epsilon?: number): boolean;
        static getShortestAngle(angle1: number, angle2: number): number;
        static getNextPowerOfTwo(value: number): number;
        static isEven(n: number): boolean;
        static isOdd(n: number): boolean;
        static isPowerOfTwo(width: number, height: number): boolean;
        static linear(p0: number, p1: number, t: number): number;
        static linearInterpolation(v: number[], k: number): number;
        static mapLinear(x: number, a1: number, a2: number, b1: number, b2: number): number;
        static max(...numbers: number[]): number;
        static maxAdd(value: number, amount: number, max: number): number;
        static maxProperty(...numbers: number[]): number;
        static min(...numbers: number[]): number;
        static minProperty(...numbers: number[]): number;
        static minSub(value: number, amount: number, min: number): number;
        static normalizeAngle(angle: number, radians?: boolean): number;
        static percent(a: number, b: number, base?: number): number;
        static p2px(v: number): number;
        static PI2: number;
        static radToDeg(radians: number): number;
        static reverseAngle(angleRed: number): number;
        static rotateToAngle(currentAngle: number, targetAngle: number, lerp?: number): number;
        static roundAwayFromZero(value: number): number;
        static roundTo(value: number, place?: number, base?: number): number;
        static shear(n: number): number;
        static sign(x: number): number;
        static sinCosGenerator(length: number, sinAmplitude?: number, cosAmplitude?: number, frequency?: number): { sin: number[]; cos: number[]; };
        static smootherstep(x: number, min: number, max: number): number;
        static smoothstep(x: number, min: number, max: number): number;
        static snapTo(input: number, gap: number, start?: number): number;
        static snapToCeil(input: number, gap: number, start?: number): number;
        static snapToFloor(input: number, gap: number, start?: number): number;
        static within(a: number, b: number, tolerance: number): boolean;
        static wrap(value: number, min: number, max: number): number;
        static wrapAngle(angle: number, radians?: boolean): number;
        static wrapValue(value: number, amount: number, max: number): number;

    }

    interface WheelEventProxy {

        bindEvent(event: any): WheelEventProxy;

        type: string;
        deltaMode: number;
        deltaX: number;
        deltaY: number;
        deltaZ: number;

    }

    class Mouse {

        constructor(game: Phaser.Game);

        static NO_BUTTON: number;
        static LEFT_BUTTON: number;
        static MIDDLE_BUTTON: number;
        static RIGHT_BUTTON: number;
        static BACK_BUTTON: number;
        static FORWARD_BUTTON: number;
        static WHEEL_DOWN: number;
        static WHEEL_UP: number;

        button: number;
        callbackContext: any;
        capture: boolean;
        enabled: boolean;
        event: MouseEvent;
        game: Phaser.Game;
        input: Phaser.Input;
        locked: boolean;
        mouseDownCallback: (event: MouseEvent) => void;
        mouseOutCallback: (event: MouseEvent) => void;
        mouseOverCallback: (event: MouseEvent) => void;
        mouseUpCallback: (event: MouseEvent) => void;
        mouseWheelCallback: (event: MouseEvent) => void;
        _onMouseDown: (event: MouseEvent) => void;
        _onMouseMove: (event: MouseEvent) => void;
        _onMouseUp: (event: MouseEvent) => void;
        _onMouseOut: (event: MouseEvent) => void;
        _onMouseOver: (event: MouseEvent) => void;
        _onMouseWheel: (event: MouseEvent) => void;
        _wheelEvent: WheelEventProxy;
        pointerLock: Phaser.Signal;
        stopOnGameOut: boolean;
        wheelDelta: number;

        onMouseDown(event: MouseEvent): void;
        onMouseMove(event: MouseEvent): void;
        onMouseOut(event: MouseEvent): void;
        onMouseOver(event: MouseEvent): void;
        onMouseUp(event: MouseEvent): void;
        onMouseUpGlobal(event: MouseEvent): void;
        onMouseWheel(event: MouseEvent): void;
        pointerLockChange(event: MouseEvent): void;
        releasePointerLock(): void;
        requestPointerLock(): void;
        start(): void;
        stop(): void;

    }

    class MSPointer {

        constructor(game: Phaser.Game);

        button: number;
        capture: boolean;
        callbackContext: any;
        event: MSPointerEvent;
        game: Phaser.Game;
        input: Phaser.Input;

        onPointerDown: (event: MSPointerEvent) => void;
        onPointerMove: (event: MSPointerEvent) => void;
        onPointerUp: (event: MSPointerEvent) => void;
        mouseDownCallback: (event: MSPointerEvent) => void;
        mouseMoveCallback: (event: MSPointerEvent) => void;
        mouseUpCallback: (event: MSPointerEvent) => void;
        pointerDownCallback: (event: MSPointerEvent) => void;
        pointerMoveCallback: (event: MSPointerEvent) => void;
        pointerUpCallback: (event: MSPointerEvent) => void;

        start(): void;
        stop(): void;

    }

    class Net {

        constructor(game: Phaser.Game);

        game: Phaser.Game;

        checkDomainName(domain: string): boolean;
        decodeURI(value: string): string;
        getHostName(): string;
        getQueryString(parameter?: string): string;
        updateQueryString(key: string, value: any, redirect?: boolean, url?: string): string;

    }

    class Particle extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, key?: any, frame?: any);

        fresh: boolean;

        onEmit(): void;
        reset(x: number, y: number, health?: number): Phaser.Particle;
        setAlphaData(data: any[]): void;
        setScaleData(data: any[]): void;
        update(): void;

    }

    class Particles {

        constructor(game: Phaser.Game);

        emitters: any;
        game: Phaser.Game;
        ID: number;

        add(emitter: Phaser.Particles.Arcade.Emitter): Phaser.Particles.Arcade.Emitter;
        remove(emitter: Phaser.Particles.Arcade.Emitter): void;
        update(): void;

    }

    module Particles {

        module Arcade {

            class Emitter extends Phaser.Group {

                constructor(game: Phaser.Game, x?: number, y?: number, maxParticles?: number);

                alphaData: any[];
                autoAlpha: boolean;
                autoScale: boolean;
                angle: number;
                angularDrag: number;
                bottom: number;
                bounce: Phaser.Point;
                emitX: number;
                emitY: number;
                exists: boolean;
                frequency: number;
                gravity: number;
                group: Phaser.Group;
                height: number;
                left: number;
                lifespan: number;
                maxParticles: number;
                maxParticleScale: number;
                maxParticleSpeed: Phaser.Point;
                maxRotation: number;
                minParticleScale: number;
                minParticleSpeed: Phaser.Point;
                minRotation: number;
                name: string;
                on: boolean;
                particleAnchor: Phaser.Point;
                particleBringToTop: boolean;
                particleSendToBack: boolean;
                particleClass: any;
                particleDrag: Phaser.Point;
                physicsType: number;
                position: Phaser.Point;
                right: number;
                scaleData: any[];
                top: number;
                type: number;
                width: number;
                x: number;
                y: number;

                at(object: any): Phaser.Particles.Arcade.Emitter;
                emitParticle(x?: number, y?: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture, frame?: string | number): boolean;
                explode(lifespan?: number, quantity?: number): Phaser.Particles.Arcade.Emitter;
                flow(lifespan?: number, frequency?: number, quantity?: number, total?: number, immediate?: boolean): Phaser.Particles.Arcade.Emitter;
                kill(): Phaser.Particles.Arcade.Emitter;
                makeParticles(keys: any, frames?: any, quantity?: number, collide?: boolean, collideWorldBounds?: boolean): Phaser.Particles.Arcade.Emitter;
                reset(x: number, y: number, health?: number): Phaser.Particles;
                setAlpha(min?: number, max?: number, rate?: number, ease?: (k: number) => number, yoyo?: boolean): Phaser.Particles.Arcade.Emitter;
                setRotation(min?: number, max?: number): Phaser.Particles.Arcade.Emitter;
                setScale(minX?: number, maxX?: number, minY?: number, maxY?: number, rate?: number, ease?: (k: number) => number, yoyo?: boolean): Phaser.Particles.Arcade.Emitter;
                setSize(width: number, height: number): Phaser.Particles.Arcade.Emitter;
                setXSpeed(min: number, max: number): Phaser.Particles.Arcade.Emitter;
                setYSpeed(min: number, max: number): Phaser.Particles.Arcade.Emitter;
                start(explode?: boolean, lifespan?: number, frequency?: number, quantity?: number, forceQuantity?: boolean): Phaser.Particles.Arcade.Emitter;
                update(): void;
                revive(): Phaser.Particles.Arcade.Emitter;

            }
        }
    }

    class Physics {

        constructor(game: Phaser.Game, config?: any);

        static ARCADE: number;
        static P2JS: number;
        static NINJA: number;
        static BOX2D: number;
        static CHIPMUNK: number;
        static MATTERJS: number;

        arcade: Phaser.Physics.Arcade;
        config: any;
        game: Phaser.Game;
        ninja: Phaser.Physics.Ninja;
        p2: Phaser.Physics.P2;
        box2d: Phaser.Physics.Box2D;

        clear(): void;
        destroy(): void;
        enable(object: any, system?: number, debug?: boolean): void;
        parseConfig(): void;
        preUpdate(): void;
        reset(): void;
        setBoundsToWorld(): void;
        startSystem(system: number): void;
        update(): void;

    }

    export class Video {

        game: Phaser.Game;
        key: string;
        video: HTMLVideoElement;
        baseTexture: PIXI.BaseTexture;
        texture: PIXI.Texture;
        textureFrame: Phaser.Frame;
        type: number;
        disableTextureUpload: boolean;
        dirty: boolean;

        currentTime: number;
        duration: number;
        progress: number;
        mute: boolean;
        paused: boolean;
        volume: boolean;
        playbackRate: boolean;
        playing: boolean;
        loop: boolean;
        width: number;
        height: number;
        videoStream: any;
        isStreaming: boolean;
        snapshot: Phaser.BitmapData;
        timeout: number;
        retryLimit: number;
        retry: number;
        retryInterval: number;

        onAccess: Phaser.Signal;
        onError: Phaser.Signal;
        onPlay: Phaser.Signal;
        onComplete: Phaser.Signal;
        onUpdate: Phaser.Signal;
        onTimeout: Phaser.Signal;

        touchLocked: boolean;
        complete: () => void;

        constructor(game: Phaser.Game, key?: string, url?: string);

        add(object: Phaser.Sprite | Phaser.Sprite[] | Phaser.Image | Phaser.Image[]): Phaser.Video;
        addToWorld(x?: number, y?: number, anchorX?: number, anchorY?: Number, scaleX?: number, scaleY?: number): Phaser.Image;
        createVideoFromBlob(blob: Blob): Phaser.Video;
        startMediaStream(captureAudio?: boolean, width?: number, height?: number): Phaser.Video;
        createVideoFromURL(url: string, autoplay?: boolean): Phaser.Video;
        changeSource(src: string, autoplay?: boolean): Phaser.Video;
        connectToMediaStram(video: any, stream: any): Phaser.Video;
        destroy(): void;
        play(loop?: boolean, playbackRate?: number): Phaser.Video;
        playHandler(): void;
        render(): void;
        removeVideoElement(): void;
        resizeFrame(parent: any, width: number, height: number): void;
        setTouchLock(): void;
        grab(clear?: boolean, alpha?: number, blendMode?: string): Phaser.BitmapData;
        stop(): void;
        unlock(): boolean;
        updateTexture(event?: any, width?: number, height?: number): void;

    }

    module Physics {

        class Arcade {

            static SORT_NONE: number;
            static LEFT_RIGHT: number;
            static RIGHT_LEFT: number;
            static TOP_BOTTOM: number;
            static BOTTOM_TOP: number;
            static OVERLAP_BIAS: number;
            static TILE_BIAS: number;

            constructor(game: Phaser.Game);

            bounds: Phaser.Rectangle;
            checkCollision: { up?: boolean; down?: boolean; left?: boolean; right?: boolean; };
            forceX: boolean;
            game: Phaser.Game;
            gravity: Phaser.Point;
            quadTree: Phaser.QuadTree;
            maxObjects: number;
            maxLevels: number;
            skipQuadTree: boolean;
            sortDirection: number;

            accelerationFromRotation(rotation: number, speed?: number, point?: Phaser.Point): Phaser.Point;
            accelerateToObject(displayObject: any, destination: any, speed?: number, xSpeedMax?: number, ySpeedMax?: number): number;
            accelerateToPointer(displayObject: any, pointer?: Phaser.Pointer, speed?: number, xSpeedMax?: number, ySpeedMax?: number): number;
            accelerateToXY(displayObject: any, x: number, y: number, speed?: number, xSpeedMax?: number, ySpeedMax?: number): number;
            angleBetween(source: any, target: any, world?: boolean): number;
            angleToPointer(displayObject: any, pointer?: Phaser.Pointer, world?: boolean): number;
            angleToXY(displayObject: any, x: number, y: number, world?: boolean): number;
            collide(object1: any, object2?: any, collideCallback?: Function, processCallback?: Function, callbackContext?: any): boolean;
            computeVelocity(axis: number, body: Phaser.Physics.Arcade.Body, velocity: number, acceleration: number, drag: number, max?: number): number;
            distanceBetween(source: any, target: any, world?: boolean): number;
            distanceToPointer(displayObject: any, pointer?: Phaser.Pointer, world?: boolean): number;
            distanceToXY(displayObject: any, x: number, y: number, world?: boolean): number;
            enable(object: any, children?: Boolean): void;
            enableBody(object: any): void;
            getObjectsAtLocation(x: number, y: number, group: Phaser.Group, callback?: (callbackArg: any, object: any) => void, callbackContext?: any, callbackArg?: any): Sprite[];
            getOverlapX(body1: Phaser.Physics.Arcade.Body, body2: Phaser.Physics.Arcade.Body): number;
            getOverlapY(body1: Phaser.Physics.Arcade.Body, body2: Phaser.Physics.Arcade.Body): number;
            intersects(body1: Phaser.Physics.Arcade.Body, body2: Phaser.Physics.Arcade.Body): boolean;
            moveToObject(displayObject: any, destination: any, speed?: number, maxTime?: number): number;
            moveToPointer(displayObject: any, speed?: number, pointer?: Phaser.Pointer, maxTime?: number): number;
            moveToXY(displayObject: any, x: number, y: number, speed?: number, maxTime?: number): number;
            overlap(object1: any, object2: any, overlapCallback?: Function, processCallback?: Function, callbackContext?: any): boolean;
            processTileSeparationX(body: Phaser.Physics.Arcade.Body, x: number): boolean;
            processTileSeparationY(body: Phaser.Physics.Arcade.Body, y: number): void;
            setBounds(x: number, y: number, width: number, height: number): void;
            setBoundsToWorld(): void;
            separate(body1: Phaser.Physics.Arcade.Body, body2: Phaser.Physics.Arcade.Body, processCallback?: Function, callbackContext?: any, overlapOnly?: boolean): boolean;
            separateX(body1: Phaser.Physics.Arcade.Body, body2: Phaser.Physics.Arcade.Body, overlapOnly: boolean): boolean;
            separateY(body1: Phaser.Physics.Arcade.Body, body2: Phaser.Physics.Arcade.Body, overlapOnly: boolean): boolean;
            separateTile(i: number, body: Phaser.Physics.Arcade.Body, tile: Phaser.Tile): boolean;
            sort(group: Phaser.Group): void;
            tileCheckX(body: Phaser.Physics.Arcade.Body, tile: Phaser.Tile): number;
            tileCheckY(body: Phaser.Physics.Arcade.Body, tile: Phaser.Tile): number;
            updateMotion(body: Phaser.Physics.Arcade.Body): void;
            velocityFromAngle(angle: number, speed?: number, point?: Phaser.Point): Phaser.Point;
            velocityFromRotation(rotation: number, speed?: number, point?: Phaser.Point): Phaser.Point;

        }

        module Arcade {

            class Body {

                constructor(sprite: Phaser.Sprite);

                acceleration: Phaser.Point;
                allowGravity: boolean;
                allowRotation: boolean;
                angle: number;
                angularAcceleration: number;
                angularDrag: number;
                angularVelocity: number;
                blocked: FaceChoices;
                bottom: number;
                bounce: Phaser.Point;
                center: Phaser.Point;
                checkCollision: FaceChoices;
                collideWorldBounds: boolean;
                customSeparateX: boolean;
                customSeparateY: boolean;
                deltaMax: Phaser.Point;
                dirty: boolean;
                drag: Phaser.Point;
                embedded: boolean;
                enable: boolean;
                facing: number;
                friction: Phaser.Point;
                game: Phaser.Game;
                gravity: Phaser.Point;
                halfWidth: number;
                halfHeight: number;
                height: number;
                immovable: boolean;
                isCircle: boolean;
                isMoving: boolean;
                mass: number;
                maxAngular: number;
                maxVelocity: Phaser.Point;
                moves: boolean;
                movementCallback: any;
                movementCallbackContext: any;
                newVelocity: Phaser.Point;
                offset: Phaser.Point;
                onCollide: Phaser.Signal;
                onMoveComplete: Phaser.Signal;
                onOverlap: Phaser.Signal;
                onWorldBounds: Phaser.Signal;
                overlapX: number;
                overlapY: number;
                phase: number;
                position: Phaser.Point;
                preRotation: number;
                prev: Phaser.Point;
                radius: number;
                right: number;
                rotation: number;
                skipQuadTree: boolean;
                sourceWidth: number;
                sourceHeight: number;
                speed: number;
                sprite: Phaser.Sprite;
                stopVelocityOnCollide: boolean;
                syncBounds: boolean;
                tilePadding: Phaser.Point;
                touching: FaceChoices;
                type: number;
                wasTouching: FaceChoices;
                width: number;
                worldBounce: Phaser.Point;
                velocity: Phaser.Point;
                x: number;
                y: number;

                checkWorldBounds(): void;
                deltaX(): number;
                deltaY(): number;
                deltaZ(): number;
                deltaAbsX(): number;
                deltaAbsY(): number;
                destroy(): void;
                getBounds(obj: any): any;
                hitTest(x: number, y: number): boolean;
                moveFrom(duration: number, speed?: number, direction?: number): boolean;
                moveTo(duration: number, distance: number, direction?: number): boolean;
                onFloor(): boolean;
                onWall(): boolean;
                preUpdate(): void;
                postUpdate(): void;
                render(context: any, body: Phaser.Physics.Arcade.Body, color?: string, filled?: boolean): void;
                renderBodyInfo(debug: Phaser.Utils.Debug, body: Phaser.Physics.Arcade.Body): void;
                reset(x: number, y: number): void;
                setCircle(radius: number, offsetX?: number, offsetY?: number): void;
                setSize(width: number, height: number, offsetX?: number, offsetY?: number): void;
                updateBounds(): boolean;

            }

            class FaceChoices {

                none: boolean;
                any: boolean;
                up: boolean;
                down: boolean;
                left: boolean;
                right: boolean;

            }
        }

        class Ninja {

            constructor(game: Phaser.Game);

            game: Phaser.Game;
            gravity: number;
            bounds: Phaser.Rectangle;
            maxObjects: number;
            maxLevels: number;
            quadTree: Phaser.QuadTree;
            time: Phaser.Time;

            clearTilemapLayerBodies(map: Phaser.Tilemap, layer: any): void;
            collide(object1: any, object2: any, collideCallback?: Function, processCallback?: Function, callbackContext?: any): boolean;
            convertTilemap(map: Phaser.Tilemap, layer: any, slopeMap: any): Phaser.Physics.Ninja.Tile[];
            enableAABB(object: any, children?: boolean): void;
            enableCircle(object: any, radius: number, children?: boolean): void;
            enableTile(object: any, id: number, children?: boolean): void;
            enable(object: any, type?: number, id?: number, radius?: number, children?: boolean): void;
            enableBody(object: any, type?: number, id?: number, radius?: number): void;
            overlap(object1: any, object2: any, overlapCallback?: Function, processCallback?: Function, callbackContext?: any): boolean;
            separate(body1: Phaser.Physics.Ninja.Body, body2: Phaser.Physics.Ninja.Body, processCallback?: Function, callbackContext?: any, overlapOnly?: boolean): boolean;
            setBounds(x: number, y: number, width: number, height: number): void;
            setBoundsToWorld(): void;
        }

        module Ninja {

            class Body {

                constructor(system: Phaser.Physics.Ninja, sprite: Phaser.Sprite, type?: number, id?: number, radius?: number, x?: number, y?: number, width?: number, height?: number);

                aabb: Phaser.Physics.Ninja.AABB;
                angle: number;
                bottom: number;
                bounce: number;
                checkCollision: Phaser.Physics.Arcade.FaceChoices;
                circle: Phaser.Physics.Ninja.Circle;
                collideWorldBounds: boolean;
                drag: number;
                facing: number;
                friction: number;
                game: Phaser.Game;
                gravityScale: number;
                height: number;
                immovable: boolean;
                maxSpeed: number;
                right: number;
                sprite: Phaser.Sprite;
                system: Phaser.Physics.Ninja;
                tile: Phaser.Physics.Ninja.Tile;
                touching: Phaser.Physics.Arcade.FaceChoices;
                type: number;
                shape: any;
                speed: number;
                velocity: Phaser.Point;
                wasTouching: Phaser.Physics.Arcade.FaceChoices;
                width: number;
                x: number;
                y: number;

                deltaAbsX(): number;
                deltaAbsY(): number;
                deltaX(): number;
                deltaY(): number;
                destroy(): void;
                setZeroVelocity(): void;
                moveTo(speed: number, angle: number): void;
                moveFrom(speed: number, angle: number): void;
                moveLeft(speed: number): void;
                moveRight(speed: number): void;
                moveUp(speed: number): void;
                moveDown(speed: number): void;
                poseUpdate(): void;
                preUpdate(): void;
                render(context: any, body: Phaser.Physics.Ninja.Body, color?: string, filled?: boolean): void;
                reset(): void;

            }

            class AABB {

                constructor(body: Phaser.Physics.Ninja.Body, x: number, y: number, width: number, height: number);

                static COL_NONE: number;
                static COL_AXIS: number;
                static COL_OTHER: number;

                aabbTileProjections: any;
                body: Phaser.Physics.Ninja.Body;
                height: number;
                oldPos: Phaser.Point;
                pos: Phaser.Point;
                system: Phaser.Physics.Ninja;
                width: number;
                velocity: Phaser.Point;
                xw: number;
                yw: number;

                collideWorldBounds(): void;
                collideAABBVsAABB(aabb: Phaser.Physics.Ninja.AABB): boolean;
                collideAABBVsTile(tile: Phaser.Physics.Ninja.Tile): boolean;
                destroy(): void;
                integrate(): void;
                render(context: any, xOffset: number, yOffset: number, color: string, filled: boolean): void;
                reportCollision(px: number, py: number, dx: number, dy: number): void;
                reportCollisionVsWorld(px: number, py: number, dx: number, dy: number, obj: any): void;
                reportCollisionVsBody(px: number, py: number, dx: number, dy: number, obj: any): void;
                resolveTile(x: number, y: number, body: Phaser.Physics.Ninja.AABB, tile: Phaser.Physics.Ninja.Tile): boolean;
                reverse(): void;

            }

            class Circle {

                constructor(body: Phaser.Physics.Ninja.Body, x: number, y: number, radius: number);

                COL_NONE: number;
                COL_AXIS: number;
                COL_OTHER: number;

                body: Phaser.Physics.Ninja.Body;
                circleTileProjections: { [index: number]: ((x: number, y: number, oH: number, oV: number, obj: Phaser.Physics.Ninja.Circle, t: Phaser.Physics.Ninja.Tile) => number); };
                oldPos: Phaser.Point;
                height: number;
                pos: Phaser.Point;
                radius: number;
                system: Phaser.Physics.Ninja;
                type: number;
                velocity: Phaser.Point;
                width: number;
                xw: number;
                yw: number;

                collideCircleVsTile(tile: Phaser.Physics.Ninja.Tile): boolean;
                collideWorldBounds(): void;
                destroy(): void;
                distance(dest: number, round?: boolean): number;
                integrate(): void;
                render(context: any, xOffset: number, yOffset: number, color: string, filled: boolean): void;
                reportCollisionVsWorld(px: number, py: number, dx: number, dy: number, obj: any): void;
                reportCollisionVsBody(px: number, py: number, dx: number, dy: number, obj: any): void;
                resolveCircleTile(x: number, y: number, oH: number, oV: number, obj: Phaser.Physics.Ninja.Circle, t: Phaser.Physics.Ninja.Tile): boolean;

            }

            enum TileType {
                TYPE_EMPTY,
                TYPE_FULL,
                TYPE_45DEG,
                TYPE_CONCAVE,
                TYPE_CONVEX,
                TYPE_22DEGs,
                TYPE_22DEGb,
                TYPE_67DEGs,
                TYPE_67DEGb,
                TYPE_HALF
            }

            class Tile {

                constructor(body: Phaser.Physics.Ninja.Body, x: number, y: number, width: number, height: number, type?: number);

                body: Phaser.Physics.Ninja.Body;
                bottom: number;
                flipped: boolean;
                height: number;
                id: number;
                oldpos: Phaser.Point;
                pos: Phaser.Point;
                right: number;
                rotation: number;
                system: Phaser.Physics.Ninja;
                type: Phaser.Physics.Ninja.TileType;
                velocity: Phaser.Point;
                width: number;
                xw: number;
                yw: number;
                x: number;
                y: number;

                clear(): void;
                collideWorldBounds(): void;
                destroy(): void;
                integrate(): void;
                reportCollisionVsWorld(px: number, py: number, dx: number, dy: number, obj: any): void;
                setType(id: number): number;

            }

        }

        class P2 {

            constructor(game: Phaser.Game, config?: any);

            applyDamping: boolean;
            applyGravity: boolean;
            applySpringForces: boolean;
            boundsCollidesWith: Phaser.Physics.P2.Body[];
            boundsCollisionGroup: Phaser.Physics.P2.CollisionGroup;
            config: any;
            callbackContext: any;
            collisionGroups: Phaser.Physics.P2.CollisionGroup[];
            contactMaterial: Phaser.Physics.P2.ContactMaterial;
            emitImpactEvent: boolean;
            everythingCollisionGroup: Phaser.Physics.P2.CollisionGroup;
            frameRate: number;
            friction: number;
            game: Phaser.Game;
            gravity: Phaser.Physics.P2.InversePointProxy;
            materials: Phaser.Physics.P2.Material[];
            nothingCollisionGroup: Phaser.Physics.P2.CollisionGroup;
            onBodyAdded: Phaser.Signal;
            onBodyRemoved: Phaser.Signal;
            onBeginContact: Phaser.Signal;
            onConstraintAdded: Phaser.Signal;
            onConstraintRemoved: Phaser.Signal;
            onContactMaterialAdded: Phaser.Signal;
            onContactMaterialRemoved: Phaser.Signal;
            onEndContact: Phaser.Signal;
            onSpringAdded: Phaser.Signal;
            onSpringRemoved: Phaser.Signal;
            paused: boolean;
            postBroaddphaseCallback: Function;
            restitution: number;
            solveConstraints: boolean;
            time: any;
            total: number;
            useElapsedTime: boolean;
            walls: {
                left?: Phaser.Physics.P2.Body;
                right?: Phaser.Physics.P2.Body;
                top?: Phaser.Physics.P2.Body;
                bottom?: Phaser.Physics.P2.Body;
            };
            world: p2.World;

            addBody(body: Phaser.Physics.P2.Body): boolean;
            addContactMaterial(material: Phaser.Physics.P2.ContactMaterial): Phaser.Physics.P2.ContactMaterial;
            addConstraint<T>(constraint: T): T;
            addSpring(spring: Phaser.Physics.P2.Spring): Phaser.Physics.P2.Spring;
            beginContactHandler(event: any): void;
            clear(): void;
            clearTilemapLayerBodies(map: Phaser.Tilemap, layer?: any): void;
            convertCollisionObjects(map: Phaser.Tilemap, layer?: any, addToWorld?: boolean): Phaser.Physics.P2.Body[];
            convertTilemap(map: Phaser.Tilemap, layer?: any, addToWorld?: Boolean, optimize?: boolean): Phaser.Physics.P2.Body[];
            createBody(x: number, y: number, mass: number, addToWorld?: boolean, options?: p2.BodyOptions, data?: number[][]): Phaser.Physics.P2.Body;
            createBody(x: number, y: number, mass: number, addToWorld?: boolean, options?: p2.BodyOptions, data?: number[]): Phaser.Physics.P2.Body;
            createCollisionGroup(group?: Phaser.Group): Phaser.Physics.P2.CollisionGroup;
            createCollisionGroup(group?: Phaser.Sprite): Phaser.Physics.P2.CollisionGroup;
            createContactMaterial(materialA: Phaser.Physics.P2.Material, materialB: Phaser.Physics.P2.Material, options?: p2.ContactMaterialOptions): Phaser.Physics.P2.ContactMaterial;
            createDistanceConstraint(bodyA: any, bodyB: any, distance: number, localAnchorA?: number[], localAnchorB?: number[], maxForce?: number): Phaser.Physics.P2.DistanceConstraint;
            createGearConstraint(bodyA: any, bodyB: any, angle?: number, ratio?: number): Phaser.Physics.P2.GearConstraint;
            createLockConstraint(bodyA: any, bodyB: any, offset?: number[], angle?: number, maxForce?: number): Phaser.Physics.P2.LockConstraint;
            createMaterial(name?: string, body?: Phaser.Physics.P2.Body): Phaser.Physics.P2.Material;
            createParticle(x: number, y: number, mass: number, addToWorld?: boolean, options?: p2.BodyOptions, data?: number[][]): Phaser.Physics.P2.Body;
            createParticle(x: number, y: number, mass: number, addToWorld?: boolean, options?: p2.BodyOptions, data?: number[]): Phaser.Physics.P2.Body;
            createPrismaticConstraint(body: any, bodyB: any, lockRotation?: boolean, anchorA?: number[], anchorB?: number[], axis?: Float32Array, maxForce?: number): Phaser.Physics.P2.PrismaticConstraint;
            createRevoluteConstraint(bodyA: any, pivotA: number[], bodyB: any, pivotB: number[], maxForce?: number, worldPivot?: number[]): Phaser.Physics.P2.RevoluteConstraint;
            createRotationalSpring(bodyA: any, bodyB: any, restAngle?: number, stiffness?: number, damping?: number): p2.RotationalSpring;
            createSpring(bodyA: any, bodyB: any, restLength?: number, stiffness?: number, damping?: number, worldA?: number[], worldB?: number[], localA?: number[], localB?: number[]): Phaser.Physics.P2.Spring;
            destroy(): void;
            enable(object: any, debug?: boolean, children?: boolean): void;
            enableBody(object: any, debug: boolean): void;
            endContactHandler(event: any): void;
            getBodies(): Phaser.Physics.P2.Body[];
            getBody(object: any): Phaser.Physics.P2.Body;
            getConstraints(): p2.Constraint[];
            getSprings(): Phaser.Physics.P2.Spring[];
            getContactMaterial(materialA: Phaser.Physics.P2.Material, materialB: Phaser.Physics.P2.Material): Phaser.Physics.P2.ContactMaterial;
            hitTest(worldPoint: Phaser.Point, bodies?: any[], precision?: number, filterStatic?: boolean): Phaser.Physics.P2.Body[];
            mpx(v: number): number;
            mpxi(v: number): number;
            pause(): void;
            preUpdate(): void;
            pxm(v: number): number;
            pxmi(v: number): number;
            removeBody(body: Phaser.Physics.P2.Body): Phaser.Physics.P2.Body;
            removeBodyNextStep(body: Phaser.Physics.P2.Body): void;
            removeConstraint<T>(constraint: T): T;
            removeContactMaterial(material: Phaser.Physics.P2.ContactMaterial): Phaser.Physics.P2.ContactMaterial;
            removeSpring(spring: Phaser.Physics.P2.Spring): Phaser.Physics.P2.Spring;
            reset(): void;
            resume(): void;
            setBounds(x: number, y: number, width: number, height: number, left?: Boolean, right?: boolean, top?: boolean, bottom?: boolean, setCollisionGroup?: boolean): void;
            setBoundsToWorld(left?: boolean, right?: boolean, top?: boolean, bottom?: boolean, setCollisionGroup?: boolean): void;
            setCollisionGroup(object: any, group: Phaser.Physics.P2.CollisionGroup): void;
            setImpactEvents(state: boolean): void;
            setMaterial(material: Phaser.Physics.P2.Material, bodies?: Phaser.Physics.P2.Body[]): void;
            setPostBroadphaseCallback(callback: Function, context: any): void;
            setWorldMaterial(material: Phaser.Physics.P2.Material, left?: boolean, right?: boolean, top?: boolean, bottom?: boolean): void;
            toJSON(): any;
            update(): void;
            updateBoundsCollisionGroup(setCollisionGroup?: boolean): void;

        }

        module P2 {

            class Body {

                static DYNAMIC: number;
                static STATIC: number;
                static KINEMATIC: number;

                constructor(game: Phaser.Game, sprite?: Phaser.Sprite, x?: number, y?: number, mass?: number);

                allowSleep: boolean;
                angle: number;
                angularDamping: number;
                angularForce: number;
                angularVelocity: number;
                collidesWith: Phaser.Physics.P2.CollisionGroup[];
                collideWorldBounds: boolean;
                damping: number;
                data: p2.Body;
                debug: boolean;
                debugBody: Phaser.Physics.P2.BodyDebug;
                dynamic: boolean;
                fixedRotation: boolean;
                force: Phaser.Physics.P2.InversePointProxy;
                kinematic: boolean;
                game: Phaser.Game;
                gravity: Phaser.Point;
                id: number;
                inertia: number;
                mass: number;
                motionState: number;
                offset: Phaser.Point;
                onBeginContact: Phaser.Signal;
                onEndContact: Phaser.Signal;
                rotation: number;
                removeNextStep: boolean;
                sprite: Phaser.Sprite;
                sleepSpeedLimit: number;
                static: boolean;
                type: number;
                velocity: Phaser.Physics.P2.InversePointProxy;
                world: Phaser.Physics.P2;
                x: number;
                y: number;

                addToWorld(): void;
                addCapsule(length: number, radius: number, offsetX?: number, offsetY?: number, rotation?: number): p2.Capsule;
                addCircle(radius: number, offsetX?: number, offsetY?: number, rotation?: number): p2.Circle;
                addFixture(fixtureData: string): p2.Shape[];
                addLine(length: number, offsetX?: number, offsetY?: number, rotation?: number): p2.Line;
                addParticle(offsetX?: number, offsetY?: number, rotation?: number): p2.Particle;
                addPolygon(options: { optimalDecomp?: boolean; skipSimpleCheck?: boolean; removeCollinearPoints?: boolean; }, points: number[][]): boolean;
                addPhaserPolygon(key: string, object: string): Phaser.Physics.P2.FixtureList;
                addPlane(offsetX?: number, offsetY?: number, rotation?: number): p2.Plane;
                addRectangle(width: number, height: number, offsetX?: number, offsetY?: number, rotation?: number): p2.Rectangle;
                addShape(shape: p2.Shape, offsetX?: number, offsetY?: number, rotation?: number): p2.Shape;
                adjustCenterOfMass(): void;
                applyDamping(dt: number): void;
                applyForce(force: number[], worldX: number, worldY: number): void;
                applyImpulse(impulse: number[], worldX: number, worldY: number): void;
                applyImpulseLocal(impulse: number[], localX: number, localY: number): void;
                clearCollision(clearGroup?: boolean, cleanMask?: boolean, shape?: p2.Shape): void;
                clearShapes(): void;
                collides(group: any, callback?: Function, callbackContext?: any, shape?: p2.Shape): void;
                createBodyCallback(object: any, callback: Function, callbackContext: any): void;
                createGroupCallback(group: Phaser.Physics.P2.CollisionGroup, callback: Function, callbackContext: any): void;
                destroy(): void;
                getCollisionMask(): number;
                getVelocityAtPoint(result: number[], relativePoint: number[]): number[];
                loadPolygon(key: string, object: string): boolean;
                moveBackward(speed: number): void;
                moveDown(speed: number): void;
                moveForward(speed: number): void;
                moveLeft(speed: number): void;
                moveRight(speed: number): void;
                moveUp(speed: number): void;
                preUpdate(): void;
                postUpdate(): void;
                removeCollisionGroup(group: any, clearCallback?: boolean, shape?: p2.Shape): void;
                removeFromWorld(): void;
                removeShape(shape: p2.Shape): boolean;
                reverse(speed: number): void;
                rotateLeft(speed: number): void;
                rotateRight(speed: number): void;
                reset(x: number, y: number, resetDamping?: boolean, resetMass?: boolean): void;
                shapeChanged(): void;
                setCircle(radius: number, offsetX?: number, offsetY?: number, rotation?: number): p2.Circle;
                setCollisionGroup(group: Phaser.Physics.P2.CollisionGroup, shape?: p2.Shape): void;
                setRectangle(width?: number, height?: number, offsetX?: number, offsetY?: number, rotation?: number): p2.Rectangle;
                setRectangleFromSprite(sprite: any): p2.Rectangle;
                setMaterial(material: Phaser.Physics.P2.Material, shape?: p2.Shape): void;
                setZeroDamping(): void;
                setZeroForce(): void;
                setZeroRotation(): void;
                setZeroVelocity(): void;
                toLocalFrame(out: number[], worldPoint: number[]): void;
                thrust(speed: number): void;
                thrustLeft(speed: number): void;
                thrustRight(speed: number): void;
                toWorldFrame(out: number[], localPoint: number[]): void;
                updateCollisionMask(shape?: p2.Shape): void;

            }

            class BodyDebug extends Phaser.Group {

                constructor(game: Phaser.Game, body: Phaser.Physics.P2.Body, settings: { pixelsPerLengthUnit?: number; debugPolygons?: boolean; lineWidth?: number; alpha?: number; });

                body: Phaser.Physics.P2.Body;
                canvas: Phaser.Graphics;
                ppu: number;

                updateSpriteTransform(): void;
                draw(): void;

            }

            class CollisionGroup {

                constructor(bitmask: number);

                mask: number;

            }

            class ContactMaterial extends p2.ContactMaterial {

            }

            class DistanceConstraint extends p2.DistanceConstraint {

                constructor(world: Phaser.Physics.P2, bodyA: Phaser.Physics.P2.Body, bodyB: Phaser.Physics.P2.Body, distance: number, maxForce: number);

                game: Phaser.Game;
                world: Phaser.Physics.P2;

            }

            class FixtureList {

                constructor(list: any[]);

                flatten(array: any[]): any[];
                getFixtures(keys: string): any[];
                getFixtureByKey(key: string): any[];
                getGroup(groupID: number): any[];
                init(): void;
                parse(): void;
                setCategory(bit: number, fictureKey: string): void;
                setMask(bit: number, fixtureKey: string): void;
                setMaterial(material: any, fixtureKey: string): void;
                setSensor(value: boolean, fixtureKey: string): void;

            }

            class GearConstraint extends p2.GearConstraint {

                constructor(world: Phaser.Physics.P2, bodyA: Phaser.Physics.P2.Body, bodyB: Phaser.Physics.P2.Body, angle?: number, ratio?: number);

                game: Phaser.Game;
                world: Phaser.Physics.P2;

            }

            class InversePointProxy {

                constructor(world: Phaser.Physics.P2, destination: any);

                x: number;
                y: number;
                mx: number;
                my: number;

            }

            class LockConstraint extends p2.LockConstraint {

                constructor(world: Phaser.Physics.P2, bodyA: Phaser.Physics.P2.Body, bodyB: Phaser.Physics.P2.Body, offset?: number[], angle?: number, maxForce?: number);

                game: Phaser.Game;
                world: Phaser.Physics.P2;
            }

            class Material extends p2.Material {

                constructor(name: string);

                name: string;

            }

            class PointProxy {

                constructor(world: Phaser.Physics.P2, destination: any);

                x: number;
                y: number;
                mx: number;
                my: number;

            }

            class PrismaticConstraint extends p2.PrismaticConstraint {

                constructor(world: Phaser.Physics.P2, bodyA?: Phaser.Physics.P2.Body, bodyB?: Phaser.Physics.P2.Body, lockRotation?: boolean, anchorA?: number[], anchorB?: number[], axis?: number[], maxForce?: number);

                game: Phaser.Game;
                world: Phaser.Physics.P2;

            }

            class RevoluteConstraint extends p2.RevoluteConstraint {

                constructor(world: Phaser.Physics.P2, bodyA: Phaser.Physics.P2.Body, pivotA: number[], bodyB: Phaser.Physics.P2.Body, pivotB: number[], maxForce?: number);

                game: Phaser.Game;
                world: Phaser.Physics.P2;

            }

            class Spring {

                constructor(world: Phaser.Physics.P2, bodyA: Phaser.Physics.P2.Body, bodyB: Phaser.Physics.P2.Body, restLength?: number, stiffness?: number, damping?: number, worldA?: number[], worldB?: number[], localA?: number[], localB?: number[]);

                data: p2.LinearSpring;
                game: Phaser.Game;
                world: Phaser.Physics.P2;

            }
        }

        class Box2D {

            constructor(game: Phaser.Game, config?: any);

            // @property {Phaser.Game} game - Local reference to game.
            game: Phaser.Game;
            // @property {string} version - The version of the Box2D Plugin that is running.
            version: string;
            // @property {number} ptmRatio - Pixels to Meters ratio - @default 50
            ptmRatio: number;
            // @property {box2d.b2World} world - The Box2D world in which the simulation is run.
            world: box2d.b2World;
            // @property {Phaser.Physics.Box2D.DefaultDebugDraw} - used for rendering debug information
            debugDraw: Box2D.DefaultDebugDraw;
            // @property {Phaser.Physics.Box2D.DefaultContactListener} - used to check if bodies have contact callbacks set
            contactListener: Box2D.DefaultContactListener;
            // @property {number} nextBodyId - The id to give the next created body
            nextBodyId: number;
            //  @property {number} nextFixtureId - The id to give the next created fixture
            nextFixtureId: number;
            // @property {box2d.b2Vec2} gravity - The gravity of the Box2D world.
            gravity: Box2D.PointProxy;
            // @property {number} friction - The default friction for fixtures created by 'enable', or other functions like setRectangle, setPolygon etc
            friction: number;
            // @property {number} restitution - The default restitution for fixtures created by 'enable', or other functions like setRectangle, setPolygon etc
            restitution: number;
            // @property {number} density - The default density for fixtures created by 'enable', or other functions like setRectangle, setPolygon etc
            density: number;
            // @property {number} frameRate - The frame rate the world will be stepped at. Defaults to 1 / 60, but you can change here. Also see useElapsedTime property.
            frameRate: number;
            // @property {number} velocityIterations - The maximum number of iterations allowed to adjust velocities to match constraints. Defaults to 8.
            velocityIterations: number;
            // @property {number} positionIterations - The maximum number of iterations allowed to adjust positions to match constraints. Defaults to 3.
            positionIterations: number;
            // @property {boolean} useElapsedTime - If true the frameRate value will be ignored and instead Box2D will step with the value of Game.Time.physicsElapsed, which is a delta time value.
            useElapsedTime: boolean;
            // @property {boolean} paused - The paused state of the Box2D world.
            paused: boolean;
            // @property {box2d.b2ParticleSystem} particleSystem - The World Particle System. Enabled with World.createParticleSystem.
            particleSystem: box2d.b2ParticleSystem;
            // @property {box2d.b2Body} mouseJointBody - A static body with no fixtures, used internally as the 'body A' for mouse joints when dragging dynamic bodies.
            mouseJointBody: box2d.b2Body;
            // @property {box2d.b2MouseJoint} mouseJoint - The active mouse joint for dragging dynamic bodies.
            mouseJoint: box2d.b2MouseJoint;
            // Pixel to meter function overrides. 
            // mpx: Function;
            // pxm: Function;
            // @property {object} walls - An object containing the 4 wall bodies that bound the physics world.
            walls: Box2D.WallsObject;
            // @property {Phaser.Signal} onBodyAdded - Dispatched when a new Body is added to the World.
            onBodyAdded: Phaser.Signal;
            // @property {Phaser.Signal} onBodyRemoved - Dispatched when a Body is removed from the World.
            onBodyRemoved: Phaser.Signal;

            static worldBoundsFilterCategory: number;

            // Returns the next id to use to keep body ids unique
            getNextBodyId(): number;
            // Returns the next id to use to keep fixture ids unique
            getNextFixtureId(): number;
            // This will add a Box2D physics body into the removal list for the next step.
            removeBodyNextStep(body: Box2D.Body): void;
            // Called at the start of the core update loop. Purges flagged bodies from the world.
            preUpdate(): void;
            // This will create a Box2D physics body on the given game object or array of game objects.
            // A game object can only have 1 physics body active at any one time, and it can't be changed until the object is destroyed.
            // Note: When the game object is enabled for Box2D physics it has its anchor x/y set to 0.5 so it becomes centered.
            enable(object: any, children?: boolean): void;
            // Creates a Box2D physics body on the given game object.
            // A game object can only have 1 physics body active at any one time, and it can't be changed until the body is nulled.
            enableBody(object: any): void;
            // Sets the bounds of the Physics world to match the Game.World dimensions.
            // You can optionally set which 'walls' to create: left, right, top or bottom.
            setBoundsToWorld(left?: boolean, right?: boolean, top?: boolean, bottom?: boolean, collisionCategory?: number, collisionMask?: number): void;
            // Sets the bounds of the Physics world to match the given world pixel dimensions.
            // You can optionally set which 'walls' to create: left, right, top or bottom.
            setBounds(x: number, y: number, width: number, height: number,
                left?: boolean, right?: boolean, top?: boolean, bottom?: boolean, collisionCategory?: number, collisionMask?: number): void;
            // Pauses the Box2D world independent of the game pause state.
            pause(): void;
            // Resumes a paused Box2D world.
            resume(): void;
            // Internal Box2D update loop.
            update(): void;
            // Clears all bodies from the simulation, resets callbacks.
            reset(): void;
            // Clears all bodies from the simulation, resets callbacks.
            clear(): void;
            // Clears all bodies from the simulation and unlinks World from Game. Should only be called on game shutdown. Call `clear` on a State change.
            destroy(): void;
            // Creates a new Body and adds it to the World.
            createBody(x?: number, y?: number, density?: number): Box2D.Body;
            // Creates a new dynamic Body and adds a Circle fixture to it of the given size.
            createCircle(x?: number, y?: number, radius?: number, offsetX?: number, offsetY?: number): Box2D.Body;
            // Creates a new dynamic Body and adds a Rectangle fixture to it of the given dimensions.
            createRectangle(x?: number, y?: number, width?: number, height?: number, offsetX?: number, offsetY?: number, rotation?: number): Box2D.Body;
            // Creates a new dynamic Body and adds a Polygon fixture to it.
            createPolygon(x: number, y: number, vertices: number[], firstIndex?: number, count?: number): Box2D.Body;
            // Adds an already created Box2D Body to this Box2D world.
            addBody(body: Box2D.Body): boolean;
            // Removes a body from the world. This will silently fail if the body wasn't part of the world to begin with.
            removeBody(body: Box2D.Body): Box2D.Body;
            // Populates and returns an array with references to of all current Bodies in the world.
            getBodies(): Box2D.Body[];
            // Checks the given object to see if it has a Box2D body and if so returns it.
            getBody(object: Object): Box2D.Body;
            // Converts the current world into a JSON object.
            toJSON(): any;
            // Convert Box2D physics value (meters) to pixel scale.
            // By default we use a scale of 50px per meter.
            // If you need to modify this you can over-ride these functions via the Physics Configuration object.
            mpx(v: number): number;
            // Convert pixel value to Box2D physics scale (meters).
            // By default we use a scale of 50px per meter.
            // If you need to modify this you can over-ride these functions via the Physics Configuration object.
            pxm(v: number): number;
            // Runs the standard 'debug draw' rendering. What actually gets drawn will depend
            // on the current status of the flags set in the debug draw object held by the b2World.
            // This could perhaps be made modifiable at runtime, but for now it is just rendering
            // shapes (see usage of b2Shapes flag below).
            renderDebugDraw(context: CanvasRenderingContext2D): void;
            // Renders information about the body as text. This is intended to be used internally by Phaser.Utils.Debug.
            // To make use of this from your code you would call something like game.debug.bodyInfo(sprite, x, y)
            renderBodyInfo(debug: Utils.Debug, body: Box2D.Body): void;
            // Returns all fixtures found under the given point. Set the onlyOne parameter to true if you only
            // care about finding one fixture under the point.
            getFixturesAtPoint(x: number, y: number, onlyOne?: boolean, onlyDynamic?: boolean): box2d.b2Fixture[];
            // Returns all bodies (Phaser.Physics.Box2D.Body) found under the given coordinates. Set the onlyOne
            // parameter to true if you only care about finding one body.
            getBodiesAtPoint(x: number, y: number, onlyOne?: boolean, onlyDynamic?: boolean): Box2D.Body[];
            
            // If there is a dynamic body under the given point, a mouse joint will be created
            // to drag that body around. Use the mouseDragMove and mouseDragEnd functions to
            // continue the drag action. Any mouse drag already in progress will be canceled.
            mouseDragStart(point: Phaser.Point): void;
            // Updates the target location of the active mouse joint, if there is one. If there
            // is no mouse joint active, this does nothing.
            mouseDragMove(point: Phaser.Point): void;    
            // Ends the active mouse joint if there is one. If there is no mouse joint active, does nothing.
            mouseDragEnd(): void;    
            
            // Creates a distance joint.
            distanceJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite, length?: number,
                ax?: number, ay?: number, bx?: number, by?: number, frequency?: number, damping?: number): box2d.b2DistanceJoint;
            // Creates a rope joint.
            ropeJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite, length?: number,
                ax?: number, ay?: number, bx?: number, by?: number): box2d.b2RopeJoint;
            // Creates a revolute joint.
            revoluteJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
                ax?: number, ay?: number, bx?: number, by?: number,
                motorSpeed?: number, motorTorque?: number, motorEnabled?: boolean,
                lowerLimit?: number, upperLimit?: number, limitEnabled?: boolean): box2d.b2RevoluteJoint;
            // Creates a prismatic joint.
            prismaticJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
                axisX?: number, axisY?: number,
                ax?: number, ay?: number, bx?: number, by?: number,
                motorSpeed?: number, motorForce?: number, motorEnabled?: boolean,
                owerLimit?: number, upperLimit?: number, limitEnabled?: boolean,
                offsetAngle?:number): box2d.b2PrismaticJoint;
            // Creates a friction joint.
            frictionJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
                maxForce?:number, maxTorque?:number,
                ax?: number, ay?: number, bx?: number, by?: number): box2d.b2FrictionJoint;
            // Creates a weld joint.
            weldJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
                ax?: number, ay?: number, bx?: number, by?: number,
                frequency?:number, damping?:number): box2d.b2WeldJoint;
            // Creates a motor joint.
            motorJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
                maxForce? :number, maxTorque?:number, correctionFactor?:number,
                offsetX?:number, offsetY?:number,
                offsetAngle?: number): box2d.b2MotorJoint;
            // Creates a wheel joint.
            wheelJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
                ax?: number, ay?: number, bx?: number, by?: number,
                axisX?: number, axisY?: number,
                frequency?: number, damping?: number, motorSpeed?: number, motorTorque?: number, motorEnabled?: boolean): box2d.b2WheelJoint;
            // Creates a pulley joint.
            pulleyJoint(bodyA: Box2D.Body | Phaser.Sprite, bodyB: Box2D.Body | Phaser.Sprite,
                ax?: number, ay?: number, bx?: number, by?: number,
                gax?: number, gay?: number, gbx?: number, gby?: number,
                ratio?: number, lengthA?: number, lengthB?: number): box2d.b2PulleyJoint;
            // Creates a gear joint.
            gearJoint(joint1: box2d.b2Joint, joint2: box2d.b2Joint, ratio?:number): box2d.b2GearJoint;


            // Clears all physics bodies from the given TilemapLayer that were created with `World.convertTilemap`.
            clearTilemapLayerBodies(map: Phaser.Tilemap, layer: number | string | Phaser.TilemapLayer): void;
            // Goes through all tiles in the given Tilemap and TilemapLayer and converts those set to collide into physics bodies.
            // Only call this *after* you have specified all of the tiles you wish to collide with calls like Tilemap.setCollisionBetween, etc.
            // Every time you call this method it will destroy any previously created bodies and remove them from the world.
            // Therefore understand it's a very expensive operation and not to be done in a core game update loop.
            convertTilemap(map: Phaser.Tilemap, layer: number | string | Phaser.TilemapLayer, addToWorld?: boolean, optimize?: boolean): Box2D.Body[];
    
            // Casts a ray and finds intersecting fixtures in the world.
            raycast(x1: number, y1: number, x2: number, y2: number, closestHitOnly?: boolean, filterFunction?: Function): Box2D.RaycastHit[];
            // Finds all fixtures with AABBs overlapping the given area. This does NOT mean
            // that the fixtures themselves are actually overlapping the given area.
            queryAABB(x: number, y: number, width: number, height: number): Box2D.AABBHit[];
            // Finds all fixtures that overlap the given fixture.
            queryFixture(fixture: box2d.b2Fixture): Box2D.AABBHit[];

            // If the PTM ratio is changed after creating the world, the debug draw scale needs to be updated.
            setPTMRatio(newRatio: number): void;
        }

        module Box2D {

            class DefaultDebugDraw {

                constructor(pixelsPerMeter: number);

                color: box2d.b2Color;

                // Sets which aspects of the world to render
                SetFlags(flags: number): void;
                // Gets which aspects of the world are currently set to be rendered
                GetFlags(): number;
                // Sets the canvas context to use in subsequent rendering and applies overall transform.
                start(context: CanvasRenderingContext2D): void;
                // Resets transform state to original
                stop(): void;
                // Push transform
                PushTransform(xf: box2d.b2Transform): void;
                // Pop transform
                PopTransform(): box2d.b2Transform;
                // Draw polygon
                DrawPolygon(vertices: Array<box2d.b2Vec2>, vertexCount: number, color: box2d.b2Color): void;
                // Draw solid polygon
                DrawSolidPolygon(vertices: Array<box2d.b2Vec2>, vertexCount: number, color: box2d.b2Color): void;
                // Draw circle
                DrawCircle(center: box2d.b2Vec2, radius: number, color: box2d.b2Color): void;
                // Draw solid circle
                DrawSolidCircle(center: box2d.b2Vec2, radius: number, axis: box2d.b2Vec2, color: box2d.b2Color): void;
                // Draw segment
                DrawSegment(p1: box2d.b2Vec2, p2: box2d.b2Vec2, color: box2d.b2Color): void;
                // Draw transform
                DrawTransform(xf: box2d.b2Transform): void;
                // Draw point
                DrawPoint(p: box2d.b2Vec2, size: number, color: box2d.b2Color): void;
                // Draw AABB
                DrawAABB(aabb: box2d.b2AABB, color: box2d.b2Color): void;

                // shapes - Specifies whether the debug draw should render shapes.
                shapes: boolean;
                // joints - Specifies whether the debug draw should render joints.
                joints: boolean;
                //  @property {boolean} aabbs - Specifies whether the debug draw should render fixture AABBs.
                aabbs: boolean;
                // @property {boolean} pairs - Specifies whether the debug draw should render contact pairs.
                pairs: boolean;
                // @property {boolean} centerOfMass - Specifies whether the debug draw should render the center of mass of bodies.
                centerOfMass: boolean;
            }


            class DefaultContactListener {

                constructor();

                // Called when two fixtures begin to touch.
                BeginContact(contact: box2d.b2Contact): void;
                // Called when two fixtures cease touching.
                EndContact(contact: box2d.b2Contact): void;
                // Common code for begin and end contacts.
                handleContactBeginOrEnd(contact: box2d.b2Contact, begin: boolean): void;
                // This is called after a contact is updated. This allows you to 
                // inspect a contact before it goes to the solver. If you are 
                // careful, you can modify the contact manifold (e.g. disable contact). 
                PreSolve(contact: box2d.b2Contact, oldManifold: box2d.b2Manifold): void;
                // This lets you inspect a contact after the solver is finished. 
                PostSolve(contact: box2d.b2Contact, impulse: box2d.b2ContactImpulse): void;
            }


            class PointProxy {

                constructor(world: Physics.Box2D, object: any, gettor: Function, settor: Function);

                x: number;
                y: number;
            }


            class Body {

                constructor(game: Phaser.Game, sprite: Phaser.Sprite, x?: number, y?: number, density?: number, world?: Physics.Box2D);

                // @property {Phaser.Game} game - Local reference to game.
                game: Phaser.Game;
                // @property {Phaser.Physics.Box2D} world - Local reference to the Box2D World.
                world: Physics.Box2D;
                // @property {number} id - a unique id for this body in the world
                id: number;
                // @property {Phaser.Sprite} sprite - Reference to the parent Sprite.
                sprite: Phaser.Sprite;
                // @property {number} type - The type of physics system this body belongs to.
                type: number;
                // @property {Phaser.Point} offset - The offset of the Physics Body from the Sprite x/y position.
                offset: Phaser.Point;
                // @property {box2d.b2BodyDef} bodyDef - The Box2D body definition
                bodyDef: box2d.b2BodyDef;
                // @property {box2d.b2Body} data - The Box2D body data.
                data: box2d.b2Body;
                // @property {Phaser.Physics.Box2D.PointProxy} velocity - The velocity of the body. Set velocity.x to a negative value to move to the left, position to the right. velocity.y negative values move up, positive move down.
                velocity: Box2D.PointProxy;
                // @property {boolean} removeNextStep - To avoid deleting this body during a physics step, and causing all kinds of problems, set removeNextStep to true to have it removed in the next preUpdate.
                removeNextStep: boolean;

                //  Sets a callback to be fired any time a fixture in this Body begins or ends contact with a fixture in the given Body. 
                setBodyContactCallback(object: Phaser.Sprite | Box2D.Body, callback: Function, callbackContext: any): void;
                // Sets a callback to be fired any time the given fixture begins or ends contact something
                setFixtureContactCallback(fixture: box2d.b2Fixture, callback: Function, callbackContext: any): void;
                // Sets a callback to be fired any time a fixture in this body begins contact with a fixture in another body that matches given category set.
                setCategoryContactCallback(category: number, callback: Function, callbackContext: any) : void;
                // Sets a callback to be fired when PreSolve is done for contacts between a fixture in this body and a fixture in the given Body.
                setBodyPresolveCallback(object: Phaser.Sprite | Box2D.Body, callback: Function, callbackContext: any): void;
                // Sets a callback to be fired when PreSolve is done for contacts between a fixture in this body the given fixture.
                setFixturePresolveCallback(fixture: box2d.b2Fixture, callback: Function, callbackContext:any) : void;
                // Sets a callback to be fired when PreSolve is done for contacts between a fixture in this body and a fixture in another body that matches given category set.
                setCategoryPresolveCallback(category: number, callback: Function, callbackContext: any) : void;
                // Sets a callback to be fired when PostSolve is done for contacts between a fixture in this body and a fixture in the given Body.
                setBodyPostsolveCallback(object: Phaser.Sprite | Box2D.Body, callback: Function, callbackContext:any) : void;
                // Sets a callback to be fired when PostSolve is done for contacts between a fixture in this body the given fixture.
                setFixturePostsolveCallback(fixture: box2d.b2Fixture, callback: Function, callbackContext: any): void;
                // Sets a callback to be fired when PostSolve is done for contacts between a fixture in this body and a fixture in another body that matches given category set.
                setCategoryPostsolveCallback(category: number, callback:Function, callbackContext:any): void;

                // Sets the given collision category for all fixtures in this Body, unless a specific fixture is given.
                setCollisionCategory(category: number, fixture?: box2d.b2Fixture): void;
                // Sets the given collision mask for all fixtures in this Body, unless a specific fixture is given.
                setCollisionMask(mask: number, fixture?: box2d.b2Fixture): void;

                // Apply force at the center of mass. This will not cause any rotation.
                applyForce(x: number, y: number): void;
                // If this Body is dynamic then this will zero its angular velocity.
                setZeroRotation(): void;
                // If this Body is dynamic then this will zero its velocity on both axis.
                setZeroVelocity(): void;
                // Sets the linear damping and angular damping to zero.
                setZeroDamping(): void;

                // Transform a world point to local body frame.
                toLocalPoint(out: box2d.b2Vec2, worldPoint: box2d.b2Vec2): box2d.b2Vec2;
                // Transform a local point to world frame.
                toWorldPoint(out: box2d.b2Vec2, localPoint: box2d.b2Vec2): box2d.b2Vec2;
                // Transform a world vector to local body frame.
                toLocalVector(out: box2d.b2Vec2, worldVector: box2d.b2Vec2): box2d.b2Vec2;
                // Transform a local vector to world frame.
                toWorldVector(out: box2d.b2Vec2, localVector: box2d.b2Vec2): box2d.b2Vec2;

                // This will rotate the Body by the given speed to the left (counter-clockwise).
                rotateLeft(speed: number): void;
                // This will rotate the Body by the given speed to the left (clockwise).
                rotateRight(speed: number): void;
                // Moves the Body forwards based on its current angle and the given speed.
                // The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second.
                moveForward(speed: number): void;
                // Moves the Body backwards based on its current angle and the given speed.
                // The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second.
                moveBackward(speed: number): void;
                // Applies a force to the Body that causes it to 'thrust' forwards, based on its current angle and the given speed.
                thrust(power: number): void;
                // Applies a force to the Body that causes it to 'thrust' backwards (in reverse), based on its current angle and the given speed.
                reverse(power: number): void;
                // If this Body is dynamic then this will move it to the left by setting its x velocity to the given speed.
                // The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second.
                moveLeft(speed: number): void;
                // If this Body is dynamic then this will move it to the right by setting its x velocity to the given speed.
                // The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second.
                moveRight(speed: number): void;
                // If this Body is dynamic then this will move it up by setting its y velocity to the given speed.
                // The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second.
                moveUp(speed: number): void;
                // If this Body is dynamic then this will move it down by setting its y velocity to the given speed.
                // The speed is represented in pixels per second. So a value of 100 would move 100 pixels in 1 second.
                moveDown(speed: number): void;

                // Internal method. This is called directly before the sprites are sent to the renderer and after the update function has finished.
                // preUpdate(): void;
                // Internal method. This is called directly before the sprites are sent to the renderer and after the update function has finished.
                // postUpdate(): void;

                // Sets this body as inactive. It will not participate in collisions or
                // any other aspect of the physics simulation. Intended for use by Phaser.Sprite.kill()
                kill(): void;
                // Restores the active status of this body.
                reset(x: number, y: number): void;
                // Removes this physics body from the world.
                removeFromWorld(): void;
                // Destroys this Body and all references it holds to other objects.
                destroy(): void;

                // Removes all fixtures from this Body.
                clearFixtures(): void;
                // Adds a Circle fixture to this Body. You can control the offset from the center of the body and the rotation.
                // It will use the World friction, restitution and density by default.
                addCircle(radius:number, offsetX ?:number, offsetY ?:number): box2d.b2Fixture;
                // Adds a Rectangle fixture to this Body. You can control the offset from the center of the body and the rotation.
                // It will use the World friction, restitution and density by default.
                addRectangle(width ?:number, height ?:number, offsetX ?:number, offsetY ?:number, rotation ?:number): box2d.b2Fixture;
                // Creates a new Edge Shape and adds it to this Body.
                // It will use the World friction, restitution and density by default.
                addEdge(x1 ?:number, y1 ?:number, x2 ?:number, y2 ?:number): box2d.b2Fixture;
                // Creates a new chain shape and adds it to this Body.
                // It will use the World friction, restitution and density by default.
                addChain(vertices: number[], firstIndex ?:number, count ?:number, loop ?:boolean): box2d.b2Fixture;
                // Creates a new loop shape and adds it to this Body.
                addLoop(vertices: number[], firstIndex ?:number, count ?:number): box2d.b2Fixture;
                // Creates a new polygon shape and adds it to this Body.
                addPolygon(vertices: number[], firstIndex ?: number, count ?:number): box2d.b2Fixture;
                // Remove a shape from the body. Will automatically update the mass properties and bounding radius.
                removeFixture(fixture: box2d.b2Fixture): boolean;
                // Clears any previously set fixtures. Then creates a new Circle shape and adds it to this Body.
                setCircle(radius ?:number, offsetX ?:number, offsetY ?:number): box2d.b2Fixture;
                // Clears any previously set fixtures. The creates a new Rectangle fixture at the given size and offset, and adds it to this Body.
                // If you wish to create a Rectangle to match the size of a Sprite or Image see Body.setRectangleFromSprite.
                setRectangle(width ?:number, height ?:number, offsetX ?:number, offsetY ?:number, rotation ?:number): box2d.b2Fixture;
                // Clears any previously set fixtures.
                // Then creates a Rectangle shape sized to match the dimensions and orientation of the Sprite given.
                // If no Sprite is given it defaults to using the parent of this Body.
                setRectangleFromSprite(sprite: Phaser.Sprite | Phaser.Image): box2d.b2Fixture;
                // Clears any previously set fixtures. Then creates a new edge shape and adds it to this Body.
                setEdge(x1 ?:number, y1 ?:number, x2 ?:number, y2?:number): box2d.b2Fixture;
                // Clears any previously set fixtures. Then creates a new chain shape and adds it to this Body.
                setChain(vertices: number[], firstIndex?:number, count?:number, loop?:boolean): box2d.b2Fixture;
                // An alias for setChain.
                setLoop(vertices: number[], firstIndex?:number, count?:number): box2d.b2Fixture;
                // Clears any previously set fixtures. Then creates a new polygon shape and adds it to this Body.
                setPolygon(vertices: number[], firstIndex?: number, count?: number): box2d.b2Fixture;
                // Reads the shape data from a physics data file stored in the Game.Cache and adds it as a polygon to this Body.
                loadPolygon(key: string, object: string, sprite: Phaser.Sprite | Phaser.Image):boolean;


                // Checks if the given point (pixel coords) is contained by any of the fixtures on this body.
                // Not efficient for checking a large number of bodies to find which is under the mouse. (Use
                // Phaser.Physics.Box2D.getBodiesAtPoint for that.)
                containsPoint(point: Phaser.Point): boolean;

                // @property {boolean} static - Returns true if the Body is static. Setting Body.static to 'false' will make it dynamic.
                static: boolean;
                // @property {boolean} dynamic - Returns true if the Body is dynamic. Setting Body.dynamic to 'false' will make it static.
                dynamic: boolean;
                // @property {boolean} kinematic - Returns true if the Body is kinematic. Setting Body.kinematic to 'false' will make it static.
                kinematic: boolean;

                // @property {number} angle - The angle of this Body in degrees.
                angle: number;
                // @property {number} linearDamping - The linear damping acting acting on the body.
                linearDamping: number;
                // @property {number} angularDamping - The angular damping acting acting on the body.
                angularDamping: number;
                // @property {number} angularVelocity - The angular velocity of the body.
                angularVelocity: number;
                // @property {boolean} fixedRotation - If true, the body will not rotate.
                fixedRotation: boolean;
                // @property {number} gravityScale - Set to zero to completely ignore gravity, or negative values to reverse gravity for this body.
                gravityScale: number;
                // @property {number} friction - When setting, all fixtures on the body will be set to the given friction. When getting, the friction of the first fixture will be returned, or zero if no fixtures are present.
                friction: number;
                // @property {number} restitution - When setting, all fixtures on the body will be set to the given restitution. When getting, the restitution of the first fixture will be returned, or zero if no fixtures are present.
                restitution: number;
                // @property {boolean} sensor - When setting, all fixtures on the body will be set to the given sensor status. When getting, the sensor status of the first fixture will be returned, or false if no fixtures are present.
                sensor: boolean;
                // @property {boolean} bullet - Set to true to give the body 'bullet' status, and use continous collision detection when moving it.
                bullet: boolean;
                // @property {number} mass - the new mass for the body. Setting this to zero will cause the body to become a static body.
                mass: number;
                // @property {number} rotation - The angle of this Body in radians.
                rotation: number;
                // @property {number} x - The x coordinate of this Body.
                x: number;
                // @property {number} y - The y coordinate of this Body.
                y: number;
                // @property {boolean} collideWorldBounds - Should the Body collide with the World bounds?
                collideWorldBounds: boolean;
            }


            class WallsObject {
                left: any;
                right: any;
                top: any;
                bottom: any;
            }


            class AABBHit {
                body: Box2D.Body;
                fixture: box2d.b2Fixture;
            }


            class RaycastHit extends AABBHit {
                point: Phaser.Point;
                normal: Phaser.Point;
            }
        }
    }

    class Plugin implements IStateCycle {

        constructor(game: Phaser.Game, parent: Phaser.PluginManager);

        active: boolean;
        game: Phaser.Game;
        hasPostRender: boolean;
        hasPostUpdate: boolean;
        hasPreUpdate: boolean;
        hasRender: boolean;
        hasUpdate: boolean;
        parent: PIXI.DisplayObject;
        visible: boolean;

        destroy(): void;
        postRender(): void;
        preUpdate(): void;
        render(): void;
        update(): void;

    }

    module Plugin {

        class SaveCPU extends Phaser.Plugin {

            renderOnFPS: number;
            renderOnPointerChange: boolean;
            forceRender(): void;
        }

        class AStar extends Phaser.Plugin {

            static VERSION: string;
            static COST_ORTHOGONAL: number;
            static COST_DIAGONAL: number;
            static DISTANCE_MANHATTEN: string;
            static DISTANCE_EUCLIDIAN: string;

            constructor(parent: PIXI.DisplayObject);

            parent: PIXI.DisplayObject;
            version: string;

            findPath(startPoint: Phaser.Point, goalPoint: Phaser.Point): Phaser.Plugin.AStar.AStarPath;
            isWalkable(x: number, y: number): boolean;
            setAStarMap(map: Phaser.Tilemap, layerName: string, tilesetName: string): Phaser.Plugin.AStar;

        }

        module AStar {

            class AStarNode {

                constructor(x: number, y: number, isWalkable: boolean);

                x: number;
                y: number;
                g: number;
                h: number;
                f: number;
                parent: Phaser.Plugin.AStar.AStarNode;
                travelCost: number;
                walkable: boolean;

            }

            class AStarPath {

                constructor(nodes?: {x: number, y: number}[], start?: Phaser.Plugin.AStar.AStarNode, goal?: Phaser.Plugin.AStar.AStarNode);

                nodes: {x: number, y: number}[];
                start: Phaser.Plugin.AStar.AStarNode;
                goal: Phaser.Plugin.AStar.AStarNode;
                visited: Phaser.Plugin.AStar.AStarNode[];

            }

        }

        class ColorHarmony extends Phaser.Plugin {

            getAnalogousHarmony(color: number, threshold?: number): any;
            getComplementHarmony(color: number): number;
            getSplitComplementHarmony(color: number, threshold: number): any;
            getTriadicHarmony(color: number): any;

        }

        class CSS3Filters extends Phaser.Plugin {

            constructor(parent: PIXI.DisplayObject);

            blur: number;
            brightness: number;
            contrast: number;
            grayscale: number;
            hueRotate: number;
            invert: number;
            opacity: number;
            saturate: number;
            sepia: number;

        }

        class TilemapWalker extends Phaser.Plugin {

            constructor(game: Phaser.Game, map: Phaser.Tilemap, layer?: any, x?: number, y?: number);

            collides: boolean;
            game: Phaser.Game;
            history: boolean;
            facing: number;
            map: Phaser.Tilemap;
            location: Phaser.Point;
            locationLayer: number;

            checkTile(x: number, y: number): boolean;
            getTileFromLocation(x: number, y: number): Phaser.Tile;
            getTiles(width: number, height: number, center?: boolean): any[];
            getTileBehind(distance?: number): Phaser.Tile;
            getTileBehindLeft(distance?: number): Phaser.Tile;
            getTileBehindRight(distance?: number): Phaser.Tile;
            getTileAhead(distance?: number): Phaser.Tile;
            getTileAheadLeft(distance?: number): Phaser.Tile;
            getTileAheadRight(distance?: number): Phaser.Tile;
            getTileLeft(distance: number): Phaser.Tile;
            getTileRight(distance: number): Phaser.Tile;
            moveForward(): boolean;
            moveBackward(): boolean;
            moveLeft(): boolean;
            moveRight(): boolean;
            putTile(index: number): void;
            setLocation(x: number, y: number, layer?: any): boolean;
            turnLeft(): void;
            turnRight(): void;
            updateLocation(x: number, y: number): boolean;

        }

        class SamplePlugin extends Phaser.Plugin {

            constructor(game: Phaser.Game, parent: PIXI.DisplayObject);

            addSprite(sprite: Phaser.Sprite): void;
            update(): void;

        }

        class VirtualJoystick extends Phaser.Plugin {

            constructor(game: Phaser.Game, parent: any);

            angle: number;
            base: Phaser.Sprite;
            baseBMD: Phaser.BitmapData;
            baseCircle: Phaser.Circle;
            deltaX: number;
            deltaY: number;
            distance: number;
            force: number;
            isDragging: boolean;
            limit: number;
            limitPoint: Phaser.Point;
            location: Phaser.Point;
            nub: Phaser.Sprite;
            nubBMD: Phaser.BitmapData;
            speed: number;
            x: number;
            y: number;

            init(x: number, y: number, diameter?: number, limit?: number): void;
            move(pointer: Phaser.Pointer, x: number, y: number): void;
            render(): void;
            setVelocity(sprite: Phaser.Sprite, minSpeed?: number, maxSpeed?: number): Phaser.Sprite;
            startDrag(): void;
            stopDrag(nub: Phaser.Sprite, pointer: Phaser.Pointer): void;
            update(): void;

        }



        class Webcam extends Phaser.Plugin {

            constructor(game: Phaser.Game, parent: PIXI.DisplayObject);

            active: boolean;
            context: any;
            stream: any;
            video: HTMLVideoElement;

            connectCallback: (stream: any) => void;
            errorCallback: (e: any) => void;
            grab: (context: any, x: number, y: number) => void;
            start(width: number, height: number, context: any): void;
            stop(): void;
            update(): void;
        }

        class Juicy extends Phaser.Plugin {

            constructor(game: Phaser.Game);

            createScreenFlash(color?: string): Phaser.Plugin.Juicy.ScreenFlash;
            createTrail(length?: number, color?: number): Phaser.Plugin.Juicy.Trail;
            overScale(object: Phaser.Sprite, scale?: number, initialScale?: Phaser.Point): void;
            jelly(object: Phaser.Sprite, strength?: number, delay?: number, initialScale?: Phaser.Point): void;
            mouseStretch(object: Phaser.Sprite, strength?: number, initialScale?: Phaser.Point): void;
            update(): void;
            shake(duration?: number, strength?: number): void;
        }

        module Juicy {

            class Trail {

                constructor(game: Phaser.Game, trailLength?: number, color?: number);

                target: Phaser.Sprite;
                trailLength: number;
                trailWidth: number;
                trailScaling: boolean;
                trailColor: number;

                update(): void;
                addSegment(x: number, y: number): void;
                redrawSegments(offsetX: number, offsetY: number): void;

            }

            class ScreenFlash {

                constructor(game: Phaser.Game, color?: string);

                flash(maxAlpha?: number, duration?: number): void;

            }
        }
    }

    interface PluginConstructorOf<T> {
        new (...parameters: any[]): T;
    }

    class PluginManager implements IStateCycle {

        constructor(game: Phaser.Game);

        game: Phaser.Game;
        plugins: Phaser.Plugin[];

        add<T extends Phaser.Plugin>(plugin: PluginConstructorOf<T>, ...parameters: any[]): T;
        destroy(): void;
        postRender(): void;
        postUpdate(): void;
        preUpdate(): void;
        remove(plugin: Phaser.Plugin, destroy?: boolean): void;
        removeAll(): void;
        render(): void;
        update(): void;

    }

    class Point extends PIXI.Point {

        constructor(x?: number, y?: number);

        x: number;
        y: number;
        type: number;

        static add(a: Phaser.Point, b: Phaser.Point, out?: Phaser.Point): Phaser.Point;
        static subtract(a: Phaser.Point, b: Phaser.Point, out?: Phaser.Point): Phaser.Point;
        static multiply(a: Phaser.Point, b: Phaser.Point, out?: Phaser.Point): Phaser.Point;
        static divide(a: Phaser.Point, b: Phaser.Point, out?: Phaser.Point): Phaser.Point;
        static equals(a: Phaser.Point, b: Phaser.Point): boolean;
        static angle(a: Phaser.Point, b: Phaser.Point): number;
        static angleSq(a: Phaser.Point, b: Phaser.Point): number;
        static negative(a: Phaser.Point, out?: Phaser.Point): Phaser.Point;
        static multiplyAdd(a: Phaser.Point, b: Phaser.Point, scale: number, out?: Phaser.Point): Phaser.Point;
        static interpolate(a: Phaser.Point, b: Phaser.Point, alpha: number, out?: Phaser.Point): Phaser.Point;
        static parse(obj: any, xProp?: string, yProp?: string): Phaser.Point;
        static perp(a: Phaser.Point, out?: Phaser.Point): Phaser.Point;
        static rperp(a: Phaser.Point, out?: Phaser.Point): Phaser.Point;
        static distance(a: any, b: any, round?: boolean): number;
        static project(a: Phaser.Point, b: Phaser.Point, out?: Phaser.Point): Phaser.Point;
        static projectUnit(a: Phaser.Point, b: Phaser.Point, out?: Phaser.Point): Phaser.Point;
        static normalRightHand(a: Phaser.Point, out?: Phaser.Point): Phaser.Point;
        static normalize(a: Phaser.Point, out?: Phaser.Point): Phaser.Point;
        static rotate(a: Phaser.Point, x: number, y: number, angle: number, asDegrees?: boolean, distance?: number): Phaser.Point;
        static centroid(points: Phaser.Point[], out?: Phaser.Point): Phaser.Point;

        add(x: number, y: number): Phaser.Point;
        angle(a: Phaser.Point, asDegrees?: boolean): number;
        angleSq(a: Phaser.Point): number;
        clamp(min: number, max: number): Phaser.Point;
        clampX(min: number, max: number): Phaser.Point;
        clampY(min: number, max: number): Phaser.Point;
        clone(output?: Phaser.Point): Phaser.Point;
        copyFrom(source: Phaser.Point): Phaser.Point;
        copyTo<T>(dest: T): T;
        ceil(): Phaser.Point;
        cross(a: Phaser.Point): number;
        divide(x: number, y: number): Phaser.Point;
        distance(dest: Phaser.Point, round?: boolean): number;
        dot(a: Phaser.Point): number;
        equals(a: Phaser.Point): boolean;
        floor(): Phaser.Point;
        getMagnitude(): number;
        getMagnitudeSq(): number;
        invert(): Phaser.Point;
        isZero(): boolean;
        multiply(x: number, y: number): Phaser.Point;
        normalize(): Phaser.Point;
        normalRightHand(): Phaser.Point;
        perp(): Phaser.Point;
        rperp(): Phaser.Point;
        rotate(x: number, y: number, angle: number, asDegrees?: boolean, distance?: number): Phaser.Point;
        set(x: number, y?: number): Phaser.Point;
        setMagnitude(magnitude: number): Phaser.Point;
        setTo(x: number, y?: number): Phaser.Point;
        subtract(x: number, y: number): Phaser.Point;
        toString(): string;

    }

    class Pointer {

        constructor(game: Phaser.Game, id: number, pointerMode?: number);

        static NO_BUTTON: number;
        static LEFT_BUTTON: number;
        static RIGHT_BUTTON: number;
        static MIDDLE_BUTTON: number;
        static BACK_BUTTON: number;
        static FORWARD_BUTTON: number;
        static ERASER_BUTTON: number;

        active: boolean;
        backButton: Phaser.DeviceButton;
        button: any;
        circle: Phaser.Circle;
        clientX: number;
        clientY: number;
        dirty: boolean;
        duration: number;
        eraserButton: Phaser.DeviceButton;
        exists: boolean;
        forceOut: boolean;
        forwardButton: Phaser.DeviceButton;
        game: Phaser.Game;
        justReleasePreventsOver: boolean | number;
        id: number;
        identifier: number;
        interactiveCandidates: Phaser.InputHandler[];
        isDown: boolean;
        isMouse: boolean;
        isUp: boolean;
        leftButton: Phaser.DeviceButton;
        middleButton: Phaser.DeviceButton;
        movementX: number;
        movementY: number;
        msSinceLastClick: number;
        pageX: number;
        pageY: number;
        pointerId: number;
        pointerMode: number;
        position: Phaser.Point;
        positionDown: Phaser.Point;
        positionUp: Phaser.Point;
        previousTapTime: number;
        rawMovementX: number;
        rawMovementY: number;
        rightButton: Phaser.DeviceButton;
        screenX: number;
        screenY: number;
        target: any;
        targetObject: any;
        timeDown: number;
        timeUp: number;
        totalTouches: number;
        type: number;
        withinGame: boolean;
        worldX: number;
        worldY: number;
        x: number;
        y: number;

        addClickTrampoline(name: string, callback: Function, callbackContext: any, ...callbackArgs: any[]): void;
        justPressed(duration?: number): boolean;
        justReleased(duration?: number): boolean;
        leave(event: any): void;
        move(event: any, fromClick?: boolean): void;
        reset(): void;
        resetButtons(): void;
        resetMovement(): void;
        start(event: any): void;
        stop(event: any): void;
        swapTarget(newTarget: Phaser.InputHandler, silent?: boolean): void;
        update(): void;
        updateButtons(event: MouseEvent): void;

    }

    class Polygon {

        constructor(points: Phaser.Point[] | number[]);
        constructor(...points: Phaser.Point[]);
        constructor(...points: number[]);

        area: number;
        flattened: boolean;
        points: number[] | Phaser.Point[];
        type: number;

        clone(output: Phaser.Polygon): Phaser.Polygon;
        contains(x: number, y: number): boolean;
        flatten(): Phaser.Polygon;
        setTo(points: Phaser.Point[] | number[]): void;
        setTo(...points: Phaser.Point[]): void;
        setTo(...points: number[]): void;
        toNumberArray(output?: number[]): number[];

    }

    class QuadTree {

        constructor(x: number, y: number, width: number, height: number, maxObject?: number, maxLevels?: number, level?: number);

        bounds: {
            x: number;
            y: number;
            width: number;
            height: number;
            subWidth: number;
            subHeight: number;
            right: number;
            bottom: number;
        };
        level: number;
        maxObjects: number;
        maxLevels: number;
        objects: any[];
        nodes: any[];

        clear(): void;
        getIndex(rect: any): number;
        insert(body: any): void;
        populate(group: Phaser.Group): void;
        populateHandler(sprite: Phaser.Sprite): void;
        reset(x: number, y: number, width: number, height: number, maxObject?: number, maxLevels?: number, level?: number): void;
        retrieve(source: any): any[];
        split(): void;

    }

    class RandomDataGenerator {

        constructor(seeds?: any[] | string);

        angle(): number;
        between(min: number, max: number): number;
        frac(): number;
        integer(): number;
        integerInRange(min: number, max: number): number;
        normal(): number;
        pick<T>(ary: T[]): T;
        real(): number;
        realInRange(min: number, max: number): number;
        sign(): number;
        sow(seeds: any[]): void;
        state(state?: string): string;
        timestamp(min: number, max: number): number;
        uuid(): string;
        weightedPick<T>(ary: T[]): T;

    }

    class Rectangle {

        constructor(x: number, y: number, width: number, height: number);

        bottom: number;
        bottomRight: Phaser.Point;
        bottomLeft: Phaser.Point;
        centerX: number;
        centerY: number;
        empty: boolean;
        halfHeight: number;
        halfWidth: number;
        height: number;
        left: number;
        perimeter: number;
        randomX: number;
        randomY: number;
        right: number;
        top: number;
        topLeft: Phaser.Point;
        topRight: Phaser.Point;
        type: number;
        volume: number;
        width: number;
        x: number;
        y: number;

        static aabb(points: Phaser.Point[], out?: Phaser.Rectangle): Phaser.Rectangle;
        static clone(a: Phaser.Rectangle, output?: Phaser.Rectangle): Phaser.Rectangle;
        static contains(a: Phaser.Rectangle, x: number, y: number): boolean;
        static containsPoint(a: Phaser.Rectangle, point: Phaser.Point): boolean;
        static containsRaw(rx: number, ry: number, rw: number, rh: number, x: number, y: number): boolean;
        static containsRect(a: Phaser.Rectangle, b: Phaser.Rectangle): boolean;
        static equals(a: Phaser.Rectangle, b: Phaser.Rectangle): boolean;
        static inflate(a: Phaser.Rectangle, dx: number, dy: number): Phaser.Rectangle;
        static inflatePoint(a: Phaser.Rectangle, point: Phaser.Point): Phaser.Rectangle;
        static intersection(a: Phaser.Rectangle, b: Phaser.Rectangle, out?: Phaser.Rectangle): Phaser.Rectangle;
        static intersects(a: Phaser.Rectangle, b: Phaser.Rectangle): boolean;
        static intersectsRaw(left: number, right: number, top: number, bottom: number, tolerance: number): boolean;
        static size(a: Phaser.Rectangle, output?: Phaser.Point): Phaser.Point;
        static union(a: Phaser.Rectangle, b: Phaser.Rectangle, out?: Phaser.Rectangle): Phaser.Rectangle;

        ceil(): void;
        ceilAll(): void;
        centerOn(x: number, y: number): Phaser.Rectangle;
        clone(output: Phaser.Rectangle): Phaser.Rectangle;
        contains(x: number, y: number): boolean;
        containsRect(b: Phaser.Rectangle): boolean;
        copyFrom(source: any): Phaser.Rectangle;
        copyTo(dest: any): any;
        equals(b: Phaser.Rectangle): boolean;
        floor(): void;
        floorAll(): void;
        getPoint(position: number, out: Phaser.Point): Phaser.Point;
        inflate(dx: number, dy: number): Phaser.Rectangle;
        intersection(b: Phaser.Rectangle, out: Phaser.Rectangle): Phaser.Rectangle;
        intersects(b: Phaser.Rectangle, tolerance: number): boolean;
        intersectsRaw(left: number, right: number, top: number, bottom: number, tolerance: number): boolean;
        offset(dx: number, dy: number): Phaser.Rectangle;
        offsetPoint(point: Phaser.Point): Phaser.Rectangle;
        random(out?: Phaser.Point): Phaser.Point;
        resize(width: number, height: number): Phaser.Rectangle;
        setTo(x: number, y: number, width: number, height: number): Phaser.Rectangle;
        scale(x: number, y?: number): Phaser.Rectangle;
        size(output?: Phaser.Point): Phaser.Point;
        toString(): string;
        union(b: Phaser.Rectangle, out?: Phaser.Rectangle): Phaser.Rectangle;

    }

    class RenderTexture extends PIXI.RenderTexture {

        constructor(game: Phaser.Game, width?: number, height?: number, key?: string, scaleMode?: number, resolution?: number);

        crop: PIXI.Rectangle;
        game: Phaser.Game;
        key: string;
        type: number;

        render(displayObject: PIXI.DisplayObject, matrix?: Phaser.Matrix, clear?: boolean): void;
        renderXY(displayObject: PIXI.DisplayObject, x: number, y: number, clear?: boolean): void;
        renderRawXY(displayObject: PIXI.DisplayObject, x: number, y: number, clear?: boolean): void;

    }

    class RequestAnimationFrame {

        constructor(game: Phaser.Game, forceSetTimeOut?: boolean);

        forceSetTimeOut: boolean;
        game: Phaser.Game;
        isRunning: boolean;

        isRAF(): boolean;
        isSetTimeOut(): boolean;
        start(): boolean;
        stop(): void;
        updateRAF(rafTime: number): void;
        updateSetTimeout(time: number): void;

    }

    class RetroFont extends Phaser.RenderTexture {

        constructor(game: Phaser.Game, key: string, characterWidth: number, characterHeight: number, chars: string, charsPerRow?: number, xSpacing?: number, ySpacing?: number, xOffset?: number, yOffset?: number);

        static ALIGN_CENTER: string;
        static ALIGN_LEFT: string;
        static ALIGN_RIGHT: string;
        static TEXT_SET1: string;
        static TEXT_SET2: string;
        static TEXT_SET3: string;
        static TEXT_SET4: string;
        static TEXT_SET5: string;
        static TEXT_SET6: string;
        static TEXT_SET7: string;
        static TEXT_SET8: string;
        static TEXT_SET9: string;
        static TEXT_SET10: string;
        static TEXT_SET11: string;

        align: string;
        autoUpperCase: boolean;
        characterHeight: number;
        characterPerRow: number;
        characterSpacingX: number;
        characterSpacingY: number;
        characterWidth: number;
        customSpacingX: number;
        customSpacingY: number;
        fixedWidth: number;
        fontSet: Image;
        frameData: Phaser.FrameData;
        multiLine: boolean;
        offsetX: number;
        offsetY: number;
        smoothed: boolean;
        stamp: Phaser.Image;
        text: string;

        buildRetroFontText(): void;
        getLongestLine(): number;
        pasteLine(line: string, x: number, y: number, customSpacingX: number): void;
        removeUnsupportedCharacters(stripCR?: boolean): string;
        setFixedWidth(width: number, lineAlignment?: string): void;
        setText(content: string, multiLine?: boolean, characterSpacing?: number, lineSpacing?: number, lineAlignment?: string, allowLowerCase?: boolean): void;
        updateOffset(x?: number, y?: number): void;

    }

    class Rope extends PIXI.Rope {

        constructor(game: Phaser.Game, x: number, y: number, key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture | Phaser.Video, frame?: string | number, points?: Phaser.Point[]);

        angle: number;
        animations: Phaser.AnimationManager;
        alive: boolean;
        autoCull: boolean;
        body: Phaser.Physics.Arcade.Body | Phaser.Physics.P2.Body | Phaser.Physics.Ninja.Body | any;
        bottom: number;
        cameraOffset: Phaser.Point;
        checkWorldBounds: boolean;
        cropRect: Phaser.Rectangle;
        components: any;
        customRender: boolean;
        debug: boolean;
        deltaX: number;
        deltaY: number;
        deltaZ: number;
        destroyPhase: boolean;
        exists: boolean;
        events: Phaser.Events;
        fixedToCamera: boolean;
        frame: string | number;
        frameName: string;
        fresh: boolean;
        game: Phaser.Game;
        inCamera: boolean;
        input: Phaser.InputHandler;
        inputEnabled: boolean;
        inWorld: boolean;
        left: number;
        lifespan: number;
        key: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture | Phaser.Video;
        name: string;
        offsetX: number;
        offsetY: number;
        outOfBoundsKill: boolean;
        overlap(displayObject: Phaser.Sprite | Phaser.Image | Phaser.TileSprite | Phaser.Button | PIXI.DisplayObject): boolean;
        pendingDestroy: boolean;
        points: Phaser.Point[];
        position: Phaser.Point;
        previousPosition: Phaser.Point;
        previousRotation: number;
        right: number;
        renderOrderID: number;
        segments: Phaser.Rectangle[];
        smoothed: boolean;
        top: number;
        type: number;
        transformCallback: Function;
        transformCallbackContext: any;
        scaleMin: Phaser.Point;
        scaleMax: Phaser.Point;
        updateAnimation: Function;
        world: Phaser.Point;
        x: number;
        y: number;
        z: number;

        bringToTop(): Phaser.Rope;
        checkTransform(wt: PIXI.Matrix): void;
        crop(rect: Phaser.Rectangle, copy?: boolean): void;
        destroy(destroyChildren?: boolean): void;
        kill(): Phaser.Rope;
        loadTexture(key: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture, frame?: string | number, stopAnimation?: boolean): void;
        moveUp(): Phaser.Rope;
        moveDown(): Phaser.Rope;
        play(name: string, frameRate?: number, loop?: boolean, killOnComplete?: boolean): Phaser.Animation;
        preUpdate(): void;
        postUpdate(): void;
        reset(x: number, y: number, health?: number): Phaser.Rope;
        resizeFrame(parent: any, width: number, height: number): void;
        resetFrame(): void;
        revive(health?: number): Phaser.Rope;
        sendToBack(): Phaser.Rope;
        setFrame(frame: Phaser.Frame): void;
        setScaleMinMax(minX?: number, minY?: number, maxX?: number, maxY?: number): void;
        updateCrop(): void;
        update(): void;

    }

    class RoundedRectangle extends PIXI.RoundedRectangle {

        x: number;
        y: number;
        width: number;
        height: number;
        radius: number;
        type: number;

        clone(): RoundedRectangle;
        contains(x: number, y: number): boolean;

    }

    class Signal {

        active: boolean;
        boundDispatch: Function;
        memorize: boolean;

        add(listener: Function, listenerContext?: any, priority?: number, ...args: any[]): Phaser.SignalBinding;
        addOnce(listener: Function, listenerContext?: any, priority?: number, ...args: any[]): Phaser.SignalBinding;
        dispatch(...params: any[]): void;
        dispose(): void;
        forget(): void;
        getNumListeners(): number;
        halt(): void;
        has(listener: Function, context?: any): boolean;
        remove(listener: Function, context?: any): Function;
        removeAll(context?: any): void;
        toString(): string;
        validateListener(listener: Function, fnName: string): void;

    }

    class SignalBinding {

        constructor(signal: Phaser.Signal, listener: Function, isOnce: boolean, listenerContext?: any, priority?: number, ...args: any[]);

        active: boolean;
        callCount: number;
        context: any;
        params: any[];

        execute(paramsArr?: any[]): void;
        detach(): Function;
        isBound(): boolean;
        isOnce(): boolean;
        getListener(): Function;
        getSignal(): Phaser.Signal;
        toString(): string;

    }

    class SinglePad {

        constructor(game: Phaser.Game, padParent: any);

        callbackContext: any;
        connected: boolean;
        deadZone: number;
        game: Phaser.Game;
        index: number;
        onAxisCallback: Function;
        onConnectCallback: Function;
        onDisconnectCallback: Function;
        onDownCallback: Function;
        onFloatCallback: Function;
        onUpCallback: Function;

        axis(axisCode: number): number;
        addCallbacks(context: any, callbacks: any): void;
        buttonValue(buttonCode: number): number;
        connect(rawPad: any): void;
        destroy(): void;
        disconnect(): void;
        getButton(buttonCode: number): Phaser.DeviceButton;
        isDown(buttonCode: number): boolean;
        isUp(buttonCode: number): boolean;
        justPressed(buttonCode: number, duration?: number): boolean;
        justReleased(buttonCode: number, duration?: number): boolean;
        pollStatus(): void;
        processAxisChange(axisState: any): void;
        processButtonDown(buttonCode: number, value: any): void;
        processButtonFloat(buttonCode: number, value: any): void;
        processButtonUp(buttonCode: number, value: any): void;
        reset(): void;

    }

    class Sound {

        constructor(game: Phaser.Game, key: string, volume?: number, loop?: boolean, connect?: boolean);

        autoplay: boolean;
        allowMultiple: boolean;
        context: any;
        currentMarker: string;
        currentTime: number;
        destroy(remove?: boolean): void;
        duration: number;
        durationMS: number;
        externalNode: any;
        fadeTween: Phaser.Tween;
        game: Phaser.Game;
        gainNode: any;
        isDecoded: boolean;
        isDecoding: boolean;
        isPlaying: boolean;
        key: string;
        loop: boolean;
        markers: any;
        masterGainNode: any;
        mute: boolean;
        name: string;
        onDecoded: Phaser.Signal;
        onEndedHandler: () => void;
        onFadeComplete: Phaser.Signal;
        onLoop: Phaser.Signal;
        onMarkerComplete: Phaser.Signal;
        onMute: Phaser.Signal;
        onPause: Phaser.Signal;
        onPlay: Phaser.Signal;
        onResume: Phaser.Signal;
        onStop: Phaser.Signal;
        override: boolean;
        paused: boolean;
        pausedPosition: number;
        pausedTime: number;
        pendingPlayback: boolean;
        position: number;
        startTime: number;
        stopTime: number;
        totalDuration: number;
        usingAudioTag: boolean;
        usingWebAudio: boolean;
        volume: number;

        addMarker(name: string, start: number, duration: number, volume?: number, loop?: boolean): void;
        destroy(): void;
        fadeIn(duration?: number, loop?: boolean, marker?: string): void;
        fadeOut(duration?: number): void;
        fadeTo(duration?: number, volume?: number): void;
        loopFull(volume?: number): Phaser.Sound;
        pause(): void;
        play(marker?: string, position?: number, volume?: number, loop?: boolean, forceRestart?: boolean): Phaser.Sound;
        removeMarker(name: string): void;
        restart(marker: string, position: number, volume?: number, loop?: boolean): void;
        resume(): void;
        soundHasUnlocked(key: string): void;
        stop(): void;
        update(): void;

    }

    class SoundManager {

        constructor(game: Phaser.Game);

        channels: number;
        connectToMaster: boolean;
        context: any;
        game: Phaser.Game;
        mute: boolean;
        muteOnPause: boolean;
        noAudio: boolean;
        onSoundDecode: Phaser.Signal;
        onVolumeChange: Phaser.Signal;
        onMute: Phaser.Signal;
        onUnMute: Phaser.Signal;
        touchLocked: boolean;
        usingAudioTag: boolean;
        usingWebAudio: boolean;
        volume: number;

        add(key: string, volume?: number, loop?: boolean, connect?: boolean): Phaser.Sound;
        addSprite(key: string): Phaser.AudioSprite;
        boot(): void;
        decode(key: string, sound?: Phaser.Sound): void;
        destroy(): void;
        pauseAll(): void;
        play(key: string, volume?: number, loop?: boolean): Phaser.Sound;
        remove(sound: Phaser.Sound): boolean;
        removeByKey(key: string): number;
        resumeAll(): void;
        setDecodedCallback(files: string[] | Phaser.Sound[], callback: Function, callbackContext: any): void;
        setTouchLock(): void;
        stopAll(): void;
        unlock(): boolean;
        update(): void;

    }

    class Sprite extends PIXI.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number);

        alive: boolean;
        anchor: Phaser.Point;
        angle: number;
        animations: Phaser.AnimationManager;
        autoCull: boolean;
        body: Phaser.Physics.Arcade.Body | Phaser.Physics.P2.Body | Phaser.Physics.Ninja.Body | any;
        bottom: number;
        cameraOffset: Phaser.Point;
        centerX: number;
        centerY: number;
        checkWorldBounds: boolean;
        components: any;
        cropRect: Phaser.Rectangle;
        customRender: boolean;
        data: any;
        debug: boolean;
        deltaX: number;
        deltaY: number;
        deltaZ: number;
        destroyPhase: boolean;
        events: Phaser.Events;
        exists: boolean;
        fixedToCamera: boolean;
        frame: string | number;
        frameName: string;
        fresh: boolean;
        game: Phaser.Game;
        health: number;
        inCamera: boolean;
        input: Phaser.InputHandler;
        inputEnabled: boolean;
        inWorld: boolean;
        key: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture;
        left: number;
        lifespan: number;
        maxHealth: number;
        name: string;
        offsetX: number;
        offsetY: number;
        outOfBoundsKill: boolean;
        pendingDestroy: boolean;
        previousPosition: Phaser.Point;
        previousRotation: number;
        position: Phaser.Point;
        physicsEnabled: boolean;
        physicsType: number;
        renderOrderID: number;
        right: number;
        scale: Phaser.Point;
        scaleMin: Phaser.Point;
        scaleMax: Phaser.Point;
        smoothed: boolean;
        top: number;
        type: number;
        tintedTexture: HTMLCanvasElement;
        transformCallback: Function;
        transformCallbackContext: any;
        world: Phaser.Point;
        x: number;
        y: number;
        z: number;

        alignIn(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): any;
        alignTo(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): any;
        bringToTop(): Phaser.Sprite;
        crop(rect: Phaser.Rectangle, copy: boolean): void;
        checkTransform(wt: PIXI.Matrix): void;
        damage(amount: number): Phaser.Sprite;
        destroy(destroyChildren?: boolean): void;
        drawPolygon(): void;
        heal(amount: number): Phaser.Sprite;
        kill(): Phaser.Sprite;
        loadTexture(key: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture, frame?: string | number, stopAnimation?: boolean): void;
        moveUp(): Phaser.Sprite;
        moveDown(): Phaser.Sprite;
        overlap(displayObject: Phaser.Sprite | Phaser.Image | Phaser.TileSprite | Phaser.Button | PIXI.DisplayObject): boolean;
        play(name: string, frameRate?: number, loop?: boolean, killOnComplete?: boolean): Phaser.Animation;
        postUpdate(): void;
        preUpdate(): void;
        reset(x: number, y: number, health?: number): Phaser.Sprite;
        resetFrame(): void;
        resizeFrame(parent: any, width: number, height: number): void;
        revive(health?: number): Phaser.Sprite;
        sendToBack(): Phaser.Sprite;
        setFrame(frame: Phaser.Frame): void;
        setScaleMinMax(minX?: number, minY?: number, maxX?: number, maxY?: number): void;
        update(): void;
        updateCrop(): void;

    }

    class SpriteBatch extends Phaser.Group {

        constructor(game: Phaser.Game, parent: PIXI.DisplayObjectContainer, name?: string, addedToStage?: boolean);

        type: number;

    }

    class Stage extends PIXI.DisplayObjectContainer {

        constructor(game: Phaser.Game);

        game: Phaser.Game;
        name: string;
        disableVisibilityChange: boolean;
        exists: boolean;
        currentRenderOrderID: number;
        backgroundColor: any;
        smoothed: boolean;

        parseConfig(config: any): void;
        preUpdate(): void;
        update(): void;
        postUpdate(): void;
        updateTransform(): void;
        checkVisibility(): void;
        visibilityChange(event: Event): void;
        setBackgroundColor(backgroundColor: number | string): void;
        destroy(): void;

    }

    interface ResizeCallback {
        (scale: ScaleManager, parentBounds: Rectangle): any;
    }

    class ScaleManager {

        constructor(game: Phaser.Game, width: number | string, height: number | string);

        static EXACT_FIT: number;
        static NO_SCALE: number;
        static SHOW_ALL: number;
        static RESIZE: number;
        static USER_SCALE: number;

        aspectRatio: number;
        bounds: Rectangle;
        boundingParent: HTMLElement;
        compatibility: {
            canExpandParent: boolean;
            clickTrampoline: string;
            forceMinimumDocumentHeight: boolean;
            noMargins: boolean;
            orientationFallback: boolean;
            scrollTo: Point;
            supportsFullScreen: boolean;
        };
        currentScaleMode: number;
        dom: Phaser.DOM;
        enterIncorrectOrientation: Signal;
        event: any;
        forceLandscape: boolean;
        forcePortrait: boolean;
        fullScreenScaleMode: number;
        fullScreenTarget: HTMLElement;
        game: Phaser.Game;
        grid: Phaser.FlexGrid;
        hasPhaserSetFullScreen: boolean;
        height: number;
        incorrectOrientation: boolean;
        isFullScreen: boolean;
        isGameLandscape: boolean;
        isGamePortrait: boolean;
        isPortrait: boolean;
        isLandscape: boolean;
        leaveIncorrectOrientation: Signal;
        margin: { left: number; top: number; right: number; bottom: number; x: number; y: number; };
        maxHeight: number;
        maxWidth: number;
        minHeight: number;
        minWidth: number;
        offset: Point;
        onFullScreenInit: Phaser.Signal;
        onFullScreenChange: Phaser.Signal;
        onFullScreenError: Phaser.Signal;
        onOrientationChange: Phaser.Signal;
        onSizeChange: Signal;
        pageAlignHorizontally: boolean;
        pageAlignVertically: boolean;
        parentNode: HTMLElement;
        parentIsWindow: boolean;
        parentScaleFactor: Point;
        scaleFactor: Point;
        scaleFactorInversed: Point;
        scaleMode: number;
        screenOrientation: string;
        sourceAspectRatio: number;
        trackParentInterval: number;
        width: number;
        windowConstraints: {
            bottom: string;
            right: string;
        };

        boot(): void;
        createFullScreenTarget(): HTMLDivElement;
        destroy(): void;
        forceOrientation(forceLandscape: boolean, forcePortrait?: boolean): void;
        getParentBounds(target?: Rectangle): Rectangle;
        parseConfig(config: any): void;
        preUpdate(): void;
        pauseUpdate(): void;
        refresh(): void;
        setGameSize(width: number, height: number): void;
        setResizeCallback(callback: ResizeCallback, context: any): void;
        setUserScale(hScale: number, vScale: number, hTrim?: number, vTrim?: number): void;
        setMinMax(minWidth: number, minHeight: number, maxWidth?: number, maxHeight?: number): void;
        setupScale(width: number, height: number): void;
        setupScale(width: string, height: string): void;
        scaleSprite(sprite: Sprite, width?: number, height?: number, letterBox?: boolean): Sprite;
        scaleSprite(sprite: Image, width?: number, height?: number, letterBox?: boolean): Sprite;
        startFullScreen(antialias?: boolean, allowTrampoline?: boolean): boolean;
        stopFullScreen(): boolean;

    }

    class DOM {

        static visualBounds: Phaser.Rectangle;
        static layoutBounds: Phaser.Rectangle;
        static documentBounds: Phaser.Rectangle;

        static calibrate(coords: any, cushion?: number): any;
        static getAspectRatio(object: any): number;
        static getScreenOrientation(primaryFallback?: string): string;
        static getBounds(element: any, cushion?: number): any;
        static getOffset(element: any, point?: Point): Point;
        static inLayoutViewport(element: any, cushion?: number): boolean;
    }

    class State {

        add: Phaser.GameObjectFactory;
        cache: Phaser.Cache;
        camera: Phaser.Camera;
        game: Phaser.Game;
        input: Phaser.Input;
        key: string;
        load: Phaser.Loader;
        make: Phaser.GameObjectCreator;
        particles: Phaser.Particles;
        physics: Phaser.Physics;
        rnd: Phaser.RandomDataGenerator;
        scale: Phaser.ScaleManager;
        sound: Phaser.SoundManager;
        stage: Phaser.Stage;
        state: Phaser.StateManager;
        time: Phaser.Time;
        tweens: Phaser.TweenManager;
        world: Phaser.World;

        create(): void;
        init(...args: any[]): void;
        loadRender(): void;
        loadUpdate(): void;
        paused(): void;
        pauseUpdate(): void;
        preload(): void;
        preRender(): void;
        render(): void;
        resize(): void;
        resumed(): void;
        shutdown(): void;
        update(): void;

    }

    interface IStateCycle {

        preUpdate(): void;
        update(): void;
        render(): void;
        postRender(): void;
        destroy(): void;
    }

    class StateManager {

        constructor(game: Phaser.Game, pendingState?: Phaser.State);

        created: boolean;
        current: string;
        game: Phaser.Game;
        onCreateCallback: Function;
        onInitCallback: Function;
        onLoadRenderCallback: Function;
        onLoadUpdateCallback: Function;
        onPausedCallback: Function;
        onPauseUpdateCallback: Function;
        onPreloadCallback: Function;
        onPreRenderCallback: Function;
        onRenderCallback: Function;
        onResumedCallback: Function;
        onResizeCallback: Function;
        onShutDownCallback: Function;
        onUpdateCallback: Function;
        states: any;

        onStateChange: Phaser.Signal;
        add(key: string, state: any, autoStart?: boolean): void;
        checkState(key: string): boolean;
        clearCurrentState(): void;
        destroy(): void;
        getCurrentState(): Phaser.State;
        link(key: string): void;
        loadComplete(): void;
        preRender(elapsedTime: number): void;
        preUpdate(): void;
        render(): void;
        remove(key: string): void;
        resume(): void;
        restart(clearWorld?: boolean, clearCache?: boolean, ...args: any[]): void;
        resize(width: number, height: number): void;
        start(key: string, clearWorld?: boolean, clearCache?: boolean, ...args: any[]): void;
        update(): void;
        unlink(key: string): void;

    }

    interface PhaserTextStyle {

        font?: string;
        fill?: any;
        align?: string;
        stroke?: string;
        strokeThickness?: number;
        wordWrap?: boolean;
        wordWrapWidth?: number;
        maxLines?: number;
        shadowOffsetX?: number;
        shadowOffsetY?: number;
        shadowColor?: string;
        shadowBlur?: number;
        valign?: string;
        tab?: number;
        tabs?: number;

        fontSize?: number;
        fontStyle?: string;
        fontVariant?: string;
        fontWeight?: string | number;
        backgroundColor?: string;
        boundsAlignH?: string;
        boundsAlignV?: string;

    }

    class Text extends Phaser.Sprite {

        constructor(game: Phaser.Game, x: number, y: number, text: string, style?: PhaserTextStyle);

        static fontPropertiesCanvas: any;
        static fontPropertiesContext: any;
        static fontPropertiesCache: any;

        align: string;
        angle: number;
        autoRound: boolean;
        boundsAlignH: string;
        boundsAlignV: string;
        cameraOffset: Phaser.Point;
        canvas: HTMLCanvasElement;
        colors: string[];
        context: CanvasRenderingContext2D;
        cssFont: string;
        destroyPhase: boolean;
        events: Phaser.Events;
        exists: boolean;
        fill: any;
        fixedToCamera: boolean;
        font: string;
        fontSize: number | string;
        fontStyle: string;
        fontStyles: string[];
        fontVariant: string;
        fontWeight: string | number;
        fontWeights: (string | number)[];
        game: Phaser.Game;
        input: Phaser.InputHandler;
        inputEnabled: boolean;
        lineSpacing: number;
        name: string;
        padding: Phaser.Point;
        pendingDestroy: boolean;
        physicsType: number;
        position: Phaser.Point;
        previousPosition: Phaser.Point;
        previousRotation: number;
        renderOrderID: number;
        resolution: number;
        shadowBlur: number;
        shadowColor: string;
        shadowFill: boolean;
        shadowOffsetX: number;
        shadowOffsetY: number;
        shadowStroke: boolean;
        splitRegExp: any;
        stroke: string;
        strokeColors: string[];
        strokeThickness: number;
        scale: Phaser.Point;
        tab: number;
        tabs: number | number[];
        text: string;
        textBounds: Phaser.Rectangle;
        type: number;
        useAdvancedWrap: boolean;
        world: Phaser.Point;
        wordWrap: boolean;
        wordWrapWidth: number;
        z: number;

        addColor(color: string, position: number): Phaser.Text;
        addFontStyle(style: string, position: number): Phaser.Text;
        addFontWeight(weight: string, position: number): Phaser.Text;
        addStrokeColor(color: string, position: number): Phaser.Text;
        alignIn(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): any;
        alignTo(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): any;
        clearColors(): Phaser.Text;
        clearFontValues(): Phaser.Text;
        componentsToFont(components: any): string;
        destroy(destroyChildren?: boolean): void;
        fontToComponents(font: string): any;
        postUpdate(): void;
        parseList(list: any[]): Phaser.Text;
        precalculateWordWrap(text: string): string[];
        preUpdate(): void;
        renderTabLine(line: string, x: number, y: number, fill?: boolean): void;
        setShadow(x?: number, y?: number, color?: any, blur?: number, shadowStroke?: boolean, shadowFill?: boolean): Phaser.Text;
        setStyle(style?: PhaserTextStyle, update?: boolean): Phaser.Text;
        setText(text: string, immediate?: boolean): Phaser.Text;
        setTextBounds(x?: number, y?: number, width?: number, height?: number): Phaser.Text;
        update(): void;
        updateFont(components: any): void;
        updateLine(text: string, x?: number, y?: number): void;
        updateShadow(state?: boolean): void;
        updateTexture(): void;

    }

    class Tile {

        constructor(layer: any, index: number, x: number, y: Number, width: number, height: number);

        alpha: number;
        bottom: number;
        callback: Function;
        callbackContext: any;
        centerX: number;
        centerY: number;
        canCollide: boolean;
        collideDown: boolean;
        collideLeft: boolean;
        collideNone: boolean;
        collideRight: boolean;
        collisionCallback: Function;
        collisionCallbackContext: any;
        collides: boolean;
        collideUp: boolean;
        faceBottom: boolean;
        faceLeft: boolean;
        faceRight: boolean;
        faceTop: boolean;
        game: Phaser.Game;
        height: number;
        index: number;
        layer: any;
        left: number;
        properties: any;
        right: number;
        scanned: boolean;
        top: number;
        width: number;
        worldX: number;
        worldY: number;
        x: number;
        y: number;

        copy(tile: Phaser.Tile): Phaser.Tile;
        containsPoint(x: number, y: number): boolean;
        destroy(): void;
        intersects(x: number, y: number, right: number, bottom: number): boolean;
        isInterested(collides: boolean, faces: boolean): boolean;
        resetCollision(): void;
        setCollision(left: boolean, right: boolean, up: boolean, down: boolean): void;
        setCollisionCallback(callback: Function, context: any): void;

    }

    class Tilemap {

        constructor(game: Phaser.Game, key?: string, tileWidth?: number, tileHeight?: number, width?: number, height?: number);

        static CSV: number;
        static TILED_JSON: number;
        static NORTH: number;
        static EAST: number;
        static SOUTH: number;
        static WEST: number;

        collision: any[];
        collideIndexes: any[];
        currentLayer: number;
        debugMap: any[];
        enableDebug: boolean;
        format: number;
        game: Phaser.Game;
        height: number;
        heightInPixels: number;
        images: any[];
        imagecollections: ImageCollection[];
        key: string;
        layer: Phaser.TilemapLayer[];
        layers: any[];
        objects: any[];
        orientation: string;
        properties: any;
        rayStepRate: number;
        tileHeight: number;
        tiles: Phaser.Tile[];
        tilesets: Phaser.Tileset[];
        tileWidth: number;
        version: number;
        width: number;
        widthInPixels: number;

        addTilesetImage(tileset: string, key?: string | Phaser.BitmapData, tileWidth?: number, tileHeight?: number, tileMargin?: number, tileSpacing?: number, gid?: number): Phaser.Tileset;
        calculateFaces(layer: number): void;
        copy(x: number, y: number, width: number, height: number, layer?: any): Phaser.Tile[];
        create(name: string, width: number, height: number, tileWidth: number, tileHeight: number, group?: Phaser.Group): Phaser.TilemapLayer;
        createBlankLayer(name: string, width: number, height: number, tileWidth: number, tileHeight: number, group?: Phaser.Group): Phaser.TilemapLayer;
        createFromObjects(name: string, gid: number, key: string, frame?: any, exists?: boolean, autoCull?: boolean, group?: Phaser.Group, CustomClass?: any, adjustY?: boolean): void;
        createFromTiles(tiles: any, replacements: any, key: string, layer?: any, group?: Phaser.Group, properties?: any): number;
        createLayer(layer: any, width?: number, height?: number, group?: Phaser.Group): Phaser.TilemapLayer;
        destroy(): void;
        dump(): void;
        fill(index: number, x: number, y: number, width: number, height: number, layer?: any): void;
        forEach(callback: Function, context: any, x: number, y: Number, width: number, height: number, layer?: any): void;
        getImageIndex(name: string): number;
        getIndex(location: any[], name: string): number;
        getLayer(layer: any): number;
        getLayerIndex(name: string): number;
        getObjectIndex(name: string): number;
        getTile(x: number, y: number, layer?: any, nonNull?: boolean): Phaser.Tile;
        getTileAbove(layer: number, x: number, y: number): Phaser.Tile;
        getTileBelow(layer: number, x: number, y: number): Phaser.Tile;
        getTileLeft(layer: number, x: number, y: number): Phaser.Tile;
        getTileRight(layer: number, x: number, y: number): Phaser.Tile;
        getTilesetIndex(name: string): number;
        getTileWorldXY(x: number, y: number, tileWidth?: number, tileHeight?: number, layer?: number | string | Phaser.TilemapLayer, nonNull?: boolean): Phaser.Tile;
        hasTile(x: number, y: number, layer: Phaser.TilemapLayer): boolean;
        paste(x: number, y: number, tileblock: Phaser.Tile[], layer?: any): void;
        putTile(tile: any, x: number, y: number, layer?: any): Phaser.Tile;
        putTileWorldXY(tile: any, x: number, y: number, tileWidth: number, tileHeight: number, layer?: any): void;
        random(x: number, y: number, width: number, height: number, layer?: any): void;
        removeAllLayers(): void;
        removeTile(x: number, y: number, layer?: any): Phaser.Tile;
        removeTileWorldXY(x: number, y: number, tileWidth: number, tileHeight: number, layer?: any): Phaser.Tile;
        replace(source: number, dest: number, x: number, y: number, width: number, height: number, layer?: any): void;
        searchTileIndex(index: number, skip?: number, reverse?: boolean, layer?: any): Phaser.Tile;
        setCollision(indexes: any, collides?: boolean, layer?: any, recalculate?: boolean): void;
        setCollisionBetween(start: number, stop: number, collides?: boolean, layer?: any, recalculate?: boolean): void;
        setCollisionByExclusion(indexes: any[], collides?: boolean, layer?: any, recalculate?: boolean): void;
        setCollisionByIndex(index: number, collides?: boolean, layer?: number, recalculate?: boolean): void;
        setLayer(layer: any): void;
        setPreventRecalculate(value: boolean): void;
        setTileIndexCallback(indexes: any, callback: Function, callbackContext: any, layer?: any): void;
        setTileLocationCallback(x: number, y: number, width: number, height: number, callback: Function, callbackContext: any, layer?: any): void;
        setTileSize(tileWidth: number, tileHeight: number): void;
        shuffle(x: number, y: number, width: number, height: number, layer: any): void;
        swap(tileA: number, tileB: number, x: number, y: number, width: number, height: number, layer?: any): void;

    }

    class TilemapLayer extends Phaser.Sprite {

        constructor(game: Phaser.Game, tilemap: Phaser.Tilemap, index: number, width?: number, height?: number);

        cameraOffset: Phaser.Point;
        canvas: HTMLCanvasElement;
        collisionHeight: number;
        collisionWidth: number;
        context: CanvasRenderingContext2D;
        data: any;
        debug: boolean;
        debugAlpha: number;
        debugCallbackColor: string;
        debugColor: string;
        debugSettings: { missingImageFill: string; debuggedTileOverfill: string; forceFullRedraw: boolean; debugAlpha: number; facingEdgeStroke: string; collidingTileOverfill: string; };
        dirty: boolean;
        exists: boolean;
        fixedToCamera: boolean;
        game: Phaser.Game;
        index: number;
        layer: Phaser.TilemapLayer;
        map: Phaser.Tilemap;
        name: string;
        physicsType: number;
        renderSettings: { enableScrollDelta: boolean; overdrawRatio: number; copyCanvas: any; };
        scrollFactorX: number;
        scrollFactorY: number;
        scrollX: number;
        scrollY: number;
        type: number;
        wrap: boolean;

        destroy(): void;
        getRayCastTiles(layer: Phaser.TilemapLayer|Phaser.TilemapLayerGL, line: Phaser.Line, stepRate?: number, collides?: boolean, interestingFace?: boolean): Phaser.Tile[];
        getTiles(layer: Phaser.TilemapLayer|Phaser.TilemapLayerGL, x: number, y: number, width: number, height: number, collides?: boolean, interestingFace?: boolean): Phaser.Tile[];
        getTileX(layer: Phaser.TilemapLayer|Phaser.TilemapLayerGL, x: number): number;
        getTileXY(layer: Phaser.TilemapLayer|Phaser.TilemapLayerGL, x: number, y: number, point: Phaser.Point): Phaser.Point;
        getTileY(layer: Phaser.TilemapLayer|Phaser.TilemapLayerGL, y: number): number;
        postUpdate(): void;
        render(): void;
        resize(width: number, height: number): void;
        resizeWorld(): void;
        resetTilesetCache(): void;
        setScale(xScale?: number, yScale?: number): void;
        updateMax(): void;

    }

    class TilemapLayerGL {

        constructor(game: Phaser.Game, tilemap: Phaser.Tilemap, index: number, width?: number, height?: number, tileset?: Phaser.Tileset);

        collisionHeight: number;
        collisionWidth: number;
        data: any;
        dirty: boolean;
        exists: boolean;
        fixedToCamera: boolean;
        game: Phaser.Game;
        index: number;
        layer: Phaser.TilemapLayer;
        map: Phaser.Tilemap;
        name: string;
        physicsType: number;
        scrollFactorX: number;
        scrollFactorY: number;
        scrollX: number;
        scrollY: number;
        type: number;
        wrap: boolean;
        x: number;
        y: number;
        width: number;
        height: number;

        destroy(): void;
        postUpdate(): void;
        render(): void;
        resize(width: number, height: number): void;
        resizeWorld(): void;
        resetTilesetCache(): void;
        setScale(xScale?: number, yScale?: number): void;
        updateMax(): void;

    }

    class TilemapParser {

        static INSERT_NULL: boolean;

        static getEmptyData(tileWidth?: number, tileHeight?: number, width?: number, height?: number): any;
        static parse(game: Phaser.Game, key: string, tileWidth?: number, tileHeight?: number, width?: number, height?: number): any;
        static parseCSV(key: string, data: string, tileWidth?: number, tileHeight?: number): any;
        static parseJSON(json: any): any;

    }

    class Tileset {

        constructor(name: string, firstgid: number, width?: number, height?: number, margin?: number, spacing?: number, properties?: any);

        columns: number;
        firstgid: number;
        image: any;
        lastgid: number;
        name: string;
        properties: any;
        rows: number;
        tileHeight: number;
        tileMargin: number;
        tileSpacing: number;
        tileWidth: number;
        total: number;

        containsTileIndex(tileIndex: number): boolean;
        draw(context: CanvasRenderingContext2D, x: number, y: number, index: number): void;
        drawGl(glBatch: any[], x: number, y: number, index: number, alpha: number, flippedVal: number): void;
        setImage(image: any): void;
        setSpacing(margin?: number, spacing?: number): void;

    }

    class TileSprite extends PIXI.TilingSprite {

        constructor(game: Phaser.Game, x: number, y: number, width: number, height: number, key?: string | Phaser.RenderTexture | Phaser.BitmapData | PIXI.Texture, frame?: string | number);

        alive: boolean;
        angle: number;
        animations: Phaser.AnimationManager;
        autoCull: boolean;
        body: Phaser.Physics.Arcade.Body | Phaser.Physics.P2.Body | Phaser.Physics.Ninja.Body | any;
        bottom: number;
        cameraOffset: Phaser.Point;
        checkWorldBounds: boolean;
        components: any;
        customRender: boolean;
        data: any;
        debug: boolean;
        destroyPhase: boolean;
        events: Phaser.Events;
        exists: boolean;
        fixedToCamera: boolean;
        frame: string | number;
        frameName: string;
        fresh: boolean;
        game: Phaser.Game;
        inCamera: boolean;
        input: Phaser.InputHandler;
        inputEnabled: boolean;
        inWorld: boolean;
        key: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture;
        left: number;
        name: string;
        offsetX: number;
        offsetY: number;
        outOfBoundsKill: boolean;
        pendingDestroy: boolean;
        physicsType: number;
        position: Phaser.Point;
        smoothed: boolean;
        previousPosition: Phaser.Point;
        previousRoation: number;
        right: number;
        top: number;
        renderOrderID: number;
        type: number;
        world: Phaser.Point;
        z: number;

        alignIn(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): any;
        alignTo(container: Phaser.Rectangle | Phaser.Sprite | Phaser.Image | Phaser.Text | Phaser.BitmapText | Phaser.Button | Phaser.Graphics | Phaser.TileSprite, position?: number, offsetX?: number, offsetY?: number): any;
        autoScroll(x: number, y: number): void;
        destroy(destroyChildren?: boolean): void;
        loadTexture(key: string | Phaser.RenderTexture | Phaser.BitmapData | Phaser.Video | PIXI.Texture, frame?: string | number, stopAnimation?: boolean): void;
        play(name: string, frameRate?: number, loop?: boolean, killOnComplete?: boolean): Phaser.Animation;
        postUpdate(): void;
        preUpdate(): void;
        overlap(displayObject: Phaser.Sprite | Phaser.Image | Phaser.TileSprite | Phaser.Button | PIXI.DisplayObject): boolean;
        reset(x: number, y: number, health?: number): Phaser.TileSprite;
        resizeFrame(parent: any, width: number, height: number): void;
        resetFrame(): void;
        setFrame(frame: Phaser.Frame): void;
        stopScroll(): void;
        update(): void;

    }

    class Time {

        constructor(game: Phaser.Game);

        advancedTiming: boolean;
        desiredFps: number;
        desiredFpsMult: number;
        elapsed: number;
        events: Phaser.Timer;
        elapsedMS: number;
        fps: number;
        fpsMax: number;
        fpsMin: number;
        frames: number;
        game: Phaser.Game;
        lastTime: number;
        msMax: number;
        msMin: number;
        now: number;
        pausedTime: number;
        pauseDuration: number;
        physicsElapsed: number;
        physicsElapsedMS: number;
        prevTime: number;
        slowMotion: number;
        suggestedFps: number;
        time: number;
        timeExpected: number;
        timeToCall: number;

        add(timer: Phaser.Timer): Phaser.Timer;
        boot(): void;
        create(autoDestroy?: boolean): Phaser.Timer;
        elapsedSecondsSince(since: number): number;
        elapsedSince(since: number): number;
        removeAll(): void;
        reset(): void;
        totalElapsedSeconds(): number;
        update(time: number): void;

    }

    class Timer {

        constructor(game: Phaser.Game, autoDestroy?: boolean);

        static HALF: number;
        static MINUTE: number;
        static QUARTER: number;
        static SECOND: number;

        autoDestroy: boolean;
        duration: number;
        events: Phaser.TimerEvent[];
        expired: boolean;
        game: Phaser.Game;
        length: number;
        ms: number;
        next: number;
        nextTick: number;
        onComplete: Phaser.Signal;
        running: boolean;
        paused: boolean;
        seconds: number;

        add(delay: number, callback: Function, callbackContext?: any, ...args: any[]): Phaser.TimerEvent;
        clearPendingEvents(): void;
        destroy(): void;
        loop(delay: number, callback: Function, callbackContext?: any, ...args: any[]): Phaser.TimerEvent;
        order(): void;
        pause(): void;
        remove(event: Phaser.TimerEvent): boolean;
        removeAll(): void;
        repeat(delay: number, repeatCount: number, callback: Function, callbackContext?: any, ...args: any[]): Phaser.TimerEvent;
        resume(): void;
        sortHandler(a: any, b: any): number;
        start(startDelay?: number): void;
        stop(clearEvents?: boolean): void;
        update(time: number): boolean;

    }

    class TimerEvent {

        constructor(timer: Phaser.Timer, delay: number, tick: number, repeatCount: number, loop: boolean, callback: Function, callbackContext: any, ...args: any[]);

        args: any[];
        callback: Function;
        callbackContext: any;
        delay: number;
        loop: boolean;
        pendingDelete: boolean;
        repeatCount: number;
        tick: number;
        timer: Phaser.Timer;

    }

    class Touch {

        constructor(game: Phaser.Game);

        callbackContext: any;
        enabled: boolean;
        event: any;
        game: Phaser.Game;
        preventDefault: boolean;
        touchCancelCallback: Function;
        touchEndCallback: Function;
        touchEnterCallback: Function;
        touchLeaveCallback: Function;
        touchMoveCallback: Function;
        touchStartCallback: Function;
        touchLockCallbacks: Function[];

        addTouchLockCallback(callback: Function, context?: any, onEnd?: Function): void;
        removeTouchLockCallback(callback: Function, context?: any): boolean;
        consumeTouchMove(): void;
        onTouchCancel(event: any): void;
        onTouchEnd(event: any): void;
        onTouchEnter(event: any): void;
        onTouchLeave(event: any): void;
        onTouchMove(event: any): void;
        onTouchStart(event: any): void;
        start(): void;
        stop(): void;

    }

    class Tween {

        constructor(target: any, game: Phaser.Game, manager: Phaser.TweenManager);

        chainedTween: Phaser.Tween;
        current: number;
        frameBased: boolean;
        game: Phaser.Game;
        isRunning: boolean;
        isPaused: boolean;
        manager: Phaser.TweenManager;
        onChildComplete: Phaser.Signal;
        onComplete: Phaser.Signal;
        onLoop: Phaser.Signal;
        onRepeat: Phaser.Signal;
        onStart: Phaser.Signal;
        pendingDelete: boolean;
        properties: any;
        repeatCounter: number;
        reverse: boolean;
        target: any;
        timeline: Phaser.TweenData[];
        timeScale: number;
        totalDuration: number;

        chain(...args: any[]): Phaser.Tween;
        delay(duration: number, index?: number): Phaser.Tween;
        easing(ease: Function, index?: number): Phaser.Tween;
        easing(ease: string, index?: number): Phaser.Tween;
        from(properties: any, duration?: number, ease?: Function, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Phaser.Tween;
        from(properties: any, duration?: number, ease?: string, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Phaser.Tween;
        generateData(frameRate?: number, data?: any): any[];
        interpolation(interpolation: Function, context?: any, index?: number): Phaser.Tween;
        loop(value?: boolean): Phaser.Tween;
        onUpdateCallback(callback: Function, callbackContext?: any): Phaser.Tween;
        pause(): void;
        repeat(total: number, repeatDelay?: number, index?: number): Phaser.Tween;
        repeatDelay(duration: number, index?: number): Phaser.Tween;
        repeatAll(total?: number): Phaser.Tween;
        resume(): void;
        start(index?: number): Phaser.Tween;
        stop(complete?: boolean): Phaser.Tween;
        to(properties: any, duration?: number, ease?: Function, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Phaser.Tween;
        to(properties: any, duration?: number, ease?: string, autoStart?: boolean, delay?: number, repeat?: number, yoyo?: boolean): Phaser.Tween;
        update(time: number): boolean;
        updateTweenData(property: string, value: number | Function, index?: number): Phaser.Tween;
        yoyo(enable: boolean, yoyoDelay?: number, index?: number): Phaser.Tween;
        yoyoDelay(duration: number, index?: number): Phaser.Tween;

    }

    class TweenData {

        constructor(parent: Phaser.Tween);

        static COMPLETE: number;
        static LOOPED: number;
        static PENDING: number;
        static RUNNING: number;

        delay: number;
        dt: number;
        duration: number;
        easingFunction: Function;
        game: Phaser.Game;
        inReverse: boolean;
        interpolate: boolean;
        interpolateFunctionContext: Phaser.Math;
        interpolationContext: Phaser.Math;
        interpolationFunction: Function;
        isRunning: boolean;
        isFrom: boolean;
        parent: Phaser.Tween;
        percent: number;
        repeatCounter: number;
        startTime: number;
        value: number;
        yoyo: boolean;
        yoyoDelay: number;

        from(properties: any, duration?: number, ease?: Function, delay?: number, repeat?: number, yoyo?: boolean): Phaser.TweenData;
        generateData(frameRate?: number): any[];
        repeat(): number;
        start(): Phaser.TweenData;
        to(properties: any, duration?: number, ease?: Function, delay?: number, repeat?: number, yoyo?: boolean): Phaser.TweenData;
        update(time: number): number;

    }

    class TweenManager {

        constructor(game: Phaser.Game);

        frameBased: boolean;
        game: Phaser.Game;

        add(tween: Phaser.Tween): Phaser.Tween;
        create(object: any): Phaser.Tween;
        getAll(): Phaser.Tween[];
        isTweening(object: any): boolean;
        remove(tween: Phaser.Tween): Phaser.Tween;
        removeAll(): void;
        removeFrom(obj: any, children?: boolean): void;
        resumeAll(): void;
        update(): boolean;
        pauseAll(): void;

    }

    class Utils {

        static getProperty(obj: any, prop: string): any;
        static setProperty(obj: any, prop: string, value: any): any;
        static chanceRoll(chance: number): boolean;
        static randomChoice(choice1: string | number, choice2: any): any;
        static reverseString(string: string): string;
        static parseDimension(size: any, dimension: number): number;
        static pad(str: string, len?: number, pad?: string, dir?: number): string;
        static isPlainObject(object: any): boolean;
        static extend(deep: boolean, target: any, ...args: any[]): any;
        static mixinPrototype(target: any, mixin: any, replace?: boolean): void;
        static mixin<T>(from: T, to: any): T;

    }

    module Utils {

        class Debug {

            constructor(game: Phaser.Game);

            bmd: Phaser.BitmapData;
            canvas: HTMLCanvasElement;
            columnWidth: number;
            context: CanvasRenderingContext2D;
            currentAlpha: number;
            currentX: number;
            currentY: number;
            dirty: boolean;
            font: string;
            game: Phaser.Game;
            lineHeight: number;
            renderShadow: boolean;
            sprite: Phaser.Image;

            AStar(astar: Phaser.Plugin.AStar, x: number, y: number, showVisited: boolean): void;
            boot(): void;
            body(sprite: Phaser.Sprite, color?: string, filled?: boolean): void;
            bodyInfo(sprite: Phaser.Sprite, x: number, y: Number, color?: string): void;
            box2dBody(body: Phaser.Sprite, color?: string): void;
            box2dWorld(): void;
            cameraInfo(camera: Phaser.Camera, x: number, y: number, color?: string): void;
            destroy(): void;
            geom(object: any, color?: string, fiiled?: boolean, forceType?: number): void;
            inputInfo(x: number, y: number, color?: string): void;
            lineInfo(line: Phaser.Line, x: number, y: number, color?: string): void;
            key(key: Phaser.Key, x?: number, y?: number, color?: string): void;
            line(...args: string[]): void;
            preUpdate(): void;
            pixel(x: number, y: number, color?: string, size?: number): void;
            pointer(pointer: Phaser.Pointer, hideIfUp?: boolean, downColor?: string, upColor?: string, color?: string): void;
            quadTree(quadtree: Phaser.QuadTree, color?: string): void;
            rectangle(object: Phaser.Rectangle, color?: string, filled?: boolean): void;
            reset(): void;
            ropeSegments(rope: Phaser.Rope, color?: number, filled?: boolean): void;
            soundInfo(sound: Phaser.Sound, x: number, y: number, color?: string): void;
            spriteBounds(sprite: any, color?: string, filled?: boolean): void;
            spriteCoords(sprite: any, x: number, y: number, color?: string): void;
            spriteInfo(sprite: Phaser.Sprite, x: number, y: number, color?: string): void;
            spriteInputInfo(sprite: Phaser.Sprite, x: number, y: number, color?: string): void;
            start(x?: number, y?: number, color?: string, columnWidth?: number): void;
            stop(): void;
            text(text: string, x: number, y: number, color?: string, font?: string): void;
            timer(timer: Phaser.Timer, x: number, y: number, color?: string): void;

        }

    }

    class Weapon extends Phaser.Plugin {

        constructor(game: Phaser.Game, parent: Phaser.PluginManager);

        static KILL_NEVER: number;
        static KILL_LIFESPAN: number;
        static KILL_DISTANCE: number;
        static KILL_WEAPON_BOUNDS: number;
        static KILL_CAMERA_BOUNDS: number;
        static KILL_WORLD_BOUNDS: number;
        static KILL_STATIC_BOUNDS: number;

        autoExpandBulletsGroup: boolean;
        autofire: boolean;
        bounds: Phaser.Rectangle;
        bulletAngleOffset: number;
        bulletAngleVariance: number;
        bulletAnimation: string;
        bulletClass: any;
        bulletCollideWorldBounds: boolean;
        bulletFrame: string;
        bulletFrameCycle: boolean;
        bulletFrameRandom: boolean;
        bulletFrames:  any[];
        bulletGravity: Phaser.Point;
        bulletInheritSpriteSpeed: boolean;
        bulletKey: string;
        bulletKillDistance: number;
        bulletKillType: number;
        bulletLifespan: number;
        bulletRotateToVelocity: boolean;
        bullets: Phaser.Group;
        bulletSpeed: number;
        bulletSpeedVariance: number;
        bulletWorldWrap: boolean;
        bulletWorldWrapPadding: number;
        fireAngle: number;
        fireFrom: Phaser.Rectangle;
        fireLimit: number;
        fireRate: number;
        fireRateVariance: number;
        multiFire: boolean;
        onFire: Phaser.Signal;
        onFireLimit: Phaser.Signal;
        onKill: Phaser.Signal;
        shots: number;
        trackedPointer: Phaser.Pointer;
        trackedSprite: any;
        trackOffset: Phaser.Point;
        trackRotation: boolean;
        x: number;
        y: number;

        addBulletAnimation(name: string, frames?: number[] | string[], frameRate?: number, loop?: boolean, useNumericIndex?: boolean): Phaser.Weapon;
        createBullets(quantity?: number, key?: any, frame?: any, group?: Phaser.Group): Phaser.Weapon;
        debug(x?: number, y?: number, debugBodies?: boolean): void;
        destroy(): void;
        fire(from?: any, x?: number, y?: number, offsetX?: number, offsetY?: number): Phaser.Bullet;
        fireAtPointer(pointer: Phaser.Pointer): Phaser.Bullet;
        fireAtSprite(sprite: Phaser.Sprite): Phaser.Bullet;
        fireAtXY(x: number, y: number): Phaser.Bullet;
        fireMany(positions: any[], from?: any): Phaser.Bullet[];
        fireOffset(offsetX?: number, offsetY?: number): Phaser.Bullet;
        forEach(callback: any, callbackContext: any): Phaser.Weapon;
        killAll(): Phaser.Weapon;
        pauseAll(): Phaser.Weapon;
        resetShots(newLimit?: number): Phaser.Weapon;
        resumeAll(): Phaser.Weapon;
        setBulletBodyOffset(width: number, height: number, offsetX?: number, offsetY?: number): Phaser.Weapon;
        setBulletFrames(min: number, max: number, cycle?: boolean, random?: boolean): Phaser.Weapon;
        trackPointer(pointer: Phaser.Pointer, offsetX?: number, offsetY?: number): Phaser.Weapon;
        trackSprite(sprite: Phaser.Sprite, offsetX?: number, offsetY?: number, trackRotation?: boolean): Phaser.Weapon;

    }

    class World extends Phaser.Group {

        constructor(game: Phaser.Game);

        bounds: Phaser.Rectangle;
        camera: Phaser.Camera;
        centerX: number;
        centerY: number;
        game: Phaser.Game;
        height: number;
        isPaused: boolean;
        randomX: number;
        randomY: number;
        stats: {
            skipped: number;
            ignored: number;
            checked: number;
        };
        width: number;

        boot(): void;
        getObjectsUnderPointer(pointer: Phaser.Pointer, group: Phaser.Group, callback?: Function, callbackContext?: any): Phaser.Sprite;
        resize(width: number, height: number): void;
        setBounds(x: number, y: number, width: number, height: number): void;
        sortLeftRight(a: Phaser.Sprite, b: Phaser.Sprite): number;
        sortRightLeft(a: Phaser.Sprite, b: Phaser.Sprite): number;
        sortTopBottom(a: Phaser.Sprite, b: Phaser.Sprite): number;
        sortBottomTop(a: Phaser.Sprite, b: Phaser.Sprite): number;
        sort(group: Phaser.Group, sortDirection?: number): void;
        sort(key?: string, order?: number): void;
        shutdown(): void;
        wrap(sprite: any, padding?: number, useBounds?: boolean, horizontal?: boolean, vertical?: boolean): void;

    }

}