
require([
  "esri/config",
  "esri/views/MapView",
  "esri/WebMap",
  "esri/layers/FeatureLayer",
  "esri/layers/WMSLayer",
  "esri/geometry/Extent",
  "esri/symbols/SimpleLineSymbol",
  "esri/tasks/QueryTask",
  "esri/tasks/support/Query",
  "esri/Graphic",
  "esri/widgets/Locate", 
  "esri/widgets/Legend", 
  "dojo/domReady!"
], function(
  esriConfig, MapView, WebMap, FeatureLayer, WMSLayer, Extent, SimpleLineSymbol, QueryTask, Query, Graphic, Locate, Legend
) {




	function velgKategori (valgt) {
		$(".KartVindu").addClass("KartVinduNorm");
		$(".InfoVindu").addClass("InfoVinduNorm");

		$(".kategorier").addClass("kategorierNorm");

		$(".catdiv").addClass("catDivNorm");
		

		view.ui.empty("bottom-right");

		//skjul overskrift i #genInfo
		$("#infoTittel").hide();

		//Sett valgt kategori til active
		$(".cat").attr("class", "cat catNorm");
		$("#"+valgt).addClass("catActive");

		$("#infoknapp").show();
		$(".katbeskrivelse").hide();
		

		if (valgt==="badesteder") {
			skruAvLag();
			badestedPunkt.visible = true;
			bildepunkter.visible = true;
			zoomToLayer(badestedPunkt);
			console.log(badestedPunkt);

			$("#genCatTittel").html("Badesteder");
			$("#genCatBes").html(badestederBeskrivelse);


			//$("#genBadeInfo").show();
		}
		if (valgt==="turloyper") {
			skruAvLag();
			turloypeLinje.visible = true;
			turloypePunkt.visible = true;
			zoomToLayer(turloypeLinje);
			//$("#genTurInfo").show();
			$("#genCatTittel").html("Turløyper");
			$("#genCatBes").html(turBeskrivelse);
			
		}
		if (valgt==="aktiviteter") {
			skruAvLag();
			aktiviteterPunkt.visible = true;
			zoomToLayer(aktiviteterPunkt);


			var legend = new Legend({
				view: view,
				layerInfos: [{
					layer: aktiviteterPunkt,
					title: "Aktiviteter"
				}]
			});

			//Legg til legend i nedre høyre hjørne for Aktivitets-laget
			view.ui.add(legend, "bottom-right");

			$("#genCatTittel").html("Aktiviteter");
			$("#genCatBes").html(aktiviteterBeskrivelse);
		}

	};

	function zoomToLayer(layer) {
		//console.log(layer);
        view.goTo(layer.fullExtent.clone().expand(2));
    };


    var prevExtent;

    function skruAvLag() {
		for (var i = 0; i < opLag.length; i++) {
			if (opLag[i].visible) {
				opLag[i].visible=false
			}
		}

    };


    /************* LUKKER INFORMASJONSVINDU FOR BADING OG TURLØYPE *********/
    function lukkVindu(denne) {
    	if (denne ==="lukkTur") {
    		$("#"+denne).parent().parent().hide();
    	};
		
		$(".KartVinduHalf").attr('class', 'KartVindu KartVinduNorm');
    	$(".InfoVinduHalf").attr('class', 'InfoVindu InfoVinduNorm');

    	$(".KartVindu").attr('class', 'KartVindu KartVinduNorm');
    	$(".InfoVindu").attr('class', 'InfoVindu InfoVinduNorm');
    	$("#genInfo").show();

    	if ($('.modal360').is(':visible')) {
    		$('.modal360').hide();
		};
		//HVIS knaoppen som ble trykket har ID "lukkBad", fjern ikoner, fjern 360 kamera knappen, og fjern popup-vinduet.
		if (denne ==="lukkBad") {
			$(".badeBes").scrollTop(0);
			$(".grid-container div").remove();
			$(".kamera").hide();
			$(".modalBad").hide();
			$(".badeInfo").hide();
			
		};
    	view.goTo(prevExtent);

	};


	// Get the modal
	var modal360 = document.getElementById('myModal');


	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

    var webmap = new WebMap({
      portalItem: { // autocasts as new PortalItem()
        id: "1852253ee6d6488589dfa546e86e40d5"
      }
    });



    var badeRenderer = {
        type: "simple", // autocasts as new SimpleRenderer()
        // Define a default marker symbol with a small outline
        symbol: {
	  	type: "picture-marker",
		url: "bading_2_dual_sm1.png",
		width: "30px",
		height: "30px"
	  }
    };

    var aktivitetRenderer = {
        type: "unique-value", // autocasts as new SimpleRenderer()
        // Define a default marker symbol with a small outline
        field: "Type",
        defaultSymbol: {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: [102, 153, 153],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 1.4,
            opacity: 0
          }
        },
        uniqueValueInfos: [
		    {
			    value: "Fotballbane",  // features in the "North" region and a rank of 1
				symbol: {
				  	type: "picture-marker",
					url: "soccer.png",
					width: "25px",
					height: "25px"
				}
		    }, {
		      	value: "Golfbane",  // features in the "North" region and a rank of 2
				symbol: {
				  	type: "picture-marker",
					url: "golf.png",
					width: "25px",
					height: "25px"
				}
		    }, {
		      	value: "Volleyball",  // features in the "North" region and a rank of 2
				symbol: {
				  	type: "picture-marker",
					url: "volleyball.png",
					width: "25px",
					height: "25px"
				}
		    }, {
		      	value: "Skatepark",  // features in the "North" region and a rank of 2
				symbol: {
				  	type: "picture-marker",
					url: "skateboard.png",
					width: "25px",
					height: "25px"
				}
		    }, {
		      	value: "Frisbeegolf",  // features in the "North" region and a rank of 2
				symbol: {
				  	type: "picture-marker",
					url: "frisbee.png",
					width: "25px",
					height: "25px"
				}
		    }, {
		      	value: "Idrettshall",  // features in the "North" region and a rank of 2
				symbol: {
				  	type: "picture-marker",
					url: "athlete.png",
					width: "25px",
					height: "25px"
				}
		    }, {
		      	value: "Fotballstadion",  // features in the "North" region and a rank of 2
				symbol: {
				  	type: "picture-marker",
					url: "stadium.png",
					width: "30px",
					height: "30px"
				}
		    }, {
		      	value: "Idrettsplass",  // features in the "North" region and a rank of 2
				symbol: {
				  	type: "picture-marker",
					url: "athletics.png",
					width: "30px",
					height: "30px"
				}
		    }
		]
    };

    var turRenderer = {
    	type: "simple",

    	symbol: {
    		type:"simple-line",
    		color: [71, 137, 244],
    		width: "4.2px"
    	}
    };

	var turPunktRenderer = {
        type: "unique-value", // autocasts as new SimpleRenderer()
        // Define a default marker symbol with a small outline
        field: "punkttype",
        defaultSymbol: {
          type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
          color: [102, 153, 153],
          outline: { // autocasts as new SimpleLineSymbol()
            color: [255, 255, 255],
            width: 1.4,
            opacity: 0
          }
        },
        uniqueValueInfos: [
		    {
		      	value: "B",  // features in the "North" region and a rank of 2
				symbol: {
				  	type: "picture-marker",
					url: "letter-b2.png",
					width: "25px",
					height: "25px"
				}
		    }, {
			    value: "A",  // features in the "North" region and a rank of 1
				symbol: {
				  	type: "picture-marker",
					url: "letter-a2.png",
					width: "25px",
					height: "25px"
				}
		    }
		]
    };


	var bildepunktsymbol1 = {
	  type: "simple",
	  symbol: {
	  	type: "picture-marker",
		url: "https://images.vexels.com/media/users/3/130935/isolated/preview/30b4282b7925dd5e4aae62ef511d24e6-hipster-camera-icon-2-by-vexels.png",
		width: "20px",
		height: "20px"
	  }
	};

    /***********Legg til bildepunktene *************/
    var bildepunkter = new FeatureLayer({
        outFields: ["*"],
        portalItem: { // autocasts as new PortalItem()
          id: "582410259a7c4c2da91302bf95a2d696"
        },
      	title: "Bildepunkter",
      	renderer: bildepunktsymbol1
    });
    webmap.add(bildepunkter);

    /***********Legg til badestedene *************/
    //original bade-view ID: 353af39168d94fdda399ee5486e8bf34
    var badestedPunkt = new FeatureLayer({
        outFields: ["*"],
        portalItem: { // autocasts as new PortalItem()
          id: "a14c92d6d6a54ae080fdca903e9f1740"
        },
      	title: "Punktlaget",
      	renderer: badeRenderer
    });
    webmap.add(badestedPunkt);
    

    /***********Legg til turløypelaget *************/
    var turloypeLinje = new FeatureLayer({
        outFields: ["*"],
        portalItem: { // autocasts as new PortalItem()
          id: "ee5b1f09a7a74fbca35eb05ca1761d4c"
        },
      	title: "Turloyper",
      	renderer: turRenderer
    });
    webmap.add(turloypeLinje);

    		    /***********Legg til turløypelaget *************/
    var turloypePunkt = new FeatureLayer({
        outFields: ["*"],
        portalItem: { // autocasts as new PortalItem()
          id: "c429624d834e448685ab1bca25fee4e0"
        },
      	title: "TurPunkt",
      	renderer: turPunktRenderer
    });
    webmap.add(turloypePunkt);


    var aktiviteterPunkt = new FeatureLayer({
        outFields: ["*"],
        portalItem: { // autocasts as new PortalItem()
          id: "337fe3a1226b4e7ab35fb62b9fb89bcc"
        },
      	title: "Aktiviteter",
      	renderer: aktivitetRenderer
    });
    webmap.add(aktiviteterPunkt);
    

    esriConfig.request.corsEnabledServers.push("openwms.statkart.no");
    var stedsnavn = new WMSLayer({
	  url: "http://openwms.statkart.no/skwms1/wms.topo4.graatone?",
	  sublayers: [{
	  	name: "Stedsnavn"
	  }, {
	  	name: "Vegnavn"
	  }]
	});
    webmap.add(stedsnavn);

    http://openwms.statkart.no/skwms1/wms.topo4.graatone?

    //Skjul kartlagene ved oppstart
    badestedPunkt.visible = false;
    turloypeLinje.visible = false;
    aktiviteterPunkt.visible = false;
    bildepunkter.visible = false;
    turloypePunkt.visible = false;




    // LEGG TIL DE LAGENE SOM SKAL VÆRE MED I KARTET I DENNE LISTEN. 	 
    var opLag = [badestedPunkt, turloypeLinje, aktiviteterPunkt, bildepunkter, turloypePunkt]; 

  	/************************************************************
   	* Set the WebMap instance to the map property in a MapView.
   	************************************************************/
    var view = new MapView({
    	map: webmap,
    	constraints : {
    		rotationEnabled: false
    	},
    	container: "viewDiv"
  	});


  	view.on("click", function(event) {
  		event.stopPropagation(); //Overwrite default click-for popup behaviour
	  	view.hitTest(event)
	  	.then(test1)
	});

  	//Setter opp Locate-widgeten
  	var locateWidget = new Locate({
	  view: view,  
	  graphic: new Graphic({
	    symbol: { 
	    	type: "simple-marker",
	    	color: [51, 153, 255],
	    	outline: { // autocasts as new SimpleLineSymbol()
	            color: [255, 255, 255],
	            width: 0.75,
	            opacity: 0
	        }
	    }  // overwrites the default symbol used for the
	    // graphic placed at the location of the user when found
	  })
	});



	    function aapnetur(attributter, featureExtent) {

		let navn = attributter.navn;
		let turInfoTab = attributter.beskr;
		if ($(".KartVindu").hasClass('KartVinduNorm')) {
			$(".KartVindu").removeClass('KartVinduNorm')
		};
		if ($(".InfoVindu").hasClass('InfoVinduNorm')) {
			$(".InfoVindu").removeClass('InfoVinduNorm')
		};

		//Legg til klassen 'KartVinduHalf' slik at kartvinduet får nye tegneregler 
		$(".KartVindu").addClass('KartVinduHalf');
		$(".InfoVindu").addClass('InfoVinduHalf');
		$("#genInfo").hide();
		$("#genTurInfo").hide();


		//Sjekk om browser er i landscape eller portrait modus, da disse formatene har ulik extent. 
		if ($(document).width()> $(document).height()) {
			prevExtent=view.extent.clone().expand(1);
		} else {
			prevExtent=view.extent.clone().expand(0.5);
		}
		//expand 0.5 for portrait 
		//expand 1 for landscape

		if (attributter.hoydeprof) {
			let bildeURL = String(attributter.hoydeprof);
			console.log(bildeURL);
			$("#terrengIMG").attr("src", bildeURL);
		};
		
		//Vis tur-info Div-en
		$("#turInfo").show();
		//Skyt inn navn og beskrivelse om turløypen
		$("#turTittel").html(navn);
		$("#turInfoTab").html(turInfoTab);

		//Sjekk om browser er i landscape eller portrait modus, da disse formatene har ulik extent.
		if ($(document).width()> $(document).height()) {
			//Landskap
			view.goTo(featureExtent.clone().expand(2));
		} else {
			//Portrait
			view.goTo(featureExtent.clone().expand(2));
		}
		//expand 1 for portrait iPad
		//expand 1.5 for landscape iPad
	};


  	view.ui.add(locateWidget, "top-left");

        
  	function test1(response) {

			console.log(response);
		/***************** HVIS PUNKT ER BADESTED **************/
    	if (response.results.length && response.results[0].graphic.attributes.kategori ==="badested") {
    		//hide Generell info meny
			$("#genInfo").hide();
			//Fjern ikonene som hørte til forrige punkt
			$(".grid-container div").remove();

			//Åpner bade-popup dersom bredden på skjermen er større eller lik 768 px. I mobil-format er bade-popupen stylet med 0% høyde og 0% bredde. 
			if ($(document).width()>=768) {
				$(".modalBad").show();
			};
			

			if ($(".KartVindu").hasClass('KartVinduNorm')) {
    			$(".KartVindu").removeClass('KartVinduNorm')
    		};
    		if ($(".InfoVindu").hasClass('InfoVinduNorm')) {
    			$(".InfoVindu").removeClass('InfoVinduNorm')
    		};

    		$(".KartVindu").addClass('KartVinduBad');

    		prevExtent=view.extent.clone().expand(1);
			
    		let attributter = response.results[0].graphic.attributes;
    		var navn = attributter.navn;
    		let url = attributter.url;
    		let beskrivelse = attributter.beskr_lang;

			//let badeplassExtent = response.results[0].graphic.geometry.extent;
			let koordinater = response.results[0].graphic.geometry;

			view.goTo({
				target: koordinater,
				zoom: 15
			});

    		//Dersom punktet som har blitt klikket har en URL...Åpne Modal'en med 360 view. 
    		if (url) {
    			if ($(document).width()>=768) {
    				$("#kamera_stor").show();       	
					console.log(navn);
					//Endre URL'en i InlineFramen ved ID 'popup360'.
					document.getElementById('popup360').src=url;
    			} else {
    				$("#kamera_liten").show();       	
					console.log(navn);
					//Endre URL'en i InlineFramen ved ID 'popup360'.
					document.getElementById('popup360').src=url;
    			}

    		};
			
    		console.log(response.results[0].graphic);
			$(".badeInfo").show();
			$(".badeTittel").html(navn);
			$(".badeBes p").html(beskrivelse);
			//Hvis punktet har data om vannkvalitet....
			if (attributter.kvalitet) {
				//Vis badevannskvaliteten 
				$(".badevannskvalitet").show();
				$(".badevannskvalitet2 span").html(attributter.kvalitet);
				//Sett fargen på teksten til vannkvalitet avhengig av verdi 
				if (attributter.kvalitet==="God") {
					//God kvalitet = Grønn tekst
					$(".badevannskvalitet2 span").css("color", "green");
				}
				else if (attributter.kvalitet==="Mindre god") {
					// Mindre god kvalitet = Oransje tekst
					$(".badevannskvalitet2 span").css("color", "#ff8503");
				}
				else if (attributter.kvalitet==="Ikke akseptabel") {
					// Dårlig vannkvalitet = Rød tekst
					$(".badevannskvalitet2 span").css("color", "red");
				}

			} else { 
				//Dersom punktet ikke inneholder noen data om vannkvalitet: Ikke vis bullet-point med vannkvalitet. 
				$(".badevannskvalitet").hide();
			};

			if (attributter.kvalitetms) {
				//Dersom punktet har data om temp, vis temperatur
				$(".maaledato").show();
				$(".maaledato2 span").html(attributter.kvalitetms);

			} else { 
				//Dersom punktet ikke har data om badetemp, ikke vis bulletpoint
				$(".maaledato").hide();
			};
			console.log("FAEN");
			if (attributter.merknad) {
				console.log("FAEN 2");
				$(".merknad").show();
				$(".merknad2 span").html(attributter.merknad);
				console.log("FAEN 3");
			} else {
				$(".merknad").hide();
				console.log("FAEN 4");
			};


			// Sjekk om punktet som er blitt klikket har ulike fasiliteter. 
			// Hvis punktet ikke er "null" i cellen som sjekkes, så legg til ikonet med en IMG tag. 
			if (attributter.toalett) {
				$(".grid-container").append("<div class='grid-item' id='div-toalett' ><img src='dass_sm2.png'></div>");
			}
			if (attributter.stupetarn) {
				$(".grid-container").append("<div class='grid-item' id='div-stupe' ><img src='stupe_sm2.png'></div>");
			}
			if (attributter.kiosk) {
				$(".grid-container").append("<div class='grid-item' id='div-kiosk' ><img src='kiosk_sm2.png'></div>");
			}
			if (attributter.volley) {
				$(".grid-container").append("<div class='grid-item' id='div-volley' ><img src='volley_sm2.png'></div>");
			}
			if (attributter.grill) {
				$(".grid-container").append("<div class='grid-item' id='div-grill' ><img src='baal_sm2.png'></div>");
			}
    	};



    	/******************* HVIS Feature ER TURLØYPE ******************/

    	if (response.results.length && response.results[0].graphic.layer.title==="Turloyper") {
    		//deklarer attributt-variabler
    		let attributter = response.results[0].graphic.attributes;
    		let featureExtent = response.results[0].graphic.geometry.extent;

    		aapnetur(attributter, featureExtent);

    	};


    	/******************* HVIS feature ER BILDEPUNKT   ************/

    	if (response.results.length && response.results[0].graphic.layer.title==="Bildepunkter") {
    		let attributter = response.results[0].graphic.attributes;
    		let url = attributter.url;
    		document.getElementById('popup360').src=url;
    		$(".modal360").show()
    	};


    	/******************* HVIS feature ER AKTIVITETER ******************/

    	if (response.results.length && response.results[0].graphic.layer.title==="Aktiviteter") {
    		 view.popup.open({
			   // Set the popup's title to the coordinates of the location
			   title: response.results["0"].graphic.attributes.Name,
			   location: response.screenPoint.mapPoint,
			   content: "Type: "+response.results["0"].graphic.attributes.Type+ " <br> Adresse: "+response.results["0"].graphic.attributes.Adresse
			 });
    	};


    	/******************* HVIS feature ER TURPUNKTER  ******************/

    	if (response.results.length && response.results[0].graphic.layer.title==="TurPunkt") {

    		console.log(response.results["0"].graphic.attributes.navn);
    		let navn = response.results["0"].graphic.attributes.navn;

    		var query = turloypeLinje.createQuery();
    		query.where = "navn = '"+navn+"'";
    		query.outFields = ["*"];

    		turloypeLinje.queryFeatures(query)
    			.then(function(response){
    				let attributter = response.features[0].attributes;
	        		let featureExtent = response.features[0].geometry.extent;
    				aapnetur(attributter, featureExtent);
    			})
    	};
  	};




  	//Lukk 360-view popup dersom X-en klikkes. 
  	$(".close").on("click", function() {
   		modal360.style.display = "none";
	});


	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal360) {
	        modal360.style.display = "none";			        
	    }
	};


	/************ Lytt til Kamera-knappen ***************/
	$(".kamera").on("click", function() {$(".modal360").show()})

	/************ Lukk infovindu for turdetaljer ********/
	$("#lukkTur").on("click", function () {lukkVindu(this.id)});
	$(".lukkBad").on("click", function () {lukkVindu($(this).attr("class"))});

	//lukkKat er X-span i infopopupen. 
	$(".lukkKat").on("click", function () {$("#genInfoModal").hide()})
	$(".lukkKatBad").on("click", function () {$("#genBadeModal").hide()})


	var badestederBeskrivelse= "Her ser du en oversikt over de ulike badeplassene i Sarpsborg Kommune. Ved å klikke deg inn på de enkelte badeplassene i kartet vil du få opp informasjon om badeplassen, samt et 360-bilde. Du vil også få en oversikt over hvilke fasiliteter som tilbys på den aktuelle badeplassen.";
	var turBeskrivelse = "Sarpsborg har mange fine turløyper rundt om i kommunen. I dette kartet vises et lite utvalg av turer. Ved å klikke på turene vil du kunne få litt info om turen, samt en terrengprofil som viser terrengvariasjoner på turen. Turstiene er hentet fra Den Norske Turistforeningen";
	var aktiviteterBeskrivelse = "Her ser du et utvalg av en rekke utendørs aktiviteter som tilbys i Sarpsborg Kommune.";

	/*********** Åpne info-modal************/
	$("#infoknapp").on("click", function () {
		$(".gen-modal").show();
		//$(".gen-modal").toggleClass("active");
		let aktivKategori = $(".catActive").attr("id");

	});


	//Legger til on-click event listeners først når viewet er ferdig innlastet. 
	view.when(function () {
		$("#badesteder").on("click", function () {velgKategori(this.id)});
		$("#turloyper").on("click", function () {velgKategori(this.id)});
		$("#aktiviteter").on("click", function () {velgKategori(this.id)});
	});

	


});