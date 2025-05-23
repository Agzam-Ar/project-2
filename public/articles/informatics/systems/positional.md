<!-- [difficulty=easy] [priority=base] [duration=normal] -->

# Позиционные

Позиционные системы счисления - представляют собой методы записи чисел, в которых значение цифр зависит от их положения. 

#### **Основные аспекты**
Основание системы определяет количество уникальных символов
**Например:**  
 `В десятичной системе - 10`
 `В двоичной - 2`

**Пример для двоичной системы:**
   `Основание 2: 0, 1`
   `Число 1011 = 1*2^3 + 0*2^2 + 1*2^1 + 1*2^0 = 8 + 0 + 2 + 1 = 11 (в десятичной системе)`
   
---
#### **Особенности позиционных систем**

- Числа записываются в виде последовательности цифр, и каждая цифра умножается на основание, возведенное в степень, соответствующую её позиции (разряду).  
- Различные системы (десятичная, двоичная, восьмеричная, шестнадцатеричная) имеют разные основания и применяются в различных областях.  

##### **Преобразование чисел в позиционной системе**
**Алгоритм:****  
Для перевода числа в позиционную систему необходимо делить число на основание системы, записывая остатки.  
**Например:**  
Для перевода числа 13 в двоичную систему:  
   `1.  13 / 2 = 6, остаток 1`  
   `2.  6 / 2 = 3, остаток 0`
   `3.  3 / 2 = 1, остаток 1`  
   `4.  1 / 2 = 0, остаток 1` 
Читаем остатки снизу вверх: 1101 (бинарное представление 13).

---
#### **Потеря точности**  
- При представлении вещественных чисел в позиционной системе может возникать потеря точности. В двоичной системе, 
  **Например:**
  Числа, такие как `0.1`, не могут быть точно представлены, из-за ограниченного количества бит. 

- Это приводит к необходимости округления, что может нарушить точность вычислений, особенно в сложных математических операциях.

---

#### **Представление вещественного числа**  
- В позиционных системах вещественные числа представляются с использованием формата, который включает целую и дробную части, **Например:**
   `В двоичной системе они могут выглядеть как 110.101. ` 
- Обычно для представления вещественных чисел используется экспоненциальный формат, где число представляется как мантисса и порядок. **Например:**
   `1.1 * 2^3 в двоичной системе. `  
- Этот подход позволяет сохранить больше значащих цифр, но также влечет за собой сложности в вычислениях, связанные с нормализацией и округлением.

---
#### **Преимущества позиционных систем**  
##### **Упрощение арифметических операций:** 
  Один и тот же алгоритм можно применять независимо от разряда. Легкость для восприятия и удобство в вычислениях.  

---
#### **Недостатки позиционных систем**  
• Возможные сложности при переводах между системами с разными основаниями.  
• Потенциальные ошибки при ручных преобразованиях из-за большой длины чисел
**Например:**
 `В двоичной системе `
• Ограниченность в отношении представления вещественных и отрицательных чисел без дополнительных методов 
**Например:**
 `Кодирования с фиксированной запятой `  

---
## Проверь себя

### Какое основание имеет десятичная система?  

```quiz
- 8
+ 10  
- 2  
- 16
```

---
### Какой системой чисел является 1011 в двоичной системе? 
```quiz
- 12  
- 10   
+ 11  
- 13
```

---
### Как осуществляется преобразование числа в позиционную систему?  

```quiz
- Умножением на основание
+ Делением на основание   
- Сложением остатков   
- Вычитанием из числа  
```

---
### Какой метод позволяет сохранить больше значащих цифр при представлении вещественных чисел?  

```quiz
- Дробный формат    
+ Экспоненциальный формат   
- Десятичный формат    
- Простое округление    
```

---
### Какой из следующих пунктов является недостатком позиционных систем?**

```quiz
- Упрощение арифметических операций  
- Легкость восприятия     
+ Сложности при переводах между системами   
- Удобство вычислений    
```

---
###  **Какую проблему может вызывать представление вещественных чисел в позиционной системе?**  

```quiz
- Требует дополнительного объяснения    
- Неполное представление  
+ Потеря точности   
- Увеличение размера числа  
```
