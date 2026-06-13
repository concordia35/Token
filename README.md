# Concordia token landing · version 15

Mobiloptimeret landingsside til QR-koden på den 3D-printede token.

## Ændringer i version 15

- Det lyserøde skær over mønten er fjernet.
- Årsagen var en dekorativ CSS-overlay i `.coin-card::after`.
- Heroen er derfor mere ren og neutral nu.

## Hvis du vil fjerne det manuelt

Åbn `styles.css` og find denne regel:

`.coin-card::after`

Slet den helt eller erstat indholdet med:

```css
.coin-card::after {
  content: none;
}
```
