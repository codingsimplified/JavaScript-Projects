const generateForm = document.querySelector(".generate-form");
const generateBtn = generateForm.querySelector(".generate-btn");
const promptInput = document.querySelector(".prompt-input");
const imageGallery = document.querySelector(".image-gallery");


const KEY = "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"; 
let isImageGenerating = false;

const updateImageCard = (srcUrl) => {
  
    const imgCard = document.querySelector(".img-card")
    const imgElement = imgCard.querySelector("img");
    const downloadBtn = imgCard.querySelector(".download-btn");

    imgElement.src = srcUrl;
   
    imgElement.onload = () => {
      imgCard.classList.remove("loading");
      downloadBtn.setAttribute("href", srcUrl);
      
      downloadBtn.setAttribute("download", `${promptInput.value}.jpg`);
    }
  ;
}

async function query() {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: `Bearer ${KEY}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({"inputs": promptInput.value}),
		}
	);
	const result = await response.blob();
	return result;
}

const generateAiImages = async () => {
    query().then((response) => {
     
      const objectURL = URL.createObjectURL(response);
      updateImageCard(objectURL);
      
      generateBtn.removeAttribute("disabled");
    generateBtn.innerText = "Generate";
    isImageGenerating = false;
    });
}

const handleImageGeneration = (e) => {
  e.preventDefault();
  if(isImageGenerating) return;

  generateBtn.setAttribute("disabled", true);
  generateBtn.innerText = "Generating";
  isImageGenerating = true;

  const imgCardMarkup = 
      `<div class="img-card loading" >
        <img src="images/loader.svg" alt="AI generated image">
        <a class="download-btn" href="#" >
          <img src="images/download.svg" alt="download icon">
        </a>
      </div>` ;

  imageGallery.innerHTML = imgCardMarkup;
  generateAiImages();
}

generateForm.addEventListener("submit", handleImageGeneration);