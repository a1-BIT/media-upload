
let imageCount = 0;
let videoCount = 0;
let imageSize = 0
let videoSize = 0
document.getElementById("image_count").textContent = imageCount;
document.getElementById("video_count").textContent = videoCount;
document.getElementById('image_size').textContent = getSizeFromBytes(0)
document.getElementById('video_size').textContent = getSizeFromBytes(0)
function getImgData(input) {
    if (input.files && input.files.length > 0) {
        const imageContainer = document.getElementById("image_container");
        const videoContainer = document.getElementById("video_container");

        Array.from(input.files).forEach((file, index) => {
            console.log('file:', file)
            const fileType = file.type.split("/")[0];
            const url = URL.createObjectURL(file);

            const mediaWrapper = document.createElement("div");
            mediaWrapper.classList.add("relative", "inline-block");
            const mediaName = document.createElement("span");
            const sizeTab = document.createElement('div')
            sizeTab.classList.add('text-sm', 'font-blod')
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
                if (fileType == "video") {
                    document.getElementById("video_count").textContent = --videoCount;
                    videoSize = videoSize - file.size
                    document.getElementById("video_size").textContent = getSizeFromBytes(videoSize)
                }
                if (fileType == "image") {
                    document.getElementById("image_count").textContent = --imageCount;
                    imageSize = imageSize - file.size
                    document.getElementById("image_size").textContent = getSizeFromBytes(imageSize)
                }
                URL.revokeObjectURL(url);
                mediaWrapper.remove();
            };
            if (fileType === "image") {
                imageCount++;
                imageSize = imageSize + file.size
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
                videoSize = videoSize + file.size
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
            sizeTab.textContent = getSizeFromBytes(file.size);
            mediaName.textContent = truncateStr(file.name);
            mediaWrapper.appendChild(cancelButton);
            mediaWrapper.appendChild(mediaName);
            mediaWrapper.appendChild(sizeTab)
            if (fileType === "image") {
                console.log('imageSize:', imageSize)
                document.getElementById("image_count").textContent = imageCount;
                document.getElementById("image_size").textContent = getSizeFromBytes(imageSize)
                imageContainer.appendChild(mediaWrapper);
            } else if (fileType === "video") {
                document.getElementById("video_count").textContent = videoCount;
                document.getElementById('video_size').textContent = getSizeFromBytes(videoSize)
                videoContainer.appendChild(mediaWrapper);

            }
        });
    }
}

function getSizeFromBytes(bytes) {
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    let size = bytes;
    let index = 0;

    while (size > 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }

    return size.toFixed(3) + " " + units[index];
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

function truncateStr(name) {
    if (name.length > 15) {
        let start = name.substr(0, 7)
        let end = name.substr(-10)
        return start + "....." + end
    }
    return name

}

function clearAll() {
    document.getElementById('file_upload').value = ''
}
