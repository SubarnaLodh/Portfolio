"use client";

import React, { useState, useMemo, useId } from "react";
import {
  Copy,
  Check,
  Layers,
  Sparkles,
} from "lucide-react";

type BitWidth = 8 | 16;
type Operation = "ADD" | "SUB" | "AND" | "OR" | "XOR" | "SHL" | "SHR";

interface AluResult {
  resBinary: string;
  resDecimalUnsigned: number;
  resDecimalSigned: number;
  resHex: string;
  carryOut: boolean;
  overflow: boolean;
  zero: boolean;
  sign: boolean;
  steps: string[];
  carryTrace: string[];
}

export default function BinaryArithmeticCalculator() {
  const opAInputId = useId();
  const opBInputId = useId();
  const compInputId = useId();

  // Mode: "alu" or "complements"
  const [mode, setMode] = useState<"alu" | "complements">("alu");
  const [bitWidth, setBitWidth] = useState<BitWidth>(8);

  // ALU State
  const [operandA, setOperandA] = useState<string>("45");
  const [operandB, setOperandB] = useState<string>("27");
  const [operation, setOperation] = useState<Operation>("ADD");
  const [inputFormat, setInputFormat] = useState<"decimal" | "binary">("decimal");

  // Complements State
  const [compInput, setCompInput] = useState<string>("42");
  const [compFormat, setCompFormat] = useState<"decimal" | "binary">("decimal");

  const [copied, setCopied] = useState(false);

  // Parse input integer safely
  const parseVal = (str: string, format: "decimal" | "binary"): number | null => {
    const trimmed = str.trim();
    if (!trimmed) return null;
    if (format === "binary") {
      if (!/^[01]+$/.test(trimmed)) return null;
      return parseInt(trimmed, 2);
    } else {
      if (!/^-?\d+$/.test(trimmed)) return null;
      return parseInt(trimmed, 10);
    }
  };

  // Compute ALU calculations
  const aluData = useMemo<AluResult | null>(() => {
    const valA = parseVal(operandA, inputFormat);
    const valB = parseVal(operandB, inputFormat);

    if (valA === null || valB === null) return null;

    const mask = (1 << bitWidth) - 1;
    const signBitMask = 1 << (bitWidth - 1);

    // Normalize to unsigned bit-width representation
    const uA = valA & mask;
    const uB = valB & mask;

    let resRaw = 0;
    let carryOut = false;
    let overflow = false;
    const steps: string[] = [];
    const carryTrace: string[] = [];

    const aBin = uA.toString(2).padStart(bitWidth, "0");
    const bBin = uB.toString(2).padStart(bitWidth, "0");

    switch (operation) {
      case "ADD": {
        resRaw = uA + uB;
        carryOut = resRaw > mask;
        const resMasked = resRaw & mask;

        // Overflow: if operands had same sign, but result has different sign
        const signA = (uA & signBitMask) !== 0;
        const signB = (uB & signBitMask) !== 0;
        const signR = (resMasked & signBitMask) !== 0;
        overflow = signA === signB && signA !== signR;

        // Bitwise carry generation for trace
        let c = 0;
        const carries: number[] = [];
        for (let i = bitWidth - 1; i >= 0; i--) {
          const bitA = parseInt(aBin[i], 10);
          const bitB = parseInt(bBin[i], 10);
          const sum = bitA + bitB + c;
          c = sum >= 2 ? 1 : 0;
          carries.unshift(c);
        }
        carryTrace.push(...carries.map(String));

        steps.push(`Binary Addition (A + B):`);
        steps.push(`  Operand A = ${aBin}₂ (${valA}₁₀)`);
        steps.push(`  Operand B = ${bBin}₂ (${valB}₁₀)`);
        steps.push(`  Result    = ${resMasked.toString(2).padStart(bitWidth, "0")}₂`);
        if (carryOut) steps.push(`  Carry Flag (C = 1): Generated carry beyond ${bitWidth}-bit boundary.`);
        if (overflow) steps.push(`  Overflow Flag (V = 1): Two signed values produced magnitude inversion.`);
        break;
      }

      case "SUB": {
        // A - B = A + (~B + 1)
        const bNeg = ((~uB) + 1) & mask;
        const bNegBin = bNeg.toString(2).padStart(bitWidth, "0");
        resRaw = uA + bNeg;
        carryOut = uA >= uB; // In 8086 / x86, carry flag in SUB is 1 if borrow (uA < uB), but carry-out of adder is uA >= uB
        const resMasked = resRaw & mask;

        const signA = (uA & signBitMask) !== 0;
        const signB = (uB & signBitMask) !== 0;
        const signR = (resMasked & signBitMask) !== 0;
        overflow = signA !== signB && signB === signR;

        steps.push(`Binary Subtraction via 2's Complement [A + (~B + 1)]:`);
        steps.push(`  Operand A      = ${aBin}₂ (${valA}₁₀)`);
        steps.push(`  Operand B      = ${bBin}₂ (${valB}₁₀)`);
        steps.push(`  1's Comp of B  = ${(uB ^ mask).toString(2).padStart(bitWidth, "0")}₂`);
        steps.push(`  2's Comp of B  = ${bNegBin}₂ (-${uB})`);
        steps.push(`  Addition A+(-B)= ${resMasked.toString(2).padStart(bitWidth, "0")}₂`);
        steps.push(`  Borrow Status  = ${uA < uB ? "Borrow Generated (A < B)" : "No Borrow Needed (A ≥ B)"}`);
        break;
      }

      case "AND": {
        resRaw = uA & uB;
        steps.push(`Bitwise AND Operation (A & B):`);
        steps.push(`  A = ${aBin}₂`);
        steps.push(`  B = ${bBin}₂`);
        steps.push(`  R = ${resRaw.toString(2).padStart(bitWidth, "0")}₂`);
        break;
      }

      case "OR": {
        resRaw = uA | uB;
        steps.push(`Bitwise OR Operation (A | B):`);
        steps.push(`  A = ${aBin}₂`);
        steps.push(`  B = ${bBin}₂`);
        steps.push(`  R = ${resRaw.toString(2).padStart(bitWidth, "0")}₂`);
        break;
      }

      case "XOR": {
        resRaw = uA ^ uB;
        steps.push(`Bitwise XOR Operation (A ^ B):`);
        steps.push(`  A = ${aBin}₂`);
        steps.push(`  B = ${bBin}₂`);
        steps.push(`  R = ${resRaw.toString(2).padStart(bitWidth, "0")}₂`);
        break;
      }

      case "SHL": {
        resRaw = (uA << 1) & mask;
        carryOut = (uA & signBitMask) !== 0;
        steps.push(`Bitwise Shift Left (A << 1):`);
        steps.push(`  Before = ${aBin}₂ (${valA}₁₀)`);
        steps.push(`  After  = ${resRaw.toString(2).padStart(bitWidth, "0")}₂ (Multiplied by 2)`);
        steps.push(`  Shifted out MSB: ${carryOut ? "1" : "0"}`);
        break;
      }

      case "SHR": {
        carryOut = (uA & 1) !== 0;
        resRaw = (uA >>> 1) & mask;
        steps.push(`Bitwise Logical Shift Right (A >> 1):`);
        steps.push(`  Before = ${aBin}₂ (${valA}₁₀)`);
        steps.push(`  After  = ${resRaw.toString(2).padStart(bitWidth, "0")}₂ (Divided by 2)`);
        steps.push(`  Shifted out LSB: ${carryOut ? "1" : "0"}`);
        break;
      }
    }

    const finalResMasked = resRaw & mask;
    const resBinary = finalResMasked.toString(2).padStart(bitWidth, "0");
    const zero = finalResMasked === 0;
    const sign = (finalResMasked & signBitMask) !== 0;

    // Signed value calculation
    let signedVal = finalResMasked;
    if (sign) {
      signedVal = finalResMasked - (1 << bitWidth);
    }

    return {
      resBinary,
      resDecimalUnsigned: finalResMasked,
      resDecimalSigned: signedVal,
      resHex: finalResMasked.toString(16).toUpperCase().padStart(bitWidth / 4, "0"),
      carryOut,
      overflow,
      zero,
      sign,
      steps,
      carryTrace,
    };
  }, [operandA, operandB, operation, bitWidth, inputFormat]);

  // Compute Complements data
  const compData = useMemo(() => {
    const val = parseVal(compInput, compFormat);
    if (val === null) return null;

    const mask = (1 << bitWidth) - 1;
    const uVal = val & mask;
    const origBin = uVal.toString(2).padStart(bitWidth, "0");

    // 1's complement = bitwise NOT
    const onesComp = uVal ^ mask;
    const onesBin = onesComp.toString(2).padStart(bitWidth, "0");

    // 2's complement = 1's complement + 1
    const twosComp = (onesComp + 1) & mask;
    const twosBin = twosComp.toString(2).padStart(bitWidth, "0");

    // Signed decimal evaluation of the 2's complement
    const signBitMask = 1 << (bitWidth - 1);
    const isNegative = (twosComp & signBitMask) !== 0;
    const signedDec = isNegative ? twosComp - (1 << bitWidth) : twosComp;

    return {
      val,
      origBin,
      onesBin,
      twosBin,
      onesDec: onesComp,
      twosDecUnsigned: twosComp,
      twosDecSigned: signedDec,
      hex: twosComp.toString(16).toUpperCase().padStart(bitWidth / 4, "0"),
    };
  }, [compInput, compFormat, bitWidth]);

  const handleCopyResult = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-8">
      {/* Top Header & Sub-Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Interactive Microarchitecture Module
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Binary ALU & Complements Simulator
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Simulate hardware arithmetic, logic gates, status flags, and 1&apos;s/2&apos;s signed complements.
          </p>
        </div>

        {/* Bit-Width and Mode Switches */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Mode Tabs */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
            <button
              type="button"
              onClick={() => setMode("alu")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === "alu"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ALU Operations
            </button>
            <button
              type="button"
              onClick={() => setMode("complements")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === "complements"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              1&apos;s & 2&apos;s Complement
            </button>
          </div>

          {/* Bit Width selector */}
          <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setBitWidth(8)}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                bitWidth === 8
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              8-Bit (Byte)
            </button>
            <button
              type="button"
              onClick={() => setBitWidth(16)}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                bitWidth === 16
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              16-Bit (Word)
            </button>
          </div>
        </div>
      </div>

      {mode === "alu" ? (
        /* ALU MODE INTERFACE */
        <div className="space-y-6">
          {/* Controls Bar: Operands + Operations */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            {/* Operand A */}
            <div className="md:col-span-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={opAInputId} className="font-bold text-slate-700">
                  Operand A
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setInputFormat("decimal")}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      inputFormat === "decimal"
                        ? "bg-blue-100 text-blue-800"
                        : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    Dec
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputFormat("binary")}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      inputFormat === "binary"
                        ? "bg-blue-100 text-blue-800"
                        : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    Bin
                  </button>
                </div>
              </div>
              <input
                id={opAInputId}
                type="text"
                value={operandA}
                onChange={(e) => setOperandA(e.target.value)}
                placeholder={inputFormat === "decimal" ? "e.g. 45" : "e.g. 00101101"}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>

            {/* Operation Selector */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">ALU Operation</label>
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-1">
                {(["ADD", "SUB", "AND", "OR", "XOR", "SHL", "SHR"] as Operation[]).map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => setOperation(op)}
                    className={`py-2 px-1 text-xs font-bold rounded-lg transition-all text-center ${
                      operation === op
                        ? "bg-blue-700 text-white shadow-xs scale-105"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>

            {/* Operand B */}
            <div className="md:col-span-4 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={opBInputId} className="font-bold text-slate-700">
                  Operand B
                </label>
                <span className="text-[10px] text-slate-400">
                  {operation === "SHL" || operation === "SHR" ? "(ignored for shifts)" : "Second Value"}
                </span>
              </div>
              <input
                id={opBInputId}
                type="text"
                disabled={operation === "SHL" || operation === "SHR"}
                value={operandB}
                onChange={(e) => setOperandB(e.target.value)}
                placeholder={inputFormat === "decimal" ? "e.g. 27" : "e.g. 00011011"}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50 disabled:opacity-50 disabled:bg-slate-100"
              />
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
              Quick Test Cases:
            </span>
            <button
              type="button"
              onClick={() => {
                setInputFormat("decimal");
                setOperation("ADD");
                setOperandA("45");
                setOperandB("27");
              }}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium transition-colors"
            >
              45 + 27 (Normal)
            </button>
            <button
              type="button"
              onClick={() => {
                setInputFormat("decimal");
                setOperation("SUB");
                setOperandA("60");
                setOperandB("25");
              }}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium transition-colors"
            >
              60 - 25 (2&apos;s Comp Sub)
            </button>
            <button
              type="button"
              onClick={() => {
                setInputFormat("decimal");
                setBitWidth(8);
                setOperation("ADD");
                setOperandA("120");
                setOperandB("20");
              }}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-700 font-medium transition-colors"
            >
              120 + 20 (8-bit Overflow Demo)
            </button>
            <button
              type="button"
              onClick={() => {
                setInputFormat("decimal");
                setOperation("XOR");
                setOperandA("15");
                setOperandB("15");
              }}
              className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium transition-colors"
            >
              15 ^ 15 (Zero Flag)
            </button>
          </div>

          {/* ALU Output Display */}
          {aluData ? (
            <div className="space-y-6 pt-2">
              {/* Output Hero Banner */}
              <div className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 rounded-2xl p-6 text-white shadow-md relative overflow-hidden border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-mono font-bold text-cyan-400 uppercase tracking-widest">
                      ALU Result Register ({bitWidth}-Bit Output)
                    </span>
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white tracking-wider">
                        {aluData.resBinary}₂
                      </span>
                      <span className="text-slate-400 text-sm font-mono">
                        = {aluData.resDecimalSigned}₁₀ (Signed)
                      </span>
                      <span className="text-slate-400 text-sm font-mono">
                        = 0x{aluData.resHex}₁₆
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyResult(aluData.resBinary)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs transition-all self-start sm:self-auto"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy Bits"}</span>
                  </button>
                </div>

                {/* Status Flags Register Strip */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                      CPU Status Flags (PSW / EFLAGS):
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      Carry={aluData.carryOut ? 1 : 0} | Zero={aluData.zero ? 1 : 0} | Sign={aluData.sign ? 1 : 0} | Ovr={aluData.overflow ? 1 : 0}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {/* Zero Flag */}
                    <div
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        aluData.zero
                          ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-300"
                          : "bg-slate-900/60 border-slate-800 text-slate-400"
                      }`}
                    >
                      <div>
                        <span className="font-mono font-bold text-xs block">ZF (Zero Flag)</span>
                        <span className="text-[10px] text-slate-400">Result is zero</span>
                      </div>
                      <span className="font-mono text-base font-extrabold">
                        {aluData.zero ? "1" : "0"}
                      </span>
                    </div>

                    {/* Sign Flag */}
                    <div
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        aluData.sign
                          ? "bg-blue-950/60 border-blue-500/50 text-cyan-300"
                          : "bg-slate-900/60 border-slate-800 text-slate-400"
                      }`}
                    >
                      <div>
                        <span className="font-mono font-bold text-xs block">SF (Sign Flag)</span>
                        <span className="text-[10px] text-slate-400">MSB is 1 (negative)</span>
                      </div>
                      <span className="font-mono text-base font-extrabold">
                        {aluData.sign ? "1" : "0"}
                      </span>
                    </div>

                    {/* Carry Flag */}
                    <div
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        aluData.carryOut
                          ? "bg-amber-950/60 border-amber-500/50 text-amber-300"
                          : "bg-slate-900/60 border-slate-800 text-slate-400"
                      }`}
                    >
                      <div>
                        <span className="font-mono font-bold text-xs block">CF (Carry Flag)</span>
                        <span className="text-[10px] text-slate-400">Unsigned carry/borrow</span>
                      </div>
                      <span className="font-mono text-base font-extrabold">
                        {aluData.carryOut ? "1" : "0"}
                      </span>
                    </div>

                    {/* Overflow Flag */}
                    <div
                      className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        aluData.overflow
                          ? "bg-rose-950/60 border-rose-500/50 text-rose-300"
                          : "bg-slate-900/60 border-slate-800 text-slate-400"
                      }`}
                    >
                      <div>
                        <span className="font-mono font-bold text-xs block">OF (Overflow)</span>
                        <span className="text-[10px] text-slate-400">Signed arithmetic overflow</span>
                      </div>
                      <span className="font-mono text-base font-extrabold">
                        {aluData.overflow ? "1" : "0"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bitwise Register Cell Matrix */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>Register Bit Cell Breakdown ({bitWidth} Bits)</span>
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">
                    MSB [b{bitWidth - 1}] → LSB [b0]
                  </span>
                </div>

                <div className="overflow-x-auto pb-1">
                  <div className="inline-flex flex-col gap-1 min-w-full font-mono text-xs">
                    {/* Bit index row */}
                    <div className="flex gap-1 justify-end">
                      {Array.from({ length: bitWidth }).map((_, i) => {
                        const bitIndex = bitWidth - 1 - i;
                        return (
                          <div
                            key={bitIndex}
                            className={`w-7 sm:w-8 text-center text-[10px] text-slate-400 font-semibold ${
                              bitIndex % 4 === 0 && bitIndex !== 0 ? "mr-1.5" : ""
                            }`}
                          >
                            b{bitIndex}
                          </div>
                        );
                      })}
                    </div>

                    {/* Result Bits row */}
                    <div className="flex gap-1 justify-end items-center">
                      {aluData.resBinary.split("").map((bit, i) => {
                        const bitIndex = bitWidth - 1 - i;
                        return (
                          <div
                            key={i}
                            className={`w-7 sm:w-8 h-8 rounded-md flex items-center justify-center font-bold text-sm border shadow-2xs ${
                              bit === "1"
                                ? "bg-blue-600 text-white border-blue-700"
                                : "bg-white text-slate-700 border-slate-300"
                            } ${bitIndex % 4 === 0 && bitIndex !== 0 ? "mr-1.5" : ""}`}
                          >
                            {bit}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mathematical Step Derivation */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>ALU Execution Trace & Derivation</span>
                </h5>
                <div className="space-y-1.5 font-mono text-xs bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-800">
                  {aluData.steps.map((st, i) => (
                    <div key={i} className="leading-relaxed">
                      {st}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm">
              Please enter valid numerical operands to view the ALU execution trace.
            </div>
          )}
        </div>
      ) : (
        /* COMPLEMENTS MODE INTERFACE */
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-8 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor={compInputId} className="font-bold text-slate-700">
                  Number to Complement
                </label>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setCompFormat("decimal")}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      compFormat === "decimal"
                        ? "bg-blue-100 text-blue-800"
                        : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    Decimal
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompFormat("binary")}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      compFormat === "binary"
                        ? "bg-blue-100 text-blue-800"
                        : "text-slate-400 hover:text-slate-700"
                    }`}
                  >
                    Binary
                  </button>
                </div>
              </div>
              <input
                id={compInputId}
                type="text"
                value={compInput}
                onChange={(e) => setCompInput(e.target.value)}
                placeholder={compFormat === "decimal" ? "e.g. 42 or -42" : "e.g. 00101010"}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
              />
            </div>

            {/* Quick preset buttons */}
            <div className="md:col-span-4 flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setCompFormat("decimal");
                  setCompInput("42");
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-xs font-semibold text-slate-700 transition-colors"
              >
                +42
              </button>
              <button
                type="button"
                onClick={() => {
                  setCompFormat("decimal");
                  setCompInput("-42");
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-xs font-semibold text-slate-700 transition-colors"
              >
                -42
              </button>
              <button
                type="button"
                onClick={() => {
                  setCompFormat("decimal");
                  setCompInput("127");
                }}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-xs font-semibold text-slate-700 transition-colors"
              >
                +127 (Max 8b)
              </button>
            </div>
          </div>

          {compData ? (
            <div className="space-y-6 pt-2">
              {/* Complements Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 1. Original Binary */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Step 0: Original Unsigned Binary
                  </span>
                  <p className="font-mono text-xl font-bold text-slate-900 tracking-wider">
                    {compData.origBin}₂
                  </p>
                  <p className="text-xs text-slate-500 font-mono">
                    Magnitude: {compData.val}₁₀
                  </p>
                </div>

                {/* 2. 1's Complement */}
                <div className="bg-blue-50/70 rounded-2xl p-5 border border-blue-200 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">
                    Step 1: 1&apos;s Complement (Invert Bits)
                  </span>
                  <p className="font-mono text-xl font-bold text-blue-900 tracking-wider">
                    {compData.onesBin}₂
                  </p>
                  <p className="text-xs text-blue-600 font-mono">
                    Every 0 flipped to 1, 1 flipped to 0
                  </p>
                </div>

                {/* 3. 2's Complement */}
                <div className="bg-indigo-50/70 rounded-2xl p-5 border border-indigo-200 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700">
                    Step 2: 2&apos;s Complement (+ 1 to LSB)
                  </span>
                  <p className="font-mono text-xl font-bold text-indigo-950 tracking-wider">
                    {compData.twosBin}₂
                  </p>
                  <p className="text-xs text-indigo-700 font-mono font-semibold">
                    Signed Dec: {compData.twosDecSigned}₁₀ | Hex: 0x{compData.hex}
                  </p>
                </div>
              </div>

              {/* Bit-by-bit Visual Inversion Table */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Bit-by-Bit Bitwise Inversion Trace
                </h5>

                <div className="overflow-x-auto">
                  <table className="w-full text-center font-mono text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 text-[11px]">
                        <th className="py-2 text-left font-sans font-semibold text-slate-500">Field</th>
                        {Array.from({ length: bitWidth }).map((_, i) => (
                          <th key={i} className="py-2 px-1">
                            b{bitWidth - 1 - i}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="py-2.5 text-left font-sans font-semibold text-slate-700">Original Bits</td>
                        {compData.origBin.split("").map((b, i) => (
                          <td key={i} className="py-2.5 px-1 font-bold text-slate-900">
                            {b}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-blue-50/50">
                        <td className="py-2.5 text-left font-sans font-semibold text-blue-800">1&apos;s Complement</td>
                        {compData.onesBin.split("").map((b, i) => (
                          <td key={i} className="py-2.5 px-1 font-bold text-blue-700">
                            {b}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-indigo-50/50">
                        <td className="py-2.5 text-left font-sans font-semibold text-indigo-900">2&apos;s Complement</td>
                        {compData.twosBin.split("").map((b, i) => (
                          <td key={i} className="py-2.5 px-1 font-bold text-indigo-900">
                            {b}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-sm">
              Please enter a numerical value to calculate its 1&apos;s and 2&apos;s complements.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
