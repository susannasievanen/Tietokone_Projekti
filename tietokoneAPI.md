# Tietokonevarasto - json toteutus

Tietokoneiden tiedot säilytetään json tiedostossa. Tietoja voi sekä lukea että kirjoittaa.

## Sievanen_Susanna_tietokoneet.json

```json
[
    {
    "tunniste":5,
    "nimi":"Hirmu II",
    "tyyppi":"pöytäkone",
    "lukumaara":30,
    "suoritin":"PiiTron 3"
    },
    {
    "tunniste":3,
    "nimi":"FutSign 3000",
    "tyyppi":"taskukone",
    "lukumaara":13,
    "suoritin":"Seleeni II"
    },
    {
    "tunniste":1,
    "nimi":"MaxEffect 2000",
    "tyyppi":"kannettava",
    "lukumaara":5,
    "suoritin":"Letni 64"
    },
    {
    "tunniste":6,
    "nimi":"GameDelux",
    "tyyppi":"superkone",
    "lukumaara":15,
    "suoritin":"MotorOle"
    },
    {
    "tunniste":4,
    "nimi":"Cera 2400",
    "tyyppi":"upotettu",
    "lukumaara":1,
    "suoritin":"Älli"
    },
    {
    "tunniste":7,
    "nimi":"Xunil 4.7",
    "tyyppi":"pelikone",
    "lukumaara":20,
    "suoritin":"Armas 8"
    },
    {
    "tunniste":2,
    "nimi":"Päärynä Mark II",
    "tyyppi":"palvelin",
    "lukumaara":7,
    "suoritin":"BNE"
    }
]
```

## Asetukset

### config.json

```json
{
    "port":3000,
    "host":"localhost"
}
```

## API

### julkinen API
-   haeKaikki()
    -   palauttaa kaikki tietokoneet taulukkona tai []
-   hae(tunniste)
    -   palauttaa tietokoneolion tai statusolion EI_LOYTYNYT
-   lisaa(tietokone)
    -   palauttaa statusolion EI LISATTY / LISAYS_OK / JO_KAYTOSSA
-   paivita(tietokone)
    -   palauttaa statusolion EI_PAIVITETTY / PAIVITYS_OK
-   poista(tunniste)
    -   palauttaa statusolion EI LOYTYNYT / EI_POISTETTU / POISTO_OK

-   getter STATUSKOODIT
    -   palauttaa kaikki statuskoodit

### yksityinen API

#### jsonReaderWriter
-   lueVarasto(varastoTiedosto)
    -   palauttaa taulukossa kaikki tietokoneoliot / []
-   kirjoitaVarasto(varastoTiedosto, data)
    -   palauttaa true / false

#### varastonApufunktiot
-   haeKaikkiVarastosta()
    -   palauttaa taulukossa kaikki tietokoneoliot / []
-   haeYksiVarastosta(avain, arvo)
    -   palauttaa tietokoneolion / null
-   lisaaVarastoon(tietokone)
    -   palauttaa true / false
-   paivitaVarasto(tietokone)
    -   palauttaa true / false
-   poistaVarastosta(tunniste)
    -   palauttaa true / false