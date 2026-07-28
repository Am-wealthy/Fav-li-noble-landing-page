import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type ParticleTopology = 'torus' | 'wave' | 'galaxy' | 'hypercube';
export type ParticleTheme = 'cyber' | 'gold' | 'emerald' | 'space';

interface ParticleBackgroundProps {
  topology: ParticleTopology;
  theme: ParticleTheme;
  density: number; // e.g. 4000
  speed: number; // e.g. 1
  shockwaveTrigger: number; // incrementing counter to trigger shockwave
  onCanvasClick?: (e: React.MouseEvent<HTMLCanvasElement>) => void;
}

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  topology,
  theme,
  density,
  speed,
  shockwaveTrigger,
  onCanvasClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Three.js object references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlePointsRef = useRef<THREE.Points | null>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);
  
  // Animation state refs
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const shockwaveRef = useRef<{ radius: number; active: boolean; intensity: number }>({ radius: 0, active: false, intensity: 0 });
  
  // Position buffer target arrays for smooth morphing transitions
  const targetPositionsRef = useRef<Float32Array | null>(null);
  const currentPositionsRef = useRef<Float32Array | null>(null);
  const initialPositionsRef = useRef<Float32Array | null>(null);
  const colorsRef = useRef<Float32Array | null>(null);

  // Theme color definitions
  const getThemeColors = (themeName: ParticleTheme) => {
    switch (themeName) {
      case 'gold':
        return [new THREE.Color('#eab308'), new THREE.Color('#f59e0b'), new THREE.Color('#fbbf24'), new THREE.Color('#ef4444')];
      case 'emerald':
        return [new THREE.Color('#10b981'), new THREE.Color('#34d399'), new THREE.Color('#06b6d4'), new THREE.Color('#a7f3d0')];
      case 'space':
        return [new THREE.Color('#818cf8'), new THREE.Color('#c084fc'), new THREE.Color('#f472b6'), new THREE.Color('#f8fafc')];
      case 'cyber':
      default:
        return [new THREE.Color('#06b6d4'), new THREE.Color('#8b5cf6'), new THREE.Color('#3b82f6'), new THREE.Color('#67e8f9')];
    }
  };

  // Generate target position data for different topologies
  const generatePositions = (top: ParticleTopology, count: number): Float32Array => {
    const arr = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      if (top === 'torus') {
        // Parametric Torus Knot geometry
        const u = (i / count) * Math.PI * 2 * 6;
        const v = (i / count) * Math.PI * 2;
        const p = 2;
        const q = 3;
        const r = 22 + Math.sin(v) * 6;
        
        const x = (r + 8 * Math.cos(q * u)) * Math.cos(p * u);
        const y = (r + 8 * Math.cos(q * u)) * Math.sin(p * u);
        const z = 8 * Math.sin(q * u) + (Math.random() - 0.5) * 4;
        
        arr[idx] = x * 1.8;
        arr[idx + 1] = y * 1.8;
        arr[idx + 2] = z * 1.8;
      } else if (top === 'wave') {
        // 3D Matrix Wave Sheet
        const rows = Math.floor(Math.sqrt(count));
        const cols = Math.floor(count / rows);
        const r = Math.floor(i / cols);
        const c = i % cols;
        
        const x = (c - cols / 2) * 2.8;
        const z = (r - rows / 2) * 2.8;
        const y = Math.sin(x * 0.05) * Math.cos(z * 0.05) * 12 + (Math.random() - 0.5) * 2;
        
        arr[idx] = x;
        arr[idx + 1] = y - 10;
        arr[idx + 2] = z;
      } else if (top === 'galaxy') {
        // Logarithmic Spiral Arms
        const arms = 4;
        const armIndex = i % arms;
        const distance = Math.pow(Math.random(), 1.5) * 60;
        const angle = distance * 0.15 + (armIndex * (Math.PI * 2 / arms)) + (Math.random() - 0.5) * 0.4;
        
        const x = Math.cos(angle) * distance;
        const z = Math.sin(angle) * distance;
        const y = (Math.random() - 0.5) * (20 - distance * 0.25);
        
        arr[idx] = x * 1.2;
        arr[idx + 1] = y;
        arr[idx + 2] = z * 1.2;
      } else if (top === 'hypercube') {
        // 3D Lattice Box
        const side = Math.cbrt(count);
        const ix = i % side;
        const iy = Math.floor((i / side) % side);
        const iz = Math.floor(i / (side * side));
        
        const spacing = 4.5;
        const offset = (side * spacing) / 2;
        
        const x = ix * spacing - offset + (Math.random() - 0.5) * 1.5;
        const y = iy * spacing - offset + (Math.random() - 0.5) * 1.5;
        const z = iz * spacing - offset + (Math.random() - 0.5) * 1.5;
        
        arr[idx] = x;
        arr[idx + 1] = y;
        arr[idx + 2] = z;
      }
    }
    
    return arr;
  };

  // Helper to create circle particle texture
  const createParticleTexture = (): THREE.Texture => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  // Initialize Three.js Scene
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x030508, 0.008);

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 70;
    camera.position.y = 10;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Geometry buffers
    const count = density;
    const geometry = new THREE.BufferGeometry();
    geometryRef.current = geometry;

    const initialPos = generatePositions(topology, count);
    const currentPos = new Float32Array(initialPos);
    const targetPos = new Float32Array(initialPos);
    const colors = new Float32Array(count * 3);

    initialPositionsRef.current = initialPos;
    currentPositionsRef.current = currentPos;
    targetPositionsRef.current = targetPos;
    colorsRef.current = colors;

    // Apply colors
    const themeCols = getThemeColors(theme);
    for (let i = 0; i < count; i++) {
      const col = themeCols[i % themeCols.length];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(currentPos, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle material
    const particleTexture = createParticleTexture();
    const material = new THREE.PointsMaterial({
      size: 2.2,
      map: particleTexture,
      transparent: true,
      opacity: 0.85,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    particlePointsRef.current = points;

    // Window resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    // Mouse movement listener
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = x * 20;
      mouseRef.current.targetY = y * 20;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * speed;

      // Smooth mouse interpolation (lerp)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (points) {
        // Continuous rotation
        points.rotation.y = elapsedTime * 0.08;
        points.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1 + (mouseRef.current.y * 0.005);
        points.rotation.z = Math.cos(elapsedTime * 0.03) * 0.05 + (mouseRef.current.x * 0.005);
      }

      // Shockwave animation decay
      if (shockwaveRef.current.active) {
        shockwaveRef.current.radius += 1.8 * speed;
        shockwaveRef.current.intensity *= 0.95;
        if (shockwaveRef.current.intensity < 0.01) {
          shockwaveRef.current.active = false;
        }
      }

      // Update positions buffer
      if (geometryRef.current && currentPositionsRef.current && targetPositionsRef.current) {
        const positions = geometryRef.current.attributes.position.array as Float32Array;
        const targets = targetPositionsRef.current;
        const pCount = positions.length / 3;

        for (let i = 0; i < pCount; i++) {
          const idx = i * 3;

          // Smooth lerp positions towards target topology
          positions[idx] += (targets[idx] - positions[idx]) * 0.04;
          positions[idx + 1] += (targets[idx + 1] - positions[idx + 1]) * 0.04;
          positions[idx + 2] += (targets[idx + 2] - positions[idx + 2]) * 0.04;

          // Topology specific wave oscillation overlay
          if (topology === 'wave') {
            positions[idx + 1] += Math.sin(elapsedTime * 2 + positions[idx] * 0.1) * 0.15;
          } else if (topology === 'torus') {
            positions[idx] += Math.cos(elapsedTime + i) * 0.03;
          }

          // Shockwave displacement force
          if (shockwaveRef.current.active) {
            const dx = positions[idx];
            const dy = positions[idx + 1];
            const dz = positions[idx + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const shockDiff = Math.abs(dist - shockwaveRef.current.radius);

            if (shockDiff < 10) {
              const force = (1 - shockDiff / 10) * shockwaveRef.current.intensity * 3;
              positions[idx] += (dx / (dist || 1)) * force;
              positions[idx + 1] += (dy / (dist || 1)) * force;
              positions[idx + 2] += (dz / (dist || 1)) * force;
            }
          }
        }

        geometryRef.current.attributes.position.needsUpdate = true;
      }

      // Render frame
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Morph positions when topology changes
  useEffect(() => {
    if (!geometryRef.current) return;
    const count = density;
    const newTargets = generatePositions(topology, count);
    targetPositionsRef.current = newTargets;
  }, [topology, density]);

  // Update theme colors when theme changes
  useEffect(() => {
    if (!geometryRef.current) return;
    const count = density;
    const themeCols = getThemeColors(theme);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const col = themeCols[i % themeCols.length];
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    geometryRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometryRef.current.attributes.color.needsUpdate = true;
  }, [theme, density]);

  // Trigger shockwave when prop increments
  useEffect(() => {
    if (shockwaveTrigger > 0) {
      shockwaveRef.current = {
        radius: 1,
        active: true,
        intensity: 2.5
      };
    }
  }, [shockwaveTrigger]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-auto">
      <canvas
        ref={canvasRef}
        onClick={onCanvasClick}
        className="w-full h-full block cursor-crosshair"
      />
      {/* Subtle grid line backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      {/* Scanline texture */}
      <div className="absolute inset-0 scanline-overlay opacity-30 pointer-events-none" />
      {/* Radial vignette mask */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,5,8,0.85)_100%)] pointer-events-none" />
    </div>
  );
};
