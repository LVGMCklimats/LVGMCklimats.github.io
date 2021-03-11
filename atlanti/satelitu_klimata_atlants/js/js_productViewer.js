/* 
 * Product Viewer Object Library
 *
 * Written by: P.Sherratt (EUMETSAT)
 * Version:    1 (30/07/14)
 *
 * The product viewer library is used to display images. When loading new images
 * a busy indicator is displayed until the onload event has been recieved. The 
 * image is loaded into a hidden image and once the onload event occurs it is 
 * swapped to the front and the busy indicator is removed.
 */
  
// sIdPrefix - e.g. clat. Used as a prefix for the viewer div ids.
// objName - e.g. This needs to be identical to the object variable used, as in
// the following example: 
// 'oClatViewer = new productViewer("clat","oClatViewer");' 

function productViewer(sIdPrefix,objName){
  var _this = this; 
  this.sIdPrefix = sIdPrefix;
  this.iActiveViewerImage = 1;
  this.bBusyIndicatorActive = false;
  this.sBusyIndicatorImage = "img/viewer/img_viewer_preloader.gif";

  // load the next image in the background and then call swapViewerImage once it is fully loaded. i.e. double buffering of images
  this.loadViewerImage = function (sImageURL){
    var sImgPreload = "";
    iHiddenImage = 1;
    if (_this.iActiveViewerImage == 1)
    {
      iHiddenImage = 2;
    }
    var hiddenImgPreload = document.getElementById(_this.sIdPrefix+'image'+iHiddenImage.toString());
    showBusyIndicator();
    sCurrImageFile = sImageURL;
    sImgPreload = "<div><img id='image' style='max-width:100%;max-height:100%' src='"+sCurrImageFile+"' onload='"+objName+".swapViewerImage()'></div>"; 
    hiddenImgPreload.innerHTML = sImgPreload;
    //$('#image'+_this.iActiveViewerImage).featherlight({
    //  image: sCurrImageFile,
    //  root: window.parent.document.body,
    //});
    return true;
  };

  // Called from the onload event set up on the image in loadViewerImage. This function brings the latest image to the front and puts the last image in the background
  this.swapViewerImage = function (){
    var oImage1 = document.getElementById(_this.sIdPrefix+'image1');
    var oImage2 = document.getElementById(_this.sIdPrefix+'image2');
    clearBusyIndicator();  
    if (_this.iActiveViewerImage == 1)
    {
      oImage2.style.display = 'block';
      oImage1.style.display = 'none';
      _this.iActiveViewerImage = 2;
    }
    else
    {
      oImage1.style.display = 'block';
      oImage2.style.display = 'none';
      _this.iActiveViewerImage = 1;
    }
    var activeImgID = '#'+_this.sIdPrefix+'image'+_this.iActiveViewerImage+' div  #image'
    $(activeImgID).featherlight({
      image: $(activeImgID).attr('src'),
      root: window.parent.document.body,
    });
    // Change surrounding iframe to accomodate the new image
    var iframe = window.parent.document.getElementById('sat-klim-atlants')
		iframe.style.height = $(iframe.contentWindow.document).height() + 'px';
  };

  this.setBusyIndicatorImage = function (sBusyIndicatorImage){
    _this.sBusyIndicatorImage = sBusyIndicatorImage;  
  };
  
  // Show busy indicator when a new image is loading
  showBusyIndicator = function (){ 
    if (_this.bBusyIndicatorActive == false)
    {
      oBusyIndicator = $('<div style="position: absolute;top: 48%; left: 48%;z-index: 10" id="busyIndicator"/> '); 
      oBusyIndicator.append($('<img>',{id:'busyImg',src:_this.sBusyIndicatorImage}));
      $("#"+_this.sIdPrefix+"viewer").append(oBusyIndicator);
	}
    else
    {
      document.getElementById('busyIndicator').style.zIndex = "10";
    }
    _this.bBusyIndicatorActive = true;
  };

  // Clear the busy indicator
  clearBusyIndicator = function (){
    document.getElementById('busyIndicator').style.zIndex = "-1";
  };
};
