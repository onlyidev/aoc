p ← &fras "input.txt"
s ← ⊜□≠,@\n p

PartOne ← {"1" "2" "3" "4" "5" "6" "7" "8" "9"}
PartTwo ← ⊂ {"one" "two" "three" "four" "five" "six" "seven" "eight" "nine" ";"} PartOne

i! ← ≡(□◿10+1⊏:⊙(⍏/⊐⊂)⊚≡⧻.≡⍜⊔(⊚⊐⬚@'⌕)^0) s
n ← ≡(parse/⊂≡$"_"⊂⊃(↙1|↙1⇌)⊔)
∩(/+n) i!PartTwo i!PartOne
