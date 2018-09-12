# generate-faktura-grunnlag

Generere fakturagrunnlag for import til visma

Forutsetter at data er i en .csv-fil og at den har `.job.` som en del av filnavnet (eks: 2018-08-06.job.csv)

Det må også være "ekte" .csv mao kommaseparert

## Format
```
Enhet,Programområde,Personid,Basisgruppe,,Fornavn,Epost,Etternavn,PC,Skoleår,Kol1,Orgnr
BAMVS,ELELE1----,01020304050,,ELELE1----,Ulla,,Norakk,,1,,974568098
BAMVS,TPTIP1----,06070809100,,TPTIP1----,Anton,,Gåbortbukser,,1,,974568098
```

# Oppsett

- opprett en .env-fil med aktuell konfigurasjon

```
DSF_SERVICE_URL=https://dsf.service.io
DSF_SERVICE_JWT=Louie Louie oh no I got to go Louie Louie oh no I got to go
VISMA_VARELINJE_NUMMER=23646474
```

# Bruk

- Legg datafilen i kø-mappen (```test/directories/queue```)
- Start roboten ```$ npm start```
- Det opprettes en excelfil i jobb-mappen (```test/directories/jobs```)
- Excelfilen kan nå importeres av Visma ```avtale-generator```

# Lisens

[MIT](LICENSE)