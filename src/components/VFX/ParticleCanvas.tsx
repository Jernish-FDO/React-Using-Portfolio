import React, { useEffect, useRef } from 'react';

const ParticleCanvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let particlesArray: Particle[] = [];
        let animationFrameId: number;
        const mouse = { x: -1000, y: -1000, radius: 150 };

        const init = () => {
            if (!canvas) return;
            particlesArray = [];
            // Responsive particle count: fewer on mobile
            const isMobile = window.innerWidth < 768;
            const densityDivisor = isMobile ? 15000 : 9000;
            const count = (canvas.width * canvas.height) / densityDivisor;

            for (let i = 0; i < count; i++) {
                const size = Math.random() * 2 + 1;
                const x = Math.random() * (canvas.width - size * 2) + size * 2;
                const y = Math.random() * (canvas.height - size * 2) + size * 2;
                const dx = (Math.random() * 1) - 0.5;
                const dy = (Math.random() * 1) - 0.5;
                particlesArray.push(new Particle(x, y, dx, dy, size, ctx, canvas, mouse));
            }
        };

        let resizeTimeout: ReturnType<typeof setTimeout>;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (!canvas) return;
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                init();
            }, 200); // Debounce 200ms
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        function connect() {
            if (!canvas || !ctx) return;
            const maxDist = (canvas.width / 7) * (canvas.height / 7);
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    const dist =
                        (particlesArray[a].x - particlesArray[b].x) ** 2 +
                        (particlesArray[a].y - particlesArray[b].y) ** 2;

                    if (dist < maxDist) {
                        const opacity = 1 - dist / 20000;
                        ctx.strokeStyle = 'rgba(56, 189, 248, ' + opacity + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            if (!canvas || !ctx) return;
            animationFrameId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        // Initial setup
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
            animate();
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(resizeTimeout);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            id="canvas-container"
            className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        />
    );
};

class Particle {
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    mouse: { x: number; y: number; radius: number };

    constructor(
        x: number,
        y: number,
        dx: number,
        dy: number,
        size: number,
        ctx: CanvasRenderingContext2D,
        canvas: HTMLCanvasElement,
        mouse: { x: number; y: number; radius: number }
    ) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.ctx = ctx;
        this.canvas = canvas;
        this.mouse = mouse;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        this.ctx.fillStyle = '#38bdf8';
        this.ctx.fill();
    }

    update() {
        if (this.x > this.canvas.width || this.x < 0) this.dx = -this.dx;
        if (this.y > this.canvas.height || this.y < 0) this.dy = -this.dy;

        // Interactivity
        const dx = this.mouse.x - this.x;
        const dy = this.mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
            if (this.mouse.x < this.x && this.x < this.canvas.width - 10) this.x += 2;
            if (this.mouse.x > this.x && this.x > 10) this.x -= 2;
            if (this.mouse.y < this.y && this.y < this.canvas.height - 10) this.y += 2;
            if (this.mouse.y > this.y && this.y > 10) this.y -= 2;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

export default ParticleCanvas;
