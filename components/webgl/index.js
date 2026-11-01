import { Float, useGLTF } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useFrame as useRaf } from '@darkroom.engineering/hamo'
import { useScroll } from 'hooks/use-scroll'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import {
  Color,
  DoubleSide,
  MathUtils,
  MeshPhysicalMaterial,
  Vector2,
} from 'three'
import fragmentShader from './particles/fragment.glsl'
import vertexShader from './particles/vertex.glsl'

function Raf({ render = true }) {
  const { advance } = useThree()

  useRaf((time) => {
    if (render) {
      advance(time / 1000)
    }
  })
}

function Particles({
  width = 250,
  height = 250,
  depth = 250,
  count = 1000,
  scale = 100,
  size = 100,
}) {
  const positions = useMemo(() => {
    const array = new Array(count * 3)

    for (let i = 0; i < array.length; i += 3) {
      array[i] = MathUtils.randFloatSpread(width)
      array[i + 1] = MathUtils.randFloatSpread(height)
      array[i + 2] = MathUtils.randFloatSpread(depth)
    }

    return Float32Array.from(array)
  }, [count, scale, width, height, depth])

  const noise = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count * 3 }, () => Math.random() * 100)
      ),
    [count]
  )

  const sizes = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => Math.random() * size)
      ),
    [count, size]
  )

  const speeds = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => Math.random() * 0.2)
      ),
    [count]
  )

  const scales = useMemo(
    () =>
      Float32Array.from(
        Array.from({ length: count }, () => Math.random() * 100)
      ),
    [count]
  )

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new Color('rgb(255, 207, 206)') },
      uScroll: { value: 0 },
      uResolution: { value: new Vector2(width, height) },
    }),
    []
  )

  useEffect(() => {
    uniforms.uResolution.value.set(width, height)
  }, [width, height, uniforms])

  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime
  })

  useScroll(({ scroll }) => {
    uniforms.uScroll.value = scroll
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-noise" args={[noise, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-speed" args={[speeds, 1]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={uniforms}
      />
    </points>
  )
}

const armMaterial = new MeshPhysicalMaterial({
  color: new Color('#b0b0b0'),
  metalness: 1,
  roughness: 0.4,
  side: DoubleSide,
})

function Arm() {
  const { scene: arm } = useGLTF('/models/arm.glb')
  const parent = useRef()
  const { viewport } = useThree()

  useEffect(() => {
    arm.traverse((node) => {
      if (node.material) node.material = armMaterial
    })
  }, [arm])

  useEffect(() => {
    if (!parent.current) return

    parent.current.scale.setScalar(viewport.height * 0.035)
    parent.current.position.set(
      viewport.width * 0.24,
      viewport.height * -0.1,
      0
    )
    parent.current.rotation.set(
      MathUtils.degToRad(-45),
      MathUtils.degToRad(-135),
      MathUtils.degToRad(-45)
    )
  }, [viewport.width, viewport.height])

  return (
    <>
      <ambientLight color="#ff98a2" />
      <directionalLight color="#ff98a2" intensity={0.35} position={[-200, 150, 50]} />
      <directionalLight color="#ff98a2" intensity={0.15} position={[300, -100, 150]} />
      <Float floatIntensity={1} rotationIntensity={1}>
        <group ref={parent}>
          <primitive object={arm} />
        </group>
      </Float>
    </>
  )
}

function Content() {
  const { viewport } = useThree()

  return (
    <>
      <Particles
        width={viewport.width}
        height={viewport.height}
        depth={500}
        count={100}
        scale={500}
        size={150}
      />
      <Arm />
    </>
  )
}

export function WebGL({ render = true }) {
  return (
    <Canvas
      gl={{
        powerPreference: 'high-performance',
        antialias: true,
        alpha: true,
      }}
      dpr={[1, 2]}
      frameloop="never"
      orthographic
      camera={{ near: 0.01, far: 10000, position: [0, 0, 1000] }}
    >
      <Raf render={render} />
      <Suspense>
        <Content />
      </Suspense>
    </Canvas>
  )
}
