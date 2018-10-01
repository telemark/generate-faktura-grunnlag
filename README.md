# generate-faktura-grunnlag

Generere fakturagrunnlag for import til visma

Forutsetter at data er i en .csv-fil og at den har `.job.` som en del av filnavnet (eks: 2018-08-06.job.csv)

Det må også være "ekte" .csv mao kommaseparert

Feltene som kan importeres til Visma er

```
kundenr (personnr)
Navn
Adresse1
Adresse2
Postnr
Poststed
Mobil
Epost
Varenr
Pris
Antall
Merknad1
Merknad2
```

Visma Enterprise har en begrensning på hvor mange tegn som kan være i Navn, Adresse1 og Adresse2.
Dersom disse inneholder mer enn 40 tegn vil de kortes ned.

## Format på grunnlagsfil
```
Enhet,Personnr,Klasse,PC-kode,Født
BAMVS,01020304050,BV2UA,PC17,11/2/2001
BAMVS,06070809100,BV3AI,PC17x,12/1/1985
BAMVS,098265353100,BV1AI,PC18,4/4/2000
BAMVS,098265353100,BV1AI,PC-UTLÅN,2/12/2000
```

# Oppsett for produksjon

- opprett en .env-fil med aktuell konfigurasjon

```
DSF_SERVICE_URL=https://dsf.service.io
DSF_SERVICE_JWT=Louie Louie oh no I got to go Louie Louie oh no I got to go
KOR_SERVICE_URL=https://kor.service.io
KOR_SERVICE_JWT=Louie Louie oh no I got to go Louie Louie oh no I got to go
VALID_LINES=PC17,PC18 #Frivillig, brukes kun om du vil filtrere på enkelte PC-koder
```

- sett opp rette fakturalinjer i [config.js](config.js)
  - partNumber - varelinje
  - amount - pris
  - note - sendes til merknad1

# Bruk

- Legg datafilen i kø-mappen (```test/directories/queue```)
- Start roboten ```$ npm start```
- Det opprettes en csv-fil i jobs-mappen (```test/directories/jobs```)
- csv-filen kan nå importeres av Visma

# Lisens

[MIT](LICENSE)