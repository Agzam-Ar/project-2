<!-- [difficulty=normal] [priority=base] [duration=short] -->

# Основы булевой алгебры

## Введение
**Булева алгебра** - раздел математики, изучающий операции над логическими величинами, принимающими значения:
- **1** (истина)
- **0** (ложь)

**Основные области применения**:
- Проектирование цифровых схем
- Программирование
- Алгоритмы обработки данных

## Основные логические операции. Логические базисы.

### Определение
**Логический базис** - набор логических операций, через которые можно выразить все остальные

### Логическое И (AND, конъюнкция)
**Обозначения**: `∧`, `&`, `·`

**Формулы**:
1. `A ∧ B = min(A, B)`
2. `A ∧ B = ¬(¬A ∨ ¬B)` (по де Моргану)

**Таблица истинности**:
| A | B | A∧B |
|---|---|-----|
| 0 | 0 |  0  |
| 0 | 1 |  0  |
| 1 | 0 |  0  |
| 1 | 1 |  1  |

**Свойства**:
1. Коммутативность: `A ∧ B = B ∧ A`
2. Ассоциативность: `(A ∧ B) ∧ C = A ∧ (B ∧ C)`
3. Идемпотентность: `A ∧ A = A`
4. Поглощение: `A ∧ (A ∨ B) = A`
5. Дистрибутивность: `A ∧ (B ∨ C) = (A ∧ B) ∨ (A ∧ C)`


### Логическое ИЛИ (OR, дизъюнкция)
**Обозначения**: ∨, |, +

**Формулы**:

1.  `A ∨ B = max(A, B)`
2.  `A ∨ B = ¬(¬A ∧ ¬B)` (по де Моргану)

**Таблица истинности**:
| A | B | A∨B |
|---|---|-----|
| 0 | 0 |  0  |
| 0 | 1 |  1  |
| 1 | 0 |  1  |
| 1 | 1 |  1  |

**Свойства**:

1.  Коммутативность: `A ∨ B = B ∨ A`
    
2.  Ассоциативность: `(A ∨ B) ∨ C = A ∨ (B ∨ C)`
    
3.  Идемпотентность: `A ∨ A = A`
    
4.  Поглощение: `A ∨ (A ∧ B) = A`
    
5.  Дистрибутивность: `A ∨ (B ∧ C) = (A ∨ B) ∧ (A ∨ C)`

### Логическое НЕ (NOT, отрицание)

**Обозначения**: `¬`, `!`, `‾`

**Формулы**:
1.  `¬A = 1 - A`
2.  `¬¬A = A` (двойное отрицание)

**Таблица истинности**:
| A | ¬A |
|---|----|
| 0 | 1  |
| 1 | 0  |

**Свойства**:

1.  Инволютивность: `¬(¬A) = A`
2.  Граничные значения: `¬0 = 1, ¬1 = 0`
3.  Законы де Моргана:
    
    -   `¬(A ∧ B) = ¬A ∨ ¬B`
        
    -   `¬(A ∨ B) = ¬A ∧ ¬B`
 
 ### Основные базисы
1. **Стандартный базис**: `{AND, OR, NOT}`
   - Пример: XOR можно выразить как `(A ∨ B) ∧ ¬(A ∧ B)`
2. **Базис Шеффера** (NAND):
   - `¬A = A NAND A`
   - `A ∧ B = (A NAND B) NAND (A NAND B)`
   - `A ∨ B = (A NAND A) NAND (B NAND B)`
3. **Базис Пирса** (NOR):
   - `¬A = A NOR A`
   - `A ∨ B = (A NOR B) NOR (A NOR B)`
   - `A ∧ B = (A NOR A) NOR (B NOR B)`

### Теорема о функциональной полноте
Система булевых функций является полной, если она содержит:
1. Функцию, не сохраняющую 0 (например, OR)
2. Функцию, не сохраняющую 1 (например, AND)
3. Функцию, не являющуюся линейной (например, AND или OR)
4. Функцию, не являющуюся монотонной (например, NOT)
5. Функцию, не являющуюся самодвойственной (например, NOT)

## Дополнительные операции


### Исключающее ИЛИ (XOR)
**Обозначения**: `⊕`, `XOR`

**Формулы**:
1. `A ⊕ B = (A ∧ ¬B) ∨ (¬A ∧ B)`
2. `A ⊕ B = ¬(A ↔ B)`  (отрицание эквиваленции)

**Таблица истинности**:
| A | B | A⊕B |
|---|---|-----|
| 0 | 0 |  0  |
| 0 | 1 |  1  |
| 1 | 0 |  1  |
| 1 | 1 |  0  |

**Свойства**:
1. Результат истинен (1), когда операнды различны
2. Коммутативна: `A ⊕ B = B ⊕ A`
3. Ассоциативна: `(A ⊕ B) ⊕ C = A ⊕ (B ⊕ C)`
4. `A ⊕ A = 0`
5. `A ⊕ 0 = A`

### Импликация

**Обозначения**: `→`, `⇒`

**Формулы**:
1. `A → B = ¬A ∨ B`
2. `A → B = ¬(A ∧ ¬B)`

**Таблица истинности**:
| A | B | A→B |
|---|---|-----|
| 0 | 0 |  1  |
| 0 | 1 |  1  |
| 1 | 0 |  0  |
| 1 | 1 |  1  |

**Свойства**:
1. Ложна только когда `A=1` и `B=0`
2. Не коммутативна: `A → B ≠ B → A`
3. `¬(A → B) = A ∧ ¬B`
4. `A → B = ¬B → ¬A` (контрапозиция)

### Эквиваленция (XNOR)
**Обозначение**: ↔

**Формулы**:
1. `A ↔ B = (A ∧ B) ∨ (¬A ∧ ¬B)`
2. `A ↔ B = ¬(A ⊕ B)  (отрицание XOR)`
3. `A ↔ B = (A → B) ∧ (B → A)`

**Таблица истинности**:
| A | B | A ↔ B |
|---|---|-------|
| 0 | 0 |   1   |
| 0 | 1 |   0   |
| 1 | 0 |   0   |
| 1 | 1 |   1   |

**Свойства**:
1. Результат истинен (1), когда оба операнда равны
2. Является обратной операцией к XOR
3. Коммутативна: `A ↔ B = B ↔ A`
4. Ассоциативна: `(A ↔ B) ↔ C = A ↔ (B ↔ C)`



## Основные законы булевой алгебры 

### Закон коммутативности
**Суть**: Порядок операндов не влияет на результат

**Для AND**:
```A ∧ B = B ∧ A```
Пример:
- "Дождь И ветер" = "Ветер И дождь"
- `1 ∧ 0 = 0 ∧ 1 = 0`

**Для OR**:
```A ∨ B = B ∨ A```
Пример:
- "Будет экзамен ИЛИ тест" = "Будет тест ИЛИ экзамен"
- `1 ∨ 0 = 0 ∨ 1 = 1`

### Закон ассоциативности
**Суть**: Группировка операций не влияет на результат

**Для AND**:
```(A ∧ B) ∧ C = A ∧ (B ∧ C)```
Пример:
- `(1 ∧ 1) ∧ 0 = 1 ∧ (1 ∧ 0) = 0`

**Для OR**:
```(A ∨ B) ∨ C = A ∨ (B ∨ C)```
Пример:
- `(1 ∨ 0) ∨ 0 = 1 ∨ (0 ∨ 0) = 1`

### Закон дистрибутивности
**Суть**: Аналог распределительного закона в алгебре

**AND относительно OR**:
```A ∧ (B ∨ C) = (A ∧ B) ∨ (A ∧ C)```
Пример:
- "Вход разрешен И (по пропуску ИЛИ по отпечатку)" = 
  "(Вход разрешен И по пропуску) ИЛИ (Вход разрешен И по отпечатку)"

**OR относительно AND**:
```A ∨ (B ∧ C) = (A ∨ B) ∧ (A ∨ C)```
Пример:
- "Сдал экзамен ИЛИ (учил И практиковался)" =
  "(Сдал экзамен ИЛИ учил) И (Сдал экзамен ИЛИ практиковался)"

### Законы де Моргана (полная версия)
**Суть**: Связь между AND и OR через отрицание

**Первая форма**:
```¬(A ∧ B) = ¬A ∨ ¬B```
Пример:
- "Не (тепло И солнечно)" = "Не тепло ИЛИ не солнечно"
- `¬(1 ∧ 1) = ¬1 ∨ ¬1 = 0 ∨ 0 = 0`

**Вторая форма**:
```¬(A ∨ B) = ¬A ∧ ¬B```
Пример:
- "Не (дождь ИЛИ снег)" = "Не дождь И не снег"
- `¬(0 ∨ 1) = ¬0 ∧ ¬1 = 1 ∧ 0 = 0`

**Графическая интерпретация**:
1. Отрицание всего выражения
2. Замена AND на OR (и наоборот)
3. Отрицание каждого операнда

**Применение**:
- Упрощение сложных логических выражений
- Проектирование цифровых схем
- Оптимизация SQL-запросов

## 5. Примеры применения

### 5.1. Упрощение выражения
**Дано**: ¬(A ∨ ¬B) ∧ A  
**Решение**:
1. `¬(A ∨ ¬B) ∧ A`
2. `(¬A ∧ B) ∧ A` (по де Моргану)
3. `¬A ∧ A ∧ B`
4. `0 ∧ B = 0`

### Реализация на языке C
```c
#include <stdbool.h>
#include <stdio.h>

bool logical_and(bool a, bool b) {
    return a && b;
}

bool logical_or(bool a, bool b) {
    return a || b;
}

bool logical_not(bool a) {
    return !a;
}

int main() {
    printf("AND(1, 0) = %d\n", logical_and(true, false)); // 0
    printf("OR(1, 0) = %d\n", logical_or(true, false));   // 1
    printf("NOT(1) = %d\n", logical_not(true));          // 0
    return 0;
}
```
### Реализация на языке Pascal
```pascal
program BooleanAlgebra;
uses crt;

function LogicalAnd(a, b: boolean): boolean; begin
    LogicalAnd := a and b;
end;

function LogicalOr(a, b: boolean): boolean; begin
    LogicalOr := a or b;
end;

function LogicalNot(a: boolean): boolean; begin
    LogicalNot := not a;
end;

begin
    writeln('AND(true, false) = ', LogicalAnd(true, false)); // false
    writeln('OR(true, false) = ', LogicalOr(true, false)); // true
    writeln('NOT(true) = ', LogicalNot(true)); // false
end.
```

## Эквивалентные преобразования

### Основные принципы
**Эквивалентные преобразования** - замена выражений на тождественно равные с сохранением значения функции

**Основные методы**:
1. Применение законов де Моргана
2. Использование дистрибутивности
3. Подстановка констант (0 и 1)
4. Применение идемпотентности

### Примеры преобразований
1. ¬(A ∧ B) ∧ C = (¬A ∨ ¬B) ∧ C
2. A ∧ (B ∨ ¬B) = A ∧ 1 = A
3. (A ∨ B) ∧ (¬A ∨ B) = B ∨ (A ∧ ¬A) = B ∨ 0 = B

### Алгоритм упрощения
- Раскрыть все отрицания (де Морган)
- Применить дистрибутивность
- Удалить лишние операции (идемпотентность)
- Подставить константы

## Функции одной и двух переменных

### Функции одной переменной
| x | f₁ | f₂ | f₃ | f₄ |
|---|---|---|---|---|
| 0 | 0 | 0 | 1 | 1 |
| 1 | 0 | 1 | 0 | 1 |

Где:
- f₁: константа 0
- f₂: тождественная функция (x)
- f₃: отрицание (¬x)
- f₄: константа 1

### Функции двух переменных
Всего 16 возможных функций `(2^(2^2))`:

| x | y | AND | OR | XOR | → | ← | ≡ |
|---|---|-----|----|-----|---|---|---|
| 0 | 0 | 0 | 0 | 0 | 1 | 1 | 1 | 
| 0 | 1 | 0 | 1 | 1 | 1 | 0 | 0 |
| 1 | 0 | 0 | 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 0 | 1 | 1 | 1 |

**Особые функции**:
- Штрих Шеффера *(NAND)* - `¬(A ∧ B)`
- Стрелка Пирса *(NOR)* - `¬(A ∨ B)`


## Проверь себя

Какая операция соответствует следующей таблице истинности?
A | B | F 
--|---|--
0 | 0 | 0 
0 | 1 | 1 
1 | 0 | 1 
1 | 1 | 1

```quiz
- AND
+ OR
- XOR
```
***
Какой результат выражения: ¬(1 ∧ 0)?
```quiz
+ 1
- 0
- Неопределен
```
***
Как упростить выражение: ¬(A ∨ ¬B)?
```quiz
- ¬A ∧ B
+ ¬A ∧ B
- A ∧ ¬B
```
***
Какое выражение эквивалентно A ∧ (B ∨ C)?
```quiz
+ (A ∧ B) ∨ (A ∧ C)
- (A ∨ B) ∧ (A ∨ C)
- A ∨ (B ∧ C)
```
***
Дано: A=1, B=0. Чему равно A ⊕ B?
```quiz
- 0
+ 1
- Неопределено
```
***
Упростите: (A ∧ B) ∨ (A ∧ ¬B)
```quiz
+ A
- B
- 1
```
***
Как выглядит преобразование по де Моргану для ¬(¬X ∧ Y)?
```quiz
- X ∨ ¬Y
- ¬X ∨ Y
+ X ∨ ¬Y
```
***
Верно ли, что ¬(A ∨ B ∨ C) = ¬A ∧ ¬B ∧ ¬C?
```quiz
- Да
- Нет
- Только для A=B=C
```
***
Чему равно: 1 → (0 ⊕ 1)?
```quiz
- 0
+ 1
- Ошибка
```
***
Какое выражение соответствует "Если не A, то B"?
```quiz
- A ∧ B
+ ¬A → B
- A ∨ ¬B
 ```
***
Какая функция НЕ является функционально полной?
```quiz
- {AND, NOT}
- {OR, NOT}
+ {AND, OR}
```
***
Как выразить импликацию через базис Шеффера?
```quiz
+ A NAND (B NAND B)
- (A NAND A) NAND B
- A NAND B
```
***
Сколько существует различных функций от двух переменных?
```quiz
- 8
+ 16
- 32
```
***
Какое преобразование НЕ является эквивалентным?
```quiz
- A ∧ (B ∨ ¬B) → A
- ¬(A ∨ B) → ¬A ∧ ¬B
+ A ∨ B → A ∧ B
```
***
Какой базис является минимальным по количеству операций?
```quiz
- {AND, OR, NOT}
+ {NAND}
- {XOR, AND}
```