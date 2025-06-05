import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */

//Floor Textures
const textureLoader=new THREE.TextureLoader()
const floorAlphaTexture=textureLoader.load('./floor/alpha.jpg')
const floorColorTexture=textureLoader.load('./floor/coast_sand_rocks_02_diff_1k.webp')
const floorARMTexture=textureLoader.load('./floor/coast_sand_rocks_02_arm_1k.webp')
const floorDisplacementTexture=textureLoader.load('./floor/coast_sand_rocks_02_disp_1k.webp')
const floorNormalTexture=textureLoader.load('./floor/coast_sand_rocks_02_nor_gl_1k.webp')

floorColorTexture.repeat.set(8,8)
floorARMTexture.repeat.set(8,8)
floorDisplacementTexture.repeat.set(8,8)
floorNormalTexture.repeat.set(8,8)

floorColorTexture.wrapS=THREE.RepeatWrapping
floorARMTexture.wrapS=THREE.RepeatWrapping
floorDisplacementTexture.wrapS=THREE.RepeatWrapping
floorNormalTexture.wrapS=THREE.RepeatWrapping

floorColorTexture.wrapT=THREE.RepeatWrapping
floorARMTexture.wrapT=THREE.RepeatWrapping
floorDisplacementTexture.wrapT=THREE.RepeatWrapping
floorNormalTexture.wrapT=THREE.RepeatWrapping

floorColorTexture.colorSpace=THREE.SRGBColorSpace

//Wall textures
const WallsColorTexture=textureLoader.load('./wall/castle_brick_broken_06_diff_1k.webp')
const WallsARMTexture=textureLoader.load('./wall/castle_brick_broken_06_nor_gl_1k.webp')
const WallsNormalTexture=textureLoader.load('./wall/castle_brick_broken_06_nor_gl_1k.webp')
WallsColorTexture.colorSpace=THREE.SRGBColorSpace

//Roof Textures
const RoofColorTexture=textureLoader.load('./Roof/roof_slates_02_diff_1k.webp')
const RoofARMTexture=textureLoader.load('./Roof/roof_slates_02_arm_1k.webp')
const RoofNormalTexture=textureLoader.load('./Roof/roof_slates_02_nor_gl_1k.webp')
RoofColorTexture.colorSpace=THREE.SRGBColorSpace

RoofColorTexture.repeat.set(3,1)
RoofARMTexture.repeat.set(3,1)
RoofNormalTexture.repeat.set(3,1)

RoofColorTexture.wrapS=THREE.RepeatWrapping
RoofARMTexture.wrapS=THREE.RepeatWrapping
RoofNormalTexture.wrapS=THREE.RepeatWrapping

//Bushes Texture
const BushColorTexture=textureLoader.load('./Bushes/leaves_forest_ground_diff_1k.webp')
const BushARMTexture=textureLoader.load('./Bushes/leaves_forest_ground_arm_1k.webp')
const BushNormalTexture=textureLoader.load('./Bushes/leaves_forest_ground_nor_gl_1k.webp')
BushColorTexture.colorSpace=THREE.SRGBColorSpace

BushColorTexture.repeat.set(2,1)
BushARMTexture.repeat.set(2,1)
BushNormalTexture.repeat.set(2,1)

BushColorTexture.wrapS=THREE.RepeatWrapping
BushARMTexture.wrapS=THREE.RepeatWrapping
BushNormalTexture.wrapS=THREE.RepeatWrapping

//Graves Texture
const GraveColorTexture=textureLoader.load('./Graves/plastered_stone_wall_diff_1k.webp')
const GraveARMTexture=textureLoader.load('./Graves/plastered_stone_wall_arm_1k.webp')
const GraveNormalTexture=textureLoader.load('./Graves/plastered_stone_wall_nor_gl_1k.webp')
GraveColorTexture.colorSpace=THREE.SRGBColorSpace

BushColorTexture.repeat.set(0.3,0.4)
BushARMTexture.repeat.set(0.3,0.4)
BushNormalTexture.repeat.set(0.3,0.4)

//Door Texture
const DoorAlphaTexture=textureLoader.load('./door/alpha.jpg')
const DoorColorTexture=textureLoader.load('./door/color.webp')
const DoorAmbientOcclusionexture=textureLoader.load('./door/ambientOcclusion.webp')
const DoorRoughnessTexture=textureLoader.load('./door/roughness.webp')
const DoorNormalTexture=textureLoader.load('./door/normal.webp')
const DoorMetalnessTexture=textureLoader.load('./door/metalness.webp')
const DoorHeightTexture=textureLoader.load('./door/height.webp')

/**
 * Haunted House
 */

//floor
 const floor=new THREE.Mesh(
    new THREE.PlaneGeometry(20,20,100,100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        aoMap:floorARMTexture,
        roughnessMap:floorARMTexture,
        metalnessMap:floorARMTexture,
        normalMap:floorNormalTexture,
        displacementMap:floorDisplacementTexture,
        displacementScale:0.3,
        displacementBias:-0.2
    })
)
     
  
 floor.rotation.x=-Math.PI*0.5
 scene.add(floor)

 //Tweaks
 gui.add(floor.material,
    'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
 gui.add(floor.material,
    'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')   

//House Container
const House=new THREE.Group()
scene.add(House)

//Walls
const Walls=new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map:WallsColorTexture,
        aoMap:WallsARMTexture,
        roughnessMap:WallsARMTexture,
        metalnessMap:WallsARMTexture,
        normalMap:WallsNormalTexture
    })
)
Walls.position.y+=1.25
House.add(Walls)

//Roof
const Roof=new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1.5,4),
    new THREE.MeshStandardMaterial({
        map:RoofColorTexture,
        aoMap:RoofARMTexture,
        metalnessMap:RoofARMTexture,
        roughnessMap:RoofARMTexture,
        normalMap:RoofNormalTexture

    })
)
Roof.position.y+=3.25
Roof.rotation.y=Math.PI*0.25
House.add(Roof)

//Door
const Door=new THREE.Mesh(
    new THREE.PlaneGeometry(2.2,2.2,100,100),
    new THREE.MeshStandardMaterial( 
        {
        alphaMap: DoorAlphaTexture,
        transparent: true,
        map: DoorColorTexture,
        aoMap:DoorAmbientOcclusionexture,
        roughnessMap:DoorRoughnessTexture,
        metalnessMap: DoorMetalnessTexture,
        normalMap:DoorNormalTexture,
        displacementMap: DoorHeightTexture,
        displacementScale:0.15,
        displacementBias:-0.04
        }
    )
)
Door.position.y=1
Door.position.z=2 + 0.01 //Z-fighting

House.add(Door)

//Bushes
const BushMaterial=new THREE.MeshStandardMaterial({
    map:BushColorTexture,
    aoMap:BushARMTexture,
    roughnessMap:BushARMTexture,
    metalnessMap:BushARMTexture,
    normalMap:BushNormalTexture,
    color:"#ccffcc"
})
const BushGeometry=new THREE.SphereGeometry(1,16,16)

//Bush_Mesh
//bush1
const bush1=new THREE.Mesh(BushGeometry,BushMaterial)
bush1.position.set(0.8,0.2,2.2)
bush1.scale.set(0.5,0.5,0.5)
bush1.rotation.x=-0.7
//bush2
const bush2=new THREE.Mesh(BushGeometry,BushMaterial)
bush2.position.set(1.4,0.1,2.1)
bush2.scale.set(0.25,0.25,0.25)
bush2.rotation.x=-0.75
//bush3
const bush3=new THREE.Mesh(BushGeometry,BushMaterial)
bush3.position.set(-0.8,0.1,2.2)
bush3.scale.set(0.4,0.4,0.4)
bush3.rotation.x=-0.75
//bush4
const bush4=new THREE.Mesh(BushGeometry,BushMaterial)
bush4.position.set(-1,0.05,2.6)
bush4.scale.set(0.15,0.15,0.15)
bush4.rotation.x=-0.75
House.add(bush1,bush2,bush3,bush4) //adding

//Graves
const Graves=new THREE.Group()
scene.add(Graves)

const GraveGeometry=new THREE.BoxGeometry(0.6,0.8,0.2)
const GraveMaterial=new THREE.MeshStandardMaterial( 
    {   
        map:GraveColorTexture,
        aoMap:GraveARMTexture,
        roughnessMap:GraveARMTexture,
        metalnessMap:GraveARMTexture,
        normalMap:GraveNormalTexture
    }
    )
 
for(let i=0;i<30;i++){
    //Mesh
    const Grave=new THREE.Mesh(GraveGeometry,GraveMaterial)

    let radius =3 + Math.random()*4
    //Angle 
    const angle=Math.random()*Math.PI*2
    const x=Math.sin(angle)*radius
    const z=Math.cos(angle)*radius
    // Position
    Grave.position.x=x
    Grave.position.z=z
    Grave.position.y=Math.random()*0.4

    //Rotation
    Grave.rotation.x=(Math.random()-0.5)*0.4
    Grave.rotation.y=(Math.random()-0.5)*0.4
    Grave.rotation.z=(Math.random()-0.5)*0.4


    //Add to graves Group
    Graves.add(Grave)
}

//Sky
const sky=new Sky()
scene.add(sky)
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)
sky.scale.set(100,100,100)

/**
 * Fog
 */
//scene.fog = new THREE.Fog('#ff0000', 1, 13)
scene.fog = new THREE.FogExp2('#04343f', 0.1)


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff',0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

//Point light
const DoorLight=new THREE.PointLight('#ff7d46',5)
House.add(DoorLight)
DoorLight.position.set(0, 2.2, 2.5)

/*
*Ghosts
*/
const ghost1=new THREE.PointLight('#8800ff',6)
const ghost2=new THREE.PointLight('#ff0088',6)
const ghost3=new THREE.PointLight('#ff0000',6)
scene.add(ghost1,ghost2,ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled=true
renderer.shadowMap.type=THREE.PCFShadowMap

//Cast And Recieve Shadow
directionalLight.castShadow=true
ghost1.castShadow=true
ghost2.castShadow=true
ghost3.castShadow=true

Walls.castShadow=true
Walls.receiveShadow=true
Roof.castShadow=true
floor.receiveShadow=true

for(const Grave of Graves.children){
    Grave.castShadow=true
    Grave.receiveShadow=true
}

//Mapping
directionalLight.shadow.mapSize.width=256
directionalLight.shadow.mapSize.height=256
directionalLight.shadow.camera.top=8
directionalLight.shadow.camera.right= 8
directionalLight.shadow.camera.bottom=-8
directionalLight.shadow.camera.left=-8
directionalLight.shadow.camera.near=1
directionalLight.shadow.camera.far=20

ghost1.shadow.mapSize.width=256
ghost1.shadow.mapSize.height=256
ghost1.shadow.camera.near=10

ghost2.shadow.mapSize.width=256
ghost2.shadow.mapSize.height=256
ghost2.shadow.camera.near=10

ghost3.shadow.mapSize.width=256
ghost3.shadow.mapSize.height=256
ghost3.shadow.camera.far=10

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    //GhostAngle & Position
    const ghost1Angle=elapsedTime*0.5
    ghost1.position.x=Math.cos(ghost1Angle)*4
    ghost1.position.z=Math.sin(ghost1Angle)*4
    ghost1.position.y=Math.sin(ghost1Angle)*Math.sin(ghost1Angle*2.34)*Math.sin(ghost1Angle*3.45)

    const ghost2Angle=(-elapsedTime*0.38)
    ghost2.position.x=Math.cos(ghost2Angle)*5
    ghost2.position.z=Math.sin(ghost2Angle)*5
    ghost2.position.y=Math.sin(ghost2Angle)*Math.sin(ghost2Angle*2.34)*Math.sin(ghost2Angle*3.45)

    const ghost3Angle=(elapsedTime*0.23)
    ghost3.position.x=Math.cos(ghost3Angle)*6
    ghost3.position.z=Math.sin(ghost3Angle)*6
    ghost3.position.y=Math.sin(ghost3Angle)*Math.sin(ghost3Angle*2.34)*Math.sin(ghost3Angle*3.45)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()