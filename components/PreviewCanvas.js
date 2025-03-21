"use client"

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Decal, OrbitControls, useTexture } from '@react-three/drei'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import useStore from './useStore'
import { CatmullRomCurve3, CubeTextureLoader, TextureLoader, Vector3 } from 'three'
import { degToRad } from 'three/src/math/MathUtils'
import { ModelBrownBuilding } from 'public/models/Brown Building'
import { ModelGreenBuilding } from 'public/models/Building Green'
import { ModelTreeLime } from 'public/models/Tree Lime'
import { ModelSportsCar } from 'public/models/Sports Car'
import { ModelBuildingRedCorner } from 'public/models/Building Red Corner'
import { ModelJToastieRoadSignDouble } from 'public/models/Road Sign Double'
import { ModelJToastieParkBench } from 'public/models/Park Bench'
import { ModelJToastieCrane } from 'public/models/Crane'

export default function PreviewCanvas({ }) {

    const autoRotate = useStore(state => state.autoRotate);
    const quantity = useStore(state => state.quantity);

    // Generate positions
    const positions = useMemo(() => {

        // Calculate grid size
        const gridSize = 2 * quantity - 1;
        const halfGrid = Math.floor(gridSize / 2);
        const spacing = 10; // Adjust spacing as needed

        const tempPositions = []

        for (let x = -halfGrid; x <= halfGrid; x++) {
            for (let z = -halfGrid; z <= halfGrid; z++) {
                tempPositions.push([x * spacing, 0, z * spacing]);
            }
        }

        return tempPositions

    }, [quantity]);

    return (
        <Canvas>

            <ambientLight intensity={Math.PI / 2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
            <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />

            <OrbitControls
                autoRotate={autoRotate}
            />

            <Skybox />

            {/* <GridItem />

            {quantity > 0 &&
                <>
                    <GridItem
                        position={[10, 0, 0]}
                    />

                    <GridItem
                        position={[-10, 0, 0]}
                    />

                    <GridItem
                        position={[0, 0, 10]}
                    />

                    <GridItem
                        position={[0, 0, -10]}
                    />

                    <GridItem
                        position={[10, 0, 10]}
                    />

                    <GridItem
                        position={[10, 0, -10]}
                    />

                    <GridItem
                        position={[-10, 0, 10]}
                    />

                    <GridItem
                        position={[-10, 0, -10]}
                    />
                </>
            } */}

            {positions.map((pos, index) => (
                <GridItem key={index} position={pos} />
            ))}

            {/* <Street position={[-1.2, 0, 0]} /> */}

            {/* <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} /> */}

        </Canvas>
    )
}

function Skybox() {

    const { scene } = useThree();

    const previousBackground = useRef(null);

    const loader = useRef(new CubeTextureLoader()).current; // Memoize loader

    useEffect(() => {

        const texture = loader.load([
            `/Skybox/Epic_BlueSunset_Cam_2_Left%2BX.png`,   // 2 (Left)
            `/Skybox/Epic_BlueSunset_Cam_3_Right-X.png`,    // 3 (Right)
            `/Skybox/Epic_BlueSunset_Cam_4_Up%2BY.png`,     // 4 (Up)
            `/Skybox/Epic_BlueSunset_Cam_5_Down-Y.png`,     // 5 (Down)
            `/Skybox/Epic_BlueSunset_Cam_0_Front%2BZ.png`,  // 0 (Front)
            `/Skybox/Epic_BlueSunset_Cam_1_Back-Z.png`
        ]);

        // Set the scene background property to the resulting texture.
        scene.background = texture;
        previousBackground.current = "Cartoon Base BlueSky";

        // Cleanup function to reset the background when the component unmounts
        return () => {
            scene.background = null;
        };

    }, [loader, scene]);

}

function GridItem({ position }) {

    const shouldSpawnCrane = Math.random() < 0.1;
    const randomRotationY = degToRad(Math.random() * 360);

    return (
        <group position={position}>

            <Street />

            <ModelTreeLime
                position={[2.5, 0.2, 2.5]}
                scale={0.2}
            />

            <ModelSportsCar
                // position={[4.25, 0.1, 4.25]}
                scale={0.5}
            // rotation={[0, degToRad(180), 0]}
            />

            <ModelJToastieRoadSignDouble
                position={[3.25, 0.15, 3.25]}
            />

            <ModelJToastieParkBench
                position={[-1.5, 0.15, -2.65]}
                rotation={[0, degToRad(90), 0]}
            />

            {shouldSpawnCrane && <ModelJToastieCrane rotation={[0, randomRotationY, 0]} />}

        </group>
    )
}

function Street(props) {

    const buildingBrown = useLoader(GLTFLoader, '/models/Brown Building.glb')
    const buildingGreen = useLoader(GLTFLoader, '/models/Building Green.glb')
    const buildingRed = useLoader(GLTFLoader, '/models/Building Red.glb')
    const buildingWhite = useLoader(GLTFLoader, '/models/Gb Blank.glb')

    const car = useLoader(GLTFLoader, '/models/Sports Car.glb')

    const treeLime = useLoader(GLTFLoader, '/models/tree-lime.gltf')

    return (
        <group>

            <ModelBrownBuilding
                position={[0, 0.15, 2.25]}
            />

            <ModelBrownBuilding
                position={[0, 0.15, -2.25]}
                rotation={[0, degToRad(180), 0]}
            />

            <ModelGreenBuilding
                position={[2.25, 0.15, 0]}
                rotation={[0, degToRad(90), 0]}
            />

            <ModelGreenBuilding
                position={[-2.25, 0.15, 0]}
                rotation={[0, degToRad(-90), 0]}
            />

            <ModelBuildingRedCorner
                position={[-1.5, 0.15, -1.83]}
                rotation={[0, degToRad(-90), 0]}
            />

            <mesh
                {...props}
            >
                <boxGeometry args={[10, 0.1, 10]} />
                <meshStandardMaterial color={'gray'} />
            </mesh>

            <mesh
                position={[0, 0.1, 0]}
            >
                <boxGeometry args={[7, 0.1, 7]} />
                <meshStandardMaterial color={'lightgray'} />
            </mesh>

            <mesh
                position={[0, 0.051, 5]}
                rotation={[degToRad(-90), degToRad(0), 0]}
            >
                <planeGeometry args={[10, 0.1]} />
                <meshStandardMaterial color={'yellow'} />
            </mesh>

            <mesh
                position={[0, 0.051, -5]}
                rotation={[degToRad(-90), degToRad(0), 0]}
            >
                <planeGeometry args={[10, 0.1]} />
                <meshStandardMaterial color={'yellow'} />
            </mesh>

            <mesh
                position={[5, 0.051, 0]}
                rotation={[degToRad(-90), degToRad(0), 0]}
            >
                <planeGeometry args={[0.1, 10]} />
                <meshStandardMaterial color={'yellow'} />
            </mesh>

            <mesh
                position={[-5, 0.051, 0]}
                rotation={[degToRad(-90), degToRad(0), 0]}
            >
                <planeGeometry args={[0.1, 10]} />
                <meshStandardMaterial color={'yellow'} />
            </mesh>

        </group>
    )
}

function Box(props) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => (meshRef.current.rotation.x += delta))
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={meshRef}
            scale={active ? 1.5 : 1}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}