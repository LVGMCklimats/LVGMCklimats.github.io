/*
 * Climate Atlas Demonstration custom functions
 * 
 * Written by: P.Sherratt (EUMETSAT)
 * Version:    1.1 (31/07/14)
 *
 * These functions are used with the Multi Select library and the Product Viewer
 * to produce the Climate Atlas Demonstration.
 * The viewer can be run offline or within the Oracle WebCenter. To select this
 * set variable bloadImageFromUSM below.
 */

var bloadImageFromUSM = false;  // false - load images from the local file 
                                // system, true - load images from EUMETSAT 
								// Content Server
oClatViewer = new productViewer("clat","oClatViewer");
if (bloadImageFromUSM)
{
  // Set the busy indicator to the image in the content server
  oClatViewer.setBusyIndicatorImage("http://www.eumetsat.int/website/wcm/idc/groups/ops/documents/resource/chjl/bg9h/~edisp/img_viewer_preloader.gif");
}

// Callback function from the Multi Select library. This is called when a select 
// box has been changed and when the select boxes are first created. 
// This callback function determines the image name, calls the viewer with the 
// image to be viewed and also sets the title in the viewer.
function clatSelectionsCallback(iLevel,iNumSelectBoxes,arrSelectData)
{
  var sPath = "img/products";
  var sFilename = "";
  var sListId = "";
  var sType = "";
  var sPeriod = "";
  var sRegion = "";
  var sStatistic = "";
  var sYear = "yyyy";
  var sMonth = "mm";
  var sSeason = "";
  var sProduct = "";
  var sTitle = "";
  var sStatisticText = "";

  // Loop through the array of select data and set the relevant variables    
  $.each( arrSelectData, function( key, value ) {
    sListId = arrSelectData[key]['LISTID']; 
    switch (sListId) {
      case "Product":
	    sProduct = arrSelectData[key]['VALUE'];
        break;
      case "Region":
	    sRegion = arrSelectData[key]['VALUE'];
        break;
      case "Type":
	    sType = arrSelectData[key]['VALUE'];
        break;
	  case "Time Period":
	    sPeriod = arrSelectData[key]['VALUE'];
        break;
	  case "Statistic":
	    sStatistic = arrSelectData[key]['TEXT'];
        break;
	  case "Year":
	    if (arrSelectData[key]['VALUE'] != "")
		{
	      sYear = arrSelectData[key]['VALUE'];
		}
        break;
	  case "Month":
	    if (arrSelectData[key]['VALUE'] != "")
		{
	      sMonth = arrSelectData[key]['VALUE'];
		}
        break;
	  case "Season":
	    sSeason = arrSelectData[key]['VALUE'];
        break;
	}
    if (sListId != "Year" && sListId != "Month")
	{
	  sPath = sPath+"/"+arrSelectData[key]['VALUE'];
    }
  });
  
  // Build the filename string from the selected options.
  sFilename = sYear+sMonth+"dd";
  if (bloadImageFromUSM) // If the climate viewer is running on the Oracle WebCenter
  {
    sFilename = createUcmFilename(sProduct,sRegion,sPeriod,sStatistic,sSeason,sFilename);
  }
  else // else the viewer is being run offline
  {
    sFilename = sPath + "/" + sFilename + ".png";
  }
  oClatViewer.loadViewerImage(sFilename);

  // Create the custom title string for the viewer dependant on the image being shown
    if (sYear != '' && sYear != 'yyyy')
  {
	if(sPeriod == "Yearly"){sGadaVaiGadaa = ". gadā"}else{sGadaVaiGadaa = ". gada "}
	sTitle = sTitle+" "+sYear+sGadaVaiGadaa;
  }
  switch (sProduct) {
    case "CFC_Cloud_Fraction":
	//if(sStatistic == 'Standartnovirze' && sPeriod == "Yearly"){sTitle = "mākoņu daudzuma standartnovirze";}
	  	if(sStatistic == 'Anomālija'){sTitle = "vidējā mākoņu daudzuma (%) anomālija";}else{sTitle = " mākoņu daudzums (%)";}
		if (sStatistic == 'Standartnovirze') {sTitle = "mākoņu daudzuma (%) standartnovirze";}
		if (sStatistic == 'Vidējais') {if(sPeriod == "Yearly"){sTitle = sYear+". gada vidējais mākoņu daudzums (%)";} else {sTitle = " vidējais mākoņu daudzums (%)";}}
		if (sStatistic == 'Ilggadīgais maksimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais gada vidējais maksimālais mākoņu daudzums (%)";}
		if (sStatistic == 'Ilggadīgais minimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais gada vidējais minimālais mākoņu daudzums (%)";}
		if (sStatistic == 'Ilggadīgais vidējais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais gada vidējais mākoņu daudzums (%)";}
		if (sStatistic == 'Ilggadīgais maksimālais' && sPeriod == "Monthly") {sTitle = "Ilggadīgais mēneša vidējais maksimālais mākoņu daudzums (%)";}
		if (sStatistic == 'Ilggadīgais minimālais' &&  sPeriod == "Monthly") {sTitle = "Ilggadīgais mēneša vidējais minimālais mākoņu daudzums (%)";}
		if (sStatistic == 'Ilggadīgais vidējais' &&  sPeriod == "Monthly") {sTitle = "Ilggadīgais mēneša vidējais mākoņu daudzums (%)";}
		if (sStatistic == 'Ilggadīgais maksimālais' && sPeriod == "Seasonal") {sTitle = "Ilggadīgais sezonas vidējais maksimālais mākoņu daudzums (%)";}
		if (sStatistic == 'Ilggadīgais minimālais' && sPeriod == "Seasonal") {sTitle = "Ilggadīgais sezonas vidējais minimālais mākoņu daudzums (%)";}
		if (sStatistic == 'Ilggadīgais vidējais' && sPeriod == "Seasonal") {sTitle = "Ilggadīgais sezonas vidējais mākoņu daudzums (%)";}
		break;
    case "COT_ALL_Optical_Thickness_of_All_Clouds":
	if(sStatistic == 'Anomālija'){sTitle = "vidējā visu mākoņu optiskā biezuma anomālija";}else{sTitle = " visu mākoņu optiskais biezums";}
  	if (sStatistic == 'Standartnovirze') {sTitle = "visu mākoņu optiskā biezuma standartnovirze";}//else{sTitle = "sisu mākoņu optiskais biezums";}
	if (sStatistic == 'Vidējais') {sTitle = "vidējais visu mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais maksimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais maksimālais visu mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais minimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais minimālais visu mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais vidējais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais vidējais visu mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais maksimālais visu mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais minimālais visu mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais visu mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais maksimālais visu mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais minimālais visu mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais visu mākoņu optiskais biezums";}
  break;
    case "COT_ICE_Optical_Thickness_of_Ice_Clouds":
	  sTitle = "Ledus mākoņu optiskais biezums";
	  	if(sStatistic == 'Anomālija'){sTitle = "vidējā ledus mākoņu optiskā biezuma anomālija";}else{sTitle = " ledus mākoņu optiskais biezums";}
   	if (sStatistic == 'Standartnovirze') {sTitle = "ledus mākoņu optiskā biezuma standartnovirze";}//else{sTitle = "ledus mākoņu optiskais biezums";}
	if (sStatistic == 'Vidējais') {sTitle = "vidējais ledus mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais maksimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais maksimālais vledus mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais minimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais minimālais ledus mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais vidējais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais vidējais ledus mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais maksimālais ledus mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais minimālais ledus mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais ledus mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais maksimālais ledus mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais minimālais ledus mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais ledus mākoņu optiskais biezums";}
      break;
    case "COT_LIQ_Optical_Thickness_of_Liquid_Water_Clouds":
		  	if(sStatistic == 'Anomālija'){sTitle = "vidējā ūdens mākoņu optiskā biezuma anomālija";}else{sTitle = " ūdens mākoņu optiskais biezums";}
	if (sStatistic == 'Standartnovirze') {sTitle = "ūdens mākoņu optiskā biezuma standartnovirze";}
	if (sStatistic == 'Vidējais') {sTitle = "vidējais ūdens mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais maksimālais ūdens mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais minimālais ūdens mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais ūdens mākoņu optiskais biezums";}      
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais maksimālais ūdens mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais minimālais ūdens mākoņu optiskais biezums";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais ūdens mākoņu optiskais biezums";}
 		break;
    case "CPH_Fraction_of_Liquid_Water_Clouds":
  	if(sStatistic == 'Anomālija'){sTitle = "vidējā ūdens mākoņu īpatsvara (%) anomālija";}else{sTitle = " ūdens mākoņu īpatsvars (%)";}
	if (sStatistic == 'Standartnovirze') {sTitle = "ūdens mākoņu īpatsvara (%) standartnovirze";}
	if (sStatistic == 'Vidējais') {sTitle = "vidējais ūdens mākoņu īpatsvars (%)";}
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais maksimālais ūdens mākoņu īpatsvars (%)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais minimālais ūdens mākoņu īpatsvars (%)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais ūdens mākoņu īpatsvars (%)";}   
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais maksimālais ūdens mākoņu īpatsvars (%)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais minimālais ūdens mākoņu īpatsvars (%)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais ūdens mākoņu īpatsvars (%)";}  
		break;
    case "CTH_Cloud_Top_Height":
  	if(sStatistic == 'Anomālija'){sTitle = "vidējā mākoņu virsmas augstuma (m) anomālija";}else{sTitle = " mākoņu virsmas augstums (m)";}
	if (sStatistic == 'Standartnovirze') {sTitle = "mākoņu virsmas augstuma (m) standartnovirze";}//else{sTitle = "Mākoņu virsmas augstums (m)";}
	if (sStatistic == 'Vidējais') {if(sPeriod == "Yearly"){sTitle = sYear+". gada vidējais mākoņu virsmas augstums (m)";} else {sTitle = " vidējais mākoņu virsmas augstums (m)";}}
		if (sStatistic == 'Ilggadīgais maksimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais gada vidējais maksimālais mākoņu virsmas augstums (m)";}
		if (sStatistic == 'Ilggadīgais minimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais gada vidējais minimālais mākoņu virsmas augstums (m)";}
		if (sStatistic == 'Ilggadīgais vidējais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais gada vidējais mākoņu virsmas augstums (m)";}
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais maksimālais mākoņu virsmas augstums (m)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais minimālais mākoņu virsmas augstums (m)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais mākoņu virsmas augstums (m)";}
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais maksimālais mākoņu virsmas augstums (m)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais minimālais mākoņu virsmas augstums (m)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais mākoņu virsmas augstums (m)";}
		break;
    case "CTP_Cloud_Top_Pressure":
	  	if(sStatistic == 'Anomālija'){sTitle = "vidējā mākoņu virsmas spiediena (hPa) anomālija";}else{sTitle = " mākoņu virsmas spiediens (hPa)";}
	if (sStatistic == 'Standartnovirze') {sTitle = "mākoņu virsmas spiediena (hPa) standartnovirze";}
	if (sStatistic == 'Vidējais') {sTitle = "vidējais mākoņu virsmas spiediens (hPa)";}
		if (sStatistic == 'Ilggadīgais maksimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais gada vidējais maksimālais mākoņu virsmas spiediens (hPa)";}
		if (sStatistic == 'Ilggadīgais minimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais gada vidējais minimālais mākoņu virsmas spiediens (hPa)";}
		if (sStatistic == 'Ilggadīgais vidējais' && sPeriod == "Yearly") {sTitle = "Ilggadīgais gada vidējais mākoņu virsmas spiediens (hPa)";}
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais maksimālais mākoņu virsmas spiediens (hPa)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais minimālais mākoņu virsmas spiediens (hPa)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais mākoņu virsmas spiediens (hPa)";}     
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais maksimālais mākoņu virsmas spiediens (hPa)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais minimālais mākoņu virsmas spiediens (hPa)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais mākoņu virsmas spiediens (hPa)";}  
		break;
    case "CTT_Cloud_Top_Temperature":
	if (sStatistic == 'Standartnovirze') {sTitle = "vidējās mākoņu virsmas temperatūras (K) standartnovirze";}else{sTitle = "mākoņu virsmas temperatūra (K)";}
	if (sStatistic == 'Vidējais') {sTitle = "vidējā mākoņu virsmas temperatūra (K)";}
	 if(sStatistic == 'Anomālija'){sTitle = "vidējās mākoņu virsmas temperatūras (K) anomālija";}
		if (sStatistic == 'Ilggadīgais maksimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgā gada vidējā maksimālā mākoņu virsmas temperatūra (K)";}
		if (sStatistic == 'Ilggadīgais minimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgā gada vidējā minimālālā mākoņu virsmas temperatūra (K)";}
		if (sStatistic == 'Ilggadīgais vidējais' && sPeriod == "Yearly") {sTitle = "Ilggadīgā gada vidējā mākoņu virsmas temperatūra (K)";}
		if (sStatistic == 'Ilggadīgais maksimālais' && sPeriod == "Seasonal") {sTitle = "Ilggadīgā sezonas vidējā maksimālā mākoņu virsmas temperatūra (K)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgā sezonas vidējā minimālā mākoņu virsmas temperatūra (K)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgā sezonas vidējā mākoņu virsmas temperatūra (K)";}     
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgā mēneša vidējā maksimālā mākoņu virsmas temperatūra (K)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgā mēneša vidējā minimālā mākoņu virsmas temperatūra (K)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgā mēneša vidējā mākoņu virsmas temperatūra (K)";}     
		break;
    case "DAL_Daylight_Intensity":
	if(sStatistic == 'Anomālija'){sTitle = "vidējās dienas gaismas intensitātes (kLux) anomālija";}else{sTitle = " dienas gaismas intensitāte (kLux)";}
	if (sStatistic == 'Standartnovirze') {sTitle = "dienas gaismas intensitātes (kLux) standartnovirze";}
	if (sStatistic == 'Vidējais') {if(sPeriod == "Yearly"){sTitle = sYear+". gada vidējā dienas gaismas intensitāte (kLux)";} else {sTitle = " vidējā dienas gaismas intensitāte (kLux)";}}
		if (sStatistic == 'Ilggadīgais maksimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgā gada vidējā maksimālā dienas gaismas intensitāte (kLux)";}
		if (sStatistic == 'Ilggadīgais minimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgā gada vidējā minimālālā dienas gaismas intensitāte (kLux)";}
		if (sStatistic == 'Ilggadīgais vidējais' && sPeriod == "Yearly") {sTitle = "Ilggadīgā gada vidējā dienas gaismas intensitāte (kLux)";}
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgā sezonas vidējā maksimālā dienas gaismas intensitāte (kLux)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgā sezonas vidējā minimālā dienas gaismas intensitāte (kLux)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgā sezonas vidējā dienas gaismas intensitāte (kLux)";} 
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgā mēneša vidējā maksimālā dienas gaismas intensitāte (kLux)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgā mēneša vidējā minimālā dienas gaismas intensitāte (kLux)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgā mēneša vidējā dienas gaismas intensitāte (kLux)";} 
		break;
    case "IWP_Cloud_Ice_Water_Path":
	if(sStatistic == 'Anomālija'){sTitle = "vidējā ledus daudzuma mākoņos (kg/m2) anomālija";}else{sTitle = " vidējais ledus daudzums mākoņos (kg/m2)";}
	if (sStatistic == 'Standartnovirze') {sTitle = "ledus daudzuma mākoņos (kg/m2) standartnovirze";}
	if (sStatistic == 'Vidējais') {sTitle = "vidējais ledus daudzums mākoņos (kg/m2)";}
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais maksimālais ledus daudzums mākoņos (kg/m2)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais minimālais ledus daudzums mākoņos (kg/m2)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais ledus daudzums mākoņos (kg/m2)";}       
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais maksimālais ledus daudzums mākoņos (kg/m2)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais minimālais ledus daudzums mākoņos (kg/m2)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais ledus daudzums mākoņos (kg/m2)";}   		break;
    case "LWP_Cloud_Liquid_Water_Path":
	  	if(sStatistic == 'Anomālija'){sTitle = "vidējā ūdens daudzuma mākoņos (kg/m2) anomālija";}else{sTitle = " ūdens daudzums mākoņos (kg/m2)";}
	  if (sStatistic == 'Standartnovirze') {sTitle = "ūdens daudzuma mākoņos (kg/m2) standartnovirze";}
	if (sStatistic == 'Vidējais') {sTitle = "vidējais ūdens daudzums mākoņos (kg/m2)";}
    	if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais maksimālais ūdens daudzums mākoņos (kg/m2)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais minimālais ūdens daudzums mākoņos (kg/m2)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais ūdens daudzums mākoņos (kg/m2)";} 
    	if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais maksimālais ūdens daudzums mākoņos (kg/m2)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais minimālais ūdens daudzums mākoņos (kg/m2)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais ūdens daudzums mākoņos (kg/m2)";} 
		break;
    case "SAL_Surface_Albedo":
	  	if(sStatistic == 'Anomālija'){sTitle = "vidējā zemes virsmas albedo (%) anomālija";}else{sTitle = " zemes virsmas albedo (%)";}
	  if (sStatistic == 'Standartnovirze') {sTitle = "zemes virsmas albedo (%) standartnovirze";}
	if (sStatistic == 'Vidējais') {sTitle = "vidējais zemes virsmas albedo (%)";}
	    if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais maksimālais zemes virsmas albedo (%)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais minimālais zemes virsmas albedo (%)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgais sezonas vidējais zemes virsmas albedo (%)";} 
	    if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais maksimālais zemes virsmas albedo (%)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais minimālais zemes virsmas albedo (%)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgais mēneša vidējais zemes virsmas albedo (%)";} 
		break;
    case "SID_Direct_Irradiance_at_Surface":
	  	if(sStatistic == 'Anomālija'){sTitle = "vidējās tiešās Saules radiācijas piezemē (W/m2) anomālija";}else{sTitle = " tiešā Saules radiācija piezemē (W/m2)";}
	  if (sStatistic == 'Standartnovirze') {sTitle = "tiešās Saules radiācijas piezemē (W/m2) standartnovirze";}
	if (sStatistic == 'Vidējais') {if(sPeriod == "Yearly"){sTitle = sYear+". gada vidējā tiešā Saules radiācija piezemē (W/m2)";} else {sTitle = " vidējā tiešā Saules radiācija piezemē (W/m2)";}}
		if (sStatistic == 'Ilggadīgais maksimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgā gada vidējā maksimālā tiešā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais minimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgā gada vidējā minimālālā tiešā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais vidējais' && sPeriod == "Yearly") {sTitle = "Ilggadīgā gada vidējā tiešā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgā sezonas vidējā maksimālā tiešā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgā sezonas vidējā minimālā tiešā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgā sezonas vidējā tiešā Saules radiācija piezemē (W/m2)";} 
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgā mēneša vidējā maksimālā tiešā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgā mēneša vidējā minimālā tiešā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgā mēneša vidējā tiešā Saules radiācija piezemē (W/m2)";} 
		break;
    case "SIS_Solar_Surface_Irradiance":
	  	if(sStatistic == 'Anomālija'){sTitle = "vidējās globālās Saules radiācijas piezemē (W/m2) anomālija";}else{sTitle = " globālā Saules radiācija piezemē (W/m2)";}
	if (sStatistic == 'Standartnovirze') {sTitle = " globālās Saules radiācijas piezemē (W/m2) standartnovirze";}
	if (sStatistic == 'Vidējais') {if(sPeriod == "Yearly"){sTitle = sYear+". gada vidējā globālā Saules radiācija piezemē (W/m2)";} else {sTitle = " vidējā globālā Saules radiācija piezemē (W/m2)";}}
		if (sStatistic == 'Ilggadīgais maksimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgā gada vidējā maksimālā globālā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais minimālais' && sPeriod == "Yearly") {sTitle = "Ilggadīgā gada vidējā minimālālā lobālā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais vidējais' && sPeriod == "Yearly") {sTitle = "Ilggadīgā gada vidējā globālā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgā sezonas vidējā maksimālā globālā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgā sezonas vidējā minimālā globālā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Seasonal")) {sTitle = "Ilggadīgā sezonas vidējā globālā Saules radiācija piezemē (W/m2)";} 
		if (sStatistic == 'Ilggadīgais maksimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgā mēneša vidējā maksimālā globālā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais minimālais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgā mēneša vidējā minimālā globālā Saules radiācija piezemē (W/m2)";}
		if (sStatistic == 'Ilggadīgais vidējais' && (sPeriod == "Monthly")) {sTitle = "Ilggadīgā mēneša vidējā globālā Saules radiācija piezemē (W/m2)";} 
		break;
    default:
	  alert("Product '"+sProduct+"' not handled in file js_cmDataViewer.js - Search for 'Create Title' in the file and add the new case.");
      break;
  }

 if (sStatistic == 'Anomaly')
  {
   sStatisticText = " "+sStatistic+" no";
  }
  else if (sStatistic == 'Standartnovirze' && sPeriod == "Yearly")
  {
    sStatisticText = " Gada vidējā";
  }  else if(/*(sProduct == "CFC_Cloud_Fraction" || sProduct == "COT_ALL_Optical_Thickness_of_All_Clouds") && */sStatistic == 'Standartnovirze')
  {
    sStatisticText = "";
  }
  else
  {
   // if(sProduct == "CTT_Cloud_Top_Temperature"){sStatisticText = "";}else{sStatisticText = " "+sStatistic;}
  }
  if (sPeriod == "Yearly" && (sStatistic.search("Multi-year") != -1))
  {
    sTitle = sStatisticText+" of the "+sPeriod+" "+sTitle;
 }
  if ((sPeriod == "Monthly" || sPeriod == "Seasonal") && (sStatistic.search("Multi-year") != -1))
  {
    sTitle = /*sStatisticText+*/"gada "+sTitle;
  }
  else	
  /*
  sStatistic != 'Ilggadīgais minimālais'
  sStatistic != 'Ilggadīgais maksimālais'
  sStatistic != 'Ilggadīgais vidējais'
  */
    {
    if(sPeriod == "Monthly" && (sStatistic == "Ilggadīgais maksimālais" || sStatistic == "Ilggadīgais minimālais" || sStatistic == "Ilggadīgais vidējais")) {sKas = "";} 
	else {if(sPeriod == "Seasonal" || sPeriod == "Yearly") {sKas = "";} else {sKas = "Mēneša";}}
    

	
	if(sPeriod == "Seasonal" && (sStatistic == "Ilggadīgais maksimālais" || sStatistic == "Ilggadīgais minimālais" || sStatistic == "Ilggadīgais vidējais")){sKas = "";} else {if(sPeriod == "Seasonal"){sKas = "Sezonas";}}
	//if(sPeriod == "Yearly" && (sStatistic != 'Standartnovirze' || sStatistic != 'Vidējais')) {sKas = "Gada";}
	if(sProduct != "CTT_Cloud_Top_Temperature" && (sStatisticText == " Anomālija" || sStatistic == 'Standartnovirze')){if(sPeriod == "Yearly" && sStatistic == 'Standartnovirze'){sVidvaikas = "Gada vidējā"}
	else{if(sProduct == "DAL_Daylight_Intensity" || sProduct == "SID_Direct_Irradiance_at_Surface" || sProduct == "SIS_Solar_Surface_Irradiance" || sProduct == "CTT_Cloud_Top_Temperature" )
	{sVidvaikas = " vidējās";}
	else{sVidvaikas = " vidējā";}} if(sStatistic == 'Standartnovirze'){sJaAnom = "";} else {sJaAnom = " anomālija";}}
	
	else{if((sProduct == "CTT_Cloud_Top_Temperature" || sProduct == "DAL_Daylight_Intensity" || sProduct == "SIS_Solar_Surface_Irradiance") && sStatisticText == " Ilggadīgais minimālais"){sVidvaikas = " Ilggadīgā minimālā";}
	else if((sProduct == "CTT_Cloud_Top_Temperature" || sProduct == "DAL_Daylight_Intensity" || sProduct == "SIS_Solar_Surface_Irradiance") && sStatisticText == " Ilggadīgais maksimālais"){sVidvaikas = " Ilggadīgā maksimālā";}
	else if((sProduct == "CTT_Cloud_Top_Temperature" || sProduct == "DAL_Daylight_Intensity" || sProduct == "SIS_Solar_Surface_Irradiance") && sStatisticText == " Ilggadīgais vidējais"){sVidvaikas = " Ilggadīgā vidējā";}
	else{sVidvaikas = sStatisticText}; sJaAnom ="";}
	if(sStatisticText == " Vidējais"){sVidvaikas = " vidējais";}

	if(sProduct != "CFC_Cloud_Fraction"){sVelkautkas = " vidējā";} else {sVelkautkas = "";}
	if(sProduct == "CFC_Cloud_Fraction" && sStatistic == 'Standartnovirze' && (sStatistic != 'Standartnovirze' && sPeriod != "Yearly")){sVelkautkas = sStatistic+sPeriod+" vidējā";} else {sVelkautkas = "";}
	if(sPeriod == "Yearly" && (sStatistic == 'Anomālija' || sStatisticText == " vidējais")){sJaSakGads = sYear+". gada ";} else {sJaSakGads = "";}

	sTitle = sJaSakGads+sKas+sVelkautkas+" "+sVidvaikas+" "+sTitle+sJaAnom;
  }
  if ((sMonth != '' && sMonth != 'mm') || (sYear != '' && sYear != 'yyyy') || (sSeason !=''))
  {
    sTitle=sTitle+" ";
  }
  if (sYear != '' && sYear != 'yyyy' && sPeriod != "Yearly" && (sStatisticText == " Anomālija" || sStatisticText != " vidējais"))
  {
	if(sPeriod == "Yearly"){sGadaVaiGadaa = ". gadā"}else{sGadaVaiGadaa = ". gada "}
	sTitle = sTitle+" "+sYear+sGadaVaiGadaa;
  }
  if (sSeason != '')
  {
    if(sSeason == "Autumn"){sSezona = "rudenī";}
	if(sSeason == "Winter"){sSezona = "ziemā";}
	if(sSeason == "Summer"){sSezona = "vasarā";}
	if(sSeason == "Spring"){sSezona = "pavasarī";}
	
    sTitle = sTitle+" "+sSezona;
  }
  if (sMonth != '' && sMonth != 'mm')
  {
	if(getMonthFromValue(sMonth) == "Janvāris"){sNominmen = "janvārī"}
	if(getMonthFromValue(sMonth) == "Februāris"){sNominmen = "februārī"}
	if(getMonthFromValue(sMonth) == "Marts"){sNominmen = "martā"}
	if(getMonthFromValue(sMonth) == "Aprīlis"){sNominmen = "aprīlī"}
	if(getMonthFromValue(sMonth) == "Maijs"){sNominmen = "maijā"}
	if(getMonthFromValue(sMonth) == "Jūnijs"){sNominmen = "jūnijā"}
	if(getMonthFromValue(sMonth) == "Jūlijs"){sNominmen = "jūlijā"}
	if(getMonthFromValue(sMonth) == "Augusts"){sNominmen = "augustā"}
	if(getMonthFromValue(sMonth) == "Septembris"){sNominmen = "septembrī"}
	if(getMonthFromValue(sMonth) == "Oktobris"){sNominmen = "oktobrī"}
	if(getMonthFromValue(sMonth) == "Novembris"){sNominmen = "novembrī"}
	if(getMonthFromValue(sMonth) == "Decembris"){sNominmen = "decembrī"}
		sTitle = sTitle+" "+sNominmen;
  }
  setTitle(sTitle);
}

// Return the month name from the month value. 
function getMonthFromValue(monthVal)
{
  months=["Janvāris","Februāris","Marts","Aprīlis","Maijs","Jūnijs","Jūlijs","Augusts","Septembris","Oktobris","Novembris","Decembris"];
  index = parseInt(monthVal,10);
  index = index-1;
  return months[index];
}

// Set the title of the viewer. 
function setTitle(sTitle)
{
  var imageInfo = document.getElementById('clatInfo');
  imageInfo.innerHTML = "<h3>"+sTitle+"</h3>";
}

/* 
   EUMETSAT specific functions used to work out the unique ID for an image given the options selected
 */
 
// Given the details for the current image create and return the unique id for the image in the Oracle WebCenter
function createUcmFilename(sProduct,sRegion,sPeriod,sStatistic,sSeason,sFilename)
{
  sUcmFilename = "IMG_CLAT_"+getProductId(sProduct)+getnCharId(sRegion,1)+getnCharId(sPeriod,1)+getStatisticsId(sStatistic);
  if (sSeason != "")
  {
    sUcmFilename = sUcmFilename + getnCharId(sSeason,2);
  }
  sUcmFilename = sUcmFilename + sFilename.toUpperCase();
  sUcmFilename = "http://www.eumetsat.int/website/wcm/idc/idcplg?IdcService=GET_FILE&dDocName="+sUcmFilename+"&RevisionSelectionMethod=LatestReleased&Rendition=Web";
  return sUcmFilename;
}

// Return a product id given a product name
function getProductId(sProductName)
{
    sId = "";
    if (sProductName.substring(0, 3) != "COT")
	{
        sId = sProductName.substring(0, 3);
	}
    else
	{
		sId = sProductName.substring(0, 3)+sProductName.substring(4, 5);
	}
    return sId.toUpperCase();
}

// Return a statistics id given the statistics name
function getStatisticsId(sStatisticsName)
{
    if (sStatisticsName.substring(0, 10).toUpperCase() != "Multi-year".toUpperCase())
	{
        sId = sStatisticsName.substring(0, 3);
    }
    else if	(sStatisticsName.toUpperCase() == "Multi-year Maximum".toUpperCase())
        sId = "MYMX";
    else if	(sStatisticsName.toUpperCase() == "Multi-year Mean".toUpperCase())
        sId = "MYME";
    else if	(sStatisticsName.toUpperCase() == "Multi-year Minimum".toUpperCase())
        sId = "MYMN";
    return sId.toUpperCase();
}

// Return an id n chars long given a string. 
function getnCharId(sName,n)
{
    return sName.substring(0, n).toUpperCase();
}

