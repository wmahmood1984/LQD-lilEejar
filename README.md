https://ibb.co/wd8gcHT  // business class
https://ibb.co/WWHq2pN  // Officers
https://ibb.co/qrqKYm0  // workers



6

If you are looking for a solution that requires less code, try this:

Create your art in photoshop, with each accessory on a different layer
Save each layer as a separate image. Make sure to make all images the full canvas size, and use transparency. Save as PNG-24. This way, the position of each accessory will be "hardcoded" in the images, so you don't have to handle it in code.
Create a container <div>, and give it position: relative;.
Put all the images inside that <div>, as <img> tags, in the correct order (stack the layers, the background image being the first one)
Apply position: absolute; on every <img>.
This should get you started. Then use jQuery to toggle each image as the buttons representing them are clicked.


LQD_lil_Eejar.surge.sh

https://testnets-api.opensea.io/api/v1/asset/0x9532494F83aDD504b353c8D9687679dF57B9B2aC/1

pinata way of fetching data
https://gateway.pinata.cloud/ipfs/QmW8LdozVUYaAYmpbaBv4awDAwia13QZ8x9F6ZTPw3eusx

