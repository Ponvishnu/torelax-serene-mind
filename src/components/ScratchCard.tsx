import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Gift, PartyPopper } from "lucide-react";

interface ScratchCardProps {
  onRevealed: () => void;
}

export default function ScratchCard({ onRevealed }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratching, setIsScratching] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Gold foil gradient overlay
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#C9A84C");
    gradient.addColorStop(0.3, "#F4D675");
    gradient.addColorStop(0.5, "#E8C84A");
    gradient.addColorStop(0.7, "#F4D675");
    gradient.addColorStop(1, "#C9A84C");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Scratch text
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.font = "bold 18px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("✨ Scratch here to reveal! ✨", canvas.width / 2, canvas.height / 2 - 8);
    ctx.font = "14px system-ui, sans-serif";
    ctx.fillText("Use your finger or mouse", canvas.width / 2, canvas.height / 2 + 18);
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener("resize", initCanvas);
    return () => window.removeEventListener("resize", initCanvas);
  }, [initCanvas]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const scratch = (pos: { x: number; y: number }) => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = 45;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (lastPoint.current) {
      ctx.beginPath();
      ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
    ctx.fill();

    lastPoint.current = pos;
    checkPercentage();
  };

  const checkPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) transparent++;
    }
    const pct = (transparent / (imageData.data.length / 4)) * 100;
    setPercentage(pct);

    if (pct > 45 && !revealed) {
      setRevealed(true);
      onRevealed();
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsScratching(true);
    lastPoint.current = getPos(e);
    scratch(getPos(e));
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isScratching) return;
    scratch(getPos(e));
  };

  const handleEnd = () => {
    setIsScratching(false);
    lastPoint.current = null;
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden"
        style={{ height: 220 }}
      >
        {/* Hidden reward underneath */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6"
          style={{
            background: "linear-gradient(135deg, hsl(28, 89%, 60%), hsl(28, 89%, 50%))",
          }}
        >
          <div className="absolute top-2 right-2 opacity-10">
            <PartyPopper className="w-24 h-24 text-white" />
          </div>
          <div className="flex items-center gap-3 mb-3 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Gift className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="font-accent text-xs text-white/80 uppercase tracking-wider">You Won!</p>
              <p className="font-display text-4xl font-bold text-white">₹1,000</p>
            </div>
          </div>
          <p className="font-body text-sm text-white/90 text-center relative z-10">
            Cashback reward 🎉
          </p>
          <p className="font-body text-xs text-white/70 text-center mt-1 relative z-10">
            Will be sent directly to your bank account
          </p>
        </div>

        {/* Scratch canvas overlay */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 z-10 rounded-2xl ${revealed ? "pointer-events-none opacity-0 transition-opacity duration-700" : "cursor-grab active:cursor-grabbing"}`}
          style={{ touchAction: "none" }}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        />
      </div>

      {/* Revealed celebration */}
      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-center"
        >
          <p className="font-body text-sm text-primary font-semibold">
            🎊 Congratulations! You've won ₹1000 cashback!
          </p>
        </motion.div>
      )}
    </div>
  );
}
