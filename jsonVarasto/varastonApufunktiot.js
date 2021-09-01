'use strict';

const path = require('path');

const varastoTiedosto = path.join(__dirname,'Sievanen_Susanna_tietokoneet.json');

const {lueVarasto, kirjoitaVarasto} = require('./jsonReaderWriter');

async function haeKaikkiVarastosta() {
    return lueVarasto(varastoTiedosto);
}


async function haeYksiVarastosta(avain,arvo){
    const tulostaulukko = await lueVarasto(varastoTiedosto);
    return tulostaulukko.find(tietokone =>tietokone[avain] == arvo) || null;
};

async function lisaaVarastoon(uusiTietokone){
    const varasto = await lueVarasto(varastoTiedosto);
    if(varasto.find(tietokone=>tietokone.tunniste== uusiTietokone.tunniste)){
        return false;
    }
    else{
        varasto.push({
            tunniste: +uusiTietokone.tunniste,
            nimi:uusiTietokone.nimi,
            tyyppi:uusiTietokone.tyyppi,
            lukumaara:+uusiTietokone.lukumaara,
            suoritin:uusiTietokone.suoritin
        });
        return await kirjoitaVarasto(varastoTiedosto,varasto);
    }
};

async function paivitaVarasto(tietokone){
    let varasto = await lueVarasto(varastoTiedosto);
    const vanhaTietokone= varasto.find(vanha=>vanha.tunniste==tietokone.tunniste);
    if(vanhaTietokone) {
        Object.assign(vanhaTietokone, {
            tunniste:+tietokone.tunniste,
            nimi:tietokone.nimi,
            tyyppi:tietokone.tyyppi,
            lukumaara:+tietokone.lukumaara,
            suoritin: tietokone.suoritin
        });
        return await kirjoitaVarasto(varastoTiedosto, varasto);
    }
    else {
        return false;
    }
};

async function poistaVarastosta(tunniste) {
    let varasto = await lueVarasto(varastoTiedosto);
    const ind=varasto.findIndex(tietokone=>tietokone.tunniste == tunniste);
    if(ind<0) return false;
    varasto.splice(ind,1);
    return await kirjoitaVarasto(varastoTiedosto, varasto);

   
}

module.exports = {
    haeKaikkiVarastosta, 
    haeYksiVarastosta, 
    lisaaVarastoon, 
    paivitaVarasto,
    poistaVarastosta
}
