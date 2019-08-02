import Fractral from './Fractal'
import * as _pixi from 'pixi.js'
import Scene from '../scene/Scene'

interface Point {
    x: number
    y: number
}

export default class MiraFractal extends Fractral {
 
    //For Calculating 
    private width: number
    private height: number
    private a: number
    private b: number
    private c: number
    private x: number
    private y: number
    private j: number
    private iteration: number
    private maxIteration: number
    private scale: number
        

    //For Drawing
    private cl: String
    private graphics: _pixi.Graphics
    private stage: any    
    private midX: number
    private midY: number
    private midPoint: Point
    private maxDistanceToCenter: number
    private drawPoint: Point
    private ratio: number
    


    public constructor (  
        type: string,  
        scene: Scene,
        name: string,
        color: string,
        level: number,
        width: number,
        height: number,
        ) {
            super(type, scene, name, color, level);
            this.width = width
            this.height = height
            this.b = 0.9998
            this.a = 0.16
            this.c = 2 - 2 * this.a
            this.x = 0
            this.j = 0
            this.y =  6
            this.iteration = 0
            this.maxIteration = 100
            this.scale = 20

            this.drawPoint = {x: 0, y: 0}
            this.cl = this.getColor
            this.graphics = new _pixi.Graphics()

    }


    public init(): void {

        this.reset()
        this.graphics.beginFill(parseInt(this.cl.toString().replace(/^#/,''), 16));
        this.graphics.blendMode = _pixi.BLEND_MODES.LIGHTEN;
        this.stage = this.getMainScene.getPixiScene.stage;
        this.stage.addChild(this.graphics);
        this.midX = this.width / 2
        this.midY = this.height / 2
        this.midPoint = {
            x: this.midX,
            y: this.midY
        }

        this.maxDistanceToCenter = this.lineDistance({x: 0, y: 0}, this.midPoint)
        this.draw = this.draw.bind(this)
        this.draw()

    }

    private reset(): void {
        this.iteration = 0
        this.j = 0
        this.c = 2 - 2 * this.a
    }

    private setXY(x: number,y: number): void {
        this.x = x
        this.y = y
    }

    private maxIterationReached(): boolean {
        return this.iteration >= this.maxIteration + 1
    }

    public nextIteration(): Point {
        this.iteration++

        var z = this.x
        this.x = this.b * this.y + this.j

        this.j = this.a * this.x + this.c * Math.pow(this.x, 2) / (1 + Math.pow(this.x, 2))
        this.y = this.j - z

        return {
            x: (this.x * this.scale) + this.width / 2,
            y: (this.y * this.scale) + this.height / 2
        }
    }

    private lineDistance(point1: Point, point2: Point): number {
        let xs = 0
        let ys = 0

        xs = point2.x - point1.x
        xs = xs * xs;

        ys = point2.y - point1.y;
        ys = ys * ys;
    
        return xs + ys;
    }

    private draw(): number {
        // let stop = false;

        // if (stop){
        //     return;
        // }
        
        console.log("#################################");
        console.log(this);
        console.log(this.drawPoint);
        console.log(this.ratio);
        console.log("#################################");

        this.drawPoint =  this.nextIteration()
        this.ratio = (this.lineDistance(this.drawPoint, this.midPoint) / this.maxDistanceToCenter)
        this.graphics.drawRect(this.drawPoint.x, this.drawPoint.y, 3, 3)
        console.log(this.drawPoint);
        console.log(this.ratio);
        console.log("#################################");

        if(this.iteration % 500 === 0) {
            //FARBE
            // this.cl = this.cl.saturate()

        }

        this.getMainScene.getPixiScene.renderer.render(this.stage)

        if(this.maxIterationReached()) {
            return
        }

        return window.requestAnimationFrame(this.draw);

    }
}