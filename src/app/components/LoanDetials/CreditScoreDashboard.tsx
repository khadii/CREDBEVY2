import React, { useEffect, useRef, useState } from 'react';

// Define the props interface
interface CreditScoreGaugeProps {
  creditScore?: number;
}

// Define the credit rating type
interface CreditRating {
  text: string;
  color: string;
}

// Define the animation state type
interface AnimationState {
  startTime: number;
  progress: number;
}

const CreditScoreGauge: React.FC<CreditScoreGaugeProps> = ({ creditScore = 660 }) => {
  const [animatedScore, setAnimatedScore] = useState<number>(400);
  const [previousScore, setPreviousScore] = useState<number>(400);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<AnimationState | null>(null);
  
  // Constants for gauge dimensions and calculations
  const [size, setSize] = useState<number>(200); // Initial size, will be adjusted dynamically
  const center: number = size / 2;
  const radius: number = size / 2 - 8; // Adjust for stroke width
  const minScore: number = 400;
  const maxScore: number = 800;
  
  // Calculate credit score rating text and color
  const getCreditRating = (score: number): CreditRating => {
    if (score >= 750) return { text: "Excellent", color: "text-[#42BE65]" };
    if (score >= 700) return { text: "Good", color: "text-[#42BE65]" };
    if (score >= 650) return { text: "Good", color: "text-[#42BE65]" };
    if (score >= 600) return { text: "Fair", color: "text-yellow-500" };
    return { text: "Poor", color: "text-red-500" };
  };
  
  const rating: CreditRating = getCreditRating(creditScore);
  
  // Normalize the score between 0 and 1
  const normalizeScore = (score: number): number => {
    const normalized = (score - minScore) / (maxScore - minScore);
    return Math.min(Math.max(normalized, 0), 1);
  };
  
  // Draw the gauge on the canvas
  const drawGauge = (ctx: CanvasRenderingContext2D, scoreValue: number): void => {
    ctx.clearRect(0, 0, size, size);
    const normalizedScore = normalizeScore(scoreValue);
    
    // Draw the background arcs
    drawArcs(ctx);
    
    // Draw the knob
    const angle = Math.PI + (normalizedScore * Math.PI);
    const knobX = center + radius * Math.cos(angle);
    const knobY = center + radius * Math.sin(angle);
    
    // Draw knob outline
    ctx.beginPath();
    ctx.arc(knobX, knobY, 10, 0, 2 * Math.PI); // Smaller knob
    ctx.strokeStyle = '#1e3f3f';
    ctx.lineWidth = 3; // Thinner stroke
    ctx.stroke();
    
    // Fill knob
    ctx.fillStyle = 'white';
    ctx.fill();
  };
  
  // Draw the gradient arcs
  const drawArcs = (ctx: CanvasRenderingContext2D): void => {
    // Define arc segments and gaps
    const arcAngles: number[] = [0.33, 0.14, 0.14, 0.255];
    const gapAngle: number = Math.PI * 0.05;
    
    let startAngle: number = Math.PI;
    
    ctx.lineWidth = 12; // Thinner arcs
    ctx.lineCap = 'round';
    
    // Draw each segment with its own color
    // Red segment
    ctx.beginPath();
    ctx.arc(center, center, radius, startAngle, startAngle + Math.PI * arcAngles[0]);
    ctx.strokeStyle = '#f47373';
    ctx.stroke();
    
    startAngle += Math.PI * arcAngles[0] + gapAngle;
    
    // Pink segment
    ctx.beginPath();
    ctx.arc(center, center, radius, startAngle, startAngle + Math.PI * arcAngles[1]);
    ctx.strokeStyle = '#e5d0d9';
    ctx.stroke();
    
    startAngle += Math.PI * arcAngles[1] + gapAngle;
    
    // First teal segment
    ctx.beginPath();
    ctx.arc(center, center, radius, startAngle, startAngle + Math.PI * arcAngles[2]);
    ctx.strokeStyle = '#1e3f3f';
    ctx.stroke();
    
    startAngle += Math.PI * arcAngles[2] + gapAngle;
    
    // Second teal segment (lighter)
    ctx.beginPath();
    ctx.arc(center, center, radius, startAngle, startAngle + Math.PI * arcAngles[3]);
    ctx.strokeStyle = '#4bbbc1';
    ctx.stroke();
  };
  
  // Animate the score change
  const animateScore = (timestamp: number): void => {
    if (!animationRef.current) {
      animationRef.current = { startTime: timestamp, progress: 0 };
    }
    
    const elapsed = timestamp - animationRef.current.startTime;
    const duration = 1000; // Animation duration in ms
    const progress = Math.min(elapsed / duration, 1);
    
    const currentScore = previousScore + (creditScore - previousScore) * progress;
    setAnimatedScore(currentScore);
    
    if (progress < 1) {
      requestAnimationFrame(animateScore);
    } else {
      animationRef.current = null;
    }
  };
  
  // Handle window resize to adjust canvas size
  useEffect(() => {
    const handleResize = () => {
      const newSize = Math.min(window.innerWidth * 0.2, 300); // Adjust max size as needed
      setSize(newSize);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial size

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Initialize canvas and start animation when score changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas DPI for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    
    // Draw initial state
    drawGauge(ctx, animatedScore);
    
    // Animate when credit score changes
    if (creditScore !== previousScore) {
      setPreviousScore(animatedScore);
      requestAnimationFrame(animateScore);
    }
  }, [creditScore, animatedScore, size]);
  
  // Update canvas when animated score changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    drawGauge(ctx, animatedScore);
  }, [animatedScore, size]);
  
  return (
    <div className="relative w-full max-w-md mx-auto bg-[#f0fafc] p-4">
      <div className="relative" style={{ width: size, height: size }}>
        <canvas 
          ref={canvasRef} 
          width={size} 
          height={size} 
          className="w-full h-auto"
        />
        
        {/* Score display in center */}
        <div className="absolute" style={{ 
          top: '30%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)'
        }}>
          <div className={`text-[11px] font-medium ${rating.color} mb-1 text-center`}>
            {rating.text}
          </div>
          <div className="text-4xl font-bold text-[#333333] tracking-tighter text-center">
            {Math.round(animatedScore)}
          </div>
          <div className="text-[#42BE65] text-xs font-semibold mt-2 text-center">
            + 24 pts
          </div>
        </div>
        
        {/* Min score label - fixed position */}
        <div className="absolute text-[#333333] text-sm font-semibold" style={{ 
          bottom: size * 0.35 + 'px', 
          left: size * 0.00 + 'px'
        }}>
          400
        </div>
        
        {/* Max score label - fixed position */}
        <div className="absolute text-[#333333] text-sm font-semibold" style={{ 
          bottom: size * 0.35 + 'px', 
          right: size * 0.00 + 'px'
        }}>
          800
        </div>
        
        {/* Last updated text - fixed position and centered */}
        <div className="absolute  text-[#8C8C8C] text-xs font-semibold text-center" style={{ 
           bottom: size * 0.35 + 'px', 
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'auto'
        }}>
          Last updated 21st June 2022
        </div>
      </div>
    </div>
  );
};

export default CreditScoreGauge;