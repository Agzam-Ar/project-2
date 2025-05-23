<!-- [difficulty=easy] [priority=base] [duration=long] -->

# Типы

## Позиционные и непозиционные системы счисления 

### Позиционные системы счисления:

> Позиционные системы счисления - представляют собой методы записи чисел, в которых значение цифр зависит от её позиции (разряда) в числе.

#### Двоичная система счисления  
Основание: **2**
Символы: **0, 1**

**Например:**  
- Число $1011_2$  в десятичной системе:  
$$1 \cdot 2^3 + 0 \cdot 2^2 + 1 \cdot 2^1 + 1 \cdot 2^0 = 8 + 0 + 2 + 1 = 11_{10}$$ 
- Вещественное число  $110.101_2$:  
  Целая часть:  $$1 \cdot 2^2 + 1 \cdot 2^1 + 0 \cdot 2^0 = 6_{10}$$  
  Дробная часть:  $$1 \cdot 2^{-1} + 0 \cdot 2^{-2} + 1 \cdot 2^{-3} = 0.5 + 0 + 0.125 = 0.625_{10}$$  
  Итого:   $6.625_{10}$.  

#### Восьмеричная система счисления  
Основание: **8**

Символы: **0–7**

**Например:**  
- Число $257_8$ в десятичной системе:  
  $$2 \cdot 8^2 + 5 \cdot 8^1 + 7 \cdot 8^0 = 128 + 40 + 7 = 175_{10}$$

**Преимущества:**  
- Компактнее двоичной (1 символ = 3 бита).  


#### Шестнадцатеричная система счисления 
Основание: **16**

Символы: **0–9, A (10), B (11), C (12), D (13), E (14), F (15)** 

**Например:**  
- Число $1F3_{16}$ в десятичной системе:  
 $$ 1 \cdot 16^2 + 15 \cdot 16^1 + 3 \cdot 16^0 = 256 + 240 + 3 = 499_{10}$$  
**Преимущества:**  
- Компактное представление двоичных данных (1 символ = 4 бита). 


#### **Особенности перевода**
  
1. Делите число на основание новой системы.  
2. Записывайте остатки от деления.  
3. Повторяйте до получения нуля.  
4. Результат — остатки, записанные снизу вверх.  

**Пример перевода $13_{10}$ в двоичную:** 

  `13 / 2 = 6 (остаток 1)`  
  `6/ 2 = 3 (остаток 0)`  
  `3 / 2 = 1 (остаток 1)`  
   `1 / 2 = 0 (остаток 1)`
  Результат:  $1101_2$.  


#### **Перевод дробных чисел**

1. Дробную часть умножайте на основание.  
2. Записывайте целую часть результата.  
3. Повторяйте до достижения нужной точности.  

**Пример перевода $0.625_{10}$ в двоичную:**  

`0.625 × 2 = 1.25 → 1`  
`0.25 × 2 = 0.5 → 0`  
`0.5 × 2 = 1.0 → 1`  
Результат: $0.101_2$ 

#### **Перевод между 8-ной, 16-ной и 2-ной системами**  

- 8-ная → 2-ная: Каждая цифра заменяется 3 битами.  
  **Например:** $7_8 = 111_2$ 
- 16-ная → 2-ная: Каждая цифра заменяется 4 битами.  
  **Например:** $F_{16} = 1111_2$ 

#### **Основные арифметические операции**

##### **Двоичная система**  

**Сложение:**  
$( 0 + 0 = 0 ),( 0 + 1 = 1), (1 + 1 = 10 ) (перенос 1)$.

**Например:**

$$\begin{array}{r} \ \ 1011 \\+\ 1101 \\\hline\ \ 11000 \\\end{array}$$

**Вычитание:**  

Используется заём из старшего разрята. 

**Например:**
$$\begin{array}{r} \ \ 1101 \\-\ 1011 \\\hline\ \ 10 \\\end{array}$$

##### **Восьмеричная и шестнадцатеричная системы**

Принципы аналогичны десятичной системе, но с учётом основания:  
- **Сложение:** При превышении значения $7_8$ или $F_{16}$ выполняется перенос.  
- **Умножение:** Используются таблицы умножения для соответствующих систем.  

**Пример сложения в 16-ной системе:**  
$$\begin{array}{r} \ \ A3 \\+\ 1F \\\hline\ \ C2 \\\end{array}$$
**Пояснение:**  $( 3 + F = 12_{10} = C),( A + 1 + 1 = C))$

---

### **Непозиционные системы счисления**

Непозиционные системы счисления - системы, в которых значение символа не зависит от его позиции в записи числа.  

**Римская система:**  
  - **Символы:** `I (1), V (5), X (10), L (50), C (100), D (500), M (1000)`, в которой символы имеют фиксированные значения.
  
---








## Аддитивные и мультипликативные системы счисления

### Аддитивные системы счисления 

Аддитивные системы счисления — это системы, где число формируется суммой значений символов
 
  - Принцип работы: каждый символ добавляется к общему значению.
  
**Например:**
`Римская система, где VI = V + I = 5 + 1 = 6.`

### Мультипликативные системы счисления

Мультипликативные системы счисления — в таких системах значение цифры зависит от её положения и умножения на основание системы.

**Ключевой принцип**: Каждая цифра умножается на основание в степени, равной положению цифры.
**Например**:
`Бинарная система, где значение` $101 = 1 \cdot 2^2 + 0 \cdot 2^1 + 1 \cdot 2^0 = 4 + 0 + 1 = 5.$

---

## Символические системы счисления

Символические системы счисления — в таких системах используются специальные символы для представления значений. Могут включать различные графические знаки и буквы.

**Непозиционность:**  
   - Каждый символ имеет фиксированное значение, не зависящее от положения **Например:** `Римские цифры: V = 5, X = 10`  
 
   
**Примеры:**
   - Римская система `(I, V, X, L, C, D, M)` 
   - Древнеегипетская иероглифическая система.  
   - Алгебраические системы $3_x+2 =8$ , где $x$ — переменная.

---

## Иерархические системы счисления

**Иерархические системы счисления** — это системы, где числа записываются как комбинация нескольких простых систем с разными правилами.

#### **Двоично-десятичная система счисления (BCD)**

Двоично-десятичный код (Binary-Coded Decimal, BCD) - это:
Компромисс между двоичной и десятичной системами
Каждая десятичная цифра (0-9) кодируется 4 битами

##### **Двоично-десятичные коды**

**Код 8421 (натуральный BCD)**

| Десятичная | Двоичный код (BCD) |
| ---------- | ------------------ |
| 0          | 0000               |
| 1          | 0001               |
| 2          | 0010               |
| 3          | 0011               |
| 4          | 0100               |
| 5          | 0101               |
| 6          | 0110               |
| 7          | 0111               |
| 8          | 1000               |
| 9          | 1001               |

#### **Сложение двоично-десятичных чисел**

##### **Алгоритм сложения:**

- Складываем как обычные двоичные числа
- Если результат > 9 (1001) в тетраде:
- Добавляем корректирующее число 6 (0110)
- Учитываем перенос в старшую тетраду

**Пример: 7+6**
$$\begin{aligned} &0111\ (7) \\ &+ \\  &0110\ (6) \\ &= 1101\ \text{(13 в двоичном, но недопустимо в BCD)} \end{aligned}$$
**Проблема:** `1101 в BCD — это запрещённая комбинация (в BCD допустимы только числа от 0000 до 1001, т.е. 0–9 в десятичной).`

**Решение:** Добавляем число `6 (0110)` к ошибочному результату:

$$\begin{aligned} &1101\  \\ &+ \\  &0110\ \\ &1\ 0011\ \text{(перенос в старшую тетраду +0011)} \end{aligned}$$

**Разбиваем результат на тетрады (по 4 бита):**
- `0001 (старшая тетрада = 1 в десятичной)`
- `0011 (младшая тетрада = 3 в десятичной)`
**Итог:** 0001 0011 в BCD = 13 в десятичной системе.

---
# Проверь себя

## **Какое основное отличие позиционных систем счисления от непозиционных?**  

```quiz
+ В позиционных системах значение цифры зависит от её положения
- В непозиционных системах используются только буквы
- Позиционные системы всегда имеют основание 10 
- Непозиционные системы сложнее для вычислений  
```

---
## **Почему в BCD-арифметике требуется коррекция (+6) при сложении?**

```quiz
- Чтобы перевести результат в шестнадцатеричную систему
+ Для исключения запрещённых комбинаций (A-F) в тетрадах  
- Чтобы упростить деление чисел 
- Это стандартный шаг для всех арифметических операций
```

---
## **Какой принцип лежит в основе мультипликативных систем счисления?** 

```quiz
- Число формируется суммой значений символов 
- Число представляется произведением значений символов
- Используются только степени числа 2  
+ Каждая цифра умножается на номер её позиции  
```

---
## **Что характеризует иерархические системы счисления?**  

```quiz
- Использование только двух символов (0 и 1)    
- Обязательное наличие коррекции при сложении  
- Фиксированное основание для всех разрядов
+ Числа записываются как комбинация нескольких простых систем с разными правилами.
```


---
## **Как записать десятичное число 0.625 в двоичной системе?**

```quiz
+ 0.101₂  
- 0.110₂
- 0.111₂
- 0.100₂
```
