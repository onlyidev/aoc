p ← &fras "input.txt"
s ← ⊜□≠,@\n p

MaxInGame! ← /↥♭≡(≡⊐parse regex "\\d+" ⊔) regex ⊂"\\d+ "^0
RgbMatrix ← ≡⊔≡⍜⊔[⊃⊃MaxInGame!"red" MaxInGame!"green" MaxInGame!"blue"] s
Identity ← ⊞=.⇡ 3
IsGamePossible ← =3⍥≡/+2≡× ¤Identity ⊞≥ RgbMatrix [12 13 14]

/++1⊚IsGamePossible # Part 1
/+≡/×RgbMatrix      # Part 2
