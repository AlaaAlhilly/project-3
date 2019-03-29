const s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.innerHTML = `
                  var myWidget = cloudinary.createUploadWidget({
                    cloudName: 'dh7ooikgx',
                          uploadPreset: 'clixcvin'
                      }, (error, result) => {
                          if (!error && result && result.event === "success") {
                              console.log('Done! Here is the image info: ', result.info);
                              $("#prof_pic").attr("src",result.info.secure_url);
                          }
                      });
                      $("#upload_widget").attr("onclick","runWidget()");
                      function runWidget() {
                          myWidget.open();   
                }

                    `;
           setTimeout(function(){
            document.head.appendChild(s);
           },1500) 



           