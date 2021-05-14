// import addManger from "./addManger"
//图片控制
var ImageManager = function () {
  var scope = this;
  this.stratMouse = {
    x: 0,
    y: 0
  };
  this.endMouse = {
    x: 0,
    y: 0
  };
  this.moveMouse = {
    x: 0,
    y: 0
  };
  this.Move = false;
  this.isHave = false;

  this.oldWidth = "";
  var ImageDiv;//  =new addManger();

  var dom_div;

  var imageDom = new Image();
  imageDom.style.position = "absolute";
  imageDom.style.top = "0px";
  imageDom.style.left = "0px";
  imageDom.style.width = "100%";
  imageDom.style.height = "100%";
  // image_div.appendChild(imageDom);

  this.addImageData = function (data,id) {
    console.log(typeof(data))
    if(typeof(data)  == "string"){
      imageDom.src = data;
    } else{
      imageDom.src = "data:image/png;base64," + data[0].img;
    }


    imageDom.onload = function () {
      // ImageDiv.initDom(document.body,title);
      ImageDiv = document.getElementById(id);
      console.log(imageDom.naturalWidth);
      console.log(ImageDiv.clientWidth);
      scope.oldWidth = ImageDiv.clientWidth;
      let _width =ImageDiv.clientWidth
      var _height = (_width * imageDom.naturalHeight) / imageDom.naturalWidth;

      imageDom.style.width = _width+"px";
      imageDom.style.height = _height+"px";
      dom_div = ImageDiv.appendChild(imageDom)
      imageDom.style.top = "0px";
      imageDom.style.left = "0px";

      scope.addMouseEvents();
    };
    imageDom.onerror = function () {
      alert("没有数据")
    }
    scope.isHave = true;
  };

  this.setDomStyle = function (width, height, left, right) {
    var _width = width !== undefined ? width : 1024;
    var _height = height !== undefined ? height : 844;
    var _left = left !== undefined ? left : 0;
    var _right = right !== undefined ? right : 0;
    dom_div.style.width = _width + "px";
    dom_div.style.height = _height + "px";
    dom_div.style.top = _left + "px";
    dom_div.style.left = _right + "px";
  };

  this.addMouseEvents = function () {
    dom_div.addEventListener("wheel", wheel, false);
    dom_div.addEventListener("mouseup", onMouseUp, false);
    dom_div.addEventListener("mousemove", onMouseMove, false);
    dom_div.addEventListener("mousedown", onMouseDown, false);
  };
  this.removeMouseEvents = function () {
    dom_div.removeEventListener("wheel", wheel, false);
    dom_div.removeEventListener("mouseup", onMouseUp, false);
    dom_div.removeEventListener("mousemove", onMouseMove, false);
    dom_div.removeEventListener("mousedown", onMouseDown, false);
  };


  function onMouseUp(event) {
    scope.Move = false;
    //imageDom.removeEventListener("mousemove",onMouseMove );
  }

  function onMouseMove(event) {
    scope.endMouse.x = event.clientX
    scope.endMouse.y = event.clientY

    scope.moveMouse.x = scope.endMouse.x - scope.stratMouse.x;
    scope.moveMouse.y = scope.endMouse.y - scope.stratMouse.y;
    if (scope.Move) {
      imageMoveTo();
    }

    scope.stratMouse.x = event.clientX;
    scope.stratMouse.y = event.clientY

  }

  function onMouseDown(event) {

    event.preventDefault();
    scope.Move = true;
    scope.stratMouse.x = event.clientX;
    scope.stratMouse.y = event.clientY
  }

  function wheel(event) {
    console.log(event);
    if (event.deltaY < 0) {

      scope.imageOut();
    } else if (event.deltaY > 0) {
      scope.imageIn();
    }
  }

  function imageMoveTo() {
    var _top = imageDom.offsetTop;
    var _left = imageDom.offsetLeft;
    console.log(_top);
    _top += scope.moveMouse.y;
    _left += scope.moveMouse.x;
    imageDom.style.top = _top + "px";
    imageDom.style.left = _left + "px";

    //console.log(imageDom.style);
  }

  this.imageOut = function () {
    console.log("out");
    var _width = Math.floor(imageDom.width * 1.1);
    var _height = Math.floor(imageDom.height * 1.1);
    var _top = -Math.floor((_height - dom_div.offsetHeight) / 2)
    var _left = -Math.floor((_width - dom_div.offsetWidth) / 2);
    imageDom.style.width = _width + "px";
    imageDom.style.height = _height + "px";
   
    imageDom.style.top = _top + "px";
    imageDom.style.left = _left + "px";
    console.log(_width,dom_div.offsetWidth,_left);
    console.log(_height,dom_div.offsetHeight,_top);
    //console.log(imageDom.style);

  };
  this.imageIn = function () {
    console.log(imageDom.width);
    console.log(dom_div.offsetWidth)
    if(imageDom.width<=scope.oldWidth) return
    var _width = imageDom.width * 0.9;
    var _height = imageDom.height * 0.9;
    var _top = -(_height - dom_div.offsetHeight) / 2;
    var _left = -(_width - dom_div.offsetWidth) / 2;
    imageDom.style.width = _width + "px";
    imageDom.style.height = _height + "px";
    if (_width >= dom_div.offsetWidth) {
      imageDom.style.top = 0 + "px";
      imageDom.style.left = 0 + "px";
    } else {
      imageDom.style.top = 0+ "px";
      imageDom.style.left = 0 + "px";
    }

  };
  this.remove = function () {
    ImageDiv.remove();
  }
};

export default ImageManager
