/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const functions = require('firebase-functions');
const {WebhookClient} = require('dialogflow-fulfillment');
const {Card, Suggestion} = require('dialogflow-fulfillment');



exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
   let negozio = request.body.queryResult.parameters['negozio'];
    let products = {
        '35440062':{
            title: `REF.35440062. SET NAUTOLEX GHIACCIO`,
            imageUrl: 'https://leroymerlin-res-2.cloudinary.com/images/b_rgb:FFF,c_pad,cs_no_cmyk,d_no-image_available.png,dpr_1.0,f_auto,fl_lossy,h_400,q_80,w_400/5d52acb5-bc58-47c1-96be-7f2c6b24bfaf/Set-Nautolex-ghiaccio-35440062',
            text: `Negozio di Milano Assago. Disponibile su ordinazione `,
            buttonText: 'Maggiori Informazioni',
            buttonUrl: 'https://www.leroymerlin.it/catalogo/set-nautolex-ghiaccio-35440062-p'
        },
        '36512350':{
            title: `REF.36512350. CUCINA FREESTANDING ELETTRONICA `,
            imageUrl: "https://leroymerlin-res-2.cloudinary.com/images/b_rgb:FFF,c_pad,cs_no_cmyk,d_no-image_available.png,dpr_1.0,f_auto,fl_lossy,h_400,q_80,w_400/530988f0-3a2b-4cdd-8048-d037b24da54a/Cucina-freestanding-elettronica-sottomanopola-De'-Longhi-MEM-965T-NN-36512350",
            text: `Negozio di ${negozio}. Disponibile su ordinazione `,
            buttonText: 'Maggiori Informazioni',
            buttonUrl: 'https://www.leroymerlin.it/catalogo/cucina-freestanding-elettronica-sottomanopola-de%27-longhi-mem-965t-nn-36512350-p'
        },
        '81265288':{
            title: `REF.81265288. LAMPADARIO NARCY `,
            imageUrl: "https://leroymerlin-res-4.cloudinary.com/images/b_rgb:FFF,c_pad,cs_no_cmyk,d_no-image_available.png,dpr_1.0,f_auto,fl_lossy,h_400,q_80,w_400/2c63eabe-eab9-40d7-a9c2-4ba678bbff38/Lampadario-Narcy-81265288",
            text: `Negozio di Milano Assago. Disponibile su ordinazione `,
            buttonText: 'Maggiori Informazioni',
            buttonUrl: 'https://www.leroymerlin.it/catalogo/lampadario-narcy-81265288-p'
        }
        
    };

function getStuk (agent) {
   let sku = request.body.queryResult.parameters['sku'];
  
   //agent.add(`Hai richiesto lo stock per ${sku}`);
   if(products[sku] !== undefined){
        agent.add(JSON.stringify(new Card(products[sku])));
    }else{
        agent.add(`<b>Non ho trovato quel prodotto ${sku}</b>`);
    }
}

  let intentMap = new Map();
  intentMap.set('GetStockBySku', getStuk)
  agent.handleRequest(intentMap);
});