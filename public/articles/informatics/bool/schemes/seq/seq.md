<!-- [difficulty=hard] [priority=advanced] [duration=long] -->

# Триггеры

> Базовые элементы последовательных схем, способные хранить **1 бит информации** *(1 или 0)*. Они являются основой регистров, счетчиков, оперативной памяти и других устройств с памятью

## Классификация триггеров

### По способу управления

- **Асинхронные** – реагируют на изменение входных сигналов мгновенно
- **Синхронные** – меняют состояние только по активному фронту/уровню тактового сигнала $C$, $Clk$

### По функциональности

- **RS-триггер** *(Reset-Set)* – базовый тип с установкой и сбросом
- **D-триггер** *(Data, Delay)* – запоминает входной сигнал
- **JK-триггер** – универсальный, устраняет неопределенность RS-триггера
- **T-триггер** *(Toggle)* – меняет состояние на противоположное при каждом такте

---
### Основные типы триггеров

### RS-триггер (асинхронный)

![RS-триггер](photo_2025-04-08_19-54-44.jpg)

**Управление:**
- **R** *(Reset)* – сброс в `0`
- **S** *(Set)* – установка в `1`
**Недостаток:** запрещенная комбинация $R=1, S=1$ (неопределенное состояние)
**Реализация:** на элементах **ИЛИ-НЕ** или **И-НЕ**

|$R$|$S$|$Q(t+1)$|
|---|---|---|
|$0$|$0$|$Q(t)$|
|$0$|$1$|$1$|
|$1$|$0$|$0$|
|$1$|$1$|Запрещено|

### D-триггер (синхронный)

![D-триггер](photo_2025-04-08_21-15-38.jpg)
**Управление:**
- **D (Data)** – значение, которое записывается в триггер по такту
- **C (Clock)** – синхронизация (обычно по фронту)

**Применение:** регистры, буферы

|$C$|$D$|$Q(t+1)$|
|---|---|---|
|$↑$|$0$|$0$|
|$↑$|$1$|$1$|

### JK-триггер (синхронный)

![JK-триггер](photo_2025-04-08_21-19-38.jpg)

**Управление:**
- **J** *(Jump)* – аналог `S` (установка в `1`)
- **K** *(Kill)* – аналог `R` (сброс в `0`)
- **C** *(Clock)* – синхронизация

**Особенность:** при `J=1, K=1` триггер **инвертирует** состояние $Q(t+1) = ¬Q(t)$

|$C$|$J$|$K$|$Q(t+1)$|
|---|---|---|---|
|$↑$|$0$|$0$|$Q(t)$|
|$↑$|$0$|$1$|$0$|
|$↑$|$1$|$0$|$1$|
|$↑$|$1$|$1$|$¬Q(t)$|

### T-триггер (синхронный)
![T-триггер](photo_2025-04-08_21-24-58.jpg)

**Управление:**
- **T** *(Toggle)* – если `1`, то состояние меняется на противоположное
- **C** *(Clock)* – синхронизация

**Применение:** счетчики, делители частоты

| $C$ | $T$ | $Q(t+1)$ |
| ----- | ----- | ---------- |
| $↑$     | $0$     | $Q(t)$      |
| $↑$     | $1$     | $¬Q(t)$      |

---

# Регистры

> Последовательностные цифровые устройства, предназначенные для **хранения, преобразования и передачи** двоичных данных. Они состоят из триггеров (обычно D- или JK-типа) и дополнительных комбинационных схем

## Классификация регистров

### По способу ввода/вывода данных

- **Последовательные (сдвиговые)** – данные вводятся/выводятся по одному биту за такт
- **Параллельные** – данные загружаются/считываются сразу все биты
- **Универсальные** – поддерживают оба режима

### По функциональности

- **Регистры хранения** – просто хранят данные
- **Сдвиговые регистры** – сдвигают биты влево/вправо
- **Реверсивные регистры** – могут сдвигать в обе стороны
- **Кольцевые регистры** – замкнутая цепь сдвига

## Основные типы регистров

### Параллельный регистр (регистр хранения)

**Принцип работы:**
- Все биты данных загружаются одновременно по тактовому сигналу
- Используются **D-триггеры**, соединенные параллельно

**Схема:**
![схема](photo_2025-04-08_21-50-06.jpg)

### Последовательный (сдвиговый) регистр

**Принцип работы:**

- Данные вводятся **последовательно** (бит за битом) и сдвигаются по тактовым импульсам

**Схема:**
![схема](photo_2025-04-08_21-44-43.jpg)
### Реверсивный сдвиговый регистр

**Принцип работы:**

- Может сдвигать данные **влево `<<`** или **вправо `>>`** в зависимости от управляющего сигнала

**Схема:**
![схема](photo_2025-04-08_21-54-14.jpg)

### Кольцевой регистр

**Принцип работы:**

- Выход последнего триггера соединен со входом первого
- Данные циркулируют по кругу

**Схема:**
![схема](photo_2025-04-08_21-57-32.jpg)

## Управление регистрами

- **Тактовый сигнал (Clk)** – синхронизация
- **Разрешение загрузки (Load)** – активация параллельной записи
- **Сброс (Reset)** – обнуление всех битов
- **Направление сдвига (Dir)** – для реверсивных регистров

## Применение регистров

1. **Хранение данных** (регистры процессора, буферы)
2. **Последовательная передача** (UART, SPI, I²C)
3. **Арифметические операции** (сдвиг = умножение/деление на 2)
4. **Генерация последовательностей** (ПЗУ, кольцевые регистры)
5. **Цифровая обработка сигналов** (линии задержки)

---

# Счетчики

> Устройство, которое **запоминает предыдущее состояние** и **изменяет его при поступлении тактового импульса**. Это означает, что оно использует **память** — триггеры или регистры — и зависит от времени

## Классификация счётчиков

### По направлению счёта

- **Суммирующие (инкрементные)** – считают вверх $0→1→2→...→N$
- **Вычитающие (декрементные)** – считают вниз $N→...→2→1→0$
- **Реверсивные** – могут работать в обоих режимах

### По модулю счёта

- **Двоичные** – считают до $2^n - 1$ (например, 4-битный: $0...15$).
- **Декадные (десятичные)** – считают до $9$ (используют BCD-код).
- **С произвольным модулем** (например, $0→5→10→...$).

### По способу переключения триггеров

- **Синхронные** – все триггеры переключаются одновременно по тактовому сигналу.
- **Асинхронные (рипл-счётчики)** – каждый следующий триггер переключается от предыдущего (задержка накапливается).

## Основные типы счётчиков

### Асинхронный счётчик

**Принцип работы:**
- Каждый триггер переключается по спаду/фронту сигнала от предыдущего.
- Задержка увеличивается с ростом разрядности.

### Синхронный счётчик

**Принцип работы:**
- Все триггеры переключаются **одновременно** по тактовому сигналу.
- Логика управления строится на **JK-** или **D-триггерах**.

### Декадный (десятичный) счётчик

**Принцип работы:**
- Считает от $0$ до $9$, затем сбрасывается.
- Реализуется через **принудительный сброс** при достижении $10$ (например, $1010_2$).

### Кольцевой счётчик

**Принцип работы:**
- Состоит из сдвигового регистра, где только **один триггер в $1$**, остальные в $0$.
- При каждом такте $1$ сдвигается.

## Сброс и загрузка значения

- **Асинхронный сброс (Reset)** – мгновенно обнуляет счётчик.
- **Синхронный сброс** – сброс только по тактовому сигналу.
- **Параллельная загрузка (Load)** – запись произвольного значения.

## Применение счётчиков

1. **Тактовые генераторы** (делители частоты).
2. **Таймеры и часы** (декадные счётчики).
3. **Адресация памяти** (последовательный перебор ячеек).
4. **Цифровая обработка сигналов** (ШИМ, управление ШД).
5. **Управление процессами** (конечные автоматы).

---

## Проверь себя

### Какой тип триггера имеет запрещенную комбинацию входов?
```quiz
- T-триггер 
- D-триггер
+ RS-триггер
- JK-триггер
```
### Что происходит с JK-триггером при $J=1$, $K=1$?
```quiz
+ Инвертирует состояние  
- Сохраняет состояние
- Сбрасывается в 0
- Устанавливается в 1 
```
### Какой триггер используется для создания делителя частоты?
```quiz
+ T-триггер  
- D-триггер 
- RS-триггер
- JK-триггер  
```
### В каком регистре выход последнего триггера соединен со входом первого?
```quiz
- Реверсивный
+ Кольцевой 
```
### Какой счетчик имеет накапливающуюся задержку?
```quiz
- Синхронный    
+ Асинхронный
- Декадный
- Реверсивный 
```
### Какое устройство используется для временного хранения данных в процессоре?
```quiz
- Счетчик  
- Мультиплексор
+ Регистр
- Дешифратор
```
### Какой элемент цифровой техники может использоваться для генерации псевдослучайных чисел?
```quiz
- D-триггер  
+ Кольцевой регистр
- Асинхронный счетчик
- RS-триггер
```