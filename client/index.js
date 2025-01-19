
let imageCount = 0;
let videoCount = 0;
document.getElementById("image_count").textContent = imageCount;
document.getElementById("video_count").textContent = videoCount;
function getImgData(input) {
    if (input.files && input.files.length > 0) {
        const imageContainer = document.getElementById("image_container");
        const videoContainer = document.getElementById("video_container");

        Array.from(input.files).forEach((file, index) => {
            const fileType = file.type.split("/")[0];
            const url = URL.createObjectURL(file);

            const mediaWrapper = document.createElement("div");
            mediaWrapper.classList.add("relative", "inline-block");
            const mediaName = document.createElement("span");
            mediaName.classList.add("text-sm", "font-bold");
            const cancelButton = document.createElement("button");
            cancelButton.textContent = "X";
            cancelButton.setAttribute("aria-label", "Remove file");
            cancelButton.classList.add(
                "absolute",
                "top-0",
                "right-0",
                "bg-red-500",
                "text-black",
                "rounded-full",
                "text-xs",
                "w-5",
                "h-5",
                "flex",
                "items-center",
                "justify-center",
                "cursor-pointer"
            );
            cancelButton.onclick = () => {
                console.log(fileType, "LL");
                if (fileType == "video") {
                    document.getElementById("video_count").textContent = --videoCount;
                }
                if (fileType == "image") {
                    document.getElementById("image_count").textContent = --imageCount;
                }
                URL.revokeObjectURL(url);
                mediaWrapper.remove();
            };
            if (fileType === "image") {
                imageCount++;
                const newImg = document.createElement("img");
                newImg.src = url;
                newImg.alt = `Uploaded image ${index + 1}`;
                newImg.classList.add(
                    "w-56",
                    "h-52",
                    "object-cover",
                    "border",
                    "rounded-lg",
                    "shadow-sm",
                    "hover:shadow-lg",
                    "hover:shadow-black"
                );
                mediaWrapper.appendChild(newImg);
            } else if (fileType === "video") {
                videoCount++;
                const newVideo = document.createElement("video");
                newVideo.src = url;
                newVideo.controls = true;
                newVideo.classList.add(
                    "w-56",
                    "h-52",
                    "object-contain",
                    "border",
                    "rounded-lg",
                    "shadow-sm",
                    "hover:shadow-lg",
                    "hover:shadow-black"
                );
                mediaWrapper.appendChild(newVideo);
            }
            mediaName.textContent = file.name;
            mediaWrapper.appendChild(cancelButton);
            mediaWrapper.appendChild(mediaName);
            if (fileType === "image") {
                document.getElementById("image_count").textContent = imageCount;
                imageContainer.appendChild(mediaWrapper);
            } else if (fileType === "video") {
                document.getElementById("video_count").textContent = videoCount;
                videoContainer.appendChild(mediaWrapper);
            }
        });
    }
}

async function handleUpload() {
    let url = 'http://localhost:4001/uploadMedia'
    const data = { message: "Hello Server!" };
    await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        },
    })
}
