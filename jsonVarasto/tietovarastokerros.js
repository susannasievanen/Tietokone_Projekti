'use strict';

const {STATUSKOODIT,STATUSVIESTIT}= require('./statuskoodit');

const {
    haeKaikkiVarastosta, 
    haeYksiVarastosta,
    lisaaVarastoon,
    paivitaVarasto,
    poistaVarastosta
} = require('./varastonApufunktiot');

module.exports = class Tietovarasto{

    get STATUSKOODIT() {
        return STATUSKOODIT;
    }

    haeKaikki() {
        return haeKaikkiVarastosta();
    }

    hae(tunniste) {
        return new Promise( async (resolve, reject)=>{
            if(!tunniste) {
                reject(STATUSVIESTIT.EI_LOYTYNYT('<tyhjä>'));     
            }
            else {
                const tulos= await haeYksiVarastosta('tunniste',tunniste);
                if(tulos) {
                    resolve(tulos);
                }
                else {
                    reject(STATUSVIESTIT.EI_LOYTYNYT(tunniste));
                }
            }
        });
    } 

    lisaa(tietokone) {
        return new Promise( async (resolve,reject)=>{
            if(await haeYksiVarastosta('tunniste', tietokone.tunniste)) {
                reject(STATUSVIESTIT.JO_KAYTOSSA(tietokone.tunniste));
            }
            else if(await lisaaVarastoon(tietokone)){
                resolve(STATUSVIESTIT.LISAYS_OK(tietokone.tunniste));
            }
            else {
                reject(STATUSVIESTIT.EI_LISATTY());
            }
        });
    }

    paivita(tietokone){
        return new Promise( async (resolve,reject)=>{
            if(await paivitaVarasto(tietokone)) {
                resolve(STATUSVIESTIT.PAIVITYS_OK(tietokone.tunniste));
            }
            else {
                reject(STATUSVIESTIT.EI_PAIVITETTY());

            }
        });
    }

    poista(tunniste) {
        return new Promise( async (resolve,reject)=>{
            if(!tunniste){
                reject(STATUSVIESTIT.EI_LOYTYNYT('<tyhjä>'));
            }
            else {
                if(await poistaVarastosta(tunniste)) {
                    resolve(STATUSVIESTIT.POISTO_OK(tunniste));
                }
                else {
                    reject(STATUSVIESTIT.EI_POISTETTU());
                }
            }
        });
    }
}