import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, BookOpen, Code2, Brain, Zap } from "lucide-react";
import { useState } from "react";
import { Streamdown } from "streamdown";

const sections = [
  {
    id: "fill-blank",
    title: "填空题知识点",
    icon: BookOpen,
    content: `## 数制与编码

### 有符号数与无符号数

在16位系统中，一个字（Word）占2个字节（Byte），共16位。

| 类型 | 范围 | 描述 |
| :--- | :--- | :--- |
| **无符号数** | 0 ~ 65535 | 所有位都用于表示数值。 |
| **有符号数** | -32768 ~ 32767 | 最高位为符号位：0表示正数，1表示负数。 |

### 进制转换

- **二进制 (B)**：计算机内部表示。
- **十进制 (D)**：人类常用。
- **十六进制 (H)**：汇编语言中常用，一个十六进制位对应四个二进制位。

### 补码 (Two's Complement)

计算机内部使用补码表示有符号数。

| 数值类型 | 表示方法 |
| :--- | :--- |
| **正数** | 原码、反码、补码相同。 |
| **负数** | 先求其绝对值的原码，然后按位取反（得到反码），最后加1。 |

**示例：** 求 -1 的16位补码。
1. +1 的原码：0000 0000 0000 0001B
2. 反码：1111 1111 1111 1110B
3. 补码：1111 1111 1111 1111B (即 FFFFH)

### 基本寄存器

| 寄存器 | 描述 |
| :--- | :--- |
| **AX** | 累加器，常用于算术运算和I/O操作。 |
| **BX** | 基址寄存器，常用于内存寻址。 |
| **CX** | 计数器，常用于循环控制。 |
| **DX** | 数据寄存器，常用于I/O操作和乘除法。 |
| **SP** | 栈指针，指向栈顶。 |
| **BP** | 基址指针，常用于栈中数据访问。 |
| **SI/DI** | 源/目的变址寄存器，常用于串操作。 |
| **CS/DS/SS/ES** | 段寄存器，指向不同的内存段。 |
| **IP** | 指令指针，指向下一条待执行指令。 |
| **FLAGS** | 标志寄存器，记录CPU运算结果的状态。 |

**基本运算指令：**
- \`MOV\`：数据传送。例如：\`MOV AX, 1000H\`
- \`ADD\`：加法。例如：\`ADD AX, BX\`
- \`SUB\`：减法。例如：\`SUB CX, 1\`
- \`INC\`：加1。例如：\`INC DI\`
- \`DEC\`：减1。例如：\`DEC CX\`
`
  },
  {
    id: "simple-answer",
    title: "简答题知识点",
    icon: Brain,
    content: `## 内存访问与寻址

### 物理地址的形成

在16位实模式下，CPU通过段地址和偏移地址来确定内存单元的物理地址。

**公式：** 物理地址 = 段地址 × 16 + 偏移地址

### 寻址方式

| 寻址方式 | 偏移地址计算 | 示例指令 | 描述 |
| :--- | :--- | :--- | :--- |
| **寄存器间接寻址** | 寄存器内容 | \`MOV AX, [BX]\` | 偏移地址在BX, BP, SI, DI中。 |
| **寄存器相对寻址** | 寄存器内容 + 立即数 | \`MOV AX, [BX+8]\` | 在间接寻址的基础上加上一个常量。 |
| **基址变址寻址** | (BX/BP) + (SI/DI) | \`MOV AX, [BX+SI]\` | 两个寄存器相加作为偏移地址。 |

### 内存读取指令示例

1. **从DS段偏移地址1000H处读取一个字到AX：** \`MOV AX, [1000H]\`
2. **从DS段BX指向的地址读取一个字节到AL：** \`MOV AL, [BX]\`
3. **从SS段BP+SI+20H处读取一个字到DX：** \`MOV DX, SS:[BP+SI+20H]\`

## 流程控制指令

| 指令 | 作用 |
| :--- | :--- |
| **JMP** | 无条件跳转 |
| **LOOP** | 循环控制，(CX) = (CX) - 1；若 (CX) ≠ 0，则跳转 |
| **CALL** | 子程序调用，将返回地址压栈 |
| **RET** | 子程序返回，从栈中弹出返回地址 |

## 标志位运算 (CF, OF, ZF, SF)

| 标志位 | 全称 | 描述 |
| :--- | :--- | :--- |
| **CF** | Carry Flag | 记录无符号数运算时最高位是否进位或借位 |
| **OF** | Overflow Flag | 记录有符号数运算时结果是否溢出 |
| **ZF** | Zero Flag | 记录运算结果是否为0 |
| **SF** | Sign Flag | 记录运算结果的最高位 |

### CF, OF 运算结果判断

- **CF**：看第7位（最高位）是否有进位/借位。
- **OF**：OF = C6 ⊕ C7
  - **C6**：第6位向第7位的进位。
  - **C7**：第7位向第8位的进位（即CF）。
  - 如果 C6 ≠ C7，则 OF=1 (溢出)。
`
  },
  {
    id: "programming",
    title: "编程题知识点",
    icon: Code2,
    content: `## 算术指令

| 指令 | 作用 |
| :--- | :--- |
| **MUL** | 乘法：8位：AX = AL × reg/mem；16位：DX:AX = AX × reg/mem |
| **DIV** | 除法：8位：AL = AX / reg/mem (商)，AH = AX mod reg/mem (余数) |
| **ADD** | 加法：dest = dest + src |
| **SUB** | 减法：dest = dest - src |

## 逻辑指令

| 指令 | 作用 |
| :--- | :--- |
| **AND** | 逻辑与 (位操作) |
| **OR** | 逻辑或 (位操作) |
| **XOR** | 逻辑异或 (位操作) |
| **NOT** | 逻辑非 (位操作) |

## 条件跳转指令 (JC, JNC)

| 指令 | 含义 | 标志位条件 |
| :--- | :--- | :--- |
| **JC** | Jump if Carry | CF=1 时跳转 |
| **JNC** | Jump if Not Carry | CF=0 时跳转 |
| **JZ/JE** | Jump if Zero/Equal | ZF=1 时跳转 |
| **JNZ/JNE** | Jump if Not Zero/Not Equal | ZF=0 时跳转 |

## 编程示例：使用JC, JNC

实现两个16位无符号数相加，如果发生进位（CF=1），则将AX置为FFFFH，否则置为0。

\`\`\`assembly
; 假设要计算 (BX) + (CX)
    MOV AX, BX
    ADD AX, CX      ; 执行加法，影响CF
    JNC NO_CARRY    ; 如果CF=0 (无进位)，跳转到NO_CARRY
    
    ; CF=1 (有进位)
    MOV AX, 0FFFFH  ; AX = FFFFH
    JMP END_PROG    ; 无条件跳转到程序结束
    
NO_CARRY:
    ; CF=0 (无进位)
    MOV AX, 0       ; AX = 0
    
END_PROG:
    ; 程序继续执行
\`\`\`

## 循环控制

循环控制的核心是**CX**寄存器和**LOOP**指令。

\`\`\`assembly
    MOV CX, 循环次数
    MOV BX, 初始偏移地址
S:  ; 循环体内容
    ; ...
    INC BX  ; 改变偏移地址
    LOOP S  ; CX--，若CX!=0，则跳转到S
\`\`\`

## CALL/RET 子程序

- **CALL**：将返回地址（IP或CS:IP）压栈，跳转到目标地址。
- **RET**：从栈中弹出返回地址，返回到调用点继续执行。
`
  },
  {
    id: "discussion",
    title: "论述题知识点",
    icon: Zap,
    content: `## PE格式原理

**PE (Portable Executable)** 格式是 **Windows 操作系统**下可执行文件（如 .EXE, .DLL, .SYS, .OCX）的统称。

### PE 文件的主要结构

1. **DOS MZ Header**：兼容DOS，包含魔术数字 \`MZ\`。
2. **DOS Stub**：一段DOS程序。
3. **PE Header (NT Headers)**：包含PE文件的核心信息。
   - **Signature**：标志 \`PE\\0\\0\`。
   - **File Header**：描述文件基本属性。
   - **Optional Header**：描述文件在内存中的加载信息。
4. **Section Headers (节表)**：描述各个节区的信息。
5. **Sections (节区)**：实际的代码和数据（如 .text, .data, .rdata, .idata）。

## PE格式地址换算 (VA, RVA, FOA)

| 地址类型 | 全称 | 描述 |
| :--- | :--- | :--- |
| **VA** | Virtual Address | 程序加载到内存后的绝对地址。 |
| **RVA** | Relative Virtual Address | 相对于加载基地址 (ImageBase) 的偏移量。RVA = VA - ImageBase |
| **FOA** | File Offset Address | 代码或数据在磁盘文件中的绝对偏移量。 |

### RVA 到 FOA 的转换

1. **确定 RVA 所在的节区**：遍历节表，找到RVA落在哪个节区的虚拟地址范围内。
2. **计算 FOA**：
   \`\`\`
   FOA = RVA - SectionVirtualAddress + SectionPointerToRawData
   \`\`\`

## 32位与64位可执行程序区别

| 特性 | 32位程序 (PE32) | 64位程序 (PE32+) |
| :--- | :--- | :--- |
| **地址空间** | 4GB (理论最大) | 16EB (理论最大) |
| **指针/地址大小** | 32位 (4字节) | 64位 (8字节) |
| **通用寄存器** | 8个 | 16个 (包括 R8-R15) |
| **PE Header 字段** | Optional Header 大小不同 | Optional Header 大小不同 |
| **兼容性** | 32位或64位系统 | 仅64位系统 |
| **性能** | 内存访问受限 | 更多寄存器，性能更高 |

### 核心区别总结

1. **寻址能力**：64位程序使用64位地址，突破了32位程序4GB内存寻址的限制。
2. **寄存器**：64位架构提供了更多的通用寄存器 (R8-R15)，减少了对内存的访问次数。
3. **PE头**：64位程序的PE头结构有所变化，以适应64位地址和更大的内存空间。
`
  }
];

export default function Home() {
  const [expandedSection, setExpandedSection] = useState("fill-blank");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/80 backdrop-blur-md">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">汇编语言考试复习</h1>
              <p className="text-xs text-gray-500">基于王爽《汇编语言（第4版）》</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-sm text-gray-600">16位 DOS 汇编</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-lg">
            <h2 className="text-3xl font-bold mb-3">全面的考试复习资料</h2>
            <p className="text-blue-100 mb-4 max-w-2xl">
              涵盖填空题、简答题、编程题和论述题的所有知识点，帮助您系统地掌握16位DOS汇编语言的核心内容。
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">数制与编码</span>
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">寄存器运算</span>
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">内存寻址</span>
              <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm">PE格式</span>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={expandedSection} onValueChange={setExpandedSection} className="mb-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-2 rounded-lg shadow-sm border border-gray-200">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <TabsTrigger key={section.id} value={section.id} className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{section.title.split("知")[0]}</span>
                  <span className="sm:hidden text-xs">{section.title.split("知")[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Content Sections */}
          {sections.map((section) => (
            <TabsContent key={section.id} value={section.id} className="mt-6">
              <Card className="p-8 bg-white border-gray-200 shadow-md">
                <div className="prose prose-sm sm:prose-base max-w-none dark:prose-invert">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                  <Streamdown>{section.content}</Streamdown>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Quick Reference Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-600" />
              考试重点提示
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ 补码运算是理解有符号数的关键</li>
              <li>✓ 标志位（CF, OF, ZF, SF）影响条件跳转</li>
              <li>✓ 内存寻址方式需要掌握段地址和偏移地址的组合</li>
              <li>✓ LOOP指令依赖CX寄存器，是循环的核心</li>
              <li>✓ PE格式地址转换（VA, RVA, FOA）是论述题重点</li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              学习建议
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>1. 先掌握基本概念（数制、补码、寄存器）</li>
              <li>2. 理解内存寻址的物理地址计算</li>
              <li>3. 通过编程题巩固指令的使用</li>
              <li>4. 分析程序流程，理解循环和子程序</li>
              <li>5. 复习PE格式原理和地址转换</li>
            </ul>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            本复习资料基于王爽《汇编语言（第4版）》，涵盖16位DOS汇编语言的所有考点。
          </p>
          <p className="text-sm text-gray-500">
            祝您考试顺利！💪
          </p>
        </div>
      </main>
    </div>
  );
}
