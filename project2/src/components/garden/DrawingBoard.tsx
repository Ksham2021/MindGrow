import React, { useEffect, useRef, useState } from 'react';
import { 
  Pencil, Eraser, Square, Circle, Minus, RefreshCcw, 
  Download, Palette, Save, Trash2, MousePointer, 
  Type, Image as ImageIcon, Undo, Redo, Layers
} from 'lucide-react';

interface DrawingBoardProps {
  onSave: (imageData: string) => void;
}

interface Layer {
  id: string;
  imageData: ImageData | null;
  visible: boolean;
  name: string;
}

export function DrawingBoard({ onSave }: DrawingBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pencil' | 'eraser' | 'rectangle' | 'circle' | 'line' | 'text'>('pencil');
  const [color, setColor] = useState('#FFFFFF');
  const [lineWidth, setLineWidth] = useState(2);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [layers, setLayers] = useState<Layer[]>([
    { id: '1', imageData: null, visible: true, name: 'Layer 1' }
  ]);
  const [currentLayer, setCurrentLayer] = useState(0);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [text, setText] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        setContext(ctx);
      }
    }
  }, []);

  useEffect(() => {
    if (context) {
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
    }
  }, [color, lineWidth, context]);

  useEffect(() => {
    if (context && canvasRef.current) {
      const canvas = canvasRef.current;
      const initialImageData = context.getImageData(0, 0, canvas.width, canvas.height);
      setLayers(prev => prev.map((layer, idx) => 
        idx === 0 ? { ...layer, imageData: initialImageData } : layer
      ));
    }
  }, [context]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setStartPos({ x, y });
      setIsDrawing(true);

      if (tool === 'pencil' || tool === 'eraser') {
        context.beginPath();
        context.moveTo(x, y);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (tool === 'pencil') {
      context.lineTo(x, y);
      context.stroke();
    } else if (tool === 'eraser') {
      const savedColor = context.strokeStyle;
      context.strokeStyle = '#000000';
      context.lineTo(x, y);
      context.stroke();
      context.strokeStyle = savedColor;
    } else {
      // For shapes, we need to clear and redraw
      const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.putImageData(imageData, 0, 0);

      context.beginPath();
      if (tool === 'rectangle') {
        context.rect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      } else if (tool === 'circle') {
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        context.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
      } else if (tool === 'line') {
        context.moveTo(startPos.x, startPos.y);
        context.lineTo(x, y);
      }
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (context) {
      context.closePath();
    }
  };

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  const saveDrawing = () => {
    if (canvasRef.current) {
      const imageData = canvasRef.current.toDataURL('image/png');
      onSave(imageData);
    }
  };

  const downloadDrawing = () => {
    if (canvasRef.current) {
      const link = document.createElement('a');
      link.download = 'mindgrow-artwork.png';
      link.href = canvasRef.current.toDataURL('image/png');
      link.click();
    }
  };

  const saveToHistory = () => {
    if (!context || !canvasRef.current) return;
    const currentImageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    setHistory(prev => [...prev.slice(0, historyIndex + 1), currentImageData]);
    setHistoryIndex(prev => prev + 1);
  };

  const undo = () => {
    if (historyIndex > 0 && context && canvasRef.current) {
      setHistoryIndex(prev => prev - 1);
      context.putImageData(history[historyIndex - 1], 0, 0);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1 && context && canvasRef.current) {
      setHistoryIndex(prev => prev + 1);
      context.putImageData(history[historyIndex + 1], 0, 0);
    }
  };

  const addLayer = () => {
    setLayers(prev => [
      ...prev,
      { 
        id: Date.now().toString(), 
        imageData: null, 
        visible: true, 
        name: `Layer ${prev.length + 1}` 
      }
    ]);
  };

  const toggleLayerVisibility = (index: number) => {
    setLayers(prev => prev.map((layer, idx) => 
      idx === index ? { ...layer, visible: !layer.visible } : layer
    ));
    redrawLayers();
  };

  const redrawLayers = () => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    layers.forEach(layer => {
      if (layer.visible && layer.imageData) {
        context.putImageData(layer.imageData, 0, 0);
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && context && canvasRef.current) {
      const img = new Image();
      img.onload = () => {
        context.drawImage(img, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
        saveToHistory();
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleTextTool = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (tool !== 'text') return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      setTextPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setShowTextInput(true);
    }
  };

  const addTextToCanvas = () => {
    if (!context || !text) return;
    context.font = '20px Arial';
    context.fillStyle = color;
    context.fillText(text, textPosition.x, textPosition.y);
    setText('');
    setShowTextInput(false);
    saveToHistory();
  };

  const tools = [
    { icon: <MousePointer size={20} />, name: 'pencil', label: 'Pencil' },
    { icon: <Eraser size={20} />, name: 'eraser', label: 'Eraser' },
    { icon: <Square size={20} />, name: 'rectangle', label: 'Rectangle' },
    { icon: <Circle size={20} />, name: 'circle', label: 'Circle' },
    { icon: <Minus size={20} />, name: 'line', label: 'Line' },
    { icon: <Type size={20} />, name: 'text', label: 'Text' }
  ];

  return (
    <div className="gaming-card p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {tools.map((item) => (
            <button
              key={item.name}
              onClick={() => setTool(item.name as any)}
              className={`p-2 rounded-lg transition-colors ${
                tool === item.name ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
              title={item.label}
            >
              {item.icon}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="p-2 rounded-lg hover:bg-white/10"
            title="Undo"
          >
            <Undo size={20} />
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 rounded-lg hover:bg-white/10"
            title="Redo"
          >
            <Redo size={20} />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer bg-transparent"
            title="Choose Color"
          />
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-24"
            title="Brush Size"
          />
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={addLayer}
          className="gaming-card px-3 py-1 flex items-center gap-1"
        >
          <Layers size={16} /> Add Layer
        </button>
        <div className="flex gap-2">
          {layers.map((layer, idx) => (
            <button
              key={layer.id}
              onClick={() => toggleLayerVisibility(idx)}
              className={`gaming-card px-3 py-1 ${layer.visible ? 'bg-white/20' : ''}`}
            >
              {layer.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="gaming-card px-3 py-1 cursor-pointer flex items-center gap-1">
          <ImageIcon size={16} /> Import Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-[400px] rounded-lg bg-black/50 cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onClick={handleTextTool}
      />

      {showTextInput && (
        <div
          style={{
            position: 'absolute',
            left: textPosition.x,
            top: textPosition.y,
          }}
          className="gaming-card p-2"
        >
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTextToCanvas()}
            className="bg-white/10 rounded px-2 py-1"
            autoFocus
          />
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={clearCanvas}
          className="gaming-card px-4 py-2 flex items-center gap-2 text-red-400"
          title="Clear Canvas"
        >
          <Trash2 size={20} />
          Clear
        </button>
        
        <div className="flex gap-2">
          <button
            onClick={downloadDrawing}
            className="gaming-card px-4 py-2 flex items-center gap-2"
            title="Download Artwork"
          >
            <Download size={20} />
            Download
          </button>
          <button
            onClick={saveDrawing}
            className="gaming-card px-4 py-2 flex items-center gap-2"
            title="Save to Gallery"
          >
            <Save size={20} />
            Save
          </button>
        </div>
      </div>
    </div>
  );
} 