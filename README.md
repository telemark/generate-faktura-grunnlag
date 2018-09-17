# generate-faktura-grunnlag

Generere fakturagrunnlag for import til visma

Forutsetter at data er i en .csv-fil og at den har `.job.` som en del av filnavnet (eks: 2018-08-06.job.csv)

Det må også være "ekte" .csv mao kommaseparert

## Format
```
Enhet,Personnr,Klasse,PC-kode,Født
BAMVS,01020304050,BV2UA,PC17,11/2/2001
BAMVS,06070809100,BV3AI,PC17x,12/1/1985
BAMVS,098265353100,BV1AI,PC18,4/4/2000
BAMVS,098265353100,BV1AI,PC-UTLÅN,2/12/2000
```

# Oppsett

- opprett en .env-fil med aktuell konfigurasjon

```
DSF_SERVICE_URL=https://dsf.service.io
DSF_SERVICE_JWT=Louie Louie oh no I got to go Louie Louie oh no I got to go
KOR_SERVICE_URL=https://kor.service.io
KOR_SERVICE_JWT=Louie Louie oh no I got to go Louie Louie oh no I got to go
```

- sett opp rette fakturalinjer i [config.js](config.js)

# Bruk

- Legg datafilen i kø-mappen (```test/directories/queue```)
- Start roboten ```$ npm start```
- Det opprettes en csv-fil i jobs-mappen (```test/directories/jobs```)
- csv-filen kan nå importeres av Visma

# Lisens

[MIT](LICENSE)