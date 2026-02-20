import { useEffect, useRef } from 'react';

export default function OceanScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;
    let particles: Particle[] = [];
    let rays: LightRay[] = [];

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initScene();
    };

    class Particle {
      x: number;
      y: number;
      z: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * 2 + 0.5;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.1; // Reduced horizontal jitter
        this.speedY = -Math.random() * 0.3 - 0.1; // Always move up (uni-directional)
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update(mouseX: number, mouseY: number) {
        // Reduced parallax effect to prevent glitching
        const parallaxX = (mouseX - width / 2) * 0.0002 * this.z;
        const parallaxY = (mouseY - height / 2) * 0.0002 * this.z;

        this.x += this.speedX - parallaxX;
        this.y += this.speedY - parallaxY;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(224, 242, 254, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.z, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class LightRay {
      x: number;
      width: number;
      angle: number;
      speed: number;
      opacity: number;
      offset: number;

      constructor() {
        this.x = Math.random() * width;
        this.width = Math.random() * 150 + 50; // Slightly thinner
        this.angle = Math.PI / 3 + (Math.random() - 0.5) * 0.1; // Less angle variation
        this.speed = Math.random() * 0.001 + 0.0005;
        this.opacity = Math.random() * 0.03 + 0.01; // Reduced opacity
        this.offset = Math.random() * 100;
      }

      update() {
        this.offset += this.speed;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, -100);
        ctx.rotate(this.angle);
        
        const gradient = ctx.createLinearGradient(0, 0, 0, height * 1.5);
        const pulse = Math.sin(this.offset) * 0.01; // Reduced pulse intensity
        gradient.addColorStop(0, `rgba(200, 240, 255, ${Math.max(0, this.opacity + pulse)})`);
        gradient.addColorStop(0.5, `rgba(200, 240, 255, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(-this.width / 2, 0, this.width, height * 1.5);
        ctx.restore();
      }
    }

    const initScene = () => {
      particles = [];
      rays = [];
      
      // Particles
      const pCount = Math.floor((width * height) / 10000);
      for (let i = 0; i < pCount; i++) {
        particles.push(new Particle());
      }

      // Light Rays - Reduced count
      const rCount = 3; 
      for (let i = 0; i < rCount; i++) {
        rays.push(new LightRay());
      }
    };

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      if (!ctx) return;
      
      // Draw Background
      const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, '#021024'); // Deep Ocean Blue
      bgGradient.addColorStop(1, '#000000'); // Black
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw Rays
      ctx.globalCompositeOperation = 'screen';
      rays.forEach(r => {
        r.update();
        r.draw();
      });
      ctx.globalCompositeOperation = 'source-over';

      // Draw Particles
      particles.forEach(p => {
        p.update(mouseX, mouseY);
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
