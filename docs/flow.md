# Flyt

En oversikt over flyten i generatoren

## Forutsetninger

- Inndata er en liste med fødselsnummer og PC-kode
- PC-koder som skal ende med faktura er PC17, PC17x og PC18
- Dersom eleven er under 18 skal faktura sendes til en av de foresatte
- Lister tas ut pr varenummer så PC17x kommer på egen liste

## Saksgang

- Liste importeres i robot
- Det legges til en oppføring med varenummer og sum utfra PC-koder
  - Dersom det er en pc-kode som ikke matcher fjernes personen fra videre saksgang
- Det gjøres oppslag i det sentrale folkeregisteret
- Utfra elevens alder settes fakturamottaker til elev eller foresatt
  - Dersom det ikke er treff i det sentrale folkeregisteret fjernes personen fra videre saksgang
- Oppslag mot kontakt og reservasjonsregisteret for å finne epost/mobil til fakturamottaker (om denne ikke har reservert seg)
- generere .csv-fil som skal kunne importeres av Visma

## Unntak

- på elever under 18 hvor foresatte ikke finnes i registeret vil faktura knyttes til eleven men navnet vil være "Foresatte til {navnElev}"
- mottakere som er reservert mot digital kommunikasjon i Kontakt og reservasjonsregisteret vil få faktura på print (e-post og mobil legges ikke i listen)