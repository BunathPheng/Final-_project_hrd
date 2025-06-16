/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { ErrorBoundary } from "react-error-boundary";

type ViewArtifactProps = {
    src: string;
    isMove?: boolean;
    minDistance?: number;
    maxDistance?: number;
    isZoom?: boolean;
    showCircle?: boolean;
    circleRadius?: number;
    modelId?: string; // Add unique identifier for each model
};

const ViewArtifact = ({
    src,
    isMove = true,
    minDistance = 20,
    maxDistance = 30,
    isZoom = false,
    showCircle = false,
    circleRadius = 12,
    modelId,
}: ViewArtifactProps) => {
    const [cameraInitialized, setCameraInitialized] = useState(false);

    return (
        <div className="w-full h-full cursor-grab">
            <Canvas
                shadows
                camera={{ fov: 75, near: 0.1, far: 1000, position: [0, 0, 10] }}
            >
                <ambientLight intensity={2} />
                <directionalLight
                    position={[10, 10, 10]}
                    intensity={2}
                    castShadow
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />
                <directionalLight position={[-10, 10, -10]} intensity={2} />
                <directionalLight position={[0, -10, 0]} intensity={2} />

                <ErrorBoundary fallback={<FallbackError />}>
                    <Suspense fallback={<FallbackLoading />}>
                        <Model
                            src={src}
                            isMove={isMove}
                            modelId={modelId}
                            onCameraInit={() => setCameraInitialized(true)}
                        />
                        {showCircle && <WhiteCircle radius={circleRadius} />}
                    </Suspense>
                </ErrorBoundary>

                {!isZoom ? (
                    <OrbitControls
                        enableDamping
                        dampingFactor={0.05}
                        minDistance={minDistance}
                        maxDistance={maxDistance}
                        target={[0, 0, 0]}
                        enabled={cameraInitialized} // Prevent controls until camera is set
                    />
                ) : (
                    <ZoomControls
                        minDistance={minDistance}
                        maxDistance={maxDistance}
                        enabled={cameraInitialized}
                    />
                )}
            </Canvas>
        </div>
    );
};

const WhiteCircle = ({ radius }: { radius: number }) => {
    const circleRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (circleRef.current) {
            circleRef.current.rotation.x = -Math.PI / 2;
            circleRef.current.position.y = -15;
            circleRef.current.scale.set(1.5, 0.8, 0.8);
        }
    }, []);

    return (
        <mesh ref={circleRef}>
            <ringGeometry args={[radius - 0.1, radius, 228]} />
            <meshBasicMaterial
                color="white"
                transparent
                opacity={0.9}
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    );
};

const ZoomControls = ({
    minDistance,
    maxDistance,
    enabled = true,
}: {
    minDistance: number;
    maxDistance: number;
    enabled?: boolean;
}) => {
    const { camera, gl, raycaster, scene } = useThree();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const controlsRef = useRef<any>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const zoomDistance = useRef(minDistance);

    useEffect(() => {
        if (!enabled) return;

        const handleDoubleClick = (event: MouseEvent) => {
            if (isAnimating || !controlsRef.current) return;

            event.preventDefault();
            setIsAnimating(true);
            const controls = controlsRef.current;

            const rect = gl.domElement.getBoundingClientRect();
            const mouse = new THREE.Vector2(
                ((event.clientX - rect.left) / rect.width) * 2 - 1,
                -((event.clientY - rect.top) / rect.height) * 2 + 1
            );

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);

            let targetPoint: THREE.Vector3;

            if (intersects.length > 0) {
                targetPoint = intersects[0].point.clone();
            } else {
                const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
                const planeIntersect = new THREE.Vector3();
                raycaster.ray.intersectPlane(plane, planeIntersect);
                targetPoint = planeIntersect || controls.target.clone();
            }

            const direction = new THREE.Vector3();
            direction.subVectors(camera.position, targetPoint).normalize();
            const targetCameraPosition = targetPoint
                .clone()
                .add(direction.multiplyScalar(zoomDistance.current));

            const startCameraPosition = camera.position.clone();
            const startTarget = controls.target.clone();
            const startTime = Date.now();
            const duration = 800;

            const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeInOutCubic = (t: number) =>
                    t < 0.5
                        ? 4 * t * t * t
                        : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

                const easedProgress = easeInOutCubic(progress);

                camera.position.lerpVectors(
                    startCameraPosition,
                    targetCameraPosition,
                    easedProgress
                );
                controls.target.lerpVectors(startTarget, targetPoint, easedProgress);
                controls.update();

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setIsAnimating(false);
                }
            };

            animate();
        };

        gl.domElement.addEventListener("dblclick", handleDoubleClick);
        return () => {
            gl.domElement.removeEventListener("dblclick", handleDoubleClick);
        };
    }, [camera, gl, raycaster, scene, isAnimating, enabled]);

    return (
        <OrbitControls
            ref={controlsRef}
            enableDamping
            dampingFactor={0.05}
            minDistance={minDistance}
            maxDistance={maxDistance}
            target={[0, 0, 0]}
            enabled={enabled}
        />
    );
};

const Model = ({
    src,
    isMove,
    modelId,
    onCameraInit
}: {
    src: string;
    isMove: boolean;
    modelId?: string;
    onCameraInit?: () => void;
}) => {
    // Handle empty src case
    if (!src || src.trim() === '') {
        return <FallbackError />;
    }

    const gltf = useLoader(GLTFLoader, src);
    const groupRef = useRef<THREE.Group>(null);
    const { camera } = useThree();
    const [cameraSet, setCameraSet] = useState(false);

    // Use a ref to track if this is the first model or if camera should be repositioned
    const shouldSetCamera = useRef(!modelId || modelId === "primary");

    useEffect(() => {
        if (!groupRef.current || !gltf?.scene) return;

        groupRef.current.clear();
        const modelClone = gltf.scene.clone();

        // Center the model
        const box = new THREE.Box3().setFromObject(modelClone);
        const center = new THREE.Vector3();
        const size = new THREE.Vector3();
        box.getCenter(center);
        box.getSize(size);
        modelClone.position.sub(center);

        // Scale the model consistently
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 35 / maxDim;
        modelClone.scale.setScalar(scale);

        groupRef.current.add(modelClone);

        // Only set camera position for the primary model or first model
        if (shouldSetCamera.current && !cameraSet) {
            const distance = 40; // Fixed distance instead of based on model size
            camera.position.set(distance * 0, distance * 0.5, distance);
            camera.lookAt(0, 0, 0);
            camera.updateProjectionMatrix();
            setCameraSet(true);
            onCameraInit?.();
        } else if (!shouldSetCamera.current) {
            // For secondary models, just notify that they're ready
            onCameraInit?.();
        }
    }, [gltf, camera, cameraSet, modelId, onCameraInit]);

    useFrame(() => {
        if (isMove && groupRef.current) {
            groupRef.current.rotation.y += 0.003;
        }
    });

    return <group ref={groupRef} />;
};

const FallbackLoading = () => {
    return (
        <Html center>
            <div style={{
                width: 50,
                height: 50,
                border: '6px solid #e0e0e0',
                borderTop: '6px solid #b50000',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
            }} />
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </Html>
    );
};

const FallbackError = () => {
    return (
        <Html center>
            <div style={{
                textAlign: 'center',
                color: '#ff6b6b',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                fontWeight: '600',
                background: 'rgba(255, 255, 255, 1)',
                padding: '20px 24px',
                borderRadius: '12px',
                border: '2px solid #ff6b6b',
                boxShadow: '0 4px 20px rgba(255, 107, 107, 0.2)',
                backdropFilter: 'blur(10px)',
                pointerEvents: 'none',
                userSelect: 'none',
                minWidth: '200px'
            }}>
                <div style={{ fontSize: '18px', marginBottom: '4px', color: '#b50000' }}>
                    Model Error
                </div>
                <div style={{ fontSize: '14px', opacity: 1, color: '#4b4b4b' }}>
                    Failed to load 3D content
                </div>
            </div>
        </Html>
    );
};

export default ViewArtifact;
