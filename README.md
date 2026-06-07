<<<<<<< HEAD
# Purradise

**FS26_IM2_Semesterprojekt**

**Abgabe:** 07.06.2026

**URL:** http://im2.exirafov.myhostpoint.ch

## Projektbeschreibung

**Purradise** ist eine interaktive Katzen-Webseite, auf der verschiedene Inhalte rund um Katzen über APIs geladen und dargestellt werden. Die Nutzer:innen können Katzenrassen ansehen und sortieren, zufällige Katzenfakten abrufen, zufällige Katzenbilder anzeigen lassen und ein Memory-Spiel mit Katzenbildern spielen.

Das Design ist verspielt, farbig und auf ein einheitliches Katzen-Thema ausgerichtet. Die Webseite ist responsive aufgebaut und funktioniert sowohl auf Desktop als auch auf kleineren Screens.

## Features

### Startseite

- Katzenillustration als visuelles Hauptelement
- animierte Katzenaugen, die der Mausbewegung folgen
- eigene Maus-Illustration auf Desktop
- normale Maus auf kleineren Screens
- Lottie-Animation beim Öffnen der Startseite auf Mobile
- responsive Navigation

### Cat Breeds

- Katzenrassen werden aus der API geladen
- Darstellung als Cards
- Informationen pro Rasse:
  - Breed Name
  - Country
  - Origin
  - Coat
  - Pattern

- Custom Dropdown zum Sortieren
- Sortierung nach:
  - Breed Name A-Z
  - Breed Name Z-A
  - Country
  - Origin
  - Coat
  - Pattern

- Jump-Up Button am Seitenende
- Scroll-Up Button erscheint beim Scrollen

### Random Cat Facts

- zufällige Katzenfacts aus der API
- Fact-Card im gleichen Stil wie die Breed-Cards
- Button zum Laden eines neuen Facts
- Loading- und Error-Status

### Random Cat Pictures

- zufällige Katzenbilder aus der API
- grüner Rahmen um das Bild
- Bildrahmen passt sich proportional an das Bildformat an
- Button zum Laden eines neuen Katzenbildes
- Loading- und Error-Status

### Cat Memory

- 4x3 Memory mit 12 Karten
- 6 Katzenbilder werden aus der API geladen und doppelt verwendet
- Karten sind zuerst komplett grün
- beim Klick drehen sich die Karten mit einer kleinen Animation um
- gleiche Paare bleiben sichtbar
- nach gelöstem Memory erscheint eine Gratulationsnachricht
- Hintergrund wird dabei leicht ausgeblendet

## Verwendete Tools

- HTML
- CSS
- JavaScript
- JSON
- LottieFiles
- eigene Illustrationen

## APIs

### Cat Breeds

```txt
https://catfact.ninja/breeds
```

### Cat Facts

```txt
https://catfact.ninja/fact
```

### Cat Pictures

```txt
https://api.thecatapi.com/v1/images/search
```

### Cat Memory

```txt
https://api.thecatapi.com/v1/images/search?limit=6
```

## Herausforderungen und Learnings

Eine Herausforderung war die Umsetzung der animierten Katzenaugen auf der Startseite. Dabei musste ich die Augen exakt über der Katzenillustration platzieren und so positionieren, dass sie auch bei unterschiedlichen Bildschirmgrössen an der richtigen Stelle bleiben. Zusätzlich habe ich die Bewegung der Augen so programmiert, dass sie auf die Position der Maus reagieren und sich leicht in diese Richtung verschieben. Dadurch wirkt die Illustration interaktiver, ohne dass sich das Layout verschiebt.

Auf der Breed-Seite habe ich ein eigenes Dropdown umgesetzt, da das native HTML-Select nur eingeschränkt gestaltbar ist. Mit dem Custom Dropdown konnte ich die Gestaltung der Optionen, abgerundete Ecken und die Sortierfunktionen besser kontrollieren.

Bei den "cat pictures" war es anspruchsvoll, Hoch- und Querformate sauber darzustellen. Damit die Bilder nicht verzerrt werden, verwende ich das Seitenverhältnis der Bilder, um die Breite des Rahmens dynamisch anzupassen. Die Höhe des Rahmens bleibt dabei gleich.

Beim Memory-Spiel bestand die Anforderung darin, 6 Bilder aus der API zu laden und daraus 12 Karten zu erstellen. Zusätzlich habe ich eine Flip-Animation umgesetzt, damit das Umdrehen der Karten visuell nachvollziehbar ist.

Ein weiteres Learning war der Umgang mit Ladezuständen und Fehlerfällen. Da API-Daten nicht immer sofort verfügbar sind oder ein Request fehlschlagen kann, habe ich Loading- und Error-Meldungen eingebaut.

Auch die mobile Version brachte einige Herausforderungen mit sich, z.B. die Lottie-Animation, die ich nur auf kleinen Screens ersichtlich machen wollte.

## Fazit

Insgesamt bin ich mit dem Ergebnis meines Projekts zufrieden. Ich konnte die geplanten Kernfunktionen umsetzen und verschiedene API-Daten in einer interaktiven Webseite darstellen. Besonders durch die animierten Katzenaugen, das Custom Dropdown, die dynamischen Bildrahmen und das Memory-Spiel konnte ich mein Verständnis für JavaScript, DOM-Manipulation und responsive Layouts vertiefen.
=======
# IntMed_II
im2.exirafov.myhostpoint.ch
>>>>>>> 8619a8065182569bb846796977249d65da5cea3e
