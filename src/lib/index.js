//将base64转换为文件
function dataURLtoFile (dataurl, filename) { 
  var arr = dataurl.split(','),
  mime = arr[0].match(/:(.*?);/)[1],
  bstr = atob(arr[1]),
  n = bstr.length,
  u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  console.log({
    filename,
    type: mime,
  })
  return new File([u8arr], filename, { type: mime });
}
//调用
// var file = dataURLtoFile(base64Data, imgName);
//将base64转换为blob
function dataURLtoBlob (dataurl) { 
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
  while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

export default {
  dataURLtoFile,
  dataURLtoBlob,
}