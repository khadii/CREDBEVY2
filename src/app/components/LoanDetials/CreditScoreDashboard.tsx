import React, { useEffect, useRef, useState } from 'react';

// Define the props interface
interface CreditScoreGaugeProps {
  creditScore?: number;
  lastUpdated?: string;
  pointChange?: number;
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

const CreditScoreGauge: React.FC<CreditScoreGaugeProps> = ({ 
  creditScore = 660,
  lastUpdated = "21st June 2022",
  pointChange = 24
}) => {
  const [animatedScore, setAnimatedScore] = useState<number>(400);
  const [previousScore, setPreviousScore] = useState<number>(400);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationState | null>(null);
  
  // Constants for gauge dimensions and calculations
  const [size, setSize] = useState<number>(200); // Will be adjusted dynamically
  const minScore: number = 400;
  const maxScore: number = 800;
  
  // Calculate credit score rating text and color
  const getCreditRating = (score: number): CreditRating => {
    if (score >= 800) return { text: "Excellent", color: "text-emerald-500" };
    if (score >= 740) return { text: "very Good", color: "text-emerald-500" };
    if (score >= 670) return { text: "Good", color: "text-emerald-500" };
    if (score >= 580) return { text: "Fair", color: "text-yellow-500" };
    return { text: "Poor", color: "text-red-500" };
  };
  
  const rating: CreditRating = getCreditRating(creditScore);
  
  // Normalize the score between 0 and 1
  const normalizeScore = (score: number): number => {
    const normalized = (score - minScore) / (maxScore - minScore);
    return Math.min(Math.max(normalized, 0), 1);
  };
  
  // Draw the gauge on the canvas
  const drawGauge = (ctx: CanvasRenderingContext2D, scoreValue: number, canvasSize: number): void => {
    const center: number = canvasSize / 2;
    const radius: number = canvasSize / 2 * 0.8; // 80% of half size for better proportions
    
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    const normalizedScore = normalizeScore(scoreValue);
    
    // Draw the background arcs
    drawArcs(ctx, center, radius);
    
    // Draw the knob
    const angle = Math.PI + (normalizedScore * Math.PI);
    const knobX = center + radius * Math.cos(angle);
    const knobY = center + radius * Math.sin(angle);
    
    // Draw knob outline
    ctx.beginPath();
    ctx.arc(knobX, knobY, radius * 0.08, 0, 2 * Math.PI); // Size relative to radius
    ctx.strokeStyle = '#1e3f3f';
    ctx.lineWidth = radius * 0.02; // Thickness relative to radius
    ctx.stroke();
    
    // Fill knob
    ctx.fillStyle = 'white';
    ctx.fill();
  };
  
  // Draw the gradient arcs
  const drawArcs = (ctx: CanvasRenderingContext2D, center: number, radius: number): void => {
    // Define arc segments and gaps
    const arcAngles: number[] = [0.33, 0.14, 0.14, 0.255];
    const gapAngle: number = Math.PI * 0.05;
    
    let startAngle: number = Math.PI;
    
    ctx.lineWidth = radius * 0.08; // Arc thickness relative to radius
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
  
  // Responsive sizing based on container width
  const updateSize = () => {
    if (!containerRef.current) return;
    
    // Get the width of the container
    const containerWidth = containerRef.current.clientWidth;
    
    // Calculate new size (responsive to container width)
    // Use a percentage of container width with min/max constraints
    const newSize = Math.max(
      Math.min(containerWidth * 0.9, 350), // Max size 350px, 90% of container
      180 // Min size 180px
    );
    
    setSize(newSize);
  };
  
  // Handle component mount and resize events
  useEffect(() => {
    updateSize(); // Initial size calculation
    
    // Handle window resize
    const handleResize = () => {
      updateSize();
    };
    
    window.addEventListener('resize', handleResize);
    
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
    
    // Set display size
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    
    ctx.scale(dpr, dpr);
    
    // Draw initial state
    drawGauge(ctx, animatedScore, size);
    
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
    
    drawGauge(ctx, animatedScore, size);
  }, [animatedScore, size]);
  
  // Calculate font sizes based on component size
  const scoreFontSize = `${Math.max(size * 0.12, 24)}px`;
  const ratingFontSize = `${Math.max(size * 0.05, 11)}px`;
  const labelFontSize = `${Math.max(size * 0.05, 10)}px`;
  const changeFontSize = `${Math.max(size * 0.045, 10)}px`;
  
  return (
    <div ref={containerRef} className="w-full mx-auto bg-[#EDFEFF] p-4 ">
      <div className="relative flex justify-center items-center">
        <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
          <canvas 
            ref={canvasRef} 
            className="w-full h-full"
          />
          
          {/* Score display in center */}
          <div className="absolute" style={{ 
            top: '35%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            width: '80%',
          }}>
            <div className={`font-medium ${rating.color} mb-1 text-center`} style={{ fontSize: ratingFontSize }}>
              {rating.text}
            </div>
            <div className="font-bold text-[#333333] tracking-tighter text-center" style={{ fontSize: scoreFontSize }}>
              {Math.round(animatedScore)}
            </div>
            {pointChange > 0 && (
              <div className="text-emerald-500 font-semibold mt-2 text-center" style={{ fontSize: changeFontSize }}>
                + {pointChange} pts
              </div>
            )}
            {pointChange < 0 && (
              <div className="text-red-500 font-semibold mt-2 text-center" style={{ fontSize: changeFontSize }}>
                {pointChange} pts
              </div>
            )}
          </div>
          
          {/* Min score label - responsive positioning */}
          <div className="absolute text-[#333333] font-semibold" style={{ 
            bottom: `${size * 0.25}px`, 
            left: `${size * 0.05}px`,
            fontSize: labelFontSize
          }}>
            {minScore}
          </div>
          
          {/* Max score label - responsive positioning */}
          <div className="absolute text-[#333333] font-semibold" style={{ 
            bottom: `${size * 0.25}px`, 
            right: `${size * 0.05}px`,
            fontSize: labelFontSize
          }}>
            {maxScore}
          </div>
          
          {/* Last updated text - responsive positioning */}
          <div className="absolute text-[#8C8C8C]   font-semibold text-center" style={{ 
            bottom: `${size * 0.25}px`, 
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${size * 0.8}px`,
            fontSize: '8px'
          }}>
            Last updated {lastUpdated}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditScoreGauge;