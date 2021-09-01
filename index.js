'use strict';

const http = require('http');
const path = require('path');
const express = require('express');

const app = express();

const port = process.env.PORT || 3000

const Tietovarasto = require('./jsonVarasto/tietovarastokerros');
const tietovarasto = new Tietovarasto();

const palvelin = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'sivumallit'));

app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req,res)=>res.render('valikko'));

app.get('/all', (req,res)=>{
    tietovarasto.haeKaikki().then(tulos=>res.render('kaikkiTietokoneet',{tulos}));
});

app.get('/haeTietokone', (req,res)=> res.render('haeTietokone',{
    paaotsikko:'Hae tietokone',
    otsikko:'Haetut tiedot',
    toiminto:'/haeTietokone'
}));

app.post('/haeTietokone',(req,res)=>{
    if(!req.body) return res.sendStatus(500);
    const tunniste= req.body.tunniste;
    tietovarasto.hae(tunniste)
        .then(tulos => res.render('tietokoneSivu', {tulos}))
        .catch(virhe=>res.render('statusSivu',{
            paaotsikko:'virhe',
            otsikko:'virhe',
            status:virhe
        }));            
});

app.get('/lisayslomake', (req,res)=>res.render('lomake', {
    paaotsikko:'Lisää tietokone',
    otsikko:'Syötä uusi tietokone',
    toiminto:'/lisaa',
    tunniste:{value:'',readonly:''},
    nimi:{value:'',readonly:''},
    tyyppi:{value:'',readonly:''},
    lukumaara:{value:'',readonly:''},
    suoritin:{value:'',readonly:''}
}));

app.post('/lisaa', (req,res)=>{
    tietovarasto.lisaa(req.body)
        .then(status=>res.render('statusSivu',{
            paaotsikko:'Status',
            otsikko:'Status',
            status
        }))
        .catch(virhe=>res.render('statusSivu',{
            paaotsikko:'virhe',
            otsikko:'virhe',
            status:virhe
        }));            
});

app.get('/paivityslomake', (req,res)=> res.render('lomake', {
    paaotsikko:'Päivitä tietokoneen tiedot',
    otsikko:'Muuta tietokoneen tietoja',
    toiminto:'/paivitatiedot',
    tunniste:{value:'',readonly:''},
    nimi:{value:'',readonly:'readonly'},
    tyyppi:{value:'',readonly:'readonly'},
    lukumaara:{value:'',readonly:'readonly'},
    suoritin:{value:'',readonly:'readonly'}
}));

app.post('/paivitatiedot', async (req,res)=>{
    const tietokoneTunniste=req.body.tunniste;
    try {
        const tietokone= await tietovarasto.hae(tietokoneTunniste);
        res.render('lomake', {
            paaotsikko:'Päivitä tietokoneen tiedot',
            otsikko:'Muuta tietokoneen tietoja',
            toiminto:'/paivitatietokone',
            tunniste:{value: tietokone.tunniste,readonly:'readonly'},
            nimi:{value: tietokone.nimi,readonly:''},
            tyyppi:{value: tietokone.tyyppi,readonly:''},
            lukumaara:{value: tietokone.lukumaara,readonly:''},
            suoritin:{value: tietokone.suoritin,readonly:''}

        });
    }
    catch(virhe){
    res.render('statusSivu',{
        paaotsikko:'virhe',
        otsikko:'virhe',
        status:virhe
        });  
    }          
});

app.post('/paivitatietokone', (req,res)=>{
    tietovarasto.paivita(req.body)
        .then(status=>res.render('statusSivu',{
            paaotsikko:'Status',
            otsikko:'Status',
            status
        }))
        .catch(virhe=>res.render('statusSivu',{
            paaotsikko:'virhe',
            otsikko:'virhe',
            status:virhe
        }))      
 });

 app.get('/poistaTietokone', (req,res)=> res.render('haeTietokone',{
    paaotsikko:'Poista',
    otsikko:'Hae poistettava',
    toiminto:'/poistaTietokone'
}));

app.post('/poistaTietokone',(req,res)=>{
    if(!req.body) return res.sendStatus(500);
    const tunniste= req.body.tunniste;
    tietovarasto.poista(tunniste)
    .then(status=>res.render('statusSivu',{
        paaotsikko:'Status',
        otsikko:'Status',
        status
    }))
    .catch(virhe=>res.render('statusSivu',{
        paaotsikko:'virhe',
        otsikko:'virhe',
        status:virhe
    }));           
                   
});




palvelin.listen(port,()=>console.log(`${port}: kuuntelee...`));