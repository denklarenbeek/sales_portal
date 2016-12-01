var app = angular.module('salesPortal');

//OFFER CONTROLLER
app.controller('pdfCtrl', function($scope, $http, $routeParams, $location, $rootScope, dataServices, sortDocumentsServices, alertMessServices) {
  var customer = $rootScope.data;
  console.log($rootScope.data);
  var company = customer.company;
  var salution = customer.salution;
  var lastname = customer.lastname;
  var street = customer.street;
  var zippcode = customer.zippcode;
  var city = customer.city;
  var startDate = '01-01-2017';
  var totalAmount = document.totalAmount;
  var helpdesk = {
    name: 'helpdesk',
    amount: 80,
    checked: true,
    picture: ""
  };
  var lpc = {
    name: 'lpc',
    amount: 95,
    checked: true,
    picture: ''
  };
  var openVpn = {
    name: 'openVpn',
    amount: 167.50,
    checked: true,
    picture: ''
  };
  var portal = {
    name: 'Portal',
    amount: 250,
    checked: true,
    picture: ''
  };
  var snapshot = {
    name: 'Snapshot',
    amount: 125,
    checked: true,
    picture: ''
  };
  var bbi = {
    name: 'BBI',
    amount: 95,
    checked: true,
    picture: ''
  };
  var totalYearAmount = document.totalYearAmount;
  var serviceInContract = '[ x ]'

  function setChecked(a, b) {
    if(a.checked) {
      a.picture = serviceInContract;
      a.amount = b
      console.log(a);
    }
  }

  function findService(a, b) {
    var service = $rootScope.document.services;
    for ( var i = 0, iLen=service.length; i<iLen; i++) {
      if(service[i].description==a) {
        var amount = service[i].year_price
        setChecked(b, amount);
      }
    }
  }

  $scope.openModal = function() {
    findService('BBI', bbi);
    findService('Portal', portal);
    findService('Car', lpc);
    findService('OpenVpn', openVpn);
    findService('Snapshot', snapshot);
  }

  var docDefinition = {
   content: [
     {  text: 'ONDERHOUDSOVEREENKOMST VOOR PERIODIEK ONDERHOUD BEVEILIGINGSINSTALLATIES',
        alignment: 'justify',
        margin: [0,40,0,40]},
     { text: 'Datum: 30-11-2016', margin: [0,0,0,20]},
     { text: 'De ondergetekenden:', bold: true},
     { text: company},
     { text: 'vertegenwoordigd door ' + salution + " " + lastname},
     { text: 'gevestigd te ' + city, margin: [0,0,0,20]},
     { text: 'En', margin: [0,0,0,20]},
     { text: 'BigBrother BV'},
     { text: 'vertegenwoordigd door de heer A. van Rooijen'},
     { text: 'gevestigd te Ede.'},
     { text: "verder te noemen: ‘installateur’", margin: [0,0,0,20]},
     { text: 'In aanmerking nemende', bold: true, margin: [0,0,0,20]},
     {  text: 'dat de opdrachtgever er belang bij heeft om contractuele onderhoudswerkzaamheden te laten uitvoeren aan de beveiligingsinstallatie(s) die aanwezig zijn op en dienstig zijn aan de locaties zoals omschreven in de bijlage bij dit contract: ',
        margin: [0,0,0,20]
      },
     { text: 'Zijnde: ' + company, margin: [0,0,0,10] },
     { text: 'Adres: ' + street, margin: [0,0,0,10] },
     { text: 'Plaats: ' + zippcode + ' ' + city, margin: [0,0,0,10] },
     { text: 'Ingangsdatum overeenkomst : ' + startDate, margin: [0,0,0,20]},
     { text: 'Verklaren te zijn overeengekomen als volgt: ', bold: true, margin: [0,0,0,20]},
     {  text: 'Gedurende de looptijd van dit contract zal de installateur 1 maal per jaar preventief onderhoud uitvoeren conform de eisen betreffende het Beheer en Onderhoud van Beveiligingssystemen. Dit zal gebeuren op een nader te bepalen datum en volgens bijlage 1: Werkomschrijving.',
        margin: [0,0,0,20]
     },
     {  text: 'Kosten (arbeid/reizen) voor het doen van reparaties en oplossen van storingen alsmede de kosten voor te vervangen onderdelen zijn niet inbegrepen in de totale kosten van deze overeenkomst. Wel geeft deze overeenkomst recht op gereduceerde tarieven welke in bijlage 3 nader gespecificeerd worden. Kosten die buiten deze overeenkomst vallen zullen separaat worden gefactureerd.',
        margin: [0,0,0,20]
     },
     {  text: 'Deze overeenkomst is aangegaan voor de duur van één jaar, ingaande op de bovenstaande ingangsdatum en daarna telkens stilzwijgend verlengd met 1 jaar.',
        margin: [0,0,0,20]
     },
     {  text: 'Op basis van algemene kostenverhogingen is de installateur gerechtigd de prijs aan het begin van elk nieuw kalenderjaar te indexeren. Wijziging van de tarieven wordt schriftelijk bevestigd.',
        margin: [0,0,0,20]
     },
     {  text: 'Opzegging van de overeenkomst kan uitsluitend schriftelijk plaatsvinden met inachtneming van een termijn van tenminste drie maanden. Tenzij de opdrachtgever in geval van verkoop of enig gedeelte daarvan, of vanwege enige andere omstandigheid op grond waarvan de opdrachtgever geen of een verminderd belang heeft bij de in deze overeenkomst genoemde installatie(s).',
        margin: [0,0,0,20]
     },
     {  text: 'Of indien de installateur een wanprestatie levert, haar rechtspersoonlijkheid verliest of in geval van surseance van betaling of faillissement.',
        margin: [0,0,0,20]
     },
     {  text: 'De preventieve onderhoudswerkzaamheden zullen aaneensluitend worden verricht op werkdagen (van maandag tot en met vrijdag tussen 8.00 en 18.00 uur).',
        margin: [0,0,0,20]
     },
     {  text: 'Facturatie geschiedt aan het begin van elk nieuw kalenderjaar en de betaling dient binnen 30 dagen na factuurdatum te zijn geschied.',
        margin: [0,0,0,20]
     },
     {  text: 'Bij wijzigingen aan de installaties zullen deze wijzigingen, na oplevering van de werkzaamheden, automatisch in deze onderhoudsovereenkomst worden opgenomen en worden verrekend op basis van de geldende tarieven. Een dergelijke wijziging van de contractprijs zal schriftelijk aan u bevestigd worden.',
        margin: [0,0,0,20]
     },
     {  text: 'De opdrachtgever zal gedurende deze overeenkomst zich ervan onthouden om, zonder schriftelijke toestemming van de installateur, derden de gelegenheid te geven de installaties of enig deel daarvan te repareren, daaraan werkzaamheden te verrichten dan wel veranderingen aan te brengen.',
        margin: [0,0,0,20]
     },
     {  text: 'De Installateur is niet aansprakelijk voor enige schade aan de installatie(s) ten gevolge van het niet functioneren daarvan. De Installateur is ook niet aansprakelijk voor enige schade aan de installatie(s) die veroorzaakt zijn door brand, inbraak, enig ongeval, verkeerde bediening of niet naleving van de onderhoudsvoorschriften met betrekking tot de installatie(s).',
        margin: [0,0,0,20],
        pageBreak: 'after'
     },
     {  text: 'Onderdelen overeenkomst:',
        bold: true,
        margin: [0,20,0,20]
     },
     {
       table: {
         headerRows: 1,
         widths: [20, 250, 100],
         body: [
           ['[ x ]', 'Preventief onderhoud camerasysteem', {text: '€ ' + totalAmount, alignment: 'right' }],
           ['', {text:'Totaal preventief onderhoud', bold: true}, {text: '€ ' + totalAmount, alignment: 'right', bold: true }]
         ]
       },
       layout: 'noBorders'
     },
     {
       text: 'Abonnementen :',
       bold: true,
       margin: [0,20,0,20]
     },
     {
       table: {
         headerRows: 1,
         widths: [20, 250, 100],
         body: [
           [helpdesk.picture, 'All-in Helpdesk tot max. 2 uur per jaar', {text: '€ ' + helpdesk.amount, alignment: 'right' }],
           [openVpn.picture, 'OpenVpn', {text: '€ ' + openVpn.amount, alignment: 'right' }],
           [lpc.picture, 'Jaarlijkse kentekenupdate', {text: '€ ' + lpc.amount, alignment: 'right' }],
           [portal.picture, 'Portal', {text: '€ ' + portal.amount, alignment: 'right' }],
           [snapshot.picture, 'Snapshot', {text: '€ ' + snapshot.amount, alignment: 'right' }],
           [bbi.picture, 'BBI', {text: '€ ' + bbi.amount, alignment: 'right' }],
           ['', {text: 'Totaal abonnementen', bold: true}, {text: '€ ' + totalYearAmount, alignment: 'right', bold: true }],
         ]
       },
       layout: 'noBorders'
     },
     {  text: 'De bedragen voor de onderhoudsovereenkomst en de abonnementen worden gecombineerd gefactureerd.',
        margin: [0,20,0,20]
     },
     {  text: 'Alle bedragen zijn per jaar over het jaar 2016 en exclusief BTW. De bedragen worden aan het begin van ieder kalender jaar geïndexeerd.',
        margin: [0,0,0,20]
     },
     {  text: 'Aldus in tweevoud opgemaakt en ondertekend,',
        margin: [0,0,0,20]
     },
     {
       columns: [
         {
           width: '*',
           text: company
         },
         {
           width: '*',
           text: 'BigBrother B.V.'
         },
       ]
     },
     {
       columns: [
         {
           width: '*',
           text: salution + ' ' +  lastname,
           margin: [0,60,0,20]
         },
         {
           width: '*',
           text: 'Dhr. A. Van Rooijen',
           margin: [0,60,0,20]
         },
       ]
     },
     {
       columns: [
         {
           width: '*',
           text: 'd.d. - ____ - ____ - ____'
         },
         {
           width: '*',
           text: 'd.d. - ____ - ____ - ____'
         },
       ]
     }
   ],
   defaultStyle: {
     fontSize: 10,
     columnGap: 20
   }
 };

  $scope.makePdf = function() {
    pdfMake.createPdf(docDefinition).open()
  };

});
