"use client";

import React, { useState, useMemo, useId } from "react";
import {
  ArrowLeftRight,
  RotateCcw,
  Copy,
  Check,
  AlertCircle,
  HelpCircle,
  Binary,
  Layers,
  Sparkles,
} from "lucide-react";

type BaseType = "binary" | "decimal" | "octal" | "hexadecimal";

interface BaseConfig {
  name: string;
  base: number;
  subscript: string;
  regex: RegExp;
  placeholder: string;
  allowedChars: string;
  sample: string;
}

const BASES: Record<BaseType, BaseConfig> = {
  binary: {
    name: "Binary",
    base: 2,
    subscript: "2",
    regex: /^[01]+$/,
    placeholder: "e.g. 101101",
    allowedChars: "0, 1",
    sample: "101101",
  },
  decimal: {
    name: "Decimal",
    base: 10,
    subscript: "10",
    regex: /^[0-9]+$/,
    placeholder: "e.g. 45",
    allowedChars: "0 – 9",
    sample: "45",
  },
  octal: {
    name: "Octal",
    base: 8,
    subscript: "8",
    regex: /^[0-7]+$/,
    placeholder: "e.g. 55",
    allowedChars: "0 – 7",
    sample: "55",
  },
  hexadecimal: {
    name: "Hexadecimal",
    base: 16,
    subscript: "16",
    regex: /^[0-9A-Fa-f]+$/,
    placeholder: "e.g. 2D",
    allowedChars: "0 – 9, A – F",
    sample: "2D",
  },
};

interface ConversionResult {
  result: string;
  errorMessage: string;
  allEquivalents: {
    binary: string;
    decimal: string;
    octal: string;
    hexadecimal: string;
  } | null;
  steps: string[];
  detailedMath: string;
}

function calculateConversion(
  rawInput: string,
  from: BaseType,
  to: BaseType
): ConversionResult {
  const trimmed = rawInput.trim();

  if (!trimmed) {
    return {
      result: "",
      errorMessage: "",
      allEquivalents: null,
      steps: [],
      detailedMath: "",
    };
  }

  const config = BASES[from];

  // Validate characters
  if (!config.regex.test(trimmed)) {
    return {
      result: "",
      errorMessage: `Invalid ${config.name} number. Only characters allowed: ${config.allowedChars}.`,
      allEquivalents: null,
      steps: [],
      detailedMath: "",
    };
  }

  try {
    // Parse to integer via BigInt for arbitrary precision support
    let decimalBig: bigint;

    if (from === "binary") {
      decimalBig = BigInt(`0b${trimmed}`);
    } else if (from === "octal") {
      decimalBig = BigInt(`0o${trimmed}`);
    } else if (from === "hexadecimal") {
      decimalBig = BigInt(`0x${trimmed}`);
    } else {
      decimalBig = BigInt(trimmed);
    }

    // Convert to targets
    const binStr = decimalBig.toString(2);
    const decStr = decimalBig.toString(10);
    const octStr = decimalBig.toString(8);
    const hexStr = decimalBig.toString(16).toUpperCase();

    let targetResult = "";
    if (to === "binary") targetResult = binStr;
    else if (to === "decimal") targetResult = decStr;
    else if (to === "octal") targetResult = octStr;
    else if (to === "hexadecimal") targetResult = hexStr;

    const inputClean = trimmed.toUpperCase();
    const explanationSteps: string[] = [];
    let detailedMath = `${inputClean}₍${BASES[from].subscript}₎ = ${targetResult}₍${BASES[to].subscript}₎`;

    // Case 1: Same base
    if (from === to) {
      detailedMath = `${inputClean} (${BASES[from].name}) = ${inputClean} (${BASES[to].name})`;
      explanationSteps.push("Both source and destination bases are identical. No conversion required.");
    } else {
      // Step A: Convert from 'from' base to Decimal (if not already decimal)
      if (from !== "decimal") {
        const baseNum = BASES[from].base;
        const chars = inputClean.split("").reverse();
        const terms: string[] = [];

        chars.forEach((char, power) => {
          terms.push(`(${char} × ${baseNum}^${power})`);
        });

        const formulaStr = terms.reverse().join(" + ");
        explanationSteps.push(
          `Step 1: Convert ${BASES[from].name} to Decimal using positional notation:`
        );
        explanationSteps.push(
          `${inputClean}₍${BASES[from].subscript}₎ = ${formulaStr}`
        );
        explanationSteps.push(`= ${decimalBig.toString(10)}₍10₎`);
      }

      // Step B: Convert Decimal to destination base (if 'to' is not decimal)
      if (to !== "decimal") {
        const targetBase = BASES[to].base;
        explanationSteps.push(
          `Step ${from === "decimal" ? "1" : "2"}: Convert Decimal ${decimalBig.toString(10)}₍10₎ to ${BASES[to].name} (Base ${targetBase}):`
        );

        // Successive division trace
        let current = decimalBig;
        const divisionLines: string[] = [];
        if (current === BigInt(0)) {
          divisionLines.push(`0 ÷ ${targetBase} = Quotient 0, Remainder 0`);
        } else {
          while (current > BigInt(0)) {
            const quotient = current / BigInt(targetBase);
            const remainder = current % BigInt(targetBase);
            const remChar =
              remainder < BigInt(10)
                ? remainder.toString()
                : String.fromCharCode(55 + Number(remainder));
            divisionLines.push(
              `${current} ÷ ${targetBase} = ${quotient} with remainder ${remChar} (${remainder})`
            );
            current = quotient;
          }
        }

        divisionLines.forEach((line) => explanationSteps.push(`  • ${line}`));
        explanationSteps.push(
          `Read remainders from bottom to top: ${targetResult}₍${BASES[to].subscript}₎`
        );
      }

      // Specific direct grouping insight for Binary <-> Octal / Hexadecimal
      if (from === "binary" && to === "octal") {
        explanationSteps.push(
          `Shortcut Method: Group binary bits into sets of 3 from right to left:`
        );
        const padLen = (3 - (inputClean.length % 3)) % 3;
        const padded = "0".repeat(padLen) + inputClean;
        const chunks: string[] = [];
        for (let i = 0; i < padded.length; i += 3) {
          const chunk = padded.substring(i, i + 3);
          const octDigit = parseInt(chunk, 2).toString(8);
          chunks.push(`${chunk}₂ → ${octDigit}₈`);
        }
        explanationSteps.push(`  • [${chunks.join(", ")}] = ${targetResult}₈`);
      } else if (from === "binary" && to === "hexadecimal") {
        explanationSteps.push(
          `Shortcut Method: Group binary bits into sets of 4 from right to left:`
        );
        const padLen = (4 - (inputClean.length % 4)) % 4;
        const padded = "0".repeat(padLen) + inputClean;
        const chunks: string[] = [];
        for (let i = 0; i < padded.length; i += 4) {
          const chunk = padded.substring(i, i + 4);
          const hexDigit = parseInt(chunk, 2).toString(16).toUpperCase();
          chunks.push(`${chunk}₂ → ${hexDigit}₁₆`);
        }
        explanationSteps.push(`  • [${chunks.join(", ")}] = ${targetResult}₁₆`);
      }
    }

    return {
      result: targetResult,
      errorMessage: "",
      allEquivalents: {
        binary: binStr,
        decimal: decStr,
        octal: octStr,
        hexadecimal: hexStr,
      },
      steps: explanationSteps,
      detailedMath,
    };
  } catch {
    return {
      result: "",
      errorMessage: "Numerical value out of range or unsupported format.",
      allEquivalents: null,
      steps: [],
      detailedMath: "",
    };
  }
}

export default function NumberSystemConverter() {
  const numberInputId = useId();
  const fromSelectId = useId();
  const toSelectId = useId();

  const [inputVal, setInputVal] = useState<string>("101101");
  const [fromBase, setFromBase] = useState<BaseType>("binary");
  const [toBase, setToBase] = useState<BaseType>("decimal");
  const [copied, setCopied] = useState<boolean>(false);
  const [triggerPulse, setTriggerPulse] = useState<boolean>(false);

  // Derive conversion data synchronously with zero cascading renders
  const { result, errorMessage, allEquivalents, steps, detailedMath } = useMemo(() => {
    return calculateConversion(inputVal, fromBase, toBase);
  }, [inputVal, fromBase, toBase]);

  const handleConvertNow = () => {
    setTriggerPulse(true);
    setTimeout(() => setTriggerPulse(false), 500);
  };

  // Swap Bases
  const handleSwap = () => {
    const newFrom = toBase;
    const newTo = fromBase;
    setFromBase(newFrom);
    setToBase(newTo);

    // If we have a valid result, use it as the new input
    if (result && !errorMessage) {
      setInputVal(result);
    }
  };

  // Clear Input
  const handleClear = () => {
    setInputVal("");
  };

  // Copy Result
  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  // Quick Preset Sample Loader
  const loadPreset = (val: string, from: BaseType, to: BaseType) => {
    setInputVal(val);
    setFromBase(from);
    setToBase(to);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-lg overflow-hidden">
      
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-semibold tracking-wide border border-blue-400/30">
              <Binary className="w-3.5 h-3.5 text-cyan-400" />
              <span>COA Interactive Tool #1</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Number System Converter
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Seamlessly convert between Binary, Decimal, Octal, and Hexadecimal with full mathematical derivations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-md bg-blue-800/80 text-blue-200 font-mono">
              Base 2 • 8 • 10 • 16
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Work Area */}
      <div className="p-6 sm:p-8 space-y-8">
        
        {/* Preset chips for fast testing */}
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            Quick Demo Presets:
          </span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => loadPreset("101101", "binary", "decimal")}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 text-xs font-medium border border-slate-200 transition-colors"
            >
              101101 (Binary → Dec)
            </button>
            <button
              type="button"
              onClick={() => loadPreset("45", "decimal", "binary")}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 text-xs font-medium border border-slate-200 transition-colors"
            >
              45 (Decimal → Bin)
            </button>
            <button
              type="button"
              onClick={() => loadPreset("2D", "hexadecimal", "decimal")}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 text-xs font-medium border border-slate-200 transition-colors"
            >
              2D (Hex → Dec)
            </button>
            <button
              type="button"
              onClick={() => loadPreset("255", "decimal", "hexadecimal")}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 text-xs font-medium border border-slate-200 transition-colors"
            >
              255 (Decimal → Hex)
            </button>
            <button
              type="button"
              onClick={() => loadPreset("77", "octal", "binary")}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 text-xs font-medium border border-slate-200 transition-colors"
            >
              77 (Octal → Bin)
            </button>
            <button
              type="button"
              onClick={() => loadPreset("0", "decimal", "binary")}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 text-xs font-medium border border-slate-200 transition-colors"
            >
              0 (Zero Test)
            </button>
          </div>
        </div>

        {/* Input & Selector Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
          
          {/* Number Input */}
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor={numberInputId} className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <span>Enter Number:</span>
                <span className="text-xs font-normal text-slate-500">
                  (Allowed: {BASES[fromBase].allowedChars})
                </span>
              </label>
              <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                Base {BASES[fromBase].base}
              </span>
            </div>

            <div className="relative">
              <input
                id={numberInputId}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder={BASES[fromBase].placeholder}
                className={`w-full px-4 py-3.5 rounded-xl border text-base font-mono font-medium focus:outline-none focus:ring-2 transition-all ${
                  errorMessage
                    ? "border-red-400 bg-red-50/30 text-red-900 focus:ring-red-400 focus:border-red-500"
                    : "border-slate-300 bg-slate-50/50 text-slate-900 focus:ring-blue-500 focus:border-blue-500"
                }`}
              />
            </div>
          </div>

          {/* From Base Selector */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor={fromSelectId} className="text-sm font-bold text-slate-800">
              From Base:
            </label>
            <select
              id={fromSelectId}
              value={fromBase}
              onChange={(e) => setFromBase(e.target.value as BaseType)}
              className="w-full px-3.5 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            >
              <option value="binary">Binary (2)</option>
              <option value="decimal">Decimal (10)</option>
              <option value="octal">Octal (8)</option>
              <option value="hexadecimal">Hexadecimal (16)</option>
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center pb-1">
            <button
              type="button"
              onClick={handleSwap}
              title="Swap From and To bases"
              aria-label="Swap From and To bases"
              className="p-3 rounded-xl bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-800 border border-slate-200 transition-all hover:scale-105"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* To Base Selector */}
          <div className="md:col-span-3 space-y-2">
            <label htmlFor={toSelectId} className="text-sm font-bold text-slate-800">
              To Base:
            </label>
            <select
              id={toSelectId}
              value={toBase}
              onChange={(e) => setToBase(e.target.value as BaseType)}
              className="w-full px-3.5 py-3.5 rounded-xl border border-slate-300 bg-white text-slate-800 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            >
              <option value="binary">Binary (2)</option>
              <option value="decimal">Decimal (10)</option>
              <option value="octal">Octal (8)</option>
              <option value="hexadecimal">Hexadecimal (16)</option>
            </select>
          </div>

        </div>

        {/* Buttons Row: Convert, Clear */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleConvertNow}
              className={`px-6 py-3 rounded-xl font-semibold text-sm shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                triggerPulse
                  ? "bg-emerald-600 text-white scale-95"
                  : "bg-blue-700 hover:bg-blue-800 text-white hover:shadow"
              }`}
            >
              {triggerPulse ? "Calculated ✓" : "Convert Now"}
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm border border-slate-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>

          <span className="text-xs text-slate-500">
            Real-time validation active
          </span>
        </div>

        {/* Error Alert Display */}
        {errorMessage && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">Input Validation Error</p>
              <p className="text-xs mt-0.5 text-red-700">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Primary Result Box */}
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Conversion Result ({BASES[toBase].name}):
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!result}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 text-xs font-semibold border border-slate-200 shadow-2xs transition-colors disabled:opacity-40"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Result</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-inner flex items-baseline justify-between overflow-x-auto">
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl sm:text-3xl font-extrabold text-blue-900 tracking-wider">
                {result || "—"}
              </span>
              {result && (
                <span className="text-xs font-bold text-slate-500 font-mono">
                  ₍{BASES[toBase].subscript}₎
                </span>
              )}
            </div>
            {result && (
              <span className="text-xs text-slate-500 hidden sm:inline-block font-mono">
                {BASES[toBase].name} format
              </span>
            )}
          </div>
        </div>

        {/* Multi-base Equivalence Banner */}
        {allEquivalents && (
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 rounded-2xl p-5 border border-blue-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-700" />
                Multi-Base Equivalence Summary
              </span>
              <span className="text-xs text-blue-700 font-medium">All Bases Synchronized</span>
            </div>

            {/* Inline Equation Display */}
            <div className="p-3 bg-white/90 backdrop-blur-xs rounded-xl border border-blue-200 font-mono text-xs sm:text-sm font-bold text-slate-900 text-center overflow-x-auto">
              <span>{allEquivalents.binary}₂</span>
              <span className="text-blue-600 mx-2">=</span>
              <span>{allEquivalents.decimal}₁₀</span>
              <span className="text-blue-600 mx-2">=</span>
              <span>{allEquivalents.octal}₈</span>
              <span className="text-blue-600 mx-2">=</span>
              <span>{allEquivalents.hexadecimal}₁₆</span>
            </div>

            {/* Individual Base Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <p className="text-[11px] font-bold text-slate-500 uppercase">Binary (2)</p>
                <p className="font-mono text-sm font-extrabold text-slate-900 truncate mt-0.5">
                  {allEquivalents.binary}
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <p className="text-[11px] font-bold text-slate-500 uppercase">Decimal (10)</p>
                <p className="font-mono text-sm font-extrabold text-blue-800 truncate mt-0.5">
                  {allEquivalents.decimal}
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <p className="text-[11px] font-bold text-slate-500 uppercase">Octal (8)</p>
                <p className="font-mono text-sm font-extrabold text-slate-900 truncate mt-0.5">
                  {allEquivalents.octal}
                </p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
                <p className="text-[11px] font-bold text-slate-500 uppercase">Hexadecimal (16)</p>
                <p className="font-mono text-sm font-extrabold text-indigo-900 truncate mt-0.5">
                  {allEquivalents.hexadecimal}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Visual Binary Register / Bit Pattern Display */}
        {allEquivalents && (
          <div className="bg-slate-900 rounded-2xl p-5 text-white space-y-3 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Binary className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                  Hardware Register Representation (Bits & Nibbles)
                </span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">
                Length: {allEquivalents.binary.length} bits
              </span>
            </div>

            {/* Bit Cells */}
            <div className="flex flex-wrap gap-1 sm:gap-1.5 pt-1 overflow-x-auto pb-1">
              {allEquivalents.binary.split("").map((bit, idx) => (
                <div
                  key={idx}
                  className={`w-7 h-9 sm:w-8 sm:h-10 rounded-md flex flex-col items-center justify-center font-mono font-bold text-xs sm:text-sm border transition-transform ${
                    bit === "1"
                      ? "bg-blue-600 border-blue-400 text-white shadow-xs"
                      : "bg-slate-800 border-slate-700 text-slate-400"
                  }`}
                >
                  <span>{bit}</span>
                  <span className="text-[8px] text-slate-300 opacity-60">
                    {allEquivalents.binary.length - 1 - idx}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step-by-Step Calculation & Explanation Area */}
        {steps.length > 0 && (
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <HelpCircle className="w-4 h-4 text-blue-700" />
              <h4 className="text-sm font-bold text-slate-900">
                Step-by-Step Mathematical Explanation
              </h4>
            </div>

            {detailedMath && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm font-bold text-blue-900">
                {detailedMath}
              </div>
            )}

            <div className="space-y-1.5 text-xs sm:text-sm font-mono text-slate-700">
              {steps.map((st, i) => (
                <p key={i} className="leading-relaxed bg-white/60 p-2 rounded-md border border-slate-100">
                  {st}
                </p>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
