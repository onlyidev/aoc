# p ← &fras "input.txt"
p ← &fras "test.txt"
s ← ≡⊔⊜□≠,@\n p
SymbolMatrix ← ∵(⧻regex "[^\\d\\.]")s
NumberMatrix ← ∵(⧻regex "\\d")s
Surround! ← ⊠(↧^0↥0+)¤:[[¯1 ¯1] [¯1 0] [¯1 1] [0 ¯1] [0 1] [1 ¯1] [1 0] [1 1]]
PartNumPlaces ← ;⍢(⊙(⍜⊡⋅1):⊃(♭↙1|↘1))(>0⧻) ☇1≡Surround!(⧻SymbolMatrix) ⊚.SymbolMatrix
PartNums ← ↧ NumberMatrix PartNumPlaces
NumStartInRow ← |1 ⊝⍣⊂⋅⋅[][]⍥⊂↥0-1⊙/⊔⧻.⊞(□⊚⊐⌕)regex "1*2+1*"⊃(∘|□)/⊂≡$"_"
RotMatrix ← ⍉⊟≡□s ≡(□NumStartInRow) + NumberMatrix PartNums
Nums ← ≡⍜⊔(≡(⊐parse⊢regex "(\\d+)"))▽≠□[].≡(□⊞⊐↻⊃(⊔⊡1|⊢)) RotMatrix

/+≡⍜⊔/+Nums
