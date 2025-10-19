import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Play, Sparkles, Camera, Eraser, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface CodeExample {
  pattern: string[];
  keywords: string[];
  code: string;
  output: string;
}

const javaExamples: CodeExample[] = [
  {
    pattern: ['system', 'out', 'print'],
    keywords: ['system', 'out', 'print', 'println', 'sysout', 'sout'],
    code: `System.out.println("Hello");`,
    output: "Hello"
  },
  {
    pattern: ['int', 'sum', 'add'],
    keywords: ['int', 'sum', 'add', 'plus', '+', '10', '20'],
    code: `int sum = 10 + 20;`,
    output: "30"
  },
  {
    pattern: ['string', 'name'],
    keywords: ['string', 'str', 'name', 'text'],
    code: `String name = "Java";`,
    output: "Java"
  },
  {
    pattern: ['if', 'true', 'false'],
    keywords: ['if', 'true', 'false', 'boolean', 'bool'],
    code: `if(true) System.out.println("OK");`,
    output: "OK"
  }
];

// Levenshtein distance for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const len1 = str1.length;
  const len2 = str2.length;
  const matrix: number[][] = [];

  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[len1][len2];
}

// Calculate similarity score (0 to 1, higher is better)
function similarityScore(str1: string, str2: string): number {
  const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
  const maxLen = Math.max(str1.length, str2.length);
  return maxLen === 0 ? 1 : 1 - distance / maxLen;
}

// Normalize text for better matching
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .replace(/0/g, 'o') // Common OCR error: 0 -> O
    .replace(/1/g, 'i') // Common OCR error: 1 -> I/l
    .replace(/5/g, 's') // Common OCR error: 5 -> S
    .trim();
}

export function OCRDemo() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [recognizedCode, setRecognizedCode] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const apiKey = "AIzaSyCfXaX38uD0HTP4hPf4xk_7Srlcu1R-_T0";

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#8B5CF6';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    setRecognizedCode("");
    setRecognizedText("");
    setOutput("");
    setCurrentStep(1);
  };

  // Initialize canvas with white background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const analyzeDrawing = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;



    setIsAnalyzing(true);
    setRecognizedCode("");
    setRecognizedText("");
    setOutput("");
    setCurrentStep(2);

    try {
      const imageData = canvas.toDataURL('image/png');
      
      // Initialize Gemini AI
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      // Convert base64 to proper format for Gemini
      const base64Data = imageData.split(',')[1];
      
      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: "image/png",
        },
      };

      const prompt = "이 이미지에 손으로 쓴 텍스트가 있어요. 정확하게 텍스트만 추출해서 보여주세요. 설명 없이 인식된 텍스트만 출력하세요.";

      const result = await model.generateContent([prompt, imagePart]);
      const response = await result.response;
      const text = response.text().trim();
      
      setRecognizedText(text);
      
      if (!text || text.length < 2) {
        setIsAnalyzing(false);
        setRecognizedCode("// AI가 텍스트를 인식하지 못했어요 😅\n// 더 크고 명확하게 써보세요!\n// 예: System.out.println(\"Hello\");");
        return;
      }

      const normalizedText = normalizeText(text);
      
      // Find best matching Java code with improved fuzzy matching
      let bestMatch = javaExamples[0];
      let bestScore = 0;

      for (const example of javaExamples) {
        let score = 0;
        
        // Check for exact keyword matches (high weight)
        for (const keyword of example.keywords) {
          const normalizedKeyword = normalizeText(keyword);
          
          // Exact match
          if (normalizedText.includes(normalizedKeyword)) {
            score += 10;
          }
          // Partial match
          else if (normalizedKeyword.length > 3 && normalizedText.includes(normalizedKeyword.substring(0, 4))) {
            score += 5;
          }
          // Fuzzy match using similarity
          else {
            const words = normalizedText.split(' ');
            for (const word of words) {
              if (word.length > 2) {
                const similarity = similarityScore(word, normalizedKeyword);
                if (similarity > 0.6) { // 60% similarity threshold
                  score += Math.round(similarity * 7);
                }
              }
            }
          }
        }
        
        // Check for common Java patterns
        if (normalizedText.match(/sys.*out|print|println/i)) score += 8;
        if (normalizedText.match(/for|loop|while/i)) score += 8;
        if (normalizedText.match(/int|integer|num/i)) score += 6;
        if (normalizedText.match(/string|str|text/i)) score += 6;
        if (normalizedText.match(/sum|add|\+|plus/i)) score += 6;
        if (normalizedText.match(/\d+/)) score += 3; // Contains numbers
        
        if (score > bestScore) {
          bestScore = score;
          bestMatch = example;
        }
      }

      setIsAnalyzing(false);
      
      // Type out the recognized text directly
      setIsTyping(true);
      let typedText = "";
      
      // Show what was recognized
      const header = `// ✨ 인식된 손글씨:\n`;
      for (let i = 0; i < header.length; i++) {
        typedText += header[i];
        setRecognizedCode(typedText);
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      
      // Type the actual recognized text
      for (let i = 0; i < text.length; i++) {
        typedText += text[i];
        setRecognizedCode(typedText);
        await new Promise(resolve => setTimeout(resolve, 30));
      }
      
      setIsTyping(false);
      
      // Check if we can match to an example for execution (silently in background)
      if (bestScore < 8) {
        // Add hint if no match found
        const hint = `\n\n// ⚠️ 실행 가능한 Java 코드를 찾지 못했어요\n// 예: System.out.println("Hello") 같은 완전한 코드를 써보세요!`;
        setRecognizedCode(typedText + hint);
      }

    } catch (error) {
      console.error('Gemini AI Error:', error);
      setIsAnalyzing(false);
      setRecognizedCode("// AI 인식 중 오류가 발생했어요 😅\n// API 키가 올바른지 확인해주세요!\n// https://aistudio.google.com/app/apikey");
    }
  };

  const handleRunCode = async () => {
    if (!recognizedCode || recognizedCode.includes('실행 가능한') || recognizedCode.includes('오류')) return;
    
    setIsRunning(true);
    setOutput("");
    setCurrentStep(3);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Find matching output based on recognized code
    const normalizedText = normalizeText(recognizedText);
    let matchedExample = javaExamples[0];
    let maxScore = 0;
    
    for (const example of javaExamples) {
      let score = 0;
      for (const keyword of example.keywords) {
        if (normalizedText.includes(normalizeText(keyword))) {
          score += 10;
        }
      }
      if (score > maxScore) {
        maxScore = score;
        matchedExample = example;
      }
    }
    
    const result = matchedExample.output;
    let currentOutput = "";
    
    for (let i = 0; i < result.length; i++) {
      currentOutput += result[i];
      setOutput(currentOutput);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    setIsRunning(false);
  };

  return (
    <div className="py-32 px-6 bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 right-10 text-9xl opacity-5"
      >
        ✍️
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="text-7xl mb-4">✍️</div>
          <h2 className="mb-4 text-4xl md:text-5xl tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              손코딩 OCR 체험하기! 🎮
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Google Gemini AI가 손으로 쓴 Java 코드를 인식하고 바로 실행해보세요! 🤖✨
          </p>
        </motion.div>

        {/* 3 Step Process Cards - Highlighted */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className={`p-8 text-center transition-all duration-500 border-4 ${
              currentStep === 1 
                ? 'bg-gradient-to-br from-pink-200 to-pink-300 border-pink-400 shadow-2xl scale-105' 
                : currentStep > 1
                ? 'bg-gradient-to-br from-green-100 to-green-200 border-green-400'
                : 'bg-gradient-to-br from-pink-100 to-pink-200 border-white'
            }`}>
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 shadow-lg"
                animate={currentStep === 1 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1, repeat: currentStep === 1 ? Infinity : 0 }}
              >
                {currentStep > 1 ? (
                  <Check size={32} className="text-green-500" />
                ) : (
                  <span className="text-3xl">✍️</span>
                )}
              </motion.div>
              <div className="text-sm mb-2 opacity-75">STEP 1</div>
              <h4 className="mb-2 text-xl">손으로 쓰기</h4>
              <p className="text-sm text-gray-700">Java 코드를 종이에 쓰듯이 그려보세요</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className={`p-8 text-center transition-all duration-500 border-4 ${
              currentStep === 2 
                ? 'bg-gradient-to-br from-blue-200 to-blue-300 border-blue-400 shadow-2xl scale-105' 
                : currentStep > 2
                ? 'bg-gradient-to-br from-green-100 to-green-200 border-green-400'
                : 'bg-gradient-to-br from-blue-100 to-blue-200 border-white'
            }`}>
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 shadow-lg"
                animate={currentStep === 2 ? { rotate: 360 } : {}}
                transition={{ duration: 2, repeat: currentStep === 2 ? Infinity : 0, ease: "linear" }}
              >
                {currentStep > 2 ? (
                  <Check size={32} className="text-green-500" />
                ) : (
                  <span className="text-3xl">🔍</span>
                )}
              </motion.div>
              <div className="text-sm mb-2 opacity-75">STEP 2</div>
              <h4 className="mb-2 text-xl">AI가 인식</h4>
              <p className="text-sm text-gray-700">OCR 기술로 손글씨를 자동 인식해요</p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className={`p-8 text-center transition-all duration-500 border-4 ${
              currentStep === 3 
                ? 'bg-gradient-to-br from-purple-200 to-purple-300 border-purple-400 shadow-2xl scale-105' 
                : 'bg-gradient-to-br from-purple-100 to-purple-200 border-white'
            }`}>
              <motion.div 
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white mb-4 shadow-lg"
                animate={currentStep === 3 ? { y: [0, -10, 0] } : {}}
                transition={{ duration: 0.6, repeat: currentStep === 3 ? Infinity : 0 }}
              >
                <span className="text-3xl">🚀</span>
              </motion.div>
              <div className="text-sm mb-2 opacity-75">STEP 3</div>
              <h4 className="mb-2 text-xl">바로 실행</h4>
              <p className="text-sm text-gray-700">인식된 코드를 즉시 실행하고 결과 확인!</p>
            </Card>
          </motion.div>
        </div>

        {/* Main Demo Area */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: Canvas Input */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-white border-4 border-purple-200 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  손글씨로 코드 작성 ✍️
                </h3>
                <div className="flex gap-2">
                  <Button
                    onClick={clearCanvas}
                    variant="outline"
                    size="sm"
                    className="gap-2 border-2"
                  >
                    <Eraser size={18} />
                    초기화
                  </Button>
                </div>
              </div>

              {/* Canvas */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-4 border-dashed border-purple-300 mb-6">
                <canvas
                  ref={canvasRef}
                  width={600}
                  height={300}
                  className="w-full bg-white rounded-xl border-4 border-purple-200 cursor-crosshair touch-none shadow-inner"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
              </div>

              <div className="space-y-3">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <p className="text-sm mb-2">💡 <strong>써볼 만한 간단한 Java 코드:</strong></p>
                  <div className="text-xs space-y-1 font-mono text-gray-700">
                    <p>• System.out.println("Hello");</p>
                    <p>• int sum = 10 + 20;</p>
                    <p>• String name = "Java";</p>
                    <p>• if(true) System.out.println("OK");</p>
                  </div>
                </div>

                <Button
                  onClick={analyzeDrawing}
                  size="lg"
                  className="w-full gap-3 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 text-lg py-6"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        🔍
                      </motion.div>
                      손글씨 분석 중...
                    </>
                  ) : (
                    <>
                      <Camera size={24} />
                      손글씨 인식 시작! 🚀
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Right: Output */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 bg-white border-4 border-blue-200 shadow-2xl h-full flex flex-col">
              <h3 className="mb-6 text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                인식 결과 & 실행 🎯
              </h3>

              {/* OCR Analysis Animation */}
              <AnimatePresence>
                {isAnalyzing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center flex-1"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="text-8xl mb-6"
                    >
                      🔍
                    </motion.div>
                    <p className="text-2xl mb-4">AI가 분석 중...</p>
                    <div className="flex gap-3">
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-4 h-4 bg-purple-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-4 h-4 bg-pink-400 rounded-full"
                      />
                      <motion.div
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-4 h-4 bg-blue-400 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Recognized Code */}
              {recognizedCode && !isAnalyzing && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 mb-4 border-4 border-green-400 flex-1 overflow-auto">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={20} className="text-green-400" />
                      <span className="text-green-400">인식 완료!</span>
                    </div>
                    <pre className="text-sm text-gray-100 font-mono whitespace-pre-wrap">
                      {recognizedCode}
                    </pre>
                  </div>

                  <Button
                    onClick={handleRunCode}
                    disabled={isRunning || recognizedCode.includes('실행 가능한') || recognizedCode.includes('오류')}
                    size="lg"
                    className="w-full gap-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-lg py-6"
                  >
                    {isRunning ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          ⚡
                        </motion.div>
                        코드 실행 중...
                      </>
                    ) : (
                      <>
                        <Play size={24} />
                        Java 코드 실행하기! 🚀
                      </>
                    )}
                  </Button>
                </motion.div>
              )}

              {/* Output */}
              {output && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4"
                >
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-6 border-4 border-yellow-400">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-3xl">🎉</span>
                      <span className="text-lg">실행 결과:</span>
                    </div>
                    <div className="bg-white rounded-lg p-6 font-mono text-xl whitespace-pre-wrap border-2 border-yellow-300">
                      {output}
                    </div>
                  </div>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: "spring" }}
                    className="mt-6 text-center"
                  >
                    <p className="text-3xl mb-3">🎊 대성공! 🎊</p>
                    <p className="text-lg text-gray-600">손으로 쓴 코드가 완벽하게 실행됐어요!</p>
                  </motion.div>
                </motion.div>
              )}

              {!recognizedCode && !isAnalyzing && (
                <div className="flex flex-col items-center justify-center flex-1 text-gray-400">
                  <div className="text-8xl mb-6">👈</div>
                  <p className="text-xl mb-2">왼쪽 캔버스에</p>
                  <p className="text-xl">Java 코드를 써보세요!</p>
                </div>
              )}
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
