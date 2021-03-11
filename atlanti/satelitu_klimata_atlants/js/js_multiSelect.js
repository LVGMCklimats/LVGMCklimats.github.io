/*
 * Multi Select Object Library
 * 
 * Written by: P.Sherratt (EUMETSAT)
 * Version:    1.1 (30/07/14)
 *
 * The Multi Select library reads a JSON file and creates a hierarchy of 
 * labelled select boxes from the JSON data structure.
 *
 * Example: clatSelectionsObj = new multiSelectHandler(
 *  "js/json_ImageTree.min.js",cmSelectionsCallback,{"breakBeforeLabel":["2"]});
 */

// Initialise the multiSelectHandler. Makes sure a DIV tag with the id 
// 'multiSelect' exists before calling this. 
// JSONurl - contains the path and name of the JSON data structure.
// multiselectCallback - a user callback function which is called the first time
// the select boxes are created and then every time they are changed by the user.
// oOptions - additional options:
//   breakBeforeLabel - which specifies which labels to add a line break before.
//                      Examples: breakBeforeLabel:3  ,  breakBeforeLabel:[2,3]
//   labelStyle - add css styles for the select labels. 
//                Example: labelStyle:"color:red;text-transform:uppercase;"
function multiSelectHandler(JSONurl,multiselectCallback,oOptions){
  var _this = this;
  this.jsonData = null;
  this.oOptions = oOptions;
  this.arrSelectElems = new Array();     // Saves the select element objects
  this.arrSelectedIndex = new Array();   // Saves the selected index at each level
  this.arrSelectedText = new Array();    // Saves the selected value at each level
  this.arrSelectBoxId = new Array();     // option selected at each level
  this.iNumSelectLevels = -1;            // the number of select levels (starts at 0 for the first select box)
  this.onChangeCallback = multiselectCallback;

  oOptions.labelStyle = ("labelStyle" in oOptions) ? oOptions.labelStyle+";padding-left:5px;padding-right:5px;" :"padding-left:5px;padding-right:5px;";
  
  // Callback function when selections change
  //   oSelectedObj - the currently selected select element
  //   iLevel  - the currently selected level (the level starts at 0 for the first select box)
  onChange = function(oSelectedObj,iLevel){
    var iSelectedIndex = 0;
    var arrSelectData = new Array();
    _this.arrSelectedIndex[iLevel] = oSelectedObj.selectedIndex;
    _this.arrSelectedText[iLevel] = oSelectedObj[_this.arrSelectedIndex[iLevel]].text;
    sUpdateListFrom = "_this.jsonData";
    for (var iCurLevel = 0; iCurLevel <= iLevel; iCurLevel++) 
    {
      sUpdateListFrom = sUpdateListFrom + ".LIST.OPTIONS["+_this.arrSelectedIndex[iCurLevel]+"]";
    }

    // Remove the select boxes after the currently selected select box
    for (var iCurLevel = _this.iNumSelectLevels; iCurLevel >= iLevel+1; iCurLevel--) {
      $('#msitem'+iCurLevel).remove();
      $('#msbreak'+iCurLevel).remove();
      delete _this.arrSelectedIndex[iCurLevel];
	  delete _this.arrSelectBoxId[iCurLevel];
      delete _this.arrSelectElems[iCurLevel];
    }
	
    if ("LIST" in eval(sUpdateListFrom))
    {
      _this.iNumSelectLevels = iLevel;
      processList(eval(sUpdateListFrom).LIST,iLevel+1);
    }
    else
    {
      _this.iNumSelectLevels = iLevel;
    }

    // Send select information in an array to a registered user callback function 
    // to indicate what options are currently selected   
	
    for (var iCurLevel = 0; iCurLevel <= _this.iNumSelectLevels; iCurLevel++) {
      arrSelectData[iCurLevel] = new Array();
      iSelectedIndex = _this.arrSelectElems[iCurLevel].selectedIndex;
      arrSelectData[iCurLevel]['VALUE'] = _this.arrSelectElems[iCurLevel][iSelectedIndex].value;
      arrSelectData[iCurLevel]['TEXT'] = _this.arrSelectElems[iCurLevel][iSelectedIndex].text;
      arrSelectData[iCurLevel]['LISTID'] = _this.arrSelectElems[iCurLevel].id;
    }
	
	// Call the user callback function with the latest select values
    _this.onChangeCallback(iLevel,_this.iNumSelectLevels,arrSelectData);
  };
  
  // Internal function recursively called to create the select boxes from the JSON file
  processList = function(jsonList,iLevel){
    var bOptionSelected = false;

    if (_this.iNumSelectLevels < iLevel)
    {
      _this.iNumSelectLevels = iLevel;
    }
    	
    _this.arrSelectBoxId[iLevel] = jsonList.ID;
    _this.arrSelectElems[iLevel] = document.createElement("select");
    _this.arrSelectElems[iLevel].setAttribute("id", jsonList.ID);
    _this.arrSelectElems[iLevel].onchange = function(){onChange(_this.arrSelectElems[iLevel],iLevel);};

    // Set up the select options
    $.each( jsonList.OPTIONS, function( key, option ) {
      var oOpt = document.createElement("option");
      oOpt.setAttribute("value", option.VALUE);
      
      if (option.TEXT == _this.arrSelectedText[iLevel])
      {
        oOpt.selected = true;
		bOptionSelected = true;
		_this.arrSelectedIndex[iLevel] = key;
      }

      oOpt.innerHTML = option.TEXT;
      _this.arrSelectElems[iLevel].appendChild(oOpt);    
    });
	
	if (!bOptionSelected)
    {
	  _this.arrSelectedIndex[iLevel] = 0;
	  _this.arrSelectedText[iLevel] = jsonList.OPTIONS[0].TEXT;
    }	
	
    msItem = $('<span style="white-space:pre;float:left;line-height:25px" id="msitem'+iLevel+'"/> '); 
    msItem.append("<label style='"+oOptions.labelStyle+"' id='msitem"+iLevel+"label'>"+jsonList.LABEL+"</label>");
    msItem.append(_this.arrSelectElems[iLevel]);

    $("#multiSelect").append(msItem);

    if ("LIST" in jsonList.OPTIONS[_this.arrSelectedIndex[iLevel]])
    {
      processList(jsonList.OPTIONS[_this.arrSelectedIndex[iLevel]].LIST,iLevel+1);
    }
  };
  
  // Process the JSON file. If successful process the list to create the select boxes
  $.getJSON( JSONurl )
  .done(function(jsonData) {
    _this.jsonData = jsonData;
    processList(jsonData.LIST,0);
    onChange(_this.arrSelectElems[_this.iNumSelectLevels],_this.iNumSelectLevels);
  })
  .fail(function() {
    console.log( "Error in JSON file" );
  })
  .always(function() {
    console.log( "JSON file read successfully" );
  });
};

